import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Notifications, NotificationsAmino, NotificationsSDKType } from "./notifications";
import { NotiCounter, NotiCounterAmino, NotiCounterSDKType } from "./noti_counter";
/** GenesisState defines the notifications module's genesis state. */
export interface GenesisState {
  params: Params;
  notificationsList: Notifications[];
  notiCounterList: NotiCounter[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/canine_chain.notifications.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the notifications module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  notificationsList: NotificationsAmino[];
  notiCounterList: NotiCounterAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/canine_chain.notifications.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the notifications module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  notificationsList: NotificationsSDKType[];
  notiCounterList: NotiCounterSDKType[];
}