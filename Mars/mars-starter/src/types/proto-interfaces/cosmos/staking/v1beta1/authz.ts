import { Coin, CoinAmino, CoinSDKType } from "../../base/v1beta1/coin";
/**
 * AuthorizationType defines the type of staking module authorization type
 * 
 * Since: cosmos-sdk 0.43
 */
export enum AuthorizationType {
  /** AUTHORIZATION_TYPE_UNSPECIFIED - AUTHORIZATION_TYPE_UNSPECIFIED specifies an unknown authorization type */
  AUTHORIZATION_TYPE_UNSPECIFIED = 0,
  /** AUTHORIZATION_TYPE_DELEGATE - AUTHORIZATION_TYPE_DELEGATE defines an authorization type for Msg/Delegate */
  AUTHORIZATION_TYPE_DELEGATE = 1,
  /** AUTHORIZATION_TYPE_UNDELEGATE - AUTHORIZATION_TYPE_UNDELEGATE defines an authorization type for Msg/Undelegate */
  AUTHORIZATION_TYPE_UNDELEGATE = 2,
  /** AUTHORIZATION_TYPE_REDELEGATE - AUTHORIZATION_TYPE_REDELEGATE defines an authorization type for Msg/BeginRedelegate */
  AUTHORIZATION_TYPE_REDELEGATE = 3,
  UNRECOGNIZED = -1,
}
export const AuthorizationTypeSDKType = AuthorizationType;
export const AuthorizationTypeAmino = AuthorizationType;
export function authorizationTypeFromJSON(object: any): AuthorizationType {
  switch (object) {
    case 0:
    case "AUTHORIZATION_TYPE_UNSPECIFIED":
      return AuthorizationType.AUTHORIZATION_TYPE_UNSPECIFIED;
    case 1:
    case "AUTHORIZATION_TYPE_DELEGATE":
      return AuthorizationType.AUTHORIZATION_TYPE_DELEGATE;
    case 2:
    case "AUTHORIZATION_TYPE_UNDELEGATE":
      return AuthorizationType.AUTHORIZATION_TYPE_UNDELEGATE;
    case 3:
    case "AUTHORIZATION_TYPE_REDELEGATE":
      return AuthorizationType.AUTHORIZATION_TYPE_REDELEGATE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AuthorizationType.UNRECOGNIZED;
  }
}
export function authorizationTypeToJSON(object: AuthorizationType): string {
  switch (object) {
    case AuthorizationType.AUTHORIZATION_TYPE_UNSPECIFIED:
      return "AUTHORIZATION_TYPE_UNSPECIFIED";
    case AuthorizationType.AUTHORIZATION_TYPE_DELEGATE:
      return "AUTHORIZATION_TYPE_DELEGATE";
    case AuthorizationType.AUTHORIZATION_TYPE_UNDELEGATE:
      return "AUTHORIZATION_TYPE_UNDELEGATE";
    case AuthorizationType.AUTHORIZATION_TYPE_REDELEGATE:
      return "AUTHORIZATION_TYPE_REDELEGATE";
    case AuthorizationType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * StakeAuthorization defines authorization for delegate/undelegate/redelegate.
 * 
 * Since: cosmos-sdk 0.43
 */
export interface StakeAuthorization {
  /**
   * max_tokens specifies the maximum amount of tokens can be delegate to a validator. If it is
   * empty, there is no spend limit and any amount of coins can be delegated.
   */
  maxTokens: Coin;
  /**
   * allow_list specifies list of validator addresses to whom grantee can delegate tokens on behalf of granter's
   * account.
   */
  allowList?: StakeAuthorization_Validators;
  /** deny_list specifies list of validator addresses to whom grantee can not delegate tokens. */
  denyList?: StakeAuthorization_Validators;
  /** authorization_type defines one of AuthorizationType. */
  authorizationType: AuthorizationType;
}
export interface StakeAuthorizationProtoMsg {
  typeUrl: "/cosmos.staking.v1beta1.StakeAuthorization";
  value: Uint8Array;
}
/**
 * StakeAuthorization defines authorization for delegate/undelegate/redelegate.
 * 
 * Since: cosmos-sdk 0.43
 */
export interface StakeAuthorizationAmino {
  /**
   * max_tokens specifies the maximum amount of tokens can be delegate to a validator. If it is
   * empty, there is no spend limit and any amount of coins can be delegated.
   */
  max_tokens?: CoinAmino;
  /**
   * allow_list specifies list of validator addresses to whom grantee can delegate tokens on behalf of granter's
   * account.
   */
  allow_list?: StakeAuthorization_ValidatorsAmino;
  /** deny_list specifies list of validator addresses to whom grantee can not delegate tokens. */
  deny_list?: StakeAuthorization_ValidatorsAmino;
  /** authorization_type defines one of AuthorizationType. */
  authorization_type: AuthorizationType;
}
export interface StakeAuthorizationAminoMsg {
  type: "cosmos-sdk/StakeAuthorization";
  value: StakeAuthorizationAmino;
}
/**
 * StakeAuthorization defines authorization for delegate/undelegate/redelegate.
 * 
 * Since: cosmos-sdk 0.43
 */
export interface StakeAuthorizationSDKType {
  max_tokens: CoinSDKType;
  allow_list?: StakeAuthorization_ValidatorsSDKType;
  deny_list?: StakeAuthorization_ValidatorsSDKType;
  authorization_type: AuthorizationType;
}
/** Validators defines list of validator addresses. */
export interface StakeAuthorization_Validators {
  address: string[];
}
export interface StakeAuthorization_ValidatorsProtoMsg {
  typeUrl: "/cosmos.staking.v1beta1.Validators";
  value: Uint8Array;
}
/** Validators defines list of validator addresses. */
export interface StakeAuthorization_ValidatorsAmino {
  address: string[];
}
export interface StakeAuthorization_ValidatorsAminoMsg {
  type: "cosmos-sdk/Validators";
  value: StakeAuthorization_ValidatorsAmino;
}
/** Validators defines list of validator addresses. */
export interface StakeAuthorization_ValidatorsSDKType {
  address: string[];
}