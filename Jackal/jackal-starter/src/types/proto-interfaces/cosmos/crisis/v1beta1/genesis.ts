import { Coin, CoinAmino, CoinSDKType } from "../../base/v1beta1/coin";
/** GenesisState defines the crisis module's genesis state. */
export interface GenesisState {
  /**
   * constant_fee is the fee used to verify the invariant in the crisis
   * module.
   */
  constantFee: Coin;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/cosmos.crisis.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the crisis module's genesis state. */
export interface GenesisStateAmino {
  /**
   * constant_fee is the fee used to verify the invariant in the crisis
   * module.
   */
  constant_fee?: CoinAmino;
}
export interface GenesisStateAminoMsg {
  type: "cosmos-sdk/GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the crisis module's genesis state. */
export interface GenesisStateSDKType {
  constant_fee: CoinSDKType;
}