import { RegisteredTypes } from '@polkadot/types/types';
import { ReaderOptions, RunnerSpecs } from '@subql/common';
import { CosmosProjectNetworkConfig, SubqlCosmosDataSource } from '@subql/common-cosmos';
import { CustomModule } from '@subql/types-cosmos';
import { GraphQLSchema } from 'graphql';
import * as protobuf from 'protobufjs';
export declare type CosmosChainType = CustomModule & {
    proto: protobuf.Root;
    packageName?: string;
};
export declare type SubqlProjectDs = SubqlCosmosDataSource & {
    mapping: SubqlCosmosDataSource['mapping'] & {
        entryScript: string;
    };
};
export declare type CosmosProjectNetConfig = CosmosProjectNetworkConfig & {
    chainTypes: Map<string, CosmosChainType> & {
        protoRoot: protobuf.Root;
    };
};
export declare type SubqlProjectDsTemplate = Omit<SubqlProjectDs, 'startBlock'> & {
    name: string;
};
export declare class SubqueryProject {
    id: string;
    root: string;
    network: Partial<CosmosProjectNetConfig>;
    dataSources: SubqlProjectDs[];
    schema: GraphQLSchema;
    templates: SubqlProjectDsTemplate[];
    chainTypes?: RegisteredTypes;
    runner?: RunnerSpecs;
    static create(path: string, networkOverrides?: Partial<CosmosProjectNetworkConfig>, readerOptions?: ReaderOptions): Promise<SubqueryProject>;
}
export interface SubqueryProjectNetwork {
    chainId: string;
    endpoint?: string;
    dictionary?: string;
    chainTypes?: Map<string, CosmosChainType>;
}
