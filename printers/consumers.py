from channels import Group
import asyncio
import aiohttp
import math
import os
from io import IOBase


def ws_add(message):
    Group('all').add(message.reply_channel)


def ws_receive(message):
    pass


def ws_disconnect(message):
    Group('clients').discard(message.reply_channel)


def make_progress_callback(path, printer_url, channel_group):
    def callback(percent):
        channel_group.send(
            {
                'action': 'TRANSFER_PROGRESS',
                'payload': {
                    'path': path,
                    'printer': printer_url,
                    'progress': percent,
                }
            }
        )
    return callback


class TransferMonitor(IOBase):

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


def do_transfer(message):
    transfer_file_to_printers(message.content['file_path'],
                              message.content['printer_urls'])


def transfer_file_to_printers(path, urls):
    group = Group('all')

    tasks = []
    size = os.path.getsize(path)

    for printer_url in urls:
        progress = make_progress_callback(path, printer_url, group)
        with TransferMonitor(open(path, 'rb'), size, progress) as monitor:
            tasks.append(aiohttp.post(printer_url, data=monitor))

    loop = asyncio.get_event_loop()
    loop.run_until_complete(asyncio.wait(tasks))
