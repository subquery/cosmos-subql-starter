export interface Files {
  address: string;
  contents: string;
  owner: string;
  viewingAccess: string;
  editAccess: string;
  trackingNumber: string;
}
export interface FilesProtoMsg {
  typeUrl: "/canine_chain.filetree.Files";
  value: Uint8Array;
}
export interface FilesAmino {
  address: string;
  contents: string;
  owner: string;
  viewingAccess: string;
  editAccess: string;
  trackingNumber: string;
}
export interface FilesAminoMsg {
  type: "/canine_chain.filetree.Files";
  value: FilesAmino;
}
export interface FilesSDKType {
  address: string;
  contents: string;
  owner: string;
  viewingAccess: string;
  editAccess: string;
  trackingNumber: string;
}