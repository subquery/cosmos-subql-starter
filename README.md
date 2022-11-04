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
(cd ./subql && yarn install && yarn build)
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

## DB Migrations

This repository uses [graphile-migrate](https://github.com/graphile/migrate) CLI to manage database migrations.

### Install dependencies

Install global npm dependencies:

- [graphile-migrate](https://github.com/graphile/migrate)
- [plv8ify](https://plv8.github.io/)

```bash
npm install -g graphile-migrate plv8ify
```

### Running Migrations

Given that you already have a database with some, potentially outdated, schema, you can catch up to the latest state by running all committed but unapplied migrations:

```bash
graphile-migrate migrate
```

_(see: [graphile-migrate README](https://github.com/graphile/migrate#usage) for more)_

### Creating Migrations

#### Initial Schema

When testing (pre-commit) migrations, it is necessary to load some starting schema.
This can be represented as a set of SQL statements (SQL file) which would create the respective schema and optionally, data.
An [action](https://github.com/graphile/migrate#actions) is configured in [.gmrc](./.gmrc) to run [`./migrations/`](./migrations/initial_schema.sql) when the DB is reset (i.e. `graphile-migrate reset --erase`).

An initial schema sql file can be generated from an existing DB schema (optionally, including data) via [`pg_dump`](https://www.postgresql.org/docs/current/app-pgdump.html).
Package scripts are available for dumping the schema only or for dumping the schema plus any data present:
```bash
yarn db:dump:schema
# OR
yarn db:dump:all
```

Additional arguments may be forwarded to the underlying `pg_dump` command by appending `-- <additional args / flags>` when running package scripts (see: [npm-run-script docs](https://docs.npmjs.com/cli/v6/commands/npm-run-script)). For example:

```bash
# Dumps schema only from blocks and messages tables
yarn db:dump:schema -- -t blocks -t messages
```

_(see: [graphile-migraate README > Storing the initial state](https://github.com/graphile/migrate#storing-the-initial-state) for more)_

##### When `pg_dump` is insufficient

In some cases, `pg_dump` may not export a relevant DB object; for example, enums.
In these cases it is necessary to manually extract the relevant data from the DB and incorporate it into the initial_schema.sql file.

In the case of **enums**, the following queries expose the relevant records, the results from which can be re-written as a COPY or INSERT statements into the respective tables from which they came:

```
# List enum types
SELECT oid, typname FROM pg_type WHERE typcategory = 'E';

# List values for a particular enum
SELECT * from pg_enum where enumtypid = <pg_type.oid>;
```

#### TypeScript migration

1. Write a migration in ./migrations/current.ts which exports a single function that kicks off the migration (see: [plv8 docs > built-ins](https://plv8.github.io/#plv8-built-ins)).
2. Transform the current typescript migration function to a .sql function:
    ```
    yarn plv8ify
    ```
3. Since we're using a non-default schema name, and to enable plv8, we must prepend the following preamble to the generated .sql file:
    ```
    CREATE SCHEMA IF NOT EXISTS app;
    SET SCHEMA 'app';
    CREATE EXTENSION plv8;
    ```
4. In order for the migration function to execute when the migration is run, append the following to the .sql file (replacing `<>` and `[]` with their respective values):
    ```
    SELECT * from <migration function>([arg, ...]>);
    ```
   
#### Commit migration

Once you're ready to apply the migration:
```bash
graphile-migrate commit
```

_(see: [graphile-migrate README](https://github.com/graphile/migrate#usage) for more)_

##### Debugging

When things aren't going perfectly, [`plv8.elog`](https://plv8.github.io/#plv8-built-ins) is extremely useful for getting more detail out of the running migration.
Be sure to be looking at the **postgres service's logs** (as opposed to the error message returned by `graphile-migrate`):

```bash
docker compose logs -f postgres
```
