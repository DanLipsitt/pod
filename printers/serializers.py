from .models import Printer
from rest_framework import serializers


class PrinterSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.CharField(read_only=True)

    class Meta:
        model = Printer
        fields = ('id', 'name', 'restUrl', 'url', 'hostname', 'port')
