import { Coin, CoinAmino, CoinSDKType } from "../../base/v1beta1/coin";
import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { Any, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
/**
 * BasicAllowance implements Allowance with a one-time grant of tokens
 * that optionally expires. The grantee can use up to SpendLimit to cover fees.
 */
export interface BasicAllowance {
  /**
   * spend_limit specifies the maximum amount of tokens that can be spent
   * by this allowance and will be updated as tokens are spent. If it is
   * empty, there is no spend limit and any amount of coins can be spent.
   */
  spendLimit: Coin[];
  /** expiration specifies an optional time when this allowance expires */
  expiration: Date;
}
export interface BasicAllowanceProtoMsg {
  typeUrl: "/cosmos.feegrant.v1beta1.BasicAllowance";
  value: Uint8Array;
}
/**
 * BasicAllowance implements Allowance with a one-time grant of tokens
 * that optionally expires. The grantee can use up to SpendLimit to cover fees.
 */
export interface BasicAllowanceAmino {
  /**
   * spend_limit specifies the maximum amount of tokens that can be spent
   * by this allowance and will be updated as tokens are spent. If it is
   * empty, there is no spend limit and any amount of coins can be spent.
   */
  spend_limit: CoinAmino[];
  /** expiration specifies an optional time when this allowance expires */
  expiration?: Date;
}
export interface BasicAllowanceAminoMsg {
  type: "cosmos-sdk/BasicAllowance";
  value: BasicAllowanceAmino;
}
/**
 * BasicAllowance implements Allowance with a one-time grant of tokens
 * that optionally expires. The grantee can use up to SpendLimit to cover fees.
 */
export interface BasicAllowanceSDKType {
  spend_limit: CoinSDKType[];
  expiration: Date;
}
/**
 * PeriodicAllowance extends Allowance to allow for both a maximum cap,
 * as well as a limit per time period.
 */
export interface PeriodicAllowance {
  /** basic specifies a struct of `BasicAllowance` */
  basic: BasicAllowance;
  /**
   * period specifies the time duration in which period_spend_limit coins can
   * be spent before that allowance is reset
   */
  period: Duration;
  /**
   * period_spend_limit specifies the maximum number of coins that can be spent
   * in the period
   */
  periodSpendLimit: Coin[];
  /** period_can_spend is the number of coins left to be spent before the period_reset time */
  periodCanSpend: Coin[];
  /**
   * period_reset is the time at which this period resets and a new one begins,
   * it is calculated from the start time of the first transaction after the
   * last period ended
   */
  periodReset: Date;
}
export interface PeriodicAllowanceProtoMsg {
  typeUrl: "/cosmos.feegrant.v1beta1.PeriodicAllowance";
  value: Uint8Array;
}
/**
 * PeriodicAllowance extends Allowance to allow for both a maximum cap,
 * as well as a limit per time period.
 */
export interface PeriodicAllowanceAmino {
  /** basic specifies a struct of `BasicAllowance` */
  basic?: BasicAllowanceAmino;
  /**
   * period specifies the time duration in which period_spend_limit coins can
   * be spent before that allowance is reset
   */
  period?: DurationAmino;
  /**
   * period_spend_limit specifies the maximum number of coins that can be spent
   * in the period
   */
  period_spend_limit: CoinAmino[];
  /** period_can_spend is the number of coins left to be spent before the period_reset time */
  period_can_spend: CoinAmino[];
  /**
   * period_reset is the time at which this period resets and a new one begins,
   * it is calculated from the start time of the first transaction after the
   * last period ended
   */
  period_reset?: Date;
}
export interface PeriodicAllowanceAminoMsg {
  type: "cosmos-sdk/PeriodicAllowance";
  value: PeriodicAllowanceAmino;
}
/**
 * PeriodicAllowance extends Allowance to allow for both a maximum cap,
 * as well as a limit per time period.
 */
export interface PeriodicAllowanceSDKType {
  basic: BasicAllowanceSDKType;
  period: DurationSDKType;
  period_spend_limit: CoinSDKType[];
  period_can_spend: CoinSDKType[];
  period_reset: Date;
}
/** AllowedMsgAllowance creates allowance only for specified message types. */
export interface AllowedMsgAllowance {
  /** allowance can be any of basic and periodic fee allowance. */
  allowance: Any;
  /** allowed_messages are the messages for which the grantee has the access. */
  allowedMessages: string[];
}
export interface AllowedMsgAllowanceProtoMsg {
  typeUrl: "/cosmos.feegrant.v1beta1.AllowedMsgAllowance";
  value: Uint8Array;
}
/** AllowedMsgAllowance creates allowance only for specified message types. */
export interface AllowedMsgAllowanceAmino {
  /** allowance can be any of basic and periodic fee allowance. */
  allowance?: AnyAmino;
  /** allowed_messages are the messages for which the grantee has the access. */
  allowed_messages: string[];
}
export interface AllowedMsgAllowanceAminoMsg {
  type: "cosmos-sdk/AllowedMsgAllowance";
  value: AllowedMsgAllowanceAmino;
}
/** AllowedMsgAllowance creates allowance only for specified message types. */
export interface AllowedMsgAllowanceSDKType {
  allowance: AnySDKType;
  allowed_messages: string[];
}
/** Grant is stored in the KVStore to record a grant with full context */
export interface Grant {
  /** granter is the address of the user granting an allowance of their funds. */
  granter: string;
  /** grantee is the address of the user being granted an allowance of another user's funds. */
  grantee: string;
  /** allowance can be any of basic, periodic, allowed fee allowance. */
  allowance: Any;
}
export interface GrantProtoMsg {
  typeUrl: "/cosmos.feegrant.v1beta1.Grant";
  value: Uint8Array;
}
/** Grant is stored in the KVStore to record a grant with full context */
export interface GrantAmino {
  /** granter is the address of the user granting an allowance of their funds. */
  granter: string;
  /** grantee is the address of the user being granted an allowance of another user's funds. */
  grantee: string;
  /** allowance can be any of basic, periodic, allowed fee allowance. */
  allowance?: AnyAmino;
}
export interface GrantAminoMsg {
  type: "cosmos-sdk/Grant";
  value: GrantAmino;
}
/** Grant is stored in the KVStore to record a grant with full context */
export interface GrantSDKType {
  granter: string;
  grantee: string;
  allowance: AnySDKType;
}