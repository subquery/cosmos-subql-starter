import { Any, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
/** GenesisState defines the evidence module's genesis state. */
export interface GenesisState {
  /** evidence defines all the evidence at genesis. */
  evidence: Any[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/cosmos.evidence.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the evidence module's genesis state. */
export interface GenesisStateAmino {
  /** evidence defines all the evidence at genesis. */
  evidence: AnyAmino[];
}
export interface GenesisStateAminoMsg {
  type: "cosmos-sdk/GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the evidence module's genesis state. */
export interface GenesisStateSDKType {
  evidence: AnySDKType[];
}