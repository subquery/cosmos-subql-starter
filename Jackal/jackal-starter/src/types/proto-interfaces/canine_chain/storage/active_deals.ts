import { Long } from "../../helpers";
export interface LegacyActiveDeals {
  cid: string;
  signee: string;
  provider: string;
  startblock: string;
  endblock: string;
  filesize: string;
  proofverified: string;
  proofsmissed: string;
  blocktoprove: string;
  creator: string;
  merkle: string;
  fid: string;
}
export interface LegacyActiveDealsProtoMsg {
  typeUrl: "/canine_chain.storage.LegacyActiveDeals";
  value: Uint8Array;
}
export interface LegacyActiveDealsAmino {
  cid: string;
  signee: string;
  provider: string;
  startblock: string;
  endblock: string;
  filesize: string;
  proofverified: string;
  proofsmissed: string;
  blocktoprove: string;
  creator: string;
  merkle: string;
  fid: string;
}
export interface LegacyActiveDealsAminoMsg {
  type: "/canine_chain.storage.LegacyActiveDeals";
  value: LegacyActiveDealsAmino;
}
export interface LegacyActiveDealsSDKType {
  cid: string;
  signee: string;
  provider: string;
  startblock: string;
  endblock: string;
  filesize: string;
  proofverified: string;
  proofsmissed: string;
  blocktoprove: string;
  creator: string;
  merkle: string;
  fid: string;
}
export interface UnifiedFile {
  /** The merkle root is unique to every file based on its contents. */
  merkle: Uint8Array;
  owner: string;
  /** Marks the block height the file started on. */
  start: Long;
  /** If not zero, the end block determines when a file should be deleted. */
  expires: Long;
  fileSize: Long;
  /** How many blocks between proofs. */
  proofInterval: Long;
  proofType: Long;
  /** A list of every file proof. */
  proofs: string[];
  /** How many provers this file can have. */
  maxProofs: Long;
  /** Misc string to store extra details. */
  note: string;
}
export interface UnifiedFileProtoMsg {
  typeUrl: "/canine_chain.storage.UnifiedFile";
  value: Uint8Array;
}
export interface UnifiedFileAmino {
  /** The merkle root is unique to every file based on its contents. */
  merkle: Uint8Array;
  owner: string;
  /** Marks the block height the file started on. */
  start: string;
  /** If not zero, the end block determines when a file should be deleted. */
  expires: string;
  file_size: string;
  /** How many blocks between proofs. */
  proof_interval: string;
  proof_type: string;
  /** A list of every file proof. */
  proofs: string[];
  /** How many provers this file can have. */
  max_proofs: string;
  /** Misc string to store extra details. */
  note: string;
}
export interface UnifiedFileAminoMsg {
  type: "/canine_chain.storage.UnifiedFile";
  value: UnifiedFileAmino;
}
export interface UnifiedFileSDKType {
  merkle: Uint8Array;
  owner: string;
  start: Long;
  expires: Long;
  file_size: Long;
  proof_interval: Long;
  proof_type: Long;
  proofs: string[];
  max_proofs: Long;
  note: string;
}
export interface FileProof {
  prover: string;
  /** Used to identify which deal this proof belongs to */
  merkle: Uint8Array;
  /** '' */
  owner: string;
  /** '' */
  start: Long;
  lastProven: Long;
  chunkToProve: Long;
}
export interface FileProofProtoMsg {
  typeUrl: "/canine_chain.storage.FileProof";
  value: Uint8Array;
}
export interface FileProofAmino {
  prover: string;
  /** Used to identify which deal this proof belongs to */
  merkle: Uint8Array;
  /** '' */
  owner: string;
  /** '' */
  start: string;
  last_proven: string;
  chunk_to_prove: string;
}
export interface FileProofAminoMsg {
  type: "/canine_chain.storage.FileProof";
  value: FileProofAmino;
}
export interface FileProofSDKType {
  prover: string;
  merkle: Uint8Array;
  owner: string;
  start: Long;
  last_proven: Long;
  chunk_to_prove: Long;
}