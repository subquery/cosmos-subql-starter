import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Files, FilesAmino, FilesSDKType } from "./files";
import { Pubkey, PubkeyAmino, PubkeySDKType } from "./pubkey";
/** GenesisState defines the filetree module's genesis state. */
export interface GenesisState {
  params: Params;
  filesList: Files[];
  pubkeyList: Pubkey[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/canine_chain.filetree.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the filetree module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  filesList: FilesAmino[];
  pubkeyList: PubkeyAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/canine_chain.filetree.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the filetree module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  filesList: FilesSDKType[];
  pubkeyList: PubkeySDKType[];
}