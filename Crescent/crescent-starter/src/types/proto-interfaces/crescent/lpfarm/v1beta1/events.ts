import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
export interface EventCreatePrivatePlan {
  creator: string;
  planId: Long;
  farmingPoolAddress: string;
}
export interface EventCreatePrivatePlanProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.EventCreatePrivatePlan";
  value: Uint8Array;
}
export interface EventCreatePrivatePlanAmino {
  creator: string;
  plan_id: string;
  farming_pool_address: string;
}
export interface EventCreatePrivatePlanAminoMsg {
  type: "/crescent.lpfarm.v1beta1.EventCreatePrivatePlan";
  value: EventCreatePrivatePlanAmino;
}
export interface EventCreatePrivatePlanSDKType {
  creator: string;
  plan_id: Long;
  farming_pool_address: string;
}
export interface EventFarm {
  farmer: string;
  coin: Coin;
  withdrawnRewards: Coin[];
}
export interface EventFarmProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.EventFarm";
  value: Uint8Array;
}
export interface EventFarmAmino {
  farmer: string;
  coin?: CoinAmino;
  withdrawn_rewards: CoinAmino[];
}
export interface EventFarmAminoMsg {
  type: "/crescent.lpfarm.v1beta1.EventFarm";
  value: EventFarmAmino;
}
export interface EventFarmSDKType {
  farmer: string;
  coin: CoinSDKType;
  withdrawn_rewards: CoinSDKType[];
}
export interface EventUnfarm {
  farmer: string;
  coin: Coin;
  withdrawnRewards: Coin[];
}
export interface EventUnfarmProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.EventUnfarm";
  value: Uint8Array;
}
export interface EventUnfarmAmino {
  farmer: string;
  coin?: CoinAmino;
  withdrawn_rewards: CoinAmino[];
}
export interface EventUnfarmAminoMsg {
  type: "/crescent.lpfarm.v1beta1.EventUnfarm";
  value: EventUnfarmAmino;
}
export interface EventUnfarmSDKType {
  farmer: string;
  coin: CoinSDKType;
  withdrawn_rewards: CoinSDKType[];
}
export interface EventHarvest {
  farmer: string;
  denom: string;
  withdrawnRewards: Coin[];
}
export interface EventHarvestProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.EventHarvest";
  value: Uint8Array;
}
export interface EventHarvestAmino {
  farmer: string;
  denom: string;
  withdrawn_rewards: CoinAmino[];
}
export interface EventHarvestAminoMsg {
  type: "/crescent.lpfarm.v1beta1.EventHarvest";
  value: EventHarvestAmino;
}
export interface EventHarvestSDKType {
  farmer: string;
  denom: string;
  withdrawn_rewards: CoinSDKType[];
}
export interface EventTerminatePlan {
  planId: Long;
}
export interface EventTerminatePlanProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.EventTerminatePlan";
  value: Uint8Array;
}
export interface EventTerminatePlanAmino {
  plan_id: string;
}
export interface EventTerminatePlanAminoMsg {
  type: "/crescent.lpfarm.v1beta1.EventTerminatePlan";
  value: EventTerminatePlanAmino;
}
export interface EventTerminatePlanSDKType {
  plan_id: Long;
}