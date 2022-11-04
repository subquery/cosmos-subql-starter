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
exports.IndexerModule = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const SubqueryProject_1 = require("../configure/SubqueryProject");
const db_module_1 = require("../db/db.module");
const api_service_1 = require("./api.service");
const benchmark_service_1 = require("./benchmark.service");
const dictionary_service_1 = require("./dictionary.service");
const ds_processor_service_1 = require("./ds-processor.service");
const dynamic_ds_service_1 = require("./dynamic-ds.service");
const fetch_service_1 = require("./fetch.service");
const indexer_manager_1 = require("./indexer.manager");
const mmr_service_1 = require("./mmr.service");
const poi_service_1 = require("./poi.service");
const project_service_1 = require("./project.service");
const sandbox_service_1 = require("./sandbox.service");
const store_service_1 = require("./store.service");
let IndexerModule = class IndexerModule {
};
IndexerModule = __decorate([
    (0, common_1.Module)({
        imports: [db_module_1.DbModule.forFeature(['Subquery'])],
        providers: [
            indexer_manager_1.IndexerManager,
            store_service_1.StoreService,
            {
                provide: api_service_1.ApiService,
                useFactory: async (project, eventEmitter) => {
                    const apiService = new api_service_1.ApiService(project, eventEmitter);
                    await apiService.init();
                    return apiService;
                },
                inject: [SubqueryProject_1.SubqueryProject, event_emitter_1.EventEmitter2],
            },
            fetch_service_1.FetchService,
            benchmark_service_1.BenchmarkService,
            dictionary_service_1.DictionaryService,
            sandbox_service_1.SandboxService,
            ds_processor_service_1.DsProcessorService,
            dynamic_ds_service_1.DynamicDsService,
            poi_service_1.PoiService,
            mmr_service_1.MmrService,
            project_service_1.ProjectService,
        ],
        exports: [store_service_1.StoreService, mmr_service_1.MmrService],
    })
], IndexerModule);
exports.IndexerModule = IndexerModule;
//# sourceMappingURL=indexer.module.js.map