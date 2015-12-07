from django.conf.urls import include, patterns, url
from django.contrib import admin
from django.views.generic import TemplateView


admin.site.site_header = 'Type A Print Pod'
admin.site.site_title = 'Type A Print Pod'

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html'),
        name='pod-index'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^files/', include('files.urls', namespace='files')),
]
