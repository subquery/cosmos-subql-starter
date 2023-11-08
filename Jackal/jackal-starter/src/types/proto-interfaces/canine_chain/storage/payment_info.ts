import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { Long } from "../../helpers";
export interface StoragePaymentInfo {
  start: Date;
  end: Date;
  spaceAvailable: Long;
  spaceUsed: Long;
  address: string;
  coins: Coin[];
}
export interface StoragePaymentInfoProtoMsg {
  typeUrl: "/canine_chain.storage.StoragePaymentInfo";
  value: Uint8Array;
}
export interface StoragePaymentInfoAmino {
  start?: Date;
  end?: Date;
  spaceAvailable: string;
  spaceUsed: string;
  address: string;
  coins: CoinAmino[];
}
export interface StoragePaymentInfoAminoMsg {
  type: "/canine_chain.storage.StoragePaymentInfo";
  value: StoragePaymentInfoAmino;
}
export interface StoragePaymentInfoSDKType {
  start: Date;
  end: Date;
  spaceAvailable: Long;
  spaceUsed: Long;
  address: string;
  coins: CoinSDKType[];
}