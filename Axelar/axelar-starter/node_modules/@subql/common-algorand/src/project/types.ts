// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {IProjectManifest, ProjectNetworkConfig} from '@subql/common';
import {AlgorandDataSource} from '@subql/types-algorand';

// All of these used to be redefined in this file, re-exporting for simplicity
export {
  AlgorandRuntimeHandler,
  AlgorandCustomHandler,
  AlgorandHandler,
  AlgorandHandlerKind,
  AlgorandDataSource as AlgorandDataSource,
  AlgorandCustomDataSource as AlgorandCustomDataSource,
  AlgorandBlockFilter,
  AlgorandDataSourceProcessor,
  AlgorandRuntimeHandlerFilter,
  AlgorandDataSourceKind,
  RuntimeHandlerInputMap as AlgorandRuntimeHandlerInputMap,
} from '@subql/types-algorand';

export type IAlgorandProjectManifest = IProjectManifest<AlgorandDataSource>;
export type TokenHeader = Record<string, string>;

export interface AlgorandProjectNetworkConfig extends ProjectNetworkConfig {
  genesisHash?: string;
  chainId?: string;
  apiKey?: string | TokenHeader;
}
