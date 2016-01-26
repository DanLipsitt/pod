from .models import Printer
from rest_framework import serializers


class PrinterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Printer
        fields = '__all__'
