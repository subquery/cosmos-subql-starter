import { Params, ParamsAmino, ParamsSDKType, Plan, PlanAmino, PlanSDKType, Position, PositionAmino, PositionSDKType, Farm, FarmAmino, FarmSDKType, HistoricalRewards, HistoricalRewardsAmino, HistoricalRewardsSDKType } from "./lpfarm";
import { Long } from "../../../helpers";
export interface GenesisState {
  params: Params;
  lastBlockTime: Date;
  lastPlanId: Long;
  numPrivatePlans: Long;
  plans: Plan[];
  farms: FarmRecord[];
  positions: Position[];
  historicalRewards: HistoricalRewardsRecord[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.GenesisState";
  value: Uint8Array;
}
export interface GenesisStateAmino {
  params?: ParamsAmino;
  last_block_time?: Date;
  last_plan_id: string;
  num_private_plans: string;
  plans: PlanAmino[];
  farms: FarmRecordAmino[];
  positions: PositionAmino[];
  historical_rewards: HistoricalRewardsRecordAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/crescent.lpfarm.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  last_block_time: Date;
  last_plan_id: Long;
  num_private_plans: Long;
  plans: PlanSDKType[];
  farms: FarmRecordSDKType[];
  positions: PositionSDKType[];
  historical_rewards: HistoricalRewardsRecordSDKType[];
}
export interface FarmRecord {
  denom: string;
  farm: Farm;
}
export interface FarmRecordProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.FarmRecord";
  value: Uint8Array;
}
export interface FarmRecordAmino {
  denom: string;
  farm?: FarmAmino;
}
export interface FarmRecordAminoMsg {
  type: "/crescent.lpfarm.v1beta1.FarmRecord";
  value: FarmRecordAmino;
}
export interface FarmRecordSDKType {
  denom: string;
  farm: FarmSDKType;
}
export interface HistoricalRewardsRecord {
  denom: string;
  period: Long;
  historicalRewards: HistoricalRewards;
}
export interface HistoricalRewardsRecordProtoMsg {
  typeUrl: "/crescent.lpfarm.v1beta1.HistoricalRewardsRecord";
  value: Uint8Array;
}
export interface HistoricalRewardsRecordAmino {
  denom: string;
  period: string;
  historical_rewards?: HistoricalRewardsAmino;
}
export interface HistoricalRewardsRecordAminoMsg {
  type: "/crescent.lpfarm.v1beta1.HistoricalRewardsRecord";
  value: HistoricalRewardsRecordAmino;
}
export interface HistoricalRewardsRecordSDKType {
  denom: string;
  period: Long;
  historical_rewards: HistoricalRewardsSDKType;
}