"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const encoding_1 = require("@cosmjs/encoding");
const math_1 = require("@cosmjs/math");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const event_emitter_1 = require("@nestjs/event-emitter");
const testing_1 = require("@nestjs/testing");
const common_1 = require("@subql/common");
const graphql_1 = require("graphql");
const NodeConfig_1 = require("../configure/NodeConfig");
const SubqueryProject_1 = require("../configure/SubqueryProject");
const api_service_1 = require("./api.service");
const ENDPOINT = 'https://rpc-juno.itastakers.com/';
const CHAINID = 'juno-1';
const TEST_BLOCKNUMBER = 3266772;
const projectsDir = path_1.default.join(__dirname, '../../test');
function testCosmosProject() {
    return {
        network: {
            endpoint: ENDPOINT,
            chainId: CHAINID,
        },
        dataSources: [],
        id: 'test',
        root: './',
        schema: new graphql_1.GraphQLSchema({}),
        templates: [],
    };
}
jest.setTimeout(200000);
describe.skip('ApiService', () => {
    let app;
    let apiService;
    const prepareApiService = async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                {
                    provide: SubqueryProject_1.SubqueryProject,
                    useFactory: () => testCosmosProject(),
                },
                api_service_1.ApiService,
                NodeConfig_1.NodeConfig,
            ],
            imports: [event_emitter_1.EventEmitterModule.forRoot()],
        }).compile();
        app = module.createNestApplication();
        await app.init();
        apiService = app.get(api_service_1.ApiService);
        await apiService.init();
    };
    beforeAll(async () => {
        await prepareApiService();
    });
    it('query block info', async () => {
        const api = apiService.getApi();
        const blockInfo = await api.blockInfo(TEST_BLOCKNUMBER);
        const doc = (0, common_1.loadFromJsonOrYaml)(path_1.default.join(projectsDir, 'block_3266772.json'));
        const realBlockInfo = {
            id: (0, encoding_1.toHex)(doc.block_id.hash).toUpperCase(),
            header: {
                version: {
                    block: new math_1.Uint53(+doc.block.header.version.block).toString(),
                    app: blockInfo.header.version.app,
                },
                height: doc.block.header.height,
                chainId: doc.block.header.chainId,
                time: (0, tendermint_rpc_1.toRfc3339WithNanoseconds)(doc.block.header.time),
            },
            txs: doc.block.txs,
        };
        expect(blockInfo).toMatchObject(realBlockInfo);
    });
    it('query tx info by height', async () => {
        const api = apiService.getApi();
        const txInfos = await api.txInfoByHeight(TEST_BLOCKNUMBER);
        expect(txInfos.length).toEqual(4);
    });
});
//# sourceMappingURL=api.service.test.js.map