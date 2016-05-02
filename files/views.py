from django.shortcuts import render
from django.utils.datastructures import MultiValueDictKeyError
from rest_framework import viewsets

from .models import PrintFile, PrintLog
from .serializers import PrintFileSerializer, PrintLogSerializer


class PrintFileViewSet(viewsets.ModelViewSet):
    queryset = PrintFile.objects.all()
    serializer_class = PrintFileSerializer

    def create(self, request):
        try:
            request.POST['filename'] = request.FILES['file'].name
        except MultiValueDictKeyError as e:
            # Pass it along with missing fields. The serializer
            # validation will catch it.
            pass
        return super().create(request)


class PrintLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PrintLog.objects.all()
    serializer_class = PrintLogSerializer
