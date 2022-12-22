export declare function pickBy<T extends {
    [s: string]: T[keyof T];
} | ArrayLike<T[keyof T]>>(obj: T, fn: (i: T[keyof T]) => boolean): Partial<T>;
export declare function maxBy<T>(arr: T[], fn: (i: T) => number): T | undefined;
type SortTypes = string | number | undefined | boolean;
export declare function sortBy<T>(arr: T[], fn: (i: T) => SortTypes | SortTypes[]): T[];
export {};
