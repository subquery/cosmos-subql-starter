import { ParserInput, ParserOutput } from '../interfaces';
export declare function validate(parse: {
    input: ParserInput;
    output: ParserOutput;
}): Promise<void>;
