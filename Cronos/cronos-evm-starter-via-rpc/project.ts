import {CosmosProject} from "@subql/types-cosmos";
import {EthermintEvmDatasource} from "@subql/ethermint-evm-processor";


// Can expand the Datasource processor types via the genreic param
const project: CosmosProject<EthermintEvmDatasource> = {
    specVersion: "1.0.0",
    version: "0.0.1",
    name: "cronos-rpc-starter",
    description:
        "This project can be use as a starting point for developing your Cosmos Cronos based SubQuery project via Cosmos RPC API",
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
        chainId: "cronosmainnet_25-1",
        /**
         * This endpoint must be a public non-pruned archive node
         * Public nodes may be rate limited, which can affect indexing speed
         * When developing your project we suggest getting a private API key
         * You can get them from OnFinality for free https://app.onfinality.io
         * https://documentation.onfinality.io/support/the-enhanced-api-service
         */
        endpoint: ["https://rpc.cronos.org/"],
        dictionary: "https://api.subquery.network/sq/subquery/cosmos-cronos-dictionary",
        chaintypes: new Map([
            [
                "ethermint.evm.v1", {
                    file: "./proto/ethermint/evm/v1/tx.proto",
                    messages: [
                        "MsgEthereumTx",
                        "LegacyTx",
                        "AccessListTx",
                        "DynamicFeeTx",
                    ]
                }
            ],
            [
                "ethermint.evm.v12", {
                    file: "./proto/ethermint/evm/v1/evm.proto",
                    messages: [
                        "AccessTuple"
                    ]
                }
            ],
            [
                "google.protobuf", {
                    file: "./proto/google/protobuf/any.proto",
                    messages: [
                        "Any"
                    ]
                }
            ],
        ])
    },
    dataSources: [
        {
            kind: 'cosmos/EthermintEvm',
            startBlock: 446,
            processor: {
                file: './node_modules/@subql/ethermint-evm-processor/dist/bundle.js',
                options: {
                    abi: 'erc20',
                    address: "0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23" // Wrapped CRO
                }
            },
            assets: new Map([['erc20', { file: './erc20.abi.json' }]]),
            mapping: {
                file: './dist/index.js',
                handlers: [
                    {
                        handler: 'handleEthermintEvmCall',
                        kind: 'cosmos/EthermintEvmCall',
                        filter: {
                            // Either Function Signature strings or the function `sighash` to filter the function called on the contract
                            // https://docs.ethers.io/v5/api/utils/abi/fragments/#FunctionFragment
                            method: 'approve(address guy, uint256 wad)'
                        }
                    },
                    {
                        handler: 'handleEthermintEvmEvent',
                        kind: 'cosmos/EthermintEvmEvent',
                        filter: {
                            // The topics filter follows the Ethereum JSON-PRC log filters
                            // https://docs.ethers.io/v5/concepts/events
                            // Example valid values:
                            // - '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
                            // - Transfer(address,address,u256)
                            topics: ['Transfer(address src, address dst, uint256 wad)']
                        }
                    }
                ]
            },
        },
    ],
};

export default project;
