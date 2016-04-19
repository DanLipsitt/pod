# How to use it

## Quickstart

It is strongly recommended that you work in a python virtualenv. The easiest way to do that is with [virtualenvwrapper](https://virtualenvwrapper.readthedocs.org/en/latest/).

### Install

```
mkvirtualenv pod
pip install -r requirements.txt
npm install
```

### Run

```
./manage.py runserver & npm start
```

## Running the server

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

# Technology

There is a [list](tech.md) of some of the frameworks and libraries we are using in this project.
