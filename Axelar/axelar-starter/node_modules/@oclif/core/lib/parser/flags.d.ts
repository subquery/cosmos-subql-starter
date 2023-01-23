/// <reference types="node" />
import { URL } from 'url';
import { Definition, OptionFlag, BooleanFlag } from '../interfaces';
import { FlagParser, CustomOptionFlag } from '../interfaces/parser';
/**
 * Create a custom flag.
 *
 * @example
 * type Id = string
 * type IdOpts = { startsWith: string; length: number };
 *
 * export const myFlag = custom<Id, IdOpts>({
 *   parse: async (input, opts) => {
 *     if (input.startsWith(opts.startsWith) && input.length === opts.length) {
 *       return input
 *     }
 *
 *     throw new Error('Invalid id')
 *   },
 * })
 */
export declare function custom<T, P = Record<string, unknown>>(defaults: {
    parse: FlagParser<T, string, P>;
    multiple: true;
} & Partial<CustomOptionFlag<T, P, true>>): Definition<T, P>;
export declare function custom<T, P = Record<string, unknown>>(defaults: {
    parse: FlagParser<T, string, P>;
} & Partial<CustomOptionFlag<T, P>>): Definition<T, P>;
export declare function custom<T = string, P = Record<string, unknown>>(defaults: Partial<CustomOptionFlag<T, P>>): Definition<T, P>;
/**
 * @deprecated Use Flags.custom instead.
 */
export declare function build<T>(defaults: {
    parse: OptionFlag<T>['parse'];
} & Partial<OptionFlag<T>>): Definition<T>;
export declare function build(defaults: Partial<OptionFlag<string>>): Definition<string>;
export declare function boolean<T = boolean>(options?: Partial<BooleanFlag<T>>): BooleanFlag<T>;
export declare const integer: Definition<number, {
    min?: number | undefined;
    max?: number | undefined;
}>;
export declare const directory: Definition<string, {
    exists?: boolean | undefined;
}>;
export declare const file: Definition<string, {
    exists?: boolean | undefined;
}>;
/**
 * Initializes a string as a URL. Throws an error
 * if the string is not a valid URL.
 */
export declare const url: Definition<URL, Record<string, unknown>>;
export declare function option<T>(options: {
    parse: OptionFlag<T>['parse'];
} & Partial<CustomOptionFlag<T>>): OptionFlag<T | undefined>;
declare const stringFlag: Definition<string, Record<string, unknown>>;
export { stringFlag as string };
export declare const defaultFlags: {
    color: BooleanFlag<boolean>;
};
