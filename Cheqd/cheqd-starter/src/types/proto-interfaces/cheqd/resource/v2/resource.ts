/** Resource stores the contents of a DID-Linked Resource */
export interface Resource {
  /** bytes is the raw data of the Resource */
  data: Uint8Array;
}
export interface ResourceProtoMsg {
  typeUrl: "/cheqd.resource.v2.Resource";
  value: Uint8Array;
}
/** Resource stores the contents of a DID-Linked Resource */
export interface ResourceAmino {
  /** bytes is the raw data of the Resource */
  data: Uint8Array;
}
export interface ResourceAminoMsg {
  type: "/cheqd.resource.v2.Resource";
  value: ResourceAmino;
}
/** Resource stores the contents of a DID-Linked Resource */
export interface ResourceSDKType {
  data: Uint8Array;
}
/** Metadata stores the metadata of a DID-Linked Resource */
export interface Metadata {
  /**
   * collection_id is the ID of the collection that the Resource belongs to. Defined client-side.
   * This field is the unique identifier of the DID linked to this Resource
   * Format: <unique-identifier>
   * 
   * Examples:
   * - c82f2b02-bdab-4dd7-b833-3e143745d612
   * - wGHEXrZvJxR8vw5P3UWH1j
   */
  collectionId: string;
  /**
   * id is the ID of the Resource. Defined client-side.
   * This field is a unique identifier for this specific version of the Resource.
   * Format: <uuid>
   */
  id: string;
  /**
   * name is a human-readable name for the Resource. Defined client-side.
   * Does not change between different versions.
   * Example: PassportSchema, EducationTrustRegistry
   */
  name: string;
  /**
   * version is a human-readable semantic version for the Resource. Defined client-side.
   * Stored as a string. OPTIONAL.
   * Example: 1.0.0, v2.1.0
   */
  version?: string;
  /**
   * resource_type is a Resource type that identifies what the Resource is. Defined client-side.
   * This is NOT the same as the resource's media type.
   * Example: AnonCredsSchema, StatusList2021
   */
  resourceType: string;
  /** List of alternative URIs for the SAME Resource. */
  alsoKnownAs?: AlternativeUri[];
  /**
   * media_type is IANA media type of the Resource. Defined ledger-side.
   * Example: application/json, image/png
   */
  mediaType: string;
  /**
   * created is the time at which the Resource was created. Defined ledger-side.
   * Format: RFC3339
   * Example: 2021-01-01T00:00:00Z
   */
  created: Date;
  /**
   * checksum is a SHA-256 checksum hash of the Resource. Defined ledger-side.
   * Example: d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f
   */
  checksum: string;
  /**
   * previous_version_id is the ID of the previous version of the Resource. Defined ledger-side.
   * This is based on the Resource's name and Resource type to determine whether it's the same Resource.
   * Format: <uuid>
   */
  previousVersionId?: string;
  /**
   * next_version_id is the ID of the next version of the Resource. Defined ledger-side.
   * This is based on the Resource's name and Resource type to determine whether it's the same Resource.
   * Format: <uuid>
   */
  nextVersionId?: string;
}
export interface MetadataProtoMsg {
  typeUrl: "/cheqd.resource.v2.Metadata";
  value: Uint8Array;
}
/** Metadata stores the metadata of a DID-Linked Resource */
export interface MetadataAmino {
  /**
   * collection_id is the ID of the collection that the Resource belongs to. Defined client-side.
   * This field is the unique identifier of the DID linked to this Resource
   * Format: <unique-identifier>
   * 
   * Examples:
   * - c82f2b02-bdab-4dd7-b833-3e143745d612
   * - wGHEXrZvJxR8vw5P3UWH1j
   */
  collection_id: string;
  /**
   * id is the ID of the Resource. Defined client-side.
   * This field is a unique identifier for this specific version of the Resource.
   * Format: <uuid>
   */
  id: string;
  /**
   * name is a human-readable name for the Resource. Defined client-side.
   * Does not change between different versions.
   * Example: PassportSchema, EducationTrustRegistry
   */
  name: string;
  /**
   * version is a human-readable semantic version for the Resource. Defined client-side.
   * Stored as a string. OPTIONAL.
   * Example: 1.0.0, v2.1.0
   */
  version: string;
  /**
   * resource_type is a Resource type that identifies what the Resource is. Defined client-side.
   * This is NOT the same as the resource's media type.
   * Example: AnonCredsSchema, StatusList2021
   */
  resource_type: string;
  /** List of alternative URIs for the SAME Resource. */
  also_known_as: AlternativeUriAmino[];
  /**
   * media_type is IANA media type of the Resource. Defined ledger-side.
   * Example: application/json, image/png
   */
  media_type: string;
  /**
   * created is the time at which the Resource was created. Defined ledger-side.
   * Format: RFC3339
   * Example: 2021-01-01T00:00:00Z
   */
  created?: Date;
  /**
   * checksum is a SHA-256 checksum hash of the Resource. Defined ledger-side.
   * Example: d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f
   */
  checksum: string;
  /**
   * previous_version_id is the ID of the previous version of the Resource. Defined ledger-side.
   * This is based on the Resource's name and Resource type to determine whether it's the same Resource.
   * Format: <uuid>
   */
  previous_version_id: string;
  /**
   * next_version_id is the ID of the next version of the Resource. Defined ledger-side.
   * This is based on the Resource's name and Resource type to determine whether it's the same Resource.
   * Format: <uuid>
   */
  next_version_id: string;
}
export interface MetadataAminoMsg {
  type: "/cheqd.resource.v2.Metadata";
  value: MetadataAmino;
}
/** Metadata stores the metadata of a DID-Linked Resource */
export interface MetadataSDKType {
  collection_id: string;
  id: string;
  name: string;
  version?: string;
  resource_type: string;
  also_known_as?: AlternativeUriSDKType[];
  media_type: string;
  created: Date;
  checksum: string;
  previous_version_id?: string;
  next_version_id?: string;
}
/**
 * AlternativeUri are alternative URIs that can be used to access the Resource.
 * By default, at least the DID URI equivalent of the Resource is populated.
 */
export interface AlternativeUri {
  /**
   * uri is the URI of the Resource.
   * Examples:
   * - did:cheqd:testnet:MjYxNzYKMjYxNzYK/resources/4600ea35-8916-4ac4-b412-55b8f49dd94e
   * - https://resolver..cheqd.net/1.0/identifiers/did:cheqd:testnet:MjYxNzYKMjYxNzYK/resources/4600ea35-8916-4ac4-b412-55b8f49dd94e
   * - https://example.com/example.json
   * - https://gateway.ipfs.io/ipfs/bafybeihetj2ng3d74k7t754atv2s5dk76pcqtvxls6dntef3xa6rax25xe
   * - ipfs://bafybeihetj2ng3d74k7t754atv2s5dk76pcqtvxls6dntef3xa6rax25xe
   */
  uri: string;
  /**
   * description is a human-readable description of the URI. Defined client-side.
   * Examples:
   * - did-uri
   * - http-uri
   * - ipfs-uri
   */
  description: string;
}
export interface AlternativeUriProtoMsg {
  typeUrl: "/cheqd.resource.v2.AlternativeUri";
  value: Uint8Array;
}
/**
 * AlternativeUri are alternative URIs that can be used to access the Resource.
 * By default, at least the DID URI equivalent of the Resource is populated.
 */
export interface AlternativeUriAmino {
  /**
   * uri is the URI of the Resource.
   * Examples:
   * - did:cheqd:testnet:MjYxNzYKMjYxNzYK/resources/4600ea35-8916-4ac4-b412-55b8f49dd94e
   * - https://resolver..cheqd.net/1.0/identifiers/did:cheqd:testnet:MjYxNzYKMjYxNzYK/resources/4600ea35-8916-4ac4-b412-55b8f49dd94e
   * - https://example.com/example.json
   * - https://gateway.ipfs.io/ipfs/bafybeihetj2ng3d74k7t754atv2s5dk76pcqtvxls6dntef3xa6rax25xe
   * - ipfs://bafybeihetj2ng3d74k7t754atv2s5dk76pcqtvxls6dntef3xa6rax25xe
   */
  uri: string;
  /**
   * description is a human-readable description of the URI. Defined client-side.
   * Examples:
   * - did-uri
   * - http-uri
   * - ipfs-uri
   */
  description: string;
}
export interface AlternativeUriAminoMsg {
  type: "/cheqd.resource.v2.AlternativeUri";
  value: AlternativeUriAmino;
}
/**
 * AlternativeUri are alternative URIs that can be used to access the Resource.
 * By default, at least the DID URI equivalent of the Resource is populated.
 */
export interface AlternativeUriSDKType {
  uri: string;
  description: string;
}
/** ResourceWithMetadata describes the overall structure of a DID-Linked Resource */
export interface ResourceWithMetadata {
  resource: Resource;
  metadata: Metadata;
}
export interface ResourceWithMetadataProtoMsg {
  typeUrl: "/cheqd.resource.v2.ResourceWithMetadata";
  value: Uint8Array;
}
/** ResourceWithMetadata describes the overall structure of a DID-Linked Resource */
export interface ResourceWithMetadataAmino {
  resource?: ResourceAmino;
  metadata?: MetadataAmino;
}
export interface ResourceWithMetadataAminoMsg {
  type: "/cheqd.resource.v2.ResourceWithMetadata";
  value: ResourceWithMetadataAmino;
}
/** ResourceWithMetadata describes the overall structure of a DID-Linked Resource */
export interface ResourceWithMetadataSDKType {
  resource: ResourceSDKType;
  metadata: MetadataSDKType;
}