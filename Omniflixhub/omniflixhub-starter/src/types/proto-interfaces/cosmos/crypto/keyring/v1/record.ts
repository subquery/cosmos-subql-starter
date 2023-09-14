import { Any, AnyAmino, AnySDKType } from "../../../../google/protobuf/any";
import {
  BIP44Params,
  BIP44ParamsAmino,
  BIP44ParamsSDKType,
} from "../../hd/v1/hd";
/** Record is used for representing a key in the keyring. */
export interface Record {
  /** name represents a name of Record */
  name: string;
  /** pub_key represents a public key in any format */
  pubKey: Any;
  /** local stores the public information about a locally stored key */
  local?: Record_Local;
  /** ledger stores the public information about a Ledger key */
  ledger?: Record_Ledger;
  /** Multi does not store any information. */
  multi?: Record_Multi;
  /** Offline does not store any information. */
  offline?: Record_Offline;
}
export interface RecordProtoMsg {
  typeUrl: "/cosmos.crypto.keyring.v1.Record";
  value: Uint8Array;
}
/** Record is used for representing a key in the keyring. */
export interface RecordAmino {
  /** name represents a name of Record */
  name: string;
  /** pub_key represents a public key in any format */
  pub_key?: AnyAmino;
  /** local stores the public information about a locally stored key */
  local?: Record_LocalAmino;
  /** ledger stores the public information about a Ledger key */
  ledger?: Record_LedgerAmino;
  /** Multi does not store any information. */
  multi?: Record_MultiAmino;
  /** Offline does not store any information. */
  offline?: Record_OfflineAmino;
}
export interface RecordAminoMsg {
  type: "cosmos-sdk/Record";
  value: RecordAmino;
}
/** Record is used for representing a key in the keyring. */
export interface RecordSDKType {
  name: string;
  pub_key: AnySDKType;
  local?: Record_LocalSDKType;
  ledger?: Record_LedgerSDKType;
  multi?: Record_MultiSDKType;
  offline?: Record_OfflineSDKType;
}
/**
 * Item is a keyring item stored in a keyring backend.
 * Local item
 */
export interface Record_Local {
  privKey: Any;
  privKeyType: string;
}
export interface Record_LocalProtoMsg {
  typeUrl: "/cosmos.crypto.keyring.v1.Local";
  value: Uint8Array;
}
/**
 * Item is a keyring item stored in a keyring backend.
 * Local item
 */
export interface Record_LocalAmino {
  priv_key?: AnyAmino;
  priv_key_type: string;
}
export interface Record_LocalAminoMsg {
  type: "cosmos-sdk/Local";
  value: Record_LocalAmino;
}
/**
 * Item is a keyring item stored in a keyring backend.
 * Local item
 */
export interface Record_LocalSDKType {
  priv_key: AnySDKType;
  priv_key_type: string;
}
/** Ledger item */
export interface Record_Ledger {
  path: BIP44Params;
}
export interface Record_LedgerProtoMsg {
  typeUrl: "/cosmos.crypto.keyring.v1.Ledger";
  value: Uint8Array;
}
/** Ledger item */
export interface Record_LedgerAmino {
  path?: BIP44ParamsAmino;
}
export interface Record_LedgerAminoMsg {
  type: "cosmos-sdk/Ledger";
  value: Record_LedgerAmino;
}
/** Ledger item */
export interface Record_LedgerSDKType {
  path: BIP44ParamsSDKType;
}
/** Multi item */
export interface Record_Multi {}
export interface Record_MultiProtoMsg {
  typeUrl: "/cosmos.crypto.keyring.v1.Multi";
  value: Uint8Array;
}
/** Multi item */
export interface Record_MultiAmino {}
export interface Record_MultiAminoMsg {
  type: "cosmos-sdk/Multi";
  value: Record_MultiAmino;
}
/** Multi item */
export interface Record_MultiSDKType {}
/** Offline item */
export interface Record_Offline {}
export interface Record_OfflineProtoMsg {
  typeUrl: "/cosmos.crypto.keyring.v1.Offline";
  value: Uint8Array;
}
/** Offline item */
export interface Record_OfflineAmino {}
export interface Record_OfflineAminoMsg {
  type: "cosmos-sdk/Offline";
  value: Record_OfflineAmino;
}
/** Offline item */
export interface Record_OfflineSDKType {}
