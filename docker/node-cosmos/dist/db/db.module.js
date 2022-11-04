"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var DbModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const entities = __importStar(require("../entities"));
const logger_1 = require("../utils/logger");
const promise_1 = require("../utils/promise");
const yargs_1 = require("../yargs");
const logger = (0, logger_1.getLogger)('db');
async function establishConnection(sequelize, numRetries) {
    try {
        await sequelize.authenticate();
    }
    catch (error) {
        logger.error(error, 'Unable to connect to the database');
        if (numRetries > 0) {
            await (0, promise_1.delay)(3);
            void (await establishConnection(sequelize, numRetries - 1));
        }
        else {
            process.exit(1);
        }
    }
}
const sequelizeFactory = (option) => async () => {
    const sequelize = new sequelize_1.Sequelize(option);
    const numRetries = 5;
    await establishConnection(sequelize, numRetries);
    for (const factoryFn of Object.keys(entities).filter((k) => /Factory$/.exec(k))) {
        entities[factoryFn](sequelize);
    }
    const { migrate } = (0, yargs_1.getYargsOption)().argv;
    await sequelize.sync({ alter: migrate });
    return sequelize;
};
let DbModule = DbModule_1 = class DbModule {
    static forRoot(option) {
        const { argv } = (0, yargs_1.getYargsOption)();
        const logger = (0, logger_1.getLogger)('db');
        return {
            module: DbModule_1,
            providers: [
                {
                    provide: sequelize_1.Sequelize,
                    useFactory: sequelizeFactory(Object.assign(Object.assign({}, option), { dialect: 'postgres', logging: argv.debug
                            ? (sql, timing) => {
                                logger.debug(sql);
                            }
                            : false })),
                },
            ],
            exports: [sequelize_1.Sequelize],
        };
    }
    static forFeature(models) {
        return {
            module: DbModule_1,
            providers: models.map((model) => ({
                provide: model,
                inject: [sequelize_1.Sequelize],
                useFactory: (sequelize) => sequelize.model(model),
            })),
            exports: models,
        };
    }
};
DbModule = DbModule_1 = __decorate([
    (0, common_1.Global)()
], DbModule);
exports.DbModule = DbModule;
//# sourceMappingURL=db.module.js.map