octoprint: ${octoprint__bin:-octoprint} --port=$PORT
web: ./manage.py runserver
rabbitmq: ${rabbitmq__bin:-rabbitmq-server}
celery: celery -A pod worker -l info
frontend: PORT=${browsersync__port:-3000} npm start
playground: npm run playground
