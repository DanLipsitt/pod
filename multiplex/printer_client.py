import asyncio
import aiohttp
from aiohttp.errors import ClientConnectionError
from datetime import datetime
from logging import getLogger
import json
from urllib.parse import urlparse
try:
    from asyncio import ensure_future
except ImportError:
    # before python 3.4.4
    from asyncio import async as ensure_future

logger = getLogger('mux.client')


@asyncio.coroutine
def connect(url, listener):
    """Connect to a printer's websocket and forward messages to the
    given listener.

    Args:
        url (str): Websocket url.
        listener (coroutine): Decoded messages will be passed to this.
    """
    session = aiohttp.ClientSession()

    try:
        ws = yield from session.ws_connect(url)
        logger.info('%s connected', url)
    except ClientConnectionError:
        session.close()
        logger.warn('%s connection failed', url)
        return

    url_parts = urlparse(url)
    info = {'host': url_parts.hostname,
            'port': url_parts.port or 80}

    while True:
        msg = yield from ws.receive()
        info['timestamp'] = str(datetime.utcnow()) + 'Z'

        if msg.tp != aiohttp.MsgType.text:
            break

        try:
            data = json.loads(msg.data)
            data.update(info)
            yield from listener(data)
        except TypeError:
            logger.error('error decoding: %s', msg.data)
            continue
        finally:
            logger.debug(data)

    ws.close()
    session.close()
    logger.info('%s disconnected', url)


@asyncio.coroutine
def reconnect(url, listener):

    while True:
        yield from connect(url, listener)
        yield from asyncio.sleep(1)
        logger.info('%s retrying', url)


def run(urls, listener, loop=None):
    if loop is None:
        loop = asyncio.get_event_loop()
    tasks = [ensure_future(reconnect(url, listener))
             for url in urls]
    return tasks

if __name__ == '__main__':
    from logging import basicConfig, INFO
    basicConfig(level=INFO)

    loop = asyncio.get_event_loop()

    urls = [
        'ws://localhost:5000/sockjs/websocket',
        'ws://localhost:5001/sockjs/websocket',
    ]

    @asyncio.coroutine
    def listener(msg):
        logger.info(msg)

    tasks = run(urls, listener)
    loop.run_until_complete(asyncio.wait(tasks))
