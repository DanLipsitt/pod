from channels import Group
import asyncio
import aiohttp
import math
import json


def ws_add(message):
    Group('all').add(message.reply_channel)


def ws_receive(message):
    pass


def ws_disconnect(message):
    Group('clients').discard(message.reply_channel)


def make_progress_callback(path, printer_url, channel_group):
    def callback(percent):
        channel_group.send(
            json.dumps(
                {
                    'action': 'TRANSFER_PROGRESS',
                    'payload': {
                        'path': path,
                        'printer': printer_url,
                        'progress': percent,
                    }
                }
            )
        )
    return callback


class TransferMonitor(object):

    def __init__(self, stream, size, callback):
        self._stream = stream
        self._callback = callback
        self.size = size
        self.bytes_read = 0

    def read(self, n=-1):
        result = self._stream.read(n)
        self.bytes_read += len(result)
        self._callback(100.0 * self.bytes_read / self.size)
        return result

    def __getattr__(self, attr):
        return getattr(self._stream, attr)


def transfer_file_to_printers(message):
    path = message.content['file_path']
    urls = message.content['printer_urls']
    group = Group('all')

    tasks = []

    for printer_url in urls:
        progress_callback = make_progress_callback(path, printer_url, group)
        with TransferMonitor(open(path, 'rb'), progress_callback) as monitor:
            tasks.append(aiohttp.post(printer_url, data=monitor))

    loop = asyncio.get_event_loop()
    loop.run_until_complete(tasks)
