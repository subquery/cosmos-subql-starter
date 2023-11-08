/** Params defines the parameters for the module. */
export interface Params {
  deposit: string;
}
export interface ParamsProtoMsg {
  typeUrl: "/canine_chain.oracle.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  deposit: string;
}
export interface ParamsAminoMsg {
  type: "/canine_chain.oracle.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  deposit: string;
}