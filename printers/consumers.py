from channels import Group
import asyncio
import aiohttp
import os
from io import IOBase


def ws_add(message):
    Group('all').add(message.reply_channel)


def ws_receive(message):
    pass


def ws_disconnect(message):
    Group('clients').discard(message.reply_channel)


def make_progress_callback(file_path, printer_url, channel_group):
    def callback(percent):
        channel_group.send(
            {
                'action': 'TRANSFER_PROGRESS',
                'payload': {
                    'file_path': file_path,
                    'printer': printer_url,
                    'progress': percent,
                }
            }
        )
    return callback


def make_completion_callback(channel_group):
    def callback(printer_url):
        channel_group.send(
            {
                'action': 'TRANSFER_COMPLETE',
                'payload': {
                    'printer': printer_url,
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
    loop = asyncio.get_event_loop()
    loop.run_until_complete(
        transfer_file_to_printers(message.content['file_path'],
                                  message.content['printer_urls'])
    )


async def transfer_file_to_printer(client, stream, size, printer_url,
                                   progress_callback, completion_callback):

    with TransferMonitor(stream, size, progress_callback) as monitor:
            response = await client.post(printer_url, data=monitor)
    completion_callback(printer_url)

    return printer_url, response


async def transfer_file_to_printers(file_path, urls, completion_callback,
                                    client=None):
    if client is None:
        client = aiohttp
    group = Group('all')

    size = os.path.getsize(file_path)

    tasks = []

    for printer_url in urls:
        progress = make_progress_callback(file_path, printer_url, group)
        tasks.append(transfer_file_to_printer(
            client, open(file_path, 'rb'), size, printer_url, progress,
            completion_callback
        ))

    results = {}
    for task in asyncio.as_completed(tasks):
        try:
            url, response = await task
            response
            results[url] = response

        except Exception as e:
            raise e

    return results
