"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFlags = exports.string = exports.option = exports.url = exports.file = exports.directory = exports.integer = exports.boolean = exports.build = exports.custom = void 0;
const url_1 = require("url");
const fs = require("fs");
function custom(defaults) {
    return (options = {}) => {
        return {
            parse: async (i, _context, _opts) => i,
            ...defaults,
            ...options,
            input: [],
            multiple: Boolean(options.multiple === undefined ? defaults.multiple : options.multiple),
            type: 'option',
        };
    };
}
exports.custom = custom;
function build(defaults) {
    return (options = {}) => {
        return {
            parse: async (i, _context) => i,
            ...defaults,
            ...options,
            input: [],
            multiple: Boolean(options.multiple === undefined ? defaults.multiple : options.multiple),
            type: 'option',
        };
    };
}
exports.build = build;
function boolean(options = {}) {
    return {
        parse: async (b, _) => b,
        ...options,
        allowNo: Boolean(options.allowNo),
        type: 'boolean',
    };
}
exports.boolean = boolean;
exports.integer = custom({
    parse: async (input, _, opts) => {
        if (!/^-?\d+$/.test(input))
            throw new Error(`Expected an integer but received: ${input}`);
        const num = Number.parseInt(input, 10);
        if (opts.min !== undefined && num < opts.min)
            throw new Error(`Expected an integer greater than or equal to ${opts.min} but received: ${input}`);
        if (opts.max !== undefined && num > opts.max)
            throw new Error(`Expected an integer less than or equal to ${opts.max} but received: ${input}`);
        return num;
    },
});
exports.directory = custom({
    parse: async (input, _, opts) => {
        if (opts.exists)
            return dirExists(input);
        return input;
    },
});
exports.file = custom({
    parse: async (input, _, opts) => {
        if (opts.exists)
            return fileExists(input);
        return input;
    },
});
/**
 * Initializes a string as a URL. Throws an error
 * if the string is not a valid URL.
 */
exports.url = custom({
    parse: async (input) => {
        try {
            return new url_1.URL(input);
        }
        catch {
            throw new Error(`Expected a valid url but received: ${input}`);
        }
    },
});
function option(options) {
    return custom(options)();
}
exports.option = option;
const stringFlag = custom({});
exports.string = stringFlag;
exports.defaultFlags = {
    color: boolean({ allowNo: true }),
};
const dirExists = async (input) => {
    if (!fs.existsSync(input)) {
        throw new Error(`No directory found at ${input}`);
    }
    if (!(await fs.promises.stat(input)).isDirectory()) {
        throw new Error(`${input} exists but is not a directory`);
    }
    return input;
};
const fileExists = async (input) => {
    if (!fs.existsSync(input)) {
        throw new Error(`No file found at ${input}`);
    }
    if (!(await fs.promises.stat(input)).isFile()) {
        throw new Error(`${input} exists but is not a file`);
    }
    return input;
};
