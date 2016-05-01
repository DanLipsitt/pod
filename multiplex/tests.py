import asyncio
import json
import django.test
from unittest.mock import Mock
# must come before django imports so settings come from the right place
from .server import make_listener, store_event
from files.models import PrintLog

class TestMultiplexListener(django.test.TestCase):

    def setUp(self):
        self.loop = asyncio.new_event_loop()
        asyncio.set_event_loop(None)

        self.subscribers = [Mock(), Mock()]
        self.listener =  make_listener(self.subscribers)
        self.data = {
            "host": "example.com", "port": 9000,
            "event": {
                "type": "PrintStarted",
                "payload": {
                    "origin": "local", "file": "/uploads/file1.gcode",
                    "filename": "file1.gcode"
                }
            }
        }

    def tearDown(self):
        self.loop.close()

    def test_listener_stores_relevant_events(self):
        expected = {
            "host": "example.com",
            "port": 9000,
            "event": "PrintStarted",
            "filename": "file1.gcode"
        }

        self.loop.run_until_complete(self.listener(self.data))
        self.assertEqual(PrintLog.objects.count(), 1)
        o = PrintLog.objects.last()
        self.assertIsNotNone(o)
        self.assertDictContainsSubset(expected, o.__dict__)

    def test_listener_sends_messages(self):
        self.loop.run_until_complete(self.listener(self.data))
        s = json.dumps(self.data)
        for subscriber in self.subscribers:
            subscriber.send_str.assert_called_once_with(s)

    def test_non_events_not_stored(self):
        data = {'a': 1}
        self.loop.run_until_complete(store_event(data))
        self.assertEqual(PrintLog.objects.count(), 0)

    def test_unwanted_event_types_not_stored(self):
        self.data['event']['type'] = 'Nope'
        self.loop.run_until_complete(store_event(self.data))
        self.assertEqual(PrintLog.objects.count(), 0)
