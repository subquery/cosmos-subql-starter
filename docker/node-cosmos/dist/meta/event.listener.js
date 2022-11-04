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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricEventListener = void 0;
const event_emitter_1 = require("@nestjs/event-emitter");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const prom_client_1 = require("prom-client");
const events_1 = require("../indexer/events");
let MetricEventListener = class MetricEventListener {
    constructor(apiConnectedMetric, injectedApiConnectedMetric, blockQueueSizeMetric, blocknumberQueueSizeMetric, processingBlockHeight, processedBlockHeight, targetHeightMetric, bestHeightMetric, usingDictionaryMetric, skipDictionaryCountMetric) {
        this.apiConnectedMetric = apiConnectedMetric;
        this.injectedApiConnectedMetric = injectedApiConnectedMetric;
        this.blockQueueSizeMetric = blockQueueSizeMetric;
        this.blocknumberQueueSizeMetric = blocknumberQueueSizeMetric;
        this.processingBlockHeight = processingBlockHeight;
        this.processedBlockHeight = processedBlockHeight;
        this.targetHeightMetric = targetHeightMetric;
        this.bestHeightMetric = bestHeightMetric;
        this.usingDictionaryMetric = usingDictionaryMetric;
        this.skipDictionaryCountMetric = skipDictionaryCountMetric;
        this.skipDictionaryCount = 0;
    }
    handleApiConnected({ value }) {
        this.apiConnectedMetric.set(value);
    }
    handleInjectedApiConnected({ value }) {
        this.injectedApiConnectedMetric.set(value);
    }
    handleBlockQueueSizeMetric({ value }) {
        this.blockQueueSizeMetric.set(value);
    }
    handleBlocknumberQueueSizeMetric({ value }) {
        this.blocknumberQueueSizeMetric.set(value);
    }
    handleProcessingBlock(blockPayload) {
        this.processingBlockHeight.set(blockPayload.height);
    }
    handleTargetBlock(blockPayload) {
        this.targetHeightMetric.set(blockPayload.height);
    }
    handleBestBlock(blockPayload) {
        this.bestHeightMetric.set(blockPayload.height);
    }
    handleUsingDictionary({ value }) {
        this.usingDictionaryMetric.set(value);
    }
    handleSkipDictionary() {
        this.skipDictionaryCount += 1;
        this.skipDictionaryCountMetric.set(this.skipDictionaryCount);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.ApiConnected),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetricEventListener.prototype, "handleApiConnected", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.InjectedApiConnected),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetricEventListener.prototype, "handleInjectedApiConnected", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.BlockQueueSize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetricEventListener.prototype, "handleBlockQueueSizeMetric", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.BlocknumberQueueSize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetricEventListener.prototype, "handleBlocknumberQueueSizeMetric", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.BlockProcessing),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetricEventListener.prototype, "handleProcessingBlock", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.BlockTarget),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetricEventListener.prototype, "handleTargetBlock", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.BlockBest),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetricEventListener.prototype, "handleBestBlock", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.UsingDictionary),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetricEventListener.prototype, "handleUsingDictionary", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.SkipDictionary),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetricEventListener.prototype, "handleSkipDictionary", null);
MetricEventListener = __decorate([
    __param(0, (0, nestjs_prometheus_1.InjectMetric)('subql_indexer_api_connected')),
    __param(1, (0, nestjs_prometheus_1.InjectMetric)('subql_indexer_injected_api_connected')),
    __param(2, (0, nestjs_prometheus_1.InjectMetric)('subql_indexer_block_queue_size')),
    __param(3, (0, nestjs_prometheus_1.InjectMetric)('subql_indexer_blocknumber_queue_size')),
    __param(4, (0, nestjs_prometheus_1.InjectMetric)('subql_indexer_processing_block_height')),
    __param(5, (0, nestjs_prometheus_1.InjectMetric)('subql_indexer_processed_block_height')),
    __param(6, (0, nestjs_prometheus_1.InjectMetric)('subql_indexer_target_block_height')),
    __param(7, (0, nestjs_prometheus_1.InjectMetric)('subql_indexer_best_block_height')),
    __param(8, (0, nestjs_prometheus_1.InjectMetric)('subql_indexer_using_dictionary')),
    __param(9, (0, nestjs_prometheus_1.InjectMetric)('subql_indexer_skip_dictionary_count')),
    __metadata("design:paramtypes", [prom_client_1.Gauge,
        prom_client_1.Gauge,
        prom_client_1.Gauge,
        prom_client_1.Gauge,
        prom_client_1.Gauge,
        prom_client_1.Gauge,
        prom_client_1.Gauge,
        prom_client_1.Gauge,
        prom_client_1.Gauge,
        prom_client_1.Gauge])
], MetricEventListener);
exports.MetricEventListener = MetricEventListener;
//# sourceMappingURL=event.listener.js.map