"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreOperations = void 0;
const util_1 = require("@polkadot/util");
const utils_1 = require("@subql/utils");
const merkle_tools_1 = __importDefault(require("merkle-tools"));
const types_1 = require("./types");
class StoreOperations {
    constructor(models) {
        this.models = models;
        this.merkleTools = new merkle_tools_1.default({
            hashType: 'sha256',
        });
    }
    operationEntityToUint8Array(operation) {
        const dataBufferArray = [];
        if (operation.operation === types_1.OperationType.Remove) {
            //remove case
            if ((0, util_1.isString)(operation.data)) {
                dataBufferArray.push(Buffer.from(operation.data));
            }
            else {
                throw new Error(`Remove operation only accept data in string type`);
            }
        }
        else {
            const operationModel = this.models.find(({ name }) => name === operation.entityType);
            for (const field of operationModel.fields) {
                const fieldValue = operation.data[field.name];
                dataBufferArray.push(Buffer.from(field.name));
                if (fieldValue !== undefined && fieldValue !== null) {
                    if (field.isEnum) {
                        //if it is a enum, process it as string
                        (0, utils_1.getTypeByScalarName)('String').hashCode(fieldValue);
                    }
                    else {
                        dataBufferArray.push((0, utils_1.getTypeByScalarName)(field.type).hashCode(fieldValue));
                    }
                }
            }
        }
        return (0, util_1.u8aConcat)(Buffer.from(operation.operation), Buffer.from(operation.entityType), ...dataBufferArray);
    }
    put(operation, entity, data) {
        const operationEntity = {
            operation: operation,
            entityType: entity,
            data: data,
        };
        this.merkleTools.addLeaf((0, util_1.u8aToBuffer)(this.operationEntityToUint8Array(operationEntity)));
    }
    reset() {
        this.merkleTools.resetTree();
    }
    makeOperationMerkleTree() {
        this.merkleTools.makeTree();
    }
    getOperationMerkleRoot() {
        if (this.merkleTools.getTreeReadyState()) {
            return this.merkleTools.getMerkleRoot();
        }
        else {
            throw new Error(`Failed to get Merkle root from operations, tree is not built yet`);
        }
    }
    getOperationLeafCount() {
        return this.merkleTools.getLeafCount();
    }
}
exports.StoreOperations = StoreOperations;
//# sourceMappingURL=StoreOperations.js.map