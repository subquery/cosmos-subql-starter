import { Node } from "./Node";
import { ConditionalOutput } from "./ConditionalOutput";
import dprint from "dprint-node";
export declare type DPrintOptions = Exclude<Parameters<typeof dprint.format>[2], never>;
/** Options for `toString`, i.e. for the top-level, per-file output. */
export interface ToStringOpts {
    /** The intended file name of this code; used to know whether we can skip import statements that would be from our own file. */
    path?: string;
    /** Modules to use a CommonJS-in-ESM destructure fix for. */
    forceDefaultImport?: string[];
    /** Modules to use a CommonJS-in-ESM destructure fix for. */
    forceModuleImport?: string[];
    /** A top-of-file prefix, i.e. eslint disable. */
    prefix?: string;
    /** dprint config settings. */
    dprintOptions?: DPrintOptions;
    /** Whether to format the source or not. */
    format?: boolean;
    /** optional importMappings */
    importMappings?: {
        [key: string]: string;
    };
}
export declare class Code extends Node {
    private literals;
    private placeholders;
    trim: boolean;
    private oneline;
    private code;
    private codeWithImports;
    constructor(literals: TemplateStringsArray, placeholders: any[]);
    /** Returns the formatted code, with imports. */
    toString(opts?: ToStringOpts): string;
    asOneline(): Code;
    get childNodes(): unknown[];
    /**
     * Returns the unformatted, import-less code.
     *
     * This is an internal API, see `toString` for the public API.
     */
    toCodeString(used: ConditionalOutput[]): string;
    private deepFindAll;
    private deepReplaceNamedImports;
    private generateCode;
    private generateCodeWithImports;
}
export declare function deepGenerate(used: ConditionalOutput[], object: unknown): string;
/**
 * Represents a symbol defined in the current file.
 *
 * We use this to know if a symbol imported from a different file is going to
 * have a namespace collision.
 */
export declare class Def extends Node {
    symbol: string;
    constructor(symbol: string);
    toCodeString(): string;
    /** Any potentially string/SymbolSpec/Code nested nodes within us. */
    get childNodes(): Node[];
}
