import * as args from './args';
import * as flags from './flags';
import { Input, ParserOutput, OutputFlags, FlagOutput } from '../interfaces';
export { args };
export { flags };
export { flagUsages } from './help';
export declare function parse<TFlags extends OutputFlags<any>, GFlags extends FlagOutput, TArgs extends {
    [name: string]: string;
}>(argv: string[], options: Input<TFlags, GFlags>): Promise<ParserOutput<TFlags, GFlags, TArgs>>;
export { boolean, integer, url, directory, file, string, build, option, custom } from './flags';
