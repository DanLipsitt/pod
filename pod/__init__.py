# This will make sure the app is always imported when
# Django starts so that shared_task will use this app.
from .celery import app as celery_app
from setuptools_scm import get_version

__version__ = get_version()
