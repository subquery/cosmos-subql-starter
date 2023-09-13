import { ConditionType } from "./claim";
import { Long } from "../../../helpers";
/** MsgClaim defines a SDK message for claiming claimable amount. */
export interface MsgClaim {
  /** airdrop_id specifies index of the airdrop */
  airdropId: Long;
  /** recipient specifies the bech32-encoded address that is eligible to claim airdrop */
  recipient: string;
  /** condition_type specifies the condition type */
  conditionType: ConditionType;
}
export interface MsgClaimProtoMsg {
  typeUrl: "/crescent.claim.v1beta1.MsgClaim";
  value: Uint8Array;
}
/** MsgClaim defines a SDK message for claiming claimable amount. */
export interface MsgClaimAmino {
  /** airdrop_id specifies index of the airdrop */
  airdrop_id: string;
  /** recipient specifies the bech32-encoded address that is eligible to claim airdrop */
  recipient: string;
  /** condition_type specifies the condition type */
  condition_type: ConditionType;
}
export interface MsgClaimAminoMsg {
  type: "/crescent.claim.v1beta1.MsgClaim";
  value: MsgClaimAmino;
}
/** MsgClaim defines a SDK message for claiming claimable amount. */
export interface MsgClaimSDKType {
  airdrop_id: Long;
  recipient: string;
  condition_type: ConditionType;
}
export interface MsgClaimResponse {}
export interface MsgClaimResponseProtoMsg {
  typeUrl: "/crescent.claim.v1beta1.MsgClaimResponse";
  value: Uint8Array;
}
export interface MsgClaimResponseAmino {}
export interface MsgClaimResponseAminoMsg {
  type: "/crescent.claim.v1beta1.MsgClaimResponse";
  value: MsgClaimResponseAmino;
}
export interface MsgClaimResponseSDKType {}