"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoiBlock = void 0;
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
// eslint-disable-next-line header/header
const util_1 = require("@polkadot/util");
const util_crypto_1 = require("@polkadot/util-crypto");
const poiBlockHash = (id, chainBlockHash, operationHashRoot, parentHash, projectId) => {
    if (!id || !chainBlockHash || !operationHashRoot || !projectId) {
        throw new Error('Poof of index: can not generate block hash');
    }
    return (0, util_crypto_1.blake2AsU8a)((0, util_1.u8aConcat)((0, util_1.numberToU8a)(id), chainBlockHash, operationHashRoot, Buffer.from(projectId), parentHash));
};
class PoiBlock {
    constructor(id, chainBlockHash, hash, parentHash, operationHashRoot, projectId) {
        this.id = id;
        this.chainBlockHash = chainBlockHash;
        this.hash = hash;
        this.parentHash = parentHash;
        this.operationHashRoot = operationHashRoot;
        this.projectId = projectId;
    }
    static create(id, chainBlockHash, operationHashRoot, parentHash, projectId) {
        const _poiBlockHash = poiBlockHash(id, chainBlockHash, operationHashRoot, parentHash, projectId);
        let _chainBlockHash;
        if ((0, util_1.isHex)(chainBlockHash)) {
            _chainBlockHash = (0, util_1.hexToU8a)(chainBlockHash);
        }
        else if ((0, util_1.isU8a)(chainBlockHash)) {
            _chainBlockHash = chainBlockHash;
        }
        const poiBlock = new PoiBlock(id, _chainBlockHash, _poiBlockHash, parentHash, operationHashRoot, projectId);
        return poiBlock;
    }
}
exports.PoiBlock = PoiBlock;
//# sourceMappingURL=PoiBlock.js.map