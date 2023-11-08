export interface MsgCreateFeed {
  creator: string;
  name: string;
}
export interface MsgCreateFeedProtoMsg {
  typeUrl: "/canine_chain.oracle.MsgCreateFeed";
  value: Uint8Array;
}
export interface MsgCreateFeedAmino {
  creator: string;
  name: string;
}
export interface MsgCreateFeedAminoMsg {
  type: "/canine_chain.oracle.MsgCreateFeed";
  value: MsgCreateFeedAmino;
}
export interface MsgCreateFeedSDKType {
  creator: string;
  name: string;
}
export interface MsgCreateFeedResponse {}
export interface MsgCreateFeedResponseProtoMsg {
  typeUrl: "/canine_chain.oracle.MsgCreateFeedResponse";
  value: Uint8Array;
}
export interface MsgCreateFeedResponseAmino {}
export interface MsgCreateFeedResponseAminoMsg {
  type: "/canine_chain.oracle.MsgCreateFeedResponse";
  value: MsgCreateFeedResponseAmino;
}
export interface MsgCreateFeedResponseSDKType {}
export interface MsgUpdateFeed {
  creator: string;
  name: string;
  data: string;
}
export interface MsgUpdateFeedProtoMsg {
  typeUrl: "/canine_chain.oracle.MsgUpdateFeed";
  value: Uint8Array;
}
export interface MsgUpdateFeedAmino {
  creator: string;
  name: string;
  data: string;
}
export interface MsgUpdateFeedAminoMsg {
  type: "/canine_chain.oracle.MsgUpdateFeed";
  value: MsgUpdateFeedAmino;
}
export interface MsgUpdateFeedSDKType {
  creator: string;
  name: string;
  data: string;
}
export interface MsgUpdateFeedResponse {}
export interface MsgUpdateFeedResponseProtoMsg {
  typeUrl: "/canine_chain.oracle.MsgUpdateFeedResponse";
  value: Uint8Array;
}
export interface MsgUpdateFeedResponseAmino {}
export interface MsgUpdateFeedResponseAminoMsg {
  type: "/canine_chain.oracle.MsgUpdateFeedResponse";
  value: MsgUpdateFeedResponseAmino;
}
export interface MsgUpdateFeedResponseSDKType {}