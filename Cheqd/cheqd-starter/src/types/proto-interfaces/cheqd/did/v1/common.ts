export interface KeyValuePair {
  key: string;
  value: string;
}
export interface KeyValuePairProtoMsg {
  typeUrl: "/cheqdid.cheqdnode.cheqd.v1.KeyValuePair";
  value: Uint8Array;
}
export interface KeyValuePairAmino {
  key: string;
  value: string;
}
export interface KeyValuePairAminoMsg {
  type: "/cheqdid.cheqdnode.cheqd.v1.KeyValuePair";
  value: KeyValuePairAmino;
}
export interface KeyValuePairSDKType {
  key: string;
  value: string;
}