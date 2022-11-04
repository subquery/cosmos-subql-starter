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
exports.ReadyService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const events_1 = require("../indexer/events");
let ReadyService = class ReadyService {
    constructor() {
        this._ready = false;
    }
    handleReady({ value }) {
        this._ready = value;
    }
    get ready() {
        return this._ready;
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.IndexerEvent.Ready),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReadyService.prototype, "handleReady", null);
ReadyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ReadyService);
exports.ReadyService = ReadyService;
//# sourceMappingURL=ready.service.js.map