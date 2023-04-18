// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {
  BaseMapping,
  NodeSpec,
  ProjectManifestBaseImpl,
  QuerySpec,
  RunnerQueryBaseModel,
  RunnerSpecs,
  SemverVersionValidator,
} from '@subql/common';
import {AlgorandCustomDataSource} from '@subql/types-algorand';
import {plainToClass, Transform, Type} from 'class-transformer';
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
import yaml from 'js-yaml';
import {CustomDataSourceBase, RuntimeDataSourceBase} from '../../models';
import {TokenHeader} from '../../types';
import {IsStringOrObject} from '../../validation/is-string-or-object.validation';
import {
  CustomDataSourceTemplate,
  CustomDataSourceV1_0_0,
  ProjectManifestV1_0_0,
  RuntimeDataSourceTemplate,
  RuntimeDataSourceV1_0_0,
} from './types';

const ALGORAND_NODE_NAME = `@subql/node-algorand`;

export class AlgorandRunnerNodeImpl implements NodeSpec {
  @Equals(ALGORAND_NODE_NAME, {message: `Runner algorand node name incorrect, suppose be '${ALGORAND_NODE_NAME}'`})
  name: string;

  @IsString()
  @Validate(SemverVersionValidator)
  version: string;
}

export class AlgorandRunnerSpecsImpl implements RunnerSpecs {
  @IsObject()
  @ValidateNested()
  @Type(() => AlgorandRunnerNodeImpl)
  node: NodeSpec;

  @IsObject()
  @ValidateNested()
  @Type(() => RunnerQueryBaseModel)
  query: QuerySpec;
}

export class FileType {
  @IsString()
  file: string;
}

export class ProjectNetworkDeploymentV1_0_0 {
  @IsString()
  chainId: string;
  @IsOptional()
  @IsArray()
  bypassBlocks?: (number | string)[];
}

export class ProjectNetworkV1_0_0 extends ProjectNetworkDeploymentV1_0_0 {
  @IsString()
  @IsNotEmpty()
  endpoint: string;

  @IsString()
  @IsOptional()
  dictionary?: string;

  @IsString()
  @IsOptional()
  genesisHash?: string;

  @IsStringOrObject()
  @IsOptional()
  apiKey: string | TokenHeader;
}

function validateObject(object: any, errorMessage = 'failed to validate object.'): void {
  const errors = validateSync(object, {whitelist: true, forbidNonWhitelisted: true});
  if (errors?.length) {
    // TODO: print error details
    const errorMsgs = errors.map((e) => e.toString()).join('\n');
    throw new Error(`${errorMessage}\n${errorMsgs}`);
  }
}

export class AlgorandRuntimeDataSourceV1_0_0Impl extends RuntimeDataSourceBase implements RuntimeDataSourceV1_0_0 {
  validate(): void {
    return validateObject(this, 'failed to validate runtime datasource.');
  }
}

export class AlgorandCustomDataSourceV1_0_0Impl<
    K extends string = string,
    M extends BaseMapping<any, any> = BaseMapping<Record<string, unknown>, any>
  >
  extends CustomDataSourceBase<K, M>
  implements AlgorandCustomDataSource<K, M>
{
  validate(): void {
    return validateObject(this, 'failed to validate custom datasource.');
  }
}

export class RuntimeDataSourceTemplateImpl
  extends AlgorandRuntimeDataSourceV1_0_0Impl
  implements RuntimeDataSourceTemplate
{
  @IsString()
  name: string;
}

export class CustomDataSourceTemplateImpl
  extends AlgorandCustomDataSourceV1_0_0Impl
  implements CustomDataSourceTemplate
{
  @IsString()
  name: string;
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
  @Type(() => AlgorandRunnerSpecsImpl)
  runner: RunnerSpecs;

  @ValidateNested()
  @Type(() => FileType)
  schema: FileType;

  @IsArray()
  @ValidateNested()
  @Type(() => AlgorandCustomDataSourceV1_0_0Impl, {
    discriminator: {
      property: 'kind',
      subTypes: [{value: AlgorandRuntimeDataSourceV1_0_0Impl, name: 'algorand/Runtime'}],
    },
    keepDiscriminatorProperty: true,
  })
  dataSources: (RuntimeDataSourceV1_0_0 | CustomDataSourceV1_0_0)[];
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CustomDataSourceTemplateImpl, {
    discriminator: {
      property: 'kind',
      subTypes: [{value: RuntimeDataSourceTemplateImpl, name: 'algorand/Runtime'}],
    },
    keepDiscriminatorProperty: true,
  })
  templates?: (RuntimeDataSourceTemplate | CustomDataSourceTemplate)[];
}

export class ProjectManifestV1_0_0Impl
  extends ProjectManifestBaseImpl<DeploymentV1_0_0>
  implements ProjectManifestV1_0_0
{
  @Equals('1.0.0')
  specVersion: string;

  @IsString()
  name: string;

  @IsString()
  version: string;

  @IsObject()
  @ValidateNested()
  @Type(() => ProjectNetworkV1_0_0)
  network: ProjectNetworkV1_0_0;

  @ValidateNested()
  @Type(() => FileType)
  schema: FileType;

  @IsArray()
  @ValidateNested()
  @Type(() => AlgorandCustomDataSourceV1_0_0Impl, {
    discriminator: {
      property: 'kind',
      subTypes: [{value: AlgorandRuntimeDataSourceV1_0_0Impl, name: 'algorand/Runtime'}],
    },
    keepDiscriminatorProperty: true,
  })
  dataSources: (RuntimeDataSourceV1_0_0 | CustomDataSourceV1_0_0)[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CustomDataSourceTemplateImpl, {
    discriminator: {
      property: 'kind',
      subTypes: [{value: RuntimeDataSourceTemplateImpl, name: 'algorand/Runtime'}],
    },
    keepDiscriminatorProperty: true,
  })
  templates?: (RuntimeDataSourceTemplate | CustomDataSourceTemplate)[];

  @IsObject()
  @ValidateNested()
  @Type(() => AlgorandRunnerSpecsImpl)
  runner: RunnerSpecs;

  private _deployment: DeploymentV1_0_0;

  toDeployment(): string {
    return yaml.dump(this._deployment, {
      sortKeys: true,
      condenseFlow: true,
    });
  }

  get deployment(): DeploymentV1_0_0 {
    if (!this._deployment) {
      this._deployment = plainToClass(DeploymentV1_0_0, this);
      validateSync(this._deployment, {whitelist: true});
    }
    return this._deployment;
  }

  validate(): void {
    const errors = validateSync(this.deployment, {whitelist: true, forbidNonWhitelisted: true});
    if (errors?.length) {
      // TODO: print error details
      const errorMsgs = errors.map((e) => e.toString()).join('\n');
      throw new Error(`failed to parse project.yaml.\n${errorMsgs}`);
    }
  }
}
