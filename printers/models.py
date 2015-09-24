from django.db import models


class Printer(models.Model):
    hostname = models.CharField(max_length=255)
    port = models.IntegerField(default=5000)

    def __str__(self):
        return self.hostname
