import {
  EthereumProject,
  EthereumDatasourceKind,
  EthereumHandlerKind,
} from "@subql/types-ethereum";

// Can expand the Datasource processor types via the generic param
const project: EthereumProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "kava-evm-starter",
  description:
    "This project can be use as a starting point for developing your Cosmos (Kava) based SubQuery project via the Ethereum API",
  runner: {
    node: {
      name: "@subql/node-ethereum",
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
    chainId: "2222",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: [
      "https://evm.kava.io",
      "https://evm.data.kava.io",
      "https://evm.data.kava.chainstacklabs.com",
    ],
  },
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      // Contract creation of USDT Token https://kavascan.com/tx/0xc47bc6a99926dfcddda3ae326fd4aca3b2dc55061bad367f30d59f510ec4e32e
      startBlock: 5391456,
      options: {
        // Must be a key of assets
        abi: "erc20",
        address: "0x919C1c267BC06a7039e03fcc2eF738525769109c", // USDT https://kavascan.com/token/0x919C1c267BC06a7039e03fcc2eF738525769109c/token-transfers
      },
      assets: new Map([["erc20", { file: "./erc20.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Call,
            handler: "handleTransaction",
            filter: {
              /**
               * The function can either be the function fragment or signature
               * function: '0x095ea7b3'
               * function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
               */
              function: "approve(address spender, uint256 value)",
            },
          },
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleLog",
            filter: {
              /**
               * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
               # The topics filter follows the Ethereum JSON-PRC log filters
                # https://docs.ethers.io/v5/concepts/events
                # Example valid values:
                # - '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
                # - Transfer(address,address,u256)
                */
              topics: ["Transfer(address from, address to, uint256 value)"],
            },
          },
        ],
      },
    },
  ],
  repository: "https://github.com/subquery/ethereum-subql-starter",
};

// Must set default to the project instance
export default project;
