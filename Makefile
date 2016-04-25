all: wheel

wheel: frontend
	python setup.py bdist_wheel

frontend:
	npm run build
