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
 * RewardsAuction defines rewards auction that is created by the module
 * for every rewards_auction_duration in params.
 */
export interface RewardsAuction {
  /** id specifies the unique auction id */
  id: Long;
  /** pool_id specifies the liquidity pool id */
  poolId: Long;
  /** bidding_coin_denom specifies the bidding coin denomination */
  biddingCoinDenom: string;
  /** paying_reserve_address specfies the account that reserves bidding amounts placed by bidders */
  payingReserveAddress: string;
  /** start_time specifies the start time of an auction */
  startTime: Date;
  /** end_time specifies the end time of an auction */
  endTime: Date;
  /** status specifies the status of an auction */
  status: AuctionStatus;
  /**
   * winner specifies the bidder who won the auction
   * the value is determined when an auction is finished
   */
  winner: string;
  /** winning_amount specifies the winning amount for the uaction */
  winningAmount: Coin;
  /**
   * rewards specifies the farming rewards for are accumulated in the farm module
   * the value is determined when an auction is finished
   */
  rewards: Coin[];
  fees: Coin[];
  feeRate: string;
}
export interface RewardsAuctionProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.RewardsAuction";
  value: Uint8Array;
}
/**
 * RewardsAuction defines rewards auction that is created by the module
 * for every rewards_auction_duration in params.
 */
export interface RewardsAuctionAmino {
  /** id specifies the unique auction id */
  id: string;
  /** pool_id specifies the liquidity pool id */
  pool_id: string;
  /** bidding_coin_denom specifies the bidding coin denomination */
  bidding_coin_denom: string;
  /** paying_reserve_address specfies the account that reserves bidding amounts placed by bidders */
  paying_reserve_address: string;
  /** start_time specifies the start time of an auction */
  start_time?: Date;
  /** end_time specifies the end time of an auction */
  end_time?: Date;
  /** status specifies the status of an auction */
  status: AuctionStatus;
  /**
   * winner specifies the bidder who won the auction
   * the value is determined when an auction is finished
   */
  winner: string;
  /** winning_amount specifies the winning amount for the uaction */
  winning_amount?: CoinAmino;
  /**
   * rewards specifies the farming rewards for are accumulated in the farm module
   * the value is determined when an auction is finished
   */
  rewards: CoinAmino[];
  fees: CoinAmino[];
  fee_rate: string;
}
export interface RewardsAuctionAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.RewardsAuction";
  value: RewardsAuctionAmino;
}
/**
 * RewardsAuction defines rewards auction that is created by the module
 * for every rewards_auction_duration in params.
 */
export interface RewardsAuctionSDKType {
  id: Long;
  pool_id: Long;
  bidding_coin_denom: string;
  paying_reserve_address: string;
  start_time: Date;
  end_time: Date;
  status: AuctionStatus;
  winner: string;
  winning_amount: CoinSDKType;
  rewards: CoinSDKType[];
  fees: CoinSDKType[];
  fee_rate: string;
}
/**
 * CompoundingRewards records the amount of pool coin that is used for a bidder to place a bid
 * for an auction. It is used internally to calculate unfarm amount.
 */
export interface CompoundingRewards {
  amount: string;
}
export interface CompoundingRewardsProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.CompoundingRewards";
  value: Uint8Array;
}
/**
 * CompoundingRewards records the amount of pool coin that is used for a bidder to place a bid
 * for an auction. It is used internally to calculate unfarm amount.
 */
export interface CompoundingRewardsAmino {
  amount: string;
}
export interface CompoundingRewardsAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.CompoundingRewards";
  value: CompoundingRewardsAmino;
}
/**
 * CompoundingRewards records the amount of pool coin that is used for a bidder to place a bid
 * for an auction. It is used internally to calculate unfarm amount.
 */
export interface CompoundingRewardsSDKType {
  amount: string;
}
/** Bid defines standard bid for a rewards auction. */
export interface Bid {
  /** pool_id specifies the pool id */
  poolId: Long;
  /** bidder specifies the bech32-encoded address that places a bid for the auction */
  bidder: string;
  /** amount specifies the amount to place a bid */
  amount: Coin;
}
export interface BidProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.Bid";
  value: Uint8Array;
}
/** Bid defines standard bid for a rewards auction. */
export interface BidAmino {
  /** pool_id specifies the pool id */
  pool_id: string;
  /** bidder specifies the bech32-encoded address that places a bid for the auction */
  bidder: string;
  /** amount specifies the amount to place a bid */
  amount?: CoinAmino;
}
export interface BidAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.Bid";
  value: BidAmino;
}
/** Bid defines standard bid for a rewards auction. */
export interface BidSDKType {
  pool_id: Long;
  bidder: string;
  amount: CoinSDKType;
}