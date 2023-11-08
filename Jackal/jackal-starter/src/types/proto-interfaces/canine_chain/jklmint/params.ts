import { Long } from "../../helpers";
/** Params defines the parameters for the module. */
export interface Params {
  mintDenom: string;
  providerRatio: Long;
  tokensPerBlock: Long;
}
export interface ParamsProtoMsg {
  typeUrl: "/canine_chain.jklmint.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  mint_denom: string;
  providerRatio: string;
  tokensPerBlock: string;
}
export interface ParamsAminoMsg {
  type: "/canine_chain.jklmint.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  mint_denom: string;
  providerRatio: Long;
  tokensPerBlock: Long;
}