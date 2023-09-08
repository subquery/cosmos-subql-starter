import { StateValue, StateValueAmino, StateValueSDKType } from "./stateValue";
/** GenesisState defines the cheqd module's genesis state. */
export interface GenesisState {
  didNamespace: string;
  didList: StateValue[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the cheqd module's genesis state. */
export interface GenesisStateAmino {
  did_namespace: string;
  didList: StateValueAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the cheqd module's genesis state. */
export interface GenesisStateSDKType {
  did_namespace: string;
  didList: StateValueSDKType[];
}