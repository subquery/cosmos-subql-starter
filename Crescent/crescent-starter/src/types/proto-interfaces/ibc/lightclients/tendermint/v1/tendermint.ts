import { Duration, DurationAmino, DurationSDKType } from "../../../../google/protobuf/duration";
import { Height, HeightAmino, HeightSDKType } from "../../../core/client/v1/client";
import { ProofSpec, ProofSpecAmino, ProofSpecSDKType } from "../../../../confio/proofs";
import { MerkleRoot, MerkleRootAmino, MerkleRootSDKType } from "../../../core/commitment/v1/commitment";
import { SignedHeader, SignedHeaderAmino, SignedHeaderSDKType } from "../../../../tendermint/types/types";
import { ValidatorSet, ValidatorSetAmino, ValidatorSetSDKType } from "../../../../tendermint/types/validator";
import { Long } from "../../../../helpers";
/**
 * ClientState from Tendermint tracks the current validator set, latest height,
 * and a possible frozen height.
 */
export interface ClientState {
  chainId: string;
  trustLevel: Fraction;
  /**
   * duration of the period since the LastestTimestamp during which the
   * submitted headers are valid for upgrade
   */
  trustingPeriod: Duration;
  /** duration of the staking unbonding period */
  unbondingPeriod: Duration;
  /** defines how much new (untrusted) header's Time can drift into the future. */
  maxClockDrift: Duration;
  /** Block height when the client was frozen due to a misbehaviour */
  frozenHeight: Height;
  /** Latest height the client was updated to */
  latestHeight: Height;
  /** Proof specifications used in verifying counterparty state */
  proofSpecs: ProofSpec[];
  /**
   * Path at which next upgraded client will be committed.
   * Each element corresponds to the key for a single CommitmentProof in the
   * chained proof. NOTE: ClientState must stored under
   * `{upgradePath}/{upgradeHeight}/clientState` ConsensusState must be stored
   * under `{upgradepath}/{upgradeHeight}/consensusState` For SDK chains using
   * the default upgrade module, upgrade_path should be []string{"upgrade",
   * "upgradedIBCState"}`
   */
  upgradePath: string[];
  /**
   * This flag, when set to true, will allow governance to recover a client
   * which has expired
   */
  allowUpdateAfterExpiry: boolean;
  /**
   * This flag, when set to true, will allow governance to unfreeze a client
   * whose chain has experienced a misbehaviour event
   */
  allowUpdateAfterMisbehaviour: boolean;
}
export interface ClientStateProtoMsg {
  typeUrl: "/ibc.lightclients.tendermint.v1.ClientState";
  value: Uint8Array;
}
/**
 * ClientState from Tendermint tracks the current validator set, latest height,
 * and a possible frozen height.
 */
export interface ClientStateAmino {
  chain_id: string;
  trust_level?: FractionAmino;
  /**
   * duration of the period since the LastestTimestamp during which the
   * submitted headers are valid for upgrade
   */
  trusting_period?: DurationAmino;
  /** duration of the staking unbonding period */
  unbonding_period?: DurationAmino;
  /** defines how much new (untrusted) header's Time can drift into the future. */
  max_clock_drift?: DurationAmino;
  /** Block height when the client was frozen due to a misbehaviour */
  frozen_height?: HeightAmino;
  /** Latest height the client was updated to */
  latest_height?: HeightAmino;
  /** Proof specifications used in verifying counterparty state */
  proof_specs: ProofSpecAmino[];
  /**
   * Path at which next upgraded client will be committed.
   * Each element corresponds to the key for a single CommitmentProof in the
   * chained proof. NOTE: ClientState must stored under
   * `{upgradePath}/{upgradeHeight}/clientState` ConsensusState must be stored
   * under `{upgradepath}/{upgradeHeight}/consensusState` For SDK chains using
   * the default upgrade module, upgrade_path should be []string{"upgrade",
   * "upgradedIBCState"}`
   */
  upgrade_path: string[];
  /**
   * This flag, when set to true, will allow governance to recover a client
   * which has expired
   */
  allow_update_after_expiry: boolean;
  /**
   * This flag, when set to true, will allow governance to unfreeze a client
   * whose chain has experienced a misbehaviour event
   */
  allow_update_after_misbehaviour: boolean;
}
export interface ClientStateAminoMsg {
  type: "cosmos-sdk/ClientState";
  value: ClientStateAmino;
}
/**
 * ClientState from Tendermint tracks the current validator set, latest height,
 * and a possible frozen height.
 */
export interface ClientStateSDKType {
  chain_id: string;
  trust_level: FractionSDKType;
  trusting_period: DurationSDKType;
  unbonding_period: DurationSDKType;
  max_clock_drift: DurationSDKType;
  frozen_height: HeightSDKType;
  latest_height: HeightSDKType;
  proof_specs: ProofSpecSDKType[];
  upgrade_path: string[];
  allow_update_after_expiry: boolean;
  allow_update_after_misbehaviour: boolean;
}
/** ConsensusState defines the consensus state from Tendermint. */
export interface ConsensusState {
  /**
   * timestamp that corresponds to the block height in which the ConsensusState
   * was stored.
   */
  timestamp: Date;
  /** commitment root (i.e app hash) */
  root: MerkleRoot;
  nextValidatorsHash: Uint8Array;
}
export interface ConsensusStateProtoMsg {
  typeUrl: "/ibc.lightclients.tendermint.v1.ConsensusState";
  value: Uint8Array;
}
/** ConsensusState defines the consensus state from Tendermint. */
export interface ConsensusStateAmino {
  /**
   * timestamp that corresponds to the block height in which the ConsensusState
   * was stored.
   */
  timestamp?: Date;
  /** commitment root (i.e app hash) */
  root?: MerkleRootAmino;
  next_validators_hash: Uint8Array;
}
export interface ConsensusStateAminoMsg {
  type: "cosmos-sdk/ConsensusState";
  value: ConsensusStateAmino;
}
/** ConsensusState defines the consensus state from Tendermint. */
export interface ConsensusStateSDKType {
  timestamp: Date;
  root: MerkleRootSDKType;
  next_validators_hash: Uint8Array;
}
/**
 * Misbehaviour is a wrapper over two conflicting Headers
 * that implements Misbehaviour interface expected by ICS-02
 */
export interface Misbehaviour {
  clientId: string;
  header1: Header;
  header2: Header;
}
export interface MisbehaviourProtoMsg {
  typeUrl: "/ibc.lightclients.tendermint.v1.Misbehaviour";
  value: Uint8Array;
}
/**
 * Misbehaviour is a wrapper over two conflicting Headers
 * that implements Misbehaviour interface expected by ICS-02
 */
export interface MisbehaviourAmino {
  client_id: string;
  header_1?: HeaderAmino;
  header_2?: HeaderAmino;
}
export interface MisbehaviourAminoMsg {
  type: "cosmos-sdk/Misbehaviour";
  value: MisbehaviourAmino;
}
/**
 * Misbehaviour is a wrapper over two conflicting Headers
 * that implements Misbehaviour interface expected by ICS-02
 */
export interface MisbehaviourSDKType {
  client_id: string;
  header_1: HeaderSDKType;
  header_2: HeaderSDKType;
}
/**
 * Header defines the Tendermint client consensus Header.
 * It encapsulates all the information necessary to update from a trusted
 * Tendermint ConsensusState. The inclusion of TrustedHeight and
 * TrustedValidators allows this update to process correctly, so long as the
 * ConsensusState for the TrustedHeight exists, this removes race conditions
 * among relayers The SignedHeader and ValidatorSet are the new untrusted update
 * fields for the client. The TrustedHeight is the height of a stored
 * ConsensusState on the client that will be used to verify the new untrusted
 * header. The Trusted ConsensusState must be within the unbonding period of
 * current time in order to correctly verify, and the TrustedValidators must
 * hash to TrustedConsensusState.NextValidatorsHash since that is the last
 * trusted validator set at the TrustedHeight.
 */
export interface Header {
  signedHeader: SignedHeader;
  validatorSet: ValidatorSet;
  trustedHeight: Height;
  trustedValidators: ValidatorSet;
}
export interface HeaderProtoMsg {
  typeUrl: "/ibc.lightclients.tendermint.v1.Header";
  value: Uint8Array;
}
/**
 * Header defines the Tendermint client consensus Header.
 * It encapsulates all the information necessary to update from a trusted
 * Tendermint ConsensusState. The inclusion of TrustedHeight and
 * TrustedValidators allows this update to process correctly, so long as the
 * ConsensusState for the TrustedHeight exists, this removes race conditions
 * among relayers The SignedHeader and ValidatorSet are the new untrusted update
 * fields for the client. The TrustedHeight is the height of a stored
 * ConsensusState on the client that will be used to verify the new untrusted
 * header. The Trusted ConsensusState must be within the unbonding period of
 * current time in order to correctly verify, and the TrustedValidators must
 * hash to TrustedConsensusState.NextValidatorsHash since that is the last
 * trusted validator set at the TrustedHeight.
 */
export interface HeaderAmino {
  signed_header?: SignedHeaderAmino;
  validator_set?: ValidatorSetAmino;
  trusted_height?: HeightAmino;
  trusted_validators?: ValidatorSetAmino;
}
export interface HeaderAminoMsg {
  type: "cosmos-sdk/Header";
  value: HeaderAmino;
}
/**
 * Header defines the Tendermint client consensus Header.
 * It encapsulates all the information necessary to update from a trusted
 * Tendermint ConsensusState. The inclusion of TrustedHeight and
 * TrustedValidators allows this update to process correctly, so long as the
 * ConsensusState for the TrustedHeight exists, this removes race conditions
 * among relayers The SignedHeader and ValidatorSet are the new untrusted update
 * fields for the client. The TrustedHeight is the height of a stored
 * ConsensusState on the client that will be used to verify the new untrusted
 * header. The Trusted ConsensusState must be within the unbonding period of
 * current time in order to correctly verify, and the TrustedValidators must
 * hash to TrustedConsensusState.NextValidatorsHash since that is the last
 * trusted validator set at the TrustedHeight.
 */
export interface HeaderSDKType {
  signed_header: SignedHeaderSDKType;
  validator_set: ValidatorSetSDKType;
  trusted_height: HeightSDKType;
  trusted_validators: ValidatorSetSDKType;
}
/**
 * Fraction defines the protobuf message type for tmmath.Fraction that only
 * supports positive values.
 */
export interface Fraction {
  numerator: Long;
  denominator: Long;
}
export interface FractionProtoMsg {
  typeUrl: "/ibc.lightclients.tendermint.v1.Fraction";
  value: Uint8Array;
}
/**
 * Fraction defines the protobuf message type for tmmath.Fraction that only
 * supports positive values.
 */
export interface FractionAmino {
  numerator: string;
  denominator: string;
}
export interface FractionAminoMsg {
  type: "cosmos-sdk/Fraction";
  value: FractionAmino;
}
/**
 * Fraction defines the protobuf message type for tmmath.Fraction that only
 * supports positive values.
 */
export interface FractionSDKType {
  numerator: Long;
  denominator: Long;
}