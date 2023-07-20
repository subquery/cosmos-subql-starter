# SubQuery - Starter Package for Sei

A basic example project with an event handler for Akash Network. Read more about SubQuery support for Cosmos at https://academy.subquery.network/quickstart/quickstart_chains/cosmos.html. This project indexes all eth-usd prices provided to the Levana Dex protocol by the Pyth price oracle.

The Starter Package is an example that you can use as a starting point for developing your SubQuery project.

A SubQuery package defines which data SubQuery will index from the blockchain, and how it will store it.

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
    delegatorRewards (first: 5 orderBy: REWARD_AMOUNT_DESC) {
    	nodes {
        id
        delegatorAddress
        validatorAddress
        rewardAmount
        }
    }	
}
```
This is the result we should be getting:

```json
{
  "data": {
    "delegatorRewards": {
      "nodes": [
        {
          "id": "D8BFFFDC059A9DEA863700F77C61F81B1E4CE1C994E3BC8C2A29E16ECE5F263A",
          "delegatorAddress": null,
          "validatorAddress": null,
          "rewardAmount": "9924148uakt"
        },
        {
          "id": "A3548DB94512F3BB9F1C8336CDCC8F55C6C90823D3CA236B6857BD5A84510391",
          "delegatorAddress": null,
          "validatorAddress": null,
          "rewardAmount": "9915678uakt"
        },
        {
          "id": "7BB563443B2AF235DBF2D604872BF6A54C3811A806450D34A87AEBD14B86B021",
          "delegatorAddress": null,
          "validatorAddress": null,
          "rewardAmount": "98991uakt"
        },
        {
          "id": "1D7AA39EAD90D0F88F8DADD49A286B2F981A662D8E94907E2E78B132D74453FB",
          "delegatorAddress": null,
          "validatorAddress": null,
          "rewardAmount": "9876904uakt"
        },
        {
          "id": "D638D609C2AF578F8BCA64F3C56D0461C8996DBC3B8FA4623E5E8F4F207DE916",
          "delegatorAddress": null,
          "validatorAddress": null,
          "rewardAmount": "987440uakt"
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
