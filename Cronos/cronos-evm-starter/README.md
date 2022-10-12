# SubQuery - Starter Package

A basic Cosmos Ethermint EVM (based on Cronos) example project with an event and call handler. Read more about this at https://academy.subquery.network/build/cosmos-evm.html. This project can be use as a starting point for developing your SubQuery project. 

The Starter Package is an example that you can use as a starting point for developing your SubQuery project.
A SubQuery package defines which data The SubQuery will index from the Substrate blockchain, and how it will store it.

This Starter Package by default allows **indexing transactions and approvals of Wrapped CRO Token**. 

## Preparation

#### Environment and dependencies 

- [Typescript](https://www.typescriptlang.org/) is required to compile project and define types.

- Both SubQuery CLI and generated Project have dependencies and require [Node](https://nodejs.org/en/).

- You will also need [Yarn](https://classic.yarnpkg.com/lang/en/docs/install ) or [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [Docker](https://docs.docker.com/engine/install/). 

#### Install the SubQuery CLI

Install SubQuery CLI globally on your terminal by using NPM:

```
npm install -g @subql/cli
```

Run help to see available commands and usage provide by CLI

```
subql help
```

## In case of Initializing the Starter Package (optional)

Inside the directory in which you want to create the SubQuery project run the following command and follow all the steps chosing project name, GitHub repo addres, network familay, rpc endpoint and more. Everything can by changed afterwords as well. 

```
subql init project-name
```

Then you should see a folder with your project name has been created inside the directory, you can use this as the start point of your project. And the files should be identical as in the [Directory Structure](https://academy.subquery.network/build/introduction.html#directory-structure).


## Configure the Project Further

If you want to change your project you will need to work on the following files:

- The Manifest in `project.yaml` to **configure your project**
- The GraphQL Schema in `schema.graphql` to **define shape of the data**
- The Mapping functions in `src/mappings/` directory to **transform data coming from blockchain**

[Learn more](https://academy.subquery.network/build/introduction.html)

## Build the Project 

#### 1. Install dependencies

Under the project directory, install the node dependencies by running the following command:

```
yarn install OR npm install
```

[Learn more](https://academy.subquery.network/build/install.html#)

#### 2. Generate Associated Typescript

Next, we will generate the associated typescript with the following command:

```
yarn codegen OR npm run-script codegen
```
#### 3. Build the project 

This bundles the app into static files for production.


```
yarn build OR npm run-script codegen
```

## Indexing and Query

#### 1. Run Docker

Under the project directory run following command:

```
docker-compose pull && docker-compose up
```

#### 2. Query this Project

Open your browser and head to `http://localhost:3000`.

Finally, you should see a GraphQL playground is showing in the explorer and the schemas that ready to query.

With this project can try to query with the following code to get a taste of how it works.
```graphql
{
  query {
    approvals (first: 5) {
        nodes {
            id
            value
            owner
            spender
        }
    }
    transactions (first: 5) {
        nodes {
            id
            value
            to: id
            from: id
        }
    }
  } 
}
```

##  Useful Resources

- [SubQuery Documentation](https://academy.subquery.network/)
- [Tips and Tricks for Performance Improvements](https://academy.subquery.network/faqs/faqs.html#how-can-i-optimise-my-project-to-speed-it-up)
- [Automated Historical State tracking](https://academy.subquery.network/th/run_publish/historical.html)
- [Custom Substrate Chains](https://university.subquery.network/build/manifest.html#custom-substrate-chains)
- [GraphQL Subscriptions](https://academy.subquery.network/run_publish/subscription.html)
- [Discord with Technical Support Channel](https://discord.com/invite/subquery)