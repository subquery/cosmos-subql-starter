import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
export interface Params {
  poolCreationFee: Coin[];
  defaultTickSpacing: number;
  defaultMinOrderQuantity: string;
  defaultMinOrderQuote: string;
  privateFarmingPlanCreationFee: Coin[];
  maxNumPrivateFarmingPlans: number;
  maxFarmingBlockTime: Duration;
}
export interface ParamsProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.Params";
  value: Uint8Array;
}
export interface ParamsAmino {
  pool_creation_fee: CoinAmino[];
  default_tick_spacing: number;
  default_min_order_quantity: string;
  default_min_order_quote: string;
  private_farming_plan_creation_fee: CoinAmino[];
  max_num_private_farming_plans: number;
  max_farming_block_time?: DurationAmino;
}
export interface ParamsAminoMsg {
  type: "/crescent.amm.v1beta1.Params";
  value: ParamsAmino;
}
export interface ParamsSDKType {
  pool_creation_fee: CoinSDKType[];
  default_tick_spacing: number;
  default_min_order_quantity: string;
  default_min_order_quote: string;
  private_farming_plan_creation_fee: CoinSDKType[];
  max_num_private_farming_plans: number;
  max_farming_block_time: DurationSDKType;
}