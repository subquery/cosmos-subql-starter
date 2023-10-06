import {
  SubqlCosmosDatasourceKind,
  SubqlCosmosHandlerKind,
  CosmosProject,
} from "@subql/types-cosmos";

// Can expand the Datasource processor types via the genreic param
const project: CosmosProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "osmosis-starter",
  description:
    "This project can be use as a starting point for developing your Cosmos osmosis based SubQuery project",
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
    chainId: "osmosis-1",
    /**
     * These endpoint(s) should be non-pruned archive nodes
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * We suggest providing an array of endpoints for increased speed and reliability
     */
    endpoint: ["https://osmosis.api.onfinality.io/public"],
    // # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
    dictionary:
      "https://api.subquery.network/sq/subquery/cosmos-osmosis-dictionary",
    chaintypes: new Map([
      [
        "osmosis.gamm.v1beta1",
        {
          file: "./proto/osmosis/gamm/v1beta1/tx.proto",
          messages: ["MsgSwapExactAmountIn"],
        },
      ],
      [
        " osmosis.poolmanager.v1beta1",
        {
          // needed by MsgSwapExactAmountIn
          file: "./proto/osmosis/poolmanager/v1beta1/swap_route.proto",
          messages: ["SwapAmountInRoute"],
        },
      ],
      [
        "cosmos.base.v1beta1",
        {
          // needed by MsgSwapExactAmountIn
          file: "./proto/cosmos/base/v1beta1/coin.proto",
          messages: ["Coin"],
        },
      ],
    ]),
  },
  dataSources: [
    {
      kind: SubqlCosmosDatasourceKind.Runtime,
      startBlock: 9798050,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleMessage",
            kind: SubqlCosmosHandlerKind.Message,
            filter: {
              type: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn",
            },
          },
        ],
      },
    },
  ],
};

export default project;
