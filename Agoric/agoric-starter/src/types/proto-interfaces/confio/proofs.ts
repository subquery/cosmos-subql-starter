export enum HashOp {
  /** NO_HASH - NO_HASH is the default if no data passed. Note this is an illegal argument some places. */
  NO_HASH = 0,
  SHA256 = 1,
  SHA512 = 2,
  KECCAK = 3,
  RIPEMD160 = 4,
  /** BITCOIN - ripemd160(sha256(x)) */
  BITCOIN = 5,
  UNRECOGNIZED = -1,
}
export const HashOpSDKType = HashOp;
export const HashOpAmino = HashOp;
export function hashOpFromJSON(object: any): HashOp {
  switch (object) {
    case 0:
    case "NO_HASH":
      return HashOp.NO_HASH;
    case 1:
    case "SHA256":
      return HashOp.SHA256;
    case 2:
    case "SHA512":
      return HashOp.SHA512;
    case 3:
    case "KECCAK":
      return HashOp.KECCAK;
    case 4:
    case "RIPEMD160":
      return HashOp.RIPEMD160;
    case 5:
    case "BITCOIN":
      return HashOp.BITCOIN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return HashOp.UNRECOGNIZED;
  }
}
export function hashOpToJSON(object: HashOp): string {
  switch (object) {
    case HashOp.NO_HASH:
      return "NO_HASH";
    case HashOp.SHA256:
      return "SHA256";
    case HashOp.SHA512:
      return "SHA512";
    case HashOp.KECCAK:
      return "KECCAK";
    case HashOp.RIPEMD160:
      return "RIPEMD160";
    case HashOp.BITCOIN:
      return "BITCOIN";
    case HashOp.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * LengthOp defines how to process the key and value of the LeafOp
 * to include length information. After encoding the length with the given
 * algorithm, the length will be prepended to the key and value bytes.
 * (Each one with it's own encoded length)
 */
export enum LengthOp {
  /** NO_PREFIX - NO_PREFIX don't include any length info */
  NO_PREFIX = 0,
  /** VAR_PROTO - VAR_PROTO uses protobuf (and go-amino) varint encoding of the length */
  VAR_PROTO = 1,
  /** VAR_RLP - VAR_RLP uses rlp int encoding of the length */
  VAR_RLP = 2,
  /** FIXED32_BIG - FIXED32_BIG uses big-endian encoding of the length as a 32 bit integer */
  FIXED32_BIG = 3,
  /** FIXED32_LITTLE - FIXED32_LITTLE uses little-endian encoding of the length as a 32 bit integer */
  FIXED32_LITTLE = 4,
  /** FIXED64_BIG - FIXED64_BIG uses big-endian encoding of the length as a 64 bit integer */
  FIXED64_BIG = 5,
  /** FIXED64_LITTLE - FIXED64_LITTLE uses little-endian encoding of the length as a 64 bit integer */
  FIXED64_LITTLE = 6,
  /** REQUIRE_32_BYTES - REQUIRE_32_BYTES is like NONE, but will fail if the input is not exactly 32 bytes (sha256 output) */
  REQUIRE_32_BYTES = 7,
  /** REQUIRE_64_BYTES - REQUIRE_64_BYTES is like NONE, but will fail if the input is not exactly 64 bytes (sha512 output) */
  REQUIRE_64_BYTES = 8,
  UNRECOGNIZED = -1,
}
export const LengthOpSDKType = LengthOp;
export const LengthOpAmino = LengthOp;
export function lengthOpFromJSON(object: any): LengthOp {
  switch (object) {
    case 0:
    case "NO_PREFIX":
      return LengthOp.NO_PREFIX;
    case 1:
    case "VAR_PROTO":
      return LengthOp.VAR_PROTO;
    case 2:
    case "VAR_RLP":
      return LengthOp.VAR_RLP;
    case 3:
    case "FIXED32_BIG":
      return LengthOp.FIXED32_BIG;
    case 4:
    case "FIXED32_LITTLE":
      return LengthOp.FIXED32_LITTLE;
    case 5:
    case "FIXED64_BIG":
      return LengthOp.FIXED64_BIG;
    case 6:
    case "FIXED64_LITTLE":
      return LengthOp.FIXED64_LITTLE;
    case 7:
    case "REQUIRE_32_BYTES":
      return LengthOp.REQUIRE_32_BYTES;
    case 8:
    case "REQUIRE_64_BYTES":
      return LengthOp.REQUIRE_64_BYTES;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LengthOp.UNRECOGNIZED;
  }
}
export function lengthOpToJSON(object: LengthOp): string {
  switch (object) {
    case LengthOp.NO_PREFIX:
      return "NO_PREFIX";
    case LengthOp.VAR_PROTO:
      return "VAR_PROTO";
    case LengthOp.VAR_RLP:
      return "VAR_RLP";
    case LengthOp.FIXED32_BIG:
      return "FIXED32_BIG";
    case LengthOp.FIXED32_LITTLE:
      return "FIXED32_LITTLE";
    case LengthOp.FIXED64_BIG:
      return "FIXED64_BIG";
    case LengthOp.FIXED64_LITTLE:
      return "FIXED64_LITTLE";
    case LengthOp.REQUIRE_32_BYTES:
      return "REQUIRE_32_BYTES";
    case LengthOp.REQUIRE_64_BYTES:
      return "REQUIRE_64_BYTES";
    case LengthOp.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * ExistenceProof takes a key and a value and a set of steps to perform on it.
 * The result of peforming all these steps will provide a "root hash", which can
 * be compared to the value in a header.
 * 
 * Since it is computationally infeasible to produce a hash collission for any of the used
 * cryptographic hash functions, if someone can provide a series of operations to transform
 * a given key and value into a root hash that matches some trusted root, these key and values
 * must be in the referenced merkle tree.
 * 
 * The only possible issue is maliablity in LeafOp, such as providing extra prefix data,
 * which should be controlled by a spec. Eg. with lengthOp as NONE,
 * prefix = FOO, key = BAR, value = CHOICE
 * and
 * prefix = F, key = OOBAR, value = CHOICE
 * would produce the same value.
 * 
 * With LengthOp this is tricker but not impossible. Which is why the "leafPrefixEqual" field
 * in the ProofSpec is valuable to prevent this mutability. And why all trees should
 * length-prefix the data before hashing it.
 */
export interface ExistenceProof {
  key: Uint8Array;
  value: Uint8Array;
  leaf: LeafOp;
  path: InnerOp[];
}
export interface ExistenceProofProtoMsg {
  typeUrl: "/ics23.ExistenceProof";
  value: Uint8Array;
}
/**
 * ExistenceProof takes a key and a value and a set of steps to perform on it.
 * The result of peforming all these steps will provide a "root hash", which can
 * be compared to the value in a header.
 * 
 * Since it is computationally infeasible to produce a hash collission for any of the used
 * cryptographic hash functions, if someone can provide a series of operations to transform
 * a given key and value into a root hash that matches some trusted root, these key and values
 * must be in the referenced merkle tree.
 * 
 * The only possible issue is maliablity in LeafOp, such as providing extra prefix data,
 * which should be controlled by a spec. Eg. with lengthOp as NONE,
 * prefix = FOO, key = BAR, value = CHOICE
 * and
 * prefix = F, key = OOBAR, value = CHOICE
 * would produce the same value.
 * 
 * With LengthOp this is tricker but not impossible. Which is why the "leafPrefixEqual" field
 * in the ProofSpec is valuable to prevent this mutability. And why all trees should
 * length-prefix the data before hashing it.
 */
export interface ExistenceProofAmino {
  key: Uint8Array;
  value: Uint8Array;
  leaf?: LeafOpAmino;
  path: InnerOpAmino[];
}
export interface ExistenceProofAminoMsg {
  type: "/ics23.ExistenceProof";
  value: ExistenceProofAmino;
}
/**
 * ExistenceProof takes a key and a value and a set of steps to perform on it.
 * The result of peforming all these steps will provide a "root hash", which can
 * be compared to the value in a header.
 * 
 * Since it is computationally infeasible to produce a hash collission for any of the used
 * cryptographic hash functions, if someone can provide a series of operations to transform
 * a given key and value into a root hash that matches some trusted root, these key and values
 * must be in the referenced merkle tree.
 * 
 * The only possible issue is maliablity in LeafOp, such as providing extra prefix data,
 * which should be controlled by a spec. Eg. with lengthOp as NONE,
 * prefix = FOO, key = BAR, value = CHOICE
 * and
 * prefix = F, key = OOBAR, value = CHOICE
 * would produce the same value.
 * 
 * With LengthOp this is tricker but not impossible. Which is why the "leafPrefixEqual" field
 * in the ProofSpec is valuable to prevent this mutability. And why all trees should
 * length-prefix the data before hashing it.
 */
export interface ExistenceProofSDKType {
  key: Uint8Array;
  value: Uint8Array;
  leaf: LeafOpSDKType;
  path: InnerOpSDKType[];
}
/**
 * NonExistenceProof takes a proof of two neighbors, one left of the desired key,
 * one right of the desired key. If both proofs are valid AND they are neighbors,
 * then there is no valid proof for the given key.
 */
export interface NonExistenceProof {
  /** TODO: remove this as unnecessary??? we prove a range */
  key: Uint8Array;
  left: ExistenceProof;
  right: ExistenceProof;
}
export interface NonExistenceProofProtoMsg {
  typeUrl: "/ics23.NonExistenceProof";
  value: Uint8Array;
}
/**
 * NonExistenceProof takes a proof of two neighbors, one left of the desired key,
 * one right of the desired key. If both proofs are valid AND they are neighbors,
 * then there is no valid proof for the given key.
 */
export interface NonExistenceProofAmino {
  /** TODO: remove this as unnecessary??? we prove a range */
  key: Uint8Array;
  left?: ExistenceProofAmino;
  right?: ExistenceProofAmino;
}
export interface NonExistenceProofAminoMsg {
  type: "/ics23.NonExistenceProof";
  value: NonExistenceProofAmino;
}
/**
 * NonExistenceProof takes a proof of two neighbors, one left of the desired key,
 * one right of the desired key. If both proofs are valid AND they are neighbors,
 * then there is no valid proof for the given key.
 */
export interface NonExistenceProofSDKType {
  key: Uint8Array;
  left: ExistenceProofSDKType;
  right: ExistenceProofSDKType;
}
/** CommitmentProof is either an ExistenceProof or a NonExistenceProof, or a Batch of such messages */
export interface CommitmentProof {
  exist?: ExistenceProof;
  nonexist?: NonExistenceProof;
  batch?: BatchProof;
  compressed?: CompressedBatchProof;
}
export interface CommitmentProofProtoMsg {
  typeUrl: "/ics23.CommitmentProof";
  value: Uint8Array;
}
/** CommitmentProof is either an ExistenceProof or a NonExistenceProof, or a Batch of such messages */
export interface CommitmentProofAmino {
  exist?: ExistenceProofAmino;
  nonexist?: NonExistenceProofAmino;
  batch?: BatchProofAmino;
  compressed?: CompressedBatchProofAmino;
}
export interface CommitmentProofAminoMsg {
  type: "/ics23.CommitmentProof";
  value: CommitmentProofAmino;
}
/** CommitmentProof is either an ExistenceProof or a NonExistenceProof, or a Batch of such messages */
export interface CommitmentProofSDKType {
  exist?: ExistenceProofSDKType;
  nonexist?: NonExistenceProofSDKType;
  batch?: BatchProofSDKType;
  compressed?: CompressedBatchProofSDKType;
}
/**
 * LeafOp represents the raw key-value data we wish to prove, and
 * must be flexible to represent the internal transformation from
 * the original key-value pairs into the basis hash, for many existing
 * merkle trees.
 * 
 * key and value are passed in. So that the signature of this operation is:
 * leafOp(key, value) -> output
 * 
 * To process this, first prehash the keys and values if needed (ANY means no hash in this case):
 * hkey = prehashKey(key)
 * hvalue = prehashValue(value)
 * 
 * Then combine the bytes, and hash it
 * output = hash(prefix || length(hkey) || hkey || length(hvalue) || hvalue)
 */
export interface LeafOp {
  hash: HashOp;
  prehashKey: HashOp;
  prehashValue: HashOp;
  length: LengthOp;
  /**
   * prefix is a fixed bytes that may optionally be included at the beginning to differentiate
   * a leaf node from an inner node.
   */
  prefix: Uint8Array;
}
export interface LeafOpProtoMsg {
  typeUrl: "/ics23.LeafOp";
  value: Uint8Array;
}
/**
 * LeafOp represents the raw key-value data we wish to prove, and
 * must be flexible to represent the internal transformation from
 * the original key-value pairs into the basis hash, for many existing
 * merkle trees.
 * 
 * key and value are passed in. So that the signature of this operation is:
 * leafOp(key, value) -> output
 * 
 * To process this, first prehash the keys and values if needed (ANY means no hash in this case):
 * hkey = prehashKey(key)
 * hvalue = prehashValue(value)
 * 
 * Then combine the bytes, and hash it
 * output = hash(prefix || length(hkey) || hkey || length(hvalue) || hvalue)
 */
export interface LeafOpAmino {
  hash: HashOp;
  prehash_key: HashOp;
  prehash_value: HashOp;
  length: LengthOp;
  /**
   * prefix is a fixed bytes that may optionally be included at the beginning to differentiate
   * a leaf node from an inner node.
   */
  prefix: Uint8Array;
}
export interface LeafOpAminoMsg {
  type: "/ics23.LeafOp";
  value: LeafOpAmino;
}
/**
 * LeafOp represents the raw key-value data we wish to prove, and
 * must be flexible to represent the internal transformation from
 * the original key-value pairs into the basis hash, for many existing
 * merkle trees.
 * 
 * key and value are passed in. So that the signature of this operation is:
 * leafOp(key, value) -> output
 * 
 * To process this, first prehash the keys and values if needed (ANY means no hash in this case):
 * hkey = prehashKey(key)
 * hvalue = prehashValue(value)
 * 
 * Then combine the bytes, and hash it
 * output = hash(prefix || length(hkey) || hkey || length(hvalue) || hvalue)
 */
export interface LeafOpSDKType {
  hash: HashOp;
  prehash_key: HashOp;
  prehash_value: HashOp;
  length: LengthOp;
  prefix: Uint8Array;
}
/**
 * InnerOp represents a merkle-proof step that is not a leaf.
 * It represents concatenating two children and hashing them to provide the next result.
 * 
 * The result of the previous step is passed in, so the signature of this op is:
 * innerOp(child) -> output
 * 
 * The result of applying InnerOp should be:
 * output = op.hash(op.prefix || child || op.suffix)
 * 
 * where the || operator is concatenation of binary data,
 * and child is the result of hashing all the tree below this step.
 * 
 * Any special data, like prepending child with the length, or prepending the entire operation with
 * some value to differentiate from leaf nodes, should be included in prefix and suffix.
 * If either of prefix or suffix is empty, we just treat it as an empty string
 */
export interface InnerOp {
  hash: HashOp;
  prefix: Uint8Array;
  suffix: Uint8Array;
}
export interface InnerOpProtoMsg {
  typeUrl: "/ics23.InnerOp";
  value: Uint8Array;
}
/**
 * InnerOp represents a merkle-proof step that is not a leaf.
 * It represents concatenating two children and hashing them to provide the next result.
 * 
 * The result of the previous step is passed in, so the signature of this op is:
 * innerOp(child) -> output
 * 
 * The result of applying InnerOp should be:
 * output = op.hash(op.prefix || child || op.suffix)
 * 
 * where the || operator is concatenation of binary data,
 * and child is the result of hashing all the tree below this step.
 * 
 * Any special data, like prepending child with the length, or prepending the entire operation with
 * some value to differentiate from leaf nodes, should be included in prefix and suffix.
 * If either of prefix or suffix is empty, we just treat it as an empty string
 */
export interface InnerOpAmino {
  hash: HashOp;
  prefix: Uint8Array;
  suffix: Uint8Array;
}
export interface InnerOpAminoMsg {
  type: "/ics23.InnerOp";
  value: InnerOpAmino;
}
/**
 * InnerOp represents a merkle-proof step that is not a leaf.
 * It represents concatenating two children and hashing them to provide the next result.
 * 
 * The result of the previous step is passed in, so the signature of this op is:
 * innerOp(child) -> output
 * 
 * The result of applying InnerOp should be:
 * output = op.hash(op.prefix || child || op.suffix)
 * 
 * where the || operator is concatenation of binary data,
 * and child is the result of hashing all the tree below this step.
 * 
 * Any special data, like prepending child with the length, or prepending the entire operation with
 * some value to differentiate from leaf nodes, should be included in prefix and suffix.
 * If either of prefix or suffix is empty, we just treat it as an empty string
 */
export interface InnerOpSDKType {
  hash: HashOp;
  prefix: Uint8Array;
  suffix: Uint8Array;
}
/**
 * ProofSpec defines what the expected parameters are for a given proof type.
 * This can be stored in the client and used to validate any incoming proofs.
 * 
 * verify(ProofSpec, Proof) -> Proof | Error
 * 
 * As demonstrated in tests, if we don't fix the algorithm used to calculate the
 * LeafHash for a given tree, there are many possible key-value pairs that can
 * generate a given hash (by interpretting the preimage differently).
 * We need this for proper security, requires client knows a priori what
 * tree format server uses. But not in code, rather a configuration object.
 */
export interface ProofSpec {
  /**
   * any field in the ExistenceProof must be the same as in this spec.
   * except Prefix, which is just the first bytes of prefix (spec can be longer)
   */
  leafSpec: LeafOp;
  innerSpec: InnerSpec;
  /** max_depth (if > 0) is the maximum number of InnerOps allowed (mainly for fixed-depth tries) */
  maxDepth: number;
  /** min_depth (if > 0) is the minimum number of InnerOps allowed (mainly for fixed-depth tries) */
  minDepth: number;
}
export interface ProofSpecProtoMsg {
  typeUrl: "/ics23.ProofSpec";
  value: Uint8Array;
}
/**
 * ProofSpec defines what the expected parameters are for a given proof type.
 * This can be stored in the client and used to validate any incoming proofs.
 * 
 * verify(ProofSpec, Proof) -> Proof | Error
 * 
 * As demonstrated in tests, if we don't fix the algorithm used to calculate the
 * LeafHash for a given tree, there are many possible key-value pairs that can
 * generate a given hash (by interpretting the preimage differently).
 * We need this for proper security, requires client knows a priori what
 * tree format server uses. But not in code, rather a configuration object.
 */
export interface ProofSpecAmino {
  /**
   * any field in the ExistenceProof must be the same as in this spec.
   * except Prefix, which is just the first bytes of prefix (spec can be longer)
   */
  leaf_spec?: LeafOpAmino;
  inner_spec?: InnerSpecAmino;
  /** max_depth (if > 0) is the maximum number of InnerOps allowed (mainly for fixed-depth tries) */
  max_depth: number;
  /** min_depth (if > 0) is the minimum number of InnerOps allowed (mainly for fixed-depth tries) */
  min_depth: number;
}
export interface ProofSpecAminoMsg {
  type: "/ics23.ProofSpec";
  value: ProofSpecAmino;
}
/**
 * ProofSpec defines what the expected parameters are for a given proof type.
 * This can be stored in the client and used to validate any incoming proofs.
 * 
 * verify(ProofSpec, Proof) -> Proof | Error
 * 
 * As demonstrated in tests, if we don't fix the algorithm used to calculate the
 * LeafHash for a given tree, there are many possible key-value pairs that can
 * generate a given hash (by interpretting the preimage differently).
 * We need this for proper security, requires client knows a priori what
 * tree format server uses. But not in code, rather a configuration object.
 */
export interface ProofSpecSDKType {
  leaf_spec: LeafOpSDKType;
  inner_spec: InnerSpecSDKType;
  max_depth: number;
  min_depth: number;
}
/**
 * InnerSpec contains all store-specific structure info to determine if two proofs from a
 * given store are neighbors.
 * 
 * This enables:
 * 
 * isLeftMost(spec: InnerSpec, op: InnerOp)
 * isRightMost(spec: InnerSpec, op: InnerOp)
 * isLeftNeighbor(spec: InnerSpec, left: InnerOp, right: InnerOp)
 */
export interface InnerSpec {
  /**
   * Child order is the ordering of the children node, must count from 0
   * iavl tree is [0, 1] (left then right)
   * merk is [0, 2, 1] (left, right, here)
   */
  childOrder: number[];
  childSize: number;
  minPrefixLength: number;
  maxPrefixLength: number;
  /** empty child is the prehash image that is used when one child is nil (eg. 20 bytes of 0) */
  emptyChild: Uint8Array;
  /** hash is the algorithm that must be used for each InnerOp */
  hash: HashOp;
}
export interface InnerSpecProtoMsg {
  typeUrl: "/ics23.InnerSpec";
  value: Uint8Array;
}
/**
 * InnerSpec contains all store-specific structure info to determine if two proofs from a
 * given store are neighbors.
 * 
 * This enables:
 * 
 * isLeftMost(spec: InnerSpec, op: InnerOp)
 * isRightMost(spec: InnerSpec, op: InnerOp)
 * isLeftNeighbor(spec: InnerSpec, left: InnerOp, right: InnerOp)
 */
export interface InnerSpecAmino {
  /**
   * Child order is the ordering of the children node, must count from 0
   * iavl tree is [0, 1] (left then right)
   * merk is [0, 2, 1] (left, right, here)
   */
  child_order: number[];
  child_size: number;
  min_prefix_length: number;
  max_prefix_length: number;
  /** empty child is the prehash image that is used when one child is nil (eg. 20 bytes of 0) */
  empty_child: Uint8Array;
  /** hash is the algorithm that must be used for each InnerOp */
  hash: HashOp;
}
export interface InnerSpecAminoMsg {
  type: "/ics23.InnerSpec";
  value: InnerSpecAmino;
}
/**
 * InnerSpec contains all store-specific structure info to determine if two proofs from a
 * given store are neighbors.
 * 
 * This enables:
 * 
 * isLeftMost(spec: InnerSpec, op: InnerOp)
 * isRightMost(spec: InnerSpec, op: InnerOp)
 * isLeftNeighbor(spec: InnerSpec, left: InnerOp, right: InnerOp)
 */
export interface InnerSpecSDKType {
  child_order: number[];
  child_size: number;
  min_prefix_length: number;
  max_prefix_length: number;
  empty_child: Uint8Array;
  hash: HashOp;
}
/** BatchProof is a group of multiple proof types than can be compressed */
export interface BatchProof {
  entries: BatchEntry[];
}
export interface BatchProofProtoMsg {
  typeUrl: "/ics23.BatchProof";
  value: Uint8Array;
}
/** BatchProof is a group of multiple proof types than can be compressed */
export interface BatchProofAmino {
  entries: BatchEntryAmino[];
}
export interface BatchProofAminoMsg {
  type: "/ics23.BatchProof";
  value: BatchProofAmino;
}
/** BatchProof is a group of multiple proof types than can be compressed */
export interface BatchProofSDKType {
  entries: BatchEntrySDKType[];
}
/** Use BatchEntry not CommitmentProof, to avoid recursion */
export interface BatchEntry {
  exist?: ExistenceProof;
  nonexist?: NonExistenceProof;
}
export interface BatchEntryProtoMsg {
  typeUrl: "/ics23.BatchEntry";
  value: Uint8Array;
}
/** Use BatchEntry not CommitmentProof, to avoid recursion */
export interface BatchEntryAmino {
  exist?: ExistenceProofAmino;
  nonexist?: NonExistenceProofAmino;
}
export interface BatchEntryAminoMsg {
  type: "/ics23.BatchEntry";
  value: BatchEntryAmino;
}
/** Use BatchEntry not CommitmentProof, to avoid recursion */
export interface BatchEntrySDKType {
  exist?: ExistenceProofSDKType;
  nonexist?: NonExistenceProofSDKType;
}
export interface CompressedBatchProof {
  entries: CompressedBatchEntry[];
  lookupInners: InnerOp[];
}
export interface CompressedBatchProofProtoMsg {
  typeUrl: "/ics23.CompressedBatchProof";
  value: Uint8Array;
}
export interface CompressedBatchProofAmino {
  entries: CompressedBatchEntryAmino[];
  lookup_inners: InnerOpAmino[];
}
export interface CompressedBatchProofAminoMsg {
  type: "/ics23.CompressedBatchProof";
  value: CompressedBatchProofAmino;
}
export interface CompressedBatchProofSDKType {
  entries: CompressedBatchEntrySDKType[];
  lookup_inners: InnerOpSDKType[];
}
/** Use BatchEntry not CommitmentProof, to avoid recursion */
export interface CompressedBatchEntry {
  exist?: CompressedExistenceProof;
  nonexist?: CompressedNonExistenceProof;
}
export interface CompressedBatchEntryProtoMsg {
  typeUrl: "/ics23.CompressedBatchEntry";
  value: Uint8Array;
}
/** Use BatchEntry not CommitmentProof, to avoid recursion */
export interface CompressedBatchEntryAmino {
  exist?: CompressedExistenceProofAmino;
  nonexist?: CompressedNonExistenceProofAmino;
}
export interface CompressedBatchEntryAminoMsg {
  type: "/ics23.CompressedBatchEntry";
  value: CompressedBatchEntryAmino;
}
/** Use BatchEntry not CommitmentProof, to avoid recursion */
export interface CompressedBatchEntrySDKType {
  exist?: CompressedExistenceProofSDKType;
  nonexist?: CompressedNonExistenceProofSDKType;
}
export interface CompressedExistenceProof {
  key: Uint8Array;
  value: Uint8Array;
  leaf: LeafOp;
  /** these are indexes into the lookup_inners table in CompressedBatchProof */
  path: number[];
}
export interface CompressedExistenceProofProtoMsg {
  typeUrl: "/ics23.CompressedExistenceProof";
  value: Uint8Array;
}
export interface CompressedExistenceProofAmino {
  key: Uint8Array;
  value: Uint8Array;
  leaf?: LeafOpAmino;
  /** these are indexes into the lookup_inners table in CompressedBatchProof */
  path: number[];
}
export interface CompressedExistenceProofAminoMsg {
  type: "/ics23.CompressedExistenceProof";
  value: CompressedExistenceProofAmino;
}
export interface CompressedExistenceProofSDKType {
  key: Uint8Array;
  value: Uint8Array;
  leaf: LeafOpSDKType;
  path: number[];
}
export interface CompressedNonExistenceProof {
  /** TODO: remove this as unnecessary??? we prove a range */
  key: Uint8Array;
  left: CompressedExistenceProof;
  right: CompressedExistenceProof;
}
export interface CompressedNonExistenceProofProtoMsg {
  typeUrl: "/ics23.CompressedNonExistenceProof";
  value: Uint8Array;
}
export interface CompressedNonExistenceProofAmino {
  /** TODO: remove this as unnecessary??? we prove a range */
  key: Uint8Array;
  left?: CompressedExistenceProofAmino;
  right?: CompressedExistenceProofAmino;
}
export interface CompressedNonExistenceProofAminoMsg {
  type: "/ics23.CompressedNonExistenceProof";
  value: CompressedNonExistenceProofAmino;
}
export interface CompressedNonExistenceProofSDKType {
  key: Uint8Array;
  left: CompressedExistenceProofSDKType;
  right: CompressedExistenceProofSDKType;
}