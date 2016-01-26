web: ./manage.py runserver
crossbar: crossbar start
frontend: PORT=${browsersync__port:-3000} npm start
playground: npm run playground
httpbin: python -m werkzeug.serving --bind=:$PORT httpbin.core:app
octoprint: $octoprint
