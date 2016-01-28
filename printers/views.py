from django.conf import settings
from rest_framework import serializers, viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from.models import Printer
from .serializers import PrinterSerializer
from .tasks import transfer_file_to_printers


class TransferSerializer(serializers.Serializer):
    file_path = serializers.FilePathField(path=settings.MEDIA_ROOT,
                                          allow_files=True)
    printer_urls = serializers.ListField(
        child=serializers.URLField()
    )


@api_view(['POST'])
def transfer_file(request):

    serializer = TransferSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    transfer_file_to_printers.delay(
        file_path=request.data['file_path'],
        printer_urls=request.data['printer_urls']
    )
    return Response(status=status.HTTP_202_ACCEPTED)


class PrinterViewSet(viewsets.ModelViewSet):
    queryset = Printer.objects.all()
    serializer_class = PrinterSerializer
