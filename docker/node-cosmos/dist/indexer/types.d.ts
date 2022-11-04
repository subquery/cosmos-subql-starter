import { CosmosBlock, CosmosEvent, Entity, CosmosTransaction, CosmosMessage } from '@subql/types-cosmos';
export interface BlockContent {
    block: CosmosBlock;
    transactions: CosmosTransaction[];
    messages: CosmosMessage[];
    events: CosmosEvent[];
}
export declare enum OperationType {
    Set = "Set",
    Remove = "Remove"
}
export declare type OperationEntity = {
    operation: OperationType;
    entityType: string;
    data: Entity | string;
};
