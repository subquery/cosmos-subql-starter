// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {BaseMapping, FileReference} from '@subql/common';
import {
  CustomDataSourceAsset as NearCustomDataSourceAsset,
  NearBlockFilter,
  NearBlockHandler,
  NearTransactionHandler,
  NearActionFilter,
  NearCustomHandler,
  NearDatasourceKind,
  NearTransactionFilter,
  NearActionHandler,
  NearHandlerKind,
  NearNetworkFilter,
  NearRuntimeDatasource,
  NearRuntimeHandler,
  NearRuntimeHandlerFilter,
  NearCustomDatasource,
  ActionType,
  NearReceiptHandler,
  NearReceiptFilter,
} from '@subql/types-near';
import BN from 'bn.js';
import {plainToClass, Transform, Type} from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsObject,
  ValidateNested,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  Min,
  ValidateIf,
} from 'class-validator';

export class BlockFilter implements NearBlockFilter {
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(2)
  specVersion?: [number, number];
  @IsOptional()
  @IsInt()
  modulo?: number;
  @IsOptional()
  @IsString()
  timestamp?: string;
}

export class TransactionFilter extends BlockFilter implements NearTransactionFilter {
  @IsOptional()
  @IsString()
  sender?: string;
  @IsOptional()
  @IsString()
  receiver?: string;
}

export function IsActionType(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isActionType',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return Object.values(ActionType).includes(value);
        },
      },
    });
  };
}

export class ReceiptFilter extends TransactionFilter implements NearReceiptFilter {
  @IsOptional()
  @IsString()
  signer?: string;
}

export class ActionFilter extends ReceiptFilter implements NearActionFilter {
  @IsString()
  @IsActionType()
  type: ActionType;

  @IsString()
  @IsOptional()
  @ValidateIf((o: ActionFilter) => {
    return o.type === ActionType.FunctionCall;
  })
  methodName?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o: ActionFilter) => {
    return o.type === ActionType.FunctionCall;
  })
  args?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o: ActionFilter) => {
    return o.type === ActionType.Stake || o.type === ActionType.AddKey || o.type === ActionType.DeleteKey;
  })
  publicKey?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o: ActionFilter) => {
    return o.type === ActionType.AddKey;
  })
  accessKey?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o: ActionFilter) => {
    return o.type === ActionType.DeleteAccount;
  })
  beneficiaryId?: string;
}

export class BlockHandler implements NearBlockHandler {
  @IsOptional()
  @ValidateNested()
  @Type(() => BlockFilter)
  filter?: NearBlockFilter;
  @IsEnum(NearHandlerKind, {groups: [NearHandlerKind.Block]})
  kind: NearHandlerKind.Block;
  @IsString()
  handler: string;
}

export class TransactionHandler implements NearTransactionHandler {
  @IsOptional()
  @ValidateNested()
  @Type(() => TransactionFilter)
  filter?: NearTransactionFilter;
  @IsEnum(NearHandlerKind, {groups: [NearHandlerKind.Transaction]})
  kind: NearHandlerKind.Transaction;
  @IsString()
  handler: string;
}

export class ActionHandler implements NearActionHandler {
  @IsOptional()
  @ValidateNested()
  @Type(() => ActionFilter)
  filter?: NearActionFilter;
  @IsEnum(NearHandlerKind, {groups: [NearHandlerKind.Action]})
  kind: NearHandlerKind.Action;
  @IsString()
  handler: string;
}

export class ReceiptHandler implements NearReceiptHandler {
  @IsOptional()
  @ValidateNested()
  @Type(() => ReceiptFilter)
  filter?: NearReceiptFilter;
  @IsEnum(NearHandlerKind, {groups: [NearHandlerKind.Receipt]})
  kind: NearHandlerKind.Receipt;
  @IsString()
  handler: string;
}

export class CustomHandler implements NearCustomHandler {
  @IsString()
  kind: string;
  @IsString()
  handler: string;
  @IsObject()
  @IsOptional()
  filter?: Record<string, unknown>;
}

export class RuntimeMapping implements BaseMapping<NearRuntimeHandlerFilter, NearRuntimeHandler> {
  @Transform((params) => {
    const handlers: NearRuntimeHandler[] = params.value;
    return handlers.map((handler) => {
      switch (handler.kind) {
        case NearHandlerKind.Receipt:
          return plainToClass(ReceiptHandler, handler);
        case NearHandlerKind.Action:
          return plainToClass(ActionHandler, handler);
        case NearHandlerKind.Transaction:
          return plainToClass(TransactionHandler, handler);
        case NearHandlerKind.Block:
          return plainToClass(BlockHandler, handler);
        default:
          throw new Error(`handler ${(handler as any).kind} not supported`);
      }
    });
  })
  @IsArray()
  @ValidateNested()
  handlers: NearRuntimeHandler[];
  @IsString()
  file: string;
}

export class CustomMapping implements BaseMapping<Record<string, unknown>, NearCustomHandler> {
  @IsArray()
  @Type(() => CustomHandler)
  @ValidateNested()
  handlers: CustomHandler[];
  @IsString()
  file: string;
}

export class SubqlNetworkFilterImpl implements NearNetworkFilter {
  @IsString()
  @IsOptional()
  specName?: string;
}

export class RuntimeDataSourceBase implements NearRuntimeDatasource {
  @IsEnum(NearDatasourceKind, {groups: [NearDatasourceKind.Runtime]})
  kind: NearDatasourceKind.Runtime;
  @Type(() => RuntimeMapping)
  @ValidateNested()
  mapping: RuntimeMapping;
  //must be greater than genesis block
  @Min(9820210)
  @IsOptional()
  @IsInt()
  startBlock?: number;
  @IsOptional()
  @ValidateNested()
  @Type(() => SubqlNetworkFilterImpl)
  filter?: NearNetworkFilter;
}

export class FileReferenceImpl implements FileReference {
  @IsString()
  file: string;
}

export class CustomDataSourceBase<K extends string, T extends NearNetworkFilter, M extends CustomMapping, O = any>
  implements NearCustomDatasource<K, T, M, O>
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
  assets: Map<string, NearCustomDataSourceAsset>;
  @Type(() => FileReferenceImpl)
  @IsObject()
  processor: FileReference;
  @IsOptional()
  @IsObject()
  filter?: T;
}
