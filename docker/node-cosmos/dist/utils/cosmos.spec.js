"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const proto_signing_1 = require("@cosmjs/proto-signing");
const stargate_1 = require("@cosmjs/stargate");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const tx_1 = require("cosmjs-types/cosmwasm/wasm/v1/tx");
const api_service_1 = require("../indexer/api.service");
const cosmos_1 = require("./cosmos");
const ENDPOINT = 'https://rpc.juno-1.api.onfinality.io';
const CHAINID = 'juno-1';
const TEST_BLOCKNUMBER = 3266772;
const TEST_FAILTX_BLOCKNUMBER = 3451838;
const TEST_MESSAGE_FILTER_TRUE = {
    type: '/cosmwasm.wasm.v1.MsgExecuteContract',
    contractCall: 'swap',
    values: {
        sender: 'juno16z990xkfph8vh4wx906k5jzergr4t9fg9sr3y6',
        contract: 'juno1e8n6ch7msks487ecznyeagmzd5ml2pq9tgedqt2u63vra0q0r9mqrjy6ys',
    },
};
const TEST_MESSAGE_FILTER_FALSE = {
    type: '/cosmwasm.wasm.v1.MsgExecuteContract',
    contractCall: 'increment',
    values: {
        sender: 'juno16z990xkfph8vh4wx906k5jzergr4t9fg9sr3y6',
        contract: 'juno1e8n6ch7msks487ecznyeagmzd5ml2pq9tgedqt2u63vra0q0r9mqrjy6ys',
    },
};
const TEST_NESTED_MESSAGE_FILTER_TRUE = {
    type: '/cosmwasm.wasm.v1.MsgExecuteContract',
    contractCall: 'swap',
    values: {
        'msg.swap.input_token': 'Token1',
    },
};
const TEST_NESTED_MESSAGE_FILTER_FALSE = {
    type: '/cosmwasm.wasm.v1.MsgExecuteContract',
    contractCall: 'swap',
    values: {
        'msg.swap.input_token': 'Token2',
    },
};
const TEST_NESTED_MESSAGE_FILTER_INVALID_PATH = {
    type: '/cosmwasm.wasm.v1.MsgExecuteContract',
    contractCall: 'swap',
    values: {
        'msg.swap.input_token.xxx': 'Token2',
    },
};
const TEST_MESSAGE_FILTER_FALSE_2 = {
    type: '/cosmwasm.wasm.v1.MsgStoreCode',
};
describe('CosmosUtils', () => {
    let api;
    let decodedTx;
    let msg;
    beforeAll(async () => {
        const client = new api_service_1.KeepAliveClient(ENDPOINT);
        const tendermint = await tendermint_rpc_1.Tendermint34Client.create(client);
        const wasmTypes = [
            ['/cosmwasm.wasm.v1.MsgClearAdmin', tx_1.MsgClearAdmin],
            ['/cosmwasm.wasm.v1.MsgExecuteContract', tx_1.MsgExecuteContract],
            ['/cosmwasm.wasm.v1.MsgMigrateContract', tx_1.MsgMigrateContract],
            ['/cosmwasm.wasm.v1.MsgStoreCode', tx_1.MsgStoreCode],
            ['/cosmwasm.wasm.v1.MsgInstantiateContract', tx_1.MsgInstantiateContract],
            ['/cosmwasm.wasm.v1.MsgUpdateAdmin', tx_1.MsgUpdateAdmin],
        ];
        const registry = new proto_signing_1.Registry([...stargate_1.defaultRegistryTypes, ...wasmTypes]);
        api = new api_service_1.CosmosClient(tendermint, registry);
        const txInfos = await api.txInfoByHeight(TEST_BLOCKNUMBER);
        const txInfo = txInfos.find((txInfo) => txInfo.hash ===
            '1A796F30DD866CA2E9A866084CB10BF13B5F6502256D6503E8B1BAC358B15701');
        decodedTx = (0, proto_signing_1.decodeTxRaw)(txInfo.tx);
        msg = {
            idx: 0,
            block: {},
            tx: {},
            msg: {
                typeUrl: decodedTx.body.messages[0].typeUrl,
                get decodedMsg() {
                    return api.decodeMsg(decodedTx.body.messages[0]);
                },
            },
        };
    });
    it('filter message data for true', () => {
        const result = (0, cosmos_1.filterMessageData)(msg, TEST_MESSAGE_FILTER_TRUE);
        expect(result).toEqual(true);
    });
    it('filter message data for false', () => {
        const result = (0, cosmos_1.filterMessageData)(msg, TEST_MESSAGE_FILTER_FALSE);
        expect(result).toEqual(false);
    });
    it('filter nested message data for true', () => {
        const result = (0, cosmos_1.filterMessageData)(msg, TEST_NESTED_MESSAGE_FILTER_TRUE);
        expect(result).toEqual(true);
    });
    it('filter nested message data for false', () => {
        const result = (0, cosmos_1.filterMessageData)(msg, TEST_NESTED_MESSAGE_FILTER_FALSE);
        expect(result).toEqual(false);
    });
    it('filter nested message data for invalid path', () => {
        const result = (0, cosmos_1.filterMessageData)(msg, TEST_NESTED_MESSAGE_FILTER_INVALID_PATH);
        expect(result).toEqual(false);
    });
    it('does not wrap events of failed transaction', async () => {
        const blockInfo = await api.blockResults(TEST_FAILTX_BLOCKNUMBER);
        const failedTx = blockInfo.results[2];
        const tx = {
            idx: 0,
            block: {},
            tx: failedTx,
            hash: '',
            decodedTx: {},
        };
        const events = (0, cosmos_1.wrapEvent)({}, [tx], api);
        expect(events.length).toEqual(0);
    });
    it('does not lazy decode failed message filters', () => {
        const spy = jest.spyOn(msg.msg, 'decodedMsg', 'get');
        const result = (0, cosmos_1.filterMessageData)(msg, TEST_MESSAGE_FILTER_FALSE_2);
        expect(spy).not.toHaveBeenCalled();
    });
    it('lazy decode passed message filters', () => {
        const spy = jest.spyOn(msg.msg, 'decodedMsg', 'get');
        const result = (0, cosmos_1.filterMessageData)(msg, TEST_MESSAGE_FILTER_TRUE);
        expect(spy).toHaveBeenCalled();
    });
});
//# sourceMappingURL=cosmos.spec.js.map