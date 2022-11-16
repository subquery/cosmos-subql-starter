import { Reader } from '@subql/common';
import { SubqlCosmosRuntimeHandler, SubqlCosmosCustomHandler, SubqlCosmosHandler, RuntimeDataSourceV0_3_0, CustomDatasourceV0_3_0 } from '@subql/common-cosmos';
import * as protobuf from 'protobufjs';
import { SubqlProjectDs, CosmosProjectNetConfig } from '../configure/SubqueryProject';
export declare function prepareProjectDir(projectPath: string): Promise<string>;
export declare function isBaseHandler(handler: SubqlCosmosHandler): handler is SubqlCosmosRuntimeHandler;
export declare function isCustomHandler(handler: SubqlCosmosHandler): handler is SubqlCosmosCustomHandler;
export declare function processNetworkConfig(network: any, reader: Reader): Promise<CosmosProjectNetConfig>;
export declare function updateDataSourcesV0_3_0(_dataSources: (RuntimeDataSourceV0_3_0 | CustomDatasourceV0_3_0)[], reader: Reader, root: string): Promise<SubqlProjectDs[]>;
export declare function loadDataSourceScript(reader: Reader, file?: string): Promise<string>;
export declare function loadNetworkChainType(reader: Reader, file: string): Promise<[string, protobuf.Root]>;
export declare function getProjectRoot(reader: Reader): Promise<string>;