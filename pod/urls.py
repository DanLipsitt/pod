from django.conf import settings
from django.conf.urls import include, patterns, url
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework import routers
import files.views
import printers.views

admin.site.site_header = 'Type A Print Pod'
admin.site.site_title = 'Type A Print Pod'

api_router = routers.DefaultRouter()
api_router.register(r'files', files.views.PrintFileViewSet)
api_router.register(r'printers', printers.views.PrinterViewSet)

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html'),
        name='pod-index'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(api_router.urls)),
    url(r'^api-auth/',
        include('rest_framework.urls', namespace='rest_framework')),
    url(r'^files/', include('files.urls', namespace='files')),
    url(r'^api/printers/transfer', printers.views.transfer_file),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
