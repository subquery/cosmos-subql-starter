import { Any, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
export interface StateValue {
  data: Any;
  /** optional */
  metadata: Metadata;
}
export interface StateValueProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.StateValue";
  value: Uint8Array;
}
export interface StateValueAmino {
  data?: AnyAmino;
  /** optional */
  metadata?: MetadataAmino;
}
export interface StateValueAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.StateValue";
  value: StateValueAmino;
}
export interface StateValueSDKType {
  data: AnySDKType;
  metadata: MetadataSDKType;
}
/** metadata */
export interface Metadata {
  created: string;
  updated: string;
  deactivated: boolean;
  versionId: string;
  resources: string[];
}
export interface MetadataProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.Metadata";
  value: Uint8Array;
}
/** metadata */
export interface MetadataAmino {
  created: string;
  updated: string;
  deactivated: boolean;
  version_id: string;
  resources: string[];
}
export interface MetadataAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.Metadata";
  value: MetadataAmino;
}
/** metadata */
export interface MetadataSDKType {
  created: string;
  updated: string;
  deactivated: boolean;
  version_id: string;
  resources: string[];
}