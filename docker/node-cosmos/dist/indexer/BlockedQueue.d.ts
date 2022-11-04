export declare class BlockedQueue<T> {
    private _queue;
    private _maxSize;
    constructor(size: number);
    get size(): number;
    get freeSize(): number;
    put(item: T): void;
    putAll(items: T[]): void;
    firstInQueue(): T | undefined;
    take(): Promise<T>;
    takeAll(max?: number): Promise<T[]>;
    reset(): void;
}
