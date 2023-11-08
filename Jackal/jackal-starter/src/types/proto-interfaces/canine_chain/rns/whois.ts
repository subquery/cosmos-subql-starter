export interface Whois {
  index: string;
  name: string;
  value: string;
  data: string;
}
export interface WhoisProtoMsg {
  typeUrl: "/canine_chain.rns.Whois";
  value: Uint8Array;
}
export interface WhoisAmino {
  index: string;
  name: string;
  value: string;
  data: string;
}
export interface WhoisAminoMsg {
  type: "/canine_chain.rns.Whois";
  value: WhoisAmino;
}
export interface WhoisSDKType {
  index: string;
  name: string;
  value: string;
  data: string;
}