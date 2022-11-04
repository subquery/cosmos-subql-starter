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
exports.SandboxService = exports.IndexerSandbox = exports.Sandbox = void 0;
const path_1 = __importDefault(require("path"));
const common_1 = require("@nestjs/common");
const utils_1 = require("@subql/utils");
const lodash_1 = require("lodash");
const vm2_1 = require("vm2");
const NodeConfig_1 = require("../configure/NodeConfig");
const SubqueryProject_1 = require("../configure/SubqueryProject");
const logger_1 = require("../utils/logger");
const promise_1 = require("../utils/promise");
const yargs_1 = require("../yargs");
const api_service_1 = require("./api.service");
const store_service_1 = require("./store.service");
const { argv } = (0, yargs_1.getYargsOption)();
const trace = require('@opentelemetry/api').trace;
const tracer = trace.getTracer('sandbox.service');
const DEFAULT_OPTION = {
    console: 'redirect',
    wasm: argv.unsafe,
    sandbox: {},
    require: {
        builtin: argv.unsafe
            ? ['*']
            : ['assert', 'buffer', 'crypto', 'util', 'path'],
        external: true,
        context: 'sandbox',
    },
    wrapper: 'commonjs',
    sourceExtensions: ['js', 'cjs'],
};
const logger = (0, logger_1.getLogger)('sandbox');
class Sandbox extends vm2_1.NodeVM {
    constructor(option, script) {
        super((0, lodash_1.merge)(DEFAULT_OPTION, {
            require: {
                root: option.root,
                resolve: (moduleName) => {
                    return require.resolve(moduleName, { paths: [option.root] });
                },
            },
        }));
        this.script = script;
    }
    async runTimeout(duration) {
        return (0, promise_1.timeout)(this.run(this.script), duration);
    }
}
exports.Sandbox = Sandbox;
class IndexerSandbox extends Sandbox {
    constructor(option, config) {
        super(option, new vm2_1.VMScript(`const mappingFunctions = require('${option.entry}');
      module.exports = mappingFunctions[funcName](...args);
    `, path_1.default.join(option.root, 'sandbox')));
        this.config = config;
        this.injectGlobals(option);
    }
    async securedExec(funcName, args) {
        let result;
        tracer.startActiveSpan('securedExec', span => {
            const done = () => span.end();
            result = this._securedExec(funcName, args);
            result.then(done, done)
        })
        return result;
    }
    async _securedExec(funcName, args) {
        this.setGlobal('args', args);
        this.setGlobal('funcName', funcName);
        try {
            await this.runTimeout(this.config.timeout);
        }
        catch (e) {
            e.handler = funcName;
            if (this.config.logLevel && (0, utils_1.levelFilter)('debug', this.config.logLevel)) {
                e.handlerArgs = JSON.stringify(args);
            }
            throw e;
        }
        finally {
            this.setGlobal('args', []);
            this.setGlobal('funcName', '');
        }
    }
    injectGlobals({ store }) {
        if (store) {
            this.freeze(store, 'store');
        }
        this.freeze(logger, 'logger');
    }
}
exports.IndexerSandbox = IndexerSandbox;
let SandboxService = class SandboxService {
    constructor(apiService, storeService, nodeConfig, project) {
        this.apiService = apiService;
        this.storeService = storeService;
        this.nodeConfig = nodeConfig;
        this.project = project;
        this.processorCache = {};
    }
    getDsProcessor(ds, api) {
        const entry = this.getDataSourceEntry(ds);
        let processor = this.processorCache[entry];
        if (!processor) {
            processor = new IndexerSandbox({
                // api: await this.apiService.getPatchedApi(),
                store: this.storeService.getStore(),
                root: this.project.root,
                script: ds.mapping.entryScript,
                entry,
            }, this.nodeConfig);
            this.processorCache[entry] = processor;
        }
        processor.freeze(api, 'api');
        processor.freeze(this.apiService.registry, 'registry');
        if (argv.unsafe) {
            processor.freeze(this.apiService.getApi(), 'unsafeApi');
        }
        return processor;
    }
    getDataSourceEntry(ds) {
        return ds.mapping.file;
    }
};
SandboxService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.ApiService,
        store_service_1.StoreService,
        NodeConfig_1.NodeConfig,
        SubqueryProject_1.SubqueryProject])
], SandboxService);
exports.SandboxService = SandboxService;
//# sourceMappingURL=sandbox.service.js.map
