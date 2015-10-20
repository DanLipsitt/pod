from django.db import models


class PrintFile(models.Model):

    f = models.FileField()
    filename = models.CharField(max_length=256)


def distribute_file(f, filename, printers):
    import time

    for printer in printers:
        print("starting {}".format(printer))
        time.sleep(1)
        print("finished {}".format(printer))
