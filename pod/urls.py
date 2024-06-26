from django.conf import settings
from django.conf.urls import include, patterns, url
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework import routers
import django.contrib.auth.urls
import pod.views
import files.views
import printers.views

admin.site.site_header = 'Type A Print Pod'
admin.site.site_title = 'Type A Print Pod'

api_router = routers.DefaultRouter()
api_router.register(r'files', files.views.PrintFileViewSet)
api_router.register(r'printlogs', files.views.PrintLogViewSet)
api_router.register(r'printers', printers.views.PrinterViewSet)

urlpatterns = [
    url(r'^$', pod.views.index, name='index'),
    url(r'^accounts/', include(django.contrib.auth.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(api_router.urls)),
    url(r'^api-auth/',
        include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/printers/transfer', printers.views.transfer_file),
    url(r'^api/printers/(?P<id>[0-9]+)/(?P<path>.*)$',
        printers.views.PrinterProxy.as_view(),
        name='printer_proxy'),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
