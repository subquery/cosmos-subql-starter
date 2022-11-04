import { SecondLayerHandlerProcessor_0_0_0, SecondLayerHandlerProcessor_1_0_0, SubqlCosmosCustomDatasource, SubqlCosmosDatasourceProcessor, SubqlCosmosHandlerKind } from '@subql/types-cosmos';
import { SubqueryProject } from '../configure/SubqueryProject';
import { Sandbox } from './sandbox.service';
export interface DsPluginSandboxOption {
    root: string;
    entry: string;
    script: string;
}
export declare function isSecondLayerHandlerProcessor_0_0_0<K extends SubqlCosmosHandlerKind, F, E, DS extends SubqlCosmosCustomDatasource = SubqlCosmosCustomDatasource>(processor: SecondLayerHandlerProcessor_0_0_0<K, F, E, DS> | SecondLayerHandlerProcessor_1_0_0<K, F, E, DS>): processor is SecondLayerHandlerProcessor_0_0_0<K, F, E, DS>;
export declare function isSecondLayerHandlerProcessor_1_0_0<K extends SubqlCosmosHandlerKind, F, E, DS extends SubqlCosmosCustomDatasource = SubqlCosmosCustomDatasource>(processor: SecondLayerHandlerProcessor_0_0_0<K, F, E, DS> | SecondLayerHandlerProcessor_1_0_0<K, F, E, DS>): processor is SecondLayerHandlerProcessor_1_0_0<K, F, E, DS>;
export declare function asSecondLayerHandlerProcessor_1_0_0<K extends SubqlCosmosHandlerKind, F, E, DS extends SubqlCosmosCustomDatasource = SubqlCosmosCustomDatasource>(processor: SecondLayerHandlerProcessor_0_0_0<K, F, E, DS> | SecondLayerHandlerProcessor_1_0_0<K, F, E, DS>): SecondLayerHandlerProcessor_1_0_0<K, F, E, DS>;
export declare class DsPluginSandbox extends Sandbox {
    constructor(option: DsPluginSandboxOption);
    getDsPlugin<D extends string>(): SubqlCosmosDatasourceProcessor<D, undefined>;
}
export declare class DsProcessorService {
    private project;
    private processorCache;
    constructor(project: SubqueryProject);
    validateCustomDs(datasources: SubqlCosmosCustomDatasource[]): Promise<void>;
    validateProjectCustomDatasources(): Promise<void>;
    getDsProcessor<D extends string>(ds: SubqlCosmosCustomDatasource<string>): SubqlCosmosDatasourceProcessor<D, undefined>;
    getAssets(ds: SubqlCosmosCustomDatasource): Promise<Record<string, string>>;
}
