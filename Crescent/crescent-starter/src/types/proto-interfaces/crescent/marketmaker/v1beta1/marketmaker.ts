import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
/** Params defines the set of params for the marketmaker module. */
export interface Params {
  /** Address containing the funds used to distribute incentives */
  incentiveBudgetAddress: string;
  /**
   * The amount of deposit to be applied to the market maker, which is calculated per pair and is refunded when the
   * market maker included or rejected through the MarketMaker Proposal
   */
  depositAmount: Coin[];
  /** Common variables used in market maker scoring system */
  common: Common;
  /** Include the pairs that are incentive target pairs and the variables used in market maker scoring system */
  incentivePairs: IncentivePair[];
}
export interface ParamsProtoMsg {
  typeUrl: "/crescent.marketmaker.v1beta1.Params";
  value: Uint8Array;
}
/** Params defines the set of params for the marketmaker module. */
export interface ParamsAmino {
  /** Address containing the funds used to distribute incentives */
  incentive_budget_address: string;
  /**
   * The amount of deposit to be applied to the market maker, which is calculated per pair and is refunded when the
   * market maker included or rejected through the MarketMaker Proposal
   */
  deposit_amount: CoinAmino[];
  /** Common variables used in market maker scoring system */
  common?: CommonAmino;
  /** Include the pairs that are incentive target pairs and the variables used in market maker scoring system */
  incentive_pairs: IncentivePairAmino[];
}
export interface ParamsAminoMsg {
  type: "/crescent.marketmaker.v1beta1.Params";
  value: ParamsAmino;
}
/** Params defines the set of params for the marketmaker module. */
export interface ParamsSDKType {
  incentive_budget_address: string;
  deposit_amount: CoinSDKType[];
  common: CommonSDKType;
  incentive_pairs: IncentivePairSDKType[];
}
export interface Common {
  /** Minimum ratio to maintain the tick order */
  minOpenRatio: string;
  /** Minimum ratio of open amount to MinDepth */
  minOpenDepthRatio: string;
  /** Maximum allowable consecutive blocks of outage */
  maxDowntime: number;
  /** Maximum allowable sum of blocks in an hour */
  maxTotalDowntime: number;
  /** Minimum value of LiveHour to achieve LiveDay */
  minHours: number;
  /** Minimum value of LiveDay to maintain MM eligibility */
  minDays: number;
}
export interface CommonProtoMsg {
  typeUrl: "/crescent.marketmaker.v1beta1.Common";
  value: Uint8Array;
}
export interface CommonAmino {
  /** Minimum ratio to maintain the tick order */
  min_open_ratio: string;
  /** Minimum ratio of open amount to MinDepth */
  min_open_depth_ratio: string;
  /** Maximum allowable consecutive blocks of outage */
  max_downtime: number;
  /** Maximum allowable sum of blocks in an hour */
  max_total_downtime: number;
  /** Minimum value of LiveHour to achieve LiveDay */
  min_hours: number;
  /** Minimum value of LiveDay to maintain MM eligibility */
  min_days: number;
}
export interface CommonAminoMsg {
  type: "/crescent.marketmaker.v1beta1.Common";
  value: CommonAmino;
}
export interface CommonSDKType {
  min_open_ratio: string;
  min_open_depth_ratio: string;
  max_downtime: number;
  max_total_downtime: number;
  min_hours: number;
  min_days: number;
}
export interface IncentivePair {
  /** Pair id of liquidity module */
  pairId: Long;
  /** Time the pair variables start to be applied to the scoring system */
  updateTime: Date;
  /** Incentive weights for each pair */
  incentiveWeight: string;
  /** Maximum allowable spread between bid and ask */
  maxSpread: string;
  /** Minimum allowable price difference of high and low on both side of orders */
  minWidth: string;
  /** Minimum allowable order depth on each side */
  minDepth: string;
}
export interface IncentivePairProtoMsg {
  typeUrl: "/crescent.marketmaker.v1beta1.IncentivePair";
  value: Uint8Array;
}
export interface IncentivePairAmino {
  /** Pair id of liquidity module */
  pair_id: string;
  /** Time the pair variables start to be applied to the scoring system */
  update_time?: Date;
  /** Incentive weights for each pair */
  incentive_weight: string;
  /** Maximum allowable spread between bid and ask */
  max_spread: string;
  /** Minimum allowable price difference of high and low on both side of orders */
  min_width: string;
  /** Minimum allowable order depth on each side */
  min_depth: string;
}
export interface IncentivePairAminoMsg {
  type: "/crescent.marketmaker.v1beta1.IncentivePair";
  value: IncentivePairAmino;
}
export interface IncentivePairSDKType {
  pair_id: Long;
  update_time: Date;
  incentive_weight: string;
  max_spread: string;
  min_width: string;
  min_depth: string;
}
/**
 * Store the total amount of incentives distributed through `MarketMakerProposal`, and it can be claimed at once through
 * `MsgClaimIncentives`
 */
export interface Incentive {
  address: string;
  claimable: Coin[];
}
export interface IncentiveProtoMsg {
  typeUrl: "/crescent.marketmaker.v1beta1.Incentive";
  value: Uint8Array;
}
/**
 * Store the total amount of incentives distributed through `MarketMakerProposal`, and it can be claimed at once through
 * `MsgClaimIncentives`
 */
export interface IncentiveAmino {
  address: string;
  claimable: CoinAmino[];
}
export interface IncentiveAminoMsg {
  type: "/crescent.marketmaker.v1beta1.Incentive";
  value: IncentiveAmino;
}
/**
 * Store the total amount of incentives distributed through `MarketMakerProposal`, and it can be claimed at once through
 * `MsgClaimIncentives`
 */
export interface IncentiveSDKType {
  address: string;
  claimable: CoinSDKType[];
}
/**
 * Market maker object created by applying, if included through `MarketMakerProposal`, eligible becomes true and is
 * deleted if rejected or excluded
 */
export interface MarketMaker {
  address: string;
  pairId: Long;
  eligible: boolean;
}
export interface MarketMakerProtoMsg {
  typeUrl: "/crescent.marketmaker.v1beta1.MarketMaker";
  value: Uint8Array;
}
/**
 * Market maker object created by applying, if included through `MarketMakerProposal`, eligible becomes true and is
 * deleted if rejected or excluded
 */
export interface MarketMakerAmino {
  address: string;
  pair_id: string;
  eligible: boolean;
}
export interface MarketMakerAminoMsg {
  type: "/crescent.marketmaker.v1beta1.MarketMaker";
  value: MarketMakerAmino;
}
/**
 * Market maker object created by applying, if included through `MarketMakerProposal`, eligible becomes true and is
 * deleted if rejected or excluded
 */
export interface MarketMakerSDKType {
  address: string;
  pair_id: Long;
  eligible: boolean;
}
/** stores apply deposit amount for a future refund */
export interface Deposit {
  amount: Coin[];
}
export interface DepositProtoMsg {
  typeUrl: "/crescent.marketmaker.v1beta1.Deposit";
  value: Uint8Array;
}
/** stores apply deposit amount for a future refund */
export interface DepositAmino {
  amount: CoinAmino[];
}
export interface DepositAminoMsg {
  type: "/crescent.marketmaker.v1beta1.Deposit";
  value: DepositAmino;
}
/** stores apply deposit amount for a future refund */
export interface DepositSDKType {
  amount: CoinSDKType[];
}
export interface DepositRecord {
  address: string;
  pairId: Long;
  amount: Coin[];
}
export interface DepositRecordProtoMsg {
  typeUrl: "/crescent.marketmaker.v1beta1.DepositRecord";
  value: Uint8Array;
}
export interface DepositRecordAmino {
  address: string;
  pair_id: string;
  amount: CoinAmino[];
}
export interface DepositRecordAminoMsg {
  type: "/crescent.marketmaker.v1beta1.DepositRecord";
  value: DepositRecordAmino;
}
export interface DepositRecordSDKType {
  address: string;
  pair_id: Long;
  amount: CoinSDKType[];
}