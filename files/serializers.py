from .models import PrintFile
from rest_framework import serializers


class PrintFileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PrintFile
        fields = ('id', 'restUrl', 'file', 'filename', 'createdAt')
