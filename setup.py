import os
from setuptools import find_packages, setup
from pkg_resources import parse_requirements

with open(os.path.join(os.path.dirname(__file__), 'README.md')) as readme:
    README = readme.read()

# allow setup.py to be run from any path
os.chdir(os.path.normpath(os.path.join(os.path.abspath(__file__), os.pardir)))

setup(
    name='type-a-pod',
    use_scm_version={
        'write_to': 'pod/__version__.py',
        'version_scheme': 'post-release',
        'local_scheme': 'node-and-date',
    },
    setup_requires=['setuptools_scm'],
    install_requires=[str(req) for req in
                      parse_requirements(open('requirements.txt'))],
    packages=find_packages(),
    package_data={
        # include template html from any package
        '': [
            'templates/*/*.html',
            'static/*/*',
            'fixtures/*.json',
        ]
    },
    license='Proprietary',
    description='Type A Machines Pod Server',
    long_description=README,
    url='https://www.typeamachines.com/',
    author='Type A Machines',
    author_email='support@typeamachines.com',
)
