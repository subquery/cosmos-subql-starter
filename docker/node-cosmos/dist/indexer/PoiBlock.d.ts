import { ProofOfIndex } from './entities/Poi.entity';
export declare class PoiBlock implements ProofOfIndex {
    readonly id: number;
    readonly chainBlockHash: Uint8Array;
    readonly hash: Uint8Array;
    readonly parentHash: Uint8Array;
    readonly operationHashRoot: Uint8Array;
    mmrRoot: Uint8Array;
    readonly projectId: string;
    constructor(id: number, chainBlockHash: Uint8Array, hash: Uint8Array, parentHash: Uint8Array, operationHashRoot: Uint8Array, projectId: string);
    static create(id: number, chainBlockHash: string | Uint8Array, operationHashRoot: Uint8Array, parentHash: Uint8Array, projectId: string): PoiBlock;
}
