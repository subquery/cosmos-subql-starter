"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEnumToNumber = exports.generateEnumToJson = exports.generateEnumFromJson = exports.generateEnum = void 0;
const ts_poet_1 = require("ts-poet");
const utils_1 = require("./utils");
const case_1 = require("./case");
const sourceInfo_1 = require("./sourceInfo");
const UNRECOGNIZED_ENUM_NAME = "UNRECOGNIZED";
const UNRECOGNIZED_ENUM_VALUE = -1;
// Output the `enum { Foo, A = 0, B = 1 }`
function generateEnum(ctx, fullName, enumDesc, sourceInfo) {
    var _a;
    const { options } = ctx;
    const chunks = [];
    (0, utils_1.maybeAddComment)(sourceInfo, chunks, (_a = enumDesc.options) === null || _a === void 0 ? void 0 : _a.deprecated);
    if (options.enumsAsLiterals) {
        chunks.push((0, ts_poet_1.code) `export const ${(0, ts_poet_1.def)(fullName)} = {`);
    }
    else {
        chunks.push((0, ts_poet_1.code) `export ${options.constEnums ? "const " : ""}enum ${(0, ts_poet_1.def)(fullName)} {`);
    }
    const delimiter = options.enumsAsLiterals ? ":" : "=";
    enumDesc.value.forEach((valueDesc, index) => {
        var _a;
        const info = sourceInfo.lookup(sourceInfo_1.Fields.enum.value, index);
        (0, utils_1.maybeAddComment)(info, chunks, (_a = valueDesc.options) === null || _a === void 0 ? void 0 : _a.deprecated, `${valueDesc.name} - `);
        chunks.push((0, ts_poet_1.code) `${valueDesc.name} ${delimiter} ${options.stringEnums ? `"${valueDesc.name}"` : valueDesc.number.toString()},`);
    });
    if (options.unrecognizedEnum)
        chunks.push((0, ts_poet_1.code) `
      ${UNRECOGNIZED_ENUM_NAME} ${delimiter} ${options.stringEnums ? `"${UNRECOGNIZED_ENUM_NAME}"` : UNRECOGNIZED_ENUM_VALUE.toString()},`);
    if (options.enumsAsLiterals) {
        chunks.push((0, ts_poet_1.code) `} as const`);
        chunks.push((0, ts_poet_1.code) `\n`);
        chunks.push((0, ts_poet_1.code) `export type ${(0, ts_poet_1.def)(fullName)} = typeof ${(0, ts_poet_1.def)(fullName)}[keyof typeof ${(0, ts_poet_1.def)(fullName)}]`);
    }
    else {
        chunks.push((0, ts_poet_1.code) `}`);
    }
    if (options.outputJsonMethods || (options.stringEnums && options.outputEncodeMethods)) {
        chunks.push((0, ts_poet_1.code) `\n`);
        chunks.push(generateEnumFromJson(ctx, fullName, enumDesc));
    }
    if (options.outputJsonMethods) {
        chunks.push((0, ts_poet_1.code) `\n`);
        chunks.push(generateEnumToJson(ctx, fullName, enumDesc));
    }
    if (options.stringEnums && options.outputEncodeMethods) {
        chunks.push((0, ts_poet_1.code) `\n`);
        chunks.push(generateEnumToNumber(ctx, fullName, enumDesc));
    }
    return (0, ts_poet_1.joinCode)(chunks, { on: "\n" });
}
exports.generateEnum = generateEnum;
/** Generates a function with a big switch statement to decode JSON -> our enum. */
function generateEnumFromJson(ctx, fullName, enumDesc) {
    const { options, utils } = ctx;
    const chunks = [];
    const functionName = (0, case_1.camelCase)(fullName) + "FromJSON";
    chunks.push((0, ts_poet_1.code) `export function ${(0, ts_poet_1.def)(functionName)}(object: any): ${fullName} {`);
    chunks.push((0, ts_poet_1.code) `switch (object) {`);
    for (const valueDesc of enumDesc.value) {
        chunks.push((0, ts_poet_1.code) `
      case ${valueDesc.number}:
      case "${valueDesc.name}":
        return ${fullName}.${valueDesc.name};
    `);
    }
    if (options.unrecognizedEnum) {
        chunks.push((0, ts_poet_1.code) `
      case ${UNRECOGNIZED_ENUM_VALUE}:
      case "${UNRECOGNIZED_ENUM_NAME}":
      default:
        return ${fullName}.${UNRECOGNIZED_ENUM_NAME};
    `);
    }
    else {
        // We use globalThis to avoid conflicts on protobuf types named `Error`.
        chunks.push((0, ts_poet_1.code) `
      default:
        throw new ${utils.globalThis}.Error("Unrecognized enum value " + object + " for enum ${fullName}");
    `);
    }
    chunks.push((0, ts_poet_1.code) `}`);
    chunks.push((0, ts_poet_1.code) `}`);
    return (0, ts_poet_1.joinCode)(chunks, { on: "\n" });
}
exports.generateEnumFromJson = generateEnumFromJson;
/** Generates a function with a big switch statement to encode our enum -> JSON. */
function generateEnumToJson(ctx, fullName, enumDesc) {
    const { options, utils } = ctx;
    const chunks = [];
    const functionName = (0, case_1.camelCase)(fullName) + "ToJSON";
    chunks.push((0, ts_poet_1.code) `export function ${(0, ts_poet_1.def)(functionName)}(object: ${fullName}): ${ctx.options.useNumericEnumForJson ? "number" : "string"} {`);
    chunks.push((0, ts_poet_1.code) `switch (object) {`);
    for (const valueDesc of enumDesc.value) {
        if (ctx.options.useNumericEnumForJson) {
            chunks.push((0, ts_poet_1.code) `case ${fullName}.${valueDesc.name}: return ${valueDesc.number};`);
        }
        else {
            chunks.push((0, ts_poet_1.code) `case ${fullName}.${valueDesc.name}: return "${valueDesc.name}";`);
        }
    }
    if (options.unrecognizedEnum) {
        chunks.push((0, ts_poet_1.code) `
      case ${fullName}.${UNRECOGNIZED_ENUM_NAME}:`);
        if (ctx.options.useNumericEnumForJson) {
            chunks.push((0, ts_poet_1.code) `
      default:
        return ${UNRECOGNIZED_ENUM_VALUE};
    `);
        }
        else {
            chunks.push((0, ts_poet_1.code) `
      default:
        return "${UNRECOGNIZED_ENUM_NAME}";
    `);
        }
    }
    else {
        // We use globalThis to avoid conflicts on protobuf types named `Error`.
        chunks.push((0, ts_poet_1.code) `
      default:
        throw new ${utils.globalThis}.Error("Unrecognized enum value " + object + " for enum ${fullName}");
    `);
    }
    chunks.push((0, ts_poet_1.code) `}`);
    chunks.push((0, ts_poet_1.code) `}`);
    return (0, ts_poet_1.joinCode)(chunks, { on: "\n" });
}
exports.generateEnumToJson = generateEnumToJson;
/** Generates a function with a big switch statement to encode our string enum -> int value. */
function generateEnumToNumber(ctx, fullName, enumDesc) {
    const { options, utils } = ctx;
    const chunks = [];
    const functionName = (0, case_1.camelCase)(fullName) + "ToNumber";
    chunks.push((0, ts_poet_1.code) `export function ${(0, ts_poet_1.def)(functionName)}(object: ${fullName}): number {`);
    chunks.push((0, ts_poet_1.code) `switch (object) {`);
    for (const valueDesc of enumDesc.value) {
        chunks.push((0, ts_poet_1.code) `case ${fullName}.${valueDesc.name}: return ${valueDesc.number};`);
    }
    if (options.unrecognizedEnum) {
        chunks.push((0, ts_poet_1.code) `
      case ${fullName}.${UNRECOGNIZED_ENUM_NAME}:
      default:
        return ${UNRECOGNIZED_ENUM_VALUE};
    `);
    }
    else {
        // We use globalThis to avoid conflicts on protobuf types named `Error`.
        chunks.push((0, ts_poet_1.code) `
      default:
        throw new ${utils.globalThis}.Error("Unrecognized enum value " + object + " for enum ${fullName}");
    `);
    }
    chunks.push((0, ts_poet_1.code) `}`);
    chunks.push((0, ts_poet_1.code) `}`);
    return (0, ts_poet_1.joinCode)(chunks, { on: "\n" });
}
exports.generateEnumToNumber = generateEnumToNumber;
