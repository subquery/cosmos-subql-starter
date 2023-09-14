import {
  CapabilityOwners,
  CapabilityOwnersAmino,
  CapabilityOwnersSDKType,
} from "./capability";
import { Long } from "../../../helpers";
/** GenesisOwners defines the capability owners with their corresponding index. */
export interface GenesisOwners {
  /** index is the index of the capability owner. */
  index: Long;
  /** index_owners are the owners at the given index. */
  indexOwners: CapabilityOwners;
}
export interface GenesisOwnersProtoMsg {
  typeUrl: "/cosmos.capability.v1beta1.GenesisOwners";
  value: Uint8Array;
}
/** GenesisOwners defines the capability owners with their corresponding index. */
export interface GenesisOwnersAmino {
  /** index is the index of the capability owner. */
  index: string;
  /** index_owners are the owners at the given index. */
  index_owners?: CapabilityOwnersAmino;
}
export interface GenesisOwnersAminoMsg {
  type: "cosmos-sdk/GenesisOwners";
  value: GenesisOwnersAmino;
}
/** GenesisOwners defines the capability owners with their corresponding index. */
export interface GenesisOwnersSDKType {
  index: Long;
  index_owners: CapabilityOwnersSDKType;
}
/** GenesisState defines the capability module's genesis state. */
export interface GenesisState {
  /** index is the capability global index. */
  index: Long;
  /**
   * owners represents a map from index to owners of the capability index
   * index key is string to allow amino marshalling.
   */
  owners: GenesisOwners[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/cosmos.capability.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the capability module's genesis state. */
export interface GenesisStateAmino {
  /** index is the capability global index. */
  index: string;
  /**
   * owners represents a map from index to owners of the capability index
   * index key is string to allow amino marshalling.
   */
  owners: GenesisOwnersAmino[];
}
export interface GenesisStateAminoMsg {
  type: "cosmos-sdk/GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the capability module's genesis state. */
export interface GenesisStateSDKType {
  index: Long;
  owners: GenesisOwnersSDKType[];
}
