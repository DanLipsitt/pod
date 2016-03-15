from io import IOBase
from pathlib import Path
from celery.task.http import URL
from django.conf import settings
import celery
import requests
from celery.utils.log import get_task_logger
from pod.celery import app


logger = get_task_logger(__name__)


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
    filename = Path(file_path).name
    logger.debug((file_path, filename, printer_url))
    result = requests.post(printer_url,
                           files={'file': (filename, open(file_path, 'rb'),
                                           'application/octet-stream')},
                           headers={'X-Api-Key': 'pod'})
    logger.info(result)


@app.task
def transfer_file_to_printers(file_path, printer_urls):
    tasks = []

    for printer_url in printer_urls:
        tasks.append(transfer_file_to_printer.s(
            file_path, printer_url,
        ))

    celery.group(*tasks)()
