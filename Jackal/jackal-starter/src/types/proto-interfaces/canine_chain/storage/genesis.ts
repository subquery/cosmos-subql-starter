import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { UnifiedFile, UnifiedFileAmino, UnifiedFileSDKType } from "./active_deals";
import { Providers, ProvidersAmino, ProvidersSDKType, Collateral, CollateralAmino, CollateralSDKType, ActiveProviders, ActiveProvidersAmino, ActiveProvidersSDKType, ReportForm, ReportFormAmino, ReportFormSDKType, AttestationForm, AttestationFormAmino, AttestationFormSDKType } from "./providers";
import { StoragePaymentInfo, StoragePaymentInfoAmino, StoragePaymentInfoSDKType } from "./payment_info";
/** GenesisState defines the storage module's genesis state. */
export interface GenesisState {
  params: Params;
  fileList: UnifiedFile[];
  providersList: Providers[];
  paymentInfoList: StoragePaymentInfo[];
  collateralList: Collateral[];
  activeProvidersList: ActiveProviders[];
  reportForms: ReportForm[];
  attestForms: AttestationForm[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/canine_chain.storage.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the storage module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  file_list: UnifiedFileAmino[];
  providers_list: ProvidersAmino[];
  payment_info_list: StoragePaymentInfoAmino[];
  collateral_list: CollateralAmino[];
  active_providers_list: ActiveProvidersAmino[];
  report_forms: ReportFormAmino[];
  attest_forms: AttestationFormAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/canine_chain.storage.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the storage module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  file_list: UnifiedFileSDKType[];
  providers_list: ProvidersSDKType[];
  payment_info_list: StoragePaymentInfoSDKType[];
  collateral_list: CollateralSDKType[];
  active_providers_list: ActiveProvidersSDKType[];
  report_forms: ReportFormSDKType[];
  attest_forms: AttestationFormSDKType[];
}