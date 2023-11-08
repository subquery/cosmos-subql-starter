export interface Init {
  address: string;
  complete: boolean;
}
export interface InitProtoMsg {
  typeUrl: "/canine_chain.rns.Init";
  value: Uint8Array;
}
export interface InitAmino {
  address: string;
  complete: boolean;
}
export interface InitAminoMsg {
  type: "/canine_chain.rns.Init";
  value: InitAmino;
}
export interface InitSDKType {
  address: string;
  complete: boolean;
}