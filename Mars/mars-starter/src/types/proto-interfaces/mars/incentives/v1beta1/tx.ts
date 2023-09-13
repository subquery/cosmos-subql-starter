import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
/**
 * MsgCreateSchedule defines the message for creating a new incentives schedule.
 * 
 * This message is typically executed via a governance proposal with the gov
 * module being the executing authority.
 */
export interface MsgCreateSchedule {
  /**
   * Authority is the account executing the safety fund spend.
   * It should be the gov module account.
   */
  authority: string;
  /** StartTime is the timestamp at which this incentives schedule shall begin. */
  startTime: Date;
  /** EndTime is the timestamp at which this incentives schedule shall finish. */
  endTime: Date;
  /**
   * Amount is the total amount of coins that shall be released to stakers
   * throughout the span of this incentives schedule.
   */
  amount: Coin[];
}
export interface MsgCreateScheduleProtoMsg {
  typeUrl: "/mars.incentives.v1beta1.MsgCreateSchedule";
  value: Uint8Array;
}
/**
 * MsgCreateSchedule defines the message for creating a new incentives schedule.
 * 
 * This message is typically executed via a governance proposal with the gov
 * module being the executing authority.
 */
export interface MsgCreateScheduleAmino {
  /**
   * Authority is the account executing the safety fund spend.
   * It should be the gov module account.
   */
  authority: string;
  /** StartTime is the timestamp at which this incentives schedule shall begin. */
  start_time?: Date;
  /** EndTime is the timestamp at which this incentives schedule shall finish. */
  end_time?: Date;
  /**
   * Amount is the total amount of coins that shall be released to stakers
   * throughout the span of this incentives schedule.
   */
  amount: CoinAmino[];
}
export interface MsgCreateScheduleAminoMsg {
  type: "/mars.incentives.v1beta1.MsgCreateSchedule";
  value: MsgCreateScheduleAmino;
}
/**
 * MsgCreateSchedule defines the message for creating a new incentives schedule.
 * 
 * This message is typically executed via a governance proposal with the gov
 * module being the executing authority.
 */
export interface MsgCreateScheduleSDKType {
  authority: string;
  start_time: Date;
  end_time: Date;
  amount: CoinSDKType[];
}
/**
 * MsgCreateScheduleResponse defines the response to executing a
 * MsgCreateSchedule message.
 */
export interface MsgCreateScheduleResponse {}
export interface MsgCreateScheduleResponseProtoMsg {
  typeUrl: "/mars.incentives.v1beta1.MsgCreateScheduleResponse";
  value: Uint8Array;
}
/**
 * MsgCreateScheduleResponse defines the response to executing a
 * MsgCreateSchedule message.
 */
export interface MsgCreateScheduleResponseAmino {}
export interface MsgCreateScheduleResponseAminoMsg {
  type: "/mars.incentives.v1beta1.MsgCreateScheduleResponse";
  value: MsgCreateScheduleResponseAmino;
}
/**
 * MsgCreateScheduleResponse defines the response to executing a
 * MsgCreateSchedule message.
 */
export interface MsgCreateScheduleResponseSDKType {}
/**
 * MsgTerminateSchedules defines the message for terminating one or more
 * existing incentives schedules.
 * 
 * This message is typically executed via a governance proposal with the gov
 * module being the executing authority.
 */
export interface MsgTerminateSchedules {
  /**
   * Authority is the account executing the safety fund spend.
   * It should be the gov module account.
   */
  authority: string;
  /**
   * Ids is the array of identifiers of the incentives schedules which are to be
   * terminated.
   */
  ids: Long[];
}
export interface MsgTerminateSchedulesProtoMsg {
  typeUrl: "/mars.incentives.v1beta1.MsgTerminateSchedules";
  value: Uint8Array;
}
/**
 * MsgTerminateSchedules defines the message for terminating one or more
 * existing incentives schedules.
 * 
 * This message is typically executed via a governance proposal with the gov
 * module being the executing authority.
 */
export interface MsgTerminateSchedulesAmino {
  /**
   * Authority is the account executing the safety fund spend.
   * It should be the gov module account.
   */
  authority: string;
  /**
   * Ids is the array of identifiers of the incentives schedules which are to be
   * terminated.
   */
  ids: string[];
}
export interface MsgTerminateSchedulesAminoMsg {
  type: "/mars.incentives.v1beta1.MsgTerminateSchedules";
  value: MsgTerminateSchedulesAmino;
}
/**
 * MsgTerminateSchedules defines the message for terminating one or more
 * existing incentives schedules.
 * 
 * This message is typically executed via a governance proposal with the gov
 * module being the executing authority.
 */
export interface MsgTerminateSchedulesSDKType {
  authority: string;
  ids: Long[];
}
/**
 * MsgTerminateSchedulesResponse defines the response to executing a
 * MsgTerminateSchedules message.
 */
export interface MsgTerminateSchedulesResponse {
  /**
   * RefundedAmount is the unreleased incentives that were refunded to the
   * community pool.
   */
  refundedAmount: Coin[];
}
export interface MsgTerminateSchedulesResponseProtoMsg {
  typeUrl: "/mars.incentives.v1beta1.MsgTerminateSchedulesResponse";
  value: Uint8Array;
}
/**
 * MsgTerminateSchedulesResponse defines the response to executing a
 * MsgTerminateSchedules message.
 */
export interface MsgTerminateSchedulesResponseAmino {
  /**
   * RefundedAmount is the unreleased incentives that were refunded to the
   * community pool.
   */
  refunded_amount: CoinAmino[];
}
export interface MsgTerminateSchedulesResponseAminoMsg {
  type: "/mars.incentives.v1beta1.MsgTerminateSchedulesResponse";
  value: MsgTerminateSchedulesResponseAmino;
}
/**
 * MsgTerminateSchedulesResponse defines the response to executing a
 * MsgTerminateSchedules message.
 */
export interface MsgTerminateSchedulesResponseSDKType {
  refunded_amount: CoinSDKType[];
}