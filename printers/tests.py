import json
import io
import builtins
import aiohttp
import asyncio.test_utils
from django.test import TestCase
from unittest.mock import Mock, MagicMock, mock_open, patch
from asynctest.mock import CoroutineMock
from channels import Group
from .consumers import (
    make_progress_callback, TransferMonitor, transfer_file_to_printers
)

import logging
logging.basicConfig(level=logging.DEBUG)


class AsyncTestCase(asyncio.test_utils.TestCase):
    # Based on
    # https://github.com/python/cpython/blob/2f2289887e5f/Lib/test/test_asyncio/test_pep492.py#L17
    def setUp(self):
        self.loop = asyncio.BaseEventLoop()
        self.loop._process_events = Mock()
        self.loop._selector = Mock()
        self.loop._selector.select.return_value = ()
        self.set_event_loop(self.loop)
        asyncio.set_event_loop(self.loop)


class TestTransferMonitor(TestCase):

    def setUp(self):
        self.callback = MagicMock(name='callback')
        self.size = 1024 * 1024
        self.data = '.' * self.size
        self.stream = MagicMock(wraps=io.StringIO(self.data))
        # so it can be used as a context manager
        self.stream.__enter__ = lambda self: self

    def check_monitor(self, monitor, data, stream, size, callback):
        result = monitor.read(size//2)
        self.assertEqual(size//2, len(result))
        self.assertEqual(data[:size//2], result)
        self.assertEqual(stream.read.call_count, 1)
        callback.assert_called_once_with(50.0)

    def test_transfer_monitor(self):
        monitor = TransferMonitor(self.stream, self.size, self.callback)
        self.check_monitor(monitor, self.data, self.stream, self.size,
                           self.callback)

    def test_transfer_monitor_context_manager(self):
        with TransferMonitor(self.stream, self.size, self.callback) as monitor:
            self.check_monitor(monitor, self.data, self.stream, self.size,
                               self.callback)


class TestMakeProgressCallback(TestCase):

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
        self.assertDictEqual(arg, expected)


# aiohttp.post looks for a name attribute on the data object. The mock
# file object's automatic name attribute causes problems so we replace
# it.
_mock_open = mock_open(read_data='')
_mock_open.return_value.name = 'file.gcode'


class TestTransferSingle(AsyncTestCase):

    @patch.object(builtins, 'open', _mock_open)
    def setUp(self):
        super(TestTransferSingle, self).setUp()
        self.client = Mock()
        self.client.post = CoroutineMock(spec=aiohttp.post)
        self.urls = ['http://localhost:5000/post']

        self.result = self.loop.run_until_complete(
            transfer_file_to_printers('file.gcode', self.urls,
                                      client=self.client)
        )
        self.complete_cb = Mock()

    def test_should_post_once(self):
        self.assertEqual(self.client.post.call_count, 1)
        args, kwargs = self.client.post.call_args
        self.assertEqual(args[0], 'http://localhost:5000/post')

    def test_should_call_completion_callback(self):
        self.complete_cb.assert_called_once_with()
