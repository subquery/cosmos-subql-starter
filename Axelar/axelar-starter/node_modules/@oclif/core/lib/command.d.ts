import { Config } from './config';
import * as Interfaces from './interfaces';
import { PrettyPrintableError } from './errors';
import { Deprecation } from './interfaces/parser';
/**
 * An abstract class which acts as the base for each command
 * in your project.
 */
export default abstract class Command {
    argv: string[];
    config: Config;
    static _base: string;
    /** A command ID, used mostly in error or verbose reporting. */
    static id: string;
    /**
     * The tweet-sized description for your class, used in a parent-commands
     * sub-command listing and as the header for the command help.
     */
    static summary?: string;
    /**
     * A full description of how to use the command.
     *
     * If no summary, the first line of the description will be used as the summary.
     */
    static description: string | undefined;
    /** Hide the command from help */
    static hidden: boolean;
    /** Mark the command as a given state (e.g. beta or deprecated) in help */
    static state?: 'beta' | 'deprecated' | string;
    static deprecationOptions?: Deprecation;
    /**
     * Emit deprecation warning when a command alias is used
     */
    static deprecateAliases?: boolean;
    /**
     * An override string (or strings) for the default usage documentation.
     */
    static usage: string | string[] | undefined;
    static help: string | undefined;
    /** An array of aliases for this command. */
    static aliases: string[];
    /** When set to false, allows a variable amount of arguments */
    static strict: boolean;
    static parse: boolean;
    /** An order-dependent array of arguments for the command */
    static args?: Interfaces.ArgInput;
    static plugin: Interfaces.Plugin | undefined;
    /**
     * An array of examples to show at the end of the command's help.
     *
     * IF only a string is provided, it will try to look for a line that starts
     * with the cmd.bin as the example command and the rest as the description.
     * If found, the command will be formatted appropriately.
     *
     * ```
     * EXAMPLES:
     *   A description of a particular use case.
     *
     *     $ <%= config.bin => command flags
     * ```
     */
    static examples: Interfaces.Example[];
    static parserOptions: {};
    static _enableJsonFlag: boolean;
    static get enableJsonFlag(): boolean;
    static set enableJsonFlag(value: boolean);
    /**
     * instantiate and run the command
     * @param {Interfaces.Command.Class} this Class
     * @param {string[]} argv argv
     * @param {Interfaces.LoadOptions} opts options
     */
    static run: Interfaces.Command.Class['run'];
    protected static _globalFlags: Interfaces.FlagInput;
    static get globalFlags(): Interfaces.FlagInput;
    static set globalFlags(flags: Interfaces.FlagInput);
    /** A hash of flags for the command */
    protected static _flags: Interfaces.FlagInput;
    static get flags(): Interfaces.FlagInput;
    static set flags(flags: Interfaces.FlagInput);
    id: string | undefined;
    protected debug: (...args: any[]) => void;
    constructor(argv: string[], config: Config);
    get ctor(): typeof Command;
    _run<T>(): Promise<T | undefined>;
    exit(code?: number): void;
    warn(input: string | Error): string | Error;
    error(input: string | Error, options: {
        code?: string;
        exit: false;
    } & PrettyPrintableError): void;
    error(input: string | Error, options?: {
        code?: string;
        exit?: number;
    } & PrettyPrintableError): never;
    log(message?: string, ...args: any[]): void;
    logToStderr(message?: string, ...args: any[]): void;
    jsonEnabled(): boolean;
    /**
     * actual command run code goes here
     */
    abstract run(): PromiseLike<any>;
    protected init(): Promise<any>;
    protected warnIfFlagDeprecated(flags: Record<string, unknown>): void;
    protected warnIfCommandDeprecated(): void;
    protected parse<F extends Interfaces.FlagOutput, G extends Interfaces.FlagOutput, A extends {
        [name: string]: any;
    }>(options?: Interfaces.Input<F, G>, argv?: string[]): Promise<Interfaces.ParserOutput<F, G, A>>;
    protected catch(err: Interfaces.CommandError): Promise<any>;
    protected finally(_: Error | undefined): Promise<any>;
    protected toSuccessJson(result: unknown): any;
    protected toErrorJson(err: unknown): any;
}
