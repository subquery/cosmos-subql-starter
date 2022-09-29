FROM python:3.9-slim-buster

# Install pipenv and compilation dependencies
RUN pip install pipenv
RUN apt-get update && apt-get install -y --no-install-recommends gcc build-essential libpq-dev

WORKDIR /app

# add the dependencies
COPY ./Pipfile Pipfile.lock /app/
RUN PIPENV_VENV_IN_PROJECT=1 pipenv install

# add the remaining parts of the produce the build
ADD ./scripts/genesis.py /app/scripts/genesis.py
COPY ./src/genesis/ /app/src/genesis/

ENTRYPOINT ["pipenv", "run"]
