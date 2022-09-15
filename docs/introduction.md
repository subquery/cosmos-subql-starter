# Introduction

The ledger-subquery is a [SubQuery](https://www.subquery.network/)-based indexer for the Fetch ledger.
This indexer provides a [Graphql](https://www.subquery.network/) API for querying tracked entities.
For a list of tracked entities, see the [schema.graphql file](https://github.com/fetchai/ledger-subquery/blob/main/schema.graphql).

## Architecture

### Component Diagram

![subquery architecture component diagram legend](./assets/architecture_legend.svg)
![subquery architecture component diagram](./assets/architecture.svg)

## Querying

The graphql API relies heavily on [postgraphile (as a library)](https://www.graphile.org/postgraphile/usage-library/).
Postgraphile plugins also play a critical role; in particular, the [connection-filter](https://github.com/graphile-contrib/postgraphile-plugin-connection-filter) and [pg-aggregates](https://github.com/graphile/pg-aggregates) plugins.
For more information, please refer to their documentation:

- [connection-filter plugin](https://github.com/graphile-contrib/postgraphile-plugin-connection-filter)
    - [operators](https://github.com/graphile-contrib/postgraphile-plugin-connection-filter/blob/master/docs/operators.md#json-jsonb)
    - [query examples](https://github.com/graphile-contrib/postgraphile-plugin-connection-filter/blob/master/docs/examples.md)
- [pg-aggregates plugin](https://github.com/graphile/pg-aggregates)

Additional examples of queries and use cases can be found in the [end-to-end test suite](https://github.com/fetchai/ledger-subquery/blob/main/test).

## Entities

Entities tracked by the indexer exist at varying levels of abstraction. "Lower-level" entities include the [primitives](#primitive-entities) (i.e. blocks, transactions, messages, and events), upon which "higher-level" entities are constructed (e.g. LegacyBridgeSwaps).

Some entities are derived from objects which do not correspond to any network state change (e.g. failed transactions and their messages).
In the case of failed transactions, it is desirable to index the associated data for end-user reference.
This notion may also apply to other objects but should be considered carefully to avoid storing invalid or useless data.

### Primitive entities

_(see: [schema.graphql](https://github.com/ledger-subquery/blob/main/schema.graphql))_

- blocks
- transactions
- messages
- events

### Relationship diagram

![entity relationship diagram legend](./assets/entities_legend.svg)

![entity relationship diagram](./assets/entities.svg)

