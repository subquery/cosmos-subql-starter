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
exports.BenchmarkService = void 0;
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const dayjs_1 = __importDefault(require("dayjs"));
const duration_1 = __importDefault(require("dayjs/plugin/duration"));
const logger_1 = require("../utils/logger");
const promise_1 = require("../utils/promise");
const events_1 = require("./events");
const SAMPLING_TIME_VARIANCE = 15;
const logger = (0, logger_1.getLogger)('benchmark');
dayjs_1.default.extend(duration_1.default);
class BenchmarkService {
    async benchmark() {
        if (!this.currentProcessingHeight || !this.currentProcessingTimestamp) {
            await (0, promise_1.delay)(10);
        }
        else {
            if (this.lastRegisteredHeight && this.lastRegisteredTimestamp) {
                const heightDiff = this.currentProcessingHeight - this.lastRegisteredHeight;
                const timeDiff = this.currentProcessingTimestamp - this.lastRegisteredTimestamp;
                this.blockPerSecond =
                    heightDiff === 0 || timeDiff === 0
                        ? 0
                        : heightDiff / (timeDiff / 1000);
                const duration = dayjs_1.default.duration((this.targetHeight - this.currentProcessingHeight) /
                    this.blockPerSecond, 'seconds');
                const hoursMinsStr = duration.format('HH [hours] mm [mins]');
                const days = Math.floor(duration.asDays());
                const durationStr = `${days} days ${hoursMinsStr}`;
                logger.info(this.targetHeight === this.lastRegisteredHeight &&
                    this.blockPerSecond === 0
                    ? 'Fully synced, waiting for new blocks'
                    : `${this.blockPerSecond.toFixed(2)} bps, target: #${this.targetHeight}, current: #${this.currentProcessingHeight}, estimate time: ${this.blockPerSecond === 0 ? 'unknown' : durationStr}`);
            }
            this.lastRegisteredHeight = this.currentProcessingHeight;
            this.lastRegisteredTimestamp = this.currentProcessingTimestamp;
        }
    }
    handleProcessingBlock(blockPayload) {
        this.currentProcessingHeight = blockPayload.height;
        this.currentProcessingTimestamp = blockPayload.timestamp;
    }
    handleTargetBlock(blockPayload) {
        this.targetHeight = blockPayload.height;
    }
}
__decorate([
    (0, schedule_1.Interval)(SAMPLING_TIME_VARIANCE * 1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BenchmarkService.prototype, "benchmark", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.BlockProcessing),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BenchmarkService.prototype, "handleProcessingBlock", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.BlockTarget),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BenchmarkService.prototype, "handleTargetBlock", null);
exports.BenchmarkService = BenchmarkService;
//# sourceMappingURL=benchmark.service.js.map