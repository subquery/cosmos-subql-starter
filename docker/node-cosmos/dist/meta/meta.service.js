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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const events_1 = require("../indexer/events");
const store_service_1 = require("../indexer/store.service");
const UPDATE_HEIGHT_INTERVAL = 60000;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version: cosmosSdkVersion } = require('@cosmjs/stargate/package.json');
const { version: packageVersion } = require('../../package.json');
let MetaService = class MetaService {
    constructor(storeService) {
        this.storeService = storeService;
    }
    getMeta() {
        return Object.assign({ currentProcessingHeight: this.currentProcessingHeight, currentProcessingTimestamp: this.currentProcessingTimestamp, targetHeight: this.targetHeight, bestHeight: this.bestHeight, indexerNodeVersion: packageVersion, lastProcessedHeight: this.lastProcessedHeight, lastProcessedTimestamp: this.lastProcessedTimestamp, uptime: process.uptime(), cosmosSdkVersion, apiConnected: this.apiConnected, injectedApiConnected: this.injectedApiConnected, usingDictionary: this.usingDictionary }, this.networkMeta);
    }
    async getTargetHeight() {
        await this.storeService.setMetadata('targetHeight', this.targetHeight);
    }
    handleProcessingBlock(blockPayload) {
        this.currentProcessingHeight = blockPayload.height;
        this.currentProcessingTimestamp = blockPayload.timestamp;
    }
    handleTargetBlock(blockPayload) {
        this.targetHeight = blockPayload.height;
    }
    handleBestBlock(blockPayload) {
        this.bestHeight = blockPayload.height;
    }
    handleNetworkMetadata(networkMeta) {
        this.networkMeta = networkMeta;
    }
    handleApiConnected({ value }) {
        this.apiConnected = !!value;
    }
    handleInjectedApiConnected({ value }) {
        this.injectedApiConnected = !!value;
    }
    handleUsingDictionary({ value }) {
        this.usingDictionary = !!value;
    }
};
__decorate([
    (0, schedule_1.Interval)(UPDATE_HEIGHT_INTERVAL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaService.prototype, "getTargetHeight", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.BlockProcessing),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetaService.prototype, "handleProcessingBlock", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.BlockTarget),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetaService.prototype, "handleTargetBlock", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.BlockBest),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetaService.prototype, "handleBestBlock", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.NetworkMetadata),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetaService.prototype, "handleNetworkMetadata", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.ApiConnected),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetaService.prototype, "handleApiConnected", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.InjectedApiConnected),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetaService.prototype, "handleInjectedApiConnected", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.UsingDictionary),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetaService.prototype, "handleUsingDictionary", null);
MetaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [store_service_1.StoreService])
], MetaService);
exports.MetaService = MetaService;
//# sourceMappingURL=meta.service.js.map