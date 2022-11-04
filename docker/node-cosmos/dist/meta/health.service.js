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
exports.HealthService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const NodeConfig_1 = require("../configure/NodeConfig");
const events_1 = require("../indexer/events");
const store_service_1 = require("../indexer/store.service");
const DEFAULT_TIMEOUT = 900000;
const CHECK_HEALTH_INTERVAL = 60000;
let HealthService = class HealthService {
    constructor(nodeConfig, storeService) {
        this.nodeConfig = nodeConfig;
        this.storeService = storeService;
        this.blockTime = 6000;
        this.healthTimeout = Math.max(DEFAULT_TIMEOUT, this.nodeConfig.timeout * 1000);
    }
    async checkHealthStatus() {
        let healthy;
        try {
            this.getHealth();
            healthy = true;
        }
        catch (e) {
            healthy = false;
        }
        if (healthy !== this.indexerHealthy) {
            await this.storeService.setMetadata('indexerHealthy', healthy);
            this.indexerHealthy = healthy;
        }
    }
    handleTargetBlock(blockPayload) {
        if (this.recordBlockHeight !== blockPayload.height) {
            this.recordBlockHeight = blockPayload.height;
            this.recordBlockTimestamp = Date.now();
        }
    }
    handleProcessingBlock(blockPayload) {
        if (this.currentProcessingHeight !== blockPayload.height) {
            this.currentProcessingHeight = blockPayload.height;
            this.currentProcessingTimestamp = blockPayload.timestamp;
        }
    }
    getHealth() {
        if (this.recordBlockTimestamp &&
            Date.now() - this.recordBlockTimestamp > this.blockTime * 10) {
            throw new Error('Endpoint is not healthy');
        }
        if (this.currentProcessingTimestamp &&
            Date.now() - this.currentProcessingTimestamp > this.healthTimeout) {
            throw new Error('Indexer is not healthy');
        }
    }
};
__decorate([
    (0, schedule_1.Interval)(CHECK_HEALTH_INTERVAL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthService.prototype, "checkHealthStatus", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.BlockTarget),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HealthService.prototype, "handleTargetBlock", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.BlockProcessing),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HealthService.prototype, "handleProcessingBlock", null);
HealthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [NodeConfig_1.NodeConfig,
        store_service_1.StoreService])
], HealthService);
exports.HealthService = HealthService;
//# sourceMappingURL=health.service.js.map