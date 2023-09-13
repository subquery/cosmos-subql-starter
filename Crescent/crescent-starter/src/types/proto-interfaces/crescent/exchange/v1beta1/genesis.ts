import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Order, OrderAmino, OrderSDKType, Market, MarketAmino, MarketSDKType, MarketState, MarketStateAmino, MarketStateSDKType } from "./exchange";
import { Long } from "../../../helpers";
export interface GenesisState {
  params: Params;
  lastMarketId: Long;
  lastOrderId: Long;
  marketRecords: MarketRecord[];
  orders: Order[];
  numMmOrdersRecords: NumMMOrdersRecord[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.GenesisState";
  value: Uint8Array;
}
export interface GenesisStateAmino {
  params?: ParamsAmino;
  last_market_id: string;
  last_order_id: string;
  market_records: MarketRecordAmino[];
  orders: OrderAmino[];
  num_mm_orders_records: NumMMOrdersRecordAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/crescent.exchange.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  last_market_id: Long;
  last_order_id: Long;
  market_records: MarketRecordSDKType[];
  orders: OrderSDKType[];
  num_mm_orders_records: NumMMOrdersRecordSDKType[];
}
export interface MarketRecord {
  market: Market;
  state: MarketState;
}
export interface MarketRecordProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MarketRecord";
  value: Uint8Array;
}
export interface MarketRecordAmino {
  market?: MarketAmino;
  state?: MarketStateAmino;
}
export interface MarketRecordAminoMsg {
  type: "/crescent.exchange.v1beta1.MarketRecord";
  value: MarketRecordAmino;
}
export interface MarketRecordSDKType {
  market: MarketSDKType;
  state: MarketStateSDKType;
}
export interface NumMMOrdersRecord {
  orderer: string;
  marketId: Long;
  numMmOrders: number;
}
export interface NumMMOrdersRecordProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.NumMMOrdersRecord";
  value: Uint8Array;
}
export interface NumMMOrdersRecordAmino {
  orderer: string;
  market_id: string;
  num_mm_orders: number;
}
export interface NumMMOrdersRecordAminoMsg {
  type: "/crescent.exchange.v1beta1.NumMMOrdersRecord";
  value: NumMMOrdersRecordAmino;
}
export interface NumMMOrdersRecordSDKType {
  orderer: string;
  market_id: Long;
  num_mm_orders: number;
}