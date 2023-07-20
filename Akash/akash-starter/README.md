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
    delegatorRewards (first: 5 orderBy: REWARD_AMOUNT_ASC) {
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
          "id": "86E85192624C393A450CAA09B62B436CB98F9C0F96D8F08D845E715913A35002",
          "delegatorAddress": null,
          "validatorAddress": null,
          "rewardAmount": "0stake"
        },
        {
          "id": "A592D901A5EDF31E8470DDD6C35DC0098EEB1B844FFAF3B23A6EEDA4B2FCCF6F",
          "delegatorAddress": null,
          "validatorAddress": null,
          "rewardAmount": "0stake"
        },
        {
          "id": "1EDC72AFF48A1EE0A6BD51E84760FB56ECCC5B9D935CABF5C10B1FF4956AF952",
          "delegatorAddress": null,
          "validatorAddress": null,
          "rewardAmount": "0stake"
        },
        {
          "id": "727DC29BD21F0B4CB1B7C07856598A304A00D2CABCA850841F696E0FBC10BCBC",
          "delegatorAddress": null,
          "validatorAddress": null,
          "rewardAmount": "0stake"
        },
        {
          "id": "3C90507786EEDB3254ABAE59A8C307595763AFB52433637843E0FDE371DF102D",
          "delegatorAddress": null,
          "validatorAddress": null,
          "rewardAmount": "0stake"
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
