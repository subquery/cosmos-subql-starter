"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoiFactory = void 0;
const sequelize_1 = require("sequelize");
function PoiFactory(sequelize, schema) {
    return sequelize.define(`_poi`, {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
        },
        chainBlockHash: {
            type: sequelize_1.DataTypes.BLOB,
            allowNull: false,
            unique: true,
        },
        hash: {
            type: sequelize_1.DataTypes.BLOB,
            allowNull: false,
            unique: true,
        },
        parentHash: {
            type: sequelize_1.DataTypes.BLOB,
            allowNull: false,
            unique: true,
        },
        operationHashRoot: {
            type: sequelize_1.DataTypes.BLOB,
            allowNull: false,
        },
        mmrRoot: {
            type: sequelize_1.DataTypes.BLOB,
            allowNull: true,
            unique: true,
        },
        projectId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: '0',
        },
    }, {
        freezeTableName: true,
        schema: schema,
        indexes: [{ fields: ['hash'] }],
    });
}
exports.PoiFactory = PoiFactory;
//# sourceMappingURL=Poi.entity.js.map