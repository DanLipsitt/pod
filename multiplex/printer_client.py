import asyncio
import aiohttp
from logging import getLogger
import json

logger = getLogger('mux.client')


@asyncio.coroutine
def connect(session, url, listener):
    """Connect to a printer's websocket and forward messages to the
    given listener.

    Args:
        session (aiohttp.ClientSession): Shared session between client
          requests.
        url (str): Websocket url.
        listener (coroutine): Decoded messages will be passed to this.
    """
    ws = yield from session.ws_connect(url)
    while True:
        msg = yield from ws.receive()

        if msg.tp != aiohttp.MsgType.text:
            break

        try:
            data = json.loads(msg.data)
        except TypeError:
            logger.error('error decoding: {}'.format(msg.data))
            next

        data['source'] = url        # FIXME just need host:port
        # FIXME: timestamp?
        yield from listener(data)
        logger.debug(data)

    ws.close()


def run(urls, listener, loop=None):
    if loop is None:
        loop = asyncio.get_event_loop()
    session = aiohttp.ClientSession()
    tasks = [asyncio.ensure_future(connect(session, url, listener))
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
