import { Params, ParamsAmino, ParamsSDKType } from "./mint";
/** GenesisState defines the mint module's genesis state. */
export interface GenesisState {
  /** last_block_time defines the last block time, which is used to calculate inflation. */
  lastBlockTime: Date;
  /** params defines all the parameters of the module. */
  params: Params;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/crescent.mint.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the mint module's genesis state. */
export interface GenesisStateAmino {
  /** last_block_time defines the last block time, which is used to calculate inflation. */
  last_block_time?: Date;
  /** params defines all the parameters of the module. */
  params?: ParamsAmino;
}
export interface GenesisStateAminoMsg {
  type: "/crescent.mint.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the mint module's genesis state. */
export interface GenesisStateSDKType {
  last_block_time: Date;
  params: ParamsSDKType;
}