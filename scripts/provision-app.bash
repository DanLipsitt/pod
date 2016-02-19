#!/bin/bash

SOURCE="/vagrant"
VIRTUALENV="/opt/pod/virtualenv"

python3 -m venv "$VIRTUALENV"
source "${VIRTUALENV}/bin/activate"
pip install "$SOURCE"
pip install gunicorn
pip install -r /vagrant/requirements.txt
cp ${SOURCE}/systemd/pod-*.{service,socket} /etc/systemd/system
systemctl enable pod-web
