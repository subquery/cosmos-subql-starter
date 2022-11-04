import { Transaction } from 'sequelize/types';
import { SubqlProjectDs, SubqueryProject } from '../configure/SubqueryProject';
import { DsProcessorService } from './ds-processor.service';
import { MetadataRepo } from './entities/Metadata.entity';
interface DatasourceParams {
    templateName: string;
    args?: Record<string, unknown>;
    startBlock: number;
}
export declare class DynamicDsService {
    private readonly dsProcessorService;
    private readonly project;
    private metaDataRepo;
    constructor(dsProcessorService: DsProcessorService, project: SubqueryProject);
    init(metaDataRepo: MetadataRepo): void;
    private _datasources;
    createDynamicDatasource(params: DatasourceParams, tx: Transaction): Promise<SubqlProjectDs>;
    getDynamicDatasources(): Promise<SubqlProjectDs[]>;
    private getDynamicDatasourceParams;
    private saveDynamicDatasourceParams;
    private getDatasource;
}
export {};
