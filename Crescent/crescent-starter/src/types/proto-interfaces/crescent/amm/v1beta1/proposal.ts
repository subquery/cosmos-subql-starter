import { FarmingRewardAllocation, FarmingRewardAllocationAmino, FarmingRewardAllocationSDKType } from "./farming";
import { Long } from "../../../helpers";
export interface PublicFarmingPlanProposal {
  title: string;
  description: string;
  createRequests: CreatePublicFarmingPlanRequest[];
  terminateRequests: TerminateFarmingPlanRequest[];
}
export interface PublicFarmingPlanProposalProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.PublicFarmingPlanProposal";
  value: Uint8Array;
}
export interface PublicFarmingPlanProposalAmino {
  title: string;
  description: string;
  create_requests: CreatePublicFarmingPlanRequestAmino[];
  terminate_requests: TerminateFarmingPlanRequestAmino[];
}
export interface PublicFarmingPlanProposalAminoMsg {
  type: "/crescent.amm.v1beta1.PublicFarmingPlanProposal";
  value: PublicFarmingPlanProposalAmino;
}
export interface PublicFarmingPlanProposalSDKType {
  title: string;
  description: string;
  create_requests: CreatePublicFarmingPlanRequestSDKType[];
  terminate_requests: TerminateFarmingPlanRequestSDKType[];
}
export interface CreatePublicFarmingPlanRequest {
  description: string;
  farmingPoolAddress: string;
  terminationAddress: string;
  rewardAllocations: FarmingRewardAllocation[];
  startTime: Date;
  endTime: Date;
}
export interface CreatePublicFarmingPlanRequestProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.CreatePublicFarmingPlanRequest";
  value: Uint8Array;
}
export interface CreatePublicFarmingPlanRequestAmino {
  description: string;
  farming_pool_address: string;
  termination_address: string;
  reward_allocations: FarmingRewardAllocationAmino[];
  start_time?: Date;
  end_time?: Date;
}
export interface CreatePublicFarmingPlanRequestAminoMsg {
  type: "/crescent.amm.v1beta1.CreatePublicFarmingPlanRequest";
  value: CreatePublicFarmingPlanRequestAmino;
}
export interface CreatePublicFarmingPlanRequestSDKType {
  description: string;
  farming_pool_address: string;
  termination_address: string;
  reward_allocations: FarmingRewardAllocationSDKType[];
  start_time: Date;
  end_time: Date;
}
export interface TerminateFarmingPlanRequest {
  farmingPlanId: Long;
}
export interface TerminateFarmingPlanRequestProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.TerminateFarmingPlanRequest";
  value: Uint8Array;
}
export interface TerminateFarmingPlanRequestAmino {
  farming_plan_id: string;
}
export interface TerminateFarmingPlanRequestAminoMsg {
  type: "/crescent.amm.v1beta1.TerminateFarmingPlanRequest";
  value: TerminateFarmingPlanRequestAmino;
}
export interface TerminateFarmingPlanRequestSDKType {
  farming_plan_id: Long;
}
export interface PoolParameterChangeProposal {
  title: string;
  description: string;
  changes: PoolParameterChange[];
}
export interface PoolParameterChangeProposalProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.PoolParameterChangeProposal";
  value: Uint8Array;
}
export interface PoolParameterChangeProposalAmino {
  title: string;
  description: string;
  changes: PoolParameterChangeAmino[];
}
export interface PoolParameterChangeProposalAminoMsg {
  type: "/crescent.amm.v1beta1.PoolParameterChangeProposal";
  value: PoolParameterChangeProposalAmino;
}
export interface PoolParameterChangeProposalSDKType {
  title: string;
  description: string;
  changes: PoolParameterChangeSDKType[];
}
export interface PoolParameterChange {
  poolId: Long;
  tickSpacing: number;
  minOrderQuantity: string;
  minOrderQuote: string;
}
export interface PoolParameterChangeProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.PoolParameterChange";
  value: Uint8Array;
}
export interface PoolParameterChangeAmino {
  pool_id: string;
  tick_spacing: number;
  min_order_quantity: string;
  min_order_quote: string;
}
export interface PoolParameterChangeAminoMsg {
  type: "/crescent.amm.v1beta1.PoolParameterChange";
  value: PoolParameterChangeAmino;
}
export interface PoolParameterChangeSDKType {
  pool_id: Long;
  tick_spacing: number;
  min_order_quantity: string;
  min_order_quote: string;
}