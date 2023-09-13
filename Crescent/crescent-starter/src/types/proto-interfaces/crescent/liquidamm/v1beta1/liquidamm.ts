import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
/** AuctionStatus enumerates the valid status of an auction. */
export enum AuctionStatus {
  /** AUCTION_STATUS_UNSPECIFIED - AUCTION_STATUS_UNSPECIFIED defines the default auction status */
  AUCTION_STATUS_UNSPECIFIED = 0,
  /** AUCTION_STATUS_STARTED - AUCTION_STATUS_STARTED defines the started auction status */
  AUCTION_STATUS_STARTED = 1,
  /** AUCTION_STATUS_FINISHED - AUCTION_STATUS_FINISHED defines the finished auction status */
  AUCTION_STATUS_FINISHED = 2,
  /** AUCTION_STATUS_SKIPPED - AUCTION_STATUS_SKIPPED defines the skipped auction status */
  AUCTION_STATUS_SKIPPED = 3,
  UNRECOGNIZED = -1,
}
export const AuctionStatusSDKType = AuctionStatus;
export const AuctionStatusAmino = AuctionStatus;
export function auctionStatusFromJSON(object: any): AuctionStatus {
  switch (object) {
    case 0:
    case "AUCTION_STATUS_UNSPECIFIED":
      return AuctionStatus.AUCTION_STATUS_UNSPECIFIED;
    case 1:
    case "AUCTION_STATUS_STARTED":
      return AuctionStatus.AUCTION_STATUS_STARTED;
    case 2:
    case "AUCTION_STATUS_FINISHED":
      return AuctionStatus.AUCTION_STATUS_FINISHED;
    case 3:
    case "AUCTION_STATUS_SKIPPED":
      return AuctionStatus.AUCTION_STATUS_SKIPPED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AuctionStatus.UNRECOGNIZED;
  }
}
export function auctionStatusToJSON(object: AuctionStatus): string {
  switch (object) {
    case AuctionStatus.AUCTION_STATUS_UNSPECIFIED:
      return "AUCTION_STATUS_UNSPECIFIED";
    case AuctionStatus.AUCTION_STATUS_STARTED:
      return "AUCTION_STATUS_STARTED";
    case AuctionStatus.AUCTION_STATUS_FINISHED:
      return "AUCTION_STATUS_FINISHED";
    case AuctionStatus.AUCTION_STATUS_SKIPPED:
      return "AUCTION_STATUS_SKIPPED";
    case AuctionStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * PublicPosition defines public position object that provides auto compounding functionality
 * for the amm position and undergoes rewards auction process.
 * See the technical spec for more detailed information.
 */
export interface PublicPosition {
  id: Long;
  poolId: Long;
  lowerTick: number;
  upperTick: number;
  /** bid_reserve_address specifies the account that reserves bidding amounts placed by bidders */
  bidReserveAddress: string;
  minBidAmount: string;
  feeRate: string;
  lastRewardsAuctionId: Long;
}
export interface PublicPositionProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.PublicPosition";
  value: Uint8Array;
}
/**
 * PublicPosition defines public position object that provides auto compounding functionality
 * for the amm position and undergoes rewards auction process.
 * See the technical spec for more detailed information.
 */
export interface PublicPositionAmino {
  id: string;
  pool_id: string;
  lower_tick: number;
  upper_tick: number;
  /** bid_reserve_address specifies the account that reserves bidding amounts placed by bidders */
  bid_reserve_address: string;
  min_bid_amount: string;
  fee_rate: string;
  last_rewards_auction_id: string;
}
export interface PublicPositionAminoMsg {
  type: "/crescent.liquidamm.v1beta1.PublicPosition";
  value: PublicPositionAmino;
}
/**
 * PublicPosition defines public position object that provides auto compounding functionality
 * for the amm position and undergoes rewards auction process.
 * See the technical spec for more detailed information.
 */
export interface PublicPositionSDKType {
  id: Long;
  pool_id: Long;
  lower_tick: number;
  upper_tick: number;
  bid_reserve_address: string;
  min_bid_amount: string;
  fee_rate: string;
  last_rewards_auction_id: Long;
}
/**
 * RewardsAuction defines rewards auction that is created by the module
 * for every rewards_auction_duration in params.
 */
export interface RewardsAuction {
  /** public_position_id specifies the public position's id. */
  publicPositionId: Long;
  /** id specifies the unique auction id in the public position */
  id: Long;
  /** start_time specifies the start time of an auction */
  startTime: Date;
  /** end_time specifies the end time of an auction */
  endTime: Date;
  /** status specifies the status of an auction */
  status: AuctionStatus;
  /** winning_bid specifies the winning bid */
  winningBid: Bid;
  /**
   * rewards specifies the rewards the winning bidder has received
   * the value is determined when an auction is finished
   */
  rewards: Coin[];
  fees: Coin[];
}
export interface RewardsAuctionProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.RewardsAuction";
  value: Uint8Array;
}
/**
 * RewardsAuction defines rewards auction that is created by the module
 * for every rewards_auction_duration in params.
 */
export interface RewardsAuctionAmino {
  /** public_position_id specifies the public position's id. */
  public_position_id: string;
  /** id specifies the unique auction id in the public position */
  id: string;
  /** start_time specifies the start time of an auction */
  start_time?: Date;
  /** end_time specifies the end time of an auction */
  end_time?: Date;
  /** status specifies the status of an auction */
  status: AuctionStatus;
  /** winning_bid specifies the winning bid */
  winning_bid?: BidAmino;
  /**
   * rewards specifies the rewards the winning bidder has received
   * the value is determined when an auction is finished
   */
  rewards: CoinAmino[];
  fees: CoinAmino[];
}
export interface RewardsAuctionAminoMsg {
  type: "/crescent.liquidamm.v1beta1.RewardsAuction";
  value: RewardsAuctionAmino;
}
/**
 * RewardsAuction defines rewards auction that is created by the module
 * for every rewards_auction_duration in params.
 */
export interface RewardsAuctionSDKType {
  public_position_id: Long;
  id: Long;
  start_time: Date;
  end_time: Date;
  status: AuctionStatus;
  winning_bid: BidSDKType;
  rewards: CoinSDKType[];
  fees: CoinSDKType[];
}
/** Bid defines standard bid for a rewards auction. */
export interface Bid {
  /** public_position_id specifies the public position's id */
  publicPositionId: Long;
  /** rewards_auction_id specifies the reward auction's id */
  rewardsAuctionId: Long;
  /** bidder specifies the bech32-encoded address that places a bid for the auction */
  bidder: string;
  /** share specifies the share amount to place a bid */
  share: Coin;
}
export interface BidProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.Bid";
  value: Uint8Array;
}
/** Bid defines standard bid for a rewards auction. */
export interface BidAmino {
  /** public_position_id specifies the public position's id */
  public_position_id: string;
  /** rewards_auction_id specifies the reward auction's id */
  rewards_auction_id: string;
  /** bidder specifies the bech32-encoded address that places a bid for the auction */
  bidder: string;
  /** share specifies the share amount to place a bid */
  share?: CoinAmino;
}
export interface BidAminoMsg {
  type: "/crescent.liquidamm.v1beta1.Bid";
  value: BidAmino;
}
/** Bid defines standard bid for a rewards auction. */
export interface BidSDKType {
  public_position_id: Long;
  rewards_auction_id: Long;
  bidder: string;
  share: CoinSDKType;
}