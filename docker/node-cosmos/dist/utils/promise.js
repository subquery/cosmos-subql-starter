"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeout = exports.delay = void 0;
async function delay(sec) {
    return new Promise((resolve) => {
        setTimeout(resolve, sec * 1000);
    });
}
exports.delay = delay;
async function timeout(promise, sec) {
    // so we can have a more comprehensive error stack
    const err = new Error('timeout');
    return Promise.race([
        promise,
        new Promise((resolve, reject) => {
            setTimeout(() => reject(err), sec * 1000);
        }),
    ]);
}
exports.timeout = timeout;
//# sourceMappingURL=promise.js.map