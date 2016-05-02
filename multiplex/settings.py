# Import settings shared with the django http server.
from pod.settings.common import *

# Override apps to use only the ones we need.
INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'files',
    'printers',
)
