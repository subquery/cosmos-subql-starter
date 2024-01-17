import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { PublicPosition, PublicPositionAmino, PublicPositionSDKType, RewardsAuction, RewardsAuctionAmino, RewardsAuctionSDKType, Bid, BidAmino, BidSDKType } from "./liquidamm";
import { Long } from "../../../helpers";
/** GenesisState defines the module's genesis state. */
export interface GenesisState {
  params: Params;
  lastPublicPositionId: Long;
  publicPositions: PublicPosition[];
  rewardsAuctions: RewardsAuction[];
  bids: Bid[];
  nextRewardsAuctionEndTime: Date;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  last_public_position_id: string;
  public_positions: PublicPositionAmino[];
  rewards_auctions: RewardsAuctionAmino[];
  bids: BidAmino[];
  next_rewards_auction_end_time?: Date;
}
export interface GenesisStateAminoMsg {
  type: "/crescent.liquidamm.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  last_public_position_id: Long;
  public_positions: PublicPositionSDKType[];
  rewards_auctions: RewardsAuctionSDKType[];
  bids: BidSDKType[];
  next_rewards_auction_end_time: Date;
}