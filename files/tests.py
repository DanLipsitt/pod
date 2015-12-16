from django.core.urlresolvers import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase
from io import StringIO

from .models import PrintFile


class TestPrintFileViewSet(APITestCase):

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
