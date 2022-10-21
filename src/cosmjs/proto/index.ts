import {GeneratedType} from "@cosmjs/proto-signing";
import {bankTypes} from "./bank";
import {distributionTypes} from "./distribution";
import {govTypes} from "./gov";
import {ibcTypes} from "./ibc";
import {stakingTypes} from "./staking";
import {wasmTypes} from "./wasm";

export * from "./bank";
export * from "./distribution";
export * from "./gov";
export * from "./ibc";
export * from "./staking";
export * from "./wasm";

type protoTuple = [string, GeneratedType];
type protoTuples = ReadonlyArray<protoTuple>;

const _types = [
  bankTypes,
  distributionTypes,
  govTypes,
  ibcTypes,
  stakingTypes,
  wasmTypes,
];

export const allModuleTypes: protoTuples =
  _types.reduce((acc, next): protoTuples => acc.concat(next), []);

export default allModuleTypes;
