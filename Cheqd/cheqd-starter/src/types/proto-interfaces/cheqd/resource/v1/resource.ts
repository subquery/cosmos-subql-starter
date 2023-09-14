export interface Resource {
  header: ResourceHeader;
  data: Uint8Array;
}
export interface ResourceProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.resource.v1.Resource";
  value: Uint8Array;
}
export interface ResourceAmino {
  header?: ResourceHeaderAmino;
  data: Uint8Array;
}
export interface ResourceAminoMsg {
  type: "/cheqdid.cheqdnode.resource.v1.Resource";
  value: ResourceAmino;
}
export interface ResourceSDKType {
  header: ResourceHeaderSDKType;
  data: Uint8Array;
}
export interface ResourceHeader {
  collectionId: string;
  id: string;
  name: string;
  resourceType: string;
  mediaType: string;
  created: string;
  checksum: Uint8Array;
  previousVersionId: string;
  nextVersionId: string;
}
export interface ResourceHeaderProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.resource.v1.ResourceHeader";
  value: Uint8Array;
}
export interface ResourceHeaderAmino {
  collection_id: string;
  id: string;
  name: string;
  resource_type: string;
  media_type: string;
  created: string;
  checksum: Uint8Array;
  previous_version_id: string;
  next_version_id: string;
}
export interface ResourceHeaderAminoMsg {
  type: "/cheqdid.cheqdnode.resource.v1.ResourceHeader";
  value: ResourceHeaderAmino;
}
export interface ResourceHeaderSDKType {
  collection_id: string;
  id: string;
  name: string;
  resource_type: string;
  media_type: string;
  created: string;
  checksum: Uint8Array;
  previous_version_id: string;
  next_version_id: string;
}