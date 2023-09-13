import { RewardAllocation, RewardAllocationAmino, RewardAllocationSDKType } from "./lpfarm";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
export interface MsgCreatePrivatePlan {
  creator: string;
  description: string;
  rewardAllocations: RewardAllocation[];
  startTime: Date;
  endTime: Date;
}
export interface MsgCreatePrivatePlanProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.MsgCreatePrivatePlan";
  value: Uint8Array;
}
export interface MsgCreatePrivatePlanAmino {
  creator: string;
  description: string;
  reward_allocations: RewardAllocationAmino[];
  start_time?: Date;
  end_time?: Date;
}
export interface MsgCreatePrivatePlanAminoMsg {
  type: "/crescent.lpfarm.v1beta1.MsgCreatePrivatePlan";
  value: MsgCreatePrivatePlanAmino;
}
export interface MsgCreatePrivatePlanSDKType {
  creator: string;
  description: string;
  reward_allocations: RewardAllocationSDKType[];
  start_time: Date;
  end_time: Date;
}
export interface MsgCreatePrivatePlanResponse {
  planId: Long;
  farmingPoolAddress: string;
}
export interface MsgCreatePrivatePlanResponseProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.MsgCreatePrivatePlanResponse";
  value: Uint8Array;
}
export interface MsgCreatePrivatePlanResponseAmino {
  plan_id: string;
  farming_pool_address: string;
}
export interface MsgCreatePrivatePlanResponseAminoMsg {
  type: "/crescent.lpfarm.v1beta1.MsgCreatePrivatePlanResponse";
  value: MsgCreatePrivatePlanResponseAmino;
}
export interface MsgCreatePrivatePlanResponseSDKType {
  plan_id: Long;
  farming_pool_address: string;
}
export interface MsgTerminatePrivatePlan {
  creator: string;
  planId: Long;
}
export interface MsgTerminatePrivatePlanProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.MsgTerminatePrivatePlan";
  value: Uint8Array;
}
export interface MsgTerminatePrivatePlanAmino {
  creator: string;
  plan_id: string;
}
export interface MsgTerminatePrivatePlanAminoMsg {
  type: "/crescent.lpfarm.v1beta1.MsgTerminatePrivatePlan";
  value: MsgTerminatePrivatePlanAmino;
}
export interface MsgTerminatePrivatePlanSDKType {
  creator: string;
  plan_id: Long;
}
export interface MsgTerminatePrivatePlanResponse {}
export interface MsgTerminatePrivatePlanResponseProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.MsgTerminatePrivatePlanResponse";
  value: Uint8Array;
}
export interface MsgTerminatePrivatePlanResponseAmino {}
export interface MsgTerminatePrivatePlanResponseAminoMsg {
  type: "/crescent.lpfarm.v1beta1.MsgTerminatePrivatePlanResponse";
  value: MsgTerminatePrivatePlanResponseAmino;
}
export interface MsgTerminatePrivatePlanResponseSDKType {}
export interface MsgFarm {
  farmer: string;
  coin: Coin;
}
export interface MsgFarmProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.MsgFarm";
  value: Uint8Array;
}
export interface MsgFarmAmino {
  farmer: string;
  coin?: CoinAmino;
}
export interface MsgFarmAminoMsg {
  type: "/crescent.lpfarm.v1beta1.MsgFarm";
  value: MsgFarmAmino;
}
export interface MsgFarmSDKType {
  farmer: string;
  coin: CoinSDKType;
}
export interface MsgFarmResponse {
  withdrawnRewards: Coin[];
}
export interface MsgFarmResponseProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.MsgFarmResponse";
  value: Uint8Array;
}
export interface MsgFarmResponseAmino {
  withdrawn_rewards: CoinAmino[];
}
export interface MsgFarmResponseAminoMsg {
  type: "/crescent.lpfarm.v1beta1.MsgFarmResponse";
  value: MsgFarmResponseAmino;
}
export interface MsgFarmResponseSDKType {
  withdrawn_rewards: CoinSDKType[];
}
export interface MsgUnfarm {
  farmer: string;
  coin: Coin;
}
export interface MsgUnfarmProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.MsgUnfarm";
  value: Uint8Array;
}
export interface MsgUnfarmAmino {
  farmer: string;
  coin?: CoinAmino;
}
export interface MsgUnfarmAminoMsg {
  type: "/crescent.lpfarm.v1beta1.MsgUnfarm";
  value: MsgUnfarmAmino;
}
export interface MsgUnfarmSDKType {
  farmer: string;
  coin: CoinSDKType;
}
export interface MsgUnfarmResponse {
  withdrawnRewards: Coin[];
}
export interface MsgUnfarmResponseProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.MsgUnfarmResponse";
  value: Uint8Array;
}
export interface MsgUnfarmResponseAmino {
  withdrawn_rewards: CoinAmino[];
}
export interface MsgUnfarmResponseAminoMsg {
  type: "/crescent.lpfarm.v1beta1.MsgUnfarmResponse";
  value: MsgUnfarmResponseAmino;
}
export interface MsgUnfarmResponseSDKType {
  withdrawn_rewards: CoinSDKType[];
}
export interface MsgHarvest {
  farmer: string;
  denom: string;
}
export interface MsgHarvestProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.MsgHarvest";
  value: Uint8Array;
}
export interface MsgHarvestAmino {
  farmer: string;
  denom: string;
}
export interface MsgHarvestAminoMsg {
  type: "/crescent.lpfarm.v1beta1.MsgHarvest";
  value: MsgHarvestAmino;
}
export interface MsgHarvestSDKType {
  farmer: string;
  denom: string;
}
export interface MsgHarvestResponse {
  withdrawnRewards: Coin[];
}
export interface MsgHarvestResponseProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.MsgHarvestResponse";
  value: Uint8Array;
}
export interface MsgHarvestResponseAmino {
  withdrawn_rewards: CoinAmino[];
}
export interface MsgHarvestResponseAminoMsg {
  type: "/crescent.lpfarm.v1beta1.MsgHarvestResponse";
  value: MsgHarvestResponseAmino;
}
export interface MsgHarvestResponseSDKType {
  withdrawn_rewards: CoinSDKType[];
}