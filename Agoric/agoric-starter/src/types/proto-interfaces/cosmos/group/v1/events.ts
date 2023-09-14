import { ProposalExecutorResult } from "./types";
import { Long } from "../../../helpers";
/** EventCreateGroup is an event emitted when a group is created. */
export interface EventCreateGroup {
  /** group_id is the unique ID of the group. */
  groupId: Long;
}
export interface EventCreateGroupProtoMsg {
  typeUrl: "/cosmos.group.v1.EventCreateGroup";
  value: Uint8Array;
}
/** EventCreateGroup is an event emitted when a group is created. */
export interface EventCreateGroupAmino {
  /** group_id is the unique ID of the group. */
  group_id: string;
}
export interface EventCreateGroupAminoMsg {
  type: "cosmos-sdk/EventCreateGroup";
  value: EventCreateGroupAmino;
}
/** EventCreateGroup is an event emitted when a group is created. */
export interface EventCreateGroupSDKType {
  group_id: Long;
}
/** EventUpdateGroup is an event emitted when a group is updated. */
export interface EventUpdateGroup {
  /** group_id is the unique ID of the group. */
  groupId: Long;
}
export interface EventUpdateGroupProtoMsg {
  typeUrl: "/cosmos.group.v1.EventUpdateGroup";
  value: Uint8Array;
}
/** EventUpdateGroup is an event emitted when a group is updated. */
export interface EventUpdateGroupAmino {
  /** group_id is the unique ID of the group. */
  group_id: string;
}
export interface EventUpdateGroupAminoMsg {
  type: "cosmos-sdk/EventUpdateGroup";
  value: EventUpdateGroupAmino;
}
/** EventUpdateGroup is an event emitted when a group is updated. */
export interface EventUpdateGroupSDKType {
  group_id: Long;
}
/** EventCreateGroupPolicy is an event emitted when a group policy is created. */
export interface EventCreateGroupPolicy {
  /** address is the account address of the group policy. */
  address: string;
}
export interface EventCreateGroupPolicyProtoMsg {
  typeUrl: "/cosmos.group.v1.EventCreateGroupPolicy";
  value: Uint8Array;
}
/** EventCreateGroupPolicy is an event emitted when a group policy is created. */
export interface EventCreateGroupPolicyAmino {
  /** address is the account address of the group policy. */
  address: string;
}
export interface EventCreateGroupPolicyAminoMsg {
  type: "cosmos-sdk/EventCreateGroupPolicy";
  value: EventCreateGroupPolicyAmino;
}
/** EventCreateGroupPolicy is an event emitted when a group policy is created. */
export interface EventCreateGroupPolicySDKType {
  address: string;
}
/** EventUpdateGroupPolicy is an event emitted when a group policy is updated. */
export interface EventUpdateGroupPolicy {
  /** address is the account address of the group policy. */
  address: string;
}
export interface EventUpdateGroupPolicyProtoMsg {
  typeUrl: "/cosmos.group.v1.EventUpdateGroupPolicy";
  value: Uint8Array;
}
/** EventUpdateGroupPolicy is an event emitted when a group policy is updated. */
export interface EventUpdateGroupPolicyAmino {
  /** address is the account address of the group policy. */
  address: string;
}
export interface EventUpdateGroupPolicyAminoMsg {
  type: "cosmos-sdk/EventUpdateGroupPolicy";
  value: EventUpdateGroupPolicyAmino;
}
/** EventUpdateGroupPolicy is an event emitted when a group policy is updated. */
export interface EventUpdateGroupPolicySDKType {
  address: string;
}
/** EventSubmitProposal is an event emitted when a proposal is created. */
export interface EventSubmitProposal {
  /** proposal_id is the unique ID of the proposal. */
  proposalId: Long;
}
export interface EventSubmitProposalProtoMsg {
  typeUrl: "/cosmos.group.v1.EventSubmitProposal";
  value: Uint8Array;
}
/** EventSubmitProposal is an event emitted when a proposal is created. */
export interface EventSubmitProposalAmino {
  /** proposal_id is the unique ID of the proposal. */
  proposal_id: string;
}
export interface EventSubmitProposalAminoMsg {
  type: "cosmos-sdk/EventSubmitProposal";
  value: EventSubmitProposalAmino;
}
/** EventSubmitProposal is an event emitted when a proposal is created. */
export interface EventSubmitProposalSDKType {
  proposal_id: Long;
}
/** EventWithdrawProposal is an event emitted when a proposal is withdrawn. */
export interface EventWithdrawProposal {
  /** proposal_id is the unique ID of the proposal. */
  proposalId: Long;
}
export interface EventWithdrawProposalProtoMsg {
  typeUrl: "/cosmos.group.v1.EventWithdrawProposal";
  value: Uint8Array;
}
/** EventWithdrawProposal is an event emitted when a proposal is withdrawn. */
export interface EventWithdrawProposalAmino {
  /** proposal_id is the unique ID of the proposal. */
  proposal_id: string;
}
export interface EventWithdrawProposalAminoMsg {
  type: "cosmos-sdk/EventWithdrawProposal";
  value: EventWithdrawProposalAmino;
}
/** EventWithdrawProposal is an event emitted when a proposal is withdrawn. */
export interface EventWithdrawProposalSDKType {
  proposal_id: Long;
}
/** EventVote is an event emitted when a voter votes on a proposal. */
export interface EventVote {
  /** proposal_id is the unique ID of the proposal. */
  proposalId: Long;
}
export interface EventVoteProtoMsg {
  typeUrl: "/cosmos.group.v1.EventVote";
  value: Uint8Array;
}
/** EventVote is an event emitted when a voter votes on a proposal. */
export interface EventVoteAmino {
  /** proposal_id is the unique ID of the proposal. */
  proposal_id: string;
}
export interface EventVoteAminoMsg {
  type: "cosmos-sdk/EventVote";
  value: EventVoteAmino;
}
/** EventVote is an event emitted when a voter votes on a proposal. */
export interface EventVoteSDKType {
  proposal_id: Long;
}
/** EventExec is an event emitted when a proposal is executed. */
export interface EventExec {
  /** proposal_id is the unique ID of the proposal. */
  proposalId: Long;
  /** result is the proposal execution result. */
  result: ProposalExecutorResult;
}
export interface EventExecProtoMsg {
  typeUrl: "/cosmos.group.v1.EventExec";
  value: Uint8Array;
}
/** EventExec is an event emitted when a proposal is executed. */
export interface EventExecAmino {
  /** proposal_id is the unique ID of the proposal. */
  proposal_id: string;
  /** result is the proposal execution result. */
  result: ProposalExecutorResult;
}
export interface EventExecAminoMsg {
  type: "cosmos-sdk/EventExec";
  value: EventExecAmino;
}
/** EventExec is an event emitted when a proposal is executed. */
export interface EventExecSDKType {
  proposal_id: Long;
  result: ProposalExecutorResult;
}
/** EventLeaveGroup is an event emitted when group member leaves the group. */
export interface EventLeaveGroup {
  /** group_id is the unique ID of the group. */
  groupId: Long;
  /** address is the account address of the group member. */
  address: string;
}
export interface EventLeaveGroupProtoMsg {
  typeUrl: "/cosmos.group.v1.EventLeaveGroup";
  value: Uint8Array;
}
/** EventLeaveGroup is an event emitted when group member leaves the group. */
export interface EventLeaveGroupAmino {
  /** group_id is the unique ID of the group. */
  group_id: string;
  /** address is the account address of the group member. */
  address: string;
}
export interface EventLeaveGroupAminoMsg {
  type: "cosmos-sdk/EventLeaveGroup";
  value: EventLeaveGroupAmino;
}
/** EventLeaveGroup is an event emitted when group member leaves the group. */
export interface EventLeaveGroupSDKType {
  group_id: Long;
  address: string;
}
