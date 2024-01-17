import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
/** ConditionType defines the type of condition that a recipient must execute in order to receive a claimable amount. */
export enum ConditionType {
  /** CONDITION_TYPE_UNSPECIFIED - CONDITION_TYPE_UNSPECIFIED specifies an unknown condition type */
  CONDITION_TYPE_UNSPECIFIED = 0,
  /** CONDITION_TYPE_DEPOSIT - CONDITION_TYPE_DEPOSIT specifies deposit condition type */
  CONDITION_TYPE_DEPOSIT = 1,
  /** CONDITION_TYPE_SWAP - CONDITION_TYPE_SWAP specifies swap condition type */
  CONDITION_TYPE_SWAP = 2,
  /** CONDITION_TYPE_LIQUIDSTAKE - CONDITION_TYPE_LIQUIDSTAKE specifies liquid stake condition type */
  CONDITION_TYPE_LIQUIDSTAKE = 3,
  /** CONDITION_TYPE_VOTE - CONDITION_TYPE_VOTE specifies governance vote condition type */
  CONDITION_TYPE_VOTE = 4,
  UNRECOGNIZED = -1,
}
export const ConditionTypeSDKType = ConditionType;
export const ConditionTypeAmino = ConditionType;
export function conditionTypeFromJSON(object: any): ConditionType {
  switch (object) {
    case 0:
    case "CONDITION_TYPE_UNSPECIFIED":
      return ConditionType.CONDITION_TYPE_UNSPECIFIED;
    case 1:
    case "CONDITION_TYPE_DEPOSIT":
      return ConditionType.CONDITION_TYPE_DEPOSIT;
    case 2:
    case "CONDITION_TYPE_SWAP":
      return ConditionType.CONDITION_TYPE_SWAP;
    case 3:
    case "CONDITION_TYPE_LIQUIDSTAKE":
      return ConditionType.CONDITION_TYPE_LIQUIDSTAKE;
    case 4:
    case "CONDITION_TYPE_VOTE":
      return ConditionType.CONDITION_TYPE_VOTE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ConditionType.UNRECOGNIZED;
  }
}
export function conditionTypeToJSON(object: ConditionType): string {
  switch (object) {
    case ConditionType.CONDITION_TYPE_UNSPECIFIED:
      return "CONDITION_TYPE_UNSPECIFIED";
    case ConditionType.CONDITION_TYPE_DEPOSIT:
      return "CONDITION_TYPE_DEPOSIT";
    case ConditionType.CONDITION_TYPE_SWAP:
      return "CONDITION_TYPE_SWAP";
    case ConditionType.CONDITION_TYPE_LIQUIDSTAKE:
      return "CONDITION_TYPE_LIQUIDSTAKE";
    case ConditionType.CONDITION_TYPE_VOTE:
      return "CONDITION_TYPE_VOTE";
    case ConditionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Airdrop defines airdrop information. */
export interface Airdrop {
  /** id specifies index of the airdrop */
  id: Long;
  /**
   * source_address defines the bech32-encoded source address
   * where the source of coins from
   */
  sourceAddress: string;
  /** conditions specifies a list of conditions */
  conditions: ConditionType[];
  /** start_time specifies the start time of the airdrop */
  startTime: Date;
  /** end_time specifies the start time of the airdrop */
  endTime: Date;
}
export interface AirdropProtoMsg {
  typeUrl: "/crescent.claim.v1beta1.Airdrop";
  value: Uint8Array;
}
/** Airdrop defines airdrop information. */
export interface AirdropAmino {
  /** id specifies index of the airdrop */
  id: string;
  /**
   * source_address defines the bech32-encoded source address
   * where the source of coins from
   */
  source_address: string;
  /** conditions specifies a list of conditions */
  conditions: ConditionType[];
  /** start_time specifies the start time of the airdrop */
  start_time?: Date;
  /** end_time specifies the start time of the airdrop */
  end_time?: Date;
}
export interface AirdropAminoMsg {
  type: "/crescent.claim.v1beta1.Airdrop";
  value: AirdropAmino;
}
/** Airdrop defines airdrop information. */
export interface AirdropSDKType {
  id: Long;
  source_address: string;
  conditions: ConditionType[];
  start_time: Date;
  end_time: Date;
}
/** ClaimRecord defines claim record that corresponds to the airdrop. */
export interface ClaimRecord {
  /** airdrop_id specifies airdrop id */
  airdropId: Long;
  /** recipient specifies the bech32-encoded address that is eligible to claim airdrop */
  recipient: string;
  /** initial_claimable_coins specifies the initial claimable coins */
  initialClaimableCoins: Coin[];
  /** claimable_coins specifies the unclaimed claimable coins */
  claimableCoins: Coin[];
  /**
   * claimed_conditions specifies a list of condition types
   * initial values are empty and each condition type gets appended when claim is successfully executed
   */
  claimedConditions: ConditionType[];
}
export interface ClaimRecordProtoMsg {
  typeUrl: "/crescent.claim.v1beta1.ClaimRecord";
  value: Uint8Array;
}
/** ClaimRecord defines claim record that corresponds to the airdrop. */
export interface ClaimRecordAmino {
  /** airdrop_id specifies airdrop id */
  airdrop_id: string;
  /** recipient specifies the bech32-encoded address that is eligible to claim airdrop */
  recipient: string;
  /** initial_claimable_coins specifies the initial claimable coins */
  initial_claimable_coins: CoinAmino[];
  /** claimable_coins specifies the unclaimed claimable coins */
  claimable_coins: CoinAmino[];
  /**
   * claimed_conditions specifies a list of condition types
   * initial values are empty and each condition type gets appended when claim is successfully executed
   */
  claimed_conditions: ConditionType[];
}
export interface ClaimRecordAminoMsg {
  type: "/crescent.claim.v1beta1.ClaimRecord";
  value: ClaimRecordAmino;
}
/** ClaimRecord defines claim record that corresponds to the airdrop. */
export interface ClaimRecordSDKType {
  airdrop_id: Long;
  recipient: string;
  initial_claimable_coins: CoinSDKType[];
  claimable_coins: CoinSDKType[];
  claimed_conditions: ConditionType[];
}