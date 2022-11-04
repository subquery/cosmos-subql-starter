"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MmrExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let MmrExceptionsFilter = class MmrExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status;
        let errorMessage;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            errorMessage = exception.message;
        }
        else {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            errorMessage = exception.message;
        }
        response.status(status).json({
            statusCode: status,
            error: errorMessage,
        });
    }
};
MmrExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], MmrExceptionsFilter);
exports.MmrExceptionsFilter = MmrExceptionsFilter;
//# sourceMappingURL=mmr-exception.filter.js.map