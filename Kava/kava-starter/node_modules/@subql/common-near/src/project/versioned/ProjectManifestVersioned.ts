// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {NearDatasource} from '@subql/types-near';
import {plainToClass} from 'class-transformer';
import {INearProjectManifest} from '../types';
import {ProjectManifestV0_0_1Impl, RuntimeDataSourceV0_0_1} from './v0_0_1';
import {ProjectManifestV0_2_0Impl} from './v0_2_0';
import {ProjectManifestV0_2_1Impl} from './v0_2_1';
import {ProjectManifestV0_3_0Impl} from './v0_3_0';
import {ProjectManifestV1_0_0Impl} from './v1_0_0';
export type VersionedProjectManifest = {specVersion: string};

const NEAR_SUPPORTED_VERSIONS = {
  '1.0.0': ProjectManifestV1_0_0Impl,
};

type Versions = keyof typeof NEAR_SUPPORTED_VERSIONS;

type ProjectManifestImpls = InstanceType<typeof NEAR_SUPPORTED_VERSIONS[Versions]>;

export function manifestIsV0_0_1(manifest: INearProjectManifest): manifest is ProjectManifestV0_0_1Impl {
  return manifest.specVersion === '0.0.1';
}

export function manifestIsV0_2_0(manifest: INearProjectManifest): manifest is ProjectManifestV0_2_0Impl {
  return manifest.specVersion === '0.2.0';
}

export function manifestIsV0_2_1(manifest: INearProjectManifest): manifest is ProjectManifestV0_2_1Impl {
  return manifest.specVersion === '0.2.1';
}

export function manifestIsV0_3_0(manifest: INearProjectManifest): manifest is ProjectManifestV0_3_0Impl {
  return manifest.specVersion === '0.3.0';
}

export function manifestIsV1_0_0(manifest: INearProjectManifest): manifest is ProjectManifestV1_0_0Impl {
  return manifest.specVersion === '1.0.0';
}

export class NearProjectManifestVersioned implements INearProjectManifest {
  private _impl: ProjectManifestImpls;

  constructor(projectManifest: VersionedProjectManifest) {
    const klass = NEAR_SUPPORTED_VERSIONS[projectManifest.specVersion as Versions];
    if (!klass) {
      throw new Error('specVersion not supported for project manifest file');
    }
    this._impl = plainToClass<ProjectManifestImpls, VersionedProjectManifest>(klass, projectManifest);
  }

  get asImpl(): ProjectManifestImpls {
    return this._impl;
  }

  get isV0_0_1(): boolean {
    return this.specVersion === '0.0.1';
  }

  get isV0_2_0(): boolean {
    return this.specVersion === '0.2.0';
  }

  get isV0_2_1(): boolean {
    return this.specVersion === '0.2.1';
  }

  get isV0_3_0(): boolean {
    return this.specVersion === '0.3.0';
  }

  get isV1_0_0(): boolean {
    return this.specVersion === '1.0.0';
  }

  get asV1_0_0(): ProjectManifestV1_0_0Impl {
    return this._impl as ProjectManifestV1_0_0Impl;
  }

  toDeployment(): string | undefined {
    return this._impl.toDeployment();
  }

  validate(): void {
    return this._impl.validate();
  }

  get dataSources(): (NearDatasource | RuntimeDataSourceV0_0_1)[] {
    return this._impl.dataSources;
  }

  get schema(): string {
    return this._impl.schema.file;
  }

  get specVersion(): string {
    return this._impl.specVersion;
  }

  get description(): string {
    return this._impl.description;
  }

  get repository(): string {
    return this._impl.repository;
  }
}
