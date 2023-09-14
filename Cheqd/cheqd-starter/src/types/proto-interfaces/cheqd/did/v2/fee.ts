import {
  Coin,
  CoinAmino,
  CoinSDKType,
} from "../../../cosmos/base/v1beta1/coin";
/** FeeParams defines the parameters for the cheqd DID module fixed fee */
export interface FeeParams {
  /**
   * Fixed fee for creating a DID
   *
   * Default: 50 CHEQ or 50000000000ncheq
   */
  createDid: Coin;
  /**
   * Fixed fee for updating a DID
   *
   * Default: 25 CHEQ or 25000000000ncheq
   */
  updateDid: Coin;
  /**
   * Fixed fee for deactivating a DID
   *
   * Default: 10 CHEQ or 10000000000ncheq
   */
  deactivateDid: Coin;
  /**
   * Percentage of the fixed fee that will be burned
   *
   * Default: 0.5 (50%)
   */
  burnFactor: string;
}
export interface FeeParamsProtoMsg {
  typeUrl: "/cheqd.did.v2.FeeParams";
  value: Uint8Array;
}
/** FeeParams defines the parameters for the cheqd DID module fixed fee */
export interface FeeParamsAmino {
  /**
   * Fixed fee for creating a DID
   *
   * Default: 50 CHEQ or 50000000000ncheq
   */
  create_did?: CoinAmino;
  /**
   * Fixed fee for updating a DID
   *
   * Default: 25 CHEQ or 25000000000ncheq
   */
  update_did?: CoinAmino;
  /**
   * Fixed fee for deactivating a DID
   *
   * Default: 10 CHEQ or 10000000000ncheq
   */
  deactivate_did?: CoinAmino;
  /**
   * Percentage of the fixed fee that will be burned
   *
   * Default: 0.5 (50%)
   */
  burn_factor: string;
}
export interface FeeParamsAminoMsg {
  type: "/cheqd.did.v2.FeeParams";
  value: FeeParamsAmino;
}
/** FeeParams defines the parameters for the cheqd DID module fixed fee */
export interface FeeParamsSDKType {
  create_did: CoinSDKType;
  update_did: CoinSDKType;
  deactivate_did: CoinSDKType;
  burn_factor: string;
}
