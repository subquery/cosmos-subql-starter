import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
/** Params defines the parameters for the module. */
export interface Params {
  rewardsAuctionDuration: Duration;
  maxNumRecentRewardsAuctions: number;
}
export interface ParamsProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  rewards_auction_duration?: DurationAmino;
  max_num_recent_rewards_auctions: number;
}
export interface ParamsAminoMsg {
  type: "/crescent.liquidamm.v1beta1.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  rewards_auction_duration: DurationSDKType;
  max_num_recent_rewards_auctions: number;
}