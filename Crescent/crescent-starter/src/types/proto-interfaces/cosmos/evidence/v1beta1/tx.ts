import { Any, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
/**
 * MsgSubmitEvidence represents a message that supports submitting arbitrary
 * Evidence of misbehavior such as equivocation or counterfactual signing.
 */
export interface MsgSubmitEvidence {
  submitter: string;
  evidence: Any;
}
export interface MsgSubmitEvidenceProtoMsg {
  typeUrl: "/cosmos.evidence.v1beta1.MsgSubmitEvidence";
  value: Uint8Array;
}
/**
 * MsgSubmitEvidence represents a message that supports submitting arbitrary
 * Evidence of misbehavior such as equivocation or counterfactual signing.
 */
export interface MsgSubmitEvidenceAmino {
  submitter: string;
  evidence?: AnyAmino;
}
export interface MsgSubmitEvidenceAminoMsg {
  type: "cosmos-sdk/MsgSubmitEvidence";
  value: MsgSubmitEvidenceAmino;
}
/**
 * MsgSubmitEvidence represents a message that supports submitting arbitrary
 * Evidence of misbehavior such as equivocation or counterfactual signing.
 */
export interface MsgSubmitEvidenceSDKType {
  submitter: string;
  evidence: AnySDKType;
}
/** MsgSubmitEvidenceResponse defines the Msg/SubmitEvidence response type. */
export interface MsgSubmitEvidenceResponse {
  /** hash defines the hash of the evidence. */
  hash: Uint8Array;
}
export interface MsgSubmitEvidenceResponseProtoMsg {
  typeUrl: "/cosmos.evidence.v1beta1.MsgSubmitEvidenceResponse";
  value: Uint8Array;
}
/** MsgSubmitEvidenceResponse defines the Msg/SubmitEvidence response type. */
export interface MsgSubmitEvidenceResponseAmino {
  /** hash defines the hash of the evidence. */
  hash: Uint8Array;
}
export interface MsgSubmitEvidenceResponseAminoMsg {
  type: "cosmos-sdk/MsgSubmitEvidenceResponse";
  value: MsgSubmitEvidenceResponseAmino;
}
/** MsgSubmitEvidenceResponse defines the Msg/SubmitEvidence response type. */
export interface MsgSubmitEvidenceResponseSDKType {
  hash: Uint8Array;
}