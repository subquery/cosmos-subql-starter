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
exports.KeepAliveClient = exports.httpRequest = exports.hasProtocol = exports.CosmosSafeClient = exports.CosmosClient = exports.ApiService = void 0;
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const util_1 = require("util");
const cosmwasm_stargate_1 = require("@cosmjs/cosmwasm-stargate");
const encoding_1 = require("@cosmjs/encoding");
const json_rpc_1 = require("@cosmjs/json-rpc");
const math_1 = require("@cosmjs/math");
const proto_signing_1 = require("@cosmjs/proto-signing");
const stargate_1 = require("@cosmjs/stargate");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const tx_1 = require("cosmjs-types/cosmwasm/wasm/v1/tx");
const eventemitter2_1 = require("eventemitter2");
const SubqueryProject_1 = require("../configure/SubqueryProject");
const logger_1 = require("../utils/logger");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version: packageVersion } = require('../../package.json');
const logger = (0, logger_1.getLogger)('api');
let ApiService = class ApiService {
    constructor(project, eventEmitter) {
        this.project = project;
        this.eventEmitter = eventEmitter;
    }
    async init() {
        try {
            const { network } = this.project;
            // https://github.com/cosmos/cosmjs/blob/ae06012a1510ddf48068bbf21374c0bbff3d5bab/packages/cosmwasm-stargate/src/modules/wasm/messages.ts#L11
            const wasmTypes = [
                ['/cosmwasm.wasm.v1.MsgClearAdmin', tx_1.MsgClearAdmin],
                ['/cosmwasm.wasm.v1.MsgExecuteContract', tx_1.MsgExecuteContract],
                ['/cosmwasm.wasm.v1.MsgMigrateContract', tx_1.MsgMigrateContract],
                ['/cosmwasm.wasm.v1.MsgStoreCode', tx_1.MsgStoreCode],
                ['/cosmwasm.wasm.v1.MsgInstantiateContract', tx_1.MsgInstantiateContract],
                ['/cosmwasm.wasm.v1.MsgUpdateAdmin', tx_1.MsgUpdateAdmin],
            ];
            const endpoint = {
                url: network.endpoint,
                headers: {
                    'User-Agent': `SubQuery-Node ${packageVersion}`,
                },
            };
            const keepAliveClient = new KeepAliveClient(endpoint);
            const tendermint = await tendermint_rpc_1.Tendermint34Client.create(keepAliveClient);
            this.registry = new proto_signing_1.Registry([...stargate_1.defaultRegistryTypes, ...wasmTypes]);
            const chaintypes = await this.getChainType(network);
            for (const typeurl in chaintypes) {
                this.registry.register(typeurl, chaintypes[typeurl]);
            }
            this.api = new CosmosClient(tendermint, this.registry);
            this.networkMeta = {
                chainId: network.chainId,
            };
            const chainId = await this.api.getChainId();
            if (network.chainId !== chainId) {
                const err = new Error(`The given chainId does not match with client: "${network.chainId}"`);
                logger.error(err, err.message);
                throw err;
            }
            return this;
        }
        catch (e) {
            logger.error(e, 'Failed to init api service');
            process.exit(1);
        }
    }
    getApi() {
        return this.api;
    }
    async getSafeApi(height) {
        const { network } = this.project;
        const endpoint = {
            url: network.endpoint,
            headers: {
                'User-Agent': `SubQuery-Node ${packageVersion}`,
            },
        };
        const client = await CosmosSafeClient.safeConnect(endpoint, height);
        return client;
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    async getChainType(network) {
        if (!network.chainTypes) {
            return {};
        }
        const res = {};
        for (const [userPackageName, { messages, packageName },] of network.chainTypes) {
            const pkgName = packageName !== null && packageName !== void 0 ? packageName : userPackageName;
            for (const msg of messages) {
                logger.info(`Registering chain message type "/${pkgName}.${msg}"`);
                const msgObj = network.chainTypes.protoRoot.lookupType(`${pkgName}.${msg}`);
                res[`/${pkgName}.${msg}`] = msgObj;
            }
        }
        return res;
    }
};
ApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [SubqueryProject_1.SubqueryProject,
        eventemitter2_1.EventEmitter2])
], ApiService);
exports.ApiService = ApiService;
class CosmosClient extends cosmwasm_stargate_1.CosmWasmClient {
    constructor(tendermintClient, registry) {
        super(tendermintClient);
        this.tendermintClient = tendermintClient;
        this.registry = registry;
    }
    /*
    async chainId(): Promise<string> {
      return this.getChainId();
    }
  
    async finalisedHeight(): Promise<number> {
      return this.getHeight();
    }
    */
    async blockInfo(height) {
        return this.getBlock(height);
    }
    async txInfoByHeight(height) {
        return this.searchTx({ height: height });
    }
    async blockResults(height) {
        const blockRes = await this.tendermintClient.blockResults(height);
        return blockRes;
    }
    decodeMsg(msg) {
        try {
            const decodedMsg = this.registry.decode(msg);
            if ([
                '/cosmwasm.wasm.v1.MsgExecuteContract',
                '/cosmwasm.wasm.v1.MsgMigrateContract',
                '/cosmwasm.wasm.v1.MsgInstantiateContract',
            ].includes(msg.typeUrl)) {
                decodedMsg.msg = JSON.parse(new util_1.TextDecoder().decode(decodedMsg.msg));
            }
            return decodedMsg;
        }
        catch (e) {
            logger.error(e, 'Failed to decode message');
            throw e;
        }
    }
}
exports.CosmosClient = CosmosClient;
class CosmosSafeClient extends cosmwasm_stargate_1.CosmWasmClient {
    constructor(tmClient, height) {
        super(tmClient);
        this.height = height;
    }
    static async safeConnect(endpoint, height) {
        const keepAliveClient = new KeepAliveClient(endpoint);
        const tmClient = await tendermint_rpc_1.Tendermint34Client.create(keepAliveClient);
        return new CosmosSafeClient(tmClient, height);
    }
    async getBlock() {
        const response = await this.forceGetTmClient().block(this.height);
        return {
            id: (0, encoding_1.toHex)(response.blockId.hash).toUpperCase(),
            header: {
                version: {
                    block: new math_1.Uint53(response.block.header.version.block).toString(),
                    app: new math_1.Uint53(response.block.header.version.app).toString(),
                },
                height: response.block.header.height,
                chainId: response.block.header.chainId,
                time: (0, tendermint_rpc_1.toRfc3339WithNanoseconds)(response.block.header.time),
            },
            txs: response.block.txs,
        };
    }
    async searchTx() {
        const txs = await this.safeTxsQuery(`tx.height=${this.height}`);
        return txs;
    }
    async safeTxsQuery(query) {
        const results = await this.forceGetTmClient().txSearchAll({ query: query });
        return results.txs.map((tx) => {
            return {
                height: tx.height,
                hash: (0, encoding_1.toHex)(tx.hash).toUpperCase(),
                code: tx.result.code,
                rawLog: tx.result.log || '',
                tx: tx.tx,
                gasUsed: tx.result.gasUsed,
                gasWanted: tx.result.gasWanted,
            };
        });
    }
}
exports.CosmosSafeClient = CosmosSafeClient;
function hasProtocol(url) {
    return url.search('://') !== -1;
}
exports.hasProtocol = hasProtocol;
async function httpRequest(connection, request) {
    const { data } = await connection.post('/', request);
    return data;
}
exports.httpRequest = httpRequest;
class KeepAliveClient {
    constructor(endpoint) {
        if (typeof endpoint === 'string') {
            // accept host.name:port and assume http protocol
            this.url = hasProtocol(endpoint) ? endpoint : `http://${endpoint}`;
        }
        else {
            this.url = endpoint.url;
            this.headers = endpoint.headers;
        }
        const httpAgent = new http_1.default.Agent({ keepAlive: true, maxSockets: 10 });
        const httpsAgent = new https_1.default.Agent({ keepAlive: true, maxSockets: 10 });
        this.connection = axios_1.default.create({
            httpAgent,
            httpsAgent,
            baseURL: this.url,
            headers: this.headers,
        });
    }
    disconnect() {
        // nothing to be done
    }
    async execute(request) {
        const response = (0, json_rpc_1.parseJsonRpcResponse)(await httpRequest(this.connection, request));
        if ((0, json_rpc_1.isJsonRpcErrorResponse)(response)) {
            throw new Error(JSON.stringify(response.error));
        }
        return response;
    }
}
exports.KeepAliveClient = KeepAliveClient;
//# sourceMappingURL=api.service.js.map