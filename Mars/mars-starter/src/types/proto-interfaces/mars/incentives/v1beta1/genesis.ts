import { Schedule, ScheduleAmino, ScheduleSDKType } from "./store";
import { Long } from "../../../helpers";
/** GenesisState defines the incentives module's genesis state */
export interface GenesisState {
  /** NextScheduleId is the id for the next incentives schedule to be created */
  nextScheduleId: Long;
  /** Schedules is an array of active incentives schedules */
  schedules: Schedule[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/mars.incentives.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the incentives module's genesis state */
export interface GenesisStateAmino {
  /** NextScheduleId is the id for the next incentives schedule to be created */
  next_schedule_id: string;
  /** Schedules is an array of active incentives schedules */
  schedules: ScheduleAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/mars.incentives.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the incentives module's genesis state */
export interface GenesisStateSDKType {
  next_schedule_id: Long;
  schedules: ScheduleSDKType[];
}
