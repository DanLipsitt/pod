from io import IOBase
from celery.task.http import URL
from django.conf import settings
import celery
import requests
from pod.celery import app


def send_action(action):
    return                      # FIXME
    URL.post_async(
        settings.CROSSBAR_PUBLISH_URL,
        topic='typea.pod.action',
        args=action
    )


def make_progress_callback(file_path, printer_url, send_action):
    def callback(percent):
        send_action(
            {
                'type': 'TRANSFER_PROGRESS',
                'payload': {
                    'file_path': file_path,
                    'printer': printer_url,
                    'progress': percent,
                }
            }
        )
    return callback


def make_completion_callback(send_action):
    def callback(printer_url):
        send_action(
            {
                'type': 'TRANSFER_COMPLETE',
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


@app.task
def transfer_file_to_printer(file_path, printer_url):
    with open(file_path) as stream:
        requests.post(printer_url, data=stream)


@app.task
def transfer_file_to_printers(file_path, printer_urls):
    tasks = []

    for printer_url in printer_urls:
        tasks.append(transfer_file_to_printer.s(
            file_path, printer_url,
        ))

    celery.group(*tasks)()
