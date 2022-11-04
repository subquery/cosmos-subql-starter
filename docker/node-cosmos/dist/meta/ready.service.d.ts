import { EventPayload } from '../indexer/events';
export declare class ReadyService {
    private _ready;
    constructor();
    handleReady({ value }: EventPayload<boolean>): void;
    get ready(): boolean;
}
