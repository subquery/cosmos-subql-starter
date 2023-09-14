import {
  VerificationMethod,
  VerificationMethodAmino,
  VerificationMethodSDKType,
  Service,
  ServiceAmino,
  ServiceSDKType,
  DidDocWithMetadata,
  DidDocWithMetadataAmino,
  DidDocWithMetadataSDKType,
} from "./diddoc";
/**
 * MsgCreateDidDoc defines the Msg/CreateDidDoc request type.
 * It describes the parameters of a request for creating a new DID document.
 */
export interface MsgCreateDidDoc {
  /** Payload containing the DID Document to be created */
  payload: MsgCreateDidDocPayload;
  /** Signatures of the DID Document's controller(s) */
  signatures: SignInfo[];
}
export interface MsgCreateDidDocProtoMsg {
  typeUrl: "/cheqd.did.v2.MsgCreateDidDoc";
  value: Uint8Array;
}
/**
 * MsgCreateDidDoc defines the Msg/CreateDidDoc request type.
 * It describes the parameters of a request for creating a new DID document.
 */
export interface MsgCreateDidDocAmino {
  /** Payload containing the DID Document to be created */
  payload?: MsgCreateDidDocPayloadAmino;
  /** Signatures of the DID Document's controller(s) */
  signatures: SignInfoAmino[];
}
export interface MsgCreateDidDocAminoMsg {
  type: "/cheqd.did.v2.MsgCreateDidDoc";
  value: MsgCreateDidDocAmino;
}
/**
 * MsgCreateDidDoc defines the Msg/CreateDidDoc request type.
 * It describes the parameters of a request for creating a new DID document.
 */
export interface MsgCreateDidDocSDKType {
  payload: MsgCreateDidDocPayloadSDKType;
  signatures: SignInfoSDKType[];
}
/**
 * MsgUpdateDidDoc defines the Msg/UpdateDidDoc request type.
 * It describes the parameters of a request for updating an existing DID document.
 */
export interface MsgUpdateDidDoc {
  /** Payload containing the DID Document to be updated. This should be updated the DID Document. */
  payload: MsgUpdateDidDocPayload;
  /** Signatures of the DID Document's controller(s) */
  signatures: SignInfo[];
}
export interface MsgUpdateDidDocProtoMsg {
  typeUrl: "/cheqd.did.v2.MsgUpdateDidDoc";
  value: Uint8Array;
}
/**
 * MsgUpdateDidDoc defines the Msg/UpdateDidDoc request type.
 * It describes the parameters of a request for updating an existing DID document.
 */
export interface MsgUpdateDidDocAmino {
  /** Payload containing the DID Document to be updated. This should be updated the DID Document. */
  payload?: MsgUpdateDidDocPayloadAmino;
  /** Signatures of the DID Document's controller(s) */
  signatures: SignInfoAmino[];
}
export interface MsgUpdateDidDocAminoMsg {
  type: "/cheqd.did.v2.MsgUpdateDidDoc";
  value: MsgUpdateDidDocAmino;
}
/**
 * MsgUpdateDidDoc defines the Msg/UpdateDidDoc request type.
 * It describes the parameters of a request for updating an existing DID document.
 */
export interface MsgUpdateDidDocSDKType {
  payload: MsgUpdateDidDocPayloadSDKType;
  signatures: SignInfoSDKType[];
}
/**
 * MsgDeactivateDidDoc defines the Msg/DeactivateDidDoc request type.
 * It describes the parameters of a request for deactivating an existing DID document.
 */
export interface MsgDeactivateDidDoc {
  /** Payload containing the DID Document to be deactivated */
  payload: MsgDeactivateDidDocPayload;
  /** Signatures of the DID Document's controller(s) */
  signatures: SignInfo[];
}
export interface MsgDeactivateDidDocProtoMsg {
  typeUrl: "/cheqd.did.v2.MsgDeactivateDidDoc";
  value: Uint8Array;
}
/**
 * MsgDeactivateDidDoc defines the Msg/DeactivateDidDoc request type.
 * It describes the parameters of a request for deactivating an existing DID document.
 */
export interface MsgDeactivateDidDocAmino {
  /** Payload containing the DID Document to be deactivated */
  payload?: MsgDeactivateDidDocPayloadAmino;
  /** Signatures of the DID Document's controller(s) */
  signatures: SignInfoAmino[];
}
export interface MsgDeactivateDidDocAminoMsg {
  type: "/cheqd.did.v2.MsgDeactivateDidDoc";
  value: MsgDeactivateDidDocAmino;
}
/**
 * MsgDeactivateDidDoc defines the Msg/DeactivateDidDoc request type.
 * It describes the parameters of a request for deactivating an existing DID document.
 */
export interface MsgDeactivateDidDocSDKType {
  payload: MsgDeactivateDidDocPayloadSDKType;
  signatures: SignInfoSDKType[];
}
/** SignInfo defines the structure of a DID Document controller's signature */
export interface SignInfo {
  /** Verification method ID of the DID Controller */
  verificationMethodId: string;
  /** Signature of the DID Document controller */
  signature: Uint8Array;
}
export interface SignInfoProtoMsg {
  typeUrl: "/cheqd.did.v2.SignInfo";
  value: Uint8Array;
}
/** SignInfo defines the structure of a DID Document controller's signature */
export interface SignInfoAmino {
  /** Verification method ID of the DID Controller */
  verification_method_id: string;
  /** Signature of the DID Document controller */
  signature: Uint8Array;
}
export interface SignInfoAminoMsg {
  type: "/cheqd.did.v2.SignInfo";
  value: SignInfoAmino;
}
/** SignInfo defines the structure of a DID Document controller's signature */
export interface SignInfoSDKType {
  verification_method_id: string;
  signature: Uint8Array;
}
/** MsgCreateDidDocPayload defines the structure of the payload for creating a new DID document */
export interface MsgCreateDidDocPayload {
  /**
   * context is a list of URIs used to identify the context of the DID document.
   * Default: https://www.w3.org/ns/did/v1
   */
  context: string[];
  /**
   * id is the DID of the DID document.
   * Format: did:cheqd:<namespace>:<unique-identifier>
   */
  id: string;
  /** controller is a list of DIDs that are allowed to control the DID document. */
  controller: string[];
  /**
   * verificationMethod is a list of verification methods that can be used to
   * verify a digital signature or cryptographic proof.
   * Documentation: https://www.w3.org/TR/did-core/#verification-methods
   *
   * Required fields:
   * - id: A unique identifier for the verification method
   * - type: A supported verification method type (supported: Ed25519VerificationKey2018, Ed25519VerificationKey2020, JsonWebKey2020)
   * - controller: DID of the controller of the verification method
   * - verification_material: Public key of the verification method (supported: publicJwk, publicKeyBase58, publicKeyMultibase)
   */
  verificationMethod: VerificationMethod[];
  /**
   * authentication is a list of verification methods that can be used to
   * authenticate as the DID subject.
   */
  authentication: string[];
  /**
   * assertionMethod is a list of verification methods that can be used to
   * assert statements as the DID subject.
   */
  assertionMethod: string[];
  /**
   * capabilityInvocation is a list of verification methods that can be used to
   * invoke capabilities as the DID subject.
   */
  capabilityInvocation: string[];
  /**
   * capabilityDelegation is a list of verification methods that can be used to
   * delegate capabilities as the DID subject.
   */
  capabilityDelegation: string[];
  /**
   * keyAgreement is a list of verification methods that can be used to perform
   * key agreement as the DID subject.
   */
  keyAgreement: string[];
  /**
   * service is a list of services that can be used to interact with the DID subject.
   * Documentation: https://www.w3.org/TR/did-core/#services
   *
   * Required fields:
   * - id: A unique identifier for the service
   * - type: A service type defined in DID Specification Registries
   * - service_endpoint: Service endpoint(s), provided as a URI or set of URIs
   */
  service: Service[];
  /** alsoKnownAs is a list of DIDs that are known to refer to the same DID subject. */
  alsoKnownAs: string[];
  /**
   * Version ID of the DID Document to be created
   *
   * Format: <uuid>
   */
  versionId: string;
}
export interface MsgCreateDidDocPayloadProtoMsg {
  typeUrl: "/cheqd.did.v2.MsgCreateDidDocPayload";
  value: Uint8Array;
}
/** MsgCreateDidDocPayload defines the structure of the payload for creating a new DID document */
export interface MsgCreateDidDocPayloadAmino {
  /**
   * context is a list of URIs used to identify the context of the DID document.
   * Default: https://www.w3.org/ns/did/v1
   */
  context: string[];
  /**
   * id is the DID of the DID document.
   * Format: did:cheqd:<namespace>:<unique-identifier>
   */
  id: string;
  /** controller is a list of DIDs that are allowed to control the DID document. */
  controller: string[];
  /**
   * verificationMethod is a list of verification methods that can be used to
   * verify a digital signature or cryptographic proof.
   * Documentation: https://www.w3.org/TR/did-core/#verification-methods
   *
   * Required fields:
   * - id: A unique identifier for the verification method
   * - type: A supported verification method type (supported: Ed25519VerificationKey2018, Ed25519VerificationKey2020, JsonWebKey2020)
   * - controller: DID of the controller of the verification method
   * - verification_material: Public key of the verification method (supported: publicJwk, publicKeyBase58, publicKeyMultibase)
   */
  verification_method: VerificationMethodAmino[];
  /**
   * authentication is a list of verification methods that can be used to
   * authenticate as the DID subject.
   */
  authentication: string[];
  /**
   * assertionMethod is a list of verification methods that can be used to
   * assert statements as the DID subject.
   */
  assertion_method: string[];
  /**
   * capabilityInvocation is a list of verification methods that can be used to
   * invoke capabilities as the DID subject.
   */
  capability_invocation: string[];
  /**
   * capabilityDelegation is a list of verification methods that can be used to
   * delegate capabilities as the DID subject.
   */
  capability_delegation: string[];
  /**
   * keyAgreement is a list of verification methods that can be used to perform
   * key agreement as the DID subject.
   */
  key_agreement: string[];
  /**
   * service is a list of services that can be used to interact with the DID subject.
   * Documentation: https://www.w3.org/TR/did-core/#services
   *
   * Required fields:
   * - id: A unique identifier for the service
   * - type: A service type defined in DID Specification Registries
   * - service_endpoint: Service endpoint(s), provided as a URI or set of URIs
   */
  service: ServiceAmino[];
  /** alsoKnownAs is a list of DIDs that are known to refer to the same DID subject. */
  also_known_as: string[];
  /**
   * Version ID of the DID Document to be created
   *
   * Format: <uuid>
   */
  version_id: string;
}
export interface MsgCreateDidDocPayloadAminoMsg {
  type: "/cheqd.did.v2.MsgCreateDidDocPayload";
  value: MsgCreateDidDocPayloadAmino;
}
/** MsgCreateDidDocPayload defines the structure of the payload for creating a new DID document */
export interface MsgCreateDidDocPayloadSDKType {
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
  version_id: string;
}
/** MsgCreateDidDocResponse defines response type for Msg/CreateDidDoc. */
export interface MsgCreateDidDocResponse {
  /** Return the created DID Document with metadata */
  value: DidDocWithMetadata;
}
export interface MsgCreateDidDocResponseProtoMsg {
  typeUrl: "/cheqd.did.v2.MsgCreateDidDocResponse";
  value: Uint8Array;
}
/** MsgCreateDidDocResponse defines response type for Msg/CreateDidDoc. */
export interface MsgCreateDidDocResponseAmino {
  /** Return the created DID Document with metadata */
  value?: DidDocWithMetadataAmino;
}
export interface MsgCreateDidDocResponseAminoMsg {
  type: "/cheqd.did.v2.MsgCreateDidDocResponse";
  value: MsgCreateDidDocResponseAmino;
}
/** MsgCreateDidDocResponse defines response type for Msg/CreateDidDoc. */
export interface MsgCreateDidDocResponseSDKType {
  value: DidDocWithMetadataSDKType;
}
/** MsgUpdateDidDocPayload defines the structure of the payload for updating an existing DID document */
export interface MsgUpdateDidDocPayload {
  /**
   * context is a list of URIs used to identify the context of the DID document.
   * Default: https://www.w3.org/ns/did/v1
   */
  context: string[];
  /**
   * id is the DID of the DID document.
   * Format: did:cheqd:<namespace>:<unique-identifier>
   */
  id: string;
  /** controller is a list of DIDs that are allowed to control the DID document. */
  controller: string[];
  /**
   * verificationMethod is a list of verification methods that can be used to
   * verify a digital signature or cryptographic proof.
   * Documentation: https://www.w3.org/TR/did-core/#verification-methods
   *
   * Required fields:
   * - id: A unique identifier for the verification method
   * - type: A supported verification method type (supported: Ed25519VerificationKey2018, Ed25519VerificationKey2020, JsonWebKey2020)
   * - controller: DID of the controller of the verification method
   * - verification_material: Public key of the verification method (supported: publicJwk, publicKeyBase58, publicKeyMultibase)
   */
  verificationMethod: VerificationMethod[];
  /**
   * authentication is a list of verification methods that can be used to
   * authenticate as the DID subject.
   */
  authentication: string[];
  /**
   * assertionMethod is a list of verification methods that can be used to
   * assert statements as the DID subject.
   */
  assertionMethod: string[];
  /**
   * capabilityInvocation is a list of verification methods that can be used to
   * invoke capabilities as the DID subject.
   */
  capabilityInvocation: string[];
  /**
   * capabilityDelegation is a list of verification methods that can be used to
   * delegate capabilities as the DID subject.
   */
  capabilityDelegation: string[];
  /**
   * keyAgreement is a list of verification methods that can be used to perform
   * key agreement as the DID subject.
   */
  keyAgreement: string[];
  /**
   * service is a list of services that can be used to interact with the DID subject.
   * Documentation: https://www.w3.org/TR/did-core/#services
   *
   * Required fields:
   * - id: A unique identifier for the service
   * - type: A service type defined in DID Specification Registries
   * - service_endpoint: Service endpoint(s), provided as a URI or set of URIs
   */
  service: Service[];
  /** alsoKnownAs is a list of DIDs that are known to refer to the same DID subject. */
  alsoKnownAs: string[];
  /**
   * Updated version ID of the DID Document.
   * Links to next/previous versions of the DID Document will be automatically updated.
   *
   * Format: <uuid>
   */
  versionId: string;
}
export interface MsgUpdateDidDocPayloadProtoMsg {
  typeUrl: "/cheqd.did.v2.MsgUpdateDidDocPayload";
  value: Uint8Array;
}
/** MsgUpdateDidDocPayload defines the structure of the payload for updating an existing DID document */
export interface MsgUpdateDidDocPayloadAmino {
  /**
   * context is a list of URIs used to identify the context of the DID document.
   * Default: https://www.w3.org/ns/did/v1
   */
  context: string[];
  /**
   * id is the DID of the DID document.
   * Format: did:cheqd:<namespace>:<unique-identifier>
   */
  id: string;
  /** controller is a list of DIDs that are allowed to control the DID document. */
  controller: string[];
  /**
   * verificationMethod is a list of verification methods that can be used to
   * verify a digital signature or cryptographic proof.
   * Documentation: https://www.w3.org/TR/did-core/#verification-methods
   *
   * Required fields:
   * - id: A unique identifier for the verification method
   * - type: A supported verification method type (supported: Ed25519VerificationKey2018, Ed25519VerificationKey2020, JsonWebKey2020)
   * - controller: DID of the controller of the verification method
   * - verification_material: Public key of the verification method (supported: publicJwk, publicKeyBase58, publicKeyMultibase)
   */
  verification_method: VerificationMethodAmino[];
  /**
   * authentication is a list of verification methods that can be used to
   * authenticate as the DID subject.
   */
  authentication: string[];
  /**
   * assertionMethod is a list of verification methods that can be used to
   * assert statements as the DID subject.
   */
  assertion_method: string[];
  /**
   * capabilityInvocation is a list of verification methods that can be used to
   * invoke capabilities as the DID subject.
   */
  capability_invocation: string[];
  /**
   * capabilityDelegation is a list of verification methods that can be used to
   * delegate capabilities as the DID subject.
   */
  capability_delegation: string[];
  /**
   * keyAgreement is a list of verification methods that can be used to perform
   * key agreement as the DID subject.
   */
  key_agreement: string[];
  /**
   * service is a list of services that can be used to interact with the DID subject.
   * Documentation: https://www.w3.org/TR/did-core/#services
   *
   * Required fields:
   * - id: A unique identifier for the service
   * - type: A service type defined in DID Specification Registries
   * - service_endpoint: Service endpoint(s), provided as a URI or set of URIs
   */
  service: ServiceAmino[];
  /** alsoKnownAs is a list of DIDs that are known to refer to the same DID subject. */
  also_known_as: string[];
  /**
   * Updated version ID of the DID Document.
   * Links to next/previous versions of the DID Document will be automatically updated.
   *
   * Format: <uuid>
   */
  version_id: string;
}
export interface MsgUpdateDidDocPayloadAminoMsg {
  type: "/cheqd.did.v2.MsgUpdateDidDocPayload";
  value: MsgUpdateDidDocPayloadAmino;
}
/** MsgUpdateDidDocPayload defines the structure of the payload for updating an existing DID document */
export interface MsgUpdateDidDocPayloadSDKType {
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
  version_id: string;
}
export interface MsgUpdateDidDocResponse {
  /** Return the updated DID Document with metadata */
  value: DidDocWithMetadata;
}
export interface MsgUpdateDidDocResponseProtoMsg {
  typeUrl: "/cheqd.did.v2.MsgUpdateDidDocResponse";
  value: Uint8Array;
}
export interface MsgUpdateDidDocResponseAmino {
  /** Return the updated DID Document with metadata */
  value?: DidDocWithMetadataAmino;
}
export interface MsgUpdateDidDocResponseAminoMsg {
  type: "/cheqd.did.v2.MsgUpdateDidDocResponse";
  value: MsgUpdateDidDocResponseAmino;
}
export interface MsgUpdateDidDocResponseSDKType {
  value: DidDocWithMetadataSDKType;
}
/** MsgDeactivateDidDocPayload defines the structure of the payload for deactivating an existing DID document */
export interface MsgDeactivateDidDocPayload {
  /** Unique identifier of the DID Document to be deactivated */
  id: string;
  /**
   * Version ID of the DID Document to be deactivated
   * This is primarily used as a sanity check to ensure that the correct DID Document is being deactivated.
   */
  versionId: string;
}
export interface MsgDeactivateDidDocPayloadProtoMsg {
  typeUrl: "/cheqd.did.v2.MsgDeactivateDidDocPayload";
  value: Uint8Array;
}
/** MsgDeactivateDidDocPayload defines the structure of the payload for deactivating an existing DID document */
export interface MsgDeactivateDidDocPayloadAmino {
  /** Unique identifier of the DID Document to be deactivated */
  id: string;
  /**
   * Version ID of the DID Document to be deactivated
   * This is primarily used as a sanity check to ensure that the correct DID Document is being deactivated.
   */
  version_id: string;
}
export interface MsgDeactivateDidDocPayloadAminoMsg {
  type: "/cheqd.did.v2.MsgDeactivateDidDocPayload";
  value: MsgDeactivateDidDocPayloadAmino;
}
/** MsgDeactivateDidDocPayload defines the structure of the payload for deactivating an existing DID document */
export interface MsgDeactivateDidDocPayloadSDKType {
  id: string;
  version_id: string;
}
/** MsgDeactivateDidDocResponse defines response type for Msg/DeactivateDidDoc. */
export interface MsgDeactivateDidDocResponse {
  /** Return the deactivated DID Document with metadata */
  value: DidDocWithMetadata;
}
export interface MsgDeactivateDidDocResponseProtoMsg {
  typeUrl: "/cheqd.did.v2.MsgDeactivateDidDocResponse";
  value: Uint8Array;
}
/** MsgDeactivateDidDocResponse defines response type for Msg/DeactivateDidDoc. */
export interface MsgDeactivateDidDocResponseAmino {
  /** Return the deactivated DID Document with metadata */
  value?: DidDocWithMetadataAmino;
}
export interface MsgDeactivateDidDocResponseAminoMsg {
  type: "/cheqd.did.v2.MsgDeactivateDidDocResponse";
  value: MsgDeactivateDidDocResponseAmino;
}
/** MsgDeactivateDidDocResponse defines response type for Msg/DeactivateDidDoc. */
export interface MsgDeactivateDidDocResponseSDKType {
  value: DidDocWithMetadataSDKType;
}
