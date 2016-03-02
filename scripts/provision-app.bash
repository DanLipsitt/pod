#!/bin/bash

SOURCE="/vagrant"
PACKAGE_DIR="${SOURCE}/dist"
VIRTUALENV="/opt/pod/virtualenv"

python3 -m venv "$VIRTUALENV"
source "${VIRTUALENV}/bin/activate"
pip install --upgrade pip   # install latest instead of system verison
# We don't want to download any project named "pod" from the internet,
# so we turn off the index. We can then install all deps from our
# package dir, but that means we have to build them all (and some need
# a platform specific build). So instead we install the deps in a
# second step from the internet.
pip install --no-index --find-links=$PACKAGE_DIR --pre --upgrade --no-deps pod
# Install deps.
pip install pod
pip install gunicorn
pip install -r "${SOURCE}/requirements.txt"
cp ${SOURCE}/systemd/pod-*.{service,socket} /etc/systemd/system
systemctl enable pod-web
systemctl restart pod-web
