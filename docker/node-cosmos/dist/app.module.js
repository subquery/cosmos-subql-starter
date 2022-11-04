"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.NodeOption = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const configure_module_1 = require("./configure/configure.module");
const db_module_1 = require("./db/db.module");
const indexer_module_1 = require("./indexer/indexer.module");
const meta_module_1 = require("./meta/meta.module");
class NodeOption {
}
exports.NodeOption = NodeOption;
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            db_module_1.DbModule.forRoot({
                host: (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : '127.0.0.1',
                port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
                username: (_b = process.env.DB_USER) !== null && _b !== void 0 ? _b : 'postgres',
                password: (_c = process.env.DB_PASS) !== null && _c !== void 0 ? _c : 'postgres',
                database: (_d = process.env.DB_DATABASE) !== null && _d !== void 0 ? _d : 'postgres',
            }),
            event_emitter_1.EventEmitterModule.forRoot(),
            configure_module_1.ConfigureModule.register(),
            schedule_1.ScheduleModule.forRoot(),
            indexer_module_1.IndexerModule,
            meta_module_1.MetaModule,
        ],
        controllers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map