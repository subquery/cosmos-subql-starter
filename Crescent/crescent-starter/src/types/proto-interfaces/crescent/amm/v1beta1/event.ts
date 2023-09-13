import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { FarmingRewardAllocation, FarmingRewardAllocationAmino, FarmingRewardAllocationSDKType } from "./farming";
import { Long } from "../../../helpers";
export interface EventCreatePool {
  creator: string;
  marketId: Long;
  price: string;
  poolId: Long;
}
export interface EventCreatePoolProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.EventCreatePool";
  value: Uint8Array;
}
export interface EventCreatePoolAmino {
  creator: string;
  market_id: string;
  price: string;
  pool_id: string;
}
export interface EventCreatePoolAminoMsg {
  type: "/crescent.amm.v1beta1.EventCreatePool";
  value: EventCreatePoolAmino;
}
export interface EventCreatePoolSDKType {
  creator: string;
  market_id: Long;
  price: string;
  pool_id: Long;
}
export interface EventAddLiquidity {
  owner: string;
  poolId: Long;
  lowerPrice: string;
  upperPrice: string;
  positionId: Long;
  liquidity: string;
  amount: Coin[];
}
export interface EventAddLiquidityProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.EventAddLiquidity";
  value: Uint8Array;
}
export interface EventAddLiquidityAmino {
  owner: string;
  pool_id: string;
  lower_price: string;
  upper_price: string;
  position_id: string;
  liquidity: string;
  amount: CoinAmino[];
}
export interface EventAddLiquidityAminoMsg {
  type: "/crescent.amm.v1beta1.EventAddLiquidity";
  value: EventAddLiquidityAmino;
}
export interface EventAddLiquiditySDKType {
  owner: string;
  pool_id: Long;
  lower_price: string;
  upper_price: string;
  position_id: Long;
  liquidity: string;
  amount: CoinSDKType[];
}
export interface EventRemoveLiquidity {
  owner: string;
  positionId: Long;
  liquidity: string;
  amount: Coin[];
}
export interface EventRemoveLiquidityProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.EventRemoveLiquidity";
  value: Uint8Array;
}
export interface EventRemoveLiquidityAmino {
  owner: string;
  position_id: string;
  liquidity: string;
  amount: CoinAmino[];
}
export interface EventRemoveLiquidityAminoMsg {
  type: "/crescent.amm.v1beta1.EventRemoveLiquidity";
  value: EventRemoveLiquidityAmino;
}
export interface EventRemoveLiquiditySDKType {
  owner: string;
  position_id: Long;
  liquidity: string;
  amount: CoinSDKType[];
}
export interface EventCollect {
  owner: string;
  positionId: Long;
  amount: Coin[];
}
export interface EventCollectProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.EventCollect";
  value: Uint8Array;
}
export interface EventCollectAmino {
  owner: string;
  position_id: string;
  amount: CoinAmino[];
}
export interface EventCollectAminoMsg {
  type: "/crescent.amm.v1beta1.EventCollect";
  value: EventCollectAmino;
}
export interface EventCollectSDKType {
  owner: string;
  position_id: Long;
  amount: CoinSDKType[];
}
export interface EventCreatePrivateFarmingPlan {
  creator: string;
  description: string;
  terminationAddress: string;
  rewardAllocations: FarmingRewardAllocation[];
  startTime: Date;
  endTime: Date;
  farmingPlanId: Long;
  farmingPoolAddress: string;
}
export interface EventCreatePrivateFarmingPlanProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.EventCreatePrivateFarmingPlan";
  value: Uint8Array;
}
export interface EventCreatePrivateFarmingPlanAmino {
  creator: string;
  description: string;
  termination_address: string;
  reward_allocations: FarmingRewardAllocationAmino[];
  start_time?: Date;
  end_time?: Date;
  farming_plan_id: string;
  farming_pool_address: string;
}
export interface EventCreatePrivateFarmingPlanAminoMsg {
  type: "/crescent.amm.v1beta1.EventCreatePrivateFarmingPlan";
  value: EventCreatePrivateFarmingPlanAmino;
}
export interface EventCreatePrivateFarmingPlanSDKType {
  creator: string;
  description: string;
  termination_address: string;
  reward_allocations: FarmingRewardAllocationSDKType[];
  start_time: Date;
  end_time: Date;
  farming_plan_id: Long;
  farming_pool_address: string;
}
export interface EventCreatePublicFarmingPlan {
  description: string;
  farmingPoolAddress: string;
  terminationAddress: string;
  rewardAllocations: FarmingRewardAllocation[];
  startTime: Date;
  endTime: Date;
  farmingPlanId: Long;
}
export interface EventCreatePublicFarmingPlanProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.EventCreatePublicFarmingPlan";
  value: Uint8Array;
}
export interface EventCreatePublicFarmingPlanAmino {
  description: string;
  farming_pool_address: string;
  termination_address: string;
  reward_allocations: FarmingRewardAllocationAmino[];
  start_time?: Date;
  end_time?: Date;
  farming_plan_id: string;
}
export interface EventCreatePublicFarmingPlanAminoMsg {
  type: "/crescent.amm.v1beta1.EventCreatePublicFarmingPlan";
  value: EventCreatePublicFarmingPlanAmino;
}
export interface EventCreatePublicFarmingPlanSDKType {
  description: string;
  farming_pool_address: string;
  termination_address: string;
  reward_allocations: FarmingRewardAllocationSDKType[];
  start_time: Date;
  end_time: Date;
  farming_plan_id: Long;
}
export interface EventFarmingPlanTerminated {
  farmingPlanId: Long;
}
export interface EventFarmingPlanTerminatedProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.EventFarmingPlanTerminated";
  value: Uint8Array;
}
export interface EventFarmingPlanTerminatedAmino {
  farming_plan_id: string;
}
export interface EventFarmingPlanTerminatedAminoMsg {
  type: "/crescent.amm.v1beta1.EventFarmingPlanTerminated";
  value: EventFarmingPlanTerminatedAmino;
}
export interface EventFarmingPlanTerminatedSDKType {
  farming_plan_id: Long;
}
export interface EventPoolParameterChanged {
  poolId: Long;
  tickSpacing: number;
  minOrderQuantity: string;
  minOrderQuote: string;
}
export interface EventPoolParameterChangedProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.EventPoolParameterChanged";
  value: Uint8Array;
}
export interface EventPoolParameterChangedAmino {
  pool_id: string;
  tick_spacing: number;
  min_order_quantity: string;
  min_order_quote: string;
}
export interface EventPoolParameterChangedAminoMsg {
  type: "/crescent.amm.v1beta1.EventPoolParameterChanged";
  value: EventPoolParameterChangedAmino;
}
export interface EventPoolParameterChangedSDKType {
  pool_id: Long;
  tick_spacing: number;
  min_order_quantity: string;
  min_order_quote: string;
}