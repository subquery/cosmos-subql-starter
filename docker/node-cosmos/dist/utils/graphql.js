"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelsTypeToModelAttributes = void 0;
const util_1 = require("@polkadot/util");
const utils_1 = require("@subql/utils");
function modelsTypeToModelAttributes(modelType, enums) {
    const fields = modelType.fields;
    return Object.values(fields).reduce((acc, field) => {
        const allowNull = field.nullable;
        const columnOption = {
            type: field.isEnum
                ? `${enums.get(field.type)}${field.isArray ? '[]' : ''}`
                : field.isArray
                    ? (0, utils_1.getTypeByScalarName)('Json').sequelizeType
                    : (0, utils_1.getTypeByScalarName)(field.type).sequelizeType,
            comment: field.description,
            allowNull,
            primaryKey: field.type === 'ID',
        };
        if (field.type === 'BigInt') {
            columnOption.get = function () {
                const dataValue = this.getDataValue(field.name);
                return dataValue ? BigInt(dataValue) : null;
            };
            columnOption.set = function (val) {
                this.setDataValue(field.name, val === null || val === void 0 ? void 0 : val.toString());
            };
        }
        if (field.type === 'Bytes') {
            columnOption.get = function () {
                const dataValue = this.getDataValue(field.name);
                if (!dataValue) {
                    return null;
                }
                if (!(0, util_1.isBuffer)(dataValue)) {
                    throw new Error(`Bytes: store.get() returned type is not buffer type`);
                }
                return (0, util_1.u8aToHex)((0, util_1.bufferToU8a)(dataValue));
            };
            columnOption.set = function (val) {
                if (val === undefined || (0, util_1.isNull)(val)) {
                    this.setDataValue(field.name, null);
                }
                else if ((0, util_1.isHex)(val)) {
                    const setValue = (0, util_1.u8aToBuffer)((0, util_1.hexToU8a)(val));
                    this.setDataValue(field.name, setValue);
                }
                else {
                    throw new Error(`input for Bytes type is only support unprefixed hex`);
                }
            };
        }
        acc[field.name] = columnOption;
        return acc;
    }, {});
}
exports.modelsTypeToModelAttributes = modelsTypeToModelAttributes;
//# sourceMappingURL=graphql.js.map