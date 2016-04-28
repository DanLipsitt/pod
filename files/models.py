from django.db import models
from printers.models import Printer
from django.contrib.auth.models import User


class PrintFile(models.Model):

    file = models.FileField()
    filename = models.CharField(max_length=256)
    createdAt = models.DateTimeField(auto_now_add=True)


class PrintRunManager(models.Manager):

    def current_for(self, host, filename):
        pass


class PrintRun(models.Model):

    printfile = models.ForeignKey(PrintFile)
    printer = models.ForeignKey(Printer)

    def state(self):
        """
        Current state based on most recent event.
        """
        pass                              # FIXME

    def duration(self):
        """
        Time from current start until pause, end, or now.
        """
        pass                              # FIXME

    objects = PrintRunManager()


class PrintLogManager(models.Manager):

    def create_from_msg_data(self, data):
        o = self.model(
            filename=data['event']['payload']['filename'],
        )
        o.save()
        return o


class PrintLog(models.Model):

    printrun = models.ForeignKey(PrintRun, null=True)
    host = models.CharField(max_length=64)
    filename = models.CharField(max_length=256)
    timestamp = models.DateTimeField(auto_now_add=True)
    event = models.CharField(max_length=32)
    orig_data = models.TextField()

    def save(self, *args, **kwargs):
        # set the printrun
        super().save(*args, **kwargs)

    objects = PrintLogManager()
