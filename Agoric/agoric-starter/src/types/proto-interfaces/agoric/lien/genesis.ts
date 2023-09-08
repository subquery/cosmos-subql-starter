import { Lien, LienAmino, LienSDKType } from "./lien";
/** The initial or exported state. */
export interface GenesisState {
  liens: AccountLien[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/agoric.lien.GenesisState";
  value: Uint8Array;
}
/** The initial or exported state. */
export interface GenesisStateAmino {
  liens: AccountLienAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/agoric.lien.GenesisState";
  value: GenesisStateAmino;
}
/** The initial or exported state. */
export interface GenesisStateSDKType {
  liens: AccountLienSDKType[];
}
/** The lien on a particular account */
export interface AccountLien {
  /** Account address, bech32-encoded. */
  address: string;
  /** The liened amount. Should be nonzero. */
  lien: Lien;
}
export interface AccountLienProtoMsg {
  typeUrl: "/agoric.lien.AccountLien";
  value: Uint8Array;
}
/** The lien on a particular account */
export interface AccountLienAmino {
  /** Account address, bech32-encoded. */
  address: string;
  /** The liened amount. Should be nonzero. */
  lien?: LienAmino;
}
export interface AccountLienAminoMsg {
  type: "/agoric.lien.AccountLien";
  value: AccountLienAmino;
}
/** The lien on a particular account */
export interface AccountLienSDKType {
  address: string;
  lien: LienSDKType;
}