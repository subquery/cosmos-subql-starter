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
            mapping: {
                file: './dist/index.js',
                handlers: [
                    // {
                    //     handler: 'handleReward',
                    //     kind: SubqlCosmosHandlerKind.Event,
                    //     filter: {
                    //         type: 'withdraw_rewards',
                    //         messageFilter: {
                    //             type: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward"
                    //         }
                    //         /*
                    //             contractCall field can be specified here too
                    //             values: # A set of key/value pairs that are present in the message data
                    //             contract: "juno1v99ehkuetkpf0yxdry8ce92yeqaeaa7lyxr2aagkesrw67wcsn8qxpxay0"
                    //          */
                    //     }
                    // }
                ]
            },
        },
    ],
};

export default project;