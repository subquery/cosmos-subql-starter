/** The initial or exported state. */
export interface GenesisState {
  data: DataEntry[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/agoric.vstorage.GenesisState";
  value: Uint8Array;
}
/** The initial or exported state. */
export interface GenesisStateAmino {
  data: DataEntryAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/agoric.vstorage.GenesisState";
  value: GenesisStateAmino;
}
/** The initial or exported state. */
export interface GenesisStateSDKType {
  data: DataEntrySDKType[];
}
/**
 * A vstorage entry.  The only necessary entries are those with data, as the
 * ancestor nodes are reconstructed on import.
 */
export interface DataEntry {
  /**
   * A "."-separated path with individual path elements matching
   * `[-_A-Za-z0-9]+`
   */
  path: string;
  value: string;
}
export interface DataEntryProtoMsg {
  typeUrl: "/agoric.vstorage.DataEntry";
  value: Uint8Array;
}
/**
 * A vstorage entry.  The only necessary entries are those with data, as the
 * ancestor nodes are reconstructed on import.
 */
export interface DataEntryAmino {
  /**
   * A "."-separated path with individual path elements matching
   * `[-_A-Za-z0-9]+`
   */
  path: string;
  value: string;
}
export interface DataEntryAminoMsg {
  type: "/agoric.vstorage.DataEntry";
  value: DataEntryAmino;
}
/**
 * A vstorage entry.  The only necessary entries are those with data, as the
 * ancestor nodes are reconstructed on import.
 */
export interface DataEntrySDKType {
  path: string;
  value: string;
}
