export interface Bids {
  index: string;
  name: string;
  bidder: string;
  price: string;
}
export interface BidsProtoMsg {
  typeUrl: "/canine_chain.rns.Bids";
  value: Uint8Array;
}
export interface BidsAmino {
  index: string;
  name: string;
  bidder: string;
  price: string;
}
export interface BidsAminoMsg {
  type: "/canine_chain.rns.Bids";
  value: BidsAmino;
}
export interface BidsSDKType {
  index: string;
  name: string;
  bidder: string;
  price: string;
}