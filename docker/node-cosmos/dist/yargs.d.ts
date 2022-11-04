export declare function getYargsOption(): import("yargs").Argv<import("yargs").Omit<{}, "subquery" | "subquery-name" | "config" | "local" | "force-clean" | "db-schema" | "unsafe" | "subscription" | "batch-size" | "scale-batch-size" | "timeout" | "debug" | "profiler" | "network-endpoint" | "output-fmt" | "log-level" | "migrate" | "timestamp-field" | "network-dictionary" | "mmr-path" | "proof-of-index" | "ipfs" | "port" | "disable-historical"> & import("yargs").InferredOptionTypes<{
    subquery: {
        alias: string;
        demandOption: true;
        default: string;
        describe: string;
        type: "string";
    };
    'subquery-name': {
        deprecated: true;
        demandOption: false;
        describe: string;
        type: "string";
    };
    config: {
        alias: string;
        demandOption: false;
        describe: string;
        type: "string";
    };
    local: {
        deprecated: true;
        type: "boolean";
        demandOption: false;
        describe: string;
    };
    'force-clean': {
        type: "boolean";
        demandOption: false;
        describe: string;
    };
    'db-schema': {
        demandOption: false;
        describe: string;
        type: "string";
    };
    unsafe: {
        type: "boolean";
        demandOption: false;
        describe: string;
    };
    subscription: {
        demandOption: false;
        describe: string;
        type: "boolean";
        default: boolean;
    };
    'batch-size': {
        demandOption: false;
        describe: string;
        type: "number";
    };
    'scale-batch-size': {
        type: "boolean";
        demandOption: false;
        describe: string;
        default: boolean;
    };
    timeout: {
        demandOption: false;
        describe: string;
        type: "number";
    };
    debug: {
        demandOption: false;
        describe: string;
        type: "boolean";
        default: boolean;
    };
    profiler: {
        demandOption: false;
        describe: string;
        type: "boolean";
        default: boolean;
    };
    'network-endpoint': {
        demandOption: false;
        type: "string";
        describe: string;
    };
    'output-fmt': {
        demandOption: false;
        describe: string;
        type: "string";
        choices: string[];
    };
    'log-level': {
        demandOption: false;
        describe: string;
        type: "string";
        choices: string[];
    };
    migrate: {
        demandOption: false;
        describe: string;
        type: "boolean";
        default: boolean;
    };
    'timestamp-field': {
        demandOption: false;
        describe: string;
        type: "boolean";
        default: boolean;
    };
    'network-dictionary': {
        alias: string;
        demandOption: false;
        describe: string;
        type: "string";
    };
    'mmr-path': {
        alias: string;
        demandOption: false;
        describe: string;
        type: "string";
    };
    'proof-of-index': {
        demandOption: false;
        describe: string;
        type: "boolean";
        default: boolean;
    };
    ipfs: {
        demandOption: false;
        describe: string;
        type: "string";
    };
    port: {
        alias: string;
        demandOption: false;
        describe: string;
        type: "number";
    };
    'disable-historical': {
        demandOption: false;
        default: boolean;
        describe: string;
        type: "boolean";
    };
    tracing: {
        demandOption: false;
        describe: string;
        type: "boolean";
        default: boolean;
    };
    'otel-collector': {
        demandOption: false;
        type: "string";
        describe: string;
        default: string;
    };
}>>;
export declare function argv(arg: string): unknown;
