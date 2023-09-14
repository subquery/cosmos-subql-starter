/**
 * MultiSignature wraps the signatures from a multisig.LegacyAminoPubKey.
 * See cosmos.tx.v1betata1.ModeInfo.Multi for how to specify which signers
 * signed and with which modes.
 */
export interface MultiSignature {
  signatures: Uint8Array[];
}
export interface MultiSignatureProtoMsg {
  typeUrl: "/cosmos.crypto.multisig.v1beta1.MultiSignature";
  value: Uint8Array;
}
/**
 * MultiSignature wraps the signatures from a multisig.LegacyAminoPubKey.
 * See cosmos.tx.v1betata1.ModeInfo.Multi for how to specify which signers
 * signed and with which modes.
 */
export interface MultiSignatureAmino {
  signatures: Uint8Array[];
}
export interface MultiSignatureAminoMsg {
  type: "cosmos-sdk/MultiSignature";
  value: MultiSignatureAmino;
}
/**
 * MultiSignature wraps the signatures from a multisig.LegacyAminoPubKey.
 * See cosmos.tx.v1betata1.ModeInfo.Multi for how to specify which signers
 * signed and with which modes.
 */
export interface MultiSignatureSDKType {
  signatures: Uint8Array[];
}
/**
 * CompactBitArray is an implementation of a space efficient bit array.
 * This is used to ensure that the encoded data takes up a minimal amount of
 * space after proto encoding.
 * This is not thread safe, and is not intended for concurrent usage.
 */
export interface CompactBitArray {
  extraBitsStored: number;
  elems: Uint8Array;
}
export interface CompactBitArrayProtoMsg {
  typeUrl: "/cosmos.crypto.multisig.v1beta1.CompactBitArray";
  value: Uint8Array;
}
/**
 * CompactBitArray is an implementation of a space efficient bit array.
 * This is used to ensure that the encoded data takes up a minimal amount of
 * space after proto encoding.
 * This is not thread safe, and is not intended for concurrent usage.
 */
export interface CompactBitArrayAmino {
  extra_bits_stored: number;
  elems: Uint8Array;
}
export interface CompactBitArrayAminoMsg {
  type: "cosmos-sdk/CompactBitArray";
  value: CompactBitArrayAmino;
}
/**
 * CompactBitArray is an implementation of a space efficient bit array.
 * This is used to ensure that the encoded data takes up a minimal amount of
 * space after proto encoding.
 * This is not thread safe, and is not intended for concurrent usage.
 */
export interface CompactBitArraySDKType {
  extra_bits_stored: number;
  elems: Uint8Array;
}
