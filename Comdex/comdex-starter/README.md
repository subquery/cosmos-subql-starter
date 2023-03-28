# SubQuery - Starter Package for Cosmos Comdex

A basic Comdex example project with an event handler. Read more about SubQuery support for Cosmos at https://academy.subquery.network/quickstart/quickstart_chains/cosmos.html.

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
{
  query {
    delegatorRewards(first: 5, orderBy: REWARD_AMOUNT_DESC) {
      nodes {
        id
        blockHeight
        txHash
        feeDenomination
        feeAmount
        rewardAmount
        delegatorAddress
        validatorAddress
      }
    }
  }
}
```

```json
{
  "data": {
    "query": {
      "delegatorRewards": {
        "nodes": [
          {
            "id": "F6006AED17A78B6D4B77AFB1A860591ED71225E2E7B7A7E439DB825447739E48-0-1",
            "blockHeight": "925",
            "txHash": "F6006AED17A78B6D4B77AFB1A860591ED71225E2E7B7A7E439DB825447739E48",
            "feeDenomination": null,
            "feeAmount": null,
            "rewardAmount": "9936251ucmdx",
            "delegatorAddress": "comdex1dfsdsecpxycnf4rzt5f3h387d0aujvn3r2wfyy",
            "validatorAddress": "comdexvaloper1dfsdsecpxycnf4rzt5f3h387d0aujvn3sa5m69"
          },
          {
            "id": "E9E6E17C8437655B44C7BF7F3449D7DE37E422B13329612947B1B110180234DC-0-1",
            "blockHeight": "1908",
            "txHash": "E9E6E17C8437655B44C7BF7F3449D7DE37E422B13329612947B1B110180234DC",
            "feeDenomination": null,
            "feeAmount": null,
            "rewardAmount": "9918768ucmdx",
            "delegatorAddress": "comdex1kqv0ky7xmjqwlnqaalqcj2yr262w9zs7nyv9nd",
            "validatorAddress": "comdexvaloper1kqv0ky7xmjqwlnqaalqcj2yr262w9zs7qnkhdv"
          },
          {
            "id": "27A426BB250C1BAEECE9F93DF256580D22F4BB4E3B9F3B5913BAD9D052C787E6-0-1",
            "blockHeight": "891",
            "txHash": "27A426BB250C1BAEECE9F93DF256580D22F4BB4E3B9F3B5913BAD9D052C787E6",
            "feeDenomination": null,
            "feeAmount": null,
            "rewardAmount": "9889891ucmdx",
            "delegatorAddress": "comdex1dfsdsecpxycnf4rzt5f3h387d0aujvn3r2wfyy",
            "validatorAddress": "comdexvaloper1dfsdsecpxycnf4rzt5f3h387d0aujvn3sa5m69"
          },
          {
            "id": "A980E8D47C022B820CB5DC77FDA3F46D12054BDFDF1E8E0AA509E3A5983ED900-0-1",
            "blockHeight": "1441",
            "txHash": "A980E8D47C022B820CB5DC77FDA3F46D12054BDFDF1E8E0AA509E3A5983ED900",
            "feeDenomination": null,
            "feeAmount": null,
            "rewardAmount": "9885533ucmdx",
            "delegatorAddress": "comdex17lehl7q4ua3t28pzh2edv2flsc9mt7xcwmm5f5",
            "validatorAddress": "comdexvaloper17lehl7q4ua3t28pzh2edv2flsc9mt7xcavpxh4"
          },
          {
            "id": "9D93F6A00274EB5C73261909ADE2F40FBEEB5F4DDDE10B580386816CC026CB72-0-1",
            "blockHeight": "856",
            "txHash": "9D93F6A00274EB5C73261909ADE2F40FBEEB5F4DDDE10B580386816CC026CB72",
            "feeDenomination": null,
            "feeAmount": null,
            "rewardAmount": "9877250ucmdx",
            "delegatorAddress": "comdex1dfsdsecpxycnf4rzt5f3h387d0aujvn3r2wfyy",
            "validatorAddress": "comdexvaloper1dfsdsecpxycnf4rzt5f3h387d0aujvn3sa5m69"
          }
        ]
      }
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
