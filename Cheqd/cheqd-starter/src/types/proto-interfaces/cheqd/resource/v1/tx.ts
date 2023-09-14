import { SignInfo, SignInfoAmino, SignInfoSDKType } from "../../did/v1/tx";
import { Resource, ResourceAmino, ResourceSDKType } from "./resource";
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgCreateResource {
  payload: MsgCreateResourcePayload;
  signatures: SignInfo[];
}
export interface MsgCreateResourceProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.resource.v1.MsgCreateResource";
  value: Uint8Array;
}
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgCreateResourceAmino {
  payload?: MsgCreateResourcePayloadAmino;
  signatures: SignInfoAmino[];
}
export interface MsgCreateResourceAminoMsg {
  type: "/cheqdid.cheqdnode.resource.v1.MsgCreateResource";
  value: MsgCreateResourceAmino;
}
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgCreateResourceSDKType {
  payload: MsgCreateResourcePayloadSDKType;
  signatures: SignInfoSDKType[];
}
export interface MsgCreateResourcePayload {
  collectionId: string;
  id: string;
  name: string;
  resourceType: string;
  data: Uint8Array;
}
export interface MsgCreateResourcePayloadProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.resource.v1.MsgCreateResourcePayload";
  value: Uint8Array;
}
export interface MsgCreateResourcePayloadAmino {
  collection_id: string;
  id: string;
  name: string;
  resource_type: string;
  data: Uint8Array;
}
export interface MsgCreateResourcePayloadAminoMsg {
  type: "/cheqdid.cheqdnode.resource.v1.MsgCreateResourcePayload";
  value: MsgCreateResourcePayloadAmino;
}
export interface MsgCreateResourcePayloadSDKType {
  collection_id: string;
  id: string;
  name: string;
  resource_type: string;
  data: Uint8Array;
}
export interface MsgCreateResourceResponse {
  /** Not necessary */
  resource: Resource;
}
export interface MsgCreateResourceResponseProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.resource.v1.MsgCreateResourceResponse";
  value: Uint8Array;
}
export interface MsgCreateResourceResponseAmino {
  /** Not necessary */
  resource?: ResourceAmino;
}
export interface MsgCreateResourceResponseAminoMsg {
  type: "/cheqdid.cheqdnode.resource.v1.MsgCreateResourceResponse";
  value: MsgCreateResourceResponseAmino;
}
export interface MsgCreateResourceResponseSDKType {
  resource: ResourceSDKType;
}