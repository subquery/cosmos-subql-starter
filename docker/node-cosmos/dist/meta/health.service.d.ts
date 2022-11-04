import { NodeConfig } from '../configure/NodeConfig';
import { ProcessBlockPayload, TargetBlockPayload } from '../indexer/events';
import { StoreService } from '../indexer/store.service';
export declare class HealthService {
    protected nodeConfig: NodeConfig;
    private storeService;
    private recordBlockHeight?;
    private recordBlockTimestamp?;
    private currentProcessingHeight?;
    private currentProcessingTimestamp?;
    private blockTime;
    private healthTimeout;
    private indexerHealthy;
    constructor(nodeConfig: NodeConfig, storeService: StoreService);
    checkHealthStatus(): Promise<void>;
    handleTargetBlock(blockPayload: TargetBlockPayload): void;
    handleProcessingBlock(blockPayload: ProcessBlockPayload): void;
    getHealth(): void;
}
