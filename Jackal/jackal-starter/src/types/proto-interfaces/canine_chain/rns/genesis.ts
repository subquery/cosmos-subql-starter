import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Whois, WhoisAmino, WhoisSDKType } from "./whois";
import { Names, NamesAmino, NamesSDKType } from "./names";
import { Bids, BidsAmino, BidsSDKType } from "./bids";
import { Forsale, ForsaleAmino, ForsaleSDKType } from "./forsale";
import { Init, InitAmino, InitSDKType } from "./init";
/** GenesisState defines the rns module's genesis state. */
export interface GenesisState {
  params: Params;
  whoIsList: Whois[];
  namesList: Names[];
  bidsList: Bids[];
  forSaleList: Forsale[];
  initList: Init[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/canine_chain.rns.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the rns module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  who_is_list: WhoisAmino[];
  names_list: NamesAmino[];
  bids_list: BidsAmino[];
  for_sale_list: ForsaleAmino[];
  init_list: InitAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/canine_chain.rns.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the rns module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  who_is_list: WhoisSDKType[];
  names_list: NamesSDKType[];
  bids_list: BidsSDKType[];
  for_sale_list: ForsaleSDKType[];
  init_list: InitSDKType[];
}