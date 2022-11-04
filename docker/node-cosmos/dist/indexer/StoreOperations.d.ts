import { Entity } from '@subql/types-cosmos';
import { GraphQLModelsType } from '@subql/utils';
import { OperationType } from './types';
export declare class StoreOperations {
    private models;
    private merkleTools;
    constructor(models: GraphQLModelsType[]);
    private operationEntityToUint8Array;
    put(operation: OperationType, entity: string, data: Entity | string): void;
    reset(): void;
    makeOperationMerkleTree(): void;
    getOperationMerkleRoot(): Uint8Array;
    getOperationLeafCount(): number;
}
