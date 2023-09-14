import { Resource, ResourceAmino, ResourceSDKType } from "./resource";
/** GenesisState defines the cheqd module's genesis state. */
export interface GenesisState {
  resourceList: Resource[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.resource.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the cheqd module's genesis state. */
export interface GenesisStateAmino {
  resourceList: ResourceAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/cheqdid.cheqdnode.resource.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the cheqd module's genesis state. */
export interface GenesisStateSDKType {
  resourceList: ResourceSDKType[];
}
