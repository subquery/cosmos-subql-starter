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
exports.DsProcessorService = exports.DsPluginSandbox = exports.asSecondLayerHandlerProcessor_1_0_0 = exports.isSecondLayerHandlerProcessor_1_0_0 = exports.isSecondLayerHandlerProcessor_0_0_0 = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const common_1 = require("@nestjs/common");
const common_cosmos_1 = require("@subql/common-cosmos");
const vm2_1 = require("vm2");
const SubqueryProject_1 = require("../configure/SubqueryProject");
const logger_1 = require("../utils/logger");
const sandbox_service_1 = require("./sandbox.service");
const logger = (0, logger_1.getLogger)('ds-sandbox');
function isSecondLayerHandlerProcessor_0_0_0(processor) {
    // Exisiting datasource processors had no concept of specVersion, therefore undefined is equivalent to 0.0.0
    return processor.specVersion === undefined;
}
exports.isSecondLayerHandlerProcessor_0_0_0 = isSecondLayerHandlerProcessor_0_0_0;
function isSecondLayerHandlerProcessor_1_0_0(processor) {
    return processor.specVersion === '1.0.0';
}
exports.isSecondLayerHandlerProcessor_1_0_0 = isSecondLayerHandlerProcessor_1_0_0;
function asSecondLayerHandlerProcessor_1_0_0(processor) {
    if (isSecondLayerHandlerProcessor_1_0_0(processor)) {
        return processor;
    }
    if (!isSecondLayerHandlerProcessor_0_0_0(processor)) {
        throw new Error('Unsupported ds processor version');
    }
    return Object.assign(Object.assign({}, processor), { specVersion: '1.0.0', filterProcessor: (params) => processor.filterProcessor(params.filter, params.input, params.ds), transformer: (params) => processor
            .transformer(params.input, params.ds, params.api, params.assets)
            .then((res) => [res]) });
}
exports.asSecondLayerHandlerProcessor_1_0_0 = asSecondLayerHandlerProcessor_1_0_0;
class DsPluginSandbox extends sandbox_service_1.Sandbox {
    constructor(option) {
        super(option, new vm2_1.VMScript(`module.exports = require('${option.entry}').default;`, path_1.default.join(option.root, 'ds_sandbox')));
        this.freeze(logger, 'logger');
    }
    getDsPlugin() {
        return this.run(this.script);
    }
}
exports.DsPluginSandbox = DsPluginSandbox;
let DsProcessorService = class DsProcessorService {
    constructor(project) {
        this.project = project;
        this.processorCache = {};
    }
    async validateCustomDs(datasources) {
        for (const ds of datasources) {
            const processor = this.getDsProcessor(ds);
            if (ds.kind !== processor.kind) {
                throw new Error(`ds kind (${ds.kind}) doesnt match processor (${processor.kind})`);
            }
            for (const handler of ds.mapping.handlers) {
                if (!(handler.kind in processor.handlerProcessors)) {
                    throw new Error(`ds kind ${handler.kind} not one of ${Object.keys(processor.handlerProcessors).join(', ')}`);
                }
            }
            /* Additional processor specific validation */
            processor.validate(ds, await this.getAssets(ds));
        }
    }
    async validateProjectCustomDatasources() {
        await this.validateCustomDs(this.project.dataSources.filter(common_cosmos_1.isCustomCosmosDs));
    }
    getDsProcessor(ds) {
        if (!(0, common_cosmos_1.isCustomCosmosDs)(ds)) {
            throw new Error(`data source is not a custom data source`);
        }
        if (!this.processorCache[ds.processor.file]) {
            const sandbox = new DsPluginSandbox({
                root: this.project.root,
                entry: ds.processor.file,
                script: null,
            });
            try {
                this.processorCache[ds.processor.file] = sandbox.getDsPlugin();
            }
            catch (e) {
                logger.error(`not supported ds @${ds.kind}`);
                throw e;
            }
        }
        return this.processorCache[ds.processor.file];
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    async getAssets(ds) {
        if (!(0, common_cosmos_1.isCustomCosmosDs)(ds)) {
            throw new Error(`data source is not a custom data source`);
        }
        if (!ds.assets) {
            return {};
        }
        const res = {};
        for (const [name, { file }] of ds.assets) {
            try {
                res[name] = fs_1.default.readFileSync(path_1.default.join(this.project.root, file), {
                    encoding: 'utf8',
                });
            }
            catch (e) {
                logger.error(`Failed to load datasource asset ${file}`);
                throw e;
            }
        }
        return res;
    }
};
DsProcessorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [SubqueryProject_1.SubqueryProject])
], DsProcessorService);
exports.DsProcessorService = DsProcessorService;
//# sourceMappingURL=ds-processor.service.js.map