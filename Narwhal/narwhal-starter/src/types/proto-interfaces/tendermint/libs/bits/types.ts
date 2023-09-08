import { Long } from "../../../helpers";
export interface BitArray {
  bits: Long;
  elems: Long[];
}
export interface BitArrayProtoMsg {
  typeUrl: "/tendermint.libs.bits.BitArray";
  value: Uint8Array;
}
export interface BitArrayAmino {
  bits: string;
  elems: string[];
}
export interface BitArrayAminoMsg {
  type: "/tendermint.libs.bits.BitArray";
  value: BitArrayAmino;
}
export interface BitArraySDKType {
  bits: Long;
  elems: Long[];
}