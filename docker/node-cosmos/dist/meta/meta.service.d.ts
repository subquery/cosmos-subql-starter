import { BestBlockPayload, EventPayload, NetworkMetadataPayload, ProcessBlockPayload, TargetBlockPayload } from '../indexer/events';
import { StoreService } from '../indexer/store.service';
export declare class MetaService {
    private storeService;
    private currentProcessingHeight;
    private currentProcessingTimestamp;
    private bestHeight;
    private targetHeight;
    private networkMeta;
    private apiConnected;
    private usingDictionary;
    private injectedApiConnected;
    private lastProcessedHeight;
    private lastProcessedTimestamp;
    constructor(storeService: StoreService);
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
    getTargetHeight(): Promise<void>;
    handleProcessingBlock(blockPayload: ProcessBlockPayload): void;
    handleTargetBlock(blockPayload: TargetBlockPayload): void;
    handleBestBlock(blockPayload: BestBlockPayload): void;
    handleNetworkMetadata(networkMeta: NetworkMetadataPayload): void;
    handleApiConnected({ value }: EventPayload<number>): void;
    handleInjectedApiConnected({ value }: EventPayload<number>): void;
    handleUsingDictionary({ value }: EventPayload<number>): void;
}
