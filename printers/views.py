from django.conf import settings
from rest_framework import serializers, viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from revproxy.views import ProxyView
from urllib.parse import urljoin

from  files.models import PrintFile
from .models import Printer
from .serializers import PrinterSerializer
from .tasks import transfer_file_to_printers


class TransferSerializer(serializers.Serializer):
    file = serializers.IntegerField(required=True)
    printers = serializers.ListField(
        child=serializers.IntegerField(required=True),
        required=True
    )


@api_view(['POST'])
def transfer_file(request):

    serializer = TransferSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    file_path = PrintFile.objects.get(
        id=serializer.validated_data['file']
    ).file.path

    printer_urls = ['{}/api/files/local'.format(printer.url)
                    for printer
                    in Printer.objects.filter(
                        id__in=serializer.validated_data['printers'])]

    transfer_file_to_printers.delay(
        file_path=file_path,
        printer_urls=printer_urls
    )
    return Response(status=status.HTTP_202_ACCEPTED)


class PrinterViewSet(viewsets.ModelViewSet):
    queryset = Printer.objects.all()
    serializer_class = PrinterSerializer


class PrinterProxy(ProxyView):

    def get_upstream(self, path):
        return urljoin(self.printer_url, '/')

    def dispatch(self, request, path, **kwargs):
        self.printer_url = Printer.objects.get(id=kwargs['id']).url
        return super().dispatch(request, path)
