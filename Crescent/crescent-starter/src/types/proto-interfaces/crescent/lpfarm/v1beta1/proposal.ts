import { RewardAllocation, RewardAllocationAmino, RewardAllocationSDKType } from "./lpfarm";
import { Long } from "../../../helpers";
export interface FarmingPlanProposal {
  title: string;
  description: string;
  createPlanRequests: CreatePlanRequest[];
  terminatePlanRequests: TerminatePlanRequest[];
}
export interface FarmingPlanProposalProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.FarmingPlanProposal";
  value: Uint8Array;
}
export interface FarmingPlanProposalAmino {
  title: string;
  description: string;
  create_plan_requests: CreatePlanRequestAmino[];
  terminate_plan_requests: TerminatePlanRequestAmino[];
}
export interface FarmingPlanProposalAminoMsg {
  type: "/crescent.lpfarm.v1beta1.FarmingPlanProposal";
  value: FarmingPlanProposalAmino;
}
export interface FarmingPlanProposalSDKType {
  title: string;
  description: string;
  create_plan_requests: CreatePlanRequestSDKType[];
  terminate_plan_requests: TerminatePlanRequestSDKType[];
}
export interface CreatePlanRequest {
  description: string;
  farmingPoolAddress: string;
  rewardAllocations: RewardAllocation[];
  startTime: Date;
  endTime: Date;
}
export interface CreatePlanRequestProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.CreatePlanRequest";
  value: Uint8Array;
}
export interface CreatePlanRequestAmino {
  description: string;
  farming_pool_address: string;
  reward_allocations: RewardAllocationAmino[];
  start_time?: Date;
  end_time?: Date;
}
export interface CreatePlanRequestAminoMsg {
  type: "/crescent.lpfarm.v1beta1.CreatePlanRequest";
  value: CreatePlanRequestAmino;
}
export interface CreatePlanRequestSDKType {
  description: string;
  farming_pool_address: string;
  reward_allocations: RewardAllocationSDKType[];
  start_time: Date;
  end_time: Date;
}
export interface TerminatePlanRequest {
  planId: Long;
}
export interface TerminatePlanRequestProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.TerminatePlanRequest";
  value: Uint8Array;
}
export interface TerminatePlanRequestAmino {
  plan_id: string;
}
export interface TerminatePlanRequestAminoMsg {
  type: "/crescent.lpfarm.v1beta1.TerminatePlanRequest";
  value: TerminatePlanRequestAmino;
}
export interface TerminatePlanRequestSDKType {
  plan_id: Long;
}