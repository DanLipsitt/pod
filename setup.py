import os
from setuptools import find_packages, setup

with open(os.path.join(os.path.dirname(__file__), 'README.md')) as readme:
    README = readme.read()

# allow setup.py to be run from any path
os.chdir(os.path.normpath(os.path.join(os.path.abspath(__file__), os.pardir)))

setup(
    name='pod',
    use_scm_version=True,
    setup_requires=['setuptools_scm'],
    packages=find_packages(),
    package_data={
        # include template html from any package
        '': [
            'templates/*/*.html',
            'static/*/*',
        ]
    },
    license='Proprietary',
    description='Type A Machines Pod Server',
    long_description=README,
    url='https://www.typeamachines.com/',
    author='Type A Machines',
    author_email='support@typeamachines.com',
)
