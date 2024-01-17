import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
export interface Params {
  marketCreationFee: Coin[];
  fees: Fees;
  maxOrderLifespan: Duration;
  /** max_order_price_ratio defines the ratio of the maximum possible order price compared to the market's last price */
  maxOrderPriceRatio: string;
  maxSwapRoutesLen: number;
  maxNumMmOrders: number;
}
export interface ParamsProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.Params";
  value: Uint8Array;
}
export interface ParamsAmino {
  market_creation_fee: CoinAmino[];
  fees?: FeesAmino;
  max_order_lifespan?: DurationAmino;
  /** max_order_price_ratio defines the ratio of the maximum possible order price compared to the market's last price */
  max_order_price_ratio: string;
  max_swap_routes_len: number;
  max_num_mm_orders: number;
}
export interface ParamsAminoMsg {
  type: "/crescent.exchange.v1beta1.Params";
  value: ParamsAmino;
}
export interface ParamsSDKType {
  market_creation_fee: CoinSDKType[];
  fees: FeesSDKType;
  max_order_lifespan: DurationSDKType;
  max_order_price_ratio: string;
  max_swap_routes_len: number;
  max_num_mm_orders: number;
}
export interface Fees {
  defaultMakerFeeRate: string;
  defaultTakerFeeRate: string;
  defaultOrderSourceFeeRatio: string;
}
export interface FeesProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.Fees";
  value: Uint8Array;
}
export interface FeesAmino {
  default_maker_fee_rate: string;
  default_taker_fee_rate: string;
  default_order_source_fee_ratio: string;
}
export interface FeesAminoMsg {
  type: "/crescent.exchange.v1beta1.Fees";
  value: FeesAmino;
}
export interface FeesSDKType {
  default_maker_fee_rate: string;
  default_taker_fee_rate: string;
  default_order_source_fee_ratio: string;
}