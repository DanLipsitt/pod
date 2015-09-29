from django.contrib import admin

from .models import *

admin.site.register(PrintJob)
admin.site.register(PrintAssembly)
admin.site.register(PrintPart)
admin.site.register(SlicedModelFile)
admin.site.register(SourceModelFile)
admin.site.register(SlicedModelRev)
