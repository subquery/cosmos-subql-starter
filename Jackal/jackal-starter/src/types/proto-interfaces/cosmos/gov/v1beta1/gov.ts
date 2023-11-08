import { Coin, CoinAmino, CoinSDKType } from "../../base/v1beta1/coin";
import { Any, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { Long } from "../../../helpers";
/** VoteOption enumerates the valid vote options for a given governance proposal. */
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
/** ProposalStatus enumerates the valid statuses of a proposal. */
export enum ProposalStatus {
  /** PROPOSAL_STATUS_UNSPECIFIED - PROPOSAL_STATUS_UNSPECIFIED defines the default propopsal status. */
  PROPOSAL_STATUS_UNSPECIFIED = 0,
  /**
   * PROPOSAL_STATUS_DEPOSIT_PERIOD - PROPOSAL_STATUS_DEPOSIT_PERIOD defines a proposal status during the deposit
   * period.
   */
  PROPOSAL_STATUS_DEPOSIT_PERIOD = 1,
  /**
   * PROPOSAL_STATUS_VOTING_PERIOD - PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting
   * period.
   */
  PROPOSAL_STATUS_VOTING_PERIOD = 2,
  /**
   * PROPOSAL_STATUS_PASSED - PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has
   * passed.
   */
  PROPOSAL_STATUS_PASSED = 3,
  /**
   * PROPOSAL_STATUS_REJECTED - PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has
   * been rejected.
   */
  PROPOSAL_STATUS_REJECTED = 4,
  /**
   * PROPOSAL_STATUS_FAILED - PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has
   * failed.
   */
  PROPOSAL_STATUS_FAILED = 5,
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
    case "PROPOSAL_STATUS_DEPOSIT_PERIOD":
      return ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD;
    case 2:
    case "PROPOSAL_STATUS_VOTING_PERIOD":
      return ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD;
    case 3:
    case "PROPOSAL_STATUS_PASSED":
      return ProposalStatus.PROPOSAL_STATUS_PASSED;
    case 4:
    case "PROPOSAL_STATUS_REJECTED":
      return ProposalStatus.PROPOSAL_STATUS_REJECTED;
    case 5:
    case "PROPOSAL_STATUS_FAILED":
      return ProposalStatus.PROPOSAL_STATUS_FAILED;
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
    case ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD:
      return "PROPOSAL_STATUS_DEPOSIT_PERIOD";
    case ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD:
      return "PROPOSAL_STATUS_VOTING_PERIOD";
    case ProposalStatus.PROPOSAL_STATUS_PASSED:
      return "PROPOSAL_STATUS_PASSED";
    case ProposalStatus.PROPOSAL_STATUS_REJECTED:
      return "PROPOSAL_STATUS_REJECTED";
    case ProposalStatus.PROPOSAL_STATUS_FAILED:
      return "PROPOSAL_STATUS_FAILED";
    case ProposalStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * WeightedVoteOption defines a unit of vote for vote split.
 * 
 * Since: cosmos-sdk 0.43
 */
export interface WeightedVoteOption {
  option: VoteOption;
  weight: string;
}
export interface WeightedVoteOptionProtoMsg {
  typeUrl: "/cosmos.gov.v1beta1.WeightedVoteOption";
  value: Uint8Array;
}
/**
 * WeightedVoteOption defines a unit of vote for vote split.
 * 
 * Since: cosmos-sdk 0.43
 */
export interface WeightedVoteOptionAmino {
  option: VoteOption;
  weight: string;
}
export interface WeightedVoteOptionAminoMsg {
  type: "cosmos-sdk/WeightedVoteOption";
  value: WeightedVoteOptionAmino;
}
/**
 * WeightedVoteOption defines a unit of vote for vote split.
 * 
 * Since: cosmos-sdk 0.43
 */
export interface WeightedVoteOptionSDKType {
  option: VoteOption;
  weight: string;
}
/**
 * TextProposal defines a standard text proposal whose changes need to be
 * manually updated in case of approval.
 */
export interface TextProposal {
  title: string;
  description: string;
}
export interface TextProposalProtoMsg {
  typeUrl: "/cosmos.gov.v1beta1.TextProposal";
  value: Uint8Array;
}
/**
 * TextProposal defines a standard text proposal whose changes need to be
 * manually updated in case of approval.
 */
export interface TextProposalAmino {
  title: string;
  description: string;
}
export interface TextProposalAminoMsg {
  type: "cosmos-sdk/TextProposal";
  value: TextProposalAmino;
}
/**
 * TextProposal defines a standard text proposal whose changes need to be
 * manually updated in case of approval.
 */
export interface TextProposalSDKType {
  title: string;
  description: string;
}
/**
 * Deposit defines an amount deposited by an account address to an active
 * proposal.
 */
export interface Deposit {
  proposalId: Long;
  depositor: string;
  amount: Coin[];
}
export interface DepositProtoMsg {
  typeUrl: "/cosmos.gov.v1beta1.Deposit";
  value: Uint8Array;
}
/**
 * Deposit defines an amount deposited by an account address to an active
 * proposal.
 */
export interface DepositAmino {
  proposal_id: string;
  depositor: string;
  amount: CoinAmino[];
}
export interface DepositAminoMsg {
  type: "cosmos-sdk/Deposit";
  value: DepositAmino;
}
/**
 * Deposit defines an amount deposited by an account address to an active
 * proposal.
 */
export interface DepositSDKType {
  proposal_id: Long;
  depositor: string;
  amount: CoinSDKType[];
}
/** Proposal defines the core field members of a governance proposal. */
export interface Proposal {
  proposalId: Long;
  content: Any;
  status: ProposalStatus;
  finalTallyResult: TallyResult;
  submitTime: Date;
  depositEndTime: Date;
  totalDeposit: Coin[];
  votingStartTime: Date;
  votingEndTime: Date;
}
export interface ProposalProtoMsg {
  typeUrl: "/cosmos.gov.v1beta1.Proposal";
  value: Uint8Array;
}
/** Proposal defines the core field members of a governance proposal. */
export interface ProposalAmino {
  proposal_id: string;
  content?: AnyAmino;
  status: ProposalStatus;
  final_tally_result?: TallyResultAmino;
  submit_time?: Date;
  deposit_end_time?: Date;
  total_deposit: CoinAmino[];
  voting_start_time?: Date;
  voting_end_time?: Date;
}
export interface ProposalAminoMsg {
  type: "cosmos-sdk/Proposal";
  value: ProposalAmino;
}
/** Proposal defines the core field members of a governance proposal. */
export interface ProposalSDKType {
  proposal_id: Long;
  content: AnySDKType;
  status: ProposalStatus;
  final_tally_result: TallyResultSDKType;
  submit_time: Date;
  deposit_end_time: Date;
  total_deposit: CoinSDKType[];
  voting_start_time: Date;
  voting_end_time: Date;
}
/** TallyResult defines a standard tally for a governance proposal. */
export interface TallyResult {
  yes: string;
  abstain: string;
  no: string;
  noWithVeto: string;
}
export interface TallyResultProtoMsg {
  typeUrl: "/cosmos.gov.v1beta1.TallyResult";
  value: Uint8Array;
}
/** TallyResult defines a standard tally for a governance proposal. */
export interface TallyResultAmino {
  yes: string;
  abstain: string;
  no: string;
  no_with_veto: string;
}
export interface TallyResultAminoMsg {
  type: "cosmos-sdk/TallyResult";
  value: TallyResultAmino;
}
/** TallyResult defines a standard tally for a governance proposal. */
export interface TallyResultSDKType {
  yes: string;
  abstain: string;
  no: string;
  no_with_veto: string;
}
/**
 * Vote defines a vote on a governance proposal.
 * A Vote consists of a proposal ID, the voter, and the vote option.
 */
export interface Vote {
  proposalId: Long;
  voter: string;
  /**
   * Deprecated: Prefer to use `options` instead. This field is set in queries
   * if and only if `len(options) == 1` and that option has weight 1. In all
   * other cases, this field will default to VOTE_OPTION_UNSPECIFIED.
   */
  /** @deprecated */
  option: VoteOption;
  /** Since: cosmos-sdk 0.43 */
  options: WeightedVoteOption[];
}
export interface VoteProtoMsg {
  typeUrl: "/cosmos.gov.v1beta1.Vote";
  value: Uint8Array;
}
/**
 * Vote defines a vote on a governance proposal.
 * A Vote consists of a proposal ID, the voter, and the vote option.
 */
export interface VoteAmino {
  proposal_id: string;
  voter: string;
  /**
   * Deprecated: Prefer to use `options` instead. This field is set in queries
   * if and only if `len(options) == 1` and that option has weight 1. In all
   * other cases, this field will default to VOTE_OPTION_UNSPECIFIED.
   */
  /** @deprecated */
  option: VoteOption;
  /** Since: cosmos-sdk 0.43 */
  options: WeightedVoteOptionAmino[];
}
export interface VoteAminoMsg {
  type: "cosmos-sdk/Vote";
  value: VoteAmino;
}
/**
 * Vote defines a vote on a governance proposal.
 * A Vote consists of a proposal ID, the voter, and the vote option.
 */
export interface VoteSDKType {
  proposal_id: Long;
  voter: string;
  /** @deprecated */
  option: VoteOption;
  options: WeightedVoteOptionSDKType[];
}
/** DepositParams defines the params for deposits on governance proposals. */
export interface DepositParams {
  /** Minimum deposit for a proposal to enter voting period. */
  minDeposit: Coin[];
  /**
   * Maximum period for Atom holders to deposit on a proposal. Initial value: 2
   *  months.
   */
  maxDepositPeriod: Duration;
}
export interface DepositParamsProtoMsg {
  typeUrl: "/cosmos.gov.v1beta1.DepositParams";
  value: Uint8Array;
}
/** DepositParams defines the params for deposits on governance proposals. */
export interface DepositParamsAmino {
  /** Minimum deposit for a proposal to enter voting period. */
  min_deposit: CoinAmino[];
  /**
   * Maximum period for Atom holders to deposit on a proposal. Initial value: 2
   *  months.
   */
  max_deposit_period?: DurationAmino;
}
export interface DepositParamsAminoMsg {
  type: "cosmos-sdk/DepositParams";
  value: DepositParamsAmino;
}
/** DepositParams defines the params for deposits on governance proposals. */
export interface DepositParamsSDKType {
  min_deposit: CoinSDKType[];
  max_deposit_period: DurationSDKType;
}
/** VotingParams defines the params for voting on governance proposals. */
export interface VotingParams {
  /** Length of the voting period. */
  votingPeriod: Duration;
}
export interface VotingParamsProtoMsg {
  typeUrl: "/cosmos.gov.v1beta1.VotingParams";
  value: Uint8Array;
}
/** VotingParams defines the params for voting on governance proposals. */
export interface VotingParamsAmino {
  /** Length of the voting period. */
  voting_period?: DurationAmino;
}
export interface VotingParamsAminoMsg {
  type: "cosmos-sdk/VotingParams";
  value: VotingParamsAmino;
}
/** VotingParams defines the params for voting on governance proposals. */
export interface VotingParamsSDKType {
  voting_period: DurationSDKType;
}
/** TallyParams defines the params for tallying votes on governance proposals. */
export interface TallyParams {
  /**
   * Minimum percentage of total stake needed to vote for a result to be
   *  considered valid.
   */
  quorum: Uint8Array;
  /** Minimum proportion of Yes votes for proposal to pass. Default value: 0.5. */
  threshold: Uint8Array;
  /**
   * Minimum value of Veto votes to Total votes ratio for proposal to be
   *  vetoed. Default value: 1/3.
   */
  vetoThreshold: Uint8Array;
}
export interface TallyParamsProtoMsg {
  typeUrl: "/cosmos.gov.v1beta1.TallyParams";
  value: Uint8Array;
}
/** TallyParams defines the params for tallying votes on governance proposals. */
export interface TallyParamsAmino {
  /**
   * Minimum percentage of total stake needed to vote for a result to be
   *  considered valid.
   */
  quorum: Uint8Array;
  /** Minimum proportion of Yes votes for proposal to pass. Default value: 0.5. */
  threshold: Uint8Array;
  /**
   * Minimum value of Veto votes to Total votes ratio for proposal to be
   *  vetoed. Default value: 1/3.
   */
  veto_threshold: Uint8Array;
}
export interface TallyParamsAminoMsg {
  type: "cosmos-sdk/TallyParams";
  value: TallyParamsAmino;
}
/** TallyParams defines the params for tallying votes on governance proposals. */
export interface TallyParamsSDKType {
  quorum: Uint8Array;
  threshold: Uint8Array;
  veto_threshold: Uint8Array;
}