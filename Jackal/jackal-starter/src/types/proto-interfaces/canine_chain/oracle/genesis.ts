import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Feed, FeedAmino, FeedSDKType } from "./feed";
/** GenesisState defines the rns module's genesis state. */
export interface GenesisState {
  params: Params;
  feedList: Feed[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/canine_chain.oracle.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the rns module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  feed_list: FeedAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/canine_chain.oracle.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the rns module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  feed_list: FeedSDKType[];
}