all: wheel docs

wheel: frontend
	python setup.py bdist_wheel

frontend:
	npm run build

docs:
	$(MAKE) -C doc/ html

.PHONY: all wheel frontend docs
