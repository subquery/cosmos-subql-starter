import { Coin, CoinAmino, CoinSDKType, DecCoin, DecCoinAmino, DecCoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { Long } from "../../../helpers";
export interface Params {
  privatePlanCreationFee: Coin[];
  feeCollector: string;
  maxNumPrivatePlans: number;
  maxBlockDuration: Duration;
}
export interface ParamsProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.Params";
  value: Uint8Array;
}
export interface ParamsAmino {
  private_plan_creation_fee: CoinAmino[];
  fee_collector: string;
  max_num_private_plans: number;
  max_block_duration?: DurationAmino;
}
export interface ParamsAminoMsg {
  type: "/crescent.lpfarm.v1beta1.Params";
  value: ParamsAmino;
}
export interface ParamsSDKType {
  private_plan_creation_fee: CoinSDKType[];
  fee_collector: string;
  max_num_private_plans: number;
  max_block_duration: DurationSDKType;
}
export interface Plan {
  id: Long;
  description: string;
  farmingPoolAddress: string;
  terminationAddress: string;
  rewardAllocations: RewardAllocation[];
  startTime: Date;
  endTime: Date;
  isPrivate: boolean;
  isTerminated: boolean;
}
export interface PlanProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.Plan";
  value: Uint8Array;
}
export interface PlanAmino {
  id: string;
  description: string;
  farming_pool_address: string;
  termination_address: string;
  reward_allocations: RewardAllocationAmino[];
  start_time?: Date;
  end_time?: Date;
  is_private: boolean;
  is_terminated: boolean;
}
export interface PlanAminoMsg {
  type: "/crescent.lpfarm.v1beta1.Plan";
  value: PlanAmino;
}
export interface PlanSDKType {
  id: Long;
  description: string;
  farming_pool_address: string;
  termination_address: string;
  reward_allocations: RewardAllocationSDKType[];
  start_time: Date;
  end_time: Date;
  is_private: boolean;
  is_terminated: boolean;
}
export interface RewardAllocation {
  denom: string;
  pairId: Long;
  rewardsPerDay: Coin[];
}
export interface RewardAllocationProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.RewardAllocation";
  value: Uint8Array;
}
export interface RewardAllocationAmino {
  denom: string;
  pair_id: string;
  rewards_per_day: CoinAmino[];
}
export interface RewardAllocationAminoMsg {
  type: "/crescent.lpfarm.v1beta1.RewardAllocation";
  value: RewardAllocationAmino;
}
export interface RewardAllocationSDKType {
  denom: string;
  pair_id: Long;
  rewards_per_day: CoinSDKType[];
}
export interface Farm {
  totalFarmingAmount: string;
  currentRewards: DecCoin[];
  outstandingRewards: DecCoin[];
  period: Long;
  previousShare: string;
}
export interface FarmProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.Farm";
  value: Uint8Array;
}
export interface FarmAmino {
  total_farming_amount: string;
  current_rewards: DecCoinAmino[];
  outstanding_rewards: DecCoinAmino[];
  period: string;
  previous_share: string;
}
export interface FarmAminoMsg {
  type: "/crescent.lpfarm.v1beta1.Farm";
  value: FarmAmino;
}
export interface FarmSDKType {
  total_farming_amount: string;
  current_rewards: DecCoinSDKType[];
  outstanding_rewards: DecCoinSDKType[];
  period: Long;
  previous_share: string;
}
export interface Position {
  farmer: string;
  denom: string;
  farmingAmount: string;
  previousPeriod: Long;
  startingBlockHeight: Long;
}
export interface PositionProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.Position";
  value: Uint8Array;
}
export interface PositionAmino {
  farmer: string;
  denom: string;
  farming_amount: string;
  previous_period: string;
  starting_block_height: string;
}
export interface PositionAminoMsg {
  type: "/crescent.lpfarm.v1beta1.Position";
  value: PositionAmino;
}
export interface PositionSDKType {
  farmer: string;
  denom: string;
  farming_amount: string;
  previous_period: Long;
  starting_block_height: Long;
}
export interface HistoricalRewards {
  cumulativeUnitRewards: DecCoin[];
  referenceCount: number;
}
export interface HistoricalRewardsProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.HistoricalRewards";
  value: Uint8Array;
}
export interface HistoricalRewardsAmino {
  cumulative_unit_rewards: DecCoinAmino[];
  reference_count: number;
}
export interface HistoricalRewardsAminoMsg {
  type: "/crescent.lpfarm.v1beta1.HistoricalRewards";
  value: HistoricalRewardsAmino;
}
export interface HistoricalRewardsSDKType {
  cumulative_unit_rewards: DecCoinSDKType[];
  reference_count: number;
}