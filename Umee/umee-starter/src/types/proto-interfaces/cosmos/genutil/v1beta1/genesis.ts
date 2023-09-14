/** GenesisState defines the raw genesis transaction in JSON. */
export interface GenesisState {
  /** gen_txs defines the genesis transactions. */
  genTxs: Uint8Array[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/cosmos.genutil.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the raw genesis transaction in JSON. */
export interface GenesisStateAmino {
  /** gen_txs defines the genesis transactions. */
  gen_txs: Uint8Array[];
}
export interface GenesisStateAminoMsg {
  type: "cosmos-sdk/GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the raw genesis transaction in JSON. */
export interface GenesisStateSDKType {
  gen_txs: Uint8Array[];
}
