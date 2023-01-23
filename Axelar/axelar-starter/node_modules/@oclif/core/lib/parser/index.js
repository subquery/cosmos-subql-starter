"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.custom = exports.option = exports.build = exports.string = exports.file = exports.directory = exports.url = exports.integer = exports.boolean = exports.parse = exports.flagUsages = exports.flags = exports.args = void 0;
const args = require("./args");
exports.args = args;
const deps_1 = require("./deps");
const flags = require("./flags");
exports.flags = flags;
const parse_1 = require("./parse");
var help_1 = require("./help");
Object.defineProperty(exports, "flagUsages", { enumerable: true, get: function () { return help_1.flagUsages; } });
// eslint-disable-next-line new-cap
const m = (0, deps_1.default)()
    // eslint-disable-next-line node/no-missing-require
    .add('validate', () => require('./validate').validate);
async function parse(argv, options) {
    const input = {
        argv,
        context: options.context,
        args: (options.args || []).map((a) => args.newArg(a)),
        '--': options['--'],
        flags: {
            color: flags.defaultFlags.color,
            ...options.flags,
        },
        strict: options.strict !== false,
    };
    const parser = new parse_1.Parser(input);
    const output = await parser.parse();
    await m.validate({ input, output });
    return output;
}
exports.parse = parse;
var flags_1 = require("./flags");
Object.defineProperty(exports, "boolean", { enumerable: true, get: function () { return flags_1.boolean; } });
Object.defineProperty(exports, "integer", { enumerable: true, get: function () { return flags_1.integer; } });
Object.defineProperty(exports, "url", { enumerable: true, get: function () { return flags_1.url; } });
Object.defineProperty(exports, "directory", { enumerable: true, get: function () { return flags_1.directory; } });
Object.defineProperty(exports, "file", { enumerable: true, get: function () { return flags_1.file; } });
Object.defineProperty(exports, "string", { enumerable: true, get: function () { return flags_1.string; } });
Object.defineProperty(exports, "build", { enumerable: true, get: function () { return flags_1.build; } });
Object.defineProperty(exports, "option", { enumerable: true, get: function () { return flags_1.option; } });
Object.defineProperty(exports, "custom", { enumerable: true, get: function () { return flags_1.custom; } });
