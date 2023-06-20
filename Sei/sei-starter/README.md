# SubQuery - Starter Package for Sei

A basic example project with an event handler for Sei Network. Read more about SubQuery support for Cosmos at https://academy.subquery.network/quickstart/quickstart_chains/cosmos.html. This project indexes all eth-usd prices provided to the Levana Dex protocol by the Pyth price oracle.

The Starter Package is an example that you can use as a starting point for developing your SubQuery project.

A SubQuery package defines which data SubQuery will index from the blockchain, and how it will store it.

This Starter Package by default allows **indexing all Delegator Reward withdrawls on Comdex**.

## Preparation

#### Environment and dependencies

- [Typescript](https://www.typescriptlang.org/) is required to compile project and define types.

- Both SubQuery CLI and generated Project have dependencies and require [Node](https://nodejs.org/en/).

- You will also need [Yarn](https://classic.yarnpkg.com/lang/en/docs/install) or [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [Docker](https://docs.docker.com/engine/install/).

#### Install the SubQuery CLI and Project Dependencies

Install SubQuery CLI globally on your terminal by using NPM (we don't recommend using Yarn to install global dependencies):

```
npm install -g @subql/cli
```

Under the project directory, install the node dependencies by running the following command ([Learn more](https://academy.subquery.network/build/install.html#)):

```
yarn OR npm install
```

## Configure the Project Further

If you want to change your project you will need to work on the following files:

- The Manifest in `project.yaml` to **configure your project**
- The GraphQL Schema in `schema.graphql` to **define shape of the data**
- The Mapping functions in `src/mappings/` directory to **transform data coming from blockchain**

[Learn more](https://academy.subquery.network/build/introduction.html)

## Build the Project

#### 1. Generate Associated Typescript

We will generate the defined entity models with the following command:

```
yarn codegen OR npm run-script codegen
```

If you change any data in your `schema.graphql`, you should run this command again. You should also consider deleting your local database in the `.data/` directory.

#### 2. Build the project

This builds your project into static files within the `/dist` for running.

```
yarn build OR npm run-script codegen
```

If you change any data in your `src/mappings/` directory you should run this command again.

## Indexing and Query

#### 1. Run Docker

Under the project directory run following command:

```
yarn start:docker
```

This will download packages from Docker, create a new Postgres database, and start an indexing an query service. When you first run this, it may take some time to start, please be patient.

#### 2. Query this Project

Open your browser and head to `http://localhost:3000`.

Finally, you should see a GraphQL playground is showing in the explorer and the schemas that ready to query. On the right hand side is a documentation button that shows you what models you have to construct queries.

With this project can try to query with the following code to get a taste of how it works.

```graphql
query {
  exchangeRates(first: 5, orderBy: BLOCK_HEIGHT_DESC) {
    totalCount
    nodes {
      id
      blockHeight
      timestamp
      txHash
      contractName
      contractAddress
      contractVersion
      longRate
      shortRate
      priceNotional
      priceUSD
    }
  }
  dailyAggregations(first: 5, orderBy: ID_DESC) {
    nodes {
      id
      openPriceUSD
      lowPriceUSD
      highPriceUSD
      closePriceUSD
    }
  }
}
```

```json
{
  "data": {
    "exchangeRates": {
      "totalCount": 23,
      "nodes": [
        {
          "id": "15613515-sei1xg9nz66lw2u6esc036tcjug35s06wljenjfn9qntzv6pcee3782q8hyx28",
          "blockHeight": "15613515",
          "timestamp": "2023-06-16T06:59:29.321",
          "txHash": "3BCCD70CCA957630D33E059EA9F74882A53B74603FCFAED0EFB5A4F8DB761153",
          "contractName": "levana.finance:market",
          "contractAddress": "sei1xg9nz66lw2u6esc036tcjug35s06wljenjfn9qntzv6pcee3782q8hyx28",
          "contractVersion": "0.1.0-beta.15",
          "longRate": -0.11993339988124402,
          "shortRate": 0.11803523598915301,
          "priceNotional": 0.000598617598372426,
          "priceUSD": 1670.515539000002
        },
        {
          "id": "15613506-sei1xg9nz66lw2u6esc036tcjug35s06wljenjfn9qntzv6pcee3782q8hyx28",
          "blockHeight": "15613506",
          "timestamp": "2023-06-16T06:59:25.818",
          "txHash": "EB1839610D908D1D3DF71E89EB0CE7C10582FC85EE4A8070298E859AADC03B51",
          "contractName": "levana.finance:market",
          "contractAddress": "sei1xg9nz66lw2u6esc036tcjug35s06wljenjfn9qntzv6pcee3782q8hyx28",
          "contractVersion": "0.1.0-beta.15",
          "longRate": -0.11993339988124402,
          "shortRate": 0.11803523598915301,
          "priceNotional": 0.000598619969003707,
          "priceUSD": 1670.5089234900004
        },
        {
          "id": "15613502-sei1xg9nz66lw2u6esc036tcjug35s06wljenjfn9qntzv6pcee3782q8hyx28",
          "blockHeight": "15613502",
          "timestamp": "2023-06-16T06:59:23.04",
          "txHash": "65E8CB054C8508A7C26AB9E096CBB5006D2DDA48845DAFE8EB272F71AB4E74C6",
          "contractName": "levana.finance:market",
          "contractAddress": "sei1xg9nz66lw2u6esc036tcjug35s06wljenjfn9qntzv6pcee3782q8hyx28",
          "contractVersion": "0.1.0-beta.15",
          "longRate": -0.11993339988124402,
          "shortRate": 0.11803523598915301,
          "priceNotional": 0.000598615999812026,
          "priceUSD": 1670.5199999900008
        },
        {
          "id": "15613497-sei1xg9nz66lw2u6esc036tcjug35s06wljenjfn9qntzv6pcee3782q8hyx28",
          "blockHeight": "15613497",
          "timestamp": "2023-06-16T06:59:19.829",
          "txHash": "88FCEB4157E6C88455DF227A2627F621484ABE8F8C150CC1A4A55AF6AE79FC7A",
          "contractName": "levana.finance:market",
          "contractAddress": "sei1xg9nz66lw2u6esc036tcjug35s06wljenjfn9qntzv6pcee3782q8hyx28",
          "contractVersion": "0.1.0-beta.15",
          "longRate": -0.11993339988124402,
          "shortRate": 0.11803523598915301,
          "priceNotional": 0.000598615999812026,
          "priceUSD": 1670.5199999900008
        },
        {
          "id": "15613491-sei1xg9nz66lw2u6esc036tcjug35s06wljenjfn9qntzv6pcee3782q8hyx28",
          "blockHeight": "15613491",
          "timestamp": "2023-06-16T06:59:15.753",
          "txHash": "85C0BF5704247B0E3132C55206CFD236BE2A2E5E25EEDB3F0D657C8A534328D3",
          "contractName": "levana.finance:market",
          "contractAddress": "sei1xg9nz66lw2u6esc036tcjug35s06wljenjfn9qntzv6pcee3782q8hyx28",
          "contractVersion": "0.1.0-beta.15",
          "longRate": -0.11993339988124402,
          "shortRate": 0.11803523598915301,
          "priceNotional": 0.000598608833075524,
          "priceUSD": 1670.5399999900003
        }
      ]
    },
    "dailyAggregations": {
      "nodes": [
        {
          "id": "2023-06-16",
          "openPriceUSD": 1670.76,
          "lowPriceUSD": 1670.508887540001,
          "highPriceUSD": 1670.8,
          "closePriceUSD": 1670.515539000002
        }
      ]
    }
  }
}
```

## Useful Resources

- [SubQuery Documentation](https://academy.subquery.network/)
- [Tips and Tricks for Performance Improvements](https://academy.subquery.network/faqs/faqs.html#how-can-i-optimise-my-project-to-speed-it-up)
- [Automated Historical State tracking](https://academy.subquery.network/th/run_publish/historical.html)
- [GraphQL Subscriptions](https://academy.subquery.network/run_publish/subscription.html)
- [Discord with Technical Support Channel](https://discord.com/invite/subquery)
