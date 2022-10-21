import {Coin} from "../../types";

export interface AccessConfig {
  Address: string;
  PermissionType: number;
}

export interface StoreCodeMsg {
  sender: string;
  // wasmByteCode: Uint8Array;
  instantiatePermission: AccessConfig;
}
export interface InstantiateContractMsg {
  Sender: string;
  Admin: string;
  CodeID: number;
  Label: string;
  // Msg: Uint8Array;
  Funds: Coin[];
}

export interface MigrateContractMsg {
  Sender: string;
  Contract: string;
  CodeID: number;
  // Msg: Uint8Array;
}
