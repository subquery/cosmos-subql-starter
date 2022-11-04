import { BuildOptions, Model, Sequelize } from 'sequelize';
export interface Metadata {
    key: string;
    value: number | string | boolean;
}
export interface MetadataModel extends Model<Metadata>, Metadata {
}
export declare type MetadataRepo = typeof Model & {
    new (values?: unknown, options?: BuildOptions): MetadataModel;
};
export declare function MetadataFactory(sequelize: Sequelize, schema: string): MetadataRepo;
