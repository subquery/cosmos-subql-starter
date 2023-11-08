export interface Feed {
  owner: string;
  data: string;
  lastUpdate: Date;
  name: string;
}
export interface FeedProtoMsg {
  typeUrl: "/canine_chain.oracle.Feed";
  value: Uint8Array;
}
export interface FeedAmino {
  owner: string;
  data: string;
  last_update?: Date;
  name: string;
}
export interface FeedAminoMsg {
  type: "/canine_chain.oracle.Feed";
  value: FeedAmino;
}
export interface FeedSDKType {
  owner: string;
  data: string;
  last_update: Date;
  name: string;
}