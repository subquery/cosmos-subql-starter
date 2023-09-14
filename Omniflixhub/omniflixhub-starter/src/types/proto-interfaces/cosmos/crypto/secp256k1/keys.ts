/**
 * PubKey defines a secp256k1 public key
 * Key is the compressed form of the pubkey. The first byte depends is a 0x02 byte
 * if the y-coordinate is the lexicographically largest of the two associated with
 * the x-coordinate. Otherwise the first byte is a 0x03.
 * This prefix is followed with the x-coordinate.
 */
export interface PubKey {
  key: Uint8Array;
}
export interface PubKeyProtoMsg {
  typeUrl: "/cosmos.crypto.secp256k1.PubKey";
  value: Uint8Array;
}
/**
 * PubKey defines a secp256k1 public key
 * Key is the compressed form of the pubkey. The first byte depends is a 0x02 byte
 * if the y-coordinate is the lexicographically largest of the two associated with
 * the x-coordinate. Otherwise the first byte is a 0x03.
 * This prefix is followed with the x-coordinate.
 */
export interface PubKeyAmino {
  key: Uint8Array;
}
export interface PubKeyAminoMsg {
  type: "cosmos-sdk/PubKey";
  value: PubKeyAmino;
}
/**
 * PubKey defines a secp256k1 public key
 * Key is the compressed form of the pubkey. The first byte depends is a 0x02 byte
 * if the y-coordinate is the lexicographically largest of the two associated with
 * the x-coordinate. Otherwise the first byte is a 0x03.
 * This prefix is followed with the x-coordinate.
 */
export interface PubKeySDKType {
  key: Uint8Array;
}
/** PrivKey defines a secp256k1 private key. */
export interface PrivKey {
  key: Uint8Array;
}
export interface PrivKeyProtoMsg {
  typeUrl: "/cosmos.crypto.secp256k1.PrivKey";
  value: Uint8Array;
}
/** PrivKey defines a secp256k1 private key. */
export interface PrivKeyAmino {
  key: Uint8Array;
}
export interface PrivKeyAminoMsg {
  type: "cosmos-sdk/PrivKey";
  value: PrivKeyAmino;
}
/** PrivKey defines a secp256k1 private key. */
export interface PrivKeySDKType {
  key: Uint8Array;
}
