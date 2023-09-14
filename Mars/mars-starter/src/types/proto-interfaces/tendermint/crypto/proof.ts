import { Long } from "../../helpers";
export interface Proof {
  total: Long;
  index: Long;
  leafHash: Uint8Array;
  aunts: Uint8Array[];
}
export interface ProofProtoMsg {
  typeUrl: "/tendermint.crypto.Proof";
  value: Uint8Array;
}
export interface ProofAmino {
  total: string;
  index: string;
  leaf_hash: Uint8Array;
  aunts: Uint8Array[];
}
export interface ProofAminoMsg {
  type: "/tendermint.crypto.Proof";
  value: ProofAmino;
}
export interface ProofSDKType {
  total: Long;
  index: Long;
  leaf_hash: Uint8Array;
  aunts: Uint8Array[];
}
export interface ValueOp {
  /** Encoded in ProofOp.Key. */
  key: Uint8Array;
  /** To encode in ProofOp.Data */
  proof: Proof;
}
export interface ValueOpProtoMsg {
  typeUrl: "/tendermint.crypto.ValueOp";
  value: Uint8Array;
}
export interface ValueOpAmino {
  /** Encoded in ProofOp.Key. */
  key: Uint8Array;
  /** To encode in ProofOp.Data */
  proof?: ProofAmino;
}
export interface ValueOpAminoMsg {
  type: "/tendermint.crypto.ValueOp";
  value: ValueOpAmino;
}
export interface ValueOpSDKType {
  key: Uint8Array;
  proof: ProofSDKType;
}
export interface DominoOp {
  key: string;
  input: string;
  output: string;
}
export interface DominoOpProtoMsg {
  typeUrl: "/tendermint.crypto.DominoOp";
  value: Uint8Array;
}
export interface DominoOpAmino {
  key: string;
  input: string;
  output: string;
}
export interface DominoOpAminoMsg {
  type: "/tendermint.crypto.DominoOp";
  value: DominoOpAmino;
}
export interface DominoOpSDKType {
  key: string;
  input: string;
  output: string;
}
/**
 * ProofOp defines an operation used for calculating Merkle root
 * The data could be arbitrary format, providing nessecary data
 * for example neighbouring node hash
 */
export interface ProofOp {
  type: string;
  key: Uint8Array;
  data: Uint8Array;
}
export interface ProofOpProtoMsg {
  typeUrl: "/tendermint.crypto.ProofOp";
  value: Uint8Array;
}
/**
 * ProofOp defines an operation used for calculating Merkle root
 * The data could be arbitrary format, providing nessecary data
 * for example neighbouring node hash
 */
export interface ProofOpAmino {
  type: string;
  key: Uint8Array;
  data: Uint8Array;
}
export interface ProofOpAminoMsg {
  type: "/tendermint.crypto.ProofOp";
  value: ProofOpAmino;
}
/**
 * ProofOp defines an operation used for calculating Merkle root
 * The data could be arbitrary format, providing nessecary data
 * for example neighbouring node hash
 */
export interface ProofOpSDKType {
  type: string;
  key: Uint8Array;
  data: Uint8Array;
}
/** ProofOps is Merkle proof defined by the list of ProofOps */
export interface ProofOps {
  ops: ProofOp[];
}
export interface ProofOpsProtoMsg {
  typeUrl: "/tendermint.crypto.ProofOps";
  value: Uint8Array;
}
/** ProofOps is Merkle proof defined by the list of ProofOps */
export interface ProofOpsAmino {
  ops: ProofOpAmino[];
}
export interface ProofOpsAminoMsg {
  type: "/tendermint.crypto.ProofOps";
  value: ProofOpsAmino;
}
/** ProofOps is Merkle proof defined by the list of ProofOps */
export interface ProofOpsSDKType {
  ops: ProofOpSDKType[];
}
