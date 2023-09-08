import { GrantAuthorization, GrantAuthorizationAmino, GrantAuthorizationSDKType } from "./authz";
/** GenesisState defines the authz module's genesis state. */
export interface GenesisState {
  authorization: GrantAuthorization[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/cosmos.authz.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the authz module's genesis state. */
export interface GenesisStateAmino {
  authorization: GrantAuthorizationAmino[];
}
export interface GenesisStateAminoMsg {
  type: "cosmos-sdk/GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the authz module's genesis state. */
export interface GenesisStateSDKType {
  authorization: GrantAuthorizationSDKType[];
}