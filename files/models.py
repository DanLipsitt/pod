import json
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
        msg = json.dumps(data)
        o = self.model(
            event=data['event']['type'],
            host=data['host'],
            port=data['port'],
            filename=data['event']['payload']['filename'],
            orig_data=msg
        )
        o.save()
        return o


class PrintLog(models.Model):

    # Just the event types we're interested in.
    # http://docs.octoprint.org/en/1.2.10/events/index.html#printing
    EVENT_TYPES = (
        ('started', 'PrintStarted'),
        ('paused', 'PrintPaused'),
        ('resumed', 'PrintResumed'),
        ('cancelled', 'PrintCancelled'),
        ('failed', 'PrintFailed'),
        ('done', 'PrintDone'),
    )

    printrun = models.ForeignKey(PrintRun, null=True)
    host = models.CharField(max_length=64)
    port = models.IntegerField()
    filename = models.CharField(max_length=256)
    timestamp = models.DateTimeField(auto_now_add=True)
    event = models.CharField(max_length=32, choices=EVENT_TYPES)
    orig_data = models.TextField()

    def save(self, *args, **kwargs):
        # set the printrun
        super().save(*args, **kwargs)

    objects = PrintLogManager()
