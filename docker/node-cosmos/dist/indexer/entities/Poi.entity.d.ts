import { BuildOptions, Model, Sequelize } from 'sequelize';
export interface ProofOfIndex {
    id: number;
    chainBlockHash: Uint8Array;
    hash: Uint8Array;
    parentHash?: Uint8Array;
    operationHashRoot: Uint8Array;
    mmrRoot?: Uint8Array;
    projectId: string;
}
export interface PoiModel extends Model<ProofOfIndex>, ProofOfIndex {
}
export declare type PoiRepo = typeof Model & {
    new (values?: unknown, options?: BuildOptions): PoiModel;
};
export declare function PoiFactory(sequelize: Sequelize, schema: string): PoiRepo;
