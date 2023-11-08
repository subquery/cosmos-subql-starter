import { Long } from "../../helpers";
export interface Names {
  name: string;
  expires: Long;
  value: string;
  data: string;
  subdomains: Names[];
  tld: string;
  locked: Long;
}
export interface NamesProtoMsg {
  typeUrl: "/canine_chain.rns.Names";
  value: Uint8Array;
}
export interface NamesAmino {
  name: string;
  expires: string;
  value: string;
  data: string;
  subdomains: NamesAmino[];
  tld: string;
  locked: string;
}
export interface NamesAminoMsg {
  type: "/canine_chain.rns.Names";
  value: NamesAmino;
}
export interface NamesSDKType {
  name: string;
  expires: Long;
  value: string;
  data: string;
  subdomains: NamesSDKType[];
  tld: string;
  locked: Long;
}