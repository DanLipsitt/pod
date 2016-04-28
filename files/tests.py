from django.test import TestCase
from django.core.urlresolvers import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from io import StringIO
import json

from .models import PrintFile, PrintLog


class TestPrintFileViewSet(APITestCase):

    def setUp(self):
        user = User.objects.create_user('test_user')
        self.client.force_login(user)

    def test_upload_file(self):
        url = reverse('printfile-list')
        data = {'file': SimpleUploadedFile('file.gcode', b'...')}
        resp = self.client.post(url, data)
        self.assertEqual(resp.data['filename'], data['file'].name)
        self.assertIn('createdAt', resp.data)
        obj = PrintFile.objects.get()
        self.assertEqual(obj.filename, data['file'].name)
        self.assertIsNotNone(obj.createdAt)


    def test_missing_file(self):
        """Fail if no file is uploaded."""
        url = reverse('printfile-list')
        data = {'dummy': 1}
        resp = self.client.post(url, data)
        self.assertEqual(resp.status_code, 400)


class TestPrintLog(TestCase):

    def setUp(self):
        self.data = [
          {
            "host": "example.com", "port": 9000,
            "event": {
              "type": "PrintStarted",
              "payload": {
                "origin": "local", "file": "/uploads/file1.gcode", "filename": "file1.gcode"
              }
            }
          },
          {
            "host": "example.com", "port": 9000,
            "event": {
              "type": "PrintPaused",
              "payload": {
                "origin": "local", "file": "/uploads/file1.gcode", "filename": "file1.gcode"
              }
            }
          },
          {
            "host": "example.com", "port": 9000,
            "event": {
              "type": "PrintResumed",
              "payload": {
                "origin": "local", "file": "/uploads/file1.gcode", "filename": "file1.gcode"
              }
            }
          },
          {
            "host": "example.com", "port": 9000,
            "event": {
              "type": "PrintDone",
              "payload": {
                "origin": "local", "time": 235.70474815368652, "file": "/uploads/file1.gcode", "filename": "file1.gcode"
              }
            }
          }
        ]
        self.json = [json.dumps(msg) for msg in self.data]

    def test_message_data(self):
        for d in self.data:
            with self.subTest(type=d['event']['type']):
                o = PrintLog.objects.create_from_msg_data(d)
                self.assertEqual(o.filename, d['event']['payload']['filename'])
                self.assertEqual(o.orig_data, json.dumps(d))

    def test_wrong_type(self):
        # real type but not one we accept
        data = {'host': 'example.com', 'port':80,
                'event': {'type': 'ClientOpened',
                          'payload': {'filename': 'file.gcode'}}}
        with self.assertRaises(ValidationError):
            PrintLog.objects.create_from_msg_data(data)
