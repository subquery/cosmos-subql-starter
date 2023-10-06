import {
    SubqlCosmosDatasourceKind,
    SubqlCosmosHandlerKind,
    CosmosProject
} from "@subql/types-cosmos";


// Can expand the Datasource processor types via the genreic param
const project: CosmosProject = {
    specVersion: "1.0.0",
    version: "0.0.1",
    name: "kava-starter",
    description:
        "This project can be use as a starting point for developing your Cosmos kava based SubQuery project",
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
        chainId: "kava_2222-10",
        /**
         * This endpoint must be a public non-pruned archive node
         * Public nodes may be rate limited, which can affect indexing speed
         * When developing your project we suggest getting a private API key
         * You can get them from OnFinality for free https://app.onfinality.io
         * https://documentation.onfinality.io/support/the-enhanced-api-service
         */
        endpoint: ["https://kava-rpc.ibs.team"],
        chaintypes: new Map([
            [
                "cosmos.bank.v1beta1.MsgSend", {
                    file: "./proto/cosmos/bank/v1beta1/tx.proto",
                    messages: [
                        "MsgSend",
                    ]
                }
            ],
            [
                "cosmos.base.v1beta1.Coin", {
                    file: "./proto/cosmos.base.v1beta1.Coin",
                    messages: [
                        "Coin"
                    ]
                }
            ],
        ])
    },
    dataSources: [
        {
            kind: SubqlCosmosDatasourceKind.Runtime,
            startBlock: 5397233,
            mapping: {
                file: './dist/index.js',
                handlers: [
                    {
                        handler: 'handleEvent',
                        kind: SubqlCosmosHandlerKind.Event,
                        filter: {
                            type: 'coin_spent',
                            messageFilter: {
                                type: "/cosmos.bank.v1beta1.MsgSend"
                            }
                        }
                    }
                ]
            },
        },
    ],
};

export default project;