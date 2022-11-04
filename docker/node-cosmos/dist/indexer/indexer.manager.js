"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerManager = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const util_1 = require("@polkadot/util");
const common_cosmos_1 = require("@subql/common-cosmos");
const sequelize_1 = require("sequelize");
const NodeConfig_1 = require("../configure/NodeConfig");
const SubqueryProject_1 = require("../configure/SubqueryProject");
const CosmosUtil = __importStar(require("../utils/cosmos"));
const logger_1 = require("../utils/logger");
const profiler_1 = require("../utils/profiler");
const yargs_1 = require("../yargs");
const api_service_1 = require("./api.service");
const ds_processor_service_1 = require("./ds-processor.service");
const dynamic_ds_service_1 = require("./dynamic-ds.service");
const events_1 = require("./events");
const fetch_service_1 = require("./fetch.service");
const mmr_service_1 = require("./mmr.service");
const poi_service_1 = require("./poi.service");
const PoiBlock_1 = require("./PoiBlock");
const project_service_1 = require("./project.service");
const sandbox_service_1 = require("./sandbox.service");
const store_service_1 = require("./store.service");
const NULL_MERKEL_ROOT = (0, util_1.hexToU8a)('0x00');
const logger = (0, logger_1.getLogger)('indexer');
const { argv } = (0, yargs_1.getYargsOption)();
const trace = require('@opentelemetry/api').trace;
const tracer = trace.getTracer('indexer.manager');
const traceAsyncFn = function(spanName, fn, _this, args) {
    let result;
    tracer.startActiveSpan(spanName, span => {
        const done = () => span.end();
        result = fn.apply(_this, Array.from(args));
        result.then(done, done);
    });
    return result;
}
let IndexerManager = class IndexerManager {
    constructor(storeService, apiService, fetchService, poiService, mmrService, sequelize, project, nodeConfig, sandboxService, dsProcessorService, dynamicDsService, subqueryRepo, eventEmitter, projectService) {
        this.storeService = storeService;
        this.apiService = apiService;
        this.fetchService = fetchService;
        this.poiService = poiService;
        this.mmrService = mmrService;
        this.sequelize = sequelize;
        this.project = project;
        this.nodeConfig = nodeConfig;
        this.sandboxService = sandboxService;
        this.dsProcessorService = dsProcessorService;
        this.dynamicDsService = dynamicDsService;
        this.subqueryRepo = subqueryRepo;
        this.eventEmitter = eventEmitter;
        this.projectService = projectService;
    }
    async indexBlock() {
         return traceAsyncFn('indexBlock', this._indexBlock, this, arguments);
    }
    async _indexBlock(blockContent, runtimeVersion) {
        const { block } = blockContent;
        const blockHeight = block.block.header.height;
        this.eventEmitter.emit(events_1.IndexerEvent.BlockProcessing, {
            height: blockHeight,
            timestamp: Date.now(),
        });
        const tx = await this.sequelize.transaction();
        this.storeService.setTransaction(tx);
        this.storeService.setBlockHeight(blockHeight);
        let poiBlockHash;
        try {
            const safeApi = await this.apiService.getSafeApi(blockHeight);
            this.filteredDataSources = this.filterDataSources(blockHeight);
            const datasources = this.filteredDataSources.concat(...(await this.dynamicDsService.getDynamicDatasources()));
            await this.indexBlockData(blockContent, datasources, (ds) => {
                const vm = this.sandboxService.getDsProcessor(ds, safeApi);
                // Inject function to create ds into vm
                vm.freeze(async (templateName, args) => {
                    const newDs = await this.dynamicDsService.createDynamicDatasource({
                        templateName,
                        args,
                        startBlock: blockHeight,
                    }, tx);
                    // Push the newly created dynamic ds to be processed this block on any future extrinsics/events
                    datasources.push(newDs);
                    await this.fetchService.resetForNewDs(blockHeight);
                }, 'createDynamicDatasource');
                return vm;
            });
            await this.storeService.setMetadataBatch([
                { key: 'lastProcessedHeight', value: blockHeight },
                { key: 'lastProcessedTimestamp', value: Date.now() },
            ], { transaction: tx });
            // Need calculate operationHash to ensure correct offset insert all time
            const operationHash = this.storeService.getOperationMerkleRoot();
            if (!(0, util_1.u8aEq)(operationHash, NULL_MERKEL_ROOT) &&
                this.projectService.blockOffset === undefined) {
                await this.projectService.upsertMetadataBlockOffset(blockHeight - 1, tx);
                this.projectService.setBlockOffset(blockHeight - 1);
            }
            if (this.nodeConfig.proofOfIndex) {
                //check if operation is null, then poi will not be inserted
                if (!(0, util_1.u8aEq)(operationHash, NULL_MERKEL_ROOT)) {
                    const poiBlock = PoiBlock_1.PoiBlock.create(blockHeight, block.block.id, operationHash, await this.poiService.getLatestPoiBlockHash(), this.project.id);
                    poiBlockHash = poiBlock.hash;
                    await this.storeService.setPoi(poiBlock, { transaction: tx });
                    this.poiService.setLatestPoiBlockHash(poiBlockHash);
                    await this.storeService.setMetadataBatch([{ key: 'lastPoiHeight', value: blockHeight }], { transaction: tx });
                }
            }
        }
        catch (e) {
            await tx.rollback();
            throw e;
        }
        await tx.commit();
        this.fetchService.latestProcessed(block.block.header.height);
    }
    async start() {
        await this.projectService.init();
        await this.fetchService.init();
        this.api = this.apiService.getApi();
        const startHeight = this.projectService.startHeight;
        void this.fetchService.startLoop(startHeight).catch((err) => {
            logger.error(err, 'failed to fetch block');
            // FIXME: retry before exit
            process.exit(1);
        });
        this.fetchService.register((block) => this.indexBlock(block));
    }
    filterDataSources(nextProcessingHeight) {
        let filteredDs;
        filteredDs = this.project.dataSources.filter((ds) => ds.startBlock <= nextProcessingHeight);
        if (filteredDs.length === 0) {
            logger.error(`Did not find any matching datasouces`);
            process.exit(1);
        }
        // perform filter for custom ds
        filteredDs = filteredDs.filter((ds) => {
            if ((0, common_cosmos_1.isCustomCosmosDs)(ds)) {
                return this.dsProcessorService
                    .getDsProcessor(ds)
                    .dsFilterProcessor(ds, this.api);
            }
            else {
                return true;
            }
        });
        if (!filteredDs.length) {
            logger.error(`Did not find any datasources with associated processor`);
            process.exit(1);
        }
        return filteredDs;
    }
    async indexBlockData() {
        return traceAsyncFn('indexBlockData', this._indexBlockData, this, arguments);
    }
    async _indexBlockData(blockContent, dataSources, getVM) {
        await this.indexBlockContent(blockContent, dataSources, getVM);
        await this.indexTransaction(blockContent, dataSources, getVM);
        await this.indexMessage(blockContent, dataSources, getVM);
        await this.indexEvent(blockContent, dataSources, getVM);
    }
    async indexBlockContent() {
        return traceAsyncFn('indexBlockContent', this._indexBlockContent, this, arguments);
    }
    async _indexBlockContent(block, dataSources, getVM) {
        for (const ds of dataSources) {
            await this.indexData(common_cosmos_1.SubqlCosmosHandlerKind.Block, block, ds, getVM(ds));
        }
    }
    async indexTransaction() {
        return traceAsyncFn('indexTransaction', this._indexTransaction, this, arguments);
    }
    async _indexTransaction(block, dataSources, getVM) {
        for (const ds of dataSources) {
            await this.indexData(common_cosmos_1.SubqlCosmosHandlerKind.Transaction, block, ds, getVM(ds));
        }
    }
    async indexMessage() {
        return traceAsyncFn('indexMessage', this._indexMessage, this, arguments);
    }
    async _indexMessage(block, dataSources, getVM) {
        for (const ds of dataSources) {
            await this.indexData(common_cosmos_1.SubqlCosmosHandlerKind.Message, block, ds, getVM(ds));
        }
    }
    async indexEvent() {
        return traceAsyncFn('indexEvent', this._indexEvent, this, arguments);
    }
    async _indexEvent(block, dataSources, getVM) {
        for (const ds of dataSources) {
            await this.indexData(common_cosmos_1.SubqlCosmosHandlerKind.Event, block, ds, getVM(ds));
        }
    }
    async indexData() {
        return traceAsyncFn('indexData', this._indexData, this, arguments);
    }
    async _indexData(kind,
    //data: CosmosRuntimeHandlerInputMap[K],
    block, ds, vm) {
        if ((0, common_cosmos_1.isRuntimeCosmosDs)(ds)) {
            const handlers = ds.mapping.handlers.filter((h) => h.kind === kind);
            const blockData = BlockContentTypeMap[kind](block);
            for (const data of blockData) {
                const filteredHandlers = handlers.filter((h) => FilterTypeMap[kind](data, h.filter));
                for (const handler of filteredHandlers) {
                    await vm.securedExec(handler.handler, [data]);
                }
            }
        }
        else if ((0, common_cosmos_1.isCustomCosmosDs)(ds)) {
            const blockData = BlockContentTypeMap[kind](block);
            for (const data of blockData) {
                const handlers = this.filterCustomDsHandlers(ds, data, ProcessorTypeMap[kind], (data, baseFilter) => {
                    switch (kind) {
                        case common_cosmos_1.SubqlCosmosHandlerKind.Message:
                            return !!CosmosUtil.filterMessages([data], baseFilter).length;
                        case common_cosmos_1.SubqlCosmosHandlerKind.Event:
                            return !!CosmosUtil.filterEvents([data], baseFilter).length;
                        default:
                            throw new Error('Unsuported handler kind');
                    }
                });
                for (const handler of handlers) {
                    await this.transformAndExecuteCustomDs(ds, vm, handler, data);
                }
            }
        }
    }
    filterCustomDsHandlers(ds, data, baseHandlerCheck, baseFilter) {
        const plugin = this.dsProcessorService.getDsProcessor(ds);
        return ds.mapping.handlers.filter((handler) => {
            const processor = plugin.handlerProcessors[handler.kind];
            if (baseHandlerCheck(processor)) {
                processor.baseFilter;
                return baseFilter(data, processor.baseFilter);
            }
            return false;
        });
    }
    async transformAndExecuteCustomDs(ds, vm, handler, data) {
        const plugin = this.dsProcessorService.getDsProcessor(ds);
        const assets = await this.dsProcessorService.getAssets(ds);
        const processor = (0, ds_processor_service_1.asSecondLayerHandlerProcessor_1_0_0)(plugin.handlerProcessors[handler.kind]);
        const transformedData = await processor
            .transformer({
            input: data,
            ds,
            api: this.api,
            assets,
        })
            .catch((e) => {
            logger.error(e, 'Failed to transform data with ds processor.');
            throw e;
        });
        await Promise.all(transformedData.map((data) => vm.securedExec(handler.handler, [data])));
    }
};
__decorate([
    (0, profiler_1.profiler)(argv.profiler),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IndexerManager.prototype, "indexBlock", null);
IndexerManager = __decorate([
    (0, common_1.Injectable)(),
    __param(11, (0, common_1.Inject)('Subquery')),
    __metadata("design:paramtypes", [store_service_1.StoreService,
        api_service_1.ApiService,
        fetch_service_1.FetchService,
        poi_service_1.PoiService,
        mmr_service_1.MmrService,
        sequelize_1.Sequelize,
        SubqueryProject_1.SubqueryProject,
        NodeConfig_1.NodeConfig,
        sandbox_service_1.SandboxService,
        ds_processor_service_1.DsProcessorService,
        dynamic_ds_service_1.DynamicDsService, Object, event_emitter_1.EventEmitter2,
        project_service_1.ProjectService])
], IndexerManager);
exports.IndexerManager = IndexerManager;
const ProcessorTypeMap = {
    [common_cosmos_1.SubqlCosmosHandlerKind.Block]: common_cosmos_1.isBlockHandlerProcessor,
    [common_cosmos_1.SubqlCosmosHandlerKind.Event]: common_cosmos_1.isEventHandlerProcessor,
    [common_cosmos_1.SubqlCosmosHandlerKind.Transaction]: common_cosmos_1.isTransactionHandlerProcessor,
    [common_cosmos_1.SubqlCosmosHandlerKind.Message]: common_cosmos_1.isMessageHandlerProcessor,
};
const FilterTypeMap = {
    [common_cosmos_1.SubqlCosmosHandlerKind.Block]: () => true,
    [common_cosmos_1.SubqlCosmosHandlerKind.Transaction]: () => true,
    [common_cosmos_1.SubqlCosmosHandlerKind.Event]: CosmosUtil.filterEvent,
    [common_cosmos_1.SubqlCosmosHandlerKind.Message]: CosmosUtil.filterMessageData,
};
const BlockContentTypeMap = {
    [common_cosmos_1.SubqlCosmosHandlerKind.Block]: (block) => [block.block],
    [common_cosmos_1.SubqlCosmosHandlerKind.Transaction]: (block) => block.transactions,
    [common_cosmos_1.SubqlCosmosHandlerKind.Message]: (block) => block.messages,
    [common_cosmos_1.SubqlCosmosHandlerKind.Event]: (block) => block.events,
};
//# sourceMappingURL=indexer.manager.js.map
