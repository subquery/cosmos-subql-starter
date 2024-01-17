import { DecCoin, DecCoinAmino, DecCoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
export enum OrderType {
  ORDER_TYPE_UNSPECIFIED = 0,
  ORDER_TYPE_LIMIT = 1,
  ORDER_TYPE_MM = 2,
  UNRECOGNIZED = -1,
}
export const OrderTypeSDKType = OrderType;
export const OrderTypeAmino = OrderType;
export function orderTypeFromJSON(object: any): OrderType {
  switch (object) {
    case 0:
    case "ORDER_TYPE_UNSPECIFIED":
      return OrderType.ORDER_TYPE_UNSPECIFIED;
    case 1:
    case "ORDER_TYPE_LIMIT":
      return OrderType.ORDER_TYPE_LIMIT;
    case 2:
    case "ORDER_TYPE_MM":
      return OrderType.ORDER_TYPE_MM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrderType.UNRECOGNIZED;
  }
}
export function orderTypeToJSON(object: OrderType): string {
  switch (object) {
    case OrderType.ORDER_TYPE_UNSPECIFIED:
      return "ORDER_TYPE_UNSPECIFIED";
    case OrderType.ORDER_TYPE_LIMIT:
      return "ORDER_TYPE_LIMIT";
    case OrderType.ORDER_TYPE_MM:
      return "ORDER_TYPE_MM";
    case OrderType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface Market {
  id: Long;
  baseDenom: string;
  quoteDenom: string;
  escrowAddress: string;
  makerFeeRate: string;
  takerFeeRate: string;
  orderSourceFeeRatio: string;
}
export interface MarketProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.Market";
  value: Uint8Array;
}
export interface MarketAmino {
  id: string;
  base_denom: string;
  quote_denom: string;
  escrow_address: string;
  maker_fee_rate: string;
  taker_fee_rate: string;
  order_source_fee_ratio: string;
}
export interface MarketAminoMsg {
  type: "/crescent.exchange.v1beta1.Market";
  value: MarketAmino;
}
export interface MarketSDKType {
  id: Long;
  base_denom: string;
  quote_denom: string;
  escrow_address: string;
  maker_fee_rate: string;
  taker_fee_rate: string;
  order_source_fee_ratio: string;
}
export interface MarketState {
  lastPrice: string;
  lastMatchingHeight: Long;
}
export interface MarketStateProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MarketState";
  value: Uint8Array;
}
export interface MarketStateAmino {
  last_price: string;
  last_matching_height: string;
}
export interface MarketStateAminoMsg {
  type: "/crescent.exchange.v1beta1.MarketState";
  value: MarketStateAmino;
}
export interface MarketStateSDKType {
  last_price: string;
  last_matching_height: Long;
}
export interface Order {
  id: Long;
  type: OrderType;
  orderer: string;
  marketId: Long;
  isBuy: boolean;
  price: string;
  quantity: string;
  msgHeight: Long;
  openQuantity: string;
  remainingDeposit: string;
  deadline: Date;
}
export interface OrderProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.Order";
  value: Uint8Array;
}
export interface OrderAmino {
  id: string;
  type: OrderType;
  orderer: string;
  market_id: string;
  is_buy: boolean;
  price: string;
  quantity: string;
  msg_height: string;
  open_quantity: string;
  remaining_deposit: string;
  deadline?: Date;
}
export interface OrderAminoMsg {
  type: "/crescent.exchange.v1beta1.Order";
  value: OrderAmino;
}
export interface OrderSDKType {
  id: Long;
  type: OrderType;
  orderer: string;
  market_id: Long;
  is_buy: boolean;
  price: string;
  quantity: string;
  msg_height: Long;
  open_quantity: string;
  remaining_deposit: string;
  deadline: Date;
}
export interface SwapRouteResult {
  marketId: Long;
  executedQuantity: string;
  input: DecCoin;
  output: DecCoin;
  fee: DecCoin;
}
export interface SwapRouteResultProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.SwapRouteResult";
  value: Uint8Array;
}
export interface SwapRouteResultAmino {
  market_id: string;
  executed_quantity: string;
  input?: DecCoinAmino;
  output?: DecCoinAmino;
  fee?: DecCoinAmino;
}
export interface SwapRouteResultAminoMsg {
  type: "/crescent.exchange.v1beta1.SwapRouteResult";
  value: SwapRouteResultAmino;
}
export interface SwapRouteResultSDKType {
  market_id: Long;
  executed_quantity: string;
  input: DecCoinSDKType;
  output: DecCoinSDKType;
  fee: DecCoinSDKType;
}