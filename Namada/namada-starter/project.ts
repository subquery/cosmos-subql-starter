import {
  CosmosDatasourceKind,
  CosmosHandlerKind,
  CosmosProject,
} from "@subql/types-cosmos";

// Can expand the Datasource processor types via the genreic param
const project: CosmosProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "namada-starter",
  description:
    "  This project can be use as a starting point for developing your Cosmos (Namada) based SubQuery project",
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
    /* The unique chainID of the Cosmos Zone */
    chainId: "namada.5f5de2dd1b88cba30586420",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: ["https://namada-main.stakesystems.io"],
    chaintypes: new Map([]),
  },
  dataSources: [
    {
      kind: CosmosDatasourceKind.Runtime,
      startBlock: 2_789_156,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleRewardsWithdrawEvent",
            kind: CosmosHandlerKind.Event,
            // filter: {
            //   type: "archway.rewards.v1.RewardsWithdrawEvent",
            //   messageFilter: {
            //     type: "/archway.rewards.v1.MsgWithdrawRewards",
            //   },
            //   /*
            //                     contractCall field can be specified here too
            //                     values: # A set of key/value pairs that are present in the message data
            //                     contract: "juno1v99ehkuetkpf0yxdry8ce92yeqaeaa7lyxr2aagkesrw67wcsn8qxpxay0"
            //                  */
            // },
          },
          {
            handler: "handleSetContractMetadata",
            kind: CosmosHandlerKind.Message,
            // filter: {
            //   /*
            //                     Filter to only messages with the MsgSetContractMetadata function call
            //                     e.g. https://archway.explorers.guru/transaction/EBEE24728FCDA79EF167625D66F438236ED17579CAA7229A562C5AB84608B5A4
            //                  */
            //   type: "/archway.rewards.v1.MsgSetContractMetadata",
            // },
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
