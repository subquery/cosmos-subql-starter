export interface MsgPostFile {
  creator: string;
  account: string;
  hashParent: string;
  hashChild: string;
  contents: string;
  viewers: string;
  editors: string;
  trackingNumber: string;
}
export interface MsgPostFileProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgPostFile";
  value: Uint8Array;
}
export interface MsgPostFileAmino {
  creator: string;
  account: string;
  hashParent: string;
  hashChild: string;
  contents: string;
  viewers: string;
  editors: string;
  trackingNumber: string;
}
export interface MsgPostFileAminoMsg {
  type: "/canine_chain.filetree.MsgPostFile";
  value: MsgPostFileAmino;
}
export interface MsgPostFileSDKType {
  creator: string;
  account: string;
  hashParent: string;
  hashChild: string;
  contents: string;
  viewers: string;
  editors: string;
  trackingNumber: string;
}
export interface MsgPostFileResponse {
  path: string;
}
export interface MsgPostFileResponseProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgPostFileResponse";
  value: Uint8Array;
}
export interface MsgPostFileResponseAmino {
  path: string;
}
export interface MsgPostFileResponseAminoMsg {
  type: "/canine_chain.filetree.MsgPostFileResponse";
  value: MsgPostFileResponseAmino;
}
export interface MsgPostFileResponseSDKType {
  path: string;
}
export interface MsgAddViewers {
  creator: string;
  viewerIds: string;
  viewerKeys: string;
  address: string;
  fileowner: string;
}
export interface MsgAddViewersProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgAddViewers";
  value: Uint8Array;
}
export interface MsgAddViewersAmino {
  creator: string;
  viewerIds: string;
  viewerKeys: string;
  address: string;
  fileowner: string;
}
export interface MsgAddViewersAminoMsg {
  type: "/canine_chain.filetree.MsgAddViewers";
  value: MsgAddViewersAmino;
}
export interface MsgAddViewersSDKType {
  creator: string;
  viewerIds: string;
  viewerKeys: string;
  address: string;
  fileowner: string;
}
export interface MsgAddViewersResponse {}
export interface MsgAddViewersResponseProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgAddViewersResponse";
  value: Uint8Array;
}
export interface MsgAddViewersResponseAmino {}
export interface MsgAddViewersResponseAminoMsg {
  type: "/canine_chain.filetree.MsgAddViewersResponse";
  value: MsgAddViewersResponseAmino;
}
export interface MsgAddViewersResponseSDKType {}
export interface MsgPostkey {
  creator: string;
  key: string;
}
export interface MsgPostkeyProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgPostkey";
  value: Uint8Array;
}
export interface MsgPostkeyAmino {
  creator: string;
  key: string;
}
export interface MsgPostkeyAminoMsg {
  type: "/canine_chain.filetree.MsgPostkey";
  value: MsgPostkeyAmino;
}
export interface MsgPostkeySDKType {
  creator: string;
  key: string;
}
export interface MsgPostkeyResponse {}
export interface MsgPostkeyResponseProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgPostkeyResponse";
  value: Uint8Array;
}
export interface MsgPostkeyResponseAmino {}
export interface MsgPostkeyResponseAminoMsg {
  type: "/canine_chain.filetree.MsgPostkeyResponse";
  value: MsgPostkeyResponseAmino;
}
export interface MsgPostkeyResponseSDKType {}
export interface MsgDeleteFile {
  creator: string;
  hashPath: string;
  account: string;
}
export interface MsgDeleteFileProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgDeleteFile";
  value: Uint8Array;
}
export interface MsgDeleteFileAmino {
  creator: string;
  hashPath: string;
  account: string;
}
export interface MsgDeleteFileAminoMsg {
  type: "/canine_chain.filetree.MsgDeleteFile";
  value: MsgDeleteFileAmino;
}
export interface MsgDeleteFileSDKType {
  creator: string;
  hashPath: string;
  account: string;
}
export interface MsgDeleteFileResponse {}
export interface MsgDeleteFileResponseProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgDeleteFileResponse";
  value: Uint8Array;
}
export interface MsgDeleteFileResponseAmino {}
export interface MsgDeleteFileResponseAminoMsg {
  type: "/canine_chain.filetree.MsgDeleteFileResponse";
  value: MsgDeleteFileResponseAmino;
}
export interface MsgDeleteFileResponseSDKType {}
export interface MsgRemoveViewers {
  creator: string;
  viewerIds: string;
  address: string;
  fileowner: string;
}
export interface MsgRemoveViewersProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgRemoveViewers";
  value: Uint8Array;
}
export interface MsgRemoveViewersAmino {
  creator: string;
  viewerIds: string;
  address: string;
  fileowner: string;
}
export interface MsgRemoveViewersAminoMsg {
  type: "/canine_chain.filetree.MsgRemoveViewers";
  value: MsgRemoveViewersAmino;
}
export interface MsgRemoveViewersSDKType {
  creator: string;
  viewerIds: string;
  address: string;
  fileowner: string;
}
export interface MsgRemoveViewersResponse {}
export interface MsgRemoveViewersResponseProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgRemoveViewersResponse";
  value: Uint8Array;
}
export interface MsgRemoveViewersResponseAmino {}
export interface MsgRemoveViewersResponseAminoMsg {
  type: "/canine_chain.filetree.MsgRemoveViewersResponse";
  value: MsgRemoveViewersResponseAmino;
}
export interface MsgRemoveViewersResponseSDKType {}
export interface MsgMakeRoot {
  creator: string;
  account: string;
  rootHashPath: string;
  contents: string;
  editors: string;
  viewers: string;
  trackingNumber: string;
}
export interface MsgMakeRootProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgMakeRoot";
  value: Uint8Array;
}
export interface MsgMakeRootAmino {
  creator: string;
  account: string;
  rootHashPath: string;
  contents: string;
  editors: string;
  viewers: string;
  trackingNumber: string;
}
export interface MsgMakeRootAminoMsg {
  type: "/canine_chain.filetree.MsgMakeRoot";
  value: MsgMakeRootAmino;
}
export interface MsgMakeRootSDKType {
  creator: string;
  account: string;
  rootHashPath: string;
  contents: string;
  editors: string;
  viewers: string;
  trackingNumber: string;
}
export interface MsgMakeRootResponse {}
export interface MsgMakeRootResponseProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgMakeRootResponse";
  value: Uint8Array;
}
export interface MsgMakeRootResponseAmino {}
export interface MsgMakeRootResponseAminoMsg {
  type: "/canine_chain.filetree.MsgMakeRootResponse";
  value: MsgMakeRootResponseAmino;
}
export interface MsgMakeRootResponseSDKType {}
export interface MsgMakeRootV2 {
  creator: string;
  editors: string;
  viewers: string;
  trackingNumber: string;
}
export interface MsgMakeRootV2ProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgMakeRootV2";
  value: Uint8Array;
}
export interface MsgMakeRootV2Amino {
  creator: string;
  editors: string;
  viewers: string;
  trackingNumber: string;
}
export interface MsgMakeRootV2AminoMsg {
  type: "/canine_chain.filetree.MsgMakeRootV2";
  value: MsgMakeRootV2Amino;
}
export interface MsgMakeRootV2SDKType {
  creator: string;
  editors: string;
  viewers: string;
  trackingNumber: string;
}
export interface MsgAddEditors {
  creator: string;
  editorIds: string;
  editorKeys: string;
  address: string;
  fileowner: string;
}
export interface MsgAddEditorsProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgAddEditors";
  value: Uint8Array;
}
export interface MsgAddEditorsAmino {
  creator: string;
  editorIds: string;
  editorKeys: string;
  address: string;
  fileowner: string;
}
export interface MsgAddEditorsAminoMsg {
  type: "/canine_chain.filetree.MsgAddEditors";
  value: MsgAddEditorsAmino;
}
export interface MsgAddEditorsSDKType {
  creator: string;
  editorIds: string;
  editorKeys: string;
  address: string;
  fileowner: string;
}
export interface MsgAddEditorsResponse {}
export interface MsgAddEditorsResponseProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgAddEditorsResponse";
  value: Uint8Array;
}
export interface MsgAddEditorsResponseAmino {}
export interface MsgAddEditorsResponseAminoMsg {
  type: "/canine_chain.filetree.MsgAddEditorsResponse";
  value: MsgAddEditorsResponseAmino;
}
export interface MsgAddEditorsResponseSDKType {}
export interface MsgRemoveEditors {
  creator: string;
  editorIds: string;
  address: string;
  fileowner: string;
}
export interface MsgRemoveEditorsProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgRemoveEditors";
  value: Uint8Array;
}
export interface MsgRemoveEditorsAmino {
  creator: string;
  editorIds: string;
  address: string;
  fileowner: string;
}
export interface MsgRemoveEditorsAminoMsg {
  type: "/canine_chain.filetree.MsgRemoveEditors";
  value: MsgRemoveEditorsAmino;
}
export interface MsgRemoveEditorsSDKType {
  creator: string;
  editorIds: string;
  address: string;
  fileowner: string;
}
export interface MsgRemoveEditorsResponse {}
export interface MsgRemoveEditorsResponseProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgRemoveEditorsResponse";
  value: Uint8Array;
}
export interface MsgRemoveEditorsResponseAmino {}
export interface MsgRemoveEditorsResponseAminoMsg {
  type: "/canine_chain.filetree.MsgRemoveEditorsResponse";
  value: MsgRemoveEditorsResponseAmino;
}
export interface MsgRemoveEditorsResponseSDKType {}
export interface MsgResetEditors {
  creator: string;
  address: string;
  fileowner: string;
}
export interface MsgResetEditorsProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgResetEditors";
  value: Uint8Array;
}
export interface MsgResetEditorsAmino {
  creator: string;
  address: string;
  fileowner: string;
}
export interface MsgResetEditorsAminoMsg {
  type: "/canine_chain.filetree.MsgResetEditors";
  value: MsgResetEditorsAmino;
}
export interface MsgResetEditorsSDKType {
  creator: string;
  address: string;
  fileowner: string;
}
export interface MsgResetEditorsResponse {}
export interface MsgResetEditorsResponseProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgResetEditorsResponse";
  value: Uint8Array;
}
export interface MsgResetEditorsResponseAmino {}
export interface MsgResetEditorsResponseAminoMsg {
  type: "/canine_chain.filetree.MsgResetEditorsResponse";
  value: MsgResetEditorsResponseAmino;
}
export interface MsgResetEditorsResponseSDKType {}
export interface MsgResetViewers {
  creator: string;
  address: string;
  fileowner: string;
}
export interface MsgResetViewersProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgResetViewers";
  value: Uint8Array;
}
export interface MsgResetViewersAmino {
  creator: string;
  address: string;
  fileowner: string;
}
export interface MsgResetViewersAminoMsg {
  type: "/canine_chain.filetree.MsgResetViewers";
  value: MsgResetViewersAmino;
}
export interface MsgResetViewersSDKType {
  creator: string;
  address: string;
  fileowner: string;
}
export interface MsgResetViewersResponse {}
export interface MsgResetViewersResponseProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgResetViewersResponse";
  value: Uint8Array;
}
export interface MsgResetViewersResponseAmino {}
export interface MsgResetViewersResponseAminoMsg {
  type: "/canine_chain.filetree.MsgResetViewersResponse";
  value: MsgResetViewersResponseAmino;
}
export interface MsgResetViewersResponseSDKType {}
export interface MsgChangeOwner {
  creator: string;
  address: string;
  fileOwner: string;
  newOwner: string;
}
export interface MsgChangeOwnerProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgChangeOwner";
  value: Uint8Array;
}
export interface MsgChangeOwnerAmino {
  creator: string;
  address: string;
  fileOwner: string;
  newOwner: string;
}
export interface MsgChangeOwnerAminoMsg {
  type: "/canine_chain.filetree.MsgChangeOwner";
  value: MsgChangeOwnerAmino;
}
export interface MsgChangeOwnerSDKType {
  creator: string;
  address: string;
  fileOwner: string;
  newOwner: string;
}
export interface MsgChangeOwnerResponse {}
export interface MsgChangeOwnerResponseProtoMsg {
  typeUrl: "/canine_chain.filetree.MsgChangeOwnerResponse";
  value: Uint8Array;
}
export interface MsgChangeOwnerResponseAmino {}
export interface MsgChangeOwnerResponseAminoMsg {
  type: "/canine_chain.filetree.MsgChangeOwnerResponse";
  value: MsgChangeOwnerResponseAmino;
}
export interface MsgChangeOwnerResponseSDKType {}