import { Params, ParamsAmino, ParamsSDKType, Staking, StakingAmino, StakingSDKType, QueuedStaking, QueuedStakingAmino, QueuedStakingSDKType, HistoricalRewards, HistoricalRewardsAmino, HistoricalRewardsSDKType, OutstandingRewards, OutstandingRewardsAmino, OutstandingRewardsSDKType, UnharvestedRewards, UnharvestedRewardsAmino, UnharvestedRewardsSDKType } from "./farming";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Any, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
import { Long } from "../../../helpers";
/** GenesisState defines the farming module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters for the farming module */
  params: Params;
  globalPlanId: Long;
  /** plan_records defines the plan records used for genesis state */
  planRecords: PlanRecord[];
  stakingRecords: StakingRecord[];
  queuedStakingRecords: QueuedStakingRecord[];
  historicalRewardsRecords: HistoricalRewardsRecord[];
  outstandingRewardsRecords: OutstandingRewardsRecord[];
  unharvestedRewardsRecords: UnharvestedRewardsRecord[];
  currentEpochRecords: CurrentEpochRecord[];
  totalStakingsRecords: TotalStakingsRecord[];
  /**
   * reward_pool_coins specifies balance of the reward pool to be distributed in the plans
   * this param is needed for import/export validation
   */
  rewardPoolCoins: Coin[];
  /** last_epoch_time specifies the last executed epoch time of the plans */
  lastEpochTime: Date;
  /** current_epoch_days specifies the epoch used when allocating farming rewards in end blocker */
  currentEpochDays: number;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the farming module's genesis state. */
export interface GenesisStateAmino {
  /** params defines all the parameters for the farming module */
  params?: ParamsAmino;
  global_plan_id: string;
  /** plan_records defines the plan records used for genesis state */
  plan_records: PlanRecordAmino[];
  staking_records: StakingRecordAmino[];
  queued_staking_records: QueuedStakingRecordAmino[];
  historical_rewards_records: HistoricalRewardsRecordAmino[];
  outstanding_rewards_records: OutstandingRewardsRecordAmino[];
  unharvested_rewards_records: UnharvestedRewardsRecordAmino[];
  current_epoch_records: CurrentEpochRecordAmino[];
  total_stakings_records: TotalStakingsRecordAmino[];
  /**
   * reward_pool_coins specifies balance of the reward pool to be distributed in the plans
   * this param is needed for import/export validation
   */
  reward_pool_coins: CoinAmino[];
  /** last_epoch_time specifies the last executed epoch time of the plans */
  last_epoch_time?: Date;
  /** current_epoch_days specifies the epoch used when allocating farming rewards in end blocker */
  current_epoch_days: number;
}
export interface GenesisStateAminoMsg {
  type: "/crescent.farming.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the farming module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  global_plan_id: Long;
  plan_records: PlanRecordSDKType[];
  staking_records: StakingRecordSDKType[];
  queued_staking_records: QueuedStakingRecordSDKType[];
  historical_rewards_records: HistoricalRewardsRecordSDKType[];
  outstanding_rewards_records: OutstandingRewardsRecordSDKType[];
  unharvested_rewards_records: UnharvestedRewardsRecordSDKType[];
  current_epoch_records: CurrentEpochRecordSDKType[];
  total_stakings_records: TotalStakingsRecordSDKType[];
  reward_pool_coins: CoinSDKType[];
  last_epoch_time: Date;
  current_epoch_days: number;
}
/** PlanRecord is used for import/export via genesis json. */
export interface PlanRecord {
  /** plan specifies the plan interface; it can be FixedAmountPlan or RatioPlan */
  plan: Any;
  /**
   * farming_pool_coins specifies balance of the farming pool for the plan
   * this param is needed for import/export validation
   */
  farmingPoolCoins: Coin[];
}
export interface PlanRecordProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.PlanRecord";
  value: Uint8Array;
}
/** PlanRecord is used for import/export via genesis json. */
export interface PlanRecordAmino {
  /** plan specifies the plan interface; it can be FixedAmountPlan or RatioPlan */
  plan?: AnyAmino;
  /**
   * farming_pool_coins specifies balance of the farming pool for the plan
   * this param is needed for import/export validation
   */
  farming_pool_coins: CoinAmino[];
}
export interface PlanRecordAminoMsg {
  type: "/crescent.farming.v1beta1.PlanRecord";
  value: PlanRecordAmino;
}
/** PlanRecord is used for import/export via genesis json. */
export interface PlanRecordSDKType {
  plan: AnySDKType;
  farming_pool_coins: CoinSDKType[];
}
/** StakingRecord is used for import/export via genesis json. */
export interface StakingRecord {
  stakingCoinDenom: string;
  farmer: string;
  staking: Staking;
}
export interface StakingRecordProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.StakingRecord";
  value: Uint8Array;
}
/** StakingRecord is used for import/export via genesis json. */
export interface StakingRecordAmino {
  staking_coin_denom: string;
  farmer: string;
  staking?: StakingAmino;
}
export interface StakingRecordAminoMsg {
  type: "/crescent.farming.v1beta1.StakingRecord";
  value: StakingRecordAmino;
}
/** StakingRecord is used for import/export via genesis json. */
export interface StakingRecordSDKType {
  staking_coin_denom: string;
  farmer: string;
  staking: StakingSDKType;
}
/** QueuedStakingRecord is used for import/export via genesis json. */
export interface QueuedStakingRecord {
  endTime: Date;
  stakingCoinDenom: string;
  farmer: string;
  queuedStaking: QueuedStaking;
}
export interface QueuedStakingRecordProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.QueuedStakingRecord";
  value: Uint8Array;
}
/** QueuedStakingRecord is used for import/export via genesis json. */
export interface QueuedStakingRecordAmino {
  end_time?: Date;
  staking_coin_denom: string;
  farmer: string;
  queued_staking?: QueuedStakingAmino;
}
export interface QueuedStakingRecordAminoMsg {
  type: "/crescent.farming.v1beta1.QueuedStakingRecord";
  value: QueuedStakingRecordAmino;
}
/** QueuedStakingRecord is used for import/export via genesis json. */
export interface QueuedStakingRecordSDKType {
  end_time: Date;
  staking_coin_denom: string;
  farmer: string;
  queued_staking: QueuedStakingSDKType;
}
/** TotalStakingsRecord is used for import/export via genesis json. */
export interface TotalStakingsRecord {
  stakingCoinDenom: string;
  /** amount specifies total amount of the staking for the staking coin denom except queued staking */
  amount: string;
  /**
   * staking_reserve_coins specifies balance of the staking reserve account where staking and queued staking for the
   * staking coin denom is stored this param is needed for import/export validation
   */
  stakingReserveCoins: Coin[];
}
export interface TotalStakingsRecordProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.TotalStakingsRecord";
  value: Uint8Array;
}
/** TotalStakingsRecord is used for import/export via genesis json. */
export interface TotalStakingsRecordAmino {
  staking_coin_denom: string;
  /** amount specifies total amount of the staking for the staking coin denom except queued staking */
  amount: string;
  /**
   * staking_reserve_coins specifies balance of the staking reserve account where staking and queued staking for the
   * staking coin denom is stored this param is needed for import/export validation
   */
  staking_reserve_coins: CoinAmino[];
}
export interface TotalStakingsRecordAminoMsg {
  type: "/crescent.farming.v1beta1.TotalStakingsRecord";
  value: TotalStakingsRecordAmino;
}
/** TotalStakingsRecord is used for import/export via genesis json. */
export interface TotalStakingsRecordSDKType {
  staking_coin_denom: string;
  amount: string;
  staking_reserve_coins: CoinSDKType[];
}
/** HistoricalRewardsRecord is used for import/export via genesis json. */
export interface HistoricalRewardsRecord {
  stakingCoinDenom: string;
  epoch: Long;
  historicalRewards: HistoricalRewards;
}
export interface HistoricalRewardsRecordProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.HistoricalRewardsRecord";
  value: Uint8Array;
}
/** HistoricalRewardsRecord is used for import/export via genesis json. */
export interface HistoricalRewardsRecordAmino {
  staking_coin_denom: string;
  epoch: string;
  historical_rewards?: HistoricalRewardsAmino;
}
export interface HistoricalRewardsRecordAminoMsg {
  type: "/crescent.farming.v1beta1.HistoricalRewardsRecord";
  value: HistoricalRewardsRecordAmino;
}
/** HistoricalRewardsRecord is used for import/export via genesis json. */
export interface HistoricalRewardsRecordSDKType {
  staking_coin_denom: string;
  epoch: Long;
  historical_rewards: HistoricalRewardsSDKType;
}
/** OutstandingRewardsRecord is used for import/export via genesis json. */
export interface OutstandingRewardsRecord {
  stakingCoinDenom: string;
  outstandingRewards: OutstandingRewards;
}
export interface OutstandingRewardsRecordProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.OutstandingRewardsRecord";
  value: Uint8Array;
}
/** OutstandingRewardsRecord is used for import/export via genesis json. */
export interface OutstandingRewardsRecordAmino {
  staking_coin_denom: string;
  outstanding_rewards?: OutstandingRewardsAmino;
}
export interface OutstandingRewardsRecordAminoMsg {
  type: "/crescent.farming.v1beta1.OutstandingRewardsRecord";
  value: OutstandingRewardsRecordAmino;
}
/** OutstandingRewardsRecord is used for import/export via genesis json. */
export interface OutstandingRewardsRecordSDKType {
  staking_coin_denom: string;
  outstanding_rewards: OutstandingRewardsSDKType;
}
export interface UnharvestedRewardsRecord {
  farmer: string;
  stakingCoinDenom: string;
  unharvestedRewards: UnharvestedRewards;
}
export interface UnharvestedRewardsRecordProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.UnharvestedRewardsRecord";
  value: Uint8Array;
}
export interface UnharvestedRewardsRecordAmino {
  farmer: string;
  staking_coin_denom: string;
  unharvested_rewards?: UnharvestedRewardsAmino;
}
export interface UnharvestedRewardsRecordAminoMsg {
  type: "/crescent.farming.v1beta1.UnharvestedRewardsRecord";
  value: UnharvestedRewardsRecordAmino;
}
export interface UnharvestedRewardsRecordSDKType {
  farmer: string;
  staking_coin_denom: string;
  unharvested_rewards: UnharvestedRewardsSDKType;
}
/** CurrentEpochRecord is used for import/export via genesis json. */
export interface CurrentEpochRecord {
  stakingCoinDenom: string;
  currentEpoch: Long;
}
export interface CurrentEpochRecordProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.CurrentEpochRecord";
  value: Uint8Array;
}
/** CurrentEpochRecord is used for import/export via genesis json. */
export interface CurrentEpochRecordAmino {
  staking_coin_denom: string;
  current_epoch: string;
}
export interface CurrentEpochRecordAminoMsg {
  type: "/crescent.farming.v1beta1.CurrentEpochRecord";
  value: CurrentEpochRecordAmino;
}
/** CurrentEpochRecord is used for import/export via genesis json. */
export interface CurrentEpochRecordSDKType {
  staking_coin_denom: string;
  current_epoch: Long;
}