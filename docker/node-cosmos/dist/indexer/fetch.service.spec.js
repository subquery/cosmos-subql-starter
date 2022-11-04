"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const dictionary_service_1 = require("./dictionary.service");
const fetch_service_1 = require("./fetch.service");
function mockDictionaryService(url) {
    return new dictionary_service_1.DictionaryService({
        network: {
            dictionary: url,
        },
    });
}
describe('Dictionary Queries', () => {
    let dictionary;
    beforeAll(() => {
        dictionary = mockDictionaryService('http://localhost:3000'); // TODO get url
    });
    describe('Message Filter Queries', () => {
        it('Basic wasm filter works', () => {
            const filter = {
                type: '/cosmwasm.wasm.v1.MsgExecuteContract',
            };
            const condition = (0, fetch_service_1.messageFilterToQueryEntry)(filter);
            const query = dictionary.dictionaryQuery(3093822, 4000000, 5, [condition]);
            expect(query).toEqual({
                query: `query($messages_0_0:String!){_metadata {lastProcessedHeight chain }  messages (filter:{or:[{type:{equalTo:$messages_0_0}}],blockHeight:{greaterThanOrEqualTo:"3093822",lessThan:"4000000"}},orderBy:BLOCK_HEIGHT_ASC,first:5){nodes {blockHeight }  } }`,
                variables: { messages_0_0: '/cosmwasm.wasm.v1.MsgExecuteContract' },
            });
        });
        it('Wasm with contract filter builds a valid query', () => {
            const filter = {
                type: '/cosmwasm.wasm.v1.MsgExecuteContract',
                contractCall: 'vote',
                values: {
                    contract: 'juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2',
                },
            };
            const condition = (0, fetch_service_1.messageFilterToQueryEntry)(filter);
            const query = dictionary.dictionaryQuery(3093822, 4000000, 5, [condition]);
            expect(query).toEqual({
                query: `query($messages_0_0:String!,$messages_0_1:JSON){_metadata {lastProcessedHeight chain }  messages (filter:{or:[{and:[{type:{equalTo:$messages_0_0}},{data:{contains:$messages_0_1}}]}],blockHeight:{greaterThanOrEqualTo:"3093822",lessThan:"4000000"}},orderBy:BLOCK_HEIGHT_ASC,first:5){nodes {blockHeight }  } }`,
                variables: {
                    messages_0_0: '/cosmwasm.wasm.v1.MsgExecuteContract',
                    messages_0_1: {
                        contract: 'juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2',
                    },
                },
            });
        });
        it('Wasm with nested filter works', () => {
            const filter = {
                type: '/cosmwasm.wasm.v1.MsgExecuteContract',
                contractCall: 'swap',
                values: {
                    'msg.swap.input_token': 'Token2',
                },
            };
            const condition = (0, fetch_service_1.messageFilterToQueryEntry)(filter);
            expect(condition.conditions[1].value).toEqual({
                msg: { swap: { input_token: 'Token2' } },
            });
        });
        // it('Wasm with enum filter works', () => {
        //   const filter: SubqlCosmosMessageFilter = {
        //     type: '/cosmwasm.wasm.v1.MsgExecuteContract',
        //     contractCall: 'swap',
        //     values: {
        //       'msg.swap.input_token': 'Token2',
        //     },
        //   };
        //   const condition = messageFilterToQueryEntry(filter);
        //   console.log('CONDITION', condition, condition.conditions[1].value);
        //   const query = (dictionary as any).dictionaryQuery(
        //     3_093_822, 4_000_000, 5, [condition]
        //   );
        //   console.log('QUERY', query.query, query.variables);
        // });
    });
    // describe('Event Filter Queries', () => {
    // });
});
//# sourceMappingURL=fetch.service.spec.js.map