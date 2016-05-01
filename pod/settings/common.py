"""
Settings and utils shared between the django http server and the aiohttp
websocket multiplex server.
"""

from pathlib import Path

def enable_conditional(apps, middlewares, debug, app, middleware=None,
                       debug_only=False):
    if debug_only and not debug:
        return
    try:
        __import__(app)
        if app not in apps:
            apps.append(app)
        if middleware is not None and middleware not in middlewares:
            middlewares.append(middleware)
    except ImportError:
        pass

BASE_DIR = Path(__file__).parents[2].resolve()

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'x$tr6zuvbr#+#$0#@_&*=5#_zfcnb^j42yovsq4dr2et*wi)7r'

# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': str(BASE_DIR / 'db/db.sqlite3'),
    }
}
