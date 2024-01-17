import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
export interface FarmingPlan {
  id: Long;
  description: string;
  farmingPoolAddress: string;
  terminationAddress: string;
  rewardAllocations: FarmingRewardAllocation[];
  startTime: Date;
  endTime: Date;
  isPrivate: boolean;
  isTerminated: boolean;
}
export interface FarmingPlanProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.FarmingPlan";
  value: Uint8Array;
}
export interface FarmingPlanAmino {
  id: string;
  description: string;
  farming_pool_address: string;
  termination_address: string;
  reward_allocations: FarmingRewardAllocationAmino[];
  start_time?: Date;
  end_time?: Date;
  is_private: boolean;
  is_terminated: boolean;
}
export interface FarmingPlanAminoMsg {
  type: "/crescent.amm.v1beta1.FarmingPlan";
  value: FarmingPlanAmino;
}
export interface FarmingPlanSDKType {
  id: Long;
  description: string;
  farming_pool_address: string;
  termination_address: string;
  reward_allocations: FarmingRewardAllocationSDKType[];
  start_time: Date;
  end_time: Date;
  is_private: boolean;
  is_terminated: boolean;
}
export interface FarmingRewardAllocation {
  poolId: Long;
  rewardsPerDay: Coin[];
}
export interface FarmingRewardAllocationProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.FarmingRewardAllocation";
  value: Uint8Array;
}
export interface FarmingRewardAllocationAmino {
  pool_id: string;
  rewards_per_day: CoinAmino[];
}
export interface FarmingRewardAllocationAminoMsg {
  type: "/crescent.amm.v1beta1.FarmingRewardAllocation";
  value: FarmingRewardAllocationAmino;
}
export interface FarmingRewardAllocationSDKType {
  pool_id: Long;
  rewards_per_day: CoinSDKType[];
}