import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
/** Params holds parameters for the mint module. */
export interface Params {
  /** mint_denom defines denomination of coin to be minted */
  mintDenom: string;
  /**
   * mint_pool_address defines the address where inflation will be minted. The default is FeeCollector,
   * but if it is set to FeeCollector, minted inflation could be mixed together with collected tx fees.
   * Therefore, it is recommended to specify a separate address depending on usage.
   */
  mintPoolAddress: string;
  /**
   * block_time_threshold defines block time threshold to prevent from any inflationary manipulation attacks
   * it is used for maximum block duration when calculating block inflation
   */
  blockTimeThreshold: Duration;
  /** inflation_schedules defines a list of inflation schedules */
  inflationSchedules: InflationSchedule[];
}
export interface ParamsProtoMsg {
  typeUrl: "/crescent.mint.v1beta1.Params";
  value: Uint8Array;
}
/** Params holds parameters for the mint module. */
export interface ParamsAmino {
  /** mint_denom defines denomination of coin to be minted */
  mint_denom: string;
  /**
   * mint_pool_address defines the address where inflation will be minted. The default is FeeCollector,
   * but if it is set to FeeCollector, minted inflation could be mixed together with collected tx fees.
   * Therefore, it is recommended to specify a separate address depending on usage.
   */
  mint_pool_address: string;
  /**
   * block_time_threshold defines block time threshold to prevent from any inflationary manipulation attacks
   * it is used for maximum block duration when calculating block inflation
   */
  block_time_threshold?: DurationAmino;
  /** inflation_schedules defines a list of inflation schedules */
  inflation_schedules: InflationScheduleAmino[];
}
export interface ParamsAminoMsg {
  type: "/crescent.mint.v1beta1.Params";
  value: ParamsAmino;
}
/** Params holds parameters for the mint module. */
export interface ParamsSDKType {
  mint_denom: string;
  mint_pool_address: string;
  block_time_threshold: DurationSDKType;
  inflation_schedules: InflationScheduleSDKType[];
}
/**
 * InflationSchedule defines the start and end time of the inflation period, and the amount of inflation during that
 * period.
 */
export interface InflationSchedule {
  /** start_time defines the start date time for the inflation schedule */
  startTime: Date;
  /** end_time defines the end date time for the inflation schedule */
  endTime: Date;
  /** amount defines the total amount of inflation for the schedule */
  amount: string;
}
export interface InflationScheduleProtoMsg {
  typeUrl: "/crescent.mint.v1beta1.InflationSchedule";
  value: Uint8Array;
}
/**
 * InflationSchedule defines the start and end time of the inflation period, and the amount of inflation during that
 * period.
 */
export interface InflationScheduleAmino {
  /** start_time defines the start date time for the inflation schedule */
  start_time?: Date;
  /** end_time defines the end date time for the inflation schedule */
  end_time?: Date;
  /** amount defines the total amount of inflation for the schedule */
  amount: string;
}
export interface InflationScheduleAminoMsg {
  type: "/crescent.mint.v1beta1.InflationSchedule";
  value: InflationScheduleAmino;
}
/**
 * InflationSchedule defines the start and end time of the inflation period, and the amount of inflation during that
 * period.
 */
export interface InflationScheduleSDKType {
  start_time: Date;
  end_time: Date;
  amount: string;
}