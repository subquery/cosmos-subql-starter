// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {ProjectManifestV0_2_0} from '@subql/common';
import {NearCustomDatasource, NearDatasource, NearDatasourceKind, NearRuntimeDatasource} from '@subql/types-near';

// export interface NearMappingV0_2_0<F, T extends NearRuntimeHandler> extends BaseMapping<T> {
//   file: string;
// }

export type RuntimeDataSourceV0_2_0 = NearRuntimeDatasource;
export type CustomDatasourceV0_2_0 = NearCustomDatasource;

export type NearProjectManifestV0_2_0 = ProjectManifestV0_2_0<NearDatasource>;

export function isDatasourceV0_2_0(
  dataSource: NearDatasource
): dataSource is RuntimeDataSourceV0_2_0 | CustomDatasourceV0_2_0 {
  return !!(dataSource as RuntimeDataSourceV0_2_0).mapping.file;
}

export function isRuntimeDataSourceV0_2_0(dataSource: NearDatasource): dataSource is RuntimeDataSourceV0_2_0 {
  return dataSource.kind === NearDatasourceKind.Runtime && isDatasourceV0_2_0(dataSource);
}
