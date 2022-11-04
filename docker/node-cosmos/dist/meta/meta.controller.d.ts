import { MetaService } from './meta.service';
export declare class MetaController {
    private metaService;
    constructor(metaService: MetaService);
    getMeta(): {
        chainId: string;
        currentProcessingHeight: number;
        currentProcessingTimestamp: number;
        targetHeight: number;
        bestHeight: number;
        indexerNodeVersion: any;
        lastProcessedHeight: number;
        lastProcessedTimestamp: number;
        uptime: number;
        cosmosSdkVersion: any;
        apiConnected: boolean;
        injectedApiConnected: boolean;
        usingDictionary: boolean;
    };
}
