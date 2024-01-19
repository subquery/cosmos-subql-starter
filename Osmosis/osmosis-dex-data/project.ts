import {
  CosmosDatasourceKind,
  CosmosHandlerKind,
  CosmosProject,
} from "@subql/types-cosmos";

// Can expand the Datasource processor types via the genreic param
const project: CosmosProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "osmosis-dex-data",
  description:
    "This project represents an upgraded version of the Osmosis starter project. Beyond retaining the original functionality, it now incorporates the retrieval of data from third-party services to enhance a searchable database",
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
    chainId: "osmosis-1",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: ["https://rpc.osmosis.zone:443"],
    chaintypes: new Map([
      [
        "osmosis.gamm.v1beta1",
        {
          file: "./proto/osmosis/gamm/v1beta1/tx.proto",
          messages: [
            "MsgSwapExactAmountIn",
            "MsgSwapExactAmountOut",
            "MsgJoinSwapShareAmountOut",
          ],
        },
      ],
      [
        " osmosis.poolmanager.v1beta1",
        {
          file: "./proto/osmosis/poolmanager/v1beta1/swap_route.proto",
          messages: ["SwapAmountOutRoute", "SwapAmountInRoute"],
        },
      ],
      [
        "cosmos.base.v1beta1",
        {
          file: "./proto/cosmos/base/v1beta1/coin.proto",
          messages: ["Coin"],
        },
      ],
    ]),
  },
  dataSources: [
    {
      kind: CosmosDatasourceKind.Runtime,
      startBlock: 13338604,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleMsgSwapExactAmountIn",
            kind: CosmosHandlerKind.Message,
            filter: {
              type: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn",
            },
          },
          {
            handler: "handleMsgSwapExactAmountOut",
            kind: CosmosHandlerKind.Message,
            filter: {
              type: "/osmosis.gamm.v1beta1.MsgSwapExactAmountOut",
            },
          },
          {
            handler: "handleMsgJoinSwapShareAmountOut",
            kind: CosmosHandlerKind.Message,
            filter: {
              type: "/osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOut",
            },
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
