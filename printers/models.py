from django.db import models


class Printer(models.Model):
    name = models.CharField(max_length=64)
    hostname = models.CharField(max_length=255)
    port = models.IntegerField(default=5000)

    def __str__(self):
        return self.name or self.hostname

    @property
    def url(self):
        """Base url for the printer's OctoPrint server."""
        return 'http://{0.hostname}:{0.port}'.format(self)
