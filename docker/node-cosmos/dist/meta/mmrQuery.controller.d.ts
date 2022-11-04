import { MmrService } from '../indexer/mmr.service';
export declare class MmrQueryController {
    private mmrService;
    constructor(mmrService: MmrService);
    getLatestMmr(params: any): Promise<import("../indexer/events").MmrPayload>;
    getLatestMmrProof(params: any): Promise<import("../indexer/events").MmrProof>;
    getMmr(params: any): Promise<import("../indexer/events").MmrPayload>;
    getMmrProof(params: any): Promise<import("../indexer/events").MmrProof>;
}
