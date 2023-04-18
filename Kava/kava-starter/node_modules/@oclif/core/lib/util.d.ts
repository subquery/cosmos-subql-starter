import { ArgInput } from './interfaces';
export declare function compact<T>(a: (T | undefined)[]): T[];
export declare function uniqBy<T>(arr: T[], fn: (cur: T) => any): T[];
type SortTypes = string | number | undefined | boolean;
export declare function sortBy<T>(arr: T[], fn: (i: T) => SortTypes | SortTypes[]): T[];
export declare function castArray<T>(input?: T | T[]): T[];
export declare function isProd(): boolean;
export declare function maxBy<T>(arr: T[], fn: (i: T) => number): T | undefined;
export declare function sumBy<T>(arr: T[], fn: (i: T) => number): number;
export declare function capitalize(s: string): string;
/**
 * Ensure that the args are in an array instead of an object. This is required to ensure
 * forwards compatibility with the new arg format in v2.
 *
 * @param args The args to ensure are in an array
 * @returns ArgInput
 */
export declare function ensureArgArray(args?: ArgInput | {
    [name: string]: any;
}): ArgInput;
export {};
