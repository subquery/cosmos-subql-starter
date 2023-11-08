export interface Pubkey {
  address: string;
  key: string;
}
export interface PubkeyProtoMsg {
  typeUrl: "/canine_chain.filetree.Pubkey";
  value: Uint8Array;
}
export interface PubkeyAmino {
  address: string;
  key: string;
}
export interface PubkeyAminoMsg {
  type: "/canine_chain.filetree.Pubkey";
  value: PubkeyAmino;
}
export interface PubkeySDKType {
  address: string;
  key: string;
}