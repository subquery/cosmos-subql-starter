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
exports.MetaModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const indexer_module_1 = require("../indexer/indexer.module");
const event_listener_1 = require("./event.listener");
const health_controller_1 = require("./health.controller");
const health_service_1 = require("./health.service");
const meta_controller_1 = require("./meta.controller");
const meta_service_1 = require("./meta.service");
const mmrQuery_controller_1 = require("./mmrQuery.controller");
const ready_controller_1 = require("./ready.controller");
const ready_service_1 = require("./ready.service");
let MetaModule = class MetaModule {
};
MetaModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_prometheus_1.PrometheusModule.register(), indexer_module_1.IndexerModule],
        controllers: [
            meta_controller_1.MetaController,
            health_controller_1.HealthController,
            ready_controller_1.ReadyController,
            mmrQuery_controller_1.MmrQueryController,
        ],
        providers: [
            event_listener_1.MetricEventListener,
            (0, nestjs_prometheus_1.makeGaugeProvider)({
                name: 'subql_indexer_api_connected',
                help: 'The indexer api connection status',
            }),
            (0, nestjs_prometheus_1.makeGaugeProvider)({
                name: 'subql_indexer_injected_api_connected',
                help: 'The indexer injected api connection status',
            }),
            (0, nestjs_prometheus_1.makeGaugeProvider)({
                name: 'subql_indexer_processing_block_height',
                help: 'The current processing block height',
            }),
            (0, nestjs_prometheus_1.makeGaugeProvider)({
                name: 'subql_indexer_processed_block_height',
                help: 'The last processed block height',
            }),
            (0, nestjs_prometheus_1.makeGaugeProvider)({
                name: 'subql_indexer_target_block_height',
                help: 'The latest finalized block height',
            }),
            (0, nestjs_prometheus_1.makeGaugeProvider)({
                name: 'subql_indexer_best_block_height',
                help: 'The latest best block height',
            }),
            (0, nestjs_prometheus_1.makeGaugeProvider)({
                name: 'subql_indexer_block_queue_size',
                help: 'The size of fetched block queue',
            }),
            (0, nestjs_prometheus_1.makeGaugeProvider)({
                name: 'subql_indexer_blocknumber_queue_size',
                help: 'The size of fetched block number queue',
            }),
            (0, nestjs_prometheus_1.makeGaugeProvider)({
                name: 'subql_indexer_using_dictionary',
                help: 'The status of indexer is using the dictionary',
            }),
            (0, nestjs_prometheus_1.makeGaugeProvider)({
                name: 'subql_indexer_skip_dictionary_count',
                help: 'The number of times indexer been skip use dictionary',
            }),
            meta_service_1.MetaService,
            health_service_1.HealthService,
            ready_service_1.ReadyService,
        ],
    })
], MetaModule);
exports.MetaModule = MetaModule;
//# sourceMappingURL=meta.module.js.map