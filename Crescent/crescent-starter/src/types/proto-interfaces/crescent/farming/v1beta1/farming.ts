import { Coin, CoinAmino, CoinSDKType, DecCoin, DecCoinAmino, DecCoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
/** PlanType enumerates the valid types of a plan. */
export enum PlanType {
  /** PLAN_TYPE_UNSPECIFIED - PLAN_TYPE_UNSPECIFIED defines the default plan type. */
  PLAN_TYPE_UNSPECIFIED = 0,
  /** PLAN_TYPE_PUBLIC - PLAN_TYPE_PUBLIC defines the public plan type. */
  PLAN_TYPE_PUBLIC = 1,
  /** PLAN_TYPE_PRIVATE - PLAN_TYPE_PRIVATE defines the private plan type. */
  PLAN_TYPE_PRIVATE = 2,
  UNRECOGNIZED = -1,
}
export const PlanTypeSDKType = PlanType;
export const PlanTypeAmino = PlanType;
export function planTypeFromJSON(object: any): PlanType {
  switch (object) {
    case 0:
    case "PLAN_TYPE_UNSPECIFIED":
      return PlanType.PLAN_TYPE_UNSPECIFIED;
    case 1:
    case "PLAN_TYPE_PUBLIC":
      return PlanType.PLAN_TYPE_PUBLIC;
    case 2:
    case "PLAN_TYPE_PRIVATE":
      return PlanType.PLAN_TYPE_PRIVATE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PlanType.UNRECOGNIZED;
  }
}
export function planTypeToJSON(object: PlanType): string {
  switch (object) {
    case PlanType.PLAN_TYPE_UNSPECIFIED:
      return "PLAN_TYPE_UNSPECIFIED";
    case PlanType.PLAN_TYPE_PUBLIC:
      return "PLAN_TYPE_PUBLIC";
    case PlanType.PLAN_TYPE_PRIVATE:
      return "PLAN_TYPE_PRIVATE";
    case PlanType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** AddressType enumerates the available types of a address. */
export enum AddressType {
  /** ADDRESS_TYPE_32_BYTES - the 32 bytes length address type of ADR 028. */
  ADDRESS_TYPE_32_BYTES = 0,
  /** ADDRESS_TYPE_20_BYTES - the default 20 bytes length address type. */
  ADDRESS_TYPE_20_BYTES = 1,
  UNRECOGNIZED = -1,
}
export const AddressTypeSDKType = AddressType;
export const AddressTypeAmino = AddressType;
export function addressTypeFromJSON(object: any): AddressType {
  switch (object) {
    case 0:
    case "ADDRESS_TYPE_32_BYTES":
      return AddressType.ADDRESS_TYPE_32_BYTES;
    case 1:
    case "ADDRESS_TYPE_20_BYTES":
      return AddressType.ADDRESS_TYPE_20_BYTES;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AddressType.UNRECOGNIZED;
  }
}
export function addressTypeToJSON(object: AddressType): string {
  switch (object) {
    case AddressType.ADDRESS_TYPE_32_BYTES:
      return "ADDRESS_TYPE_32_BYTES";
    case AddressType.ADDRESS_TYPE_20_BYTES:
      return "ADDRESS_TYPE_20_BYTES";
    case AddressType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Params defines the set of params for the farming module. */
export interface Params {
  /**
   * private_plan_creation_fee specifies the fee for plan creation
   * this fee prevents from spamming and is collected in the community pool
   */
  privatePlanCreationFee: Coin[];
  /**
   * next_epoch_days is the epoch length in number of days
   * it updates internal state called CurrentEpochDays that is used to process
   * staking and reward distribution in end blocker
   */
  nextEpochDays: number;
  /** farming_fee_collector is the module account address to collect fees within the farming module */
  farmingFeeCollector: string;
  /** delayed_staking_gas_fee is used to impose gas fee for the delayed staking */
  delayedStakingGasFee: Long;
  /** max_num_private_plans is the maximum number of active private plans */
  maxNumPrivatePlans: number;
}
export interface ParamsProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.Params";
  value: Uint8Array;
}
/** Params defines the set of params for the farming module. */
export interface ParamsAmino {
  /**
   * private_plan_creation_fee specifies the fee for plan creation
   * this fee prevents from spamming and is collected in the community pool
   */
  private_plan_creation_fee: CoinAmino[];
  /**
   * next_epoch_days is the epoch length in number of days
   * it updates internal state called CurrentEpochDays that is used to process
   * staking and reward distribution in end blocker
   */
  next_epoch_days: number;
  /** farming_fee_collector is the module account address to collect fees within the farming module */
  farming_fee_collector: string;
  /** delayed_staking_gas_fee is used to impose gas fee for the delayed staking */
  delayed_staking_gas_fee: string;
  /** max_num_private_plans is the maximum number of active private plans */
  max_num_private_plans: number;
}
export interface ParamsAminoMsg {
  type: "/crescent.farming.v1beta1.Params";
  value: ParamsAmino;
}
/** Params defines the set of params for the farming module. */
export interface ParamsSDKType {
  private_plan_creation_fee: CoinSDKType[];
  next_epoch_days: number;
  farming_fee_collector: string;
  delayed_staking_gas_fee: Long;
  max_num_private_plans: number;
}
/**
 * BasePlan defines a base plan type and contains the required fields
 * for basic farming plan functionality. Any custom farming plan type must
 * extend this type for additional functionality (for example, fixed amount plan, ratio
 * plan).
 */
export interface BasePlan {
  /** id specifies index of the farming plan */
  id: Long;
  /** name specifies the name for the plan */
  name: string;
  /**
   * type specifies the plan type; type 0 is public and 1 is private
   * public plan must be created through governance proposal and private plan is
   * created by account
   */
  type: PlanType;
  /** farming_pool_address defines the bech32-encoded address of the farming pool */
  farmingPoolAddress: string;
  /**
   * termination_address defines the Bech32-encoded address that terminates the plan
   * when the plan ends after the end time, the balance of the farming pool address
   * is transferred to the termination address
   */
  terminationAddress: string;
  /** staking_coin_weights specifies the coin weights for the plan */
  stakingCoinWeights: DecCoin[];
  /** start_time specifies the start time of the plan */
  startTime: Date;
  /** end_time specifies the end time of the plan */
  endTime: Date;
  /** terminated indicates whether the plan has been terminated or not */
  terminated: boolean;
  /** last_distribution_time specifies the last time a distribution occurred */
  lastDistributionTime: Date;
  /** distributed_coins specifies the total coins distributed by this plan */
  distributedCoins: Coin[];
}
export interface BasePlanProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.BasePlan";
  value: Uint8Array;
}
/**
 * BasePlan defines a base plan type and contains the required fields
 * for basic farming plan functionality. Any custom farming plan type must
 * extend this type for additional functionality (for example, fixed amount plan, ratio
 * plan).
 */
export interface BasePlanAmino {
  /** id specifies index of the farming plan */
  id: string;
  /** name specifies the name for the plan */
  name: string;
  /**
   * type specifies the plan type; type 0 is public and 1 is private
   * public plan must be created through governance proposal and private plan is
   * created by account
   */
  type: PlanType;
  /** farming_pool_address defines the bech32-encoded address of the farming pool */
  farming_pool_address: string;
  /**
   * termination_address defines the Bech32-encoded address that terminates the plan
   * when the plan ends after the end time, the balance of the farming pool address
   * is transferred to the termination address
   */
  termination_address: string;
  /** staking_coin_weights specifies the coin weights for the plan */
  staking_coin_weights: DecCoinAmino[];
  /** start_time specifies the start time of the plan */
  start_time?: Date;
  /** end_time specifies the end time of the plan */
  end_time?: Date;
  /** terminated indicates whether the plan has been terminated or not */
  terminated: boolean;
  /** last_distribution_time specifies the last time a distribution occurred */
  last_distribution_time?: Date;
  /** distributed_coins specifies the total coins distributed by this plan */
  distributed_coins: CoinAmino[];
}
export interface BasePlanAminoMsg {
  type: "/crescent.farming.v1beta1.BasePlan";
  value: BasePlanAmino;
}
/**
 * BasePlan defines a base plan type and contains the required fields
 * for basic farming plan functionality. Any custom farming plan type must
 * extend this type for additional functionality (for example, fixed amount plan, ratio
 * plan).
 */
export interface BasePlanSDKType {
  id: Long;
  name: string;
  type: PlanType;
  farming_pool_address: string;
  termination_address: string;
  staking_coin_weights: DecCoinSDKType[];
  start_time: Date;
  end_time: Date;
  terminated: boolean;
  last_distribution_time: Date;
  distributed_coins: CoinSDKType[];
}
/**
 * FixedAmountPlan defines a fixed amount plan that distributes a fixed amount
 * of coins for every epoch.
 */
export interface FixedAmountPlan {
  basePlan: BasePlan;
  /** epoch_amount specifies the distributing amount for each epoch */
  epochAmount: Coin[];
}
export interface FixedAmountPlanProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.FixedAmountPlan";
  value: Uint8Array;
}
/**
 * FixedAmountPlan defines a fixed amount plan that distributes a fixed amount
 * of coins for every epoch.
 */
export interface FixedAmountPlanAmino {
  base_plan?: BasePlanAmino;
  /** epoch_amount specifies the distributing amount for each epoch */
  epoch_amount: CoinAmino[];
}
export interface FixedAmountPlanAminoMsg {
  type: "/crescent.farming.v1beta1.FixedAmountPlan";
  value: FixedAmountPlanAmino;
}
/**
 * FixedAmountPlan defines a fixed amount plan that distributes a fixed amount
 * of coins for every epoch.
 */
export interface FixedAmountPlanSDKType {
  base_plan: BasePlanSDKType;
  epoch_amount: CoinSDKType[];
}
/**
 * RatioPlan defines a plan that distributes to farmers by ratio
 * distribution for every epoch day.
 */
export interface RatioPlan {
  basePlan: BasePlan;
  /** epoch_ratio specifies the distributing amount by ratio */
  epochRatio: string;
}
export interface RatioPlanProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.RatioPlan";
  value: Uint8Array;
}
/**
 * RatioPlan defines a plan that distributes to farmers by ratio
 * distribution for every epoch day.
 */
export interface RatioPlanAmino {
  base_plan?: BasePlanAmino;
  /** epoch_ratio specifies the distributing amount by ratio */
  epoch_ratio: string;
}
export interface RatioPlanAminoMsg {
  type: "/crescent.farming.v1beta1.RatioPlan";
  value: RatioPlanAmino;
}
/**
 * RatioPlan defines a plan that distributes to farmers by ratio
 * distribution for every epoch day.
 */
export interface RatioPlanSDKType {
  base_plan: BasePlanSDKType;
  epoch_ratio: string;
}
/** Staking defines a farmer's staking information. */
export interface Staking {
  amount: string;
  startingEpoch: Long;
}
export interface StakingProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.Staking";
  value: Uint8Array;
}
/** Staking defines a farmer's staking information. */
export interface StakingAmino {
  amount: string;
  starting_epoch: string;
}
export interface StakingAminoMsg {
  type: "/crescent.farming.v1beta1.Staking";
  value: StakingAmino;
}
/** Staking defines a farmer's staking information. */
export interface StakingSDKType {
  amount: string;
  starting_epoch: Long;
}
/** QueuedStaking defines staking that is waiting in a queue. */
export interface QueuedStaking {
  amount: string;
}
export interface QueuedStakingProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.QueuedStaking";
  value: Uint8Array;
}
/** QueuedStaking defines staking that is waiting in a queue. */
export interface QueuedStakingAmino {
  amount: string;
}
export interface QueuedStakingAminoMsg {
  type: "/crescent.farming.v1beta1.QueuedStaking";
  value: QueuedStakingAmino;
}
/** QueuedStaking defines staking that is waiting in a queue. */
export interface QueuedStakingSDKType {
  amount: string;
}
/** TotalStakings defines the total staking amount for a staking coin denom. */
export interface TotalStakings {
  amount: string;
}
export interface TotalStakingsProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.TotalStakings";
  value: Uint8Array;
}
/** TotalStakings defines the total staking amount for a staking coin denom. */
export interface TotalStakingsAmino {
  amount: string;
}
export interface TotalStakingsAminoMsg {
  type: "/crescent.farming.v1beta1.TotalStakings";
  value: TotalStakingsAmino;
}
/** TotalStakings defines the total staking amount for a staking coin denom. */
export interface TotalStakingsSDKType {
  amount: string;
}
/** HistoricalRewards defines the cumulative unit rewards for a given staking coin denom and an epoch number. */
export interface HistoricalRewards {
  cumulativeUnitRewards: DecCoin[];
}
export interface HistoricalRewardsProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.HistoricalRewards";
  value: Uint8Array;
}
/** HistoricalRewards defines the cumulative unit rewards for a given staking coin denom and an epoch number. */
export interface HistoricalRewardsAmino {
  cumulative_unit_rewards: DecCoinAmino[];
}
export interface HistoricalRewardsAminoMsg {
  type: "/crescent.farming.v1beta1.HistoricalRewards";
  value: HistoricalRewardsAmino;
}
/** HistoricalRewards defines the cumulative unit rewards for a given staking coin denom and an epoch number. */
export interface HistoricalRewardsSDKType {
  cumulative_unit_rewards: DecCoinSDKType[];
}
/**
 * OutstandingRewards represents outstanding (un-withdrawn) rewards
 * for a staking coin denom.
 */
export interface OutstandingRewards {
  rewards: DecCoin[];
}
export interface OutstandingRewardsProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.OutstandingRewards";
  value: Uint8Array;
}
/**
 * OutstandingRewards represents outstanding (un-withdrawn) rewards
 * for a staking coin denom.
 */
export interface OutstandingRewardsAmino {
  rewards: DecCoinAmino[];
}
export interface OutstandingRewardsAminoMsg {
  type: "/crescent.farming.v1beta1.OutstandingRewards";
  value: OutstandingRewardsAmino;
}
/**
 * OutstandingRewards represents outstanding (un-withdrawn) rewards
 * for a staking coin denom.
 */
export interface OutstandingRewardsSDKType {
  rewards: DecCoinSDKType[];
}
/**
 * UnharvestedRewards represents unharvested rewards of a farmer for a
 * staking coin denom, which increases when there was an automatic withdrawal
 * of rewards due to changes in staked coin amount.
 */
export interface UnharvestedRewards {
  rewards: Coin[];
}
export interface UnharvestedRewardsProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.UnharvestedRewards";
  value: Uint8Array;
}
/**
 * UnharvestedRewards represents unharvested rewards of a farmer for a
 * staking coin denom, which increases when there was an automatic withdrawal
 * of rewards due to changes in staked coin amount.
 */
export interface UnharvestedRewardsAmino {
  rewards: CoinAmino[];
}
export interface UnharvestedRewardsAminoMsg {
  type: "/crescent.farming.v1beta1.UnharvestedRewards";
  value: UnharvestedRewardsAmino;
}
/**
 * UnharvestedRewards represents unharvested rewards of a farmer for a
 * staking coin denom, which increases when there was an automatic withdrawal
 * of rewards due to changes in staked coin amount.
 */
export interface UnharvestedRewardsSDKType {
  rewards: CoinSDKType[];
}