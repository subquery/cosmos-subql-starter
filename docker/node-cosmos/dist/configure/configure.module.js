"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ConfigureModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigureModule = exports.validDbSchemaName = void 0;
const assert_1 = __importDefault(require("assert"));
const path_1 = __importDefault(require("path"));
const common_1 = require("@nestjs/common");
const common_2 = require("@subql/common");
const lodash_1 = require("lodash");
const logger_1 = require("../utils/logger");
const yargs_1 = require("../yargs");
const NodeConfig_1 = require("./NodeConfig");
const SubqueryProject_1 = require("./SubqueryProject");
const YargsNameMapping = {
    local: 'localMode',
    'network-endpoint-param': 'networkEndpointParams',
};
function yargsToIConfig(yargs) {
    return Object.entries(yargs).reduce((acc, [key, value]) => {
        var _a;
        if (['_', '$0'].includes(key))
            return acc;
        if (key === 'network-registry') {
            try {
                value = JSON.parse(value);
            }
            catch (e) {
                throw new Error('Argument `network-registry` is not valid JSON');
            }
        }
        if (key === 'network-endpoint-param') {
            value = value.reduce((acc, header) => {
                const [headerKey, headerValue] = header.split(':').map((v) => v.trim());
                acc[headerKey] = headerValue;
                return acc;
            }, {});
        }
        acc[(_a = YargsNameMapping[key]) !== null && _a !== void 0 ? _a : (0, lodash_1.camelCase)(key)] = value;
        return acc;
    }, {});
}
function defaultSubqueryName(config) {
    var _a;
    const ipfsMatch = config.subquery.match(common_2.IPFS_REGEX);
    return Object.assign(Object.assign({}, config), { subqueryName: (_a = config.subqueryName) !== null && _a !== void 0 ? _a : (ipfsMatch
            ? config.subquery.replace(common_2.IPFS_REGEX, '')
            : (0, lodash_1.last)((0, common_2.getProjectRootAndManifest)(config.subquery).root.split(path_1.default.sep))) });
}
// Check if a subquery name is a valid schema name
function validDbSchemaName(name) {
    if (name.length === 0) {
        return false;
    }
    else {
        name = name.toLowerCase();
        const regexp = new RegExp('^[a-zA-Z_][a-zA-Z0-9_\\-\\/]{0,62}$');
        const flag0 = !name.startsWith('pg_'); // Reserved identifier
        const flag1 = regexp.test(name); // <= Valid characters, less than 63 bytes
        if (!flag0) {
            logger.error(`Invalid schema name '${name}', schema name must not be prefixed with 'pg_'`);
        }
        if (!flag1) {
            logger.error(`Invalid schema name '${name}', schema name must start with a letter or underscore, 
         be less than 63 bytes and must contain only valid alphanumeric characters (can include characters '_-/')`);
        }
        return flag0 && flag1;
    }
}
exports.validDbSchemaName = validDbSchemaName;
function warnDeprecations() {
    const yargsOptions = (0, yargs_1.getYargsOption)();
    const { argv } = yargsOptions;
    if (argv['subquery-name']) {
        logger.warn('Note that argument --subquery-name has been deprecated in favour of --db-schema');
    }
    if (argv.local) {
        logger.warn('Note that argument --local has been deprecated');
    }
}
const logger = (0, logger_1.getLogger)('configure');
let ConfigureModule = ConfigureModule_1 = class ConfigureModule {
    static register() {
        const yargsOptions = (0, yargs_1.getYargsOption)();
        const { argv } = yargsOptions;
        let config;
        if (argv.config) {
            config = NodeConfig_1.NodeConfig.fromFile(argv.config, yargsToIConfig(argv));
        }
        else {
            if (!argv.subquery) {
                logger.error('subquery path is missing neither in cli options nor in config file');
                yargsOptions.showHelp();
                process.exit(1);
            }
            warnDeprecations();
            (0, assert_1.default)(argv.subquery, 'subquery path is missing');
            config = new NodeConfig_1.NodeConfig(defaultSubqueryName(yargsToIConfig(argv)));
        }
        if (config.debug) {
            (0, logger_1.setLevel)('debug');
        }
        const project = async () => {
            const p = await SubqueryProject_1.SubqueryProject.create(argv.subquery, (0, lodash_1.omitBy)({
                endpoint: config.networkEndpoint,
                dictionary: config.networkDictionary,
            }, lodash_1.isNil), {
                ipfs: config.ipfs,
            }).catch((err) => {
                logger.error(err, 'Create Subquery project from given path failed!');
                process.exit(1);
            });
            return p;
        };
        return {
            module: ConfigureModule_1,
            providers: [
                {
                    provide: NodeConfig_1.NodeConfig,
                    useValue: config,
                },
                {
                    provide: SubqueryProject_1.SubqueryProject,
                    useFactory: project,
                },
            ],
            exports: [NodeConfig_1.NodeConfig, SubqueryProject_1.SubqueryProject],
        };
    }
};
ConfigureModule = ConfigureModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], ConfigureModule);
exports.ConfigureModule = ConfigureModule;
//# sourceMappingURL=configure.module.js.map