from .models import PrintFile, PrintLog
from rest_framework import serializers


class PrintFileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PrintFile
        fields = ('id', 'restUrl', 'file', 'filename', 'createdAt')


class PrintLogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PrintLog
        fields = ('id', 'restUrl', 'host', 'port', 'filename', 'timestamp',
                  'event')
