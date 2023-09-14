import {
  Coin,
  CoinAmino,
  CoinSDKType,
} from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
/** Schedule defines the parameters of an incentives releasing schedule */
export interface Schedule {
  /** Id is the identifier of this incentives schedule */
  id: Long;
  /** StartTime is the UNIX timestamp of which this incentives schedule shall begin */
  startTime: Date;
  /** EndTime is the UNIX timestamp of which this incentives schedule shall finish */
  endTime: Date;
  /**
   * TotalAmount is the total amount of coins that shall be released to stakers
   * throughout the span of this incentives schedule
   */
  totalAmount: Coin[];
  /**
   * ReleasedAmount is the amount of coins that have already been released to
   * the stakers as part of this incentives schedule
   */
  releasedAmount: Coin[];
}
export interface ScheduleProtoMsg {
  typeUrl: "/mars.incentives.v1beta1.Schedule";
  value: Uint8Array;
}
/** Schedule defines the parameters of an incentives releasing schedule */
export interface ScheduleAmino {
  /** Id is the identifier of this incentives schedule */
  id: string;
  /** StartTime is the UNIX timestamp of which this incentives schedule shall begin */
  start_time?: Date;
  /** EndTime is the UNIX timestamp of which this incentives schedule shall finish */
  end_time?: Date;
  /**
   * TotalAmount is the total amount of coins that shall be released to stakers
   * throughout the span of this incentives schedule
   */
  total_amount: CoinAmino[];
  /**
   * ReleasedAmount is the amount of coins that have already been released to
   * the stakers as part of this incentives schedule
   */
  released_amount: CoinAmino[];
}
export interface ScheduleAminoMsg {
  type: "/mars.incentives.v1beta1.Schedule";
  value: ScheduleAmino;
}
/** Schedule defines the parameters of an incentives releasing schedule */
export interface ScheduleSDKType {
  id: Long;
  start_time: Date;
  end_time: Date;
  total_amount: CoinSDKType[];
  released_amount: CoinSDKType[];
}
