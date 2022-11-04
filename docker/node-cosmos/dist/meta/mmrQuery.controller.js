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
exports.MmrQueryController = void 0;
const common_1 = require("@nestjs/common");
const mmr_service_1 = require("../indexer/mmr.service");
const mmr_exception_filter_1 = require("../utils/mmr-exception.filter");
const mmrExceptionsFilter = new mmr_exception_filter_1.MmrExceptionsFilter();
let MmrQueryController = class MmrQueryController {
    constructor(mmrService) {
        this.mmrService = mmrService;
    }
    async getLatestMmr(params) {
        // eslint-disable-next-line no-return-await
        return this.mmrService.getLatestMmr();
    }
    async getLatestMmrProof(params) {
        return this.mmrService.getLatestMmrProof();
    }
    async getMmr(params) {
        // eslint-disable-next-line no-return-await
        return this.mmrService.getMmr(params.blockHeight);
    }
    async getMmrProof(params) {
        return this.mmrService.getMmrProof(params.blockHeight);
    }
};
__decorate([
    (0, common_1.Get)('latest'),
    (0, common_1.UseFilters)(mmrExceptionsFilter),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MmrQueryController.prototype, "getLatestMmr", null);
__decorate([
    (0, common_1.Get)('latest/proof'),
    (0, common_1.UseFilters)(mmrExceptionsFilter),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MmrQueryController.prototype, "getLatestMmrProof", null);
__decorate([
    (0, common_1.Get)(':blockHeight'),
    (0, common_1.UseFilters)(mmrExceptionsFilter),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MmrQueryController.prototype, "getMmr", null);
__decorate([
    (0, common_1.Get)(':blockHeight/proof'),
    (0, common_1.UseFilters)(mmrExceptionsFilter),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MmrQueryController.prototype, "getMmrProof", null);
MmrQueryController = __decorate([
    (0, common_1.Controller)('mmrs'),
    __metadata("design:paramtypes", [mmr_service_1.MmrService])
], MmrQueryController);
exports.MmrQueryController = MmrQueryController;
//# sourceMappingURL=mmrQuery.controller.js.map