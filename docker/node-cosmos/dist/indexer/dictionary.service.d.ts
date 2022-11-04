import { OnApplicationShutdown } from '@nestjs/common';
import { DictionaryQueryEntry } from '@subql/types-cosmos';
import { MetaData } from '@subql/utils';
import { SubqueryProject } from '../configure/SubqueryProject';
export declare type Dictionary = {
    _metadata: MetaData;
    batchBlocks: number[];
};
export declare class DictionaryService implements OnApplicationShutdown {
    protected project: SubqueryProject;
    private client;
    private isShutdown;
    constructor(project: SubqueryProject);
    onApplicationShutdown(): void;
    /**
     *
     * @param startBlock
     * @param queryEndBlock this block number will limit the max query range, increase dictionary query speed
     * @param batchSize
     * @param conditions
     */
    getDictionary(startBlock: number, queryEndBlock: number, batchSize: number, conditions: DictionaryQueryEntry[]): Promise<Dictionary>;
    private dictionaryQuery;
}
