"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilerWrap = exports.profiler = void 0;
/* class decorator */
const logger_1 = require("./logger");
function isPromise(e) {
    return !!e && typeof e.then === 'function';
}
const logger = (0, logger_1.getLogger)('profiler');
function printCost(start, end, target, method) {
    logger.info(`${target}, ${method}, ${end.getTime() - start.getTime()} ms`);
}
function profiler(enabled = true) {
    return (target, name, descriptor) => {
        if (enabled && !!descriptor && typeof descriptor.value === 'function') {
            const orig = descriptor.value;
            // tslint:disable no-function-expression no-invalid-this
            descriptor.value = function (...args) {
                const start = new Date();
                const res = orig.bind(this)(...args);
                if (isPromise(res)) {
                    res.then((_) => {
                        printCost(start, new Date(), target.constructor.name, name);
                        return _;
                    }, (err) => {
                        printCost(start, new Date(), target.constructor.name, name);
                        throw err;
                    });
                }
                else {
                    printCost(start, new Date(), target.constructor.name, name);
                }
                return res;
            };
        }
    };
}
exports.profiler = profiler;
const profilerWrap = (method, target, name) => (...args) => {
    const start = new Date();
    const res = method(...args);
    if (isPromise(res)) {
        res.then((_) => {
            printCost(start, new Date(), target, name);
            return _;
        }, (err) => {
            printCost(start, new Date(), target, name);
            throw err;
        });
    }
    else {
        printCost(start, new Date(), target, name);
    }
    return res;
};
exports.profilerWrap = profilerWrap;
//# sourceMappingURL=profiler.js.map