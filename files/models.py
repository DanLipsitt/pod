from django.db import models
from printers.models import Printer
from django.contrib.auth.models import User


class PrintFile(models.Model):

    file = models.FileField()
    filename = models.CharField(max_length=256)
    createdAt = models.DateTimeField(auto_now_add=True)


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


class PrintLog(models.Model):

    printrun = models.ForeignKey(PrintRun)
    server_time = models.DateTimeField()
    printer_time = models.DateTimeField()
    event = models.CharField(max_length=16)
