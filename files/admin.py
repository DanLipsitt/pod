# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import PrintFile, PrintLog


class PrintFileAdmin(admin.ModelAdmin):
    list_display = ('id', 'file', 'filename', 'createdAt')

admin.site.register(PrintFile, PrintFileAdmin)


class PrintLogAdmin(admin.ModelAdmin):
    list_display = ('filename', 'event', 'host', 'timestamp')
    date_hierarchy = 'timestamp'
    list_filter = ('event', 'host')

admin.site.register(PrintLog, PrintLogAdmin)
