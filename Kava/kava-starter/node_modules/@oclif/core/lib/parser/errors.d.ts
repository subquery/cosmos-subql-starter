import { CLIError } from '../errors';
import { ParserArg, CLIParseErrorOptions, OptionFlag, Flag, BooleanFlag } from '../interfaces';
export { CLIError } from '../errors';
export type Validation = {
    name: string;
    status: 'success' | 'failed';
    validationFn: string;
    reason?: string;
};
export declare class CLIParseError extends CLIError {
    parse: CLIParseErrorOptions['parse'];
    constructor(options: CLIParseErrorOptions & {
        message: string;
    });
}
export declare class InvalidArgsSpecError extends CLIParseError {
    args: ParserArg<any>[];
    constructor({ args, parse }: CLIParseErrorOptions & {
        args: ParserArg<any>[];
    });
}
export declare class RequiredArgsError extends CLIParseError {
    args: ParserArg<any>[];
    constructor({ args, parse }: CLIParseErrorOptions & {
        args: ParserArg<any>[];
    });
}
export declare class RequiredFlagError extends CLIParseError {
    flag: Flag<any>;
    constructor({ flag, parse }: CLIParseErrorOptions & {
        flag: Flag<any>;
    });
}
export declare class UnexpectedArgsError extends CLIParseError {
    args: string[];
    constructor({ parse, args }: CLIParseErrorOptions & {
        args: string[];
    });
}
export declare class FlagInvalidOptionError extends CLIParseError {
    constructor(flag: OptionFlag<any>, input: string);
}
export declare class FailedFlagParseError extends CLIParseError {
    constructor(flag: BooleanFlag<any> | OptionFlag<any>, errMsg: string);
}
export declare class ArgInvalidOptionError extends CLIParseError {
    constructor(arg: ParserArg<any>, input: string);
}
export declare class FailedFlagValidationError extends CLIParseError {
    constructor({ parse, failed }: CLIParseErrorOptions & {
        failed: Validation[];
    });
}
