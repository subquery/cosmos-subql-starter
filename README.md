# Ledger SubQuery

This is the Fetch ledger SubQuery project, an indexer for the Fetch network.


# Developing

## Getting Started

### 1. Ensure submodules are updated

```shell
git submodule update --init --recursive
```

### 2. Install dependencies

```shell
yarn

# install submodule dependencies
(cd ./subql && yarn)
```

### 3. Generate types

```shell
yarn codegen
```

### 4. Build

```shell
yarn build

# build submodule
(cd ./subql && yarn build)
```

### 5. Run locally

```shell
yarn start:docker
```

## End-to-end Testing

### 1. Install dependencies

```shell
pipenv install
```

### 2. Run all e2e tests

_Note: end-to-end tests will truncate tables in the DB and interact with the configured fetchd node._

```shell
pipenv run python -m unittest discover -s ./test
```
