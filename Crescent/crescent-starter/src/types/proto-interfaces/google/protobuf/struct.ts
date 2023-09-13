/**
 * `NullValue` is a singleton enumeration to represent the null value for the
 * `Value` type union.
 * 
 *  The JSON representation for `NullValue` is JSON `null`.
 */
export enum NullValue {
  /** NULL_VALUE - Null value. */
  NULL_VALUE = 0,
  UNRECOGNIZED = -1,
}
export const NullValueSDKType = NullValue;
export const NullValueAmino = NullValue;
export function nullValueFromJSON(object: any): NullValue {
  switch (object) {
    case 0:
    case "NULL_VALUE":
      return NullValue.NULL_VALUE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NullValue.UNRECOGNIZED;
  }
}
export function nullValueToJSON(object: NullValue): string {
  switch (object) {
    case NullValue.NULL_VALUE:
      return "NULL_VALUE";
    case NullValue.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface Struct_FieldsEntry {
  key: string;
  value: Value;
}
export interface Struct_FieldsEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface Struct_FieldsEntryAmino {
  key: string;
  value?: ValueAmino;
}
export interface Struct_FieldsEntryAminoMsg {
  type: string;
  value: Struct_FieldsEntryAmino;
}
export interface Struct_FieldsEntrySDKType {
  key: string;
  value: ValueSDKType;
}
/**
 * `Struct` represents a structured data value, consisting of fields
 * which map to dynamically typed values. In some languages, `Struct`
 * might be supported by a native representation. For example, in
 * scripting languages like JS a struct is represented as an
 * object. The details of that representation are described together
 * with the proto support for the language.
 * 
 * The JSON representation for `Struct` is JSON object.
 */
export interface Struct {
  /** Unordered map of dynamically typed values. */
  fields: {
    [key: string]: Value;
  };
}
export interface StructProtoMsg {
  typeUrl: "/google.protobuf.Struct";
  value: Uint8Array;
}
/**
 * `Struct` represents a structured data value, consisting of fields
 * which map to dynamically typed values. In some languages, `Struct`
 * might be supported by a native representation. For example, in
 * scripting languages like JS a struct is represented as an
 * object. The details of that representation are described together
 * with the proto support for the language.
 * 
 * The JSON representation for `Struct` is JSON object.
 */
export interface StructAmino {
  /** Unordered map of dynamically typed values. */
  fields?: {
    [key: string]: ValueAmino;
  };
}
export interface StructAminoMsg {
  type: "/google.protobuf.Struct";
  value: StructAmino;
}
/**
 * `Struct` represents a structured data value, consisting of fields
 * which map to dynamically typed values. In some languages, `Struct`
 * might be supported by a native representation. For example, in
 * scripting languages like JS a struct is represented as an
 * object. The details of that representation are described together
 * with the proto support for the language.
 * 
 * The JSON representation for `Struct` is JSON object.
 */
export interface StructSDKType {
  fields: {
    [key: string]: ValueSDKType;
  };
}
/**
 * `Value` represents a dynamically typed value which can be either
 * null, a number, a string, a boolean, a recursive struct value, or a
 * list of values. A producer of value is expected to set one of that
 * variants, absence of any variant indicates an error.
 * 
 * The JSON representation for `Value` is JSON value.
 */
export interface Value {
  /** Represents a null value. */
  nullValue?: NullValue;
  /** Represents a double value. */
  numberValue?: number;
  /** Represents a string value. */
  stringValue?: string;
  /** Represents a boolean value. */
  boolValue?: boolean;
  /** Represents a structured value. */
  structValue?: Struct;
  /** Represents a repeated `Value`. */
  listValue?: ListValue;
}
export interface ValueProtoMsg {
  typeUrl: "/google.protobuf.Value";
  value: Uint8Array;
}
/**
 * `Value` represents a dynamically typed value which can be either
 * null, a number, a string, a boolean, a recursive struct value, or a
 * list of values. A producer of value is expected to set one of that
 * variants, absence of any variant indicates an error.
 * 
 * The JSON representation for `Value` is JSON value.
 */
export interface ValueAmino {
  /** Represents a null value. */
  null_value?: NullValue;
  /** Represents a double value. */
  number_value?: number;
  /** Represents a string value. */
  string_value?: string;
  /** Represents a boolean value. */
  bool_value?: boolean;
  /** Represents a structured value. */
  struct_value?: StructAmino;
  /** Represents a repeated `Value`. */
  list_value?: ListValueAmino;
}
export interface ValueAminoMsg {
  type: "/google.protobuf.Value";
  value: ValueAmino;
}
/**
 * `Value` represents a dynamically typed value which can be either
 * null, a number, a string, a boolean, a recursive struct value, or a
 * list of values. A producer of value is expected to set one of that
 * variants, absence of any variant indicates an error.
 * 
 * The JSON representation for `Value` is JSON value.
 */
export interface ValueSDKType {
  null_value?: NullValue;
  number_value?: number;
  string_value?: string;
  bool_value?: boolean;
  struct_value?: StructSDKType;
  list_value?: ListValueSDKType;
}
/**
 * `ListValue` is a wrapper around a repeated field of values.
 * 
 * The JSON representation for `ListValue` is JSON array.
 */
export interface ListValue {
  /** Repeated field of dynamically typed values. */
  values: Value[];
}
export interface ListValueProtoMsg {
  typeUrl: "/google.protobuf.ListValue";
  value: Uint8Array;
}
/**
 * `ListValue` is a wrapper around a repeated field of values.
 * 
 * The JSON representation for `ListValue` is JSON array.
 */
export interface ListValueAmino {
  /** Repeated field of dynamically typed values. */
  values: ValueAmino[];
}
export interface ListValueAminoMsg {
  type: "/google.protobuf.ListValue";
  value: ListValueAmino;
}
/**
 * `ListValue` is a wrapper around a repeated field of values.
 * 
 * The JSON representation for `ListValue` is JSON array.
 */
export interface ListValueSDKType {
  values: ValueSDKType[];
}