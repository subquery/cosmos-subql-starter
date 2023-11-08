import { Params, ParamsAmino, ParamsSDKType } from "./params";
/** GenesisState defines the jklmint module's genesis state. */
export interface GenesisState {
  /** GenesisState defines the jklmint module's genesis state. */
  params: Params;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/canine_chain.jklmint.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the jklmint module's genesis state. */
export interface GenesisStateAmino {
  /** GenesisState defines the jklmint module's genesis state. */
  params?: ParamsAmino;
}
export interface GenesisStateAminoMsg {
  type: "/canine_chain.jklmint.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the jklmint module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
}