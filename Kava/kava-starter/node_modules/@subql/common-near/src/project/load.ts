// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {getManifestPath, loadFromJsonOrYaml} from '@subql/common';
// import {NodeVM, VMScript} from 'vm2';
import {NearProjectManifestVersioned, VersionedProjectManifest} from './versioned';

export function parseNearProjectManifest(raw: unknown): NearProjectManifestVersioned {
  const projectManifest = new NearProjectManifestVersioned(raw as VersionedProjectManifest);
  projectManifest.validate();
  return projectManifest;
}

export function loadNearProjectManifest(file: string): NearProjectManifestVersioned {
  const doc = loadFromJsonOrYaml(getManifestPath(file));
  const projectManifest = new NearProjectManifestVersioned(doc as VersionedProjectManifest);
  projectManifest.validate();
  return projectManifest;
}
