import {
  CosmosDatasourceKind,
  CosmosHandlerKind,
  CosmosProject,
} from "@subql/types-cosmos";

// Can expand the Datasource processor types via the genreic param
const project: CosmosProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "Injective-starter",
  description:
    "This project can be use as a starting point for developing your Cosmos Injective based SubQuery project",
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
    chainId: "injective-1",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: [
      "https://injective-rpc.quickapi.com:443",
      "https://rpc-injective.goldenratiostaking.net",
      "https://rpc-injective-ia.cosmosia.notional.ventures/",
      "https://injective-mainnet-rpc.autostake.com:443",
      "https://rpc.injective.posthuman.digital:443",
    ],
    chaintypes: new Map([
      [
        // Key is not used, it matches the one above and is inferred from the fil
        "injective.exchange.v1beta1.MsgCreateSpotLimitOrder",
        {
          file: "./proto/injective/exchange/v1beta1/tx.proto",
          messages: ["MsgCreateSpotLimitOrder"],
        },
      ],
      [
        "injective.exchange.v1beta1.SpotOrder",
        {
          file: "./proto/injective/exchange/v1beta1/exchange.proto",
          messages: ["SpotOrder"],
        },
      ],
    ]),
  },
  dataSources: [
    {
      kind: CosmosDatasourceKind.Runtime,
      startBlock: 43768217,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleMessage",
            kind: CosmosHandlerKind.Message,
            filter: {
              type: "/injective.exchange.v1beta1.MsgCreateSpotLimitOrder",
            },
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
