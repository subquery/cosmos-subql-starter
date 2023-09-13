import { Params, ParamsAmino, ParamsSDKType, Pair, PairAmino, PairSDKType, Pool, PoolAmino, PoolSDKType, DepositRequest, DepositRequestAmino, DepositRequestSDKType, WithdrawRequest, WithdrawRequestAmino, WithdrawRequestSDKType, Order, OrderAmino, OrderSDKType } from "./liquidity";
import { Long } from "../../../helpers";
/** GenesisState defines the liquidity module's genesis state. */
export interface GenesisState {
  params: Params;
  lastPairId: Long;
  lastPoolId: Long;
  pairs: Pair[];
  pools: Pool[];
  depositRequests: DepositRequest[];
  withdrawRequests: WithdrawRequest[];
  orders: Order[];
  numMarketMakingOrdersRecords: NumMMOrdersRecord[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the liquidity module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  last_pair_id: string;
  last_pool_id: string;
  pairs: PairAmino[];
  pools: PoolAmino[];
  deposit_requests: DepositRequestAmino[];
  withdraw_requests: WithdrawRequestAmino[];
  orders: OrderAmino[];
  num_market_making_orders_records: NumMMOrdersRecordAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/crescent.liquidity.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the liquidity module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  last_pair_id: Long;
  last_pool_id: Long;
  pairs: PairSDKType[];
  pools: PoolSDKType[];
  deposit_requests: DepositRequestSDKType[];
  withdraw_requests: WithdrawRequestSDKType[];
  orders: OrderSDKType[];
  num_market_making_orders_records: NumMMOrdersRecordSDKType[];
}
/**
 * NumMMOrdersRecord holds information about how many MM orders an orderer
 * ordered per pair.
 */
export interface NumMMOrdersRecord {
  orderer: string;
  pairId: Long;
  numMarketMakingOrders: number;
}
export interface NumMMOrdersRecordProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.NumMMOrdersRecord";
  value: Uint8Array;
}
/**
 * NumMMOrdersRecord holds information about how many MM orders an orderer
 * ordered per pair.
 */
export interface NumMMOrdersRecordAmino {
  orderer: string;
  pair_id: string;
  num_market_making_orders: number;
}
export interface NumMMOrdersRecordAminoMsg {
  type: "/crescent.liquidity.v1beta1.NumMMOrdersRecord";
  value: NumMMOrdersRecordAmino;
}
/**
 * NumMMOrdersRecord holds information about how many MM orders an orderer
 * ordered per pair.
 */
export interface NumMMOrdersRecordSDKType {
  orderer: string;
  pair_id: Long;
  num_market_making_orders: number;
}