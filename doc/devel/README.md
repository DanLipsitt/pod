# How to use it

## Quickstart

It is strongly recommended that you work in a python virtualenv. The easiest way to do that is with [virtualenvwrapper](https://virtualenvwrapper.readthedocs.org/en/latest/).

### Basic Install

```
mkvirtualenv pod
pip install -r requirements.txt
npm install
```

### Server provisioning

* Install Debian Jessie.
* Log in as root.
    * Install prereqs for Ansible install.

    ```shellsession
    apt install sudo avahi-daemon
    ```

    * Run Ansible. The first time, you will need to specify the
      password multiple times. After provisioning, sudo and ssh will
      be set up so you don't need the extra flags.

    ```shellsession
    ansible-playbook -i inventory/pod1 provision/ansible/main.yml -u typea \
      --ask-pass --ask-become-pass
    ```

### Run

```
./manage.py runserver & npm start
```

## Running the HTTP server

```
./manage.py runserver
```

or


```
./manage.py runserver_plus
```

for enhanced debugging.

This makes the following available:

  * A site admin interface at http://localhost:8000/admin
  * A browseable api at http://localhost:8000/api
  * The user-facing Pod app at http://localhost:8000/admin

## Running the websocket server

``` shellsession
DJANGO_SETTINGS_MODULE=pod.settings python -m aiohttp.web -H localhost -P 9000 multiplex.server:init

```

## Compiling the front end

```
npm start
```

You can now view version the site at http://localhost:3000 that reloads automatically whenever front end code chages.

## Component playground

You can run a special server that shows you the front end React components in isolation:

```
npm run playground
```

## Automatic tests

### Front end

Javascript tests are in `client/test/*.js`

```
npm run test
```

or

```
npm run test:watch
```

### Back end

Python tests are in each django "app" (component) at `*/tests.py`

Run the django test suite with

```
./manage.py test
```

or watch files and re-run automatically with

```
nosy
```

Configuration is in the `[nosy]` section of setup.cfg.

# API documentation

``` shellsession
make -C doc/ html
```

# Technology

There is a [list](tech.md) of some of the frameworks and libraries we are using in this project.
