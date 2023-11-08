import { Long } from "../../helpers";
export interface MsgCreateNotifications {
  creator: string;
  notification: string;
  address: string;
}
export interface MsgCreateNotificationsProtoMsg {
  typeUrl: "/canine_chain.notifications.MsgCreateNotifications";
  value: Uint8Array;
}
export interface MsgCreateNotificationsAmino {
  creator: string;
  notification: string;
  address: string;
}
export interface MsgCreateNotificationsAminoMsg {
  type: "/canine_chain.notifications.MsgCreateNotifications";
  value: MsgCreateNotificationsAmino;
}
export interface MsgCreateNotificationsSDKType {
  creator: string;
  notification: string;
  address: string;
}
export interface MsgCreateNotificationsResponse {
  notiCounter: Long;
}
export interface MsgCreateNotificationsResponseProtoMsg {
  typeUrl: "/canine_chain.notifications.MsgCreateNotificationsResponse";
  value: Uint8Array;
}
export interface MsgCreateNotificationsResponseAmino {
  notiCounter: string;
}
export interface MsgCreateNotificationsResponseAminoMsg {
  type: "/canine_chain.notifications.MsgCreateNotificationsResponse";
  value: MsgCreateNotificationsResponseAmino;
}
export interface MsgCreateNotificationsResponseSDKType {
  notiCounter: Long;
}
export interface MsgUpdateNotifications {
  creator: string;
  count: Long;
  notification: string;
  address: string;
}
export interface MsgUpdateNotificationsProtoMsg {
  typeUrl: "/canine_chain.notifications.MsgUpdateNotifications";
  value: Uint8Array;
}
export interface MsgUpdateNotificationsAmino {
  creator: string;
  count: string;
  notification: string;
  address: string;
}
export interface MsgUpdateNotificationsAminoMsg {
  type: "/canine_chain.notifications.MsgUpdateNotifications";
  value: MsgUpdateNotificationsAmino;
}
export interface MsgUpdateNotificationsSDKType {
  creator: string;
  count: Long;
  notification: string;
  address: string;
}
export interface MsgUpdateNotificationsResponse {}
export interface MsgUpdateNotificationsResponseProtoMsg {
  typeUrl: "/canine_chain.notifications.MsgUpdateNotificationsResponse";
  value: Uint8Array;
}
export interface MsgUpdateNotificationsResponseAmino {}
export interface MsgUpdateNotificationsResponseAminoMsg {
  type: "/canine_chain.notifications.MsgUpdateNotificationsResponse";
  value: MsgUpdateNotificationsResponseAmino;
}
export interface MsgUpdateNotificationsResponseSDKType {}
export interface MsgDeleteNotifications {
  creator: string;
}
export interface MsgDeleteNotificationsProtoMsg {
  typeUrl: "/canine_chain.notifications.MsgDeleteNotifications";
  value: Uint8Array;
}
export interface MsgDeleteNotificationsAmino {
  creator: string;
}
export interface MsgDeleteNotificationsAminoMsg {
  type: "/canine_chain.notifications.MsgDeleteNotifications";
  value: MsgDeleteNotificationsAmino;
}
export interface MsgDeleteNotificationsSDKType {
  creator: string;
}
export interface MsgDeleteNotificationsResponse {
  notiCounter: Long;
}
export interface MsgDeleteNotificationsResponseProtoMsg {
  typeUrl: "/canine_chain.notifications.MsgDeleteNotificationsResponse";
  value: Uint8Array;
}
export interface MsgDeleteNotificationsResponseAmino {
  notiCounter: string;
}
export interface MsgDeleteNotificationsResponseAminoMsg {
  type: "/canine_chain.notifications.MsgDeleteNotificationsResponse";
  value: MsgDeleteNotificationsResponseAmino;
}
export interface MsgDeleteNotificationsResponseSDKType {
  notiCounter: Long;
}
export interface MsgSetCounter {
  creator: string;
}
export interface MsgSetCounterProtoMsg {
  typeUrl: "/canine_chain.notifications.MsgSetCounter";
  value: Uint8Array;
}
export interface MsgSetCounterAmino {
  creator: string;
}
export interface MsgSetCounterAminoMsg {
  type: "/canine_chain.notifications.MsgSetCounter";
  value: MsgSetCounterAmino;
}
export interface MsgSetCounterSDKType {
  creator: string;
}
export interface MsgSetCounterResponse {
  notiCounter: Long;
}
export interface MsgSetCounterResponseProtoMsg {
  typeUrl: "/canine_chain.notifications.MsgSetCounterResponse";
  value: Uint8Array;
}
export interface MsgSetCounterResponseAmino {
  notiCounter: string;
}
export interface MsgSetCounterResponseAminoMsg {
  type: "/canine_chain.notifications.MsgSetCounterResponse";
  value: MsgSetCounterResponseAmino;
}
export interface MsgSetCounterResponseSDKType {
  notiCounter: Long;
}
export interface MsgBlockSenders {
  creator: string;
  senderIds: string;
}
export interface MsgBlockSendersProtoMsg {
  typeUrl: "/canine_chain.notifications.MsgBlockSenders";
  value: Uint8Array;
}
export interface MsgBlockSendersAmino {
  creator: string;
  senderIds: string;
}
export interface MsgBlockSendersAminoMsg {
  type: "/canine_chain.notifications.MsgBlockSenders";
  value: MsgBlockSendersAmino;
}
export interface MsgBlockSendersSDKType {
  creator: string;
  senderIds: string;
}
export interface MsgBlockSendersResponse {}
export interface MsgBlockSendersResponseProtoMsg {
  typeUrl: "/canine_chain.notifications.MsgBlockSendersResponse";
  value: Uint8Array;
}
export interface MsgBlockSendersResponseAmino {}
export interface MsgBlockSendersResponseAminoMsg {
  type: "/canine_chain.notifications.MsgBlockSendersResponse";
  value: MsgBlockSendersResponseAmino;
}
export interface MsgBlockSendersResponseSDKType {}