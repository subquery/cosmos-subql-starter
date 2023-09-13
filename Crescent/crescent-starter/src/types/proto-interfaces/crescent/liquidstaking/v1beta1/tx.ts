import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
/**
 * MsgLiquidStake defines a SDK message for performing a liquid stake of coins
 * from a delegator to whitelisted validators.
 */
export interface MsgLiquidStake {
  delegatorAddress: string;
  amount: Coin;
}
export interface MsgLiquidStakeProtoMsg {
  typeUrl: "/crescent.liquidstaking.v1beta1.MsgLiquidStake";
  value: Uint8Array;
}
/**
 * MsgLiquidStake defines a SDK message for performing a liquid stake of coins
 * from a delegator to whitelisted validators.
 */
export interface MsgLiquidStakeAmino {
  delegator_address: string;
  amount?: CoinAmino;
}
export interface MsgLiquidStakeAminoMsg {
  type: "/crescent.liquidstaking.v1beta1.MsgLiquidStake";
  value: MsgLiquidStakeAmino;
}
/**
 * MsgLiquidStake defines a SDK message for performing a liquid stake of coins
 * from a delegator to whitelisted validators.
 */
export interface MsgLiquidStakeSDKType {
  delegator_address: string;
  amount: CoinSDKType;
}
/** MsgLiquidStakeResponse defines the Msg/LiquidStake response type. */
export interface MsgLiquidStakeResponse {}
export interface MsgLiquidStakeResponseProtoMsg {
  typeUrl: "/crescent.liquidstaking.v1beta1.MsgLiquidStakeResponse";
  value: Uint8Array;
}
/** MsgLiquidStakeResponse defines the Msg/LiquidStake response type. */
export interface MsgLiquidStakeResponseAmino {}
export interface MsgLiquidStakeResponseAminoMsg {
  type: "/crescent.liquidstaking.v1beta1.MsgLiquidStakeResponse";
  value: MsgLiquidStakeResponseAmino;
}
/** MsgLiquidStakeResponse defines the Msg/LiquidStake response type. */
export interface MsgLiquidStakeResponseSDKType {}
/**
 * MsgLiquidUnstake defines a SDK message for performing an undelegation of liquid staking from a
 * delegate.
 */
export interface MsgLiquidUnstake {
  delegatorAddress: string;
  amount: Coin;
}
export interface MsgLiquidUnstakeProtoMsg {
  typeUrl: "/crescent.liquidstaking.v1beta1.MsgLiquidUnstake";
  value: Uint8Array;
}
/**
 * MsgLiquidUnstake defines a SDK message for performing an undelegation of liquid staking from a
 * delegate.
 */
export interface MsgLiquidUnstakeAmino {
  delegator_address: string;
  amount?: CoinAmino;
}
export interface MsgLiquidUnstakeAminoMsg {
  type: "/crescent.liquidstaking.v1beta1.MsgLiquidUnstake";
  value: MsgLiquidUnstakeAmino;
}
/**
 * MsgLiquidUnstake defines a SDK message for performing an undelegation of liquid staking from a
 * delegate.
 */
export interface MsgLiquidUnstakeSDKType {
  delegator_address: string;
  amount: CoinSDKType;
}
/** MsgLiquidUnstakeResponse defines the Msg/LiquidUnstake response type. */
export interface MsgLiquidUnstakeResponse {
  completionTime: Date;
}
export interface MsgLiquidUnstakeResponseProtoMsg {
  typeUrl: "/crescent.liquidstaking.v1beta1.MsgLiquidUnstakeResponse";
  value: Uint8Array;
}
/** MsgLiquidUnstakeResponse defines the Msg/LiquidUnstake response type. */
export interface MsgLiquidUnstakeResponseAmino {
  completion_time?: Date;
}
export interface MsgLiquidUnstakeResponseAminoMsg {
  type: "/crescent.liquidstaking.v1beta1.MsgLiquidUnstakeResponse";
  value: MsgLiquidUnstakeResponseAmino;
}
/** MsgLiquidUnstakeResponse defines the Msg/LiquidUnstake response type. */
export interface MsgLiquidUnstakeResponseSDKType {
  completion_time: Date;
}