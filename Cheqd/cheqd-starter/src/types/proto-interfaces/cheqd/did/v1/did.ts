import { KeyValuePair, KeyValuePairAmino, KeyValuePairSDKType } from "./common";
export interface Did {
  /** optional */
  context: string[];
  id: string;
  /** optional */
  controller: string[];
  /** optional */
  verificationMethod: VerificationMethod[];
  /** optional */
  authentication: string[];
  /** optional */
  assertionMethod: string[];
  /** optional */
  capabilityInvocation: string[];
  /** optional */
  capabilityDelegation: string[];
  /** optional */
  keyAgreement: string[];
  /** optional */
  service: Service[];
  /** optional */
  alsoKnownAs: string[];
}
export interface DidProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.Did";
  value: Uint8Array;
}
export interface DidAmino {
  /** optional */
  context: string[];
  id: string;
  /** optional */
  controller: string[];
  /** optional */
  verification_method: VerificationMethodAmino[];
  /** optional */
  authentication: string[];
  /** optional */
  assertion_method: string[];
  /** optional */
  capability_invocation: string[];
  /** optional */
  capability_delegation: string[];
  /** optional */
  key_agreement: string[];
  /** optional */
  service: ServiceAmino[];
  /** optional */
  also_known_as: string[];
}
export interface DidAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.Did";
  value: DidAmino;
}
export interface DidSDKType {
  context: string[];
  id: string;
  controller: string[];
  verification_method: VerificationMethodSDKType[];
  authentication: string[];
  assertion_method: string[];
  capability_invocation: string[];
  capability_delegation: string[];
  key_agreement: string[];
  service: ServiceSDKType[];
  also_known_as: string[];
}
export interface VerificationMethod {
  id: string;
  type: string;
  controller: string;
  /** optional */
  publicKeyJwk: KeyValuePair[];
  /** optional */
  publicKeyMultibase: string;
}
export interface VerificationMethodProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.VerificationMethod";
  value: Uint8Array;
}
export interface VerificationMethodAmino {
  id: string;
  type: string;
  controller: string;
  /** optional */
  public_key_jwk: KeyValuePairAmino[];
  /** optional */
  public_key_multibase: string;
}
export interface VerificationMethodAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.VerificationMethod";
  value: VerificationMethodAmino;
}
export interface VerificationMethodSDKType {
  id: string;
  type: string;
  controller: string;
  public_key_jwk: KeyValuePairSDKType[];
  public_key_multibase: string;
}
export interface Service {
  id: string;
  type: string;
  serviceEndpoint: string;
}
export interface ServiceProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.Service";
  value: Uint8Array;
}
export interface ServiceAmino {
  id: string;
  type: string;
  service_endpoint: string;
}
export interface ServiceAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.Service";
  value: ServiceAmino;
}
export interface ServiceSDKType {
  id: string;
  type: string;
  service_endpoint: string;
}
