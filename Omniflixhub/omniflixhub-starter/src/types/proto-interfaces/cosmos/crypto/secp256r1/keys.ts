/** PubKey defines a secp256r1 ECDSA public key. */
export interface PubKey {
  /**
   * Point on secp256r1 curve in a compressed representation as specified in section
   * 4.3.6 of ANSI X9.62: https://webstore.ansi.org/standards/ascx9/ansix9621998
   */
  key: Uint8Array;
}
export interface PubKeyProtoMsg {
  typeUrl: "/cosmos.crypto.secp256r1.PubKey";
  value: Uint8Array;
}
/** PubKey defines a secp256r1 ECDSA public key. */
export interface PubKeyAmino {
  /**
   * Point on secp256r1 curve in a compressed representation as specified in section
   * 4.3.6 of ANSI X9.62: https://webstore.ansi.org/standards/ascx9/ansix9621998
   */
  key: Uint8Array;
}
export interface PubKeyAminoMsg {
  type: "cosmos-sdk/PubKey";
  value: PubKeyAmino;
}
/** PubKey defines a secp256r1 ECDSA public key. */
export interface PubKeySDKType {
  key: Uint8Array;
}
/** PrivKey defines a secp256r1 ECDSA private key. */
export interface PrivKey {
  /** secret number serialized using big-endian encoding */
  secret: Uint8Array;
}
export interface PrivKeyProtoMsg {
  typeUrl: "/cosmos.crypto.secp256r1.PrivKey";
  value: Uint8Array;
}
/** PrivKey defines a secp256r1 ECDSA private key. */
export interface PrivKeyAmino {
  /** secret number serialized using big-endian encoding */
  secret: Uint8Array;
}
export interface PrivKeyAminoMsg {
  type: "cosmos-sdk/PrivKey";
  value: PrivKeyAmino;
}
/** PrivKey defines a secp256r1 ECDSA private key. */
export interface PrivKeySDKType {
  secret: Uint8Array;
}
