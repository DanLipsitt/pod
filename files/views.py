from django.shortcuts import render

from .models import distribute_file


def index(request):
    filename = 'foo'
    printers = ['printer 1', 'printer 2', 'printer 3']
    distribute_file(None, filename, printers)
    context = {
        'filename': filename,
        'printers': printers
    }
    return render(request, 'files/index.htm', context)
