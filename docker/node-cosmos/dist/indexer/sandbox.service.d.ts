import { Store } from '@subql/types-cosmos';
import { NodeVM, VMScript } from 'vm2';
import { NodeConfig } from '../configure/NodeConfig';
import { SubqlProjectDs, SubqueryProject } from '../configure/SubqueryProject';
import { ApiService, CosmosSafeClient } from './api.service';
import { StoreService } from './store.service';
export interface SandboxOption {
    store?: Store;
    script: string;
    root: string;
    entry: string;
}
export declare class Sandbox extends NodeVM {
    protected readonly script: VMScript;
    constructor(option: SandboxOption, script: VMScript);
    runTimeout<T = unknown>(duration: number): Promise<T>;
}
export declare class IndexerSandbox extends Sandbox {
    private readonly config;
    constructor(option: SandboxOption, config: NodeConfig);
    securedExec(funcName: string, args: unknown[]): Promise<void>;
    private injectGlobals;
}
export declare class SandboxService {
    private readonly apiService;
    private readonly storeService;
    private readonly nodeConfig;
    private readonly project;
    private processorCache;
    constructor(apiService: ApiService, storeService: StoreService, nodeConfig: NodeConfig, project: SubqueryProject);
    getDsProcessor(ds: SubqlProjectDs, api: CosmosSafeClient): IndexerSandbox;
    private getDataSourceEntry;
}
