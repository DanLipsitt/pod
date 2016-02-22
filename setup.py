import os
from setuptools import find_packages, setup

with open(os.path.join(os.path.dirname(__file__), 'README.md')) as readme:
    README = readme.read()

# allow setup.py to be run from any path
os.chdir(os.path.normpath(os.path.join(os.path.abspath(__file__), os.pardir)))

setup(
    name='pod',
    version='0.1.0.dev0',
    packages=find_packages(),
    package_data={
        # include template html from any package
        '': [
            'templates/*/*.html',
        ]
    },
    license='Proprietary',
    description='Type A Machines Pod Server',
    long_description=README,
    url='https://www.typeamachines.com/',
    author='Type A Machines',
    author_email='support@typeamachines.com',
)
