"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBlocksBatches = exports.wrapEvent = exports.wrapTx = exports.wrapBlock = exports.fetchCosmosBlocksArray = exports.filterEvents = exports.filterEvent = exports.filterMessages = exports.filterMessageData = void 0;
const assert_1 = __importDefault(require("assert"));
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
const proto_signing_1 = require("@cosmjs/proto-signing");
const logs_1 = require("@cosmjs/stargate/build/logs");
const logger_1 = require("./logger");
const logger = (0, logger_1.getLogger)('fetch');
function filterMessageData(data, filter) {
    if (!filter)
        return true;
    if (filter.type !== data.msg.typeUrl) {
        return false;
    }
    if (filter.values) {
        for (const key in filter.values) {
            if (filter.values[key] !==
                key.split('.').reduce((acc, curr) => acc[curr], data.msg.decodedMsg)) {
                return false;
            }
        }
    }
    if (filter.type === '/cosmwasm.wasm.v1.MsgExecuteContract' &&
        filter.contractCall &&
        !(filter.contractCall === data.msg.decodedMsg.msg ||
            filter.contractCall in data.msg.decodedMsg.msg)) {
        return false;
    }
    return true;
}
exports.filterMessageData = filterMessageData;
function filterMessages(messages, filterOrFilters) {
    if (!filterOrFilters ||
        (filterOrFilters instanceof Array && filterOrFilters.length === 0)) {
        return messages;
    }
    const filters = filterOrFilters instanceof Array ? filterOrFilters : [filterOrFilters];
    const filteredMessages = messages.filter((message) => {
        filters.find((filter) => filterMessageData(message, filter));
    });
    return filteredMessages;
}
exports.filterMessages = filterMessages;
function filterEvent(event, filter) {
    if (!filter)
        return true;
    if (filter.type !== event.event.type) {
        return false;
    }
    if (filter.messageFilter &&
        !filterMessageData(event.msg, filter.messageFilter)) {
        return false;
    }
    return true;
}
exports.filterEvent = filterEvent;
function filterEvents(events, filterOrFilters) {
    if (!filterOrFilters ||
        (filterOrFilters instanceof Array && filterOrFilters.length === 0)) {
        return events;
    }
    const filters = filterOrFilters instanceof Array ? filterOrFilters : [filterOrFilters];
    const filteredEvents = events.filter((event) => {
        filters.find((filter) => filterEvent(event, filter));
    });
    return filteredEvents;
}
exports.filterEvents = filterEvents;
async function getBlockByHeight(api, height) {
    return Promise.all([
        api.blockInfo(height).catch((e) => {
            logger.error(e, `failed to fetch block info ${height}`);
            throw e;
        }),
        api.blockResults(height).catch((e) => {
            logger.error(e, `failed to fetch block results ${height}`);
            throw e;
        }),
    ]);
}
async function fetchCosmosBlocksArray(api, blockArray) {
    return Promise.all(blockArray.map(async (height) => getBlockByHeight(api, height)));
}
exports.fetchCosmosBlocksArray = fetchCosmosBlocksArray;
function wrapBlock(block, txs) {
    return {
        block: block,
        txs: txs,
    };
}
exports.wrapBlock = wrapBlock;
function wrapTx(block, txResults) {
    return txResults.map((tx, idx) => ({
        idx,
        block: block,
        tx,
        hash: (0, encoding_1.toHex)((0, crypto_1.sha256)(block.block.txs[idx])).toUpperCase(),
        get decodedTx() {
            delete this.decodedTx;
            return (this.decodedTx = (0, proto_signing_1.decodeTxRaw)(block.block.txs[idx]));
        },
    }));
}
exports.wrapTx = wrapTx;
function wrapCosmosMsg(block, tx, idx, api) {
    const rawMessage = tx.decodedTx.body.messages[idx];
    return {
        idx,
        tx: tx,
        block: block,
        msg: {
            typeUrl: rawMessage.typeUrl,
            get decodedMsg() {
                delete this.decodedMsg;
                return (this.decodedMsg = api.decodeMsg(rawMessage));
            },
        },
    };
}
function wrapMsg(block, txs, api) {
    const msgs = [];
    for (const tx of txs) {
        for (let i = 0; i < tx.decodedTx.body.messages.length; i++) {
            msgs.push(wrapCosmosMsg(block, tx, i, api));
        }
    }
    return msgs;
}
function wrapEvent(block, txs, api) {
    const events = [];
    for (const tx of txs) {
        let logs;
        try {
            logs = (0, logs_1.parseRawLog)(tx.tx.log);
        }
        catch (e) {
            //parsing fails if transaction had failed.
            logger.warn('Failed to parse raw log, most likely a failed transaction');
            continue;
        }
        for (const log of logs) {
            const msg = wrapCosmosMsg(block, tx, log.msg_index, api);
            for (let i = 0; i < log.events.length; i++) {
                const event = {
                    idx: i,
                    msg,
                    tx,
                    block,
                    log,
                    event: log.events[i],
                };
                events.push(event);
            }
        }
    }
    return events;
}
exports.wrapEvent = wrapEvent;
async function fetchBlocksBatches(api, blockArray) {
    const blocks = await fetchCosmosBlocksArray(api, blockArray);
    return blocks.map(([blockInfo, blockResults]) => {
        try {
            (0, assert_1.default)(blockResults.results.length === blockInfo.txs.length, `txInfos doesn't match up with block (${blockInfo.header.height}) transactions expected ${blockInfo.txs.length}, received: ${blockResults.results.length}`);
            // Make non-readonly
            const results = [...blockResults.results];
            return new LazyBlockContent(blockInfo, results, api);
        }
        catch (e) {
            logger.error(e, `Failed to fetch and prepare block ${blockInfo.header.height}`);
            throw e;
        }
    });
}
exports.fetchBlocksBatches = fetchBlocksBatches;
class LazyBlockContent {
    constructor(_blockInfo, _results, _api) {
        this._blockInfo = _blockInfo;
        this._results = _results;
        this._api = _api;
    }
    get block() {
        if (!this._wrappedBlock) {
            this._wrappedBlock = wrapBlock(this._blockInfo, this._results);
        }
        return this._wrappedBlock;
    }
    get transactions() {
        if (!this._wrappedTransaction) {
            this._wrappedTransaction = wrapTx(this.block, this._results);
        }
        return this._wrappedTransaction;
    }
    get messages() {
        if (!this._wrappedMessage) {
            this._wrappedMessage = wrapMsg(this.block, this.transactions, this._api);
        }
        return this._wrappedMessage;
    }
    get events() {
        if (!this._wrappedEvent) {
            this._wrappedEvent = wrapEvent(this.block, this.transactions, this._api);
        }
        return this._wrappedEvent;
    }
}
//# sourceMappingURL=cosmos.js.map