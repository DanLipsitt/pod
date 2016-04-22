from django.shortcuts import render
from django.utils.datastructures import MultiValueDictKeyError
from rest_framework import viewsets

from .models import PrintFile
from .serializers import PrintFileSerializer


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
