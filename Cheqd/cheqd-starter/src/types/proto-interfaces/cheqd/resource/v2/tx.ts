import { SignInfo, SignInfoAmino, SignInfoSDKType } from "../../did/v2/tx";
import { AlternativeUri, AlternativeUriAmino, AlternativeUriSDKType, Metadata, MetadataAmino, MetadataSDKType } from "./resource";
/**
 * MsgCreateResource defines the Msg/CreateResource request type.
 * It describes the parameters of a request for creating a resource.
 */
export interface MsgCreateResource {
  /** Payload containing the resource to be created. */
  payload: MsgCreateResourcePayload;
  /** Signatures of the corresponding DID Document's controller(s). */
  signatures: SignInfo[];
}
export interface MsgCreateResourceProtoMsg {
  typeUrl: "/cheqd.resource.v2.MsgCreateResource";
  value: Uint8Array;
}
/**
 * MsgCreateResource defines the Msg/CreateResource request type.
 * It describes the parameters of a request for creating a resource.
 */
export interface MsgCreateResourceAmino {
  /** Payload containing the resource to be created. */
  payload?: MsgCreateResourcePayloadAmino;
  /** Signatures of the corresponding DID Document's controller(s). */
  signatures: SignInfoAmino[];
}
export interface MsgCreateResourceAminoMsg {
  type: "/cheqd.resource.v2.MsgCreateResource";
  value: MsgCreateResourceAmino;
}
/**
 * MsgCreateResource defines the Msg/CreateResource request type.
 * It describes the parameters of a request for creating a resource.
 */
export interface MsgCreateResourceSDKType {
  payload: MsgCreateResourcePayloadSDKType;
  signatures: SignInfoSDKType[];
}
/**
 * MsgCreateResourcePayload defines the structure of the payload for creating a resource.
 * 
 * If a resource with the given id does not exist already,
 * it will be created. The resource will be created in the resource collection.
 * 
 * If a resource with the given id, collection_id already exists, an error code 2200 will be returned.
 * 
 * A new version of the resource in an existing collection will be created,
 * if a resource in that collection with the same name, resource_type and empty next_version_id exists.
 * 
 * An update operation is not possible, because the resource is immutable by design.
 */
export interface MsgCreateResourcePayload {
  /** data is a byte-representation of the actual Data the user wants to store. */
  data: Uint8Array;
  /**
   * collection_id is an identifier of the DidDocument the resource belongs to.
   * Format: <unique-identifier>
   * 
   * Examples:
   * - c82f2b02-bdab-4dd7-b833-3e143745d612
   * - wGHEXrZvJxR8vw5P3UWH1j
   */
  collectionId: string;
  /**
   * id is a unique id of the resource.
   * Format: <uuid>
   */
  id: string;
  /**
   * name is a human-readable name of the resource.
   * Format: <string>
   * 
   * Does not change between different versions.
   * Example: PassportSchema, EducationTrustRegistry
   */
  name: string;
  /**
   * version is a version of the resource.
   * Format: <string>
   * Stored as a string. OPTIONAL.
   * 
   * Example: 1.0.0, v2.1.0
   */
  version?: string;
  /**
   * resource_type is a type of the resource.
   * Format: <string>
   * 
   * This is NOT the same as the resource's media type.
   * Example: AnonCredsSchema, StatusList2021
   */
  resourceType: string;
  /** also_known_as is a list of URIs that can be used to get the resource. */
  alsoKnownAs?: AlternativeUri[];
}
export interface MsgCreateResourcePayloadProtoMsg {
  typeUrl: "/cheqd.resource.v2.MsgCreateResourcePayload";
  value: Uint8Array;
}
/**
 * MsgCreateResourcePayload defines the structure of the payload for creating a resource.
 * 
 * If a resource with the given id does not exist already,
 * it will be created. The resource will be created in the resource collection.
 * 
 * If a resource with the given id, collection_id already exists, an error code 2200 will be returned.
 * 
 * A new version of the resource in an existing collection will be created,
 * if a resource in that collection with the same name, resource_type and empty next_version_id exists.
 * 
 * An update operation is not possible, because the resource is immutable by design.
 */
export interface MsgCreateResourcePayloadAmino {
  /** data is a byte-representation of the actual Data the user wants to store. */
  data: Uint8Array;
  /**
   * collection_id is an identifier of the DidDocument the resource belongs to.
   * Format: <unique-identifier>
   * 
   * Examples:
   * - c82f2b02-bdab-4dd7-b833-3e143745d612
   * - wGHEXrZvJxR8vw5P3UWH1j
   */
  collection_id: string;
  /**
   * id is a unique id of the resource.
   * Format: <uuid>
   */
  id: string;
  /**
   * name is a human-readable name of the resource.
   * Format: <string>
   * 
   * Does not change between different versions.
   * Example: PassportSchema, EducationTrustRegistry
   */
  name: string;
  /**
   * version is a version of the resource.
   * Format: <string>
   * Stored as a string. OPTIONAL.
   * 
   * Example: 1.0.0, v2.1.0
   */
  version: string;
  /**
   * resource_type is a type of the resource.
   * Format: <string>
   * 
   * This is NOT the same as the resource's media type.
   * Example: AnonCredsSchema, StatusList2021
   */
  resource_type: string;
  /** also_known_as is a list of URIs that can be used to get the resource. */
  also_known_as: AlternativeUriAmino[];
}
export interface MsgCreateResourcePayloadAminoMsg {
  type: "/cheqd.resource.v2.MsgCreateResourcePayload";
  value: MsgCreateResourcePayloadAmino;
}
/**
 * MsgCreateResourcePayload defines the structure of the payload for creating a resource.
 * 
 * If a resource with the given id does not exist already,
 * it will be created. The resource will be created in the resource collection.
 * 
 * If a resource with the given id, collection_id already exists, an error code 2200 will be returned.
 * 
 * A new version of the resource in an existing collection will be created,
 * if a resource in that collection with the same name, resource_type and empty next_version_id exists.
 * 
 * An update operation is not possible, because the resource is immutable by design.
 */
export interface MsgCreateResourcePayloadSDKType {
  data: Uint8Array;
  collection_id: string;
  id: string;
  name: string;
  version?: string;
  resource_type: string;
  also_known_as?: AlternativeUriSDKType[];
}
export interface MsgCreateResourceResponse {
  /** Return the created resource metadata. */
  resource: Metadata;
}
export interface MsgCreateResourceResponseProtoMsg {
  typeUrl: "/cheqd.resource.v2.MsgCreateResourceResponse";
  value: Uint8Array;
}
export interface MsgCreateResourceResponseAmino {
  /** Return the created resource metadata. */
  resource?: MetadataAmino;
}
export interface MsgCreateResourceResponseAminoMsg {
  type: "/cheqd.resource.v2.MsgCreateResourceResponse";
  value: MsgCreateResourceResponseAmino;
}
export interface MsgCreateResourceResponseSDKType {
  resource: MetadataSDKType;
}