import asyncio
import json
import django
import os
from django.conf import settings
from logging import getLogger
from aiohttp.web import Application, HTTPNotFound, MsgType, WebSocketResponse
from . import printer_client

logger = getLogger('mux.server')

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "multiplex.settings")
django.setup()

from files.models import PrintLog
from printers.models import Printer


@asyncio.coroutine
def ws_handler(request):

    resp = WebSocketResponse()
    ok, protocol = resp.can_start(request)
    if not ok:
        return HTTPNotFound(reason="This is a websocket endpoint.")

    yield from resp.prepare(request)
    peer_host, peer_port = request.transport.get_extra_info('peername')
    logger.info('connected %s:%s', peer_host, peer_port)
    request.app['clients'].append(resp)

    while True:
        msg = yield from resp.receive()

        # Listen for disconnect message.
        if msg.tp != MsgType.text:
            break

    request.app['clients'].remove(resp)
    logger.info('disconnected %s:%s', peer_host, peer_port)

    return resp


def make_listener(subscribers):

    @asyncio.coroutine
    def listener(data):
        yield from store_event(data)
        msg = json.dumps(data)
        for ws in subscribers:
            ws.send_str(msg)

    return listener


@asyncio.coroutine
def store_event(data):
    if 'event' not in data:
        return
    event = data['event']['type']
    if event not in PrintLog.EVENT_TYPES:
        logger.debug('not storing %s event', event)
        return
    PrintLog.objects.create_from_msg_data(data)


def init(argv):
    import logging
    logging.basicConfig(level=logging.INFO)

    app = Application()
    app['clients'] = []
    app.router.add_route('GET', '/', ws_handler)

    printers = Printer.objects.all()
    urls = ['ws://{0.hostname}:{0.port}/sockjs/websocket'.format(printer)
            for printer in printers]

    listener = make_listener(app['clients'])
    logger.info('starting mux client')
    printer_client.run(urls, listener)
    logger.info('mux client started')

    return app
