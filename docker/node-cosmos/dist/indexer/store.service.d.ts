import { Store } from '@subql/types-cosmos';
import { GraphQLModelsRelationsEnums } from '@subql/utils';
import { IndexesOptions, Model, ModelAttributes, Sequelize, Transaction, UpsertOptions } from 'sequelize';
import { NodeConfig } from '../configure/NodeConfig';
import { Metadata } from './entities/Metadata.entity';
import { ProofOfIndex } from './entities/Poi.entity';
import { PoiService } from './poi.service';
interface NotifyTriggerPayload {
    triggerName: string;
    eventManipulation: string;
}
export declare class StoreService {
    private sequelize;
    private config;
    private poiService;
    private tx?;
    private modelIndexedFields;
    private schema;
    private modelsRelations;
    private poiRepo;
    private metaDataRepo;
    private operationStack;
    private blockHeight;
    private historical;
    constructor(sequelize: Sequelize, config: NodeConfig, poiService: PoiService);
    init(modelsRelations: GraphQLModelsRelationsEnums, schema: string): Promise<void>;
    syncSchema(schema: string): Promise<void>;
    getHistoricalStateEnabled(): Promise<boolean>;
    addBlockRangeColumnToIndexes(indexes: IndexesOptions[]): void;
    private addRelationToMap;
    addIdAndBlockRangeAttributes(attributes: ModelAttributes<Model<any, any>, any>): void;
    private addScopeAndBlockHeightHooks;
    validateNotifyTriggers(triggerName: string, triggers: NotifyTriggerPayload[]): void;
    enumNameToHash(enumName: string): string;
    setTransaction(tx: Transaction): void;
    setBlockHeight(blockHeight: number): void;
    setMetadataBatch(metadata: Metadata[], options?: UpsertOptions<Metadata>): Promise<void>;
    setMetadata(key: string, value: string | number | boolean, options?: UpsertOptions<Metadata>): Promise<void>;
    setPoi(blockPoi: ProofOfIndex, options?: UpsertOptions<ProofOfIndex>): Promise<void>;
    getOperationMerkleRoot(): Uint8Array;
    private getAllIndexFields;
    private packEntityFields;
    private markAsDeleted;
    getStore(): Store;
}
export {};
