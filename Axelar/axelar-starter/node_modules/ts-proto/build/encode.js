"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDecoder = exports.generateEncoder = void 0;
const ts_poet_1 = require("ts-poet");
const types_1 = require("./types");
const options_1 = require("./options");
const utils_1 = require("./utils");
function generateEncoder(ctx, typeName) {
    const name = (0, types_1.wrapperTypeName)(typeName);
    if (!name) {
        return (0, ts_poet_1.code) `${(0, types_1.messageToTypeName)(ctx, typeName, { keepValueType: true })}.encode(value).finish()`;
    }
    if (name == "Timestamp") {
        const TimestampValue = (0, utils_1.impProto)(ctx.options, "google/protobuf/timestamp", name);
        return (0, ts_poet_1.code) `${TimestampValue}.encode(${ctx.utils.toTimestamp}(value)).finish()`;
    }
    if (name == "Struct") {
        const StructType = (0, utils_1.impProto)(ctx.options, "google/protobuf/struct", name);
        return (0, ts_poet_1.code) `${StructType}.encode(${StructType}.wrap(value)).finish()`;
    }
    if (name == "ListValue") {
        const ListValueType = (0, utils_1.impProto)(ctx.options, "google/protobuf/struct", name);
        return (0, ts_poet_1.code) `${ListValueType}.encode({values: value ?? []}).finish()`;
    }
    const TypeValue = (0, utils_1.impProto)(ctx.options, "google/protobuf/wrappers", name);
    switch (name) {
        case "StringValue":
            return (0, ts_poet_1.code) `${TypeValue}.encode({value: value ?? ""}).finish()`;
        case "Int32Value":
        case "UInt32Value":
        case "DoubleValue":
        case "FloatValue":
            return (0, ts_poet_1.code) `${TypeValue}.encode({value: value ?? 0}).finish()`;
        case "Int64Value":
        case "UInt64Value":
            if (ctx.options.forceLong === options_1.LongOption.LONG) {
                return (0, ts_poet_1.code) `${TypeValue}.encode({value: value ? value.toNumber(): 0}).finish()`;
            }
            return (0, ts_poet_1.code) `${TypeValue}.encode({value: value ?? 0 }).finish()`;
        case "BoolValue":
            return (0, ts_poet_1.code) `${TypeValue}.encode({value: value ?? false}).finish()`;
        case "BytesValue":
            return (0, ts_poet_1.code) `${TypeValue}.encode({value: value ?? new Uint8Array()}).finish()`;
    }
    throw new Error(`unknown wrapper type: ${name}`);
}
exports.generateEncoder = generateEncoder;
function generateDecoder(ctx, typeName) {
    const { options } = ctx;
    let name = (0, types_1.wrapperTypeName)(typeName);
    if (!name) {
        return (0, ts_poet_1.code) `${(0, types_1.messageToTypeName)(ctx, typeName, { keepValueType: true })}.decode(value)`;
    }
    let TypeValue;
    if (name == "Timestamp") {
        TypeValue = (0, utils_1.impProto)(ctx.options, "google/protobuf/timestamp", name);
        return (0, ts_poet_1.code) `${TypeValue}.decode(value)`;
    }
    if (name == "Struct" || name == "ListValue") {
        TypeValue = (0, utils_1.impProto)(ctx.options, "google/protobuf/struct", name);
        return (0, ts_poet_1.code) `${TypeValue}.unwrap(${TypeValue}.decode(value))`;
    }
    TypeValue = (0, utils_1.impProto)(ctx.options, "google/protobuf/wrappers", name);
    return (0, ts_poet_1.code) `${TypeValue}.decode(value).value`;
}
exports.generateDecoder = generateDecoder;
