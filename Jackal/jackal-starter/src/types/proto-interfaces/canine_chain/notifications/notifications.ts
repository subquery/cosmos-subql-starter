import { Long } from "../../helpers";
export interface Notifications {
  count: Long;
  notification: string;
  address: string;
  sender: string;
}
export interface NotificationsProtoMsg {
  typeUrl: "/canine_chain.notifications.Notifications";
  value: Uint8Array;
}
export interface NotificationsAmino {
  count: string;
  notification: string;
  address: string;
  sender: string;
}
export interface NotificationsAminoMsg {
  type: "/canine_chain.notifications.Notifications";
  value: NotificationsAmino;
}
export interface NotificationsSDKType {
  count: Long;
  notification: string;
  address: string;
  sender: string;
}