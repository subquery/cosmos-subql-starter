export interface MsgRegister {
  creator: string;
  name: string;
  years: string;
  data: string;
}
export interface MsgRegisterProtoMsg {
  typeUrl: "/canine_chain.rns.MsgRegister";
  value: Uint8Array;
}
export interface MsgRegisterAmino {
  creator: string;
  name: string;
  years: string;
  data: string;
}
export interface MsgRegisterAminoMsg {
  type: "/canine_chain.rns.MsgRegister";
  value: MsgRegisterAmino;
}
export interface MsgRegisterSDKType {
  creator: string;
  name: string;
  years: string;
  data: string;
}
export interface MsgRegisterResponse {}
export interface MsgRegisterResponseProtoMsg {
  typeUrl: "/canine_chain.rns.MsgRegisterResponse";
  value: Uint8Array;
}
export interface MsgRegisterResponseAmino {}
export interface MsgRegisterResponseAminoMsg {
  type: "/canine_chain.rns.MsgRegisterResponse";
  value: MsgRegisterResponseAmino;
}
export interface MsgRegisterResponseSDKType {}
export interface MsgUpdate {
  creator: string;
  name: string;
  data: string;
}
export interface MsgUpdateProtoMsg {
  typeUrl: "/canine_chain.rns.MsgUpdate";
  value: Uint8Array;
}
export interface MsgUpdateAmino {
  creator: string;
  name: string;
  data: string;
}
export interface MsgUpdateAminoMsg {
  type: "/canine_chain.rns.MsgUpdate";
  value: MsgUpdateAmino;
}
export interface MsgUpdateSDKType {
  creator: string;
  name: string;
  data: string;
}
export interface MsgUpdateResponse {}
export interface MsgUpdateResponseProtoMsg {
  typeUrl: "/canine_chain.rns.MsgUpdateResponse";
  value: Uint8Array;
}
export interface MsgUpdateResponseAmino {}
export interface MsgUpdateResponseAminoMsg {
  type: "/canine_chain.rns.MsgUpdateResponse";
  value: MsgUpdateResponseAmino;
}
export interface MsgUpdateResponseSDKType {}
export interface MsgBid {
  creator: string;
  name: string;
  bid: string;
}
export interface MsgBidProtoMsg {
  typeUrl: "/canine_chain.rns.MsgBid";
  value: Uint8Array;
}
export interface MsgBidAmino {
  creator: string;
  name: string;
  bid: string;
}
export interface MsgBidAminoMsg {
  type: "/canine_chain.rns.MsgBid";
  value: MsgBidAmino;
}
export interface MsgBidSDKType {
  creator: string;
  name: string;
  bid: string;
}
export interface MsgBidResponse {}
export interface MsgBidResponseProtoMsg {
  typeUrl: "/canine_chain.rns.MsgBidResponse";
  value: Uint8Array;
}
export interface MsgBidResponseAmino {}
export interface MsgBidResponseAminoMsg {
  type: "/canine_chain.rns.MsgBidResponse";
  value: MsgBidResponseAmino;
}
export interface MsgBidResponseSDKType {}
export interface MsgAcceptBid {
  creator: string;
  name: string;
  from: string;
}
export interface MsgAcceptBidProtoMsg {
  typeUrl: "/canine_chain.rns.MsgAcceptBid";
  value: Uint8Array;
}
export interface MsgAcceptBidAmino {
  creator: string;
  name: string;
  from: string;
}
export interface MsgAcceptBidAminoMsg {
  type: "/canine_chain.rns.MsgAcceptBid";
  value: MsgAcceptBidAmino;
}
export interface MsgAcceptBidSDKType {
  creator: string;
  name: string;
  from: string;
}
export interface MsgAcceptBidResponse {}
export interface MsgAcceptBidResponseProtoMsg {
  typeUrl: "/canine_chain.rns.MsgAcceptBidResponse";
  value: Uint8Array;
}
export interface MsgAcceptBidResponseAmino {}
export interface MsgAcceptBidResponseAminoMsg {
  type: "/canine_chain.rns.MsgAcceptBidResponse";
  value: MsgAcceptBidResponseAmino;
}
export interface MsgAcceptBidResponseSDKType {}
export interface MsgCancelBid {
  creator: string;
  name: string;
}
export interface MsgCancelBidProtoMsg {
  typeUrl: "/canine_chain.rns.MsgCancelBid";
  value: Uint8Array;
}
export interface MsgCancelBidAmino {
  creator: string;
  name: string;
}
export interface MsgCancelBidAminoMsg {
  type: "/canine_chain.rns.MsgCancelBid";
  value: MsgCancelBidAmino;
}
export interface MsgCancelBidSDKType {
  creator: string;
  name: string;
}
export interface MsgCancelBidResponse {}
export interface MsgCancelBidResponseProtoMsg {
  typeUrl: "/canine_chain.rns.MsgCancelBidResponse";
  value: Uint8Array;
}
export interface MsgCancelBidResponseAmino {}
export interface MsgCancelBidResponseAminoMsg {
  type: "/canine_chain.rns.MsgCancelBidResponse";
  value: MsgCancelBidResponseAmino;
}
export interface MsgCancelBidResponseSDKType {}
export interface MsgList {
  creator: string;
  name: string;
  price: string;
}
export interface MsgListProtoMsg {
  typeUrl: "/canine_chain.rns.MsgList";
  value: Uint8Array;
}
export interface MsgListAmino {
  creator: string;
  name: string;
  price: string;
}
export interface MsgListAminoMsg {
  type: "/canine_chain.rns.MsgList";
  value: MsgListAmino;
}
export interface MsgListSDKType {
  creator: string;
  name: string;
  price: string;
}
export interface MsgListResponse {}
export interface MsgListResponseProtoMsg {
  typeUrl: "/canine_chain.rns.MsgListResponse";
  value: Uint8Array;
}
export interface MsgListResponseAmino {}
export interface MsgListResponseAminoMsg {
  type: "/canine_chain.rns.MsgListResponse";
  value: MsgListResponseAmino;
}
export interface MsgListResponseSDKType {}
export interface MsgBuy {
  creator: string;
  name: string;
}
export interface MsgBuyProtoMsg {
  typeUrl: "/canine_chain.rns.MsgBuy";
  value: Uint8Array;
}
export interface MsgBuyAmino {
  creator: string;
  name: string;
}
export interface MsgBuyAminoMsg {
  type: "/canine_chain.rns.MsgBuy";
  value: MsgBuyAmino;
}
export interface MsgBuySDKType {
  creator: string;
  name: string;
}
export interface MsgBuyResponse {}
export interface MsgBuyResponseProtoMsg {
  typeUrl: "/canine_chain.rns.MsgBuyResponse";
  value: Uint8Array;
}
export interface MsgBuyResponseAmino {}
export interface MsgBuyResponseAminoMsg {
  type: "/canine_chain.rns.MsgBuyResponse";
  value: MsgBuyResponseAmino;
}
export interface MsgBuyResponseSDKType {}
export interface MsgDelist {
  creator: string;
  name: string;
}
export interface MsgDelistProtoMsg {
  typeUrl: "/canine_chain.rns.MsgDelist";
  value: Uint8Array;
}
export interface MsgDelistAmino {
  creator: string;
  name: string;
}
export interface MsgDelistAminoMsg {
  type: "/canine_chain.rns.MsgDelist";
  value: MsgDelistAmino;
}
export interface MsgDelistSDKType {
  creator: string;
  name: string;
}
export interface MsgDelistResponse {}
export interface MsgDelistResponseProtoMsg {
  typeUrl: "/canine_chain.rns.MsgDelistResponse";
  value: Uint8Array;
}
export interface MsgDelistResponseAmino {}
export interface MsgDelistResponseAminoMsg {
  type: "/canine_chain.rns.MsgDelistResponse";
  value: MsgDelistResponseAmino;
}
export interface MsgDelistResponseSDKType {}
export interface MsgTransfer {
  creator: string;
  name: string;
  receiver: string;
}
export interface MsgTransferProtoMsg {
  typeUrl: "/canine_chain.rns.MsgTransfer";
  value: Uint8Array;
}
export interface MsgTransferAmino {
  creator: string;
  name: string;
  receiver: string;
}
export interface MsgTransferAminoMsg {
  type: "/canine_chain.rns.MsgTransfer";
  value: MsgTransferAmino;
}
export interface MsgTransferSDKType {
  creator: string;
  name: string;
  receiver: string;
}
export interface MsgTransferResponse {}
export interface MsgTransferResponseProtoMsg {
  typeUrl: "/canine_chain.rns.MsgTransferResponse";
  value: Uint8Array;
}
export interface MsgTransferResponseAmino {}
export interface MsgTransferResponseAminoMsg {
  type: "/canine_chain.rns.MsgTransferResponse";
  value: MsgTransferResponseAmino;
}
export interface MsgTransferResponseSDKType {}
export interface MsgAddRecord {
  creator: string;
  name: string;
  value: string;
  data: string;
  record: string;
}
export interface MsgAddRecordProtoMsg {
  typeUrl: "/canine_chain.rns.MsgAddRecord";
  value: Uint8Array;
}
export interface MsgAddRecordAmino {
  creator: string;
  name: string;
  value: string;
  data: string;
  record: string;
}
export interface MsgAddRecordAminoMsg {
  type: "/canine_chain.rns.MsgAddRecord";
  value: MsgAddRecordAmino;
}
export interface MsgAddRecordSDKType {
  creator: string;
  name: string;
  value: string;
  data: string;
  record: string;
}
export interface MsgAddRecordResponse {}
export interface MsgAddRecordResponseProtoMsg {
  typeUrl: "/canine_chain.rns.MsgAddRecordResponse";
  value: Uint8Array;
}
export interface MsgAddRecordResponseAmino {}
export interface MsgAddRecordResponseAminoMsg {
  type: "/canine_chain.rns.MsgAddRecordResponse";
  value: MsgAddRecordResponseAmino;
}
export interface MsgAddRecordResponseSDKType {}
export interface MsgDelRecord {
  creator: string;
  name: string;
}
export interface MsgDelRecordProtoMsg {
  typeUrl: "/canine_chain.rns.MsgDelRecord";
  value: Uint8Array;
}
export interface MsgDelRecordAmino {
  creator: string;
  name: string;
}
export interface MsgDelRecordAminoMsg {
  type: "/canine_chain.rns.MsgDelRecord";
  value: MsgDelRecordAmino;
}
export interface MsgDelRecordSDKType {
  creator: string;
  name: string;
}
export interface MsgDelRecordResponse {}
export interface MsgDelRecordResponseProtoMsg {
  typeUrl: "/canine_chain.rns.MsgDelRecordResponse";
  value: Uint8Array;
}
export interface MsgDelRecordResponseAmino {}
export interface MsgDelRecordResponseAminoMsg {
  type: "/canine_chain.rns.MsgDelRecordResponse";
  value: MsgDelRecordResponseAmino;
}
export interface MsgDelRecordResponseSDKType {}
export interface MsgInit {
  creator: string;
}
export interface MsgInitProtoMsg {
  typeUrl: "/canine_chain.rns.MsgInit";
  value: Uint8Array;
}
export interface MsgInitAmino {
  creator: string;
}
export interface MsgInitAminoMsg {
  type: "/canine_chain.rns.MsgInit";
  value: MsgInitAmino;
}
export interface MsgInitSDKType {
  creator: string;
}
export interface MsgInitResponse {}
export interface MsgInitResponseProtoMsg {
  typeUrl: "/canine_chain.rns.MsgInitResponse";
  value: Uint8Array;
}
export interface MsgInitResponseAmino {}
export interface MsgInitResponseAminoMsg {
  type: "/canine_chain.rns.MsgInitResponse";
  value: MsgInitResponseAmino;
}
export interface MsgInitResponseSDKType {}