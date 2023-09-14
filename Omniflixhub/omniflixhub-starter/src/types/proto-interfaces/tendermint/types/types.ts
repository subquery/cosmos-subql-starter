import { Proof, ProofAmino, ProofSDKType } from "../crypto/proof";
import { Consensus, ConsensusAmino, ConsensusSDKType } from "../version/types";
import {
  ValidatorSet,
  ValidatorSetAmino,
  ValidatorSetSDKType,
} from "./validator";
import { Long } from "../../helpers";
/** BlockIdFlag indicates which BlcokID the signature is for */
export enum BlockIDFlag {
  BLOCK_ID_FLAG_UNKNOWN = 0,
  BLOCK_ID_FLAG_ABSENT = 1,
  BLOCK_ID_FLAG_COMMIT = 2,
  BLOCK_ID_FLAG_NIL = 3,
  UNRECOGNIZED = -1,
}
export const BlockIDFlagSDKType = BlockIDFlag;
export const BlockIDFlagAmino = BlockIDFlag;
export function blockIDFlagFromJSON(object: any): BlockIDFlag {
  switch (object) {
    case 0:
    case "BLOCK_ID_FLAG_UNKNOWN":
      return BlockIDFlag.BLOCK_ID_FLAG_UNKNOWN;
    case 1:
    case "BLOCK_ID_FLAG_ABSENT":
      return BlockIDFlag.BLOCK_ID_FLAG_ABSENT;
    case 2:
    case "BLOCK_ID_FLAG_COMMIT":
      return BlockIDFlag.BLOCK_ID_FLAG_COMMIT;
    case 3:
    case "BLOCK_ID_FLAG_NIL":
      return BlockIDFlag.BLOCK_ID_FLAG_NIL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BlockIDFlag.UNRECOGNIZED;
  }
}
export function blockIDFlagToJSON(object: BlockIDFlag): string {
  switch (object) {
    case BlockIDFlag.BLOCK_ID_FLAG_UNKNOWN:
      return "BLOCK_ID_FLAG_UNKNOWN";
    case BlockIDFlag.BLOCK_ID_FLAG_ABSENT:
      return "BLOCK_ID_FLAG_ABSENT";
    case BlockIDFlag.BLOCK_ID_FLAG_COMMIT:
      return "BLOCK_ID_FLAG_COMMIT";
    case BlockIDFlag.BLOCK_ID_FLAG_NIL:
      return "BLOCK_ID_FLAG_NIL";
    case BlockIDFlag.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** SignedMsgType is a type of signed message in the consensus. */
export enum SignedMsgType {
  SIGNED_MSG_TYPE_UNKNOWN = 0,
  /** SIGNED_MSG_TYPE_PREVOTE - Votes */
  SIGNED_MSG_TYPE_PREVOTE = 1,
  SIGNED_MSG_TYPE_PRECOMMIT = 2,
  /** SIGNED_MSG_TYPE_PROPOSAL - Proposals */
  SIGNED_MSG_TYPE_PROPOSAL = 32,
  UNRECOGNIZED = -1,
}
export const SignedMsgTypeSDKType = SignedMsgType;
export const SignedMsgTypeAmino = SignedMsgType;
export function signedMsgTypeFromJSON(object: any): SignedMsgType {
  switch (object) {
    case 0:
    case "SIGNED_MSG_TYPE_UNKNOWN":
      return SignedMsgType.SIGNED_MSG_TYPE_UNKNOWN;
    case 1:
    case "SIGNED_MSG_TYPE_PREVOTE":
      return SignedMsgType.SIGNED_MSG_TYPE_PREVOTE;
    case 2:
    case "SIGNED_MSG_TYPE_PRECOMMIT":
      return SignedMsgType.SIGNED_MSG_TYPE_PRECOMMIT;
    case 32:
    case "SIGNED_MSG_TYPE_PROPOSAL":
      return SignedMsgType.SIGNED_MSG_TYPE_PROPOSAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SignedMsgType.UNRECOGNIZED;
  }
}
export function signedMsgTypeToJSON(object: SignedMsgType): string {
  switch (object) {
    case SignedMsgType.SIGNED_MSG_TYPE_UNKNOWN:
      return "SIGNED_MSG_TYPE_UNKNOWN";
    case SignedMsgType.SIGNED_MSG_TYPE_PREVOTE:
      return "SIGNED_MSG_TYPE_PREVOTE";
    case SignedMsgType.SIGNED_MSG_TYPE_PRECOMMIT:
      return "SIGNED_MSG_TYPE_PRECOMMIT";
    case SignedMsgType.SIGNED_MSG_TYPE_PROPOSAL:
      return "SIGNED_MSG_TYPE_PROPOSAL";
    case SignedMsgType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** PartsetHeader */
export interface PartSetHeader {
  total: number;
  hash: Uint8Array;
}
export interface PartSetHeaderProtoMsg {
  typeUrl: "/tendermint.types.PartSetHeader";
  value: Uint8Array;
}
/** PartsetHeader */
export interface PartSetHeaderAmino {
  total: number;
  hash: Uint8Array;
}
export interface PartSetHeaderAminoMsg {
  type: "/tendermint.types.PartSetHeader";
  value: PartSetHeaderAmino;
}
/** PartsetHeader */
export interface PartSetHeaderSDKType {
  total: number;
  hash: Uint8Array;
}
export interface Part {
  index: number;
  bytes: Uint8Array;
  proof: Proof;
}
export interface PartProtoMsg {
  typeUrl: "/tendermint.types.Part";
  value: Uint8Array;
}
export interface PartAmino {
  index: number;
  bytes: Uint8Array;
  proof?: ProofAmino;
}
export interface PartAminoMsg {
  type: "/tendermint.types.Part";
  value: PartAmino;
}
export interface PartSDKType {
  index: number;
  bytes: Uint8Array;
  proof: ProofSDKType;
}
/** BlockID */
export interface BlockID {
  hash: Uint8Array;
  partSetHeader: PartSetHeader;
}
export interface BlockIDProtoMsg {
  typeUrl: "/tendermint.types.BlockID";
  value: Uint8Array;
}
/** BlockID */
export interface BlockIDAmino {
  hash: Uint8Array;
  part_set_header?: PartSetHeaderAmino;
}
export interface BlockIDAminoMsg {
  type: "/tendermint.types.BlockID";
  value: BlockIDAmino;
}
/** BlockID */
export interface BlockIDSDKType {
  hash: Uint8Array;
  part_set_header: PartSetHeaderSDKType;
}
/** Header defines the structure of a Tendermint block header. */
export interface Header {
  /** basic block info */
  version: Consensus;
  chainId: string;
  height: Long;
  time: Date;
  /** prev block info */
  lastBlockId: BlockID;
  /** hashes of block data */
  lastCommitHash: Uint8Array;
  dataHash: Uint8Array;
  /** hashes from the app output from the prev block */
  validatorsHash: Uint8Array;
  /** validators for the next block */
  nextValidatorsHash: Uint8Array;
  /** consensus params for current block */
  consensusHash: Uint8Array;
  /** state after txs from the previous block */
  appHash: Uint8Array;
  lastResultsHash: Uint8Array;
  /** consensus info */
  evidenceHash: Uint8Array;
  /** original proposer of the block */
  proposerAddress: Uint8Array;
}
export interface HeaderProtoMsg {
  typeUrl: "/tendermint.types.Header";
  value: Uint8Array;
}
/** Header defines the structure of a Tendermint block header. */
export interface HeaderAmino {
  /** basic block info */
  version?: ConsensusAmino;
  chain_id: string;
  height: string;
  time?: Date;
  /** prev block info */
  last_block_id?: BlockIDAmino;
  /** hashes of block data */
  last_commit_hash: Uint8Array;
  data_hash: Uint8Array;
  /** hashes from the app output from the prev block */
  validators_hash: Uint8Array;
  /** validators for the next block */
  next_validators_hash: Uint8Array;
  /** consensus params for current block */
  consensus_hash: Uint8Array;
  /** state after txs from the previous block */
  app_hash: Uint8Array;
  last_results_hash: Uint8Array;
  /** consensus info */
  evidence_hash: Uint8Array;
  /** original proposer of the block */
  proposer_address: Uint8Array;
}
export interface HeaderAminoMsg {
  type: "/tendermint.types.Header";
  value: HeaderAmino;
}
/** Header defines the structure of a Tendermint block header. */
export interface HeaderSDKType {
  version: ConsensusSDKType;
  chain_id: string;
  height: Long;
  time: Date;
  last_block_id: BlockIDSDKType;
  last_commit_hash: Uint8Array;
  data_hash: Uint8Array;
  validators_hash: Uint8Array;
  next_validators_hash: Uint8Array;
  consensus_hash: Uint8Array;
  app_hash: Uint8Array;
  last_results_hash: Uint8Array;
  evidence_hash: Uint8Array;
  proposer_address: Uint8Array;
}
/** Data contains the set of transactions included in the block */
export interface Data {
  /**
   * Txs that will be applied by state @ block.Height+1.
   * NOTE: not all txs here are valid.  We're just agreeing on the order first.
   * This means that block.AppHash does not include these txs.
   */
  txs: Uint8Array[];
}
export interface DataProtoMsg {
  typeUrl: "/tendermint.types.Data";
  value: Uint8Array;
}
/** Data contains the set of transactions included in the block */
export interface DataAmino {
  /**
   * Txs that will be applied by state @ block.Height+1.
   * NOTE: not all txs here are valid.  We're just agreeing on the order first.
   * This means that block.AppHash does not include these txs.
   */
  txs: Uint8Array[];
}
export interface DataAminoMsg {
  type: "/tendermint.types.Data";
  value: DataAmino;
}
/** Data contains the set of transactions included in the block */
export interface DataSDKType {
  txs: Uint8Array[];
}
/**
 * Vote represents a prevote, precommit, or commit vote from validators for
 * consensus.
 */
export interface Vote {
  type: SignedMsgType;
  height: Long;
  round: number;
  /** zero if vote is nil. */
  blockId: BlockID;
  timestamp: Date;
  validatorAddress: Uint8Array;
  validatorIndex: number;
  signature: Uint8Array;
}
export interface VoteProtoMsg {
  typeUrl: "/tendermint.types.Vote";
  value: Uint8Array;
}
/**
 * Vote represents a prevote, precommit, or commit vote from validators for
 * consensus.
 */
export interface VoteAmino {
  type: SignedMsgType;
  height: string;
  round: number;
  /** zero if vote is nil. */
  block_id?: BlockIDAmino;
  timestamp?: Date;
  validator_address: Uint8Array;
  validator_index: number;
  signature: Uint8Array;
}
export interface VoteAminoMsg {
  type: "/tendermint.types.Vote";
  value: VoteAmino;
}
/**
 * Vote represents a prevote, precommit, or commit vote from validators for
 * consensus.
 */
export interface VoteSDKType {
  type: SignedMsgType;
  height: Long;
  round: number;
  block_id: BlockIDSDKType;
  timestamp: Date;
  validator_address: Uint8Array;
  validator_index: number;
  signature: Uint8Array;
}
/** Commit contains the evidence that a block was committed by a set of validators. */
export interface Commit {
  height: Long;
  round: number;
  blockId: BlockID;
  signatures: CommitSig[];
}
export interface CommitProtoMsg {
  typeUrl: "/tendermint.types.Commit";
  value: Uint8Array;
}
/** Commit contains the evidence that a block was committed by a set of validators. */
export interface CommitAmino {
  height: string;
  round: number;
  block_id?: BlockIDAmino;
  signatures: CommitSigAmino[];
}
export interface CommitAminoMsg {
  type: "/tendermint.types.Commit";
  value: CommitAmino;
}
/** Commit contains the evidence that a block was committed by a set of validators. */
export interface CommitSDKType {
  height: Long;
  round: number;
  block_id: BlockIDSDKType;
  signatures: CommitSigSDKType[];
}
/** CommitSig is a part of the Vote included in a Commit. */
export interface CommitSig {
  blockIdFlag: BlockIDFlag;
  validatorAddress: Uint8Array;
  timestamp: Date;
  signature: Uint8Array;
}
export interface CommitSigProtoMsg {
  typeUrl: "/tendermint.types.CommitSig";
  value: Uint8Array;
}
/** CommitSig is a part of the Vote included in a Commit. */
export interface CommitSigAmino {
  block_id_flag: BlockIDFlag;
  validator_address: Uint8Array;
  timestamp?: Date;
  signature: Uint8Array;
}
export interface CommitSigAminoMsg {
  type: "/tendermint.types.CommitSig";
  value: CommitSigAmino;
}
/** CommitSig is a part of the Vote included in a Commit. */
export interface CommitSigSDKType {
  block_id_flag: BlockIDFlag;
  validator_address: Uint8Array;
  timestamp: Date;
  signature: Uint8Array;
}
export interface Proposal {
  type: SignedMsgType;
  height: Long;
  round: number;
  polRound: number;
  blockId: BlockID;
  timestamp: Date;
  signature: Uint8Array;
}
export interface ProposalProtoMsg {
  typeUrl: "/tendermint.types.Proposal";
  value: Uint8Array;
}
export interface ProposalAmino {
  type: SignedMsgType;
  height: string;
  round: number;
  pol_round: number;
  block_id?: BlockIDAmino;
  timestamp?: Date;
  signature: Uint8Array;
}
export interface ProposalAminoMsg {
  type: "/tendermint.types.Proposal";
  value: ProposalAmino;
}
export interface ProposalSDKType {
  type: SignedMsgType;
  height: Long;
  round: number;
  pol_round: number;
  block_id: BlockIDSDKType;
  timestamp: Date;
  signature: Uint8Array;
}
export interface SignedHeader {
  header: Header;
  commit: Commit;
}
export interface SignedHeaderProtoMsg {
  typeUrl: "/tendermint.types.SignedHeader";
  value: Uint8Array;
}
export interface SignedHeaderAmino {
  header?: HeaderAmino;
  commit?: CommitAmino;
}
export interface SignedHeaderAminoMsg {
  type: "/tendermint.types.SignedHeader";
  value: SignedHeaderAmino;
}
export interface SignedHeaderSDKType {
  header: HeaderSDKType;
  commit: CommitSDKType;
}
export interface LightBlock {
  signedHeader: SignedHeader;
  validatorSet: ValidatorSet;
}
export interface LightBlockProtoMsg {
  typeUrl: "/tendermint.types.LightBlock";
  value: Uint8Array;
}
export interface LightBlockAmino {
  signed_header?: SignedHeaderAmino;
  validator_set?: ValidatorSetAmino;
}
export interface LightBlockAminoMsg {
  type: "/tendermint.types.LightBlock";
  value: LightBlockAmino;
}
export interface LightBlockSDKType {
  signed_header: SignedHeaderSDKType;
  validator_set: ValidatorSetSDKType;
}
export interface BlockMeta {
  blockId: BlockID;
  blockSize: Long;
  header: Header;
  numTxs: Long;
}
export interface BlockMetaProtoMsg {
  typeUrl: "/tendermint.types.BlockMeta";
  value: Uint8Array;
}
export interface BlockMetaAmino {
  block_id?: BlockIDAmino;
  block_size: string;
  header?: HeaderAmino;
  num_txs: string;
}
export interface BlockMetaAminoMsg {
  type: "/tendermint.types.BlockMeta";
  value: BlockMetaAmino;
}
export interface BlockMetaSDKType {
  block_id: BlockIDSDKType;
  block_size: Long;
  header: HeaderSDKType;
  num_txs: Long;
}
/** TxProof represents a Merkle proof of the presence of a transaction in the Merkle tree. */
export interface TxProof {
  rootHash: Uint8Array;
  data: Uint8Array;
  proof: Proof;
}
export interface TxProofProtoMsg {
  typeUrl: "/tendermint.types.TxProof";
  value: Uint8Array;
}
/** TxProof represents a Merkle proof of the presence of a transaction in the Merkle tree. */
export interface TxProofAmino {
  root_hash: Uint8Array;
  data: Uint8Array;
  proof?: ProofAmino;
}
export interface TxProofAminoMsg {
  type: "/tendermint.types.TxProof";
  value: TxProofAmino;
}
/** TxProof represents a Merkle proof of the presence of a transaction in the Merkle tree. */
export interface TxProofSDKType {
  root_hash: Uint8Array;
  data: Uint8Array;
  proof: ProofSDKType;
}
