"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.version = exports.enum = exports._enum = exports.custom = exports.option = exports.build = exports.string = exports.file = exports.directory = exports.url = exports.integer = exports.boolean = void 0;
const parser_1 = require("./parser");
const help_1 = require("./help");
var parser_2 = require("./parser");
Object.defineProperty(exports, "boolean", { enumerable: true, get: function () { return parser_2.boolean; } });
Object.defineProperty(exports, "integer", { enumerable: true, get: function () { return parser_2.integer; } });
Object.defineProperty(exports, "url", { enumerable: true, get: function () { return parser_2.url; } });
Object.defineProperty(exports, "directory", { enumerable: true, get: function () { return parser_2.directory; } });
Object.defineProperty(exports, "file", { enumerable: true, get: function () { return parser_2.file; } });
Object.defineProperty(exports, "string", { enumerable: true, get: function () { return parser_2.string; } });
Object.defineProperty(exports, "build", { enumerable: true, get: function () { return parser_2.build; } });
Object.defineProperty(exports, "option", { enumerable: true, get: function () { return parser_2.option; } });
Object.defineProperty(exports, "custom", { enumerable: true, get: function () { return parser_2.custom; } });
function _enum(opts) {
    return (0, parser_1.custom)({
        async parse(input) {
            if (!opts.options.includes(input))
                throw new Error(`Expected --${this.name}=${input} to be one of: ${opts.options.join(', ')}`);
            return input;
        },
        helpValue: `(${opts.options.join('|')})`,
        ...opts,
    })();
}
exports._enum = _enum;
exports.enum = _enum;
const version = (opts = {}) => {
    return (0, parser_1.boolean)({
        description: 'Show CLI version.',
        ...opts,
        parse: async (_, cmd) => {
            cmd.log(cmd.config.userAgent);
            cmd.exit(0);
        },
    });
};
exports.version = version;
const help = (opts = {}) => {
    return (0, parser_1.boolean)({
        description: 'Show CLI help.',
        ...opts,
        parse: async (_, cmd) => {
            new help_1.Help(cmd.config).showHelp(cmd.id ? [cmd.id, ...cmd.argv] : cmd.argv);
            cmd.exit(0);
        },
    });
};
exports.help = help;
