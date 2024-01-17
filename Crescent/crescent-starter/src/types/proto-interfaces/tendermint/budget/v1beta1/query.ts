import { Params, ParamsAmino, ParamsSDKType, Budget, BudgetAmino, BudgetSDKType } from "./budget";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
/** AddressType enumerates the available types of a address. */
export enum AddressType {
  /** ADDRESS_TYPE_32_BYTES - the 32 bytes length address type of ADR 028. */
  ADDRESS_TYPE_32_BYTES = 0,
  /** ADDRESS_TYPE_20_BYTES - the default 20 bytes length address type. */
  ADDRESS_TYPE_20_BYTES = 1,
  UNRECOGNIZED = -1,
}
export const AddressTypeSDKType = AddressType;
export const AddressTypeAmino = AddressType;
export function addressTypeFromJSON(object: any): AddressType {
  switch (object) {
    case 0:
    case "ADDRESS_TYPE_32_BYTES":
      return AddressType.ADDRESS_TYPE_32_BYTES;
    case 1:
    case "ADDRESS_TYPE_20_BYTES":
      return AddressType.ADDRESS_TYPE_20_BYTES;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AddressType.UNRECOGNIZED;
  }
}
export function addressTypeToJSON(object: AddressType): string {
  switch (object) {
    case AddressType.ADDRESS_TYPE_32_BYTES:
      return "ADDRESS_TYPE_32_BYTES";
    case AddressType.ADDRESS_TYPE_20_BYTES:
      return "ADDRESS_TYPE_20_BYTES";
    case AddressType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/cosmos.budget.v1beta1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "cosmos-sdk/QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/cosmos.budget.v1beta1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "cosmos-sdk/QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
/** QueryBudgetsRequest is the request type for the Query/Budgets RPC method. */
export interface QueryBudgetsRequest {
  name: string;
  sourceAddress: string;
  destinationAddress: string;
}
export interface QueryBudgetsRequestProtoMsg {
  typeUrl: "/cosmos.budget.v1beta1.QueryBudgetsRequest";
  value: Uint8Array;
}
/** QueryBudgetsRequest is the request type for the Query/Budgets RPC method. */
export interface QueryBudgetsRequestAmino {
  name: string;
  source_address: string;
  destination_address: string;
}
export interface QueryBudgetsRequestAminoMsg {
  type: "cosmos-sdk/QueryBudgetsRequest";
  value: QueryBudgetsRequestAmino;
}
/** QueryBudgetsRequest is the request type for the Query/Budgets RPC method. */
export interface QueryBudgetsRequestSDKType {
  name: string;
  source_address: string;
  destination_address: string;
}
/** QueryBudgetsResponse is the response type for the Query/Budgets RPC method. */
export interface QueryBudgetsResponse {
  budgets: BudgetResponse[];
}
export interface QueryBudgetsResponseProtoMsg {
  typeUrl: "/cosmos.budget.v1beta1.QueryBudgetsResponse";
  value: Uint8Array;
}
/** QueryBudgetsResponse is the response type for the Query/Budgets RPC method. */
export interface QueryBudgetsResponseAmino {
  budgets: BudgetResponseAmino[];
}
export interface QueryBudgetsResponseAminoMsg {
  type: "cosmos-sdk/QueryBudgetsResponse";
  value: QueryBudgetsResponseAmino;
}
/** QueryBudgetsResponse is the response type for the Query/Budgets RPC method. */
export interface QueryBudgetsResponseSDKType {
  budgets: BudgetResponseSDKType[];
}
export interface BudgetResponse {
  budget: Budget;
  totalCollectedCoins: Coin[];
}
export interface BudgetResponseProtoMsg {
  typeUrl: "/cosmos.budget.v1beta1.BudgetResponse";
  value: Uint8Array;
}
export interface BudgetResponseAmino {
  budget?: BudgetAmino;
  total_collected_coins: CoinAmino[];
}
export interface BudgetResponseAminoMsg {
  type: "cosmos-sdk/BudgetResponse";
  value: BudgetResponseAmino;
}
export interface BudgetResponseSDKType {
  budget: BudgetSDKType;
  total_collected_coins: CoinSDKType[];
}
/** QueryAddressesRequest is the request type for the Query/Addresses RPC method. */
export interface QueryAddressesRequest {
  /** The Address Type, default 0 for ADDRESS_TYPE_32_BYTES or 1 for ADDRESS_TYPE_20_BYTES */
  type: AddressType;
  /** The module name to be used for address derivation, default is budget. */
  moduleName: string;
  /** The name to be used for address derivation. */
  name: string;
}
export interface QueryAddressesRequestProtoMsg {
  typeUrl: "/cosmos.budget.v1beta1.QueryAddressesRequest";
  value: Uint8Array;
}
/** QueryAddressesRequest is the request type for the Query/Addresses RPC method. */
export interface QueryAddressesRequestAmino {
  /** The Address Type, default 0 for ADDRESS_TYPE_32_BYTES or 1 for ADDRESS_TYPE_20_BYTES */
  type: AddressType;
  /** The module name to be used for address derivation, default is budget. */
  module_name: string;
  /** The name to be used for address derivation. */
  name: string;
}
export interface QueryAddressesRequestAminoMsg {
  type: "cosmos-sdk/QueryAddressesRequest";
  value: QueryAddressesRequestAmino;
}
/** QueryAddressesRequest is the request type for the Query/Addresses RPC method. */
export interface QueryAddressesRequestSDKType {
  type: AddressType;
  module_name: string;
  name: string;
}
/** QueryAddressesResponse is the response type for the Query/Addresses RPC method. */
export interface QueryAddressesResponse {
  address: string;
}
export interface QueryAddressesResponseProtoMsg {
  typeUrl: "/cosmos.budget.v1beta1.QueryAddressesResponse";
  value: Uint8Array;
}
/** QueryAddressesResponse is the response type for the Query/Addresses RPC method. */
export interface QueryAddressesResponseAmino {
  address: string;
}
export interface QueryAddressesResponseAminoMsg {
  type: "cosmos-sdk/QueryAddressesResponse";
  value: QueryAddressesResponseAmino;
}
/** QueryAddressesResponse is the response type for the Query/Addresses RPC method. */
export interface QueryAddressesResponseSDKType {
  address: string;
}