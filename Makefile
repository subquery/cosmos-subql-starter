lint:
	black src/genesis tests
	isort src/genesis tests
	flake8 src/genesis tests
	mypy src/genesis tests --disable-error-code import
	pylint src/genesis tests

lint-checks:
	black --check --verbose src/genesis tests
	isort --check-only src/genesis tests
	#flake8 src/genesis tests
	#mypy src/genesis tests --disable-error-code import
	#pylint src/genesis tests

