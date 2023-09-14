/**
 * DidDoc defines a DID Document, as defined in the DID Core specification.
 * Documentation: https://www.w3.org/TR/did-core/
 */
export interface DidDoc {
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
  /** service is a list of services that can be used to interact with the DID subject. */
  service: Service[];
  /** alsoKnownAs is a list of DIDs that are known to refer to the same DID subject. */
  alsoKnownAs: string[];
}
export interface DidDocProtoMsg {
  typeUrl: "/cheqd.did.v2.DidDoc";
  value: Uint8Array;
}
/**
 * DidDoc defines a DID Document, as defined in the DID Core specification.
 * Documentation: https://www.w3.org/TR/did-core/
 */
export interface DidDocAmino {
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
  /** service is a list of services that can be used to interact with the DID subject. */
  service: ServiceAmino[];
  /** alsoKnownAs is a list of DIDs that are known to refer to the same DID subject. */
  also_known_as: string[];
}
export interface DidDocAminoMsg {
  type: "/cheqd.did.v2.DidDoc";
  value: DidDocAmino;
}
/**
 * DidDoc defines a DID Document, as defined in the DID Core specification.
 * Documentation: https://www.w3.org/TR/did-core/
 */
export interface DidDocSDKType {
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
/**
 * VerificationMethod defines a verification method, as defined in the DID Core specification.
 * Documentation: https://www.w3.org/TR/did-core/#verification-methods
 */
export interface VerificationMethod {
  /**
   * id is the unique identifier of the verification method.
   * Format: did:cheqd:<namespace>:<unique-identifier>#<key-id>
   */
  id: string;
  /**
   * type is the type of the verification method.
   * Example: Ed25519VerificationKey2020
   */
  verificationMethodType: string;
  /**
   * controller is the DID of the controller of the verification method.
   * Format: did:cheqd:<namespace>:<unique-identifier>
   */
  controller: string;
  /**
   * verification_material is the public key of the verification method.
   * Commonly used verification material types: publicJwk, publicKeyBase58, publicKeyMultibase
   */
  verificationMaterial: string;
}
export interface VerificationMethodProtoMsg {
  typeUrl: "/cheqd.did.v2.VerificationMethod";
  value: Uint8Array;
}
/**
 * VerificationMethod defines a verification method, as defined in the DID Core specification.
 * Documentation: https://www.w3.org/TR/did-core/#verification-methods
 */
export interface VerificationMethodAmino {
  /**
   * id is the unique identifier of the verification method.
   * Format: did:cheqd:<namespace>:<unique-identifier>#<key-id>
   */
  id: string;
  /**
   * type is the type of the verification method.
   * Example: Ed25519VerificationKey2020
   */
  verification_method_type: string;
  /**
   * controller is the DID of the controller of the verification method.
   * Format: did:cheqd:<namespace>:<unique-identifier>
   */
  controller: string;
  /**
   * verification_material is the public key of the verification method.
   * Commonly used verification material types: publicJwk, publicKeyBase58, publicKeyMultibase
   */
  verification_material: string;
}
export interface VerificationMethodAminoMsg {
  type: "/cheqd.did.v2.VerificationMethod";
  value: VerificationMethodAmino;
}
/**
 * VerificationMethod defines a verification method, as defined in the DID Core specification.
 * Documentation: https://www.w3.org/TR/did-core/#verification-methods
 */
export interface VerificationMethodSDKType {
  id: string;
  verification_method_type: string;
  controller: string;
  verification_material: string;
}
/**
 * Service defines a service, as defined in the DID Core specification.
 * Documentation: https://www.w3.org/TR/did-core/#services
 */
export interface Service {
  /**
   * id is the unique identifier of the service.
   * Format: did:cheqd:<namespace>:<unique-identifier>#<service-id>
   */
  id: string;
  /**
   * type is the type of the service.
   * Example: LinkedResource
   */
  serviceType: string;
  /**
   * serviceEndpoint is the endpoint of the service.
   * Example: https://example.com/endpoint
   */
  serviceEndpoint: string[];
}
export interface ServiceProtoMsg {
  typeUrl: "/cheqd.did.v2.Service";
  value: Uint8Array;
}
/**
 * Service defines a service, as defined in the DID Core specification.
 * Documentation: https://www.w3.org/TR/did-core/#services
 */
export interface ServiceAmino {
  /**
   * id is the unique identifier of the service.
   * Format: did:cheqd:<namespace>:<unique-identifier>#<service-id>
   */
  id: string;
  /**
   * type is the type of the service.
   * Example: LinkedResource
   */
  service_type: string;
  /**
   * serviceEndpoint is the endpoint of the service.
   * Example: https://example.com/endpoint
   */
  service_endpoint: string[];
}
export interface ServiceAminoMsg {
  type: "/cheqd.did.v2.Service";
  value: ServiceAmino;
}
/**
 * Service defines a service, as defined in the DID Core specification.
 * Documentation: https://www.w3.org/TR/did-core/#services
 */
export interface ServiceSDKType {
  id: string;
  service_type: string;
  service_endpoint: string[];
}
/**
 * DidDocWithMetadata defines a DID Document with metadata, as defined in the DID Core specification.
 * Contains the DID Document, as well as DID Document metadata.
 */
export interface DidDocWithMetadata {
  /** didDocument is the DID Document. */
  didDoc: DidDoc;
  /** didDocumentMetadata is the DID Document metadata. */
  metadata: Metadata;
}
export interface DidDocWithMetadataProtoMsg {
  typeUrl: "/cheqd.did.v2.DidDocWithMetadata";
  value: Uint8Array;
}
/**
 * DidDocWithMetadata defines a DID Document with metadata, as defined in the DID Core specification.
 * Contains the DID Document, as well as DID Document metadata.
 */
export interface DidDocWithMetadataAmino {
  /** didDocument is the DID Document. */
  did_doc?: DidDocAmino;
  /** didDocumentMetadata is the DID Document metadata. */
  metadata?: MetadataAmino;
}
export interface DidDocWithMetadataAminoMsg {
  type: "/cheqd.did.v2.DidDocWithMetadata";
  value: DidDocWithMetadataAmino;
}
/**
 * DidDocWithMetadata defines a DID Document with metadata, as defined in the DID Core specification.
 * Contains the DID Document, as well as DID Document metadata.
 */
export interface DidDocWithMetadataSDKType {
  did_doc: DidDocSDKType;
  metadata: MetadataSDKType;
}
/**
 * Metadata defines DID Document metadata, as defined in the DID Core specification.
 * Documentation: https://www.w3.org/TR/did-core/#did-document-metadata-properties
 */
export interface Metadata {
  /**
   * created is the timestamp of the creation of the DID Document.
   * Format: RFC3339
   * Example: 2021-03-10T15:16:17Z
   */
  created: Date;
  /**
   * updated is the timestamp of the last update of the DID Document.
   * Format: RFC3339
   * Example: 2021-03-10T15:16:17Z
   */
  updated?: Date;
  /**
   * deactivated is a flag that indicates whether the DID Document is deactivated.
   * Default: false
   */
  deactivated: boolean;
  /**
   * version_id is the version identifier of the DID Document.
   * Format: UUID
   * Example: 123e4567-e89b-12d3-a456-426655440000
   */
  versionId: string;
  /**
   * next_version_id is the version identifier of the next version of the DID Document.
   * Format: UUID
   * Example: 123e4567-e89b-12d3-a456-426655440000
   */
  nextVersionId?: string;
  /**
   * previous_version_id is the version identifier of the previous version of the DID Document.
   * Format: UUID
   * Example: 123e4567-e89b-12d3-a456-426655440000
   */
  previousVersionId?: string;
}
export interface MetadataProtoMsg {
  typeUrl: "/cheqd.did.v2.Metadata";
  value: Uint8Array;
}
/**
 * Metadata defines DID Document metadata, as defined in the DID Core specification.
 * Documentation: https://www.w3.org/TR/did-core/#did-document-metadata-properties
 */
export interface MetadataAmino {
  /**
   * created is the timestamp of the creation of the DID Document.
   * Format: RFC3339
   * Example: 2021-03-10T15:16:17Z
   */
  created?: Date;
  /**
   * updated is the timestamp of the last update of the DID Document.
   * Format: RFC3339
   * Example: 2021-03-10T15:16:17Z
   */
  updated?: Date;
  /**
   * deactivated is a flag that indicates whether the DID Document is deactivated.
   * Default: false
   */
  deactivated: boolean;
  /**
   * version_id is the version identifier of the DID Document.
   * Format: UUID
   * Example: 123e4567-e89b-12d3-a456-426655440000
   */
  version_id: string;
  /**
   * next_version_id is the version identifier of the next version of the DID Document.
   * Format: UUID
   * Example: 123e4567-e89b-12d3-a456-426655440000
   */
  next_version_id: string;
  /**
   * previous_version_id is the version identifier of the previous version of the DID Document.
   * Format: UUID
   * Example: 123e4567-e89b-12d3-a456-426655440000
   */
  previous_version_id: string;
}
export interface MetadataAminoMsg {
  type: "/cheqd.did.v2.Metadata";
  value: MetadataAmino;
}
/**
 * Metadata defines DID Document metadata, as defined in the DID Core specification.
 * Documentation: https://www.w3.org/TR/did-core/#did-document-metadata-properties
 */
export interface MetadataSDKType {
  created: Date;
  updated?: Date;
  deactivated: boolean;
  version_id: string;
  next_version_id?: string;
  previous_version_id?: string;
}
