// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {
  NodeSpec,
  ProjectManifestBaseImpl,
  QuerySpec,
  RunnerQueryBaseModel,
  RunnerSpecs,
  SemverVersionValidator,
} from '@subql/common';
import {NearRuntimeDatasource} from '@subql/types-near';
import {plainToClass, Transform, TransformFnParams, Type} from 'class-transformer';
import {
  Equals,
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
  validateSync,
} from 'class-validator';
import {
  CustomDatasourceV0_2_0,
  FileType,
  RuntimeDataSourceV0_2_0,
  NearCustomDataSourceV0_2_0Impl,
  NearRuntimeDataSourceV0_2_0Impl,
} from '../v0_2_0';
import {
  CustomDatasourceTemplate,
  CustomDatasourceTemplateImpl,
  RuntimeDatasourceTemplate,
  RuntimeDatasourceTemplateImpl,
} from '../v0_2_1';
import {NearProjectManifestV1_0_0} from './types';

const NEAR_NODE_NAME = `@subql/node-near`;

export class NearRunnerNodeImpl implements NodeSpec {
  @Equals(NEAR_NODE_NAME, {message: `Runner Near node name incorrect, suppose be '${NEAR_NODE_NAME}'`})
  name: string;
  @IsString()
  @Validate(SemverVersionValidator)
  // @Matches(RUNNER_REGEX,{message: 'runner version is not correct'})
  version: string;
}

export class NearRunnerSpecsImpl implements RunnerSpecs {
  @IsObject()
  @ValidateNested()
  @Type(() => NearRunnerNodeImpl)
  node: NodeSpec;
  @IsObject()
  @ValidateNested()
  @Type(() => RunnerQueryBaseModel)
  query: QuerySpec;
}

export class ProjectNetworkDeploymentV1_0_0 {
  @IsNotEmpty()
  @Transform(({value}: TransformFnParams) => value.trim())
  @IsString()
  chainId: string;
  @ValidateNested()
  @Type(() => FileType)
  @IsOptional()
  chaintypes?: FileType;
  @IsOptional()
  @IsArray()
  bypassBlocks?: (number | string)[];
}

export class ProjectNetworkV1_0_0 extends ProjectNetworkDeploymentV1_0_0 {
  @IsString()
  @IsOptional()
  endpoint?: string;
  @IsString()
  @IsOptional()
  dictionary?: string;
}

export class DeploymentV1_0_0 {
  @Transform((params) => {
    if (params.value.genesisHash && !params.value.chainId) {
      params.value.chainId = params.value.genesisHash;
    }
    return plainToClass(ProjectNetworkDeploymentV1_0_0, params.value);
  })
  @ValidateNested()
  @Type(() => ProjectNetworkDeploymentV1_0_0)
  network: ProjectNetworkDeploymentV1_0_0;
  @Equals('1.0.0')
  @IsString()
  specVersion: string;
  @IsObject()
  @ValidateNested()
  @Type(() => NearRunnerSpecsImpl)
  runner: RunnerSpecs;
  @ValidateNested()
  @Type(() => FileType)
  schema: FileType;
  @IsArray()
  @ValidateNested()
  @Type(() => NearCustomDataSourceV0_2_0Impl, {
    discriminator: {
      property: 'kind',
      subTypes: [{value: NearRuntimeDataSourceV0_2_0Impl, name: 'near/Runtime'}],
    },
    keepDiscriminatorProperty: true,
  })
  dataSources: (RuntimeDataSourceV0_2_0 | CustomDatasourceV0_2_0)[];
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CustomDatasourceTemplateImpl, {
    discriminator: {
      property: 'kind',
      subTypes: [{value: RuntimeDatasourceTemplateImpl, name: 'near/Runtime'}],
    },
    keepDiscriminatorProperty: true,
  })
  templates?: (RuntimeDatasourceTemplate | CustomDatasourceTemplate)[];
}

export class ProjectManifestV1_0_0Impl<D extends object = DeploymentV1_0_0>
  extends ProjectManifestBaseImpl<D>
  implements NearProjectManifestV1_0_0
{
  @Equals('1.0.0')
  specVersion: string;
  @Type(() => NearCustomDataSourceV0_2_0Impl, {
    discriminator: {
      property: 'kind',
      subTypes: [{value: NearRuntimeDataSourceV0_2_0Impl, name: 'near/Runtime'}],
    },
    keepDiscriminatorProperty: true,
  })
  dataSources: (NearRuntimeDatasource | CustomDatasourceV0_2_0)[];
  @Type(() => ProjectNetworkV1_0_0)
  network: ProjectNetworkV1_0_0;
  @IsString()
  name: string;
  @IsString()
  version: string;
  @ValidateNested()
  @Type(() => FileType)
  schema: FileType;
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CustomDatasourceTemplateImpl, {
    discriminator: {
      property: 'kind',
      subTypes: [{value: RuntimeDatasourceTemplateImpl, name: 'near/Runtime'}],
    },
    keepDiscriminatorProperty: true,
  })
  templates?: (RuntimeDatasourceTemplate | CustomDatasourceTemplate)[];
  @IsObject()
  @ValidateNested()
  @Type(() => NearRunnerSpecsImpl)
  runner: RunnerSpecs;
  protected _deployment: D;

  get deployment(): D {
    if (!this._deployment) {
      this._deployment = plainToClass(DeploymentV1_0_0, this) as unknown as D;
      validateSync(this._deployment, {whitelist: true});
    }
    return this._deployment;
  }
}
