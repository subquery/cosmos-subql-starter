import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Position, PositionAmino, PositionSDKType, Pool, PoolAmino, PoolSDKType, PoolState, PoolStateAmino, PoolStateSDKType, TickInfo, TickInfoAmino, TickInfoSDKType } from "./amm";
import { FarmingPlan, FarmingPlanAmino, FarmingPlanSDKType } from "./farming";
import { Long } from "../../../helpers";
export interface GenesisState {
  params: Params;
  lastPoolId: Long;
  lastPositionId: Long;
  poolRecords: PoolRecord[];
  positions: Position[];
  tickInfoRecords: TickInfoRecord[];
  lastFarmingPlanId: Long;
  numPrivateFarmingPlans: number;
  farmingPlans: FarmingPlan[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.GenesisState";
  value: Uint8Array;
}
export interface GenesisStateAmino {
  params?: ParamsAmino;
  last_pool_id: string;
  last_position_id: string;
  pool_records: PoolRecordAmino[];
  positions: PositionAmino[];
  tick_info_records: TickInfoRecordAmino[];
  last_farming_plan_id: string;
  num_private_farming_plans: number;
  farming_plans: FarmingPlanAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/crescent.amm.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  last_pool_id: Long;
  last_position_id: Long;
  pool_records: PoolRecordSDKType[];
  positions: PositionSDKType[];
  tick_info_records: TickInfoRecordSDKType[];
  last_farming_plan_id: Long;
  num_private_farming_plans: number;
  farming_plans: FarmingPlanSDKType[];
}
export interface PoolRecord {
  pool: Pool;
  state: PoolState;
}
export interface PoolRecordProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.PoolRecord";
  value: Uint8Array;
}
export interface PoolRecordAmino {
  pool?: PoolAmino;
  state?: PoolStateAmino;
}
export interface PoolRecordAminoMsg {
  type: "/crescent.amm.v1beta1.PoolRecord";
  value: PoolRecordAmino;
}
export interface PoolRecordSDKType {
  pool: PoolSDKType;
  state: PoolStateSDKType;
}
export interface TickInfoRecord {
  poolId: Long;
  tick: number;
  tickInfo: TickInfo;
}
export interface TickInfoRecordProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.TickInfoRecord";
  value: Uint8Array;
}
export interface TickInfoRecordAmino {
  pool_id: string;
  tick: number;
  tick_info?: TickInfoAmino;
}
export interface TickInfoRecordAminoMsg {
  type: "/crescent.amm.v1beta1.TickInfoRecord";
  value: TickInfoRecordAmino;
}
export interface TickInfoRecordSDKType {
  pool_id: Long;
  tick: number;
  tick_info: TickInfoSDKType;
}