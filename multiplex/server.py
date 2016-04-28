import asyncio
import json
from logging import getLogger
from aiohttp.web import Application, HTTPNotFound, MsgType, WebSocketResponse
from . import printer_client
from ..files.models import PrintLog

logger = getLogger('mux.server')


@asyncio.coroutine
def ws_handler(request):

    resp = WebSocketResponse()
    ok, protocol = resp.can_start(request)
    if not ok:
        return HTTPNotFound(reason="This is a websocket endpoint.")

    yield from resp.prepare(request)
    peer_host, peer_port = request.transport.get_extra_info('peername')
    logger.info('connected {}:{}'.format(peer_host, peer_port))
    request.app['clients'].append(resp)

    while True:
        msg = yield from resp.receive()

        # Listen for disconnect message.
        if msg.tp != MsgType.text:
            break

    request.app['clients'].remove(resp)
    logger.info('disconnected {}:{}'.format(peer_host, peer_port))

    return resp


def make_listener(clients):

    @asyncio.coroutine
    def listener(data):
        yield from store_event(data)
        msg = json.dumps(data)
        for ws in clients:
            ws.send_str(msg)

    return listener


@asyncio.coroutine
def store_event(data, msg):
    event = data['event']['type']
    if event not in PrintLog.types:
        logger.debug('not storing {} event'.format(event))
        return
    PrintLog.objects.create_from_msg_data(data)


def init(argv):
    import logging
    logging.basicConfig(level=logging.INFO)

    app = Application()
    app['clients'] = []
    app.router.add_route('GET', '/', ws_handler)

    urls = [
        'ws://localhost:5000/sockjs/websocket',
        'ws://localhost:5001/sockjs/websocket',
    ]

    listener = make_listener(app['clients'])
    logger.info('starting mux client')
    printer_client.run(urls, listener)
    logger.info('mux client started')

    return app
