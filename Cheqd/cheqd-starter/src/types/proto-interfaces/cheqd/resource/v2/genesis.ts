import {
  ResourceWithMetadata,
  ResourceWithMetadataAmino,
  ResourceWithMetadataSDKType,
} from "./resource";
import { FeeParams, FeeParamsAmino, FeeParamsSDKType } from "./fee";
/** GenesisState defines the chqed Resource module's genesis state */
export interface GenesisState {
  /** All Resources with metadata */
  resources: ResourceWithMetadata[];
  /**
   * Fee parameters for the Resource module
   * Defines fixed fees and burn percentage for resources
   */
  feeParams: FeeParams;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/cheqd.resource.v2.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the chqed Resource module's genesis state */
export interface GenesisStateAmino {
  /** All Resources with metadata */
  resources: ResourceWithMetadataAmino[];
  /**
   * Fee parameters for the Resource module
   * Defines fixed fees and burn percentage for resources
   */
  fee_params?: FeeParamsAmino;
}
export interface GenesisStateAminoMsg {
  type: "/cheqd.resource.v2.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the chqed Resource module's genesis state */
export interface GenesisStateSDKType {
  resources: ResourceWithMetadataSDKType[];
  fee_params: FeeParamsSDKType;
}
