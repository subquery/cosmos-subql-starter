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
exports.DictionaryService = void 0;
const core_1 = require("@apollo/client/core");
const common_1 = require("@nestjs/common");
const utils_1 = require("@subql/utils");
const node_fetch_1 = __importDefault(require("node-fetch"));
const SubqueryProject_1 = require("../configure/SubqueryProject");
const logger_1 = require("../utils/logger");
const profiler_1 = require("../utils/profiler");
const yargs_1 = require("../yargs");
const logger = (0, logger_1.getLogger)('dictionary');
const { argv } = (0, yargs_1.getYargsOption)();
function extractVar(name, cond) {
    return {
        name,
        gqlType: cond.matcher === 'contains' ? 'JSON' : 'String!',
        value: cond.value,
    };
}
const ARG_FIELD_REGX = /[^a-zA-Z0-9-_]/g;
function sanitizeArgField(input) {
    return input.replace(ARG_FIELD_REGX, '');
}
function extractVars(entity, conditions) {
    const gqlVars = [];
    const filter = { or: [] };
    conditions.forEach((i, outerIdx) => {
        if (i.length > 1) {
            filter.or[outerIdx] = {
                and: i.map((j, innerIdx) => {
                    const v = extractVar(`${entity}_${outerIdx}_${innerIdx}`, j);
                    gqlVars.push(v);
                    return {
                        [sanitizeArgField(j.field)]: {
                            [j.matcher || 'equalTo']: `$${v.name}`,
                        },
                    };
                }),
            };
        }
        else if (i.length === 1) {
            const v = extractVar(`${entity}_${outerIdx}_0`, i[0]);
            gqlVars.push(v);
            filter.or[outerIdx] = {
                [sanitizeArgField(i[0].field)]: {
                    [i[0].matcher || 'equalTo']: `$${v.name}`,
                },
            };
        }
    });
    return [gqlVars, filter];
}
function buildDictQueryFragment(entity, startBlock, queryEndBlock, conditions, batchSize) {
    const [gqlVars, filter] = extractVars(entity, conditions);
    const node = {
        entity,
        project: [
            {
                entity: 'nodes',
                project: ['blockHeight'],
            },
        ],
        args: {
            filter: Object.assign(Object.assign({}, filter), { blockHeight: {
                    greaterThanOrEqualTo: `"${startBlock}"`,
                    lessThan: `"${queryEndBlock}"`,
                } }),
            orderBy: 'BLOCK_HEIGHT_ASC',
            first: batchSize.toString(),
        },
    };
    return [gqlVars, node];
}
let DictionaryService = class DictionaryService {
    constructor(project) {
        this.project = project;
        this.isShutdown = false;
        this.client = new core_1.ApolloClient({
            cache: new core_1.InMemoryCache({ resultCaching: true }),
            link: new core_1.HttpLink({ uri: this.project.network.dictionary, fetch: node_fetch_1.default }),
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'no-cache',
                },
                query: {
                    fetchPolicy: 'no-cache',
                },
            },
        });
    }
    onApplicationShutdown() {
        this.isShutdown = true;
    }
    /**
     *
     * @param startBlock
     * @param queryEndBlock this block number will limit the max query range, increase dictionary query speed
     * @param batchSize
     * @param conditions
     */
    async getDictionary(startBlock, queryEndBlock, batchSize, conditions) {
        const { query, variables } = this.dictionaryQuery(startBlock, queryEndBlock, batchSize, conditions);
        try {
            const resp = await this.client.query({
                query: (0, core_1.gql)(query),
                variables,
            });
            const blockHeightSet = new Set();
            const entityEndBlock = {};
            for (const entity of Object.keys(resp.data)) {
                if (entity !== '_metadata' && resp.data[entity].nodes.length >= 0) {
                    for (const node of resp.data[entity].nodes) {
                        blockHeightSet.add(Number(node.blockHeight));
                        entityEndBlock[entity] = Number(node.blockHeight); //last added event blockHeight
                    }
                }
            }
            const _metadata = resp.data._metadata;
            const endBlock = Math.min(...Object.values(entityEndBlock).map((height) => isNaN(height) ? Infinity : height));
            const batchBlocks = Array.from(blockHeightSet)
                .filter((block) => block <= endBlock)
                .sort((n1, n2) => n1 - n2);
            return {
                _metadata,
                batchBlocks,
            };
        }
        catch (err) {
            logger.warn(err, `failed to fetch dictionary result`);
            return undefined;
        }
    }
    dictionaryQuery(startBlock, queryEndBlock, batchSize, conditions) {
        // 1. group condition by entity
        const mapped = conditions.reduce((acc, c) => {
            acc[c.entity] = acc[c.entity] || [];
            acc[c.entity].push(c.conditions);
            return acc;
        }, {});
        // assemble
        const vars = [];
        const nodes = [
            {
                entity: '_metadata',
                project: ['lastProcessedHeight', 'chain'],
            },
        ];
        for (const entity of Object.keys(mapped)) {
            const [pVars, node] = buildDictQueryFragment(entity, startBlock, queryEndBlock, mapped[entity], batchSize);
            nodes.push(node);
            vars.push(...pVars);
        }
        return (0, utils_1.buildQuery)(vars, nodes);
    }
};
__decorate([
    (0, profiler_1.profiler)(argv.profiler),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Array]),
    __metadata("design:returntype", Promise)
], DictionaryService.prototype, "getDictionary", null);
DictionaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [SubqueryProject_1.SubqueryProject])
], DictionaryService);
exports.DictionaryService = DictionaryService;
//# sourceMappingURL=dictionary.service.js.map