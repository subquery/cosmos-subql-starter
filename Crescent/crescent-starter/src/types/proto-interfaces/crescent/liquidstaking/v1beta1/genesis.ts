import { Params, ParamsAmino, ParamsSDKType, LiquidValidator, LiquidValidatorAmino, LiquidValidatorSDKType } from "./liquidstaking";
/** GenesisState defines the liquidstaking module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters for the liquidstaking module */
  params: Params;
  liquidValidators: LiquidValidator[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/crescent.liquidstaking.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the liquidstaking module's genesis state. */
export interface GenesisStateAmino {
  /** params defines all the parameters for the liquidstaking module */
  params?: ParamsAmino;
  liquid_validators: LiquidValidatorAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/crescent.liquidstaking.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the liquidstaking module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  liquid_validators: LiquidValidatorSDKType[];
}