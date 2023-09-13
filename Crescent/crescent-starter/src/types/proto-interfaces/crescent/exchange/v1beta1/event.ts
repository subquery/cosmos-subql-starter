import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { DecCoin, DecCoinAmino, DecCoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { SwapRouteResult, SwapRouteResultAmino, SwapRouteResultSDKType } from "./exchange";
import { Long } from "../../../helpers";
export interface EventCreateMarket {
  creator: string;
  baseDenom: string;
  quoteDenom: string;
  marketId: Long;
}
export interface EventCreateMarketProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.EventCreateMarket";
  value: Uint8Array;
}
export interface EventCreateMarketAmino {
  creator: string;
  base_denom: string;
  quote_denom: string;
  market_id: string;
}
export interface EventCreateMarketAminoMsg {
  type: "/crescent.exchange.v1beta1.EventCreateMarket";
  value: EventCreateMarketAmino;
}
export interface EventCreateMarketSDKType {
  creator: string;
  base_denom: string;
  quote_denom: string;
  market_id: Long;
}
export interface EventPlaceLimitOrder {
  marketId: Long;
  orderId: Long;
  orderer: string;
  isBuy: boolean;
  price: string;
  quantity: string;
  lifespan: Duration;
  deadline: Date;
  executedQuantity: string;
  paid: DecCoin;
  received: DecCoin;
}
export interface EventPlaceLimitOrderProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.EventPlaceLimitOrder";
  value: Uint8Array;
}
export interface EventPlaceLimitOrderAmino {
  market_id: string;
  order_id: string;
  orderer: string;
  is_buy: boolean;
  price: string;
  quantity: string;
  lifespan?: DurationAmino;
  deadline?: Date;
  executed_quantity: string;
  paid?: DecCoinAmino;
  received?: DecCoinAmino;
}
export interface EventPlaceLimitOrderAminoMsg {
  type: "/crescent.exchange.v1beta1.EventPlaceLimitOrder";
  value: EventPlaceLimitOrderAmino;
}
export interface EventPlaceLimitOrderSDKType {
  market_id: Long;
  order_id: Long;
  orderer: string;
  is_buy: boolean;
  price: string;
  quantity: string;
  lifespan: DurationSDKType;
  deadline: Date;
  executed_quantity: string;
  paid: DecCoinSDKType;
  received: DecCoinSDKType;
}
export interface EventPlaceBatchLimitOrder {
  marketId: Long;
  orderId: Long;
  orderer: string;
  isBuy: boolean;
  price: string;
  quantity: string;
  lifespan: Duration;
  deadline: Date;
}
export interface EventPlaceBatchLimitOrderProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.EventPlaceBatchLimitOrder";
  value: Uint8Array;
}
export interface EventPlaceBatchLimitOrderAmino {
  market_id: string;
  order_id: string;
  orderer: string;
  is_buy: boolean;
  price: string;
  quantity: string;
  lifespan?: DurationAmino;
  deadline?: Date;
}
export interface EventPlaceBatchLimitOrderAminoMsg {
  type: "/crescent.exchange.v1beta1.EventPlaceBatchLimitOrder";
  value: EventPlaceBatchLimitOrderAmino;
}
export interface EventPlaceBatchLimitOrderSDKType {
  market_id: Long;
  order_id: Long;
  orderer: string;
  is_buy: boolean;
  price: string;
  quantity: string;
  lifespan: DurationSDKType;
  deadline: Date;
}
export interface EventPlaceMMLimitOrder {
  marketId: Long;
  orderId: Long;
  orderer: string;
  isBuy: boolean;
  price: string;
  quantity: string;
  lifespan: Duration;
  deadline: Date;
  executedQuantity: string;
  paid: DecCoin;
  received: DecCoin;
}
export interface EventPlaceMMLimitOrderProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.EventPlaceMMLimitOrder";
  value: Uint8Array;
}
export interface EventPlaceMMLimitOrderAmino {
  market_id: string;
  order_id: string;
  orderer: string;
  is_buy: boolean;
  price: string;
  quantity: string;
  lifespan?: DurationAmino;
  deadline?: Date;
  executed_quantity: string;
  paid?: DecCoinAmino;
  received?: DecCoinAmino;
}
export interface EventPlaceMMLimitOrderAminoMsg {
  type: "/crescent.exchange.v1beta1.EventPlaceMMLimitOrder";
  value: EventPlaceMMLimitOrderAmino;
}
export interface EventPlaceMMLimitOrderSDKType {
  market_id: Long;
  order_id: Long;
  orderer: string;
  is_buy: boolean;
  price: string;
  quantity: string;
  lifespan: DurationSDKType;
  deadline: Date;
  executed_quantity: string;
  paid: DecCoinSDKType;
  received: DecCoinSDKType;
}
export interface EventPlaceMMBatchLimitOrder {
  marketId: Long;
  orderId: Long;
  orderer: string;
  isBuy: boolean;
  price: string;
  quantity: string;
  lifespan: Duration;
  deadline: Date;
}
export interface EventPlaceMMBatchLimitOrderProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.EventPlaceMMBatchLimitOrder";
  value: Uint8Array;
}
export interface EventPlaceMMBatchLimitOrderAmino {
  market_id: string;
  order_id: string;
  orderer: string;
  is_buy: boolean;
  price: string;
  quantity: string;
  lifespan?: DurationAmino;
  deadline?: Date;
}
export interface EventPlaceMMBatchLimitOrderAminoMsg {
  type: "/crescent.exchange.v1beta1.EventPlaceMMBatchLimitOrder";
  value: EventPlaceMMBatchLimitOrderAmino;
}
export interface EventPlaceMMBatchLimitOrderSDKType {
  market_id: Long;
  order_id: Long;
  orderer: string;
  is_buy: boolean;
  price: string;
  quantity: string;
  lifespan: DurationSDKType;
  deadline: Date;
}
export interface EventPlaceMarketOrder {
  marketId: Long;
  orderId: Long;
  orderer: string;
  isBuy: boolean;
  quantity: string;
  executedQuantity: string;
  paid: DecCoin;
  received: DecCoin;
}
export interface EventPlaceMarketOrderProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.EventPlaceMarketOrder";
  value: Uint8Array;
}
export interface EventPlaceMarketOrderAmino {
  market_id: string;
  order_id: string;
  orderer: string;
  is_buy: boolean;
  quantity: string;
  executed_quantity: string;
  paid?: DecCoinAmino;
  received?: DecCoinAmino;
}
export interface EventPlaceMarketOrderAminoMsg {
  type: "/crescent.exchange.v1beta1.EventPlaceMarketOrder";
  value: EventPlaceMarketOrderAmino;
}
export interface EventPlaceMarketOrderSDKType {
  market_id: Long;
  order_id: Long;
  orderer: string;
  is_buy: boolean;
  quantity: string;
  executed_quantity: string;
  paid: DecCoinSDKType;
  received: DecCoinSDKType;
}
export interface EventCancelOrder {
  orderer: string;
  orderId: Long;
}
export interface EventCancelOrderProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.EventCancelOrder";
  value: Uint8Array;
}
export interface EventCancelOrderAmino {
  orderer: string;
  order_id: string;
}
export interface EventCancelOrderAminoMsg {
  type: "/crescent.exchange.v1beta1.EventCancelOrder";
  value: EventCancelOrderAmino;
}
export interface EventCancelOrderSDKType {
  orderer: string;
  order_id: Long;
}
export interface EventCancelAllOrders {
  orderer: string;
  marketId: Long;
  cancelledOrderIds: Long[];
}
export interface EventCancelAllOrdersProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.EventCancelAllOrders";
  value: Uint8Array;
}
export interface EventCancelAllOrdersAmino {
  orderer: string;
  market_id: string;
  cancelled_order_ids: string[];
}
export interface EventCancelAllOrdersAminoMsg {
  type: "/crescent.exchange.v1beta1.EventCancelAllOrders";
  value: EventCancelAllOrdersAmino;
}
export interface EventCancelAllOrdersSDKType {
  orderer: string;
  market_id: Long;
  cancelled_order_ids: Long[];
}
export interface EventSwapExactAmountIn {
  orderer: string;
  routes: Long[];
  input: DecCoin;
  output: DecCoin;
  results: SwapRouteResult[];
}
export interface EventSwapExactAmountInProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.EventSwapExactAmountIn";
  value: Uint8Array;
}
export interface EventSwapExactAmountInAmino {
  orderer: string;
  routes: string[];
  input?: DecCoinAmino;
  output?: DecCoinAmino;
  results: SwapRouteResultAmino[];
}
export interface EventSwapExactAmountInAminoMsg {
  type: "/crescent.exchange.v1beta1.EventSwapExactAmountIn";
  value: EventSwapExactAmountInAmino;
}
export interface EventSwapExactAmountInSDKType {
  orderer: string;
  routes: Long[];
  input: DecCoinSDKType;
  output: DecCoinSDKType;
  results: SwapRouteResultSDKType[];
}
export interface EventOrderFilled {
  marketId: Long;
  orderId: Long;
  orderer: string;
  isBuy: boolean;
  price: string;
  quantity: string;
  openQuantity: string;
  executedQuantity: string;
  paid: DecCoin;
  received: DecCoin;
}
export interface EventOrderFilledProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.EventOrderFilled";
  value: Uint8Array;
}
export interface EventOrderFilledAmino {
  market_id: string;
  order_id: string;
  orderer: string;
  is_buy: boolean;
  price: string;
  quantity: string;
  open_quantity: string;
  executed_quantity: string;
  paid?: DecCoinAmino;
  received?: DecCoinAmino;
}
export interface EventOrderFilledAminoMsg {
  type: "/crescent.exchange.v1beta1.EventOrderFilled";
  value: EventOrderFilledAmino;
}
export interface EventOrderFilledSDKType {
  market_id: Long;
  order_id: Long;
  orderer: string;
  is_buy: boolean;
  price: string;
  quantity: string;
  open_quantity: string;
  executed_quantity: string;
  paid: DecCoinSDKType;
  received: DecCoinSDKType;
}
export interface EventOrderSourceOrdersFilled {
  marketId: Long;
  sourceName: string;
  orderer: string;
  isBuy: boolean;
  executedQuantity: string;
  paid: DecCoin;
  received: DecCoin;
}
export interface EventOrderSourceOrdersFilledProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.EventOrderSourceOrdersFilled";
  value: Uint8Array;
}
export interface EventOrderSourceOrdersFilledAmino {
  market_id: string;
  source_name: string;
  orderer: string;
  is_buy: boolean;
  executed_quantity: string;
  paid?: DecCoinAmino;
  received?: DecCoinAmino;
}
export interface EventOrderSourceOrdersFilledAminoMsg {
  type: "/crescent.exchange.v1beta1.EventOrderSourceOrdersFilled";
  value: EventOrderSourceOrdersFilledAmino;
}
export interface EventOrderSourceOrdersFilledSDKType {
  market_id: Long;
  source_name: string;
  orderer: string;
  is_buy: boolean;
  executed_quantity: string;
  paid: DecCoinSDKType;
  received: DecCoinSDKType;
}
export interface EventOrderCompleted {
  orderId: Long;
}
export interface EventOrderCompletedProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.EventOrderCompleted";
  value: Uint8Array;
}
export interface EventOrderCompletedAmino {
  order_id: string;
}
export interface EventOrderCompletedAminoMsg {
  type: "/crescent.exchange.v1beta1.EventOrderCompleted";
  value: EventOrderCompletedAmino;
}
export interface EventOrderCompletedSDKType {
  order_id: Long;
}
export interface EventOrderExpired {
  orderId: Long;
}
export interface EventOrderExpiredProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.EventOrderExpired";
  value: Uint8Array;
}
export interface EventOrderExpiredAmino {
  order_id: string;
}
export interface EventOrderExpiredAminoMsg {
  type: "/crescent.exchange.v1beta1.EventOrderExpired";
  value: EventOrderExpiredAmino;
}
export interface EventOrderExpiredSDKType {
  order_id: Long;
}
export interface EventMarketParameterChanged {
  marketId: Long;
  makerFeeRate: string;
  takerFeeRate: string;
  orderSourceFeeRatio: string;
}
export interface EventMarketParameterChangedProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.EventMarketParameterChanged";
  value: Uint8Array;
}
export interface EventMarketParameterChangedAmino {
  market_id: string;
  maker_fee_rate: string;
  taker_fee_rate: string;
  order_source_fee_ratio: string;
}
export interface EventMarketParameterChangedAminoMsg {
  type: "/crescent.exchange.v1beta1.EventMarketParameterChanged";
  value: EventMarketParameterChangedAmino;
}
export interface EventMarketParameterChangedSDKType {
  market_id: Long;
  maker_fee_rate: string;
  taker_fee_rate: string;
  order_source_fee_ratio: string;
}