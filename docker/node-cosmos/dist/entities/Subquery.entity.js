"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubqueryFactory = void 0;
const sequelize_1 = require("sequelize");
function SubqueryFactory(sequelize) {
    return sequelize.define('Subquery', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        dbSchema: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        version: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        hash: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        nextBlockHeight: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        network: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, { underscored: true });
}
exports.SubqueryFactory = SubqueryFactory;
//# sourceMappingURL=Subquery.entity.js.map