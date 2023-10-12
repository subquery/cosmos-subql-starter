import {
  SubqlCosmosDatasourceKind,
  SubqlCosmosHandlerKind,
  CosmosProject,
} from "@subql/types-cosmos";

// Can expand the Datasource processor types via the genreic param
const project: CosmosProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "axelar-starter",
  description:
    "  This project can be use as a starting point for developing your Cosmos Axelar based SubQuery project",
  runner: {
    node: {
      name: "@subql/node-cosmos",
      version: ">=3.0.0",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    /* The genesis hash of the network (hash of block 0) */
    chainId: "axelar-dojo-1",
    /**
     * These endpoint(s) should be non-pruned archive nodes
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * We suggest providing an array of endpoints for increased speed and reliability
     */
    endpoint: ["https://axelar-archrpc.chainode.tech/"],
    // Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
    // dictionary: "https://api.subquery.network/sq/subquery/axelar-hub-dictionary"
  },
  dataSources: [
    {
      kind: SubqlCosmosDatasourceKind.Runtime,
      startBlock: 5262,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleEvent",
            kind: SubqlCosmosHandlerKind.Event,
            filter: {
              type: "depositConfirmation",
            },
          },
        ],
      },
    },
  ],
};

export default project;
