import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { DecCoin, DecCoinAmino, DecCoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { SwapRouteResult, SwapRouteResultAmino, SwapRouteResultSDKType } from "./exchange";
import { Long } from "../../../helpers";
export interface MsgCreateMarket {
  sender: string;
  baseDenom: string;
  quoteDenom: string;
}
export interface MsgCreateMarketProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgCreateMarket";
  value: Uint8Array;
}
export interface MsgCreateMarketAmino {
  sender: string;
  base_denom: string;
  quote_denom: string;
}
export interface MsgCreateMarketAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgCreateMarket";
  value: MsgCreateMarketAmino;
}
export interface MsgCreateMarketSDKType {
  sender: string;
  base_denom: string;
  quote_denom: string;
}
export interface MsgCreateMarketResponse {
  marketId: Long;
}
export interface MsgCreateMarketResponseProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgCreateMarketResponse";
  value: Uint8Array;
}
export interface MsgCreateMarketResponseAmino {
  market_id: string;
}
export interface MsgCreateMarketResponseAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgCreateMarketResponse";
  value: MsgCreateMarketResponseAmino;
}
export interface MsgCreateMarketResponseSDKType {
  market_id: Long;
}
export interface MsgPlaceLimitOrder {
  sender: string;
  marketId: Long;
  isBuy: boolean;
  price: string;
  quantity: string;
  lifespan: Duration;
}
export interface MsgPlaceLimitOrderProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgPlaceLimitOrder";
  value: Uint8Array;
}
export interface MsgPlaceLimitOrderAmino {
  sender: string;
  market_id: string;
  is_buy: boolean;
  price: string;
  quantity: string;
  lifespan?: DurationAmino;
}
export interface MsgPlaceLimitOrderAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgPlaceLimitOrder";
  value: MsgPlaceLimitOrderAmino;
}
export interface MsgPlaceLimitOrderSDKType {
  sender: string;
  market_id: Long;
  is_buy: boolean;
  price: string;
  quantity: string;
  lifespan: DurationSDKType;
}
export interface MsgPlaceLimitOrderResponse {
  orderId: Long;
  executedQuantity: string;
  paid: DecCoin;
  received: DecCoin;
}
export interface MsgPlaceLimitOrderResponseProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgPlaceLimitOrderResponse";
  value: Uint8Array;
}
export interface MsgPlaceLimitOrderResponseAmino {
  order_id: string;
  executed_quantity: string;
  paid?: DecCoinAmino;
  received?: DecCoinAmino;
}
export interface MsgPlaceLimitOrderResponseAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgPlaceLimitOrderResponse";
  value: MsgPlaceLimitOrderResponseAmino;
}
export interface MsgPlaceLimitOrderResponseSDKType {
  order_id: Long;
  executed_quantity: string;
  paid: DecCoinSDKType;
  received: DecCoinSDKType;
}
export interface MsgPlaceBatchLimitOrder {
  sender: string;
  marketId: Long;
  isBuy: boolean;
  price: string;
  quantity: string;
  lifespan: Duration;
}
export interface MsgPlaceBatchLimitOrderProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgPlaceBatchLimitOrder";
  value: Uint8Array;
}
export interface MsgPlaceBatchLimitOrderAmino {
  sender: string;
  market_id: string;
  is_buy: boolean;
  price: string;
  quantity: string;
  lifespan?: DurationAmino;
}
export interface MsgPlaceBatchLimitOrderAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgPlaceBatchLimitOrder";
  value: MsgPlaceBatchLimitOrderAmino;
}
export interface MsgPlaceBatchLimitOrderSDKType {
  sender: string;
  market_id: Long;
  is_buy: boolean;
  price: string;
  quantity: string;
  lifespan: DurationSDKType;
}
export interface MsgPlaceBatchLimitOrderResponse {
  orderId: Long;
}
export interface MsgPlaceBatchLimitOrderResponseProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgPlaceBatchLimitOrderResponse";
  value: Uint8Array;
}
export interface MsgPlaceBatchLimitOrderResponseAmino {
  order_id: string;
}
export interface MsgPlaceBatchLimitOrderResponseAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgPlaceBatchLimitOrderResponse";
  value: MsgPlaceBatchLimitOrderResponseAmino;
}
export interface MsgPlaceBatchLimitOrderResponseSDKType {
  order_id: Long;
}
export interface MsgPlaceMMLimitOrder {
  sender: string;
  marketId: Long;
  isBuy: boolean;
  price: string;
  quantity: string;
  lifespan: Duration;
}
export interface MsgPlaceMMLimitOrderProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgPlaceMMLimitOrder";
  value: Uint8Array;
}
export interface MsgPlaceMMLimitOrderAmino {
  sender: string;
  market_id: string;
  is_buy: boolean;
  price: string;
  quantity: string;
  lifespan?: DurationAmino;
}
export interface MsgPlaceMMLimitOrderAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgPlaceMMLimitOrder";
  value: MsgPlaceMMLimitOrderAmino;
}
export interface MsgPlaceMMLimitOrderSDKType {
  sender: string;
  market_id: Long;
  is_buy: boolean;
  price: string;
  quantity: string;
  lifespan: DurationSDKType;
}
export interface MsgPlaceMMLimitOrderResponse {
  orderId: Long;
  executedQuantity: string;
  paid: DecCoin;
  received: DecCoin;
}
export interface MsgPlaceMMLimitOrderResponseProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgPlaceMMLimitOrderResponse";
  value: Uint8Array;
}
export interface MsgPlaceMMLimitOrderResponseAmino {
  order_id: string;
  executed_quantity: string;
  paid?: DecCoinAmino;
  received?: DecCoinAmino;
}
export interface MsgPlaceMMLimitOrderResponseAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgPlaceMMLimitOrderResponse";
  value: MsgPlaceMMLimitOrderResponseAmino;
}
export interface MsgPlaceMMLimitOrderResponseSDKType {
  order_id: Long;
  executed_quantity: string;
  paid: DecCoinSDKType;
  received: DecCoinSDKType;
}
export interface MsgPlaceMMBatchLimitOrder {
  sender: string;
  marketId: Long;
  isBuy: boolean;
  price: string;
  quantity: string;
  lifespan: Duration;
}
export interface MsgPlaceMMBatchLimitOrderProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgPlaceMMBatchLimitOrder";
  value: Uint8Array;
}
export interface MsgPlaceMMBatchLimitOrderAmino {
  sender: string;
  market_id: string;
  is_buy: boolean;
  price: string;
  quantity: string;
  lifespan?: DurationAmino;
}
export interface MsgPlaceMMBatchLimitOrderAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgPlaceMMBatchLimitOrder";
  value: MsgPlaceMMBatchLimitOrderAmino;
}
export interface MsgPlaceMMBatchLimitOrderSDKType {
  sender: string;
  market_id: Long;
  is_buy: boolean;
  price: string;
  quantity: string;
  lifespan: DurationSDKType;
}
export interface MsgPlaceMMBatchLimitOrderResponse {
  orderId: Long;
}
export interface MsgPlaceMMBatchLimitOrderResponseProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgPlaceMMBatchLimitOrderResponse";
  value: Uint8Array;
}
export interface MsgPlaceMMBatchLimitOrderResponseAmino {
  order_id: string;
}
export interface MsgPlaceMMBatchLimitOrderResponseAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgPlaceMMBatchLimitOrderResponse";
  value: MsgPlaceMMBatchLimitOrderResponseAmino;
}
export interface MsgPlaceMMBatchLimitOrderResponseSDKType {
  order_id: Long;
}
export interface MsgPlaceMarketOrder {
  sender: string;
  marketId: Long;
  isBuy: boolean;
  quantity: string;
}
export interface MsgPlaceMarketOrderProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgPlaceMarketOrder";
  value: Uint8Array;
}
export interface MsgPlaceMarketOrderAmino {
  sender: string;
  market_id: string;
  is_buy: boolean;
  quantity: string;
}
export interface MsgPlaceMarketOrderAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgPlaceMarketOrder";
  value: MsgPlaceMarketOrderAmino;
}
export interface MsgPlaceMarketOrderSDKType {
  sender: string;
  market_id: Long;
  is_buy: boolean;
  quantity: string;
}
export interface MsgPlaceMarketOrderResponse {
  orderId: Long;
  executedQuantity: string;
  paid: DecCoin;
  received: DecCoin;
}
export interface MsgPlaceMarketOrderResponseProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgPlaceMarketOrderResponse";
  value: Uint8Array;
}
export interface MsgPlaceMarketOrderResponseAmino {
  order_id: string;
  executed_quantity: string;
  paid?: DecCoinAmino;
  received?: DecCoinAmino;
}
export interface MsgPlaceMarketOrderResponseAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgPlaceMarketOrderResponse";
  value: MsgPlaceMarketOrderResponseAmino;
}
export interface MsgPlaceMarketOrderResponseSDKType {
  order_id: Long;
  executed_quantity: string;
  paid: DecCoinSDKType;
  received: DecCoinSDKType;
}
export interface MsgCancelOrder {
  sender: string;
  orderId: Long;
}
export interface MsgCancelOrderProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgCancelOrder";
  value: Uint8Array;
}
export interface MsgCancelOrderAmino {
  sender: string;
  order_id: string;
}
export interface MsgCancelOrderAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgCancelOrder";
  value: MsgCancelOrderAmino;
}
export interface MsgCancelOrderSDKType {
  sender: string;
  order_id: Long;
}
export interface MsgCancelOrderResponse {}
export interface MsgCancelOrderResponseProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgCancelOrderResponse";
  value: Uint8Array;
}
export interface MsgCancelOrderResponseAmino {}
export interface MsgCancelOrderResponseAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgCancelOrderResponse";
  value: MsgCancelOrderResponseAmino;
}
export interface MsgCancelOrderResponseSDKType {}
export interface MsgCancelAllOrders {
  sender: string;
  marketId: Long;
}
export interface MsgCancelAllOrdersProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgCancelAllOrders";
  value: Uint8Array;
}
export interface MsgCancelAllOrdersAmino {
  sender: string;
  market_id: string;
}
export interface MsgCancelAllOrdersAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgCancelAllOrders";
  value: MsgCancelAllOrdersAmino;
}
export interface MsgCancelAllOrdersSDKType {
  sender: string;
  market_id: Long;
}
export interface MsgCancelAllOrdersResponse {
  cancelledOrderIds: Long[];
}
export interface MsgCancelAllOrdersResponseProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgCancelAllOrdersResponse";
  value: Uint8Array;
}
export interface MsgCancelAllOrdersResponseAmino {
  cancelled_order_ids: string[];
}
export interface MsgCancelAllOrdersResponseAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgCancelAllOrdersResponse";
  value: MsgCancelAllOrdersResponseAmino;
}
export interface MsgCancelAllOrdersResponseSDKType {
  cancelled_order_ids: Long[];
}
export interface MsgSwapExactAmountIn {
  sender: string;
  routes: Long[];
  input: DecCoin;
  minOutput: DecCoin;
}
export interface MsgSwapExactAmountInProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgSwapExactAmountIn";
  value: Uint8Array;
}
export interface MsgSwapExactAmountInAmino {
  sender: string;
  routes: string[];
  input?: DecCoinAmino;
  min_output?: DecCoinAmino;
}
export interface MsgSwapExactAmountInAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgSwapExactAmountIn";
  value: MsgSwapExactAmountInAmino;
}
export interface MsgSwapExactAmountInSDKType {
  sender: string;
  routes: Long[];
  input: DecCoinSDKType;
  min_output: DecCoinSDKType;
}
export interface MsgSwapExactAmountInResponse {
  output: DecCoin;
  results: SwapRouteResult[];
}
export interface MsgSwapExactAmountInResponseProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MsgSwapExactAmountInResponse";
  value: Uint8Array;
}
export interface MsgSwapExactAmountInResponseAmino {
  output?: DecCoinAmino;
  results: SwapRouteResultAmino[];
}
export interface MsgSwapExactAmountInResponseAminoMsg {
  type: "/crescent.exchange.v1beta1.MsgSwapExactAmountInResponse";
  value: MsgSwapExactAmountInResponseAmino;
}
export interface MsgSwapExactAmountInResponseSDKType {
  output: DecCoinSDKType;
  results: SwapRouteResultSDKType[];
}