import { DecCoin, DecCoinAmino, DecCoinSDKType, Coin, CoinAmino, CoinSDKType } from "../../base/v1beta1/coin";
import { Long } from "../../../helpers";
/** Params defines the set of params for the distribution module. */
export interface Params {
  communityTax: string;
  baseProposerReward: string;
  bonusProposerReward: string;
  withdrawAddrEnabled: boolean;
}
export interface ParamsProtoMsg {
  typeUrl: "/cosmos.distribution.v1beta1.Params";
  value: Uint8Array;
}
/** Params defines the set of params for the distribution module. */
export interface ParamsAmino {
  community_tax: string;
  base_proposer_reward: string;
  bonus_proposer_reward: string;
  withdraw_addr_enabled: boolean;
}
export interface ParamsAminoMsg {
  type: "cosmos-sdk/Params";
  value: ParamsAmino;
}
/** Params defines the set of params for the distribution module. */
export interface ParamsSDKType {
  community_tax: string;
  base_proposer_reward: string;
  bonus_proposer_reward: string;
  withdraw_addr_enabled: boolean;
}
/**
 * ValidatorHistoricalRewards represents historical rewards for a validator.
 * Height is implicit within the store key.
 * Cumulative reward ratio is the sum from the zeroeth period
 * until this period of rewards / tokens, per the spec.
 * The reference count indicates the number of objects
 * which might need to reference this historical entry at any point.
 * ReferenceCount =
 *    number of outstanding delegations which ended the associated period (and
 *    might need to read that record)
 *  + number of slashes which ended the associated period (and might need to
 *  read that record)
 *  + one per validator for the zeroeth period, set on initialization
 */
export interface ValidatorHistoricalRewards {
  cumulativeRewardRatio: DecCoin[];
  referenceCount: number;
}
export interface ValidatorHistoricalRewardsProtoMsg {
  typeUrl: "/cosmos.distribution.v1beta1.ValidatorHistoricalRewards";
  value: Uint8Array;
}
/**
 * ValidatorHistoricalRewards represents historical rewards for a validator.
 * Height is implicit within the store key.
 * Cumulative reward ratio is the sum from the zeroeth period
 * until this period of rewards / tokens, per the spec.
 * The reference count indicates the number of objects
 * which might need to reference this historical entry at any point.
 * ReferenceCount =
 *    number of outstanding delegations which ended the associated period (and
 *    might need to read that record)
 *  + number of slashes which ended the associated period (and might need to
 *  read that record)
 *  + one per validator for the zeroeth period, set on initialization
 */
export interface ValidatorHistoricalRewardsAmino {
  cumulative_reward_ratio: DecCoinAmino[];
  reference_count: number;
}
export interface ValidatorHistoricalRewardsAminoMsg {
  type: "cosmos-sdk/ValidatorHistoricalRewards";
  value: ValidatorHistoricalRewardsAmino;
}
/**
 * ValidatorHistoricalRewards represents historical rewards for a validator.
 * Height is implicit within the store key.
 * Cumulative reward ratio is the sum from the zeroeth period
 * until this period of rewards / tokens, per the spec.
 * The reference count indicates the number of objects
 * which might need to reference this historical entry at any point.
 * ReferenceCount =
 *    number of outstanding delegations which ended the associated period (and
 *    might need to read that record)
 *  + number of slashes which ended the associated period (and might need to
 *  read that record)
 *  + one per validator for the zeroeth period, set on initialization
 */
export interface ValidatorHistoricalRewardsSDKType {
  cumulative_reward_ratio: DecCoinSDKType[];
  reference_count: number;
}
/**
 * ValidatorCurrentRewards represents current rewards and current
 * period for a validator kept as a running counter and incremented
 * each block as long as the validator's tokens remain constant.
 */
export interface ValidatorCurrentRewards {
  rewards: DecCoin[];
  period: Long;
}
export interface ValidatorCurrentRewardsProtoMsg {
  typeUrl: "/cosmos.distribution.v1beta1.ValidatorCurrentRewards";
  value: Uint8Array;
}
/**
 * ValidatorCurrentRewards represents current rewards and current
 * period for a validator kept as a running counter and incremented
 * each block as long as the validator's tokens remain constant.
 */
export interface ValidatorCurrentRewardsAmino {
  rewards: DecCoinAmino[];
  period: string;
}
export interface ValidatorCurrentRewardsAminoMsg {
  type: "cosmos-sdk/ValidatorCurrentRewards";
  value: ValidatorCurrentRewardsAmino;
}
/**
 * ValidatorCurrentRewards represents current rewards and current
 * period for a validator kept as a running counter and incremented
 * each block as long as the validator's tokens remain constant.
 */
export interface ValidatorCurrentRewardsSDKType {
  rewards: DecCoinSDKType[];
  period: Long;
}
/**
 * ValidatorAccumulatedCommission represents accumulated commission
 * for a validator kept as a running counter, can be withdrawn at any time.
 */
export interface ValidatorAccumulatedCommission {
  commission: DecCoin[];
}
export interface ValidatorAccumulatedCommissionProtoMsg {
  typeUrl: "/cosmos.distribution.v1beta1.ValidatorAccumulatedCommission";
  value: Uint8Array;
}
/**
 * ValidatorAccumulatedCommission represents accumulated commission
 * for a validator kept as a running counter, can be withdrawn at any time.
 */
export interface ValidatorAccumulatedCommissionAmino {
  commission: DecCoinAmino[];
}
export interface ValidatorAccumulatedCommissionAminoMsg {
  type: "cosmos-sdk/ValidatorAccumulatedCommission";
  value: ValidatorAccumulatedCommissionAmino;
}
/**
 * ValidatorAccumulatedCommission represents accumulated commission
 * for a validator kept as a running counter, can be withdrawn at any time.
 */
export interface ValidatorAccumulatedCommissionSDKType {
  commission: DecCoinSDKType[];
}
/**
 * ValidatorOutstandingRewards represents outstanding (un-withdrawn) rewards
 * for a validator inexpensive to track, allows simple sanity checks.
 */
export interface ValidatorOutstandingRewards {
  rewards: DecCoin[];
}
export interface ValidatorOutstandingRewardsProtoMsg {
  typeUrl: "/cosmos.distribution.v1beta1.ValidatorOutstandingRewards";
  value: Uint8Array;
}
/**
 * ValidatorOutstandingRewards represents outstanding (un-withdrawn) rewards
 * for a validator inexpensive to track, allows simple sanity checks.
 */
export interface ValidatorOutstandingRewardsAmino {
  rewards: DecCoinAmino[];
}
export interface ValidatorOutstandingRewardsAminoMsg {
  type: "cosmos-sdk/ValidatorOutstandingRewards";
  value: ValidatorOutstandingRewardsAmino;
}
/**
 * ValidatorOutstandingRewards represents outstanding (un-withdrawn) rewards
 * for a validator inexpensive to track, allows simple sanity checks.
 */
export interface ValidatorOutstandingRewardsSDKType {
  rewards: DecCoinSDKType[];
}
/**
 * ValidatorSlashEvent represents a validator slash event.
 * Height is implicit within the store key.
 * This is needed to calculate appropriate amount of staking tokens
 * for delegations which are withdrawn after a slash has occurred.
 */
export interface ValidatorSlashEvent {
  validatorPeriod: Long;
  fraction: string;
}
export interface ValidatorSlashEventProtoMsg {
  typeUrl: "/cosmos.distribution.v1beta1.ValidatorSlashEvent";
  value: Uint8Array;
}
/**
 * ValidatorSlashEvent represents a validator slash event.
 * Height is implicit within the store key.
 * This is needed to calculate appropriate amount of staking tokens
 * for delegations which are withdrawn after a slash has occurred.
 */
export interface ValidatorSlashEventAmino {
  validator_period: string;
  fraction: string;
}
export interface ValidatorSlashEventAminoMsg {
  type: "cosmos-sdk/ValidatorSlashEvent";
  value: ValidatorSlashEventAmino;
}
/**
 * ValidatorSlashEvent represents a validator slash event.
 * Height is implicit within the store key.
 * This is needed to calculate appropriate amount of staking tokens
 * for delegations which are withdrawn after a slash has occurred.
 */
export interface ValidatorSlashEventSDKType {
  validator_period: Long;
  fraction: string;
}
/** ValidatorSlashEvents is a collection of ValidatorSlashEvent messages. */
export interface ValidatorSlashEvents {
  validatorSlashEvents: ValidatorSlashEvent[];
}
export interface ValidatorSlashEventsProtoMsg {
  typeUrl: "/cosmos.distribution.v1beta1.ValidatorSlashEvents";
  value: Uint8Array;
}
/** ValidatorSlashEvents is a collection of ValidatorSlashEvent messages. */
export interface ValidatorSlashEventsAmino {
  validator_slash_events: ValidatorSlashEventAmino[];
}
export interface ValidatorSlashEventsAminoMsg {
  type: "cosmos-sdk/ValidatorSlashEvents";
  value: ValidatorSlashEventsAmino;
}
/** ValidatorSlashEvents is a collection of ValidatorSlashEvent messages. */
export interface ValidatorSlashEventsSDKType {
  validator_slash_events: ValidatorSlashEventSDKType[];
}
/** FeePool is the global fee pool for distribution. */
export interface FeePool {
  communityPool: DecCoin[];
}
export interface FeePoolProtoMsg {
  typeUrl: "/cosmos.distribution.v1beta1.FeePool";
  value: Uint8Array;
}
/** FeePool is the global fee pool for distribution. */
export interface FeePoolAmino {
  community_pool: DecCoinAmino[];
}
export interface FeePoolAminoMsg {
  type: "cosmos-sdk/FeePool";
  value: FeePoolAmino;
}
/** FeePool is the global fee pool for distribution. */
export interface FeePoolSDKType {
  community_pool: DecCoinSDKType[];
}
/**
 * CommunityPoolSpendProposal details a proposal for use of community funds,
 * together with how many coins are proposed to be spent, and to which
 * recipient account.
 */
export interface CommunityPoolSpendProposal {
  title: string;
  description: string;
  recipient: string;
  amount: Coin[];
}
export interface CommunityPoolSpendProposalProtoMsg {
  typeUrl: "/cosmos.distribution.v1beta1.CommunityPoolSpendProposal";
  value: Uint8Array;
}
/**
 * CommunityPoolSpendProposal details a proposal for use of community funds,
 * together with how many coins are proposed to be spent, and to which
 * recipient account.
 */
export interface CommunityPoolSpendProposalAmino {
  title: string;
  description: string;
  recipient: string;
  amount: CoinAmino[];
}
export interface CommunityPoolSpendProposalAminoMsg {
  type: "cosmos-sdk/CommunityPoolSpendProposal";
  value: CommunityPoolSpendProposalAmino;
}
/**
 * CommunityPoolSpendProposal details a proposal for use of community funds,
 * together with how many coins are proposed to be spent, and to which
 * recipient account.
 */
export interface CommunityPoolSpendProposalSDKType {
  title: string;
  description: string;
  recipient: string;
  amount: CoinSDKType[];
}
/**
 * DelegatorStartingInfo represents the starting info for a delegator reward
 * period. It tracks the previous validator period, the delegation's amount of
 * staking token, and the creation height (to check later on if any slashes have
 * occurred). NOTE: Even though validators are slashed to whole staking tokens,
 * the delegators within the validator may be left with less than a full token,
 * thus sdk.Dec is used.
 */
export interface DelegatorStartingInfo {
  previousPeriod: Long;
  stake: string;
  height: Long;
}
export interface DelegatorStartingInfoProtoMsg {
  typeUrl: "/cosmos.distribution.v1beta1.DelegatorStartingInfo";
  value: Uint8Array;
}
/**
 * DelegatorStartingInfo represents the starting info for a delegator reward
 * period. It tracks the previous validator period, the delegation's amount of
 * staking token, and the creation height (to check later on if any slashes have
 * occurred). NOTE: Even though validators are slashed to whole staking tokens,
 * the delegators within the validator may be left with less than a full token,
 * thus sdk.Dec is used.
 */
export interface DelegatorStartingInfoAmino {
  previous_period: string;
  stake: string;
  height: string;
}
export interface DelegatorStartingInfoAminoMsg {
  type: "cosmos-sdk/DelegatorStartingInfo";
  value: DelegatorStartingInfoAmino;
}
/**
 * DelegatorStartingInfo represents the starting info for a delegator reward
 * period. It tracks the previous validator period, the delegation's amount of
 * staking token, and the creation height (to check later on if any slashes have
 * occurred). NOTE: Even though validators are slashed to whole staking tokens,
 * the delegators within the validator may be left with less than a full token,
 * thus sdk.Dec is used.
 */
export interface DelegatorStartingInfoSDKType {
  previous_period: Long;
  stake: string;
  height: Long;
}
/**
 * DelegationDelegatorReward represents the properties
 * of a delegator's delegation reward.
 */
export interface DelegationDelegatorReward {
  validatorAddress: string;
  reward: DecCoin[];
}
export interface DelegationDelegatorRewardProtoMsg {
  typeUrl: "/cosmos.distribution.v1beta1.DelegationDelegatorReward";
  value: Uint8Array;
}
/**
 * DelegationDelegatorReward represents the properties
 * of a delegator's delegation reward.
 */
export interface DelegationDelegatorRewardAmino {
  validator_address: string;
  reward: DecCoinAmino[];
}
export interface DelegationDelegatorRewardAminoMsg {
  type: "cosmos-sdk/DelegationDelegatorReward";
  value: DelegationDelegatorRewardAmino;
}
/**
 * DelegationDelegatorReward represents the properties
 * of a delegator's delegation reward.
 */
export interface DelegationDelegatorRewardSDKType {
  validator_address: string;
  reward: DecCoinSDKType[];
}
/**
 * CommunityPoolSpendProposalWithDeposit defines a CommunityPoolSpendProposal
 * with a deposit
 */
export interface CommunityPoolSpendProposalWithDeposit {
  title: string;
  description: string;
  recipient: string;
  amount: string;
  deposit: string;
}
export interface CommunityPoolSpendProposalWithDepositProtoMsg {
  typeUrl: "/cosmos.distribution.v1beta1.CommunityPoolSpendProposalWithDeposit";
  value: Uint8Array;
}
/**
 * CommunityPoolSpendProposalWithDeposit defines a CommunityPoolSpendProposal
 * with a deposit
 */
export interface CommunityPoolSpendProposalWithDepositAmino {
  title: string;
  description: string;
  recipient: string;
  amount: string;
  deposit: string;
}
export interface CommunityPoolSpendProposalWithDepositAminoMsg {
  type: "cosmos-sdk/CommunityPoolSpendProposalWithDeposit";
  value: CommunityPoolSpendProposalWithDepositAmino;
}
/**
 * CommunityPoolSpendProposalWithDeposit defines a CommunityPoolSpendProposal
 * with a deposit
 */
export interface CommunityPoolSpendProposalWithDepositSDKType {
  title: string;
  description: string;
  recipient: string;
  amount: string;
  deposit: string;
}