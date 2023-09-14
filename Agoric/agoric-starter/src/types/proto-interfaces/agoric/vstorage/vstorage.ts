/** Data is the vstorage node data. */
export interface Data {
  value: string;
}
export interface DataProtoMsg {
  typeUrl: "/agoric.vstorage.Data";
  value: Uint8Array;
}
/** Data is the vstorage node data. */
export interface DataAmino {
  value: string;
}
export interface DataAminoMsg {
  type: "/agoric.vstorage.Data";
  value: DataAmino;
}
/** Data is the vstorage node data. */
export interface DataSDKType {
  value: string;
}
/**
 * Children are the immediate names (just one level deep) of subnodes leading to
 * more data from a given vstorage node.
 */
export interface Children {
  children: string[];
}
export interface ChildrenProtoMsg {
  typeUrl: "/agoric.vstorage.Children";
  value: Uint8Array;
}
/**
 * Children are the immediate names (just one level deep) of subnodes leading to
 * more data from a given vstorage node.
 */
export interface ChildrenAmino {
  children: string[];
}
export interface ChildrenAminoMsg {
  type: "/agoric.vstorage.Children";
  value: ChildrenAmino;
}
/**
 * Children are the immediate names (just one level deep) of subnodes leading to
 * more data from a given vstorage node.
 */
export interface ChildrenSDKType {
  children: string[];
}