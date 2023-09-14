import { Long } from "../../../../helpers";
/**
 * CommitInfo defines commit information used by the multi-store when committing
 * a version/height.
 */
export interface CommitInfo {
  version: Long;
  storeInfos: StoreInfo[];
}
export interface CommitInfoProtoMsg {
  typeUrl: "/cosmos.base.store.v1beta1.CommitInfo";
  value: Uint8Array;
}
/**
 * CommitInfo defines commit information used by the multi-store when committing
 * a version/height.
 */
export interface CommitInfoAmino {
  version: string;
  store_infos: StoreInfoAmino[];
}
export interface CommitInfoAminoMsg {
  type: "cosmos-sdk/CommitInfo";
  value: CommitInfoAmino;
}
/**
 * CommitInfo defines commit information used by the multi-store when committing
 * a version/height.
 */
export interface CommitInfoSDKType {
  version: Long;
  store_infos: StoreInfoSDKType[];
}
/**
 * StoreInfo defines store-specific commit information. It contains a reference
 * between a store name and the commit ID.
 */
export interface StoreInfo {
  name: string;
  commitId: CommitID;
}
export interface StoreInfoProtoMsg {
  typeUrl: "/cosmos.base.store.v1beta1.StoreInfo";
  value: Uint8Array;
}
/**
 * StoreInfo defines store-specific commit information. It contains a reference
 * between a store name and the commit ID.
 */
export interface StoreInfoAmino {
  name: string;
  commit_id?: CommitIDAmino;
}
export interface StoreInfoAminoMsg {
  type: "cosmos-sdk/StoreInfo";
  value: StoreInfoAmino;
}
/**
 * StoreInfo defines store-specific commit information. It contains a reference
 * between a store name and the commit ID.
 */
export interface StoreInfoSDKType {
  name: string;
  commit_id: CommitIDSDKType;
}
/**
 * CommitID defines the committment information when a specific store is
 * committed.
 */
export interface CommitID {
  version: Long;
  hash: Uint8Array;
}
export interface CommitIDProtoMsg {
  typeUrl: "/cosmos.base.store.v1beta1.CommitID";
  value: Uint8Array;
}
/**
 * CommitID defines the committment information when a specific store is
 * committed.
 */
export interface CommitIDAmino {
  version: string;
  hash: Uint8Array;
}
export interface CommitIDAminoMsg {
  type: "cosmos-sdk/CommitID";
  value: CommitIDAmino;
}
/**
 * CommitID defines the committment information when a specific store is
 * committed.
 */
export interface CommitIDSDKType {
  version: Long;
  hash: Uint8Array;
}
