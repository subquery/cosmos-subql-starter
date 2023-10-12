import {
  SubqlCosmosDatasourceKind,
  SubqlCosmosHandlerKind,
  CosmosProject,
} from "@subql/types-cosmos";

// Can expand the Datasource processor types via the genreic param
const project: CosmosProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "archway-starter",
  description:
    "  This project can be use as a starting point for developing your Cosmos (Archway) based SubQuery project",
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
    chainId: "archway-1",
    /**
     * These endpoint(s) should be non-pruned archive nodes
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * We suggest providing an array of endpoints for increased speed and reliability
     */
    endpoint: [
      "https://rpc.mainnet.archway.io:443",
      // "https://rpc-archway.cosmos-spaces.cloud",
      // "https://rpc-1.archway.nodes.guru",
    ],
    // Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
    // dictionary: "https://api.subquery.network/sq/subquery/cosmos-archway-dictionary"
    chaintypes: new Map([
      [
        "cosmwasm.wasm.v1.MsgSetContractMetadata",
        {
          file: "./proto/archway/rewards/v1/tx.proto",
          messages: ["MsgSetContractMetadata"],
        },
      ],
      [
        "cosmwasm.wasm.v1.ContractMetadata",
        {
          file: "./proto/archway/rewards/v1/rewards.proto",
          messages: ["ContractMetadata"],
        },
      ],
    ]),
  },
  dataSources: [
    {
      kind: SubqlCosmosDatasourceKind.Runtime,
      startBlock: 1338,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleRewardsWithdrawEvent",
            kind: SubqlCosmosHandlerKind.Event,
            filter: {
              type: "archway.rewards.v1.RewardsWithdrawEvent",
              messageFilter: {
                type: "/archway.rewards.v1.MsgWithdrawRewards",
              },
              /*
                                contractCall field can be specified here too
                                values: # A set of key/value pairs that are present in the message data
                                contract: "juno1v99ehkuetkpf0yxdry8ce92yeqaeaa7lyxr2aagkesrw67wcsn8qxpxay0"
                             */
            },
          },
          {
            handler: "handleSetContractMetadata",
            kind: SubqlCosmosHandlerKind.Message,
            filter: {
              /*
                                Filter to only messages with the MsgSetContractMetadata function call
                                e.g. https://archway.explorers.guru/transaction/EBEE24728FCDA79EF167625D66F438236ED17579CAA7229A562C5AB84608B5A4
                             */
              type: "/archway.rewards.v1.MsgSetContractMetadata",
            },
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
