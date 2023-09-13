import { Params, ParamsAmino, ParamsSDKType, LiquidFarm, LiquidFarmAmino, LiquidFarmSDKType } from "./params";
import { RewardsAuction, RewardsAuctionAmino, RewardsAuctionSDKType, Bid, BidAmino, BidSDKType } from "./liquidfarming";
import { Long } from "../../../helpers";
/** GenesisState defines the liquidfarming module's genesis state. */
export interface GenesisState {
  params: Params;
  lastRewardsAuctionIdRecord: LastRewardsAuctionIdRecord[];
  liquidFarms: LiquidFarm[];
  rewardsAuctions: RewardsAuction[];
  bids: Bid[];
  winningBidRecords: WinningBidRecord[];
  lastRewardsAuctionEndTime: Date;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the liquidfarming module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  last_rewards_auction_id_record: LastRewardsAuctionIdRecordAmino[];
  liquid_farms: LiquidFarmAmino[];
  rewards_auctions: RewardsAuctionAmino[];
  bids: BidAmino[];
  winning_bid_records: WinningBidRecordAmino[];
  last_rewards_auction_end_time?: Date;
}
export interface GenesisStateAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the liquidfarming module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  last_rewards_auction_id_record: LastRewardsAuctionIdRecordSDKType[];
  liquid_farms: LiquidFarmSDKType[];
  rewards_auctions: RewardsAuctionSDKType[];
  bids: BidSDKType[];
  winning_bid_records: WinningBidRecordSDKType[];
  last_rewards_auction_end_time: Date;
}
export interface LastRewardsAuctionIdRecord {
  poolId: Long;
  auctionId: Long;
}
export interface LastRewardsAuctionIdRecordProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.LastRewardsAuctionIdRecord";
  value: Uint8Array;
}
export interface LastRewardsAuctionIdRecordAmino {
  pool_id: string;
  auction_id: string;
}
export interface LastRewardsAuctionIdRecordAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.LastRewardsAuctionIdRecord";
  value: LastRewardsAuctionIdRecordAmino;
}
export interface LastRewardsAuctionIdRecordSDKType {
  pool_id: Long;
  auction_id: Long;
}
/**
 * WinningBidRecord defines a custom winning bid record that is required to be recorded
 * in genesis state.
 */
export interface WinningBidRecord {
  auctionId: Long;
  winningBid: Bid;
}
export interface WinningBidRecordProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.WinningBidRecord";
  value: Uint8Array;
}
/**
 * WinningBidRecord defines a custom winning bid record that is required to be recorded
 * in genesis state.
 */
export interface WinningBidRecordAmino {
  auction_id: string;
  winning_bid?: BidAmino;
}
export interface WinningBidRecordAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.WinningBidRecord";
  value: WinningBidRecordAmino;
}
/**
 * WinningBidRecord defines a custom winning bid record that is required to be recorded
 * in genesis state.
 */
export interface WinningBidRecordSDKType {
  auction_id: Long;
  winning_bid: BidSDKType;
}