"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoiService = void 0;
const common_1 = require("@nestjs/common");
const util_1 = require("@polkadot/util");
const sequelize_1 = require("sequelize");
const NodeConfig_1 = require("../configure/NodeConfig");
const SubqueryProject_1 = require("../configure/SubqueryProject");
const Poi_entity_1 = require("./entities/Poi.entity");
const DEFAULT_PARENT_HASH = (0, util_1.hexToU8a)('0x00');
let PoiService = class PoiService {
    constructor(nodeConfig, project, sequelize) {
        this.nodeConfig = nodeConfig;
        this.project = project;
        this.sequelize = sequelize;
        this.isShutdown = false;
    }
    onApplicationShutdown() {
        this.isShutdown = true;
    }
    async init(schema) {
        this.schema = schema;
        this.poiRepo = (0, Poi_entity_1.PoiFactory)(this.sequelize, this.schema);
        this.latestPoiBlockHash = await this.getLatestPoiBlockHash();
    }
    async fetchPoiBlockHashFromDb() {
        const lastPoi = await this.poiRepo.findOne({
            order: [['id', 'DESC']],
        });
        if (lastPoi === null || lastPoi === undefined) {
            return null;
        }
        else if (lastPoi !== null && lastPoi.hash) {
            return lastPoi.hash;
        }
        else {
            throw new Error(`Poi found but can not get latest hash`);
        }
    }
    async getLatestPoiBlockHash() {
        if (!this.latestPoiBlockHash) {
            const poiBlockHash = await this.fetchPoiBlockHashFromDb();
            if (poiBlockHash === null || poiBlockHash === undefined) {
                this.latestPoiBlockHash = DEFAULT_PARENT_HASH;
            }
            else {
                this.latestPoiBlockHash = poiBlockHash;
            }
        }
        return this.latestPoiBlockHash;
    }
    setLatestPoiBlockHash(hash) {
        this.latestPoiBlockHash = hash;
    }
};
PoiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [NodeConfig_1.NodeConfig,
        SubqueryProject_1.SubqueryProject,
        sequelize_1.Sequelize])
], PoiService);
exports.PoiService = PoiService;
//# sourceMappingURL=poi.service.js.map