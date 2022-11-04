"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const fs_1 = __importDefault(require("fs"));
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const utils_1 = require("@subql/utils");
const sequelize_1 = require("sequelize");
const NodeConfig_1 = require("../configure/NodeConfig");
const SubqueryProject_1 = require("../configure/SubqueryProject");
const logger_1 = require("../utils/logger");
const yargs_1 = require("../yargs");
const api_service_1 = require("./api.service");
const ds_processor_service_1 = require("./ds-processor.service");
const dynamic_ds_service_1 = require("./dynamic-ds.service");
const Metadata_entity_1 = require("./entities/Metadata.entity");
const events_1 = require("./events");
const mmr_service_1 = require("./mmr.service");
const poi_service_1 = require("./poi.service");
const store_service_1 = require("./store.service");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version: packageVersion } = require('../../package.json');
const DEFAULT_DB_SCHEMA = 'public';
const logger = (0, logger_1.getLogger)('Project');
const { argv } = (0, yargs_1.getYargsOption)();
let ProjectService = class ProjectService {
    constructor(dsProcessorService, apiService, poiService, mmrService, sequelize, project, storeService, nodeConfig, dynamicDsService, subqueryRepo, eventEmitter) {
        this.dsProcessorService = dsProcessorService;
        this.apiService = apiService;
        this.poiService = poiService;
        this.mmrService = mmrService;
        this.sequelize = sequelize;
        this.project = project;
        this.storeService = storeService;
        this.nodeConfig = nodeConfig;
        this.dynamicDsService = dynamicDsService;
        this.subqueryRepo = subqueryRepo;
        this.eventEmitter = eventEmitter;
    }
    get schema() {
        return this._schema;
    }
    get blockOffset() {
        return this._blockOffset;
    }
    get startHeight() {
        return this._startHeight;
    }
    async init() {
        await this.dsProcessorService.validateProjectCustomDatasources();
        this._schema = await this.ensureProject();
        await this.initDbSchema();
        this.metadataRepo = await this.ensureMetadata();
        this.dynamicDsService.init(this.metadataRepo);
        if (this.nodeConfig.proofOfIndex) {
            const blockOffset = await this.getMetadataBlockOffset();
            if (blockOffset !== null && blockOffset !== undefined) {
                this.setBlockOffset(Number(blockOffset));
            }
            await this.poiService.init(this.schema);
        }
        // TODO parse this to fetch service
        this._startHeight = await this.getStartHeight();
    }
    async ensureProject() {
        let schema = await this.getExistingProjectSchema();
        if (!schema) {
            schema = await this.createProjectSchema();
        }
        else {
            if (argv['force-clean']) {
                try {
                    // drop existing project schema and metadata table
                    await this.sequelize.dropSchema(`"${schema}"`, {
                        logging: false,
                        benchmark: false,
                    });
                    // remove schema from subquery table (might not exist)
                    await this.sequelize.query(` DELETE
              FROM public.subqueries
              WHERE name = :name`, {
                        replacements: { name: this.nodeConfig.subqueryName },
                        type: sequelize_1.QueryTypes.DELETE,
                    });
                    logger.info('force cleaned schema and tables');
                    if (fs_1.default.existsSync(this.nodeConfig.mmrPath)) {
                        await fs_1.default.promises.unlink(this.nodeConfig.mmrPath);
                        logger.info('force cleaned file based mmr');
                    }
                }
                catch (err) {
                    logger.error(err, 'failed to force clean');
                }
                schema = await this.createProjectSchema();
            }
        }
        this.eventEmitter.emit(events_1.IndexerEvent.Ready, {
            value: true,
        });
        return schema;
    }
    // Get existing project schema, undefined when doesn't exist
    async getExistingProjectSchema() {
        let schema = this.nodeConfig.localMode
            ? DEFAULT_DB_SCHEMA
            : this.nodeConfig.dbSchema;
        // Note that sequelize.fetchAllSchemas does not include public schema, we cannot assume that public schema exists so we must make a raw query
        const schemas = (await this.sequelize
            .query(`SELECT schema_name FROM information_schema.schemata`, {
            type: sequelize_1.QueryTypes.SELECT,
        })
            .then((xs) => xs.map((x) => x.schema_name))
            .catch((err) => {
            logger.error(`Unable to fetch all schemas: ${err}`);
            process.exit(1);
        }));
        if (!schemas.includes(schema)) {
            // fallback to subqueries table
            const subqueryModel = await this.subqueryRepo.findOne({
                where: { name: this.nodeConfig.subqueryName },
            });
            if (subqueryModel) {
                schema = subqueryModel.dbSchema;
            }
            else {
                schema = undefined;
            }
        }
        return schema;
    }
    async createProjectSchema() {
        let schema;
        if (this.nodeConfig.localMode) {
            // create tables in default schema if local mode is enabled
            schema = DEFAULT_DB_SCHEMA;
        }
        else {
            schema = this.nodeConfig.dbSchema;
            const schemas = await this.sequelize.showAllSchemas(undefined);
            if (!schemas.includes(schema)) {
                await this.sequelize.createSchema(`"${schema}"`, undefined);
            }
        }
        return schema;
    }
    async initDbSchema() {
        const graphqlSchema = this.project.schema;
        const modelsRelations = (0, utils_1.getAllEntitiesRelations)(graphqlSchema);
        await this.storeService.init(modelsRelations, this.schema);
    }
    async ensureMetadata() {
        const metadataRepo = (0, Metadata_entity_1.MetadataFactory)(this.sequelize, this.schema);
        const project = await this.subqueryRepo.findOne({
            where: { name: this.nodeConfig.subqueryName },
        });
        this.eventEmitter.emit(events_1.IndexerEvent.NetworkMetadata, this.apiService.networkMeta);
        const keys = [
            'lastProcessedHeight',
            'blockOffset',
            'indexerNodeVersion',
            'chain',
            'chainId',
        ];
        const entries = await metadataRepo.findAll({
            where: {
                key: keys,
            },
        });
        const keyValue = entries.reduce((arr, curr) => {
            arr[curr.key] = curr.value;
            return arr;
        }, {});
        const { chainId } = this.apiService.networkMeta;
        if (this.project.runner) {
            await Promise.all([
                metadataRepo.upsert({
                    key: 'runnerNode',
                    value: this.project.runner.node.name,
                }),
                metadataRepo.upsert({
                    key: 'runnerNodeVersion',
                    value: this.project.runner.node.version,
                }),
                metadataRepo.upsert({
                    key: 'runnerQuery',
                    value: this.project.runner.query.name,
                }),
                metadataRepo.upsert({
                    key: 'runnerQueryVersion',
                    value: this.project.runner.query.version,
                }),
            ]);
        }
        if (keyValue.chain !== chainId) {
            await metadataRepo.upsert({ key: 'chain', value: chainId });
        }
        if (keyValue.indexerNodeVersion !== packageVersion) {
            await metadataRepo.upsert({
                key: 'indexerNodeVersion',
                value: packageVersion,
            });
        }
        return metadataRepo;
    }
    async upsertMetadataBlockOffset(height, tx) {
        await this.metadataRepo.upsert({
            key: 'blockOffset',
            value: height,
        }, { transaction: tx });
    }
    async getMetadataBlockOffset() {
        const res = await this.metadataRepo.findOne({
            where: { key: 'blockOffset' },
        });
        return res === null || res === void 0 ? void 0 : res.value;
    }
    async getLastProcessedHeight() {
        const res = await this.metadataRepo.findOne({
            where: { key: 'lastProcessedHeight' },
        });
        return res === null || res === void 0 ? void 0 : res.value;
    }
    async getStartHeight() {
        let startHeight;
        const lastProcessedHeight = await this.getLastProcessedHeight();
        if (lastProcessedHeight !== null && lastProcessedHeight !== undefined) {
            startHeight = Number(lastProcessedHeight) + 1;
        }
        else {
            const project = await this.subqueryRepo.findOne({
                where: { name: this.nodeConfig.subqueryName },
            });
            if (project !== null) {
                startHeight = project.nextBlockHeight;
            }
            else {
                startHeight = this.getStartBlockFromDataSources();
            }
        }
        return startHeight;
    }
    // FIXME Dedupe with indexer manager
    setBlockOffset(offset) {
        logger.info(`set blockOffset to ${offset}`);
        this._blockOffset = offset;
        void this.mmrService
            .syncFileBaseFromPoi(this.schema, offset)
            .catch((err) => {
            logger.error(err, 'failed to sync poi to mmr');
            process.exit(1);
        });
    }
    getStartBlockFromDataSources() {
        const startBlocksList = this.project.dataSources.map((item) => { var _a; return (_a = item.startBlock) !== null && _a !== void 0 ? _a : 1; });
        if (startBlocksList.length === 0) {
            logger.error(`Failed to find a valid datasource, Please check your endpoint if specName filter is used.`);
            process.exit(1);
        }
        else {
            return Math.min(...startBlocksList);
        }
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(9, (0, common_1.Inject)('Subquery')),
    __metadata("design:paramtypes", [ds_processor_service_1.DsProcessorService,
        api_service_1.ApiService,
        poi_service_1.PoiService,
        mmr_service_1.MmrService,
        sequelize_1.Sequelize,
        SubqueryProject_1.SubqueryProject,
        store_service_1.StoreService,
        NodeConfig_1.NodeConfig,
        dynamic_ds_service_1.DynamicDsService, Object, event_emitter_1.EventEmitter2])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map