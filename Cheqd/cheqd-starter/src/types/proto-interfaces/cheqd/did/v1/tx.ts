import {
  Did,
  DidAmino,
  DidSDKType,
  VerificationMethod,
  VerificationMethodAmino,
  VerificationMethodSDKType,
  Service,
  ServiceAmino,
  ServiceSDKType,
} from "./did";
import { Metadata, MetadataAmino, MetadataSDKType } from "./stateValue";
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgCreateDid {
  payload: MsgCreateDidPayload;
  signatures: SignInfo[];
}
export interface MsgCreateDidProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.MsgCreateDid";
  value: Uint8Array;
}
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgCreateDidAmino {
  payload?: MsgCreateDidPayloadAmino;
  signatures: SignInfoAmino[];
}
export interface MsgCreateDidAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.MsgCreateDid";
  value: MsgCreateDidAmino;
}
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgCreateDidSDKType {
  payload: MsgCreateDidPayloadSDKType;
  signatures: SignInfoSDKType[];
}
export interface MsgUpdateDid {
  payload: MsgUpdateDidPayload;
  signatures: SignInfo[];
}
export interface MsgUpdateDidProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.MsgUpdateDid";
  value: Uint8Array;
}
export interface MsgUpdateDidAmino {
  payload?: MsgUpdateDidPayloadAmino;
  signatures: SignInfoAmino[];
}
export interface MsgUpdateDidAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.MsgUpdateDid";
  value: MsgUpdateDidAmino;
}
export interface MsgUpdateDidSDKType {
  payload: MsgUpdateDidPayloadSDKType;
  signatures: SignInfoSDKType[];
}
export interface MsgDeactivateDid {
  payload: MsgDeactivateDidPayload;
  signatures: SignInfo[];
}
export interface MsgDeactivateDidProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.MsgDeactivateDid";
  value: Uint8Array;
}
export interface MsgDeactivateDidAmino {
  payload?: MsgDeactivateDidPayloadAmino;
  signatures: SignInfoAmino[];
}
export interface MsgDeactivateDidAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.MsgDeactivateDid";
  value: MsgDeactivateDidAmino;
}
export interface MsgDeactivateDidSDKType {
  payload: MsgDeactivateDidPayloadSDKType;
  signatures: SignInfoSDKType[];
}
export interface SignInfo {
  verificationMethodId: string;
  signature: string;
}
export interface SignInfoProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.SignInfo";
  value: Uint8Array;
}
export interface SignInfoAmino {
  verification_method_id: string;
  signature: string;
}
export interface SignInfoAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.SignInfo";
  value: SignInfoAmino;
}
export interface SignInfoSDKType {
  verification_method_id: string;
  signature: string;
}
export interface MsgDeactivateDidPayload {
  id: string;
}
export interface MsgDeactivateDidPayloadProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.MsgDeactivateDidPayload";
  value: Uint8Array;
}
export interface MsgDeactivateDidPayloadAmino {
  id: string;
}
export interface MsgDeactivateDidPayloadAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.MsgDeactivateDidPayload";
  value: MsgDeactivateDidPayloadAmino;
}
export interface MsgDeactivateDidPayloadSDKType {
  id: string;
}
export interface MsgDeactivateDidResponse {
  did: Did;
  metadata: Metadata;
}
export interface MsgDeactivateDidResponseProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.MsgDeactivateDidResponse";
  value: Uint8Array;
}
export interface MsgDeactivateDidResponseAmino {
  did?: DidAmino;
  metadata?: MetadataAmino;
}
export interface MsgDeactivateDidResponseAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.MsgDeactivateDidResponse";
  value: MsgDeactivateDidResponseAmino;
}
export interface MsgDeactivateDidResponseSDKType {
  did: DidSDKType;
  metadata: MetadataSDKType;
}
export interface MsgCreateDidPayload {
  context: string[];
  id: string;
  controller: string[];
  verificationMethod: VerificationMethod[];
  authentication: string[];
  assertionMethod: string[];
  capabilityInvocation: string[];
  capabilityDelegation: string[];
  keyAgreement: string[];
  alsoKnownAs: string[];
  service: Service[];
}
export interface MsgCreateDidPayloadProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.MsgCreateDidPayload";
  value: Uint8Array;
}
export interface MsgCreateDidPayloadAmino {
  context: string[];
  id: string;
  controller: string[];
  verification_method: VerificationMethodAmino[];
  authentication: string[];
  assertion_method: string[];
  capability_invocation: string[];
  capability_delegation: string[];
  key_agreement: string[];
  also_known_as: string[];
  service: ServiceAmino[];
}
export interface MsgCreateDidPayloadAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.MsgCreateDidPayload";
  value: MsgCreateDidPayloadAmino;
}
export interface MsgCreateDidPayloadSDKType {
  context: string[];
  id: string;
  controller: string[];
  verification_method: VerificationMethodSDKType[];
  authentication: string[];
  assertion_method: string[];
  capability_invocation: string[];
  capability_delegation: string[];
  key_agreement: string[];
  also_known_as: string[];
  service: ServiceSDKType[];
}
export interface MsgCreateDidResponse {
  /** Not necessary */
  id: string;
}
export interface MsgCreateDidResponseProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.MsgCreateDidResponse";
  value: Uint8Array;
}
export interface MsgCreateDidResponseAmino {
  /** Not necessary */
  id: string;
}
export interface MsgCreateDidResponseAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.MsgCreateDidResponse";
  value: MsgCreateDidResponseAmino;
}
export interface MsgCreateDidResponseSDKType {
  id: string;
}
export interface MsgUpdateDidPayload {
  context: string[];
  id: string;
  controller: string[];
  verificationMethod: VerificationMethod[];
  authentication: string[];
  assertionMethod: string[];
  capabilityInvocation: string[];
  capabilityDelegation: string[];
  keyAgreement: string[];
  alsoKnownAs: string[];
  service: Service[];
  versionId: string;
}
export interface MsgUpdateDidPayloadProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.MsgUpdateDidPayload";
  value: Uint8Array;
}
export interface MsgUpdateDidPayloadAmino {
  context: string[];
  id: string;
  controller: string[];
  verification_method: VerificationMethodAmino[];
  authentication: string[];
  assertion_method: string[];
  capability_invocation: string[];
  capability_delegation: string[];
  key_agreement: string[];
  also_known_as: string[];
  service: ServiceAmino[];
  version_id: string;
}
export interface MsgUpdateDidPayloadAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.MsgUpdateDidPayload";
  value: MsgUpdateDidPayloadAmino;
}
export interface MsgUpdateDidPayloadSDKType {
  context: string[];
  id: string;
  controller: string[];
  verification_method: VerificationMethodSDKType[];
  authentication: string[];
  assertion_method: string[];
  capability_invocation: string[];
  capability_delegation: string[];
  key_agreement: string[];
  also_known_as: string[];
  service: ServiceSDKType[];
  version_id: string;
}
export interface MsgUpdateDidResponse {
  /** Not necessary */
  id: string;
}
export interface MsgUpdateDidResponseProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.MsgUpdateDidResponse";
  value: Uint8Array;
}
export interface MsgUpdateDidResponseAmino {
  /** Not necessary */
  id: string;
}
export interface MsgUpdateDidResponseAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.MsgUpdateDidResponse";
  value: MsgUpdateDidResponseAmino;
}
export interface MsgUpdateDidResponseSDKType {
  id: string;
}
