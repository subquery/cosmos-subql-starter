"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockedQueue = void 0;
const promise_1 = require("../utils/promise");
class BlockedQueue {
    constructor(size) {
        this._queue = [];
        this._maxSize = size;
    }
    get size() {
        return this._queue.length;
    }
    get freeSize() {
        return this._maxSize - this._queue.length;
    }
    put(item) {
        if (this._queue.length >= this._maxSize) {
            throw new Error('BlockedQueue exceed max size');
        }
        this._queue.push(item);
    }
    putAll(items) {
        if (this._queue.length + items.length > this._maxSize) {
            throw new Error('BlockedQueue exceed max size');
        }
        this._queue.push(...items);
    }
    firstInQueue() {
        var _a;
        return (_a = this._queue[0]) !== null && _a !== void 0 ? _a : undefined;
    }
    async take() {
        while (!this.size) {
            await (0, promise_1.delay)(0.1);
        }
        return this._queue.shift();
    }
    async takeAll(max) {
        while (!this.size) {
            await (0, promise_1.delay)(0.1);
        }
        let result;
        if (max) {
            result = this._queue.slice(0, max);
            this._queue = this._queue.slice(max);
        }
        else {
            result = this._queue;
            this._queue = [];
        }
        return result;
    }
    reset() {
        this._queue = [];
    }
}
exports.BlockedQueue = BlockedQueue;
//# sourceMappingURL=BlockedQueue.js.map