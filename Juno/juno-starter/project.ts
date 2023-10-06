import {
    SubqlCosmosDatasourceKind,
    SubqlCosmosHandlerKind,
    CosmosProject
} from "@subql/types-cosmos";


// Can expand the Datasource processor types via the genreic param
const project: CosmosProject = {
    specVersion: "1.0.0",
    version: "0.0.1",
    name: "juno-starter",
    description:
        "This project can be use as a starting point for developing your Cosmos juno based SubQuery project",
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
        chainId: "juno-1",
        /**
         * This endpoint must be a public non-pruned archive node
         * Public nodes may be rate limited, which can affect indexing speed
         * When developing your project we suggest getting a private API key
         * You can get them from OnFinality for free https://app.onfinality.io
         * https://documentation.onfinality.io/support/the-enhanced-api-service
         */
        endpoint: ["https://rpc-juno.whispernode.com"],
        dictionary: "https://api.subquery.network/sq/subquery/cosmos-juno-dictionary",
    },
    dataSources: [
        {
            kind: SubqlCosmosDatasourceKind.Runtime,
            startBlock: 9700000,
            mapping: {
                file: './dist/index.js',
                handlers: [
                    {
                        handler: 'handleEvent',
                        kind: SubqlCosmosHandlerKind.Event,
                        filter: {
                            type: 'execute',
                            messageFilter: {
                                type: "/cosmwasm.wasm.v1.MsgExecuteContract"
                            }
                        }
                    },
                    {
                        handler: 'handleMessage',
                        kind: SubqlCosmosHandlerKind.Message,
                        filter: {
                            type: "/cosmwasm.wasm.v1.MsgExecuteContract"
                        }
                    }
                ]
            },
        },
    ],
};

export default project;