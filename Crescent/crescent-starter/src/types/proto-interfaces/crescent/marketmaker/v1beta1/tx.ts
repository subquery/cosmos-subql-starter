import { Long } from "../../../helpers";
export interface MsgApplyMarketMaker {
  address: string;
  pairIds: Long[];
}
export interface MsgApplyMarketMakerProtoMsg {
  typeUrl: "/crescent.marketmaker.v1beta1.MsgApplyMarketMaker";
  value: Uint8Array;
}
export interface MsgApplyMarketMakerAmino {
  address: string;
  pair_ids: string[];
}
export interface MsgApplyMarketMakerAminoMsg {
  type: "/crescent.marketmaker.v1beta1.MsgApplyMarketMaker";
  value: MsgApplyMarketMakerAmino;
}
export interface MsgApplyMarketMakerSDKType {
  address: string;
  pair_ids: Long[];
}
export interface MsgApplyMarketMakerResponse {}
export interface MsgApplyMarketMakerResponseProtoMsg {
  typeUrl: "/crescent.marketmaker.v1beta1.MsgApplyMarketMakerResponse";
  value: Uint8Array;
}
export interface MsgApplyMarketMakerResponseAmino {}
export interface MsgApplyMarketMakerResponseAminoMsg {
  type: "/crescent.marketmaker.v1beta1.MsgApplyMarketMakerResponse";
  value: MsgApplyMarketMakerResponseAmino;
}
export interface MsgApplyMarketMakerResponseSDKType {}
export interface MsgClaimIncentives {
  address: string;
}
export interface MsgClaimIncentivesProtoMsg {
  typeUrl: "/crescent.marketmaker.v1beta1.MsgClaimIncentives";
  value: Uint8Array;
}
export interface MsgClaimIncentivesAmino {
  address: string;
}
export interface MsgClaimIncentivesAminoMsg {
  type: "/crescent.marketmaker.v1beta1.MsgClaimIncentives";
  value: MsgClaimIncentivesAmino;
}
export interface MsgClaimIncentivesSDKType {
  address: string;
}
export interface MsgClaimIncentivesResponse {}
export interface MsgClaimIncentivesResponseProtoMsg {
  typeUrl: "/crescent.marketmaker.v1beta1.MsgClaimIncentivesResponse";
  value: Uint8Array;
}
export interface MsgClaimIncentivesResponseAmino {}
export interface MsgClaimIncentivesResponseAminoMsg {
  type: "/crescent.marketmaker.v1beta1.MsgClaimIncentivesResponse";
  value: MsgClaimIncentivesResponseAmino;
}
export interface MsgClaimIncentivesResponseSDKType {}