import { Long } from "../../helpers";
export interface NotiCounter {
  address: string;
  counter: Long;
  blockedSenders: string;
}
export interface NotiCounterProtoMsg {
  typeUrl: "/canine_chain.notifications.NotiCounter";
  value: Uint8Array;
}
export interface NotiCounterAmino {
  address: string;
  counter: string;
  blockedSenders: string;
}
export interface NotiCounterAminoMsg {
  type: "/canine_chain.notifications.NotiCounter";
  value: NotiCounterAmino;
}
export interface NotiCounterSDKType {
  address: string;
  counter: Long;
  blockedSenders: string;
}