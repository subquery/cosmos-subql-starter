import { OnApplicationShutdown } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { NodeConfig } from '../configure/NodeConfig';
import { SubqueryProject } from '../configure/SubqueryProject';
export declare class PoiService implements OnApplicationShutdown {
    protected nodeConfig: NodeConfig;
    protected project: SubqueryProject;
    protected sequelize: Sequelize;
    private isShutdown;
    private latestPoiBlockHash;
    private poiRepo;
    private schema;
    constructor(nodeConfig: NodeConfig, project: SubqueryProject, sequelize: Sequelize);
    onApplicationShutdown(): void;
    init(schema: string): Promise<void>;
    fetchPoiBlockHashFromDb(): Promise<Uint8Array | null>;
    getLatestPoiBlockHash(): Promise<Uint8Array | null>;
    setLatestPoiBlockHash(hash: Uint8Array): void;
}
