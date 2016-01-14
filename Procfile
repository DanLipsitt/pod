web: ./manage.py runserver
websocket: ./manage.py runwsserver
worker: ./manage.py runworker
frontend: PORT=${browsersync__port:-3000} npm start
playground: npm run playground
httpbin: python -m werkzeug.serving --bind=:$PORT httpbin.core:app
