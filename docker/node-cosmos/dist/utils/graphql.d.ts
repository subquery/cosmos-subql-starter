import { GraphQLModelsType } from '@subql/utils';
import { ModelAttributes } from 'sequelize';
export declare function modelsTypeToModelAttributes(modelType: GraphQLModelsType, enums: Map<string, string>): ModelAttributes;
