"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeConfig = void 0;
const assert_1 = __importDefault(require("assert"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const common_1 = require("@subql/common");
const lodash_1 = require("lodash");
const logger_1 = require("../utils/logger");
const object_1 = require("../utils/object");
const logger = (0, logger_1.getLogger)('configure');
const DEFAULT_CONFIG = {
    localMode: false,
    batchSize: 100,
    timeout: 900,
    preferRange: false,
    debug: false,
    queryLimit: 100,
    indexCountLimit: 10,
    timestampField: true,
    proofOfIndex: false,
};
class NodeConfig {
    constructor(config) {
        this._config = (0, object_1.assign)({}, DEFAULT_CONFIG, config);
    }
    static fromFile(filePath, configFromArgs) {
        const fileInfo = path_1.default.parse(filePath);
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error(`Load config from file ${filePath} is not exist`);
        }
        let configFromFile;
        try {
            configFromFile = (0, common_1.loadFromJsonOrYaml)(filePath);
        }
        catch (e) {
            logger.error(`failed to load config file, ${e}`);
            throw e;
        }
        const config = (0, object_1.assign)(configFromFile, configFromArgs, {
            configDir: fileInfo.dir,
        });
        return new NodeConfig(config);
    }
    get subquery() {
        (0, assert_1.default)(this._config.subquery);
        return this._config.subquery;
    }
    get subqueryName() {
        var _a;
        (0, assert_1.default)(this._config.subquery);
        return (_a = this._config.subqueryName) !== null && _a !== void 0 ? _a : (0, lodash_1.last)(this.subquery.split(path_1.default.sep));
    }
    get configDir() {
        return this._config.configDir;
    }
    get localMode() {
        return this._config.localMode;
    }
    get batchSize() {
        return this._config.batchSize;
    }
    get networkEndpoint() {
        return this._config.networkEndpoint;
    }
    get networkDictionary() {
        return this._config.networkDictionary;
    }
    get networkEndpointParams() {
        return this._config.networkEndpointParams;
    }
    get timeout() {
        return this._config.timeout;
    }
    get debug() {
        return this._config.debug;
    }
    get preferRange() {
        return this._config.preferRange;
    }
    get outputFmt() {
        return this._config.outputFmt;
    }
    get logLevel() {
        return this.debug ? 'debug' : this._config.logLevel;
    }
    get queryLimit() {
        return this._config.queryLimit;
    }
    get indexCountLimit() {
        return this._config.indexCountLimit;
    }
    get timestampField() {
        return this._config.timestampField;
    }
    get proofOfIndex() {
        return this._config.proofOfIndex;
    }
    get mmrPath() {
        var _a;
        return (_a = this._config.mmrPath) !== null && _a !== void 0 ? _a : `.mmr/${this.subqueryName}.mmr`;
    }
    get ipfs() {
        return this._config.ipfs;
    }
    get dbSchema() {
        var _a;
        return (_a = this._config.dbSchema) !== null && _a !== void 0 ? _a : this.subqueryName;
    }
    merge(config) {
        (0, object_1.assign)(this._config, config);
        return this;
    }
}
exports.NodeConfig = NodeConfig;
//# sourceMappingURL=NodeConfig.js.map