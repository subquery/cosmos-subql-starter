// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {
  SecondLayerHandlerProcessor,
  NearCustomDatasource,
  NearDatasource,
  NearDatasourceKind,
  NearHandlerKind,
  NearNetworkFilter,
  NearRuntimeDatasource,
} from '@subql/types-near';

export function isBlockHandlerProcessor<T extends NearNetworkFilter, E>(
  hp: SecondLayerHandlerProcessor<NearHandlerKind, T, unknown>
): hp is SecondLayerHandlerProcessor<NearHandlerKind.Block, T, E> {
  return hp.baseHandlerKind === NearHandlerKind.Block;
}

export function isTransactionHandlerProcessor<T extends NearNetworkFilter, E>(
  hp: SecondLayerHandlerProcessor<NearHandlerKind, T, unknown>
): hp is SecondLayerHandlerProcessor<NearHandlerKind.Transaction, T, E> {
  return hp.baseHandlerKind === NearHandlerKind.Transaction;
}

export function isActionHandlerProcessor<T extends NearNetworkFilter, E>(
  hp: SecondLayerHandlerProcessor<NearHandlerKind, T, unknown>
): hp is SecondLayerHandlerProcessor<NearHandlerKind.Action, T, E> {
  return hp.baseHandlerKind === NearHandlerKind.Action;
}

export function isReceiptHandlerProcessor<T extends NearNetworkFilter, E>(
  hp: SecondLayerHandlerProcessor<NearHandlerKind, T, unknown>
): hp is SecondLayerHandlerProcessor<NearHandlerKind.Receipt, T, E> {
  return hp.baseHandlerKind === NearHandlerKind.Receipt;
}

export function isCustomDs<F extends NearNetworkFilter>(ds: NearDatasource): ds is NearCustomDatasource<string, F> {
  return ds.kind !== NearDatasourceKind.Runtime && !!(ds as NearCustomDatasource<string, F>).processor;
}

export function isRuntimeDs(ds: NearDatasource): ds is NearRuntimeDatasource {
  return ds.kind === NearDatasourceKind.Runtime;
}
