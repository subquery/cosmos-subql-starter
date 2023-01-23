import { OptionFlag, BooleanFlag, EnumFlagOptions, Default } from './interfaces';
export { boolean, integer, url, directory, file, string, build, option, custom } from './parser';
export declare function _enum<T = string>(opts: EnumFlagOptions<T, true> & {
    multiple: true;
} & ({
    required: true;
} | {
    default: Default<T[]>;
})): OptionFlag<T[]>;
export declare function _enum<T = string>(opts: EnumFlagOptions<T, true> & {
    multiple: true;
}): OptionFlag<T[] | undefined>;
export declare function _enum<T = string>(opts: EnumFlagOptions<T> & ({
    required: true;
} | {
    default: Default<T>;
})): OptionFlag<T>;
export declare function _enum<T = string>(opts: EnumFlagOptions<T>): OptionFlag<T | undefined>;
export { _enum as enum };
export declare const version: (opts?: Partial<BooleanFlag<boolean>>) => BooleanFlag<void>;
export declare const help: (opts?: Partial<BooleanFlag<boolean>>) => BooleanFlag<void>;
