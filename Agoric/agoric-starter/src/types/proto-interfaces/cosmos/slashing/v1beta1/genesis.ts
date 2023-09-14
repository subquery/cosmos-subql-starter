import {
  Params,
  ParamsAmino,
  ParamsSDKType,
  ValidatorSigningInfo,
  ValidatorSigningInfoAmino,
  ValidatorSigningInfoSDKType,
} from "./slashing";
import { Long } from "../../../helpers";
/** GenesisState defines the slashing module's genesis state. */
export interface GenesisState {
  /** params defines all the paramaters of related to deposit. */
  params: Params;
  /**
   * signing_infos represents a map between validator addresses and their
   * signing infos.
   */
  signingInfos: SigningInfo[];
  /**
   * missed_blocks represents a map between validator addresses and their
   * missed blocks.
   */
  missedBlocks: ValidatorMissedBlocks[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/cosmos.slashing.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the slashing module's genesis state. */
export interface GenesisStateAmino {
  /** params defines all the paramaters of related to deposit. */
  params?: ParamsAmino;
  /**
   * signing_infos represents a map between validator addresses and their
   * signing infos.
   */
  signing_infos: SigningInfoAmino[];
  /**
   * missed_blocks represents a map between validator addresses and their
   * missed blocks.
   */
  missed_blocks: ValidatorMissedBlocksAmino[];
}
export interface GenesisStateAminoMsg {
  type: "cosmos-sdk/GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the slashing module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  signing_infos: SigningInfoSDKType[];
  missed_blocks: ValidatorMissedBlocksSDKType[];
}
/** SigningInfo stores validator signing info of corresponding address. */
export interface SigningInfo {
  /** address is the validator address. */
  address: string;
  /** validator_signing_info represents the signing info of this validator. */
  validatorSigningInfo: ValidatorSigningInfo;
}
export interface SigningInfoProtoMsg {
  typeUrl: "/cosmos.slashing.v1beta1.SigningInfo";
  value: Uint8Array;
}
/** SigningInfo stores validator signing info of corresponding address. */
export interface SigningInfoAmino {
  /** address is the validator address. */
  address: string;
  /** validator_signing_info represents the signing info of this validator. */
  validator_signing_info?: ValidatorSigningInfoAmino;
}
export interface SigningInfoAminoMsg {
  type: "cosmos-sdk/SigningInfo";
  value: SigningInfoAmino;
}
/** SigningInfo stores validator signing info of corresponding address. */
export interface SigningInfoSDKType {
  address: string;
  validator_signing_info: ValidatorSigningInfoSDKType;
}
/**
 * ValidatorMissedBlocks contains array of missed blocks of corresponding
 * address.
 */
export interface ValidatorMissedBlocks {
  /** address is the validator address. */
  address: string;
  /** missed_blocks is an array of missed blocks by the validator. */
  missedBlocks: MissedBlock[];
}
export interface ValidatorMissedBlocksProtoMsg {
  typeUrl: "/cosmos.slashing.v1beta1.ValidatorMissedBlocks";
  value: Uint8Array;
}
/**
 * ValidatorMissedBlocks contains array of missed blocks of corresponding
 * address.
 */
export interface ValidatorMissedBlocksAmino {
  /** address is the validator address. */
  address: string;
  /** missed_blocks is an array of missed blocks by the validator. */
  missed_blocks: MissedBlockAmino[];
}
export interface ValidatorMissedBlocksAminoMsg {
  type: "cosmos-sdk/ValidatorMissedBlocks";
  value: ValidatorMissedBlocksAmino;
}
/**
 * ValidatorMissedBlocks contains array of missed blocks of corresponding
 * address.
 */
export interface ValidatorMissedBlocksSDKType {
  address: string;
  missed_blocks: MissedBlockSDKType[];
}
/** MissedBlock contains height and missed status as boolean. */
export interface MissedBlock {
  /** index is the height at which the block was missed. */
  index: Long;
  /** missed is the missed status. */
  missed: boolean;
}
export interface MissedBlockProtoMsg {
  typeUrl: "/cosmos.slashing.v1beta1.MissedBlock";
  value: Uint8Array;
}
/** MissedBlock contains height and missed status as boolean. */
export interface MissedBlockAmino {
  /** index is the height at which the block was missed. */
  index: string;
  /** missed is the missed status. */
  missed: boolean;
}
export interface MissedBlockAminoMsg {
  type: "cosmos-sdk/MissedBlock";
  value: MissedBlockAmino;
}
/** MissedBlock contains height and missed status as boolean. */
export interface MissedBlockSDKType {
  index: Long;
  missed: boolean;
}
