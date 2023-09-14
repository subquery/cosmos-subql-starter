export enum ScalarType {
  SCALAR_TYPE_UNSPECIFIED = 0,
  SCALAR_TYPE_STRING = 1,
  SCALAR_TYPE_BYTES = 2,
  UNRECOGNIZED = -1,
}
export const ScalarTypeSDKType = ScalarType;
export const ScalarTypeAmino = ScalarType;
export function scalarTypeFromJSON(object: any): ScalarType {
  switch (object) {
    case 0:
    case "SCALAR_TYPE_UNSPECIFIED":
      return ScalarType.SCALAR_TYPE_UNSPECIFIED;
    case 1:
    case "SCALAR_TYPE_STRING":
      return ScalarType.SCALAR_TYPE_STRING;
    case 2:
    case "SCALAR_TYPE_BYTES":
      return ScalarType.SCALAR_TYPE_BYTES;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ScalarType.UNRECOGNIZED;
  }
}
export function scalarTypeToJSON(object: ScalarType): string {
  switch (object) {
    case ScalarType.SCALAR_TYPE_UNSPECIFIED:
      return "SCALAR_TYPE_UNSPECIFIED";
    case ScalarType.SCALAR_TYPE_STRING:
      return "SCALAR_TYPE_STRING";
    case ScalarType.SCALAR_TYPE_BYTES:
      return "SCALAR_TYPE_BYTES";
    case ScalarType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * InterfaceDescriptor describes an interface type to be used with
 * accepts_interface and implements_interface and declared by declare_interface.
 */
export interface InterfaceDescriptor {
  /**
   * name is the name of the interface. It should be a short-name (without
   * a period) such that the fully qualified name of the interface will be
   * package.name, ex. for the package a.b and interface named C, the
   * fully-qualified name will be a.b.C.
   */
  name: string;
  /**
   * description is a human-readable description of the interface and its
   * purpose.
   */
  description: string;
}
export interface InterfaceDescriptorProtoMsg {
  typeUrl: "/cosmos_proto.InterfaceDescriptor";
  value: Uint8Array;
}
/**
 * InterfaceDescriptor describes an interface type to be used with
 * accepts_interface and implements_interface and declared by declare_interface.
 */
export interface InterfaceDescriptorAmino {
  /**
   * name is the name of the interface. It should be a short-name (without
   * a period) such that the fully qualified name of the interface will be
   * package.name, ex. for the package a.b and interface named C, the
   * fully-qualified name will be a.b.C.
   */
  name: string;
  /**
   * description is a human-readable description of the interface and its
   * purpose.
   */
  description: string;
}
export interface InterfaceDescriptorAminoMsg {
  type: "/cosmos_proto.InterfaceDescriptor";
  value: InterfaceDescriptorAmino;
}
/**
 * InterfaceDescriptor describes an interface type to be used with
 * accepts_interface and implements_interface and declared by declare_interface.
 */
export interface InterfaceDescriptorSDKType {
  name: string;
  description: string;
}
/**
 * ScalarDescriptor describes an scalar type to be used with
 * the scalar field option and declared by declare_scalar.
 * Scalars extend simple protobuf built-in types with additional
 * syntax and semantics, for instance to represent big integers.
 * Scalars should ideally define an encoding such that there is only one
 * valid syntactical representation for a given semantic meaning,
 * i.e. the encoding should be deterministic.
 */
export interface ScalarDescriptor {
  /**
   * name is the name of the scalar. It should be a short-name (without
   * a period) such that the fully qualified name of the scalar will be
   * package.name, ex. for the package a.b and scalar named C, the
   * fully-qualified name will be a.b.C.
   */
  name: string;
  /**
   * description is a human-readable description of the scalar and its
   * encoding format. For instance a big integer or decimal scalar should
   * specify precisely the expected encoding format.
   */
  description: string;
  /**
   * field_type is the type of field with which this scalar can be used.
   * Scalars can be used with one and only one type of field so that
   * encoding standards and simple and clear. Currently only string and
   * bytes fields are supported for scalars.
   */
  fieldType: ScalarType[];
}
export interface ScalarDescriptorProtoMsg {
  typeUrl: "/cosmos_proto.ScalarDescriptor";
  value: Uint8Array;
}
/**
 * ScalarDescriptor describes an scalar type to be used with
 * the scalar field option and declared by declare_scalar.
 * Scalars extend simple protobuf built-in types with additional
 * syntax and semantics, for instance to represent big integers.
 * Scalars should ideally define an encoding such that there is only one
 * valid syntactical representation for a given semantic meaning,
 * i.e. the encoding should be deterministic.
 */
export interface ScalarDescriptorAmino {
  /**
   * name is the name of the scalar. It should be a short-name (without
   * a period) such that the fully qualified name of the scalar will be
   * package.name, ex. for the package a.b and scalar named C, the
   * fully-qualified name will be a.b.C.
   */
  name: string;
  /**
   * description is a human-readable description of the scalar and its
   * encoding format. For instance a big integer or decimal scalar should
   * specify precisely the expected encoding format.
   */
  description: string;
  /**
   * field_type is the type of field with which this scalar can be used.
   * Scalars can be used with one and only one type of field so that
   * encoding standards and simple and clear. Currently only string and
   * bytes fields are supported for scalars.
   */
  field_type: ScalarType[];
}
export interface ScalarDescriptorAminoMsg {
  type: "/cosmos_proto.ScalarDescriptor";
  value: ScalarDescriptorAmino;
}
/**
 * ScalarDescriptor describes an scalar type to be used with
 * the scalar field option and declared by declare_scalar.
 * Scalars extend simple protobuf built-in types with additional
 * syntax and semantics, for instance to represent big integers.
 * Scalars should ideally define an encoding such that there is only one
 * valid syntactical representation for a given semantic meaning,
 * i.e. the encoding should be deterministic.
 */
export interface ScalarDescriptorSDKType {
  name: string;
  description: string;
  field_type: ScalarType[];
}
