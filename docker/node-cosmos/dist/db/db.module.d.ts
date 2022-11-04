import { DynamicModule } from '@nestjs/common';
export interface DbOption {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}
export declare class DbModule {
    static forRoot(option: DbOption): DynamicModule;
    static forFeature(models: string[]): DynamicModule;
}
