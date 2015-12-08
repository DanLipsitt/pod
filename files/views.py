from django.shortcuts import render
from rest_framework import viewsets

from .models import distribute_file, PrintFile
from .serializers import PrintFileSerializer


def index(request):
    filename = 'foo'
    printers = ['printer 1', 'printer 2', 'printer 3']
    distribute_file(None, filename, printers)
    context = {
        'filename': filename,
        'printers': printers
    }
    return render(request, 'files/index.htm', context)


class PrintFileViewSet(viewsets.ModelViewSet):
    queryset = PrintFile.objects.all()
    serializer_class = PrintFileSerializer

    def create(self, request):
        request.POST['filename'] = request.FILES['file'].name
        return super().create(request)
