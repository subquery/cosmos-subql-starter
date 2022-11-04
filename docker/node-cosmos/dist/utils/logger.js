"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestLogger = exports.setLevel = exports.getLogger = void 0;
const utils_1 = require("@subql/utils");
const yargs_1 = require("../yargs");
const outputFmt = (0, yargs_1.argv)('output-fmt');
const debug = (0, yargs_1.argv)('debug');
const logLevel = (0, yargs_1.argv)('log-level');
const logger = new utils_1.Logger({
    level: debug ? 'debug' : logLevel,
    outputFormat: outputFmt,
    nestedKey: 'payload',
});
function getLogger(category) {
    return logger.getLogger(category);
}
exports.getLogger = getLogger;
function setLevel(level) {
    logger.setLevel(level);
}
exports.setLevel = setLevel;
class NestLogger {
    constructor() {
        this.logger = logger.getLogger('nestjs');
    }
    error(message, trace) {
        if (trace) {
            this.logger.error({ trace }, message);
        }
        else {
            this.logger.error(message);
        }
    }
    log(message) {
        this.logger.info(message);
    }
    warn(message) {
        this.logger.warn(message);
    }
}
exports.NestLogger = NestLogger;
//# sourceMappingURL=logger.js.map