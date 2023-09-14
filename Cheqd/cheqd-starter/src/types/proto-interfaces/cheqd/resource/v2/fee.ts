import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
/**
 * FeeParams defines the parameters for the cheqd Resource module fixed fee.
 * Creation requests for different IANA media types are charged different fees.
 */
export interface FeeParams {
  /**
   * Fixed fee for creating a resource with media type 'image/*'
   * 
   * Default: 10 CHEQ or 10000000000ncheq
   */
  image: Coin;
  /**
   * Fixed fee for creating a resource with media type 'application/json'
   * 
   * Default: 2.5 CHEQ or 2500000000ncheq
   */
  json: Coin;
  /**
   * Fixed fee for creating a resource with all other media types
   * 
   * Default: 5 CHEQ or 5000000000ncheq
   */
  default: Coin;
  /**
   * Percentage of the fixed fee that will be burned
   * 
   * Default: 0.5 (50%)
   */
  burnFactor: string;
}
export interface FeeParamsProtoMsg {
  typeUrl: "/cheqd.resource.v2.FeeParams";
  value: Uint8Array;
}
/**
 * FeeParams defines the parameters for the cheqd Resource module fixed fee.
 * Creation requests for different IANA media types are charged different fees.
 */
export interface FeeParamsAmino {
  /**
   * Fixed fee for creating a resource with media type 'image/*'
   * 
   * Default: 10 CHEQ or 10000000000ncheq
   */
  image?: CoinAmino;
  /**
   * Fixed fee for creating a resource with media type 'application/json'
   * 
   * Default: 2.5 CHEQ or 2500000000ncheq
   */
  json?: CoinAmino;
  /**
   * Fixed fee for creating a resource with all other media types
   * 
   * Default: 5 CHEQ or 5000000000ncheq
   */
  default?: CoinAmino;
  /**
   * Percentage of the fixed fee that will be burned
   * 
   * Default: 0.5 (50%)
   */
  burn_factor: string;
}
export interface FeeParamsAminoMsg {
  type: "/cheqd.resource.v2.FeeParams";
  value: FeeParamsAmino;
}
/**
 * FeeParams defines the parameters for the cheqd Resource module fixed fee.
 * Creation requests for different IANA media types are charged different fees.
 */
export interface FeeParamsSDKType {
  image: CoinSDKType;
  json: CoinSDKType;
  default: CoinSDKType;
  burn_factor: string;
}