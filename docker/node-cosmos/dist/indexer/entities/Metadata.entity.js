"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataFactory = void 0;
const sequelize_1 = require("sequelize");
function MetadataFactory(sequelize, schema) {
    return sequelize.define(`_metadata`, {
        key: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
        },
        value: {
            type: sequelize_1.DataTypes.JSONB,
        },
    }, { freezeTableName: true, schema: schema });
}
exports.MetadataFactory = MetadataFactory;
//# sourceMappingURL=Metadata.entity.js.map