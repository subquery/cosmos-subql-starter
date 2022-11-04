import { BuildOptions, Model, Sequelize } from 'sequelize';
interface SubqueryModelAttributes extends SubqueryCreationAttributes {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
}
interface SubqueryCreationAttributes {
    name: string;
    dbSchema: string;
    version?: string;
    hash: string;
    nextBlockHeight?: number;
    network: string;
}
export interface SubqueryModel extends Model<SubqueryModelAttributes, SubqueryCreationAttributes>, SubqueryModelAttributes {
}
export declare type SubqueryRepo = typeof Model & {
    new (values?: unknown, options?: BuildOptions): SubqueryModel;
};
export declare function SubqueryFactory(sequelize: Sequelize): SubqueryRepo;
export {};
