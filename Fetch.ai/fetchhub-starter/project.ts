import {
    SubqlCosmosDatasourceKind,
    SubqlCosmosHandlerKind,
    CosmosProject
} from "@subql/types-cosmos";


// Can expand the Datasource processor types via the genreic param
const project: CosmosProject = {
    specVersion: "1.0.0",
    version: "0.0.1",
    name: "Fetchhub-starter",
    description:
        "This project can be use as a starting point for developing your Cosmos Fetchhub based SubQuery project",
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
        chainId: "fetchhub-4",
        /**
         * This endpoint must be a public non-pruned archive node
         * Public nodes may be rate limited, which can affect indexing speed
         * When developing your project we suggest getting a private API key
         * You can get them from OnFinality for free https://app.onfinality.io
         * https://documentation.onfinality.io/support/the-enhanced-api-service
         */
        endpoint: ["https://rpc-fetchhub.fetch.ai"],
        dictionary: "https://api.subquery.network/sq/subquery/cosmos-fetch-ai-dictionary",
        chaintypes: new Map([
            [
                "cosmos.slashing.v1beta1", {
                file: "./proto/cosmos/slashing/v1beta1/tx.proto",
                messages: [
                    "MsgUnjail"
                ]
            }
            ],
            [
                "cosmos.gov.v1beta1", {
                file: "./proto/cosmos/gov/v1beta1/tx.proto",
                messages: [
                    "MsgVoteWeighted"
                ]
            }
            ],
            [
                "cosmos.gov.v1beta1.gov", {
                file: "./proto/cosmos/gov/v1beta1/gov.proto",
                messages: [
                    "WeightedVoteOption"
                ]
            }
            ],
        ])
    },
    dataSources: [
        {
            kind: SubqlCosmosDatasourceKind.Runtime,
            startBlock: 5300201,
            mapping: {
                file: './dist/index.js',
                handlers: [
                    {
                        handler: 'handleEvent',
                        kind: SubqlCosmosHandlerKind.Event,
                        filter: {
                            type: 'transfer',
                            messageFilter: {
                                type: "/cosmos.bank.v1beta1.MsgSend"
                            }
                        }
                    },
                    {
                        handler: 'handleMessage',
                        kind: SubqlCosmosHandlerKind.Message,
                        filter: {
                            type: "/cosmos.bank.v1beta1.MsgSend"
                        }
                    }
                ]
            },
        },
    ],
};

export default project;