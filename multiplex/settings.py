import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = '---'

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'files',
    'printers',
)

DATABASES = {                           # FIXME share with django
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db/db.sqlite3'),
    }
}
