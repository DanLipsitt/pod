# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import PrintFile


class PrintFileAdmin(admin.ModelAdmin):
    list_display = ('id', 'file', 'filename')

admin.site.register(PrintFile, PrintFileAdmin)
