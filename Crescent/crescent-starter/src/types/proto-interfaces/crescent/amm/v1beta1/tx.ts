import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { FarmingRewardAllocation, FarmingRewardAllocationAmino, FarmingRewardAllocationSDKType } from "./farming";
import { Long } from "../../../helpers";
export interface MsgCreatePool {
  sender: string;
  marketId: Long;
  price: string;
}
export interface MsgCreatePoolProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.MsgCreatePool";
  value: Uint8Array;
}
export interface MsgCreatePoolAmino {
  sender: string;
  market_id: string;
  price: string;
}
export interface MsgCreatePoolAminoMsg {
  type: "/crescent.amm.v1beta1.MsgCreatePool";
  value: MsgCreatePoolAmino;
}
export interface MsgCreatePoolSDKType {
  sender: string;
  market_id: Long;
  price: string;
}
export interface MsgCreatePoolResponse {
  poolId: Long;
}
export interface MsgCreatePoolResponseProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.MsgCreatePoolResponse";
  value: Uint8Array;
}
export interface MsgCreatePoolResponseAmino {
  pool_id: string;
}
export interface MsgCreatePoolResponseAminoMsg {
  type: "/crescent.amm.v1beta1.MsgCreatePoolResponse";
  value: MsgCreatePoolResponseAmino;
}
export interface MsgCreatePoolResponseSDKType {
  pool_id: Long;
}
export interface MsgAddLiquidity {
  sender: string;
  poolId: Long;
  lowerPrice: string;
  upperPrice: string;
  desiredAmount: Coin[];
}
export interface MsgAddLiquidityProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.MsgAddLiquidity";
  value: Uint8Array;
}
export interface MsgAddLiquidityAmino {
  sender: string;
  pool_id: string;
  lower_price: string;
  upper_price: string;
  desired_amount: CoinAmino[];
}
export interface MsgAddLiquidityAminoMsg {
  type: "/crescent.amm.v1beta1.MsgAddLiquidity";
  value: MsgAddLiquidityAmino;
}
export interface MsgAddLiquiditySDKType {
  sender: string;
  pool_id: Long;
  lower_price: string;
  upper_price: string;
  desired_amount: CoinSDKType[];
}
export interface MsgAddLiquidityResponse {
  positionId: Long;
  liquidity: string;
  amount: Coin[];
}
export interface MsgAddLiquidityResponseProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.MsgAddLiquidityResponse";
  value: Uint8Array;
}
export interface MsgAddLiquidityResponseAmino {
  position_id: string;
  liquidity: string;
  amount: CoinAmino[];
}
export interface MsgAddLiquidityResponseAminoMsg {
  type: "/crescent.amm.v1beta1.MsgAddLiquidityResponse";
  value: MsgAddLiquidityResponseAmino;
}
export interface MsgAddLiquidityResponseSDKType {
  position_id: Long;
  liquidity: string;
  amount: CoinSDKType[];
}
export interface MsgRemoveLiquidity {
  sender: string;
  positionId: Long;
  liquidity: string;
}
export interface MsgRemoveLiquidityProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.MsgRemoveLiquidity";
  value: Uint8Array;
}
export interface MsgRemoveLiquidityAmino {
  sender: string;
  position_id: string;
  liquidity: string;
}
export interface MsgRemoveLiquidityAminoMsg {
  type: "/crescent.amm.v1beta1.MsgRemoveLiquidity";
  value: MsgRemoveLiquidityAmino;
}
export interface MsgRemoveLiquiditySDKType {
  sender: string;
  position_id: Long;
  liquidity: string;
}
export interface MsgRemoveLiquidityResponse {
  amount: Coin[];
}
export interface MsgRemoveLiquidityResponseProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.MsgRemoveLiquidityResponse";
  value: Uint8Array;
}
export interface MsgRemoveLiquidityResponseAmino {
  amount: CoinAmino[];
}
export interface MsgRemoveLiquidityResponseAminoMsg {
  type: "/crescent.amm.v1beta1.MsgRemoveLiquidityResponse";
  value: MsgRemoveLiquidityResponseAmino;
}
export interface MsgRemoveLiquidityResponseSDKType {
  amount: CoinSDKType[];
}
export interface MsgCollect {
  sender: string;
  positionId: Long;
  /** TODO: if amount is nil, collect all? */
  amount: Coin[];
}
export interface MsgCollectProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.MsgCollect";
  value: Uint8Array;
}
export interface MsgCollectAmino {
  sender: string;
  position_id: string;
  /** TODO: if amount is nil, collect all? */
  amount: CoinAmino[];
}
export interface MsgCollectAminoMsg {
  type: "/crescent.amm.v1beta1.MsgCollect";
  value: MsgCollectAmino;
}
export interface MsgCollectSDKType {
  sender: string;
  position_id: Long;
  amount: CoinSDKType[];
}
export interface MsgCollectResponse {}
export interface MsgCollectResponseProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.MsgCollectResponse";
  value: Uint8Array;
}
export interface MsgCollectResponseAmino {}
export interface MsgCollectResponseAminoMsg {
  type: "/crescent.amm.v1beta1.MsgCollectResponse";
  value: MsgCollectResponseAmino;
}
export interface MsgCollectResponseSDKType {}
export interface MsgCreatePrivateFarmingPlan {
  sender: string;
  description: string;
  terminationAddress: string;
  rewardAllocations: FarmingRewardAllocation[];
  startTime: Date;
  endTime: Date;
}
export interface MsgCreatePrivateFarmingPlanProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.MsgCreatePrivateFarmingPlan";
  value: Uint8Array;
}
export interface MsgCreatePrivateFarmingPlanAmino {
  sender: string;
  description: string;
  termination_address: string;
  reward_allocations: FarmingRewardAllocationAmino[];
  start_time?: Date;
  end_time?: Date;
}
export interface MsgCreatePrivateFarmingPlanAminoMsg {
  type: "/crescent.amm.v1beta1.MsgCreatePrivateFarmingPlan";
  value: MsgCreatePrivateFarmingPlanAmino;
}
export interface MsgCreatePrivateFarmingPlanSDKType {
  sender: string;
  description: string;
  termination_address: string;
  reward_allocations: FarmingRewardAllocationSDKType[];
  start_time: Date;
  end_time: Date;
}
export interface MsgCreatePrivateFarmingPlanResponse {
  farmingPlanId: Long;
  farmingPoolAddress: string;
}
export interface MsgCreatePrivateFarmingPlanResponseProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.MsgCreatePrivateFarmingPlanResponse";
  value: Uint8Array;
}
export interface MsgCreatePrivateFarmingPlanResponseAmino {
  farming_plan_id: string;
  farming_pool_address: string;
}
export interface MsgCreatePrivateFarmingPlanResponseAminoMsg {
  type: "/crescent.amm.v1beta1.MsgCreatePrivateFarmingPlanResponse";
  value: MsgCreatePrivateFarmingPlanResponseAmino;
}
export interface MsgCreatePrivateFarmingPlanResponseSDKType {
  farming_plan_id: Long;
  farming_pool_address: string;
}
export interface MsgTerminatePrivateFarmingPlan {
  sender: string;
  farmingPlanId: Long;
}
export interface MsgTerminatePrivateFarmingPlanProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.MsgTerminatePrivateFarmingPlan";
  value: Uint8Array;
}
export interface MsgTerminatePrivateFarmingPlanAmino {
  sender: string;
  farming_plan_id: string;
}
export interface MsgTerminatePrivateFarmingPlanAminoMsg {
  type: "/crescent.amm.v1beta1.MsgTerminatePrivateFarmingPlan";
  value: MsgTerminatePrivateFarmingPlanAmino;
}
export interface MsgTerminatePrivateFarmingPlanSDKType {
  sender: string;
  farming_plan_id: Long;
}
export interface MsgTerminatePrivateFarmingPlanResponse {}
export interface MsgTerminatePrivateFarmingPlanResponseProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.MsgTerminatePrivateFarmingPlanResponse";
  value: Uint8Array;
}
export interface MsgTerminatePrivateFarmingPlanResponseAmino {}
export interface MsgTerminatePrivateFarmingPlanResponseAminoMsg {
  type: "/crescent.amm.v1beta1.MsgTerminatePrivateFarmingPlanResponse";
  value: MsgTerminatePrivateFarmingPlanResponseAmino;
}
export interface MsgTerminatePrivateFarmingPlanResponseSDKType {}