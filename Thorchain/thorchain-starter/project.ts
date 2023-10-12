import {
  SubqlCosmosDatasourceKind,
  SubqlCosmosHandlerKind,
  CosmosProject,
} from "@subql/types-cosmos";

// Can expand the Datasource processor types via the genreic param
const project: CosmosProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "thorchain-starter",
  description:
    "This project can be use as a starting point for developing your Cosmos thorchain based SubQuery project",
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
    chainId: "thorchain-mainnet-v1",
    /**
     * These endpoint(s) should be non-pruned archive nodes
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * We suggest providing an array of endpoints for increased speed and reliability
     */
    endpoint: ["https://rpc.ninerealms.com/"],
    chaintypes: new Map([
      // This feature allows support for any Cosmos chain by importing the correct protobuf messages
      [
        "thorchain.message.observed.out",
        {
          file: "./proto/thorchain/v1/x/thorchain/types/msg_observed_txout.proto",
          messages: ["MsgObservedTxOut"],
        },
      ],
      [
        "thorchain.message.deposit",
        {
          file: "./proto/thorchain/v1/x/thorchain/types/msg_deposit.proto",
          messages: ["MsgDeposit"],
        },
      ],
      [
        "thorchain.types.observed.out",
        {
          file: "./proto/thorchain/v1/x/thorchain/types/type_observed_tx.proto",
          messages: ["ObservedTx"],
        },
      ],
      [
        "common.Common",
        {
          file: "./proto/thorchain/v1/common/common.proto",
          messages: ["Tx"],
        },
      ],
    ]),
  },
  dataSources: [
    {
      kind: SubqlCosmosDatasourceKind.Runtime,
      startBlock: 7960001,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleMessage",
            kind: SubqlCosmosHandlerKind.Message,
            filter: {
              type: "/types.MsgDeposit",
            },
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
