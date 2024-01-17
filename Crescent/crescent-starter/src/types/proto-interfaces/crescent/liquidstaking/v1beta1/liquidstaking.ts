/** ValidatorStatus enumerates the status of a liquid validator. */
export enum ValidatorStatus {
  /** VALIDATOR_STATUS_UNSPECIFIED - VALIDATOR_STATUS_UNSPECIFIED defines the unspecified invalid status. */
  VALIDATOR_STATUS_UNSPECIFIED = 0,
  /** VALIDATOR_STATUS_ACTIVE - VALIDATOR_STATUS_ACTIVE defines the active, valid status */
  VALIDATOR_STATUS_ACTIVE = 1,
  /** VALIDATOR_STATUS_INACTIVE - VALIDATOR_STATUS_INACTIVE defines the inactive, invalid status */
  VALIDATOR_STATUS_INACTIVE = 2,
  UNRECOGNIZED = -1,
}
export const ValidatorStatusSDKType = ValidatorStatus;
export const ValidatorStatusAmino = ValidatorStatus;
export function validatorStatusFromJSON(object: any): ValidatorStatus {
  switch (object) {
    case 0:
    case "VALIDATOR_STATUS_UNSPECIFIED":
      return ValidatorStatus.VALIDATOR_STATUS_UNSPECIFIED;
    case 1:
    case "VALIDATOR_STATUS_ACTIVE":
      return ValidatorStatus.VALIDATOR_STATUS_ACTIVE;
    case 2:
    case "VALIDATOR_STATUS_INACTIVE":
      return ValidatorStatus.VALIDATOR_STATUS_INACTIVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ValidatorStatus.UNRECOGNIZED;
  }
}
export function validatorStatusToJSON(object: ValidatorStatus): string {
  switch (object) {
    case ValidatorStatus.VALIDATOR_STATUS_UNSPECIFIED:
      return "VALIDATOR_STATUS_UNSPECIFIED";
    case ValidatorStatus.VALIDATOR_STATUS_ACTIVE:
      return "VALIDATOR_STATUS_ACTIVE";
    case ValidatorStatus.VALIDATOR_STATUS_INACTIVE:
      return "VALIDATOR_STATUS_INACTIVE";
    case ValidatorStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Params defines the set of params for the liquidstaking module. */
export interface Params {
  /**
   * LiquidBondDenom specifies the denomination of the token receiving after LiquidStaking, The value is calculated
   * through NetAmount.
   */
  liquidBondDenom: string;
  /** WhitelistedValidators specifies the validators elected to become Active Liquid Validators. */
  whitelistedValidators: WhitelistedValidator[];
  /**
   * UnstakeFeeRate specifies the fee rate when liquid unstake is requested, unbonded by subtracting it from
   * unbondingAmount
   */
  unstakeFeeRate: string;
  /**
   * MinLiquidStakingAmount specifies the minimum number of coins to be staked to the active liquid validators on liquid
   * staking to minimize decimal loss and consider gas efficiency.
   */
  minLiquidStakingAmount: string;
}
export interface ParamsProtoMsg {
  typeUrl: "/crescent.liquidstaking.v1beta1.Params";
  value: Uint8Array;
}
/** Params defines the set of params for the liquidstaking module. */
export interface ParamsAmino {
  /**
   * LiquidBondDenom specifies the denomination of the token receiving after LiquidStaking, The value is calculated
   * through NetAmount.
   */
  liquid_bond_denom: string;
  /** WhitelistedValidators specifies the validators elected to become Active Liquid Validators. */
  whitelisted_validators: WhitelistedValidatorAmino[];
  /**
   * UnstakeFeeRate specifies the fee rate when liquid unstake is requested, unbonded by subtracting it from
   * unbondingAmount
   */
  unstake_fee_rate: string;
  /**
   * MinLiquidStakingAmount specifies the minimum number of coins to be staked to the active liquid validators on liquid
   * staking to minimize decimal loss and consider gas efficiency.
   */
  min_liquid_staking_amount: string;
}
export interface ParamsAminoMsg {
  type: "/crescent.liquidstaking.v1beta1.Params";
  value: ParamsAmino;
}
/** Params defines the set of params for the liquidstaking module. */
export interface ParamsSDKType {
  liquid_bond_denom: string;
  whitelisted_validators: WhitelistedValidatorSDKType[];
  unstake_fee_rate: string;
  min_liquid_staking_amount: string;
}
/**
 * WhitelistedValidator consists of the validator operator address and the target weight, which is a value for
 * calculating the real weight to be derived according to the active status. In the case of inactive, it is calculated
 * as zero.
 */
export interface WhitelistedValidator {
  /** validator_address defines the bech32-encoded address that whitelisted validator */
  validatorAddress: string;
  /**
   * target_weight specifies the target weight for liquid staking, unstaking amount, which is a value for calculating
   * the real weight to be derived according to the active status
   */
  targetWeight: string;
}
export interface WhitelistedValidatorProtoMsg {
  typeUrl: "/crescent.liquidstaking.v1beta1.WhitelistedValidator";
  value: Uint8Array;
}
/**
 * WhitelistedValidator consists of the validator operator address and the target weight, which is a value for
 * calculating the real weight to be derived according to the active status. In the case of inactive, it is calculated
 * as zero.
 */
export interface WhitelistedValidatorAmino {
  /** validator_address defines the bech32-encoded address that whitelisted validator */
  validator_address: string;
  /**
   * target_weight specifies the target weight for liquid staking, unstaking amount, which is a value for calculating
   * the real weight to be derived according to the active status
   */
  target_weight: string;
}
export interface WhitelistedValidatorAminoMsg {
  type: "/crescent.liquidstaking.v1beta1.WhitelistedValidator";
  value: WhitelistedValidatorAmino;
}
/**
 * WhitelistedValidator consists of the validator operator address and the target weight, which is a value for
 * calculating the real weight to be derived according to the active status. In the case of inactive, it is calculated
 * as zero.
 */
export interface WhitelistedValidatorSDKType {
  validator_address: string;
  target_weight: string;
}
/**
 * LiquidValidator defines a Validator that can be the target of LiquidStaking and LiquidUnstaking, Active, Weight, etc.
 * fields are derived as functions to deal with by maintaining consistency with the state of the staking module.
 */
export interface LiquidValidator {
  /** operator_address defines the address of the validator's operator; bech encoded in JSON. */
  operatorAddress: string;
}
export interface LiquidValidatorProtoMsg {
  typeUrl: "/crescent.liquidstaking.v1beta1.LiquidValidator";
  value: Uint8Array;
}
/**
 * LiquidValidator defines a Validator that can be the target of LiquidStaking and LiquidUnstaking, Active, Weight, etc.
 * fields are derived as functions to deal with by maintaining consistency with the state of the staking module.
 */
export interface LiquidValidatorAmino {
  /** operator_address defines the address of the validator's operator; bech encoded in JSON. */
  operator_address: string;
}
export interface LiquidValidatorAminoMsg {
  type: "/crescent.liquidstaking.v1beta1.LiquidValidator";
  value: LiquidValidatorAmino;
}
/**
 * LiquidValidator defines a Validator that can be the target of LiquidStaking and LiquidUnstaking, Active, Weight, etc.
 * fields are derived as functions to deal with by maintaining consistency with the state of the staking module.
 */
export interface LiquidValidatorSDKType {
  operator_address: string;
}
/** LiquidValidatorState is type LiquidValidator with state added to return to query results. */
export interface LiquidValidatorState {
  /** operator_address defines the address of the validator's operator; bech encoded in JSON. */
  operatorAddress: string;
  /** weight specifies the weight for liquid staking, unstaking amount */
  weight: string;
  /** status is the liquid validator status */
  status: ValidatorStatus;
  /** del_shares define the delegation shares of the validator */
  delShares: string;
  /** liquid_tokens define the token amount worth of delegation shares of the validator (slashing applied amount) */
  liquidTokens: string;
}
export interface LiquidValidatorStateProtoMsg {
  typeUrl: "/crescent.liquidstaking.v1beta1.LiquidValidatorState";
  value: Uint8Array;
}
/** LiquidValidatorState is type LiquidValidator with state added to return to query results. */
export interface LiquidValidatorStateAmino {
  /** operator_address defines the address of the validator's operator; bech encoded in JSON. */
  operator_address: string;
  /** weight specifies the weight for liquid staking, unstaking amount */
  weight: string;
  /** status is the liquid validator status */
  status: ValidatorStatus;
  /** del_shares define the delegation shares of the validator */
  del_shares: string;
  /** liquid_tokens define the token amount worth of delegation shares of the validator (slashing applied amount) */
  liquid_tokens: string;
}
export interface LiquidValidatorStateAminoMsg {
  type: "/crescent.liquidstaking.v1beta1.LiquidValidatorState";
  value: LiquidValidatorStateAmino;
}
/** LiquidValidatorState is type LiquidValidator with state added to return to query results. */
export interface LiquidValidatorStateSDKType {
  operator_address: string;
  weight: string;
  status: ValidatorStatus;
  del_shares: string;
  liquid_tokens: string;
}
/**
 * NetAmountState is type for net amount raw data and mint rate, This is a value that depends on the several module
 * state every time, so it is used only for calculation and query and is not stored in kv.
 */
export interface NetAmountState {
  /** mint_rate is bTokenTotalSupply / NetAmount */
  mintRate: string;
  /** btoken_total_supply returns the total supply of btoken(liquid_bond_denom) */
  btokenTotalSupply: string;
  /**
   * net_amount is proxy account's native token balance + total liquid tokens + total remaining rewards + total
   * unbonding balance
   */
  netAmount: string;
  /** total_del_shares define the delegation shares of all liquid validators */
  totalDelShares: string;
  /**
   * total_liquid_tokens define the token amount worth of delegation shares of all liquid validator (slashing applied
   * amount)
   */
  totalLiquidTokens: string;
  /** total_remaining_rewards define the sum of remaining rewards of proxy account by all liquid validators */
  totalRemainingRewards: string;
  /**
   * total_unbonding_balance define the unbonding balance of proxy account by all liquid validator (slashing applied
   * amount)
   */
  totalUnbondingBalance: string;
  /** proxy_acc_balance define the balance of proxy account for the native token */
  proxyAccBalance: string;
}
export interface NetAmountStateProtoMsg {
  typeUrl: "/crescent.liquidstaking.v1beta1.NetAmountState";
  value: Uint8Array;
}
/**
 * NetAmountState is type for net amount raw data and mint rate, This is a value that depends on the several module
 * state every time, so it is used only for calculation and query and is not stored in kv.
 */
export interface NetAmountStateAmino {
  /** mint_rate is bTokenTotalSupply / NetAmount */
  mint_rate: string;
  /** btoken_total_supply returns the total supply of btoken(liquid_bond_denom) */
  btoken_total_supply: string;
  /**
   * net_amount is proxy account's native token balance + total liquid tokens + total remaining rewards + total
   * unbonding balance
   */
  net_amount: string;
  /** total_del_shares define the delegation shares of all liquid validators */
  total_del_shares: string;
  /**
   * total_liquid_tokens define the token amount worth of delegation shares of all liquid validator (slashing applied
   * amount)
   */
  total_liquid_tokens: string;
  /** total_remaining_rewards define the sum of remaining rewards of proxy account by all liquid validators */
  total_remaining_rewards: string;
  /**
   * total_unbonding_balance define the unbonding balance of proxy account by all liquid validator (slashing applied
   * amount)
   */
  total_unbonding_balance: string;
  /** proxy_acc_balance define the balance of proxy account for the native token */
  proxy_acc_balance: string;
}
export interface NetAmountStateAminoMsg {
  type: "/crescent.liquidstaking.v1beta1.NetAmountState";
  value: NetAmountStateAmino;
}
/**
 * NetAmountState is type for net amount raw data and mint rate, This is a value that depends on the several module
 * state every time, so it is used only for calculation and query and is not stored in kv.
 */
export interface NetAmountStateSDKType {
  mint_rate: string;
  btoken_total_supply: string;
  net_amount: string;
  total_del_shares: string;
  total_liquid_tokens: string;
  total_remaining_rewards: string;
  total_unbonding_balance: string;
  proxy_acc_balance: string;
}
/**
 * VotingPower is type for current voting power of the voter including staking module's voting power and liquid staking
 * module's voting power, It depends on the amount of delegation of staking module, the bonded state of the delegated
 * validator, the value of btoken(liquid_bond_denom), and the pool coin and farming position containing btoken..
 */
export interface VotingPower {
  /** voter defines the address of the voter; bech encoded in JSON. */
  voter: string;
  /** staking_voting_power return the voting power of staking that can be exercised. */
  stakingVotingPower: string;
  /** liquid_staking_voting_power return the voting power of liquid staking that can be exercised. */
  liquidStakingVotingPower: string;
  /**
   * validator_voting_power return the voting power of the validator if the voter is the validator operator that can be
   * exercised.
   */
  validatorVotingPower: string;
}
export interface VotingPowerProtoMsg {
  typeUrl: "/crescent.liquidstaking.v1beta1.VotingPower";
  value: Uint8Array;
}
/**
 * VotingPower is type for current voting power of the voter including staking module's voting power and liquid staking
 * module's voting power, It depends on the amount of delegation of staking module, the bonded state of the delegated
 * validator, the value of btoken(liquid_bond_denom), and the pool coin and farming position containing btoken..
 */
export interface VotingPowerAmino {
  /** voter defines the address of the voter; bech encoded in JSON. */
  voter: string;
  /** staking_voting_power return the voting power of staking that can be exercised. */
  staking_voting_power: string;
  /** liquid_staking_voting_power return the voting power of liquid staking that can be exercised. */
  liquid_staking_voting_power: string;
  /**
   * validator_voting_power return the voting power of the validator if the voter is the validator operator that can be
   * exercised.
   */
  validator_voting_power: string;
}
export interface VotingPowerAminoMsg {
  type: "/crescent.liquidstaking.v1beta1.VotingPower";
  value: VotingPowerAmino;
}
/**
 * VotingPower is type for current voting power of the voter including staking module's voting power and liquid staking
 * module's voting power, It depends on the amount of delegation of staking module, the bonded state of the delegated
 * validator, the value of btoken(liquid_bond_denom), and the pool coin and farming position containing btoken..
 */
export interface VotingPowerSDKType {
  voter: string;
  staking_voting_power: string;
  liquid_staking_voting_power: string;
  validator_voting_power: string;
}