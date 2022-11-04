import { Gauge } from 'prom-client';
import { BestBlockPayload, EventPayload, ProcessBlockPayload, TargetBlockPayload } from '../indexer/events';
export declare class MetricEventListener {
    private apiConnectedMetric;
    private injectedApiConnectedMetric;
    private blockQueueSizeMetric;
    private blocknumberQueueSizeMetric;
    private processingBlockHeight;
    private processedBlockHeight;
    private targetHeightMetric;
    private bestHeightMetric;
    private usingDictionaryMetric;
    private skipDictionaryCountMetric;
    private skipDictionaryCount;
    constructor(apiConnectedMetric: Gauge<string>, injectedApiConnectedMetric: Gauge<string>, blockQueueSizeMetric: Gauge<string>, blocknumberQueueSizeMetric: Gauge<string>, processingBlockHeight: Gauge<string>, processedBlockHeight: Gauge<string>, targetHeightMetric: Gauge<string>, bestHeightMetric: Gauge<string>, usingDictionaryMetric: Gauge<string>, skipDictionaryCountMetric: Gauge<string>);
    handleApiConnected({ value }: EventPayload<number>): void;
    handleInjectedApiConnected({ value }: EventPayload<number>): void;
    handleBlockQueueSizeMetric({ value }: EventPayload<number>): void;
    handleBlocknumberQueueSizeMetric({ value }: EventPayload<number>): void;
    handleProcessingBlock(blockPayload: ProcessBlockPayload): void;
    handleTargetBlock(blockPayload: TargetBlockPayload): void;
    handleBestBlock(blockPayload: BestBlockPayload): void;
    handleUsingDictionary({ value }: EventPayload<number>): void;
    handleSkipDictionary(): void;
}
