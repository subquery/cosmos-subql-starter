"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelCaseObjectKey = exports.assign = void 0;
const lodash_1 = require("lodash");
function assign(target, src, src2) {
    return (0, lodash_1.assignWith)(target, src, src2, (objValue, srcValue) => (0, lodash_1.isUndefined)(srcValue) ? objValue : srcValue);
}
exports.assign = assign;
function camelCaseObjectKey(object) {
    return Object.keys(object).reduce((result, key) => (Object.assign(Object.assign({}, result), { [(0, lodash_1.camelCase)(key)]: object[key] })), {});
}
exports.camelCaseObjectKey = camelCaseObjectKey;
//# sourceMappingURL=object.js.map