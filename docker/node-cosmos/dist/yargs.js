"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.argv = exports.getYargsOption = void 0;
const helpers_1 = require("yargs/helpers");
const yargs_1 = __importDefault(require("yargs/yargs"));
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getYargsOption() {
    return (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).options({
        subquery: {
            alias: 'f',
            demandOption: true,
            default: process.cwd(),
            describe: 'Local path or IPFS cid of the subquery project',
            type: 'string',
        },
        'subquery-name': {
            deprecated: true,
            demandOption: false,
            describe: 'Name of the subquery project',
            type: 'string',
        },
        config: {
            alias: 'c',
            demandOption: false,
            describe: 'Specify configuration file',
            type: 'string',
        },
        local: {
            deprecated: true,
            type: 'boolean',
            demandOption: false,
            describe: 'Use local mode',
        },
        'force-clean': {
            type: 'boolean',
            demandOption: false,
            describe: 'Force clean the database, dropping project schemas and tables',
        },
        'db-schema': {
            demandOption: false,
            describe: 'Db schema name of the project',
            type: 'string',
        },
        unsafe: {
            type: 'boolean',
            demandOption: false,
            describe: 'Allows usage of any built-in module within the sandbox',
        },
        subscription: {
            demandOption: false,
            describe: 'Enable subscription by create notification triggers',
            type: 'boolean',
            default: false,
        },
        'batch-size': {
            demandOption: false,
            describe: 'Batch size of blocks to fetch in one round',
            type: 'number',
        },
        'scale-batch-size': {
            type: 'boolean',
            demandOption: false,
            describe: 'scale batch size based on memory usage',
            default: false,
        },
        timeout: {
            demandOption: false,
            describe: 'Timeout for indexer sandbox to execute the mapping functions',
            type: 'number',
        },
        debug: {
            demandOption: false,
            describe: 'Show debug information to console output. will forcefully set log level to debug',
            type: 'boolean',
            default: false,
        },
        profiler: {
            demandOption: false,
            describe: 'Show profiler information to console output',
            type: 'boolean',
            default: false,
        },
        'network-endpoint': {
            demandOption: false,
            type: 'string',
            describe: 'Blockchain network endpoint to connect',
        },
        'output-fmt': {
            demandOption: false,
            describe: 'Print log as json or plain text',
            type: 'string',
            choices: ['json', 'colored'],
        },
        'log-level': {
            demandOption: false,
            describe: 'Specify log level to print. Ignored when --debug is used',
            type: 'string',
            choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
        },
        migrate: {
            demandOption: false,
            describe: 'Migrate db schema (for management tables only)',
            type: 'boolean',
            default: false,
        },
        'timestamp-field': {
            demandOption: false,
            describe: 'Enable/disable created_at and updated_at in schema',
            type: 'boolean',
            default: false,
        },
        'network-dictionary': {
            alias: 'd',
            demandOption: false,
            describe: 'Specify the dictionary api for this network',
            type: 'string',
        },
        'mmr-path': {
            alias: 'm',
            demandOption: false,
            describe: 'Local path of the merkle mountain range (.mmr) file',
            type: 'string',
        },
        'proof-of-index': {
            demandOption: false,
            describe: 'Enable/disable proof of index',
            type: 'boolean',
            default: false,
        },
        ipfs: {
            demandOption: false,
            describe: 'IPFS gateway endpoint',
            type: 'string',
        },
        port: {
            alias: 'p',
            demandOption: false,
            describe: 'The port the service will bind to',
            type: 'number',
        },
        'disable-historical': {
            demandOption: false,
            default: true,
            describe: 'Disable storing historical state entities',
            type: 'boolean',
        },
        tracing: {
            demandOption: false,
            describe: 'string',
            type: 'boolean',
            default: false,
        },
        'otel-collector': {
            demandOption: false,
            type: 'string',
            describe: 'OpenTelemetry collector endpoint URL',
            default: 'http://otel-collector:4317',
        },
    });
}
exports.getYargsOption = getYargsOption;
function argv(arg) {
    return getYargsOption().argv[arg];
}
exports.argv = argv;
//# sourceMappingURL=yargs.js.map
