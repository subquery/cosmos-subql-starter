import { ProcessBlockPayload, TargetBlockPayload } from './events';
export declare class BenchmarkService {
    private currentProcessingHeight;
    private currentProcessingTimestamp;
    private targetHeight;
    private lastRegisteredHeight;
    private lastRegisteredTimestamp;
    private blockPerSecond;
    benchmark(): Promise<void>;
    handleProcessingBlock(blockPayload: ProcessBlockPayload): void;
    handleTargetBlock(blockPayload: TargetBlockPayload): void;
}
