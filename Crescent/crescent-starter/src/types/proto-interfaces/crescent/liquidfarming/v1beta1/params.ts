import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { Long } from "../../../helpers";
/** Params defines the parameters for the module. */
export interface Params {
  feeCollector: string;
  rewardsAuctionDuration: Duration;
  liquidFarms: LiquidFarm[];
}
export interface ParamsProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  fee_collector: string;
  rewards_auction_duration?: DurationAmino;
  liquid_farms: LiquidFarmAmino[];
}
export interface ParamsAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  fee_collector: string;
  rewards_auction_duration: DurationSDKType;
  liquid_farms: LiquidFarmSDKType[];
}
/**
 * LiquidFarm defines liquid farm object that provides auto compounding functionality
 * for the liquidity pool and undergoes farming rewards auction process.
 * See the technical spec for more detailed information.
 */
export interface LiquidFarm {
  poolId: Long;
  minFarmAmount: string;
  minBidAmount: string;
  feeRate: string;
}
export interface LiquidFarmProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.LiquidFarm";
  value: Uint8Array;
}
/**
 * LiquidFarm defines liquid farm object that provides auto compounding functionality
 * for the liquidity pool and undergoes farming rewards auction process.
 * See the technical spec for more detailed information.
 */
export interface LiquidFarmAmino {
  pool_id: string;
  min_farm_amount: string;
  min_bid_amount: string;
  fee_rate: string;
}
export interface LiquidFarmAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.LiquidFarm";
  value: LiquidFarmAmino;
}
/**
 * LiquidFarm defines liquid farm object that provides auto compounding functionality
 * for the liquidity pool and undergoes farming rewards auction process.
 * See the technical spec for more detailed information.
 */
export interface LiquidFarmSDKType {
  pool_id: Long;
  min_farm_amount: string;
  min_bid_amount: string;
  fee_rate: string;
}