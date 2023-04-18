import type { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import type { Registry } from '@cosmjs/proto-signing';
import type Pino from 'pino';
import { Store, DynamicDatasourceCreator } from './interfaces';
declare global {
    const apiUnsafe: CosmWasmClient;
    const api: CosmWasmClient;
    const logger: Pino.Logger;
    const store: Store;
    const createDynamicDatasource: DynamicDatasourceCreator;
    const registry: Registry;
}
