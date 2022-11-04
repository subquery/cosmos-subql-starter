"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const lodash_1 = require("lodash");
const dictionary_service_1 = require("./dictionary.service");
function testSubqueryProject() {
    return {
        network: {
            dictionary: `https://api.subquery.network/sq/subquery/polkadot-dictionary`,
        },
        dataSources: [],
        id: 'test',
        root: './',
        schema: new graphql_1.GraphQLSchema({}),
        templates: [],
    };
}
const HAPPY_PATH_CONDITIONS = [
    {
        entity: 'events',
        conditions: [
            { field: 'module', value: 'staking' },
            { field: 'event', value: 'Bonded' },
        ],
    },
    {
        entity: 'events',
        conditions: [
            { field: 'module', value: 'balances' },
            { field: 'event', value: 'Reward' },
        ],
    },
    {
        entity: 'events',
        conditions: [
            { field: 'module', value: 'balances' },
            { field: 'event', value: 'Slash' },
        ],
    },
    {
        entity: 'extrinsics',
        conditions: [
            { field: 'module', value: 'staking' },
            { field: 'call', value: 'bond' },
        ],
    },
];
describe('DictionaryService', () => {
    it('return dictionary query result', async () => {
        const project = testSubqueryProject();
        const dictionaryService = new dictionary_service_1.DictionaryService(project);
        const batchSize = 30;
        const startBlock = 1;
        const endBlock = 10001;
        const dic = await dictionaryService.getDictionary(startBlock, endBlock, batchSize, HAPPY_PATH_CONDITIONS);
        expect(dic.batchBlocks.length).toBeGreaterThan(1);
    }, 500000);
    it('return undefined when dictionary api failed', async () => {
        const project = testSubqueryProject();
        project.network.dictionary =
            'https://api.subquery.network/sq/subquery/dictionary-not-exist';
        const dictionaryService = new dictionary_service_1.DictionaryService(project);
        const batchSize = 30;
        const startBlock = 1;
        const endBlock = 10001;
        const dic = await dictionaryService.getDictionary(startBlock, endBlock, batchSize, HAPPY_PATH_CONDITIONS);
        expect(dic).toBeUndefined();
    }, 500000);
    it('should return meta even startblock height greater than dictionary last processed height', async () => {
        const project = testSubqueryProject();
        const dictionaryService = new dictionary_service_1.DictionaryService(project);
        const batchSize = 30;
        const startBlock = 400000000;
        const endBlock = 400010000;
        const dic = await dictionaryService.getDictionary(startBlock, endBlock, batchSize, HAPPY_PATH_CONDITIONS);
        expect(dic._metadata).toBeDefined();
    }, 500000);
    it('test query the correct range', async () => {
        const project = testSubqueryProject();
        const dictionaryService = new dictionary_service_1.DictionaryService(project);
        const batchSize = 30;
        const startBlock = 1;
        const endBlock = 10001;
        const dic = await dictionaryService.getDictionary(startBlock, endBlock, batchSize, [
            {
                entity: 'extrinsics',
                conditions: [
                    { field: 'module', value: 'timestamp' },
                    { field: 'call', value: 'set' },
                ],
            },
        ]);
        expect(dic.batchBlocks).toEqual((0, lodash_1.range)(startBlock, startBlock + batchSize));
    }, 500000);
    it('use minimum value of event/extrinsic returned block as batch end block', async () => {
        const project = testSubqueryProject();
        const dictionaryService = new dictionary_service_1.DictionaryService(project);
        const batchSize = 50;
        const startBlock = 333300;
        const endBlock = 340000;
        const dic = await dictionaryService.getDictionary(startBlock, endBlock, batchSize, [
            {
                //last event at block 333524
                entity: 'events',
                conditions: [
                    { field: 'module', value: 'session' },
                    { field: 'event', value: 'NewSession' },
                ],
            },
            {
                entity: 'events',
                conditions: [
                    { field: 'module', value: 'staking' },
                    { field: 'event', value: 'EraPayout' },
                ],
            },
            {
                entity: 'events',
                conditions: [
                    { field: 'module', value: 'staking' },
                    { field: 'event', value: 'Reward' },
                ],
            },
            {
                //last extrinsic at block 339186
                entity: 'extrinsics',
                conditions: [
                    { field: 'module', value: 'staking' },
                    { field: 'call', value: 'payoutStakers' },
                ],
            },
            {
                entity: 'extrinsics',
                conditions: [
                    { field: 'module', value: 'utility' },
                    { field: 'call', value: 'batch' },
                ],
            },
        ]);
        expect(dic.batchBlocks[dic.batchBlocks.length - 1]).toBe(333524);
    }, 500000);
});
//# sourceMappingURL=dictionary.service.test.js.map