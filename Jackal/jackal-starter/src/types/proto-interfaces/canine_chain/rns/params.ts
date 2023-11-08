/** Params defines the parameters for the module. */
export interface Params {
  depositAccount: string;
}
export interface ParamsProtoMsg {
  typeUrl: "/canine_chain.rns.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  deposit_account: string;
}
export interface ParamsAminoMsg {
  type: "/canine_chain.rns.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  deposit_account: string;
}