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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchService = exports.messageFilterToQueryEntry = exports.eventFilterToQueryEntry = void 0;
const v8_1 = require("v8");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const common_cosmos_1 = require("@subql/common-cosmos");
const lodash_1 = require("lodash");
const NodeConfig_1 = require("../configure/NodeConfig");
const SubqueryProject_1 = require("../configure/SubqueryProject");
const CosmosUtil = __importStar(require("../utils/cosmos"));
const logger_1 = require("../utils/logger");
const profiler_1 = require("../utils/profiler");
const project_1 = require("../utils/project");
const promise_1 = require("../utils/promise");
const yargs_1 = require("../yargs");
const api_service_1 = require("./api.service");
const BlockedQueue_1 = require("./BlockedQueue");
const dictionary_service_1 = require("./dictionary.service");
const ds_processor_service_1 = require("./ds-processor.service");
const dynamic_ds_service_1 = require("./dynamic-ds.service");
const events_1 = require("./events");
const logger = (0, logger_1.getLogger)('fetch');
const BLOCK_TIME_VARIANCE = 5;
const DICTIONARY_MAX_QUERY_SIZE = 10000;
const CHECK_MEMORY_INTERVAL = 60000;
const HIGH_THRESHOLD = 0.85;
const LOW_THRESHOLD = 0.6;
const MINIMUM_BATCH_SIZE = 5;
const { argv } = (0, yargs_1.getYargsOption)();
const fetchBlocksBatches = argv.profiler
    ? (0, profiler_1.profilerWrap)(CosmosUtil.fetchBlocksBatches, 'CosmosUtil', 'fetchBlocksBatches')
    : CosmosUtil.fetchBlocksBatches;
function eventFilterToQueryEntry(filter) {
    const conditions = [
        {
            field: 'type',
            value: filter.type,
            matcher: 'equalTo',
        },
    ];
    if (filter.messageFilter !== undefined) {
        const messageFilter = messageFilterToQueryEntry(filter.messageFilter).conditions.map((f) => {
            if (f.field === 'type') {
                return Object.assign(Object.assign({}, f), { field: 'msgType' });
            }
            return f;
        });
        conditions.push(...messageFilter);
    }
    return {
        entity: 'events',
        conditions: conditions,
    };
}
exports.eventFilterToQueryEntry = eventFilterToQueryEntry;
function messageFilterToQueryEntry(filter) {
    const conditions = [
        {
            field: 'type',
            value: filter.type,
            matcher: 'equalTo',
        },
    ];
    if (filter.values !== undefined) {
        const nested = {};
        // convert nested filters from `msg.swap.input_token` to { msg: { swap: { input_token: 'Token2' } } }
        Object.keys(filter.values).map((key) => {
            const value = filter.values[key];
            (0, lodash_1.setWith)(nested, key, value);
        });
        conditions.push({
            field: 'data',
            value: nested,
            matcher: 'contains',
        });
    }
    return {
        entity: 'messages',
        conditions: conditions,
    };
}
exports.messageFilterToQueryEntry = messageFilterToQueryEntry;
function checkMemoryUsage(batchSize, batchSizeScale) {
    const memoryData = (0, v8_1.getHeapStatistics)();
    const ratio = memoryData.used_heap_size / memoryData.heap_size_limit;
    if (argv.profiler) {
        logger.info(`Heap Statistics: ${JSON.stringify(memoryData)}`);
        logger.info(`Heap Usage: ${ratio}`);
    }
    let scale = batchSizeScale;
    if (ratio > HIGH_THRESHOLD) {
        if (scale > 0) {
            scale = Math.max(scale - 0.1, 0);
            logger.debug(`Heap usage: ${ratio}, decreasing batch size by 10%`);
        }
    }
    if (ratio < LOW_THRESHOLD) {
        if (scale < 1) {
            scale = Math.min(scale + 0.1, 1);
            logger.debug(`Heap usage: ${ratio} increasing batch size by 10%`);
        }
    }
    return scale;
}
let FetchService = class FetchService {
    constructor(apiService, nodeConfig, project, dictionaryService, dsProcessorService, dynamicDsService, eventEmitter) {
        this.apiService = apiService;
        this.nodeConfig = nodeConfig;
        this.project = project;
        this.dictionaryService = dictionaryService;
        this.dsProcessorService = dsProcessorService;
        this.dynamicDsService = dynamicDsService;
        this.eventEmitter = eventEmitter;
        this.isShutdown = false;
        this.blockBuffer = new BlockedQueue_1.BlockedQueue(this.nodeConfig.batchSize * 3);
        this.blockNumberBuffer = new BlockedQueue_1.BlockedQueue(this.nodeConfig.batchSize * 3);
        this.batchSizeScale = 1;
    }
    onApplicationShutdown() {
        this.isShutdown = true;
    }
    get api() {
        return this.apiService.getApi();
    }
    async syncDynamicDatascourcesFromMeta() {
        this.templateDynamicDatasouces =
            await this.dynamicDsService.getDynamicDatasources();
    }
    getDictionaryQueryEntries() {
        const queryEntries = [];
        const dataSources = this.project.dataSources.filter((ds) => (0, common_cosmos_1.isRuntimeDataSourceV0_3_0)(ds));
        for (const ds of dataSources.concat(this.templateDynamicDatasouces)) {
            const plugin = (0, common_cosmos_1.isCustomCosmosDs)(ds)
                ? this.dsProcessorService.getDsProcessor(ds)
                : undefined;
            for (const handler of ds.mapping.handlers) {
                const baseHandlerKind = this.getBaseHandlerKind(ds, handler);
                let filterList;
                if ((0, common_cosmos_1.isCustomCosmosDs)(ds)) {
                    const processor = plugin.handlerProcessors[handler.kind];
                    filterList = this.getBaseHandlerFilters(ds, handler.kind);
                }
                else {
                    filterList = [
                        handler
                            .filter,
                    ];
                }
                filterList = filterList.filter((f) => f);
                if (!filterList.length)
                    return [];
                switch (baseHandlerKind) {
                    case common_cosmos_1.SubqlCosmosHandlerKind.Message: {
                        for (const filter of filterList) {
                            if (filter.type !== undefined) {
                                queryEntries.push(messageFilterToQueryEntry(filter));
                            }
                            else {
                                return [];
                            }
                        }
                        break;
                    }
                    case common_cosmos_1.SubqlCosmosHandlerKind.Event: {
                        for (const filter of filterList) {
                            if (filter.type !== undefined) {
                                queryEntries.push(eventFilterToQueryEntry(filter));
                            }
                            else {
                                return [];
                            }
                        }
                        break;
                    }
                    default:
                }
            }
        }
        return (0, lodash_1.uniqBy)(queryEntries, (item) => `${item.entity}|${JSON.stringify((0, lodash_1.sortBy)(item.conditions, (c) => c.field))}`);
    }
    register(next) {
        let stopper = false;
        void (async () => {
            var _a;
            while (!stopper && !this.isShutdown) {
                const block = await this.blockBuffer.take();
                this.eventEmitter.emit(events_1.IndexerEvent.BlockQueueSize, {
                    value: this.blockBuffer.size,
                });
                let success = false;
                while (!success) {
                    try {
                        await next(block);
                        success = true;
                    }
                    catch (e) {
                        logger.error(e, `failed to index block at height ${block.block.block.header.height.toString()} ${e.handler ? `${e.handler}(${(_a = e.handlerArgs) !== null && _a !== void 0 ? _a : ''})` : ''}`);
                        process.exit(1);
                    }
                }
            }
        })();
        return () => (stopper = true);
    }
    updateDictionary() {
        var _a;
        this.dictionaryQueryEntries = this.getDictionaryQueryEntries();
        this.useDictionary =
            !!((_a = this.dictionaryQueryEntries) === null || _a === void 0 ? void 0 : _a.length) &&
                !!this.project.network.dictionary;
    }
    async init() {
        await this.syncDynamicDatascourcesFromMeta();
        this.updateDictionary();
        this.eventEmitter.emit(events_1.IndexerEvent.UsingDictionary, {
            value: Number(this.useDictionary),
        });
        await this.getLatestBlockHead();
    }
    checkBatchScale() {
        if (argv['scale-batch-size']) {
            const scale = checkMemoryUsage(this.nodeConfig.batchSize, this.batchSizeScale);
            if (this.batchSizeScale !== scale) {
                this.batchSizeScale = scale;
            }
        }
    }
    async getLatestBlockHead() {
        if (!this.api) {
            logger.debug(`Skip fetch finalized block until API is ready`);
            return;
        }
        try {
            const currentFinalizedHeight = await this.api.getHeight();
            if (this.latestFinalizedHeight !== currentFinalizedHeight) {
                this.latestFinalizedHeight = currentFinalizedHeight;
                this.eventEmitter.emit(events_1.IndexerEvent.BlockTarget, {
                    height: this.latestFinalizedHeight,
                });
            }
        }
        catch (e) {
            logger.error(e, `Having a problem when get finalized block`);
        }
    }
    latestProcessed(height) {
        this.latestProcessedHeight = height;
    }
    async startLoop(initBlockHeight) {
        if ((0, lodash_1.isUndefined)(this.latestProcessedHeight)) {
            this.latestProcessedHeight = initBlockHeight - 1;
        }
        await Promise.all([
            this.fillNextBlockBuffer(initBlockHeight),
            this.fillBlockBuffer(),
        ]);
    }
    async fillNextBlockBuffer(initBlockHeight) {
        let startBlockHeight;
        let scaledBatchSize;
        const getStartBlockHeight = () => {
            return this.latestBufferedHeight
                ? this.latestBufferedHeight + 1
                : initBlockHeight;
        };
        while (!this.isShutdown) {
            startBlockHeight = getStartBlockHeight();
            scaledBatchSize = Math.max(Math.round(this.batchSizeScale * this.nodeConfig.batchSize), Math.min(MINIMUM_BATCH_SIZE, this.nodeConfig.batchSize * 3));
            if (this.blockNumberBuffer.freeSize < scaledBatchSize ||
                startBlockHeight > this.latestFinalizedHeight) {
                await (0, promise_1.delay)(1);
                continue;
            }
            if (this.useDictionary) {
                const queryEndBlock = startBlockHeight + DICTIONARY_MAX_QUERY_SIZE;
                try {
                    const dictionary = await this.dictionaryService.getDictionary(startBlockHeight, queryEndBlock, scaledBatchSize, this.dictionaryQueryEntries);
                    if (startBlockHeight !== getStartBlockHeight()) {
                        logger.debug(`Queue was reset for new DS, discarding dictionary query result`);
                        continue;
                    }
                    if (dictionary &&
                        (await this.dictionaryValidation(dictionary, startBlockHeight))) {
                        const { batchBlocks } = dictionary;
                        if (batchBlocks.length === 0) {
                            this.setLatestBufferedHeight(Math.min(queryEndBlock - 1, dictionary._metadata.lastProcessedHeight));
                        }
                        else {
                            this.blockNumberBuffer.putAll(batchBlocks);
                            this.setLatestBufferedHeight(batchBlocks[batchBlocks.length - 1]);
                        }
                        this.eventEmitter.emit(events_1.IndexerEvent.BlocknumberQueueSize, {
                            value: this.blockNumberBuffer.size,
                        });
                        continue; // skip nextBlockRange() way
                    }
                    // else use this.nextBlockRange()
                }
                catch (e) {
                    logger.debug(`Fetch dictionary stopped: ${e.message}`);
                    this.eventEmitter.emit(events_1.IndexerEvent.SkipDictionary);
                }
            }
            // the original method: fill next batch size of blocks
            const endHeight = this.nextEndBlockHeight(startBlockHeight, scaledBatchSize);
            this.blockNumberBuffer.putAll((0, lodash_1.range)(startBlockHeight, endHeight + 1));
            this.setLatestBufferedHeight(endHeight);
        }
    }
    async fillBlockBuffer() {
        while (!this.isShutdown) {
            const takeCount = Math.min(this.blockBuffer.freeSize, Math.round(this.batchSizeScale * this.nodeConfig.batchSize));
            if (this.blockNumberBuffer.size === 0 || takeCount === 0) {
                await (0, promise_1.delay)(1);
                continue;
            }
            // Used to compare before and after as a way to check if new DS created
            const bufferedHeight = this.latestBufferedHeight;
            const bufferBlocks = await this.blockNumberBuffer.takeAll(takeCount);
            const blocks = await fetchBlocksBatches(this.api, bufferBlocks);
            logger.info(`fetch block [${bufferBlocks[0]},${bufferBlocks[bufferBlocks.length - 1]}], total ${bufferBlocks.length} blocks`);
            if (bufferedHeight > this.latestBufferedHeight) {
                logger.debug(`Queue was reset for new DS, discarding fetched blocks`);
                continue;
            }
            this.blockBuffer.putAll(blocks);
            this.eventEmitter.emit(events_1.IndexerEvent.BlockQueueSize, {
                value: this.blockBuffer.size,
            });
        }
    }
    nextEndBlockHeight(startBlockHeight, scaledBatchSize) {
        let endBlockHeight = startBlockHeight + scaledBatchSize - 1;
        if (endBlockHeight > this.latestFinalizedHeight) {
            endBlockHeight = this.latestFinalizedHeight;
        }
        return endBlockHeight;
    }
    async resetForNewDs(blockHeight) {
        await this.syncDynamicDatascourcesFromMeta();
        this.updateDictionary();
        this.blockBuffer.reset();
        this.blockNumberBuffer.reset();
        this.setLatestBufferedHeight(blockHeight);
    }
    async dictionaryValidation({ _metadata: metaData }, startBlockHeight) {
        const chain = await this.api.getChainId();
        if (metaData.chain !== chain) {
            logger.warn(`Dictionary is disabled since now`);
            this.useDictionary = false;
            this.eventEmitter.emit(events_1.IndexerEvent.UsingDictionary, {
                value: Number(this.useDictionary),
            });
            this.eventEmitter.emit(events_1.IndexerEvent.SkipDictionary);
            return false;
        }
        if (metaData.lastProcessedHeight < startBlockHeight) {
            logger.warn(`Dictionary indexed block is behind current indexing block height`);
            this.eventEmitter.emit(events_1.IndexerEvent.SkipDictionary);
            return false;
        }
        return true;
    }
    setLatestBufferedHeight(height) {
        this.latestBufferedHeight = height;
        this.eventEmitter.emit(events_1.IndexerEvent.BlocknumberQueueSize, {
            value: this.blockNumberBuffer.size,
        });
    }
    getBaseHandlerKind(ds, handler) {
        var _a;
        if ((0, common_cosmos_1.isRuntimeCosmosDs)(ds) && (0, project_1.isBaseHandler)(handler)) {
            return handler.kind;
        }
        else if ((0, common_cosmos_1.isCustomCosmosDs)(ds) && (0, project_1.isCustomHandler)(handler)) {
            const plugin = this.dsProcessorService.getDsProcessor(ds);
            const baseHandler = (_a = plugin.handlerProcessors[handler.kind]) === null || _a === void 0 ? void 0 : _a.baseHandlerKind;
            if (!baseHandler) {
                throw new Error(`handler type ${handler.kind} not found in processor for ${ds.kind}`);
            }
            return baseHandler;
        }
    }
    getBaseHandlerFilters(ds, handlerKind) {
        if ((0, common_cosmos_1.isCustomCosmosDs)(ds)) {
            const plugin = this.dsProcessorService.getDsProcessor(ds);
            const processor = plugin.handlerProcessors[handlerKind];
            return processor.baseFilter instanceof Array
                ? processor.baseFilter
                : [processor.baseFilter];
        }
        else {
            throw new Error(`expect custom datasource here`);
        }
    }
};
__decorate([
    (0, schedule_1.Interval)(CHECK_MEMORY_INTERVAL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FetchService.prototype, "checkBatchScale", null);
__decorate([
    (0, schedule_1.Interval)(BLOCK_TIME_VARIANCE * 1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FetchService.prototype, "getLatestBlockHead", null);
FetchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.ApiService,
        NodeConfig_1.NodeConfig,
        SubqueryProject_1.SubqueryProject,
        dictionary_service_1.DictionaryService,
        ds_processor_service_1.DsProcessorService,
        dynamic_ds_service_1.DynamicDsService,
        event_emitter_1.EventEmitter2])
], FetchService);
exports.FetchService = FetchService;
//# sourceMappingURL=fetch.service.js.map