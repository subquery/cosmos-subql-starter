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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicDsService = void 0;
const assert_1 = __importDefault(require("assert"));
const common_1 = require("@nestjs/common");
const common_cosmos_1 = require("@subql/common-cosmos");
const SubqueryProject_1 = require("../configure/SubqueryProject");
const logger_1 = require("../utils/logger");
const ds_processor_service_1 = require("./ds-processor.service");
const logger = (0, logger_1.getLogger)('dynamic-ds');
const METADATA_KEY = 'dynamicDatasources';
let DynamicDsService = class DynamicDsService {
    constructor(dsProcessorService, project) {
        this.dsProcessorService = dsProcessorService;
        this.project = project;
    }
    init(metaDataRepo) {
        this.metaDataRepo = metaDataRepo;
    }
    async createDynamicDatasource(params, tx) {
        try {
            const ds = await this.getDatasource(params);
            await this.saveDynamicDatasourceParams(params, tx);
            logger.info(`Created new dynamic datasource from template: "${params.templateName}"`);
            if (!this._datasources)
                this._datasources = [];
            this._datasources.push(ds);
            return ds;
        }
        catch (e) {
            logger.error(e.message);
            process.exit(1);
        }
    }
    async getDynamicDatasources() {
        if (!this._datasources) {
            try {
                const params = await this.getDynamicDatasourceParams();
                this._datasources = await Promise.all(params.map((params) => this.getDatasource(params)));
            }
            catch (e) {
                logger.error(`Unable to get dynamic datasources:\n${e.message}`);
                process.exit(1);
            }
        }
        return this._datasources;
    }
    async getDynamicDatasourceParams() {
        (0, assert_1.default)(this.metaDataRepo, `Model _metadata does not exist`);
        const record = await this.metaDataRepo.findByPk(METADATA_KEY);
        const results = record === null || record === void 0 ? void 0 : record.value;
        if (!results || typeof results !== 'string') {
            return [];
        }
        return JSON.parse(results);
    }
    async saveDynamicDatasourceParams(dsParams, tx) {
        const existing = await this.getDynamicDatasourceParams();
        (0, assert_1.default)(this.metaDataRepo, `Model _metadata does not exist`);
        await this.metaDataRepo.upsert({ key: METADATA_KEY, value: JSON.stringify([...existing, dsParams]) }, { transaction: tx });
    }
    async getDatasource(params) {
        const template = this.project.templates.find((t) => t.name === params.templateName);
        if (!template) {
            throw new Error(`Unable to find matching template in project for name: "${params.templateName}"`);
        }
        logger.info(`Initialised dynamic datasource from template: "${params.templateName}"`);
        const dsObj = Object.assign(Object.assign({}, template), { startBlock: params.startBlock });
        delete dsObj.name;
        try {
            if ((0, common_cosmos_1.isCustomCosmosDs)(dsObj)) {
                dsObj.processor.options = Object.assign(Object.assign({}, dsObj.processor.options), params.args);
                await this.dsProcessorService.validateCustomDs([dsObj]);
            }
            else if ((0, common_cosmos_1.isRuntimeCosmosDs)(dsObj)) {
                // XXX add any modifications to the ds here
            }
            return dsObj;
        }
        catch (e) {
            throw new Error(`Unable to create dynamic datasource.\n ${e.message}`);
        }
    }
};
DynamicDsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ds_processor_service_1.DsProcessorService,
        SubqueryProject_1.SubqueryProject])
], DynamicDsService);
exports.DynamicDsService = DynamicDsService;
//# sourceMappingURL=dynamic-ds.service.js.map