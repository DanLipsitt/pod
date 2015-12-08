from django.core.urlresolvers import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase


class TestPrintFileViewSet(APITestCase):

    def test_filename_from_request(self):
        """
        The original upload filename should be passed to the serializer.
        """
        url = reverse('printfile-list')
        data = {'file': SimpleUploadedFile('file.gcode', b'...')}
        resp = self.client.post(url, data)
        self.assertEqual(resp.data['filename'], data['file'].name)
