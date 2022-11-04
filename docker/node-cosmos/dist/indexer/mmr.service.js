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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MmrService = void 0;
const fs_1 = __importDefault(require("fs"));
const common_1 = require("@nestjs/common");
const util_1 = require("@polkadot/util");
const common_2 = require("@subql/common");
const x_merkle_mountain_range_1 = require("@subql/x-merkle-mountain-range");
const js_sha3_1 = require("js-sha3");
const sequelize_1 = require("sequelize");
const NodeConfig_1 = require("../configure/NodeConfig");
const SubqueryProject_1 = require("../configure/SubqueryProject");
const logger_1 = require("../utils/logger");
const promise_1 = require("../utils/promise");
const Metadata_entity_1 = require("./entities/Metadata.entity");
const Poi_entity_1 = require("./entities/Poi.entity");
const logger = (0, logger_1.getLogger)('mmr');
const DEFAULT_FETCH_RANGE = 100;
const keccak256Hash = (...nodeValues) => Buffer.from((0, js_sha3_1.keccak256)(Buffer.concat(nodeValues)), 'hex');
let MmrService = class MmrService {
    constructor(nodeConfig, project, sequelize) {
        this.nodeConfig = nodeConfig;
        this.project = project;
        this.sequelize = sequelize;
        this.isShutdown = false;
    }
    onApplicationShutdown() {
        this.isShutdown = true;
    }
    async syncFileBaseFromPoi(schema, blockOffset) {
        this.metadataRepo = (0, Metadata_entity_1.MetadataFactory)(this.sequelize, schema);
        this.poiRepo = (0, Poi_entity_1.PoiFactory)(this.sequelize, schema);
        this.fileBasedMmr = await this.ensureFileBasedMmr(this.nodeConfig.mmrPath);
        this.blockOffset = blockOffset;
        // The file based database current leaf length
        const fileBasedMmrLeafLength = await this.fileBasedMmr.getLeafLength();
        // However, when initialization we pick the previous block for file db and poi mmr validation
        // if mmr leaf length 0 ensure the next block height to be processed min is 1.
        this.nextMmrBlockHeight = fileBasedMmrLeafLength + blockOffset + 1;
        // The latest poi record in database with mmr value
        const latestPoiWithMmr = await this.getLatestPoiWithMmr();
        if (latestPoiWithMmr) {
            // The latestPoiWithMmr its mmr value in filebase db
            const latestPoiFilebaseMmrValue = await this.fileBasedMmr.getRoot(latestPoiWithMmr.id - blockOffset - 1);
            this.validatePoiMmr(latestPoiWithMmr, latestPoiFilebaseMmrValue);
        }
        logger.info(`file based database MMR start with next block height at ${this.nextMmrBlockHeight}`);
        while (!this.isShutdown) {
            const poiBlocks = await this.getPoiBlocksByRange(this.nextMmrBlockHeight);
            if (poiBlocks.length !== 0) {
                for (const block of poiBlocks) {
                    if (this.nextMmrBlockHeight < block.id) {
                        for (let i = this.nextMmrBlockHeight; i < block.id; i++) {
                            await this.fileBasedMmr.append(common_2.DEFAULT_LEAF);
                            this.nextMmrBlockHeight = i + 1;
                        }
                    }
                    await this.appendMmrNode(block);
                }
            }
            else {
                const keys = ['lastProcessedHeight', 'lastPoiHeight'];
                const entries = await this.metadataRepo.findAll({
                    where: {
                        key: keys,
                    },
                });
                const keyValue = entries.reduce((arr, curr) => {
                    arr[curr.key] = curr.value;
                    return arr;
                }, {});
                // this.nextMmrBlockHeight means block before nextMmrBlockHeight-1 already exist in filebase mmr
                if (this.nextMmrBlockHeight > Number(keyValue.lastPoiHeight) &&
                    this.nextMmrBlockHeight <= Number(keyValue.lastProcessedHeight)) {
                    for (let i = this.nextMmrBlockHeight; i <= Number(keyValue.lastProcessedHeight); i++) {
                        await this.fileBasedMmr.append(common_2.DEFAULT_LEAF);
                        this.nextMmrBlockHeight = i + 1;
                    }
                }
                await (0, promise_1.delay)(common_2.MMR_AWAIT_TIME);
            }
        }
    }
    async appendMmrNode(poiBlock) {
        const newLeaf = poiBlock.hash;
        if (newLeaf.length !== common_2.DEFAULT_WORD_SIZE) {
            throw new Error(`Append Mmr failed, input data length should be ${common_2.DEFAULT_WORD_SIZE}`);
        }
        const estLeafIndexByBlockHeight = poiBlock.id - this.blockOffset - 1;
        // The next leaf index in mmr, current latest leaf index always .getLeafLength -1.
        await this.fileBasedMmr.append(newLeaf, estLeafIndexByBlockHeight);
        const mmrRoot = await this.fileBasedMmr.getRoot(estLeafIndexByBlockHeight);
        await this.updatePoiMmrRoot(poiBlock.id, mmrRoot);
        this.nextMmrBlockHeight = poiBlock.id + 1;
    }
    validatePoiMmr(poiWithMmr, mmrValue) {
        if (!(0, util_1.u8aEq)(poiWithMmr.mmrRoot, mmrValue)) {
            throw new Error(`Poi block height ${poiWithMmr.id}, Poi mmr ${(0, util_1.u8aToHex)(poiWithMmr.mmrRoot)} not same as filebased mmr: ${(0, util_1.u8aToHex)(mmrValue)}`);
        }
        else {
            logger.info(`CHECKING : Poi block height ${poiWithMmr.id}, Poi mmr is same as file based mmr`);
        }
    }
    async updatePoiMmrRoot(id, mmrValue) {
        const poiBlock = await this.poiRepo.findByPk(id);
        if (poiBlock.mmrRoot === null) {
            poiBlock.mmrRoot = mmrValue;
            await poiBlock.save();
        }
        else {
            this.validatePoiMmr(poiBlock, mmrValue);
        }
    }
    async getPoiBlocksByRange(startHeight) {
        const poiBlocks = await this.poiRepo.findAll({
            limit: DEFAULT_FETCH_RANGE,
            where: { id: { [sequelize_1.Op.gte]: startHeight } },
            order: [['id', 'ASC']],
        });
        if (poiBlocks.length !== 0) {
            return poiBlocks;
        }
        else {
            return [];
        }
    }
    async getLatestPoiWithMmr() {
        const poiBlock = await this.poiRepo.findOne({
            order: [['id', 'DESC']],
            where: { mmrRoot: { [sequelize_1.Op.ne]: null } },
        });
        return poiBlock;
    }
    async getFirstPoiWithoutMmr() {
        const poiBlock = await this.poiRepo.findOne({
            order: [['id', 'ASC']],
            where: { mmrRoot: { [sequelize_1.Op.eq]: null } },
        });
        return poiBlock;
    }
    async ensureFileBasedMmr(projectMmrPath) {
        let fileBasedDb;
        if (fs_1.default.existsSync(projectMmrPath)) {
            fileBasedDb = await x_merkle_mountain_range_1.FileBasedDb.open(projectMmrPath);
        }
        else {
            fileBasedDb = await x_merkle_mountain_range_1.FileBasedDb.create(projectMmrPath, common_2.DEFAULT_WORD_SIZE);
        }
        return new x_merkle_mountain_range_1.MMR(keccak256Hash, fileBasedDb);
    }
    async getMmr(blockHeight) {
        const leafIndex = blockHeight - this.blockOffset - 1;
        if (leafIndex < 0) {
            throw new Error(`Parameter blockHeight must greater equal to ${this.blockOffset + 1} `);
        }
        const [mmrResponse, node] = await Promise.all([
            this.fileBasedMmr.getRoot(leafIndex),
            this.fileBasedMmr.get(leafIndex),
        ]);
        return {
            offset: this.blockOffset,
            height: blockHeight,
            mmrRoot: (0, util_1.u8aToHex)(mmrResponse),
            hash: (0, util_1.u8aToHex)(node),
        };
    }
    async getLatestMmr() {
        // latest leaf index need fetch from .db, as original method will use cache
        const blockHeight = (await this.fileBasedMmr.db.getLeafLength()) + this.blockOffset;
        return this.getMmr(blockHeight);
    }
    async getLatestMmrProof() {
        // latest leaf index need fetch from .db, as original method will use cache
        const blockHeight = (await this.fileBasedMmr.db.getLeafLength()) + this.blockOffset;
        return this.getMmrProof(blockHeight);
    }
    async getMmrProof(blockHeight) {
        const leafIndex = blockHeight - this.blockOffset - 1;
        if (leafIndex < 0) {
            throw new Error(`Parameter blockHeight must greater equal to ${this.blockOffset + 1} `);
        }
        const mmrProof = await this.fileBasedMmr.getProof([leafIndex]);
        const nodes = Object.entries(mmrProof.db.nodes).map(([key, data]) => {
            return {
                node: key,
                hash: (0, util_1.u8aToHex)(data),
            };
        });
        return {
            digest: mmrProof.digest.name,
            leafLength: mmrProof.db.leafLength,
            nodes,
        };
    }
};
MmrService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [NodeConfig_1.NodeConfig,
        SubqueryProject_1.SubqueryProject,
        sequelize_1.Sequelize])
], MmrService);
exports.MmrService = MmrService;
//# sourceMappingURL=mmr.service.js.map