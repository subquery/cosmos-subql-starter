export interface Forsale {
  name: string;
  price: string;
  owner: string;
}
export interface ForsaleProtoMsg {
  typeUrl: "/canine_chain.rns.Forsale";
  value: Uint8Array;
}
export interface ForsaleAmino {
  name: string;
  price: string;
  owner: string;
}
export interface ForsaleAminoMsg {
  type: "/canine_chain.rns.Forsale";
  value: ForsaleAmino;
}
export interface ForsaleSDKType {
  name: string;
  price: string;
  owner: string;
}