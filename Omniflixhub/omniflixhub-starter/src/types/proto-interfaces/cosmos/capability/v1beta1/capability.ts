import { Long } from "../../../helpers";
/**
 * Capability defines an implementation of an object capability. The index
 * provided to a Capability must be globally unique.
 */
export interface Capability {
  index: Long;
}
export interface CapabilityProtoMsg {
  typeUrl: "/cosmos.capability.v1beta1.Capability";
  value: Uint8Array;
}
/**
 * Capability defines an implementation of an object capability. The index
 * provided to a Capability must be globally unique.
 */
export interface CapabilityAmino {
  index: string;
}
export interface CapabilityAminoMsg {
  type: "cosmos-sdk/Capability";
  value: CapabilityAmino;
}
/**
 * Capability defines an implementation of an object capability. The index
 * provided to a Capability must be globally unique.
 */
export interface CapabilitySDKType {
  index: Long;
}
/**
 * Owner defines a single capability owner. An owner is defined by the name of
 * capability and the module name.
 */
export interface Owner {
  module: string;
  name: string;
}
export interface OwnerProtoMsg {
  typeUrl: "/cosmos.capability.v1beta1.Owner";
  value: Uint8Array;
}
/**
 * Owner defines a single capability owner. An owner is defined by the name of
 * capability and the module name.
 */
export interface OwnerAmino {
  module: string;
  name: string;
}
export interface OwnerAminoMsg {
  type: "cosmos-sdk/Owner";
  value: OwnerAmino;
}
/**
 * Owner defines a single capability owner. An owner is defined by the name of
 * capability and the module name.
 */
export interface OwnerSDKType {
  module: string;
  name: string;
}
/**
 * CapabilityOwners defines a set of owners of a single Capability. The set of
 * owners must be unique.
 */
export interface CapabilityOwners {
  owners: Owner[];
}
export interface CapabilityOwnersProtoMsg {
  typeUrl: "/cosmos.capability.v1beta1.CapabilityOwners";
  value: Uint8Array;
}
/**
 * CapabilityOwners defines a set of owners of a single Capability. The set of
 * owners must be unique.
 */
export interface CapabilityOwnersAmino {
  owners: OwnerAmino[];
}
export interface CapabilityOwnersAminoMsg {
  type: "cosmos-sdk/CapabilityOwners";
  value: CapabilityOwnersAmino;
}
/**
 * CapabilityOwners defines a set of owners of a single Capability. The set of
 * owners must be unique.
 */
export interface CapabilityOwnersSDKType {
  owners: OwnerSDKType[];
}
