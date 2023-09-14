import {
  Duration,
  DurationAmino,
  DurationSDKType,
} from "../../../google/protobuf/duration";
import { Any, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
import { Long } from "../../../helpers";
/** VoteOption enumerates the valid vote options for a given proposal. */
export enum VoteOption {
  /** VOTE_OPTION_UNSPECIFIED - VOTE_OPTION_UNSPECIFIED defines a no-op vote option. */
  VOTE_OPTION_UNSPECIFIED = 0,
  /** VOTE_OPTION_YES - VOTE_OPTION_YES defines a yes vote option. */
  VOTE_OPTION_YES = 1,
  /** VOTE_OPTION_ABSTAIN - VOTE_OPTION_ABSTAIN defines an abstain vote option. */
  VOTE_OPTION_ABSTAIN = 2,
  /** VOTE_OPTION_NO - VOTE_OPTION_NO defines a no vote option. */
  VOTE_OPTION_NO = 3,
  /** VOTE_OPTION_NO_WITH_VETO - VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option. */
  VOTE_OPTION_NO_WITH_VETO = 4,
  UNRECOGNIZED = -1,
}
export const VoteOptionSDKType = VoteOption;
export const VoteOptionAmino = VoteOption;
export function voteOptionFromJSON(object: any): VoteOption {
  switch (object) {
    case 0:
    case "VOTE_OPTION_UNSPECIFIED":
      return VoteOption.VOTE_OPTION_UNSPECIFIED;
    case 1:
    case "VOTE_OPTION_YES":
      return VoteOption.VOTE_OPTION_YES;
    case 2:
    case "VOTE_OPTION_ABSTAIN":
      return VoteOption.VOTE_OPTION_ABSTAIN;
    case 3:
    case "VOTE_OPTION_NO":
      return VoteOption.VOTE_OPTION_NO;
    case 4:
    case "VOTE_OPTION_NO_WITH_VETO":
      return VoteOption.VOTE_OPTION_NO_WITH_VETO;
    case -1:
    case "UNRECOGNIZED":
    default:
      return VoteOption.UNRECOGNIZED;
  }
}
export function voteOptionToJSON(object: VoteOption): string {
  switch (object) {
    case VoteOption.VOTE_OPTION_UNSPECIFIED:
      return "VOTE_OPTION_UNSPECIFIED";
    case VoteOption.VOTE_OPTION_YES:
      return "VOTE_OPTION_YES";
    case VoteOption.VOTE_OPTION_ABSTAIN:
      return "VOTE_OPTION_ABSTAIN";
    case VoteOption.VOTE_OPTION_NO:
      return "VOTE_OPTION_NO";
    case VoteOption.VOTE_OPTION_NO_WITH_VETO:
      return "VOTE_OPTION_NO_WITH_VETO";
    case VoteOption.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** ProposalStatus defines proposal statuses. */
export enum ProposalStatus {
  /** PROPOSAL_STATUS_UNSPECIFIED - An empty value is invalid and not allowed. */
  PROPOSAL_STATUS_UNSPECIFIED = 0,
  /** PROPOSAL_STATUS_SUBMITTED - Initial status of a proposal when persisted. */
  PROPOSAL_STATUS_SUBMITTED = 1,
  /** PROPOSAL_STATUS_CLOSED - Final status of a proposal when the final tally was executed. */
  PROPOSAL_STATUS_CLOSED = 2,
  /** PROPOSAL_STATUS_ABORTED - Final status of a proposal when the group was modified before the final tally. */
  PROPOSAL_STATUS_ABORTED = 3,
  /**
   * PROPOSAL_STATUS_WITHDRAWN - A proposal can be deleted before the voting start time by the owner. When this happens the final status
   * is Withdrawn.
   */
  PROPOSAL_STATUS_WITHDRAWN = 4,
  UNRECOGNIZED = -1,
}
export const ProposalStatusSDKType = ProposalStatus;
export const ProposalStatusAmino = ProposalStatus;
export function proposalStatusFromJSON(object: any): ProposalStatus {
  switch (object) {
    case 0:
    case "PROPOSAL_STATUS_UNSPECIFIED":
      return ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED;
    case 1:
    case "PROPOSAL_STATUS_SUBMITTED":
      return ProposalStatus.PROPOSAL_STATUS_SUBMITTED;
    case 2:
    case "PROPOSAL_STATUS_CLOSED":
      return ProposalStatus.PROPOSAL_STATUS_CLOSED;
    case 3:
    case "PROPOSAL_STATUS_ABORTED":
      return ProposalStatus.PROPOSAL_STATUS_ABORTED;
    case 4:
    case "PROPOSAL_STATUS_WITHDRAWN":
      return ProposalStatus.PROPOSAL_STATUS_WITHDRAWN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProposalStatus.UNRECOGNIZED;
  }
}
export function proposalStatusToJSON(object: ProposalStatus): string {
  switch (object) {
    case ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED:
      return "PROPOSAL_STATUS_UNSPECIFIED";
    case ProposalStatus.PROPOSAL_STATUS_SUBMITTED:
      return "PROPOSAL_STATUS_SUBMITTED";
    case ProposalStatus.PROPOSAL_STATUS_CLOSED:
      return "PROPOSAL_STATUS_CLOSED";
    case ProposalStatus.PROPOSAL_STATUS_ABORTED:
      return "PROPOSAL_STATUS_ABORTED";
    case ProposalStatus.PROPOSAL_STATUS_WITHDRAWN:
      return "PROPOSAL_STATUS_WITHDRAWN";
    case ProposalStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** ProposalResult defines types of proposal results. */
export enum ProposalResult {
  /** PROPOSAL_RESULT_UNSPECIFIED - An empty value is invalid and not allowed */
  PROPOSAL_RESULT_UNSPECIFIED = 0,
  /** PROPOSAL_RESULT_UNFINALIZED - Until a final tally has happened the status is unfinalized */
  PROPOSAL_RESULT_UNFINALIZED = 1,
  /** PROPOSAL_RESULT_ACCEPTED - Final result of the tally */
  PROPOSAL_RESULT_ACCEPTED = 2,
  /** PROPOSAL_RESULT_REJECTED - Final result of the tally */
  PROPOSAL_RESULT_REJECTED = 3,
  UNRECOGNIZED = -1,
}
export const ProposalResultSDKType = ProposalResult;
export const ProposalResultAmino = ProposalResult;
export function proposalResultFromJSON(object: any): ProposalResult {
  switch (object) {
    case 0:
    case "PROPOSAL_RESULT_UNSPECIFIED":
      return ProposalResult.PROPOSAL_RESULT_UNSPECIFIED;
    case 1:
    case "PROPOSAL_RESULT_UNFINALIZED":
      return ProposalResult.PROPOSAL_RESULT_UNFINALIZED;
    case 2:
    case "PROPOSAL_RESULT_ACCEPTED":
      return ProposalResult.PROPOSAL_RESULT_ACCEPTED;
    case 3:
    case "PROPOSAL_RESULT_REJECTED":
      return ProposalResult.PROPOSAL_RESULT_REJECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProposalResult.UNRECOGNIZED;
  }
}
export function proposalResultToJSON(object: ProposalResult): string {
  switch (object) {
    case ProposalResult.PROPOSAL_RESULT_UNSPECIFIED:
      return "PROPOSAL_RESULT_UNSPECIFIED";
    case ProposalResult.PROPOSAL_RESULT_UNFINALIZED:
      return "PROPOSAL_RESULT_UNFINALIZED";
    case ProposalResult.PROPOSAL_RESULT_ACCEPTED:
      return "PROPOSAL_RESULT_ACCEPTED";
    case ProposalResult.PROPOSAL_RESULT_REJECTED:
      return "PROPOSAL_RESULT_REJECTED";
    case ProposalResult.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** ProposalExecutorResult defines types of proposal executor results. */
export enum ProposalExecutorResult {
  /** PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED - An empty value is not allowed. */
  PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED = 0,
  /** PROPOSAL_EXECUTOR_RESULT_NOT_RUN - We have not yet run the executor. */
  PROPOSAL_EXECUTOR_RESULT_NOT_RUN = 1,
  /** PROPOSAL_EXECUTOR_RESULT_SUCCESS - The executor was successful and proposed action updated state. */
  PROPOSAL_EXECUTOR_RESULT_SUCCESS = 2,
  /** PROPOSAL_EXECUTOR_RESULT_FAILURE - The executor returned an error and proposed action didn't update state. */
  PROPOSAL_EXECUTOR_RESULT_FAILURE = 3,
  UNRECOGNIZED = -1,
}
export const ProposalExecutorResultSDKType = ProposalExecutorResult;
export const ProposalExecutorResultAmino = ProposalExecutorResult;
export function proposalExecutorResultFromJSON(
  object: any
): ProposalExecutorResult {
  switch (object) {
    case 0:
    case "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED":
      return ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED;
    case 1:
    case "PROPOSAL_EXECUTOR_RESULT_NOT_RUN":
      return ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_NOT_RUN;
    case 2:
    case "PROPOSAL_EXECUTOR_RESULT_SUCCESS":
      return ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_SUCCESS;
    case 3:
    case "PROPOSAL_EXECUTOR_RESULT_FAILURE":
      return ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_FAILURE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProposalExecutorResult.UNRECOGNIZED;
  }
}
export function proposalExecutorResultToJSON(
  object: ProposalExecutorResult
): string {
  switch (object) {
    case ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED:
      return "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED";
    case ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_NOT_RUN:
      return "PROPOSAL_EXECUTOR_RESULT_NOT_RUN";
    case ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_SUCCESS:
      return "PROPOSAL_EXECUTOR_RESULT_SUCCESS";
    case ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_FAILURE:
      return "PROPOSAL_EXECUTOR_RESULT_FAILURE";
    case ProposalExecutorResult.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * Member represents a group member with an account address,
 * non-zero weight and metadata.
 */
export interface Member {
  /** address is the member's account address. */
  address: string;
  /** weight is the member's voting weight that should be greater than 0. */
  weight: string;
  /** metadata is any arbitrary metadata to attached to the member. */
  metadata: string;
  /** added_at is a timestamp specifying when a member was added. */
  addedAt: Date;
}
export interface MemberProtoMsg {
  typeUrl: "/cosmos.group.v1.Member";
  value: Uint8Array;
}
/**
 * Member represents a group member with an account address,
 * non-zero weight and metadata.
 */
export interface MemberAmino {
  /** address is the member's account address. */
  address: string;
  /** weight is the member's voting weight that should be greater than 0. */
  weight: string;
  /** metadata is any arbitrary metadata to attached to the member. */
  metadata: string;
  /** added_at is a timestamp specifying when a member was added. */
  added_at?: Date;
}
export interface MemberAminoMsg {
  type: "cosmos-sdk/Member";
  value: MemberAmino;
}
/**
 * Member represents a group member with an account address,
 * non-zero weight and metadata.
 */
export interface MemberSDKType {
  address: string;
  weight: string;
  metadata: string;
  added_at: Date;
}
/** Members defines a repeated slice of Member objects. */
export interface Members {
  /** members is the list of members. */
  members: Member[];
}
export interface MembersProtoMsg {
  typeUrl: "/cosmos.group.v1.Members";
  value: Uint8Array;
}
/** Members defines a repeated slice of Member objects. */
export interface MembersAmino {
  /** members is the list of members. */
  members: MemberAmino[];
}
export interface MembersAminoMsg {
  type: "cosmos-sdk/Members";
  value: MembersAmino;
}
/** Members defines a repeated slice of Member objects. */
export interface MembersSDKType {
  members: MemberSDKType[];
}
/** ThresholdDecisionPolicy implements the DecisionPolicy interface */
export interface ThresholdDecisionPolicy {
  /** threshold is the minimum weighted sum of yes votes that must be met or exceeded for a proposal to succeed. */
  threshold: string;
  /** windows defines the different windows for voting and execution. */
  windows: DecisionPolicyWindows;
}
export interface ThresholdDecisionPolicyProtoMsg {
  typeUrl: "/cosmos.group.v1.ThresholdDecisionPolicy";
  value: Uint8Array;
}
/** ThresholdDecisionPolicy implements the DecisionPolicy interface */
export interface ThresholdDecisionPolicyAmino {
  /** threshold is the minimum weighted sum of yes votes that must be met or exceeded for a proposal to succeed. */
  threshold: string;
  /** windows defines the different windows for voting and execution. */
  windows?: DecisionPolicyWindowsAmino;
}
export interface ThresholdDecisionPolicyAminoMsg {
  type: "cosmos-sdk/ThresholdDecisionPolicy";
  value: ThresholdDecisionPolicyAmino;
}
/** ThresholdDecisionPolicy implements the DecisionPolicy interface */
export interface ThresholdDecisionPolicySDKType {
  threshold: string;
  windows: DecisionPolicyWindowsSDKType;
}
/** PercentageDecisionPolicy implements the DecisionPolicy interface */
export interface PercentageDecisionPolicy {
  /** percentage is the minimum percentage the weighted sum of yes votes must meet for a proposal to succeed. */
  percentage: string;
  /** windows defines the different windows for voting and execution. */
  windows: DecisionPolicyWindows;
}
export interface PercentageDecisionPolicyProtoMsg {
  typeUrl: "/cosmos.group.v1.PercentageDecisionPolicy";
  value: Uint8Array;
}
/** PercentageDecisionPolicy implements the DecisionPolicy interface */
export interface PercentageDecisionPolicyAmino {
  /** percentage is the minimum percentage the weighted sum of yes votes must meet for a proposal to succeed. */
  percentage: string;
  /** windows defines the different windows for voting and execution. */
  windows?: DecisionPolicyWindowsAmino;
}
export interface PercentageDecisionPolicyAminoMsg {
  type: "cosmos-sdk/PercentageDecisionPolicy";
  value: PercentageDecisionPolicyAmino;
}
/** PercentageDecisionPolicy implements the DecisionPolicy interface */
export interface PercentageDecisionPolicySDKType {
  percentage: string;
  windows: DecisionPolicyWindowsSDKType;
}
/** DecisionPolicyWindows defines the different windows for voting and execution. */
export interface DecisionPolicyWindows {
  /**
   * voting_period is the duration from submission of a proposal to the end of voting period
   * Within this times votes can be submitted with MsgVote.
   */
  votingPeriod: Duration;
  /**
   * min_execution_period is the minimum duration after the proposal submission
   * where members can start sending MsgExec. This means that the window for
   * sending a MsgExec transaction is:
   * `[ submission + min_execution_period ; submission + voting_period + max_execution_period]`
   * where max_execution_period is a app-specific config, defined in the keeper.
   * If not set, min_execution_period will default to 0.
   *
   * Please make sure to set a `min_execution_period` that is smaller than
   * `voting_period + max_execution_period`, or else the above execution window
   * is empty, meaning that all proposals created with this decision policy
   * won't be able to be executed.
   */
  minExecutionPeriod: Duration;
}
export interface DecisionPolicyWindowsProtoMsg {
  typeUrl: "/cosmos.group.v1.DecisionPolicyWindows";
  value: Uint8Array;
}
/** DecisionPolicyWindows defines the different windows for voting and execution. */
export interface DecisionPolicyWindowsAmino {
  /**
   * voting_period is the duration from submission of a proposal to the end of voting period
   * Within this times votes can be submitted with MsgVote.
   */
  voting_period?: DurationAmino;
  /**
   * min_execution_period is the minimum duration after the proposal submission
   * where members can start sending MsgExec. This means that the window for
   * sending a MsgExec transaction is:
   * `[ submission + min_execution_period ; submission + voting_period + max_execution_period]`
   * where max_execution_period is a app-specific config, defined in the keeper.
   * If not set, min_execution_period will default to 0.
   *
   * Please make sure to set a `min_execution_period` that is smaller than
   * `voting_period + max_execution_period`, or else the above execution window
   * is empty, meaning that all proposals created with this decision policy
   * won't be able to be executed.
   */
  min_execution_period?: DurationAmino;
}
export interface DecisionPolicyWindowsAminoMsg {
  type: "cosmos-sdk/DecisionPolicyWindows";
  value: DecisionPolicyWindowsAmino;
}
/** DecisionPolicyWindows defines the different windows for voting and execution. */
export interface DecisionPolicyWindowsSDKType {
  voting_period: DurationSDKType;
  min_execution_period: DurationSDKType;
}
/** GroupInfo represents the high-level on-chain information for a group. */
export interface GroupInfo {
  /** id is the unique ID of the group. */
  id: Long;
  /** admin is the account address of the group's admin. */
  admin: string;
  /** metadata is any arbitrary metadata to attached to the group. */
  metadata: string;
  /**
   * version is used to track changes to a group's membership structure that
   * would break existing proposals. Whenever any members weight is changed,
   * or any member is added or removed this version is incremented and will
   * cause proposals based on older versions of this group to fail
   */
  version: Long;
  /** total_weight is the sum of the group members' weights. */
  totalWeight: string;
  /** created_at is a timestamp specifying when a group was created. */
  createdAt: Date;
}
export interface GroupInfoProtoMsg {
  typeUrl: "/cosmos.group.v1.GroupInfo";
  value: Uint8Array;
}
/** GroupInfo represents the high-level on-chain information for a group. */
export interface GroupInfoAmino {
  /** id is the unique ID of the group. */
  id: string;
  /** admin is the account address of the group's admin. */
  admin: string;
  /** metadata is any arbitrary metadata to attached to the group. */
  metadata: string;
  /**
   * version is used to track changes to a group's membership structure that
   * would break existing proposals. Whenever any members weight is changed,
   * or any member is added or removed this version is incremented and will
   * cause proposals based on older versions of this group to fail
   */
  version: string;
  /** total_weight is the sum of the group members' weights. */
  total_weight: string;
  /** created_at is a timestamp specifying when a group was created. */
  created_at?: Date;
}
export interface GroupInfoAminoMsg {
  type: "cosmos-sdk/GroupInfo";
  value: GroupInfoAmino;
}
/** GroupInfo represents the high-level on-chain information for a group. */
export interface GroupInfoSDKType {
  id: Long;
  admin: string;
  metadata: string;
  version: Long;
  total_weight: string;
  created_at: Date;
}
/** GroupMember represents the relationship between a group and a member. */
export interface GroupMember {
  /** group_id is the unique ID of the group. */
  groupId: Long;
  /** member is the member data. */
  member: Member;
}
export interface GroupMemberProtoMsg {
  typeUrl: "/cosmos.group.v1.GroupMember";
  value: Uint8Array;
}
/** GroupMember represents the relationship between a group and a member. */
export interface GroupMemberAmino {
  /** group_id is the unique ID of the group. */
  group_id: string;
  /** member is the member data. */
  member?: MemberAmino;
}
export interface GroupMemberAminoMsg {
  type: "cosmos-sdk/GroupMember";
  value: GroupMemberAmino;
}
/** GroupMember represents the relationship between a group and a member. */
export interface GroupMemberSDKType {
  group_id: Long;
  member: MemberSDKType;
}
/** GroupPolicyInfo represents the high-level on-chain information for a group policy. */
export interface GroupPolicyInfo {
  /** address is the account address of group policy. */
  address: string;
  /** group_id is the unique ID of the group. */
  groupId: Long;
  /** admin is the account address of the group admin. */
  admin: string;
  /** metadata is any arbitrary metadata to attached to the group policy. */
  metadata: string;
  /**
   * version is used to track changes to a group's GroupPolicyInfo structure that
   * would create a different result on a running proposal.
   */
  version: Long;
  /** decision_policy specifies the group policy's decision policy. */
  decisionPolicy: Any;
  /** created_at is a timestamp specifying when a group policy was created. */
  createdAt: Date;
}
export interface GroupPolicyInfoProtoMsg {
  typeUrl: "/cosmos.group.v1.GroupPolicyInfo";
  value: Uint8Array;
}
/** GroupPolicyInfo represents the high-level on-chain information for a group policy. */
export interface GroupPolicyInfoAmino {
  /** address is the account address of group policy. */
  address: string;
  /** group_id is the unique ID of the group. */
  group_id: string;
  /** admin is the account address of the group admin. */
  admin: string;
  /** metadata is any arbitrary metadata to attached to the group policy. */
  metadata: string;
  /**
   * version is used to track changes to a group's GroupPolicyInfo structure that
   * would create a different result on a running proposal.
   */
  version: string;
  /** decision_policy specifies the group policy's decision policy. */
  decision_policy?: AnyAmino;
  /** created_at is a timestamp specifying when a group policy was created. */
  created_at?: Date;
}
export interface GroupPolicyInfoAminoMsg {
  type: "cosmos-sdk/GroupPolicyInfo";
  value: GroupPolicyInfoAmino;
}
/** GroupPolicyInfo represents the high-level on-chain information for a group policy. */
export interface GroupPolicyInfoSDKType {
  address: string;
  group_id: Long;
  admin: string;
  metadata: string;
  version: Long;
  decision_policy: AnySDKType;
  created_at: Date;
}
/**
 * Proposal defines a group proposal. Any member of a group can submit a proposal
 * for a group policy to decide upon.
 * A proposal consists of a set of `sdk.Msg`s that will be executed if the proposal
 * passes as well as some optional metadata associated with the proposal.
 */
export interface Proposal {
  /** id is the unique id of the proposal. */
  id: Long;
  /** address is the account address of group policy. */
  address: string;
  /** metadata is any arbitrary metadata to attached to the proposal. */
  metadata: string;
  /** proposers are the account addresses of the proposers. */
  proposers: string[];
  /** submit_time is a timestamp specifying when a proposal was submitted. */
  submitTime: Date;
  /**
   * group_version tracks the version of the group that this proposal corresponds to.
   * When group membership is changed, existing proposals from previous group versions will become invalid.
   */
  groupVersion: Long;
  /**
   * group_policy_version tracks the version of the group policy that this proposal corresponds to.
   * When a decision policy is changed, existing proposals from previous policy versions will become invalid.
   */
  groupPolicyVersion: Long;
  /** status represents the high level position in the life cycle of the proposal. Initial value is Submitted. */
  status: ProposalStatus;
  /**
   * result is the final result based on the votes and election rule. Initial value is unfinalized.
   * The result is persisted so that clients can always rely on this state and not have to replicate the logic.
   */
  result: ProposalResult;
  /**
   * final_tally_result contains the sums of all weighted votes for this
   * proposal for each vote option, after tallying. When querying a proposal
   * via gRPC, this field is not populated until the proposal's voting period
   * has ended.
   */
  finalTallyResult: TallyResult;
  /**
   * voting_period_end is the timestamp before which voting must be done.
   * Unless a successfull MsgExec is called before (to execute a proposal whose
   * tally is successful before the voting period ends), tallying will be done
   * at this point, and the `final_tally_result`, as well
   * as `status` and `result` fields will be accordingly updated.
   */
  votingPeriodEnd: Date;
  /** executor_result is the final result based on the votes and election rule. Initial value is NotRun. */
  executorResult: ProposalExecutorResult;
  /** messages is a list of Msgs that will be executed if the proposal passes. */
  messages: Any[];
}
export interface ProposalProtoMsg {
  typeUrl: "/cosmos.group.v1.Proposal";
  value: Uint8Array;
}
/**
 * Proposal defines a group proposal. Any member of a group can submit a proposal
 * for a group policy to decide upon.
 * A proposal consists of a set of `sdk.Msg`s that will be executed if the proposal
 * passes as well as some optional metadata associated with the proposal.
 */
export interface ProposalAmino {
  /** id is the unique id of the proposal. */
  id: string;
  /** address is the account address of group policy. */
  address: string;
  /** metadata is any arbitrary metadata to attached to the proposal. */
  metadata: string;
  /** proposers are the account addresses of the proposers. */
  proposers: string[];
  /** submit_time is a timestamp specifying when a proposal was submitted. */
  submit_time?: Date;
  /**
   * group_version tracks the version of the group that this proposal corresponds to.
   * When group membership is changed, existing proposals from previous group versions will become invalid.
   */
  group_version: string;
  /**
   * group_policy_version tracks the version of the group policy that this proposal corresponds to.
   * When a decision policy is changed, existing proposals from previous policy versions will become invalid.
   */
  group_policy_version: string;
  /** status represents the high level position in the life cycle of the proposal. Initial value is Submitted. */
  status: ProposalStatus;
  /**
   * result is the final result based on the votes and election rule. Initial value is unfinalized.
   * The result is persisted so that clients can always rely on this state and not have to replicate the logic.
   */
  result: ProposalResult;
  /**
   * final_tally_result contains the sums of all weighted votes for this
   * proposal for each vote option, after tallying. When querying a proposal
   * via gRPC, this field is not populated until the proposal's voting period
   * has ended.
   */
  final_tally_result?: TallyResultAmino;
  /**
   * voting_period_end is the timestamp before which voting must be done.
   * Unless a successfull MsgExec is called before (to execute a proposal whose
   * tally is successful before the voting period ends), tallying will be done
   * at this point, and the `final_tally_result`, as well
   * as `status` and `result` fields will be accordingly updated.
   */
  voting_period_end?: Date;
  /** executor_result is the final result based on the votes and election rule. Initial value is NotRun. */
  executor_result: ProposalExecutorResult;
  /** messages is a list of Msgs that will be executed if the proposal passes. */
  messages: AnyAmino[];
}
export interface ProposalAminoMsg {
  type: "cosmos-sdk/Proposal";
  value: ProposalAmino;
}
/**
 * Proposal defines a group proposal. Any member of a group can submit a proposal
 * for a group policy to decide upon.
 * A proposal consists of a set of `sdk.Msg`s that will be executed if the proposal
 * passes as well as some optional metadata associated with the proposal.
 */
export interface ProposalSDKType {
  id: Long;
  address: string;
  metadata: string;
  proposers: string[];
  submit_time: Date;
  group_version: Long;
  group_policy_version: Long;
  status: ProposalStatus;
  result: ProposalResult;
  final_tally_result: TallyResultSDKType;
  voting_period_end: Date;
  executor_result: ProposalExecutorResult;
  messages: AnySDKType[];
}
/** TallyResult represents the sum of weighted votes for each vote option. */
export interface TallyResult {
  /** yes_count is the weighted sum of yes votes. */
  yesCount: string;
  /** abstain_count is the weighted sum of abstainers. */
  abstainCount: string;
  /** no is the weighted sum of no votes. */
  noCount: string;
  /** no_with_veto_count is the weighted sum of veto. */
  noWithVetoCount: string;
}
export interface TallyResultProtoMsg {
  typeUrl: "/cosmos.group.v1.TallyResult";
  value: Uint8Array;
}
/** TallyResult represents the sum of weighted votes for each vote option. */
export interface TallyResultAmino {
  /** yes_count is the weighted sum of yes votes. */
  yes_count: string;
  /** abstain_count is the weighted sum of abstainers. */
  abstain_count: string;
  /** no is the weighted sum of no votes. */
  no_count: string;
  /** no_with_veto_count is the weighted sum of veto. */
  no_with_veto_count: string;
}
export interface TallyResultAminoMsg {
  type: "cosmos-sdk/TallyResult";
  value: TallyResultAmino;
}
/** TallyResult represents the sum of weighted votes for each vote option. */
export interface TallyResultSDKType {
  yes_count: string;
  abstain_count: string;
  no_count: string;
  no_with_veto_count: string;
}
/** Vote represents a vote for a proposal. */
export interface Vote {
  /** proposal is the unique ID of the proposal. */
  proposalId: Long;
  /** voter is the account address of the voter. */
  voter: string;
  /** option is the voter's choice on the proposal. */
  option: VoteOption;
  /** metadata is any arbitrary metadata to attached to the vote. */
  metadata: string;
  /** submit_time is the timestamp when the vote was submitted. */
  submitTime: Date;
}
export interface VoteProtoMsg {
  typeUrl: "/cosmos.group.v1.Vote";
  value: Uint8Array;
}
/** Vote represents a vote for a proposal. */
export interface VoteAmino {
  /** proposal is the unique ID of the proposal. */
  proposal_id: string;
  /** voter is the account address of the voter. */
  voter: string;
  /** option is the voter's choice on the proposal. */
  option: VoteOption;
  /** metadata is any arbitrary metadata to attached to the vote. */
  metadata: string;
  /** submit_time is the timestamp when the vote was submitted. */
  submit_time?: Date;
}
export interface VoteAminoMsg {
  type: "cosmos-sdk/Vote";
  value: VoteAmino;
}
/** Vote represents a vote for a proposal. */
export interface VoteSDKType {
  proposal_id: Long;
  voter: string;
  option: VoteOption;
  metadata: string;
  submit_time: Date;
}
