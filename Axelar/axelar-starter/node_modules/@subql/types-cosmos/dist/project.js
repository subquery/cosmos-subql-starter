"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubqlCosmosHandlerKind = exports.SubqlCosmosDatasourceKind = void 0;
var SubqlCosmosDatasourceKind;
(function (SubqlCosmosDatasourceKind) {
    SubqlCosmosDatasourceKind["Runtime"] = "cosmos/Runtime";
    SubqlCosmosDatasourceKind["Custom"] = "cosmos/Custom";
})(SubqlCosmosDatasourceKind = exports.SubqlCosmosDatasourceKind || (exports.SubqlCosmosDatasourceKind = {}));
var SubqlCosmosHandlerKind;
(function (SubqlCosmosHandlerKind) {
    SubqlCosmosHandlerKind["Block"] = "cosmos/BlockHandler";
    SubqlCosmosHandlerKind["Transaction"] = "cosmos/TransactionHandler";
    SubqlCosmosHandlerKind["Message"] = "cosmos/MessageHandler";
    SubqlCosmosHandlerKind["Event"] = "cosmos/EventHandler";
})(SubqlCosmosHandlerKind = exports.SubqlCosmosHandlerKind || (exports.SubqlCosmosHandlerKind = {}));
//# sourceMappingURL=project.js.map