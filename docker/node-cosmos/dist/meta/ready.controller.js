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
exports.ReadyController = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("../utils/logger");
const ready_service_1 = require("./ready.service");
const logger = (0, logger_1.getLogger)('ready');
let ReadyController = class ReadyController {
    constructor(readyService) {
        this.readyService = readyService;
    }
    getReady() {
        if (!this.readyService.ready) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.SERVICE_UNAVAILABLE,
                error: 'Database schema is not created or ready',
            }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReadyController.prototype, "getReady", null);
ReadyController = __decorate([
    (0, common_1.Controller)('ready'),
    __metadata("design:paramtypes", [ready_service_1.ReadyService])
], ReadyController);
exports.ReadyController = ReadyController;
//# sourceMappingURL=ready.controller.js.map