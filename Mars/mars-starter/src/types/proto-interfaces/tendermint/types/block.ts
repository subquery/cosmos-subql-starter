import {
  Header,
  HeaderAmino,
  HeaderSDKType,
  Data,
  DataAmino,
  DataSDKType,
  Commit,
  CommitAmino,
  CommitSDKType,
} from "./types";
import {
  EvidenceList,
  EvidenceListAmino,
  EvidenceListSDKType,
} from "./evidence";
export interface Block {
  header: Header;
  data: Data;
  evidence: EvidenceList;
  lastCommit: Commit;
}
export interface BlockProtoMsg {
  typeUrl: "/tendermint.types.Block";
  value: Uint8Array;
}
export interface BlockAmino {
  header?: HeaderAmino;
  data?: DataAmino;
  evidence?: EvidenceListAmino;
  last_commit?: CommitAmino;
}
export interface BlockAminoMsg {
  type: "/tendermint.types.Block";
  value: BlockAmino;
}
export interface BlockSDKType {
  header: HeaderSDKType;
  data: DataSDKType;
  evidence: EvidenceListSDKType;
  last_commit: CommitSDKType;
}
