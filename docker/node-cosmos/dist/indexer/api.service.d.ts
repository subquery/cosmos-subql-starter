import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { JsonRpcRequest, JsonRpcSuccessResponse } from '@cosmjs/json-rpc';
import { DecodeObject, GeneratedType, Registry } from '@cosmjs/proto-signing';
import { Block, IndexedTx } from '@cosmjs/stargate';
import { HttpEndpoint, Tendermint34Client, BlockResultsResponse } from '@cosmjs/tendermint-rpc';
import { AxiosInstance } from 'axios';
import { EventEmitter2 } from 'eventemitter2';
import { CosmosProjectNetConfig, SubqueryProject } from '../configure/SubqueryProject';
import { DsProcessorService } from './ds-processor.service';
import { NetworkMetadataPayload } from './events';
export declare class ApiService {
    protected project: SubqueryProject;
    private eventEmitter;
    private api;
    networkMeta: NetworkMetadataPayload;
    dsProcessor: DsProcessorService;
    registry: Registry;
    constructor(project: SubqueryProject, eventEmitter: EventEmitter2);
    init(): Promise<ApiService>;
    getApi(): CosmosClient;
    getSafeApi(height: number): Promise<CosmosSafeClient>;
    getChainType(network: Partial<CosmosProjectNetConfig>): Promise<Record<string, GeneratedType>>;
}
export declare class CosmosClient extends CosmWasmClient {
    private readonly tendermintClient;
    private registry;
    constructor(tendermintClient: Tendermint34Client, registry: Registry);
    blockInfo(height?: number): Promise<Block>;
    txInfoByHeight(height: number): Promise<readonly IndexedTx[]>;
    blockResults(height: number): Promise<BlockResultsResponse>;
    decodeMsg<T = unknown>(msg: DecodeObject): T;
}
export declare class CosmosSafeClient extends CosmWasmClient {
    height: number;
    static safeConnect(endpoint: string | HttpEndpoint, height: number): Promise<CosmosSafeClient>;
    constructor(tmClient: Tendermint34Client | undefined, height: number);
    getBlock(): Promise<Block>;
    searchTx(): Promise<readonly IndexedTx[]>;
    private safeTxsQuery;
}
export interface RpcClient {
    readonly execute: (request: JsonRpcRequest) => Promise<JsonRpcSuccessResponse>;
    readonly disconnect: () => void;
}
export declare function hasProtocol(url: string): boolean;
export declare function httpRequest(connection: AxiosInstance, request?: any): Promise<any>;
export declare class KeepAliveClient implements RpcClient {
    protected readonly url: string;
    protected readonly headers: Record<string, string> | undefined;
    connection: AxiosInstance;
    constructor(endpoint: string | HttpEndpoint);
    disconnect(): void;
    execute(request: JsonRpcRequest): Promise<JsonRpcSuccessResponse>;
}
