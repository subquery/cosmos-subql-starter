// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {BaseMapping, FileReference} from '@subql/common';
import {
  CustomDataSourceAsset as AlgorandCustomDataSourceAsset,
  AlgorandBlockFilter,
  AlgorandBlockHandler,
  AlgorandCustomHandler,
  AlgorandDataSourceKind,
  AlgorandHandlerKind,
  AlgorandRuntimeDataSource,
  AlgorandRuntimeHandler,
  AlgorandRuntimeHandlerFilter,
  AlgorandCustomDataSource,
  AlgorandTransactionHandler,
  AlgorandTransactionFilter,
} from '@subql/types-algorand';
import {TransactionType} from 'algosdk';
import {plainToClass, Transform, Type} from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsObject,
  ValidateNested,
  IsNumber,
  ValidateIf,
} from 'class-validator';

export class BlockFilter implements AlgorandBlockFilter {
  @IsOptional()
  @IsInt()
  modulo?: number;
  @IsOptional()
  @IsString()
  timestamp?: string;
}

export class TransactionFilter implements AlgorandTransactionFilter {
  @IsEnum(TransactionType)
  @IsOptional()
  txType?: TransactionType;

  @IsString()
  @IsOptional()
  @ValidateIf((o: TransactionFilter) => {
    return o.txType === TransactionType.pay || o.txType === TransactionType.axfer || o.txType === TransactionType.appl;
  })
  sender?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o: TransactionFilter) => {
    return o.txType === TransactionType.pay || o.txType === TransactionType.axfer;
  })
  receiver?: string;

  @IsBoolean()
  @IsOptional()
  @ValidateIf((o: TransactionFilter) => o.txType === TransactionType.keyreg)
  nonParticipant?: boolean;

  @IsNumber()
  @IsOptional()
  @ValidateIf((o: TransactionFilter) => {
    return o.txType === TransactionType.acfg || o.txType === TransactionType.axfer || o.txType === TransactionType.afrz;
  })
  assetId?: number;

  @IsBoolean()
  @IsOptional()
  @ValidateIf((o: TransactionFilter) => o.txType === TransactionType.afrz)
  newFreezeStatus?: boolean;

  @IsString()
  @IsOptional()
  @ValidateIf((o: TransactionFilter) => o.txType === TransactionType.afrz)
  address?: string;

  @IsNumber()
  @IsOptional()
  @ValidateIf((o: TransactionFilter) => o.txType === TransactionType.appl)
  applicationId?: number;
}

export class BlockHandler implements AlgorandBlockHandler {
  @IsEnum(AlgorandHandlerKind, {groups: [AlgorandHandlerKind.Block]})
  kind: AlgorandHandlerKind.Block;

  @IsString()
  handler: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => BlockFilter)
  filter?: AlgorandBlockFilter;
}

export class TransactionHandler implements AlgorandTransactionHandler {
  @IsOptional()
  @ValidateNested()
  @Type(() => TransactionFilter)
  filter?: AlgorandTransactionFilter;

  @IsEnum(AlgorandHandlerKind, {groups: [AlgorandHandlerKind.Block]})
  kind: AlgorandHandlerKind.Transaction;

  @IsString()
  handler: string;
}

export class CustomHandler implements AlgorandCustomHandler {
  @IsString()
  kind: string;

  @IsString()
  handler: string;

  @IsObject()
  @IsOptional()
  filter?: Record<string, unknown>;
}

export class RuntimeMapping implements BaseMapping<AlgorandRuntimeHandlerFilter, AlgorandRuntimeHandler> {
  @Transform((params) => {
    const handlers: AlgorandRuntimeHandler[] = params.value;
    return handlers.map((handler) => {
      switch (handler.kind) {
        case AlgorandHandlerKind.Block:
          return plainToClass(BlockHandler, handler);
        case AlgorandHandlerKind.Transaction:
          return plainToClass(TransactionHandler, handler);
        default:
          throw new Error(`handler ${(handler as any).kind} not supported`);
      }
    });
  })
  @IsArray()
  @ValidateNested()
  handlers: AlgorandRuntimeHandler[];

  @IsString()
  file: string;
}

export class CustomMapping implements BaseMapping<Record<string, unknown>, AlgorandCustomHandler> {
  @IsArray()
  @Type(() => CustomHandler)
  @ValidateNested()
  handlers: CustomHandler[];

  @IsString()
  file: string;
}

export class RuntimeDataSourceBase implements AlgorandRuntimeDataSource {
  @IsEnum(AlgorandDataSourceKind, {groups: [AlgorandDataSourceKind.Runtime]})
  kind: AlgorandDataSourceKind.Runtime;

  @Type(() => RuntimeMapping)
  @ValidateNested()
  mapping: RuntimeMapping;

  @IsOptional()
  @IsInt()
  startBlock?: number;
}

export class FileReferenceImpl implements FileReference {
  @IsString()
  file: string;
}

export class CustomDataSourceBase<K extends string, M extends CustomMapping, O = any>
  implements AlgorandCustomDataSource<K, M, O>
{
  @IsString()
  kind: K;

  @Type(() => CustomMapping)
  @ValidateNested()
  mapping: M;

  @IsOptional()
  @IsInt()
  startBlock?: number;

  @Type(() => FileReferenceImpl)
  @ValidateNested({each: true})
  assets: Map<string, AlgorandCustomDataSourceAsset>;

  @Type(() => FileReferenceImpl)
  @IsObject()
  processor: FileReference;
}
