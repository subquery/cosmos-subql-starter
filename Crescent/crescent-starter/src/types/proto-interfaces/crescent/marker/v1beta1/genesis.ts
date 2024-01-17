import { Params, ParamsAmino, ParamsSDKType } from "./marker";
export interface GenesisState {
  params: Params;
  lastBlockTime: Date;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/crescent.marker.v1beta1.GenesisState";
  value: Uint8Array;
}
export interface GenesisStateAmino {
  params?: ParamsAmino;
  last_block_time?: Date;
}
export interface GenesisStateAminoMsg {
  type: "/crescent.marker.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  last_block_time: Date;
}