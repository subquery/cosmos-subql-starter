import {
  DidDocWithMetadata,
  DidDocWithMetadataAmino,
  DidDocWithMetadataSDKType,
} from "./diddoc";
import { FeeParams, FeeParamsAmino, FeeParamsSDKType } from "./fee";
/**
 * DidDocVersionSet contains all versions of DID Documents and their metadata for a given DID.
 * The latest version of the DID Document set is stored in the latest_version field.
 */
export interface DidDocVersionSet {
  /** Latest version of the DID Document set */
  latestVersion: string;
  /** All versions of the DID Document set */
  didDocs: DidDocWithMetadata[];
}
export interface DidDocVersionSetProtoMsg {
  typeUrl: "/cheqd.did.v2.DidDocVersionSet";
  value: Uint8Array;
}
/**
 * DidDocVersionSet contains all versions of DID Documents and their metadata for a given DID.
 * The latest version of the DID Document set is stored in the latest_version field.
 */
export interface DidDocVersionSetAmino {
  /** Latest version of the DID Document set */
  latest_version: string;
  /** All versions of the DID Document set */
  did_docs: DidDocWithMetadataAmino[];
}
export interface DidDocVersionSetAminoMsg {
  type: "/cheqd.did.v2.DidDocVersionSet";
  value: DidDocVersionSetAmino;
}
/**
 * DidDocVersionSet contains all versions of DID Documents and their metadata for a given DID.
 * The latest version of the DID Document set is stored in the latest_version field.
 */
export interface DidDocVersionSetSDKType {
  latest_version: string;
  did_docs: DidDocWithMetadataSDKType[];
}
/** GenesisState defines the cheqd DID module's genesis state. */
export interface GenesisState {
  /**
   * Namespace for the DID module
   * Example: mainnet, testnet, local
   */
  didNamespace: string;
  /** All DID Document version sets (contains all versions of all DID Documents) */
  versionSets: DidDocVersionSet[];
  /**
   * Fee parameters for the DID module
   * Defines fixed fees and burn percentage for each DID operation type (create, update, delete)
   */
  feeParams: FeeParams;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/cheqd.did.v2.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the cheqd DID module's genesis state. */
export interface GenesisStateAmino {
  /**
   * Namespace for the DID module
   * Example: mainnet, testnet, local
   */
  did_namespace: string;
  /** All DID Document version sets (contains all versions of all DID Documents) */
  version_sets: DidDocVersionSetAmino[];
  /**
   * Fee parameters for the DID module
   * Defines fixed fees and burn percentage for each DID operation type (create, update, delete)
   */
  fee_params?: FeeParamsAmino;
}
export interface GenesisStateAminoMsg {
  type: "/cheqd.did.v2.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the cheqd DID module's genesis state. */
export interface GenesisStateSDKType {
  did_namespace: string;
  version_sets: DidDocVersionSetSDKType[];
  fee_params: FeeParamsSDKType;
}
