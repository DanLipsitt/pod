from django.conf.urls import include, patterns, url
from django.contrib import admin


admin.site.site_header = 'Type A Print Pod'
admin.site.site_title = 'Type A Print Pod'

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
]
