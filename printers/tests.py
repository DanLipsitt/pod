import json
import io
from django.test import TestCase
from unittest.mock import Mock, MagicMock, mock_open
from channels import Group
from .consumers import make_progress_callback, TransferMonitor


class TestConsumers(TestCase):

    def test_make_progress_callback(self):
        group = Mock(spec=Group)
        cb = make_progress_callback('/tmp/file.txt',
                                    'http://example.com/upload',
                                    group)
        cb(100)
        expected = {
            "action": "TRANSFER_PROGRESS",
            "payload": {
                "printer": "http://example.com/upload",
                "path": "/tmp/file.txt",
                "progress": 100
                }
            }
        (arg,), _ = group.send.call_args
        self.assertDictEqual(json.loads(arg), expected)

    def test_transfer_monitor(self):
        callback = MagicMock()
        size = 1024 * 1024
        data = '.' * size
        stream = MagicMock(wraps=io.StringIO(data))
        monitor = TransferMonitor(stream, size, callback)
        result = monitor.read(size//2)
        self.assertEqual(data[:size//2], result)
        self.assertEqual(stream.read.call_count, 1)
        callback.assert_called_once_with(50.0)
