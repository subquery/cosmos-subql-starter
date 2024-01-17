import { Value, ValueAmino, ValueSDKType } from "../../google/protobuf/struct";
import { Long } from "../../helpers";
/**
 * Scheme describes the schemes supported by the OpenAPI Swagger
 * and Operation objects.
 */
export enum Scheme {
  UNKNOWN = 0,
  HTTP = 1,
  HTTPS = 2,
  WS = 3,
  WSS = 4,
  UNRECOGNIZED = -1,
}
export const SchemeSDKType = Scheme;
export const SchemeAmino = Scheme;
export function schemeFromJSON(object: any): Scheme {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return Scheme.UNKNOWN;
    case 1:
    case "HTTP":
      return Scheme.HTTP;
    case 2:
    case "HTTPS":
      return Scheme.HTTPS;
    case 3:
    case "WS":
      return Scheme.WS;
    case 4:
    case "WSS":
      return Scheme.WSS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Scheme.UNRECOGNIZED;
  }
}
export function schemeToJSON(object: Scheme): string {
  switch (object) {
    case Scheme.UNKNOWN:
      return "UNKNOWN";
    case Scheme.HTTP:
      return "HTTP";
    case Scheme.HTTPS:
      return "HTTPS";
    case Scheme.WS:
      return "WS";
    case Scheme.WSS:
      return "WSS";
    case Scheme.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export enum JSONSchema_JSONSchemaSimpleTypes {
  UNKNOWN = 0,
  ARRAY = 1,
  BOOLEAN = 2,
  INTEGER = 3,
  NULL = 4,
  NUMBER = 5,
  OBJECT = 6,
  STRING = 7,
  UNRECOGNIZED = -1,
}
export const JSONSchema_JSONSchemaSimpleTypesSDKType = JSONSchema_JSONSchemaSimpleTypes;
export const JSONSchema_JSONSchemaSimpleTypesAmino = JSONSchema_JSONSchemaSimpleTypes;
export function jSONSchema_JSONSchemaSimpleTypesFromJSON(object: any): JSONSchema_JSONSchemaSimpleTypes {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return JSONSchema_JSONSchemaSimpleTypes.UNKNOWN;
    case 1:
    case "ARRAY":
      return JSONSchema_JSONSchemaSimpleTypes.ARRAY;
    case 2:
    case "BOOLEAN":
      return JSONSchema_JSONSchemaSimpleTypes.BOOLEAN;
    case 3:
    case "INTEGER":
      return JSONSchema_JSONSchemaSimpleTypes.INTEGER;
    case 4:
    case "NULL":
      return JSONSchema_JSONSchemaSimpleTypes.NULL;
    case 5:
    case "NUMBER":
      return JSONSchema_JSONSchemaSimpleTypes.NUMBER;
    case 6:
    case "OBJECT":
      return JSONSchema_JSONSchemaSimpleTypes.OBJECT;
    case 7:
    case "STRING":
      return JSONSchema_JSONSchemaSimpleTypes.STRING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return JSONSchema_JSONSchemaSimpleTypes.UNRECOGNIZED;
  }
}
export function jSONSchema_JSONSchemaSimpleTypesToJSON(object: JSONSchema_JSONSchemaSimpleTypes): string {
  switch (object) {
    case JSONSchema_JSONSchemaSimpleTypes.UNKNOWN:
      return "UNKNOWN";
    case JSONSchema_JSONSchemaSimpleTypes.ARRAY:
      return "ARRAY";
    case JSONSchema_JSONSchemaSimpleTypes.BOOLEAN:
      return "BOOLEAN";
    case JSONSchema_JSONSchemaSimpleTypes.INTEGER:
      return "INTEGER";
    case JSONSchema_JSONSchemaSimpleTypes.NULL:
      return "NULL";
    case JSONSchema_JSONSchemaSimpleTypes.NUMBER:
      return "NUMBER";
    case JSONSchema_JSONSchemaSimpleTypes.OBJECT:
      return "OBJECT";
    case JSONSchema_JSONSchemaSimpleTypes.STRING:
      return "STRING";
    case JSONSchema_JSONSchemaSimpleTypes.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * The type of the security scheme. Valid values are "basic",
 * "apiKey" or "oauth2".
 */
export enum SecurityScheme_Type {
  TYPE_INVALID = 0,
  TYPE_BASIC = 1,
  TYPE_API_KEY = 2,
  TYPE_OAUTH2 = 3,
  UNRECOGNIZED = -1,
}
export const SecurityScheme_TypeSDKType = SecurityScheme_Type;
export const SecurityScheme_TypeAmino = SecurityScheme_Type;
export function securityScheme_TypeFromJSON(object: any): SecurityScheme_Type {
  switch (object) {
    case 0:
    case "TYPE_INVALID":
      return SecurityScheme_Type.TYPE_INVALID;
    case 1:
    case "TYPE_BASIC":
      return SecurityScheme_Type.TYPE_BASIC;
    case 2:
    case "TYPE_API_KEY":
      return SecurityScheme_Type.TYPE_API_KEY;
    case 3:
    case "TYPE_OAUTH2":
      return SecurityScheme_Type.TYPE_OAUTH2;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SecurityScheme_Type.UNRECOGNIZED;
  }
}
export function securityScheme_TypeToJSON(object: SecurityScheme_Type): string {
  switch (object) {
    case SecurityScheme_Type.TYPE_INVALID:
      return "TYPE_INVALID";
    case SecurityScheme_Type.TYPE_BASIC:
      return "TYPE_BASIC";
    case SecurityScheme_Type.TYPE_API_KEY:
      return "TYPE_API_KEY";
    case SecurityScheme_Type.TYPE_OAUTH2:
      return "TYPE_OAUTH2";
    case SecurityScheme_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** The location of the API key. Valid values are "query" or "header". */
export enum SecurityScheme_In {
  IN_INVALID = 0,
  IN_QUERY = 1,
  IN_HEADER = 2,
  UNRECOGNIZED = -1,
}
export const SecurityScheme_InSDKType = SecurityScheme_In;
export const SecurityScheme_InAmino = SecurityScheme_In;
export function securityScheme_InFromJSON(object: any): SecurityScheme_In {
  switch (object) {
    case 0:
    case "IN_INVALID":
      return SecurityScheme_In.IN_INVALID;
    case 1:
    case "IN_QUERY":
      return SecurityScheme_In.IN_QUERY;
    case 2:
    case "IN_HEADER":
      return SecurityScheme_In.IN_HEADER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SecurityScheme_In.UNRECOGNIZED;
  }
}
export function securityScheme_InToJSON(object: SecurityScheme_In): string {
  switch (object) {
    case SecurityScheme_In.IN_INVALID:
      return "IN_INVALID";
    case SecurityScheme_In.IN_QUERY:
      return "IN_QUERY";
    case SecurityScheme_In.IN_HEADER:
      return "IN_HEADER";
    case SecurityScheme_In.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * The flow used by the OAuth2 security scheme. Valid values are
 * "implicit", "password", "application" or "accessCode".
 */
export enum SecurityScheme_Flow {
  FLOW_INVALID = 0,
  FLOW_IMPLICIT = 1,
  FLOW_PASSWORD = 2,
  FLOW_APPLICATION = 3,
  FLOW_ACCESS_CODE = 4,
  UNRECOGNIZED = -1,
}
export const SecurityScheme_FlowSDKType = SecurityScheme_Flow;
export const SecurityScheme_FlowAmino = SecurityScheme_Flow;
export function securityScheme_FlowFromJSON(object: any): SecurityScheme_Flow {
  switch (object) {
    case 0:
    case "FLOW_INVALID":
      return SecurityScheme_Flow.FLOW_INVALID;
    case 1:
    case "FLOW_IMPLICIT":
      return SecurityScheme_Flow.FLOW_IMPLICIT;
    case 2:
    case "FLOW_PASSWORD":
      return SecurityScheme_Flow.FLOW_PASSWORD;
    case 3:
    case "FLOW_APPLICATION":
      return SecurityScheme_Flow.FLOW_APPLICATION;
    case 4:
    case "FLOW_ACCESS_CODE":
      return SecurityScheme_Flow.FLOW_ACCESS_CODE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SecurityScheme_Flow.UNRECOGNIZED;
  }
}
export function securityScheme_FlowToJSON(object: SecurityScheme_Flow): string {
  switch (object) {
    case SecurityScheme_Flow.FLOW_INVALID:
      return "FLOW_INVALID";
    case SecurityScheme_Flow.FLOW_IMPLICIT:
      return "FLOW_IMPLICIT";
    case SecurityScheme_Flow.FLOW_PASSWORD:
      return "FLOW_PASSWORD";
    case SecurityScheme_Flow.FLOW_APPLICATION:
      return "FLOW_APPLICATION";
    case SecurityScheme_Flow.FLOW_ACCESS_CODE:
      return "FLOW_ACCESS_CODE";
    case SecurityScheme_Flow.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface Swagger_ResponsesEntry {
  key: string;
  value: Response;
}
export interface Swagger_ResponsesEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface Swagger_ResponsesEntryAmino {
  key: string;
  value?: ResponseAmino;
}
export interface Swagger_ResponsesEntryAminoMsg {
  type: string;
  value: Swagger_ResponsesEntryAmino;
}
export interface Swagger_ResponsesEntrySDKType {
  key: string;
  value: ResponseSDKType;
}
export interface Swagger_ExtensionsEntry {
  key: string;
  value: Value;
}
export interface Swagger_ExtensionsEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface Swagger_ExtensionsEntryAmino {
  key: string;
  value?: ValueAmino;
}
export interface Swagger_ExtensionsEntryAminoMsg {
  type: string;
  value: Swagger_ExtensionsEntryAmino;
}
export interface Swagger_ExtensionsEntrySDKType {
  key: string;
  value: ValueSDKType;
}
/**
 * `Swagger` is a representation of OpenAPI v2 specification's Swagger object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#swaggerObject
 * 
 * Example:
 * 
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      title: "Echo API";
 *      version: "1.0";
 *      description: ";
 *      contact: {
 *        name: "gRPC-Gateway project";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *        email: "none@example.com";
 *      };
 *      license: {
 *        name: "BSD 3-Clause License";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/master/LICENSE.txt";
 *      };
 *    };
 *    schemes: HTTPS;
 *    consumes: "application/json";
 *    produces: "application/json";
 *  };
 */
export interface Swagger {
  /**
   * Specifies the OpenAPI Specification version being used. It can be
   * used by the OpenAPI UI and other clients to interpret the API listing. The
   * value MUST be "2.0".
   */
  swagger: string;
  /**
   * Provides metadata about the API. The metadata can be used by the
   * clients if needed.
   */
  info: Info;
  /**
   * The host (name or ip) serving the API. This MUST be the host only and does
   * not include the scheme nor sub-paths. It MAY include a port. If the host is
   * not included, the host serving the documentation is to be used (including
   * the port). The host does not support path templating.
   */
  host: string;
  /**
   * The base path on which the API is served, which is relative to the host. If
   * it is not included, the API is served directly under the host. The value
   * MUST start with a leading slash (/). The basePath does not support path
   * templating.
   * Note that using `base_path` does not change the endpoint paths that are
   * generated in the resulting OpenAPI file. If you wish to use `base_path`
   * with relatively generated OpenAPI paths, the `base_path` prefix must be
   * manually removed from your `google.api.http` paths and your code changed to
   * serve the API from the `base_path`.
   */
  basePath: string;
  /**
   * The transfer protocol of the API. Values MUST be from the list: "http",
   * "https", "ws", "wss". If the schemes is not included, the default scheme to
   * be used is the one used to access the OpenAPI definition itself.
   */
  schemes: Scheme[];
  /**
   * A list of MIME types the APIs can consume. This is global to all APIs but
   * can be overridden on specific API calls. Value MUST be as described under
   * Mime Types.
   */
  consumes: string[];
  /**
   * A list of MIME types the APIs can produce. This is global to all APIs but
   * can be overridden on specific API calls. Value MUST be as described under
   * Mime Types.
   */
  produces: string[];
  /**
   * An object to hold responses that can be used across operations. This
   * property does not define global responses for all operations.
   */
  responses: {
    [key: string]: Response;
  };
  /** Security scheme definitions that can be used across the specification. */
  securityDefinitions: SecurityDefinitions;
  /**
   * A declaration of which security schemes are applied for the API as a whole.
   * The list of values describes alternative security schemes that can be used
   * (that is, there is a logical OR between the security requirements).
   * Individual operations can override this definition.
   */
  security: SecurityRequirement[];
  /** Additional external documentation. */
  externalDocs: ExternalDocumentation;
  extensions: {
    [key: string]: Value;
  };
}
export interface SwaggerProtoMsg {
  typeUrl: "/grpc.gateway.protoc_gen_openapiv2.options.Swagger";
  value: Uint8Array;
}
/**
 * `Swagger` is a representation of OpenAPI v2 specification's Swagger object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#swaggerObject
 * 
 * Example:
 * 
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      title: "Echo API";
 *      version: "1.0";
 *      description: ";
 *      contact: {
 *        name: "gRPC-Gateway project";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *        email: "none@example.com";
 *      };
 *      license: {
 *        name: "BSD 3-Clause License";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/master/LICENSE.txt";
 *      };
 *    };
 *    schemes: HTTPS;
 *    consumes: "application/json";
 *    produces: "application/json";
 *  };
 */
export interface SwaggerAmino {
  /**
   * Specifies the OpenAPI Specification version being used. It can be
   * used by the OpenAPI UI and other clients to interpret the API listing. The
   * value MUST be "2.0".
   */
  swagger: string;
  /**
   * Provides metadata about the API. The metadata can be used by the
   * clients if needed.
   */
  info?: InfoAmino;
  /**
   * The host (name or ip) serving the API. This MUST be the host only and does
   * not include the scheme nor sub-paths. It MAY include a port. If the host is
   * not included, the host serving the documentation is to be used (including
   * the port). The host does not support path templating.
   */
  host: string;
  /**
   * The base path on which the API is served, which is relative to the host. If
   * it is not included, the API is served directly under the host. The value
   * MUST start with a leading slash (/). The basePath does not support path
   * templating.
   * Note that using `base_path` does not change the endpoint paths that are
   * generated in the resulting OpenAPI file. If you wish to use `base_path`
   * with relatively generated OpenAPI paths, the `base_path` prefix must be
   * manually removed from your `google.api.http` paths and your code changed to
   * serve the API from the `base_path`.
   */
  base_path: string;
  /**
   * The transfer protocol of the API. Values MUST be from the list: "http",
   * "https", "ws", "wss". If the schemes is not included, the default scheme to
   * be used is the one used to access the OpenAPI definition itself.
   */
  schemes: Scheme[];
  /**
   * A list of MIME types the APIs can consume. This is global to all APIs but
   * can be overridden on specific API calls. Value MUST be as described under
   * Mime Types.
   */
  consumes: string[];
  /**
   * A list of MIME types the APIs can produce. This is global to all APIs but
   * can be overridden on specific API calls. Value MUST be as described under
   * Mime Types.
   */
  produces: string[];
  /**
   * An object to hold responses that can be used across operations. This
   * property does not define global responses for all operations.
   */
  responses?: {
    [key: string]: ResponseAmino;
  };
  /** Security scheme definitions that can be used across the specification. */
  security_definitions?: SecurityDefinitionsAmino;
  /**
   * A declaration of which security schemes are applied for the API as a whole.
   * The list of values describes alternative security schemes that can be used
   * (that is, there is a logical OR between the security requirements).
   * Individual operations can override this definition.
   */
  security: SecurityRequirementAmino[];
  /** Additional external documentation. */
  external_docs?: ExternalDocumentationAmino;
  extensions?: {
    [key: string]: ValueAmino;
  };
}
export interface SwaggerAminoMsg {
  type: "/grpc.gateway.protoc_gen_openapiv2.options.Swagger";
  value: SwaggerAmino;
}
/**
 * `Swagger` is a representation of OpenAPI v2 specification's Swagger object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#swaggerObject
 * 
 * Example:
 * 
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      title: "Echo API";
 *      version: "1.0";
 *      description: ";
 *      contact: {
 *        name: "gRPC-Gateway project";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *        email: "none@example.com";
 *      };
 *      license: {
 *        name: "BSD 3-Clause License";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/master/LICENSE.txt";
 *      };
 *    };
 *    schemes: HTTPS;
 *    consumes: "application/json";
 *    produces: "application/json";
 *  };
 */
export interface SwaggerSDKType {
  swagger: string;
  info: InfoSDKType;
  host: string;
  base_path: string;
  schemes: Scheme[];
  consumes: string[];
  produces: string[];
  responses: {
    [key: string]: ResponseSDKType;
  };
  security_definitions: SecurityDefinitionsSDKType;
  security: SecurityRequirementSDKType[];
  external_docs: ExternalDocumentationSDKType;
  extensions: {
    [key: string]: ValueSDKType;
  };
}
export interface Operation_ResponsesEntry {
  key: string;
  value: Response;
}
export interface Operation_ResponsesEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface Operation_ResponsesEntryAmino {
  key: string;
  value?: ResponseAmino;
}
export interface Operation_ResponsesEntryAminoMsg {
  type: string;
  value: Operation_ResponsesEntryAmino;
}
export interface Operation_ResponsesEntrySDKType {
  key: string;
  value: ResponseSDKType;
}
export interface Operation_ExtensionsEntry {
  key: string;
  value: Value;
}
export interface Operation_ExtensionsEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface Operation_ExtensionsEntryAmino {
  key: string;
  value?: ValueAmino;
}
export interface Operation_ExtensionsEntryAminoMsg {
  type: string;
  value: Operation_ExtensionsEntryAmino;
}
export interface Operation_ExtensionsEntrySDKType {
  key: string;
  value: ValueSDKType;
}
/**
 * `Operation` is a representation of OpenAPI v2 specification's Operation object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#operationObject
 * 
 * Example:
 * 
 *  service EchoService {
 *    rpc Echo(SimpleMessage) returns (SimpleMessage) {
 *      option (google.api.http) = {
 *        get: "/v1/example/echo/{id}"
 *      };
 * 
 *      option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_operation) = {
 *        summary: "Get a message.";
 *        operation_id: "getMessage";
 *        tags: "echo";
 *        responses: {
 *          key: "200"
 *            value: {
 *            description: "OK";
 *          }
 *        }
 *      };
 *    }
 *  }
 */
export interface Operation {
  /**
   * A list of tags for API documentation control. Tags can be used for logical
   * grouping of operations by resources or any other qualifier.
   */
  tags: string[];
  /**
   * A short summary of what the operation does. For maximum readability in the
   * swagger-ui, this field SHOULD be less than 120 characters.
   */
  summary: string;
  /**
   * A verbose explanation of the operation behavior. GFM syntax can be used for
   * rich text representation.
   */
  description: string;
  /** Additional external documentation for this operation. */
  externalDocs: ExternalDocumentation;
  /**
   * Unique string used to identify the operation. The id MUST be unique among
   * all operations described in the API. Tools and libraries MAY use the
   * operationId to uniquely identify an operation, therefore, it is recommended
   * to follow common programming naming conventions.
   */
  operationId: string;
  /**
   * A list of MIME types the operation can consume. This overrides the consumes
   * definition at the OpenAPI Object. An empty value MAY be used to clear the
   * global definition. Value MUST be as described under Mime Types.
   */
  consumes: string[];
  /**
   * A list of MIME types the operation can produce. This overrides the produces
   * definition at the OpenAPI Object. An empty value MAY be used to clear the
   * global definition. Value MUST be as described under Mime Types.
   */
  produces: string[];
  /**
   * The list of possible responses as they are returned from executing this
   * operation.
   */
  responses: {
    [key: string]: Response;
  };
  /**
   * The transfer protocol for the operation. Values MUST be from the list:
   * "http", "https", "ws", "wss". The value overrides the OpenAPI Object
   * schemes definition.
   */
  schemes: Scheme[];
  /**
   * Declares this operation to be deprecated. Usage of the declared operation
   * should be refrained. Default value is false.
   */
  deprecated: boolean;
  /**
   * A declaration of which security schemes are applied for this operation. The
   * list of values describes alternative security schemes that can be used
   * (that is, there is a logical OR between the security requirements). This
   * definition overrides any declared top-level security. To remove a top-level
   * security declaration, an empty array can be used.
   */
  security: SecurityRequirement[];
  extensions: {
    [key: string]: Value;
  };
}
export interface OperationProtoMsg {
  typeUrl: "/grpc.gateway.protoc_gen_openapiv2.options.Operation";
  value: Uint8Array;
}
/**
 * `Operation` is a representation of OpenAPI v2 specification's Operation object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#operationObject
 * 
 * Example:
 * 
 *  service EchoService {
 *    rpc Echo(SimpleMessage) returns (SimpleMessage) {
 *      option (google.api.http) = {
 *        get: "/v1/example/echo/{id}"
 *      };
 * 
 *      option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_operation) = {
 *        summary: "Get a message.";
 *        operation_id: "getMessage";
 *        tags: "echo";
 *        responses: {
 *          key: "200"
 *            value: {
 *            description: "OK";
 *          }
 *        }
 *      };
 *    }
 *  }
 */
export interface OperationAmino {
  /**
   * A list of tags for API documentation control. Tags can be used for logical
   * grouping of operations by resources or any other qualifier.
   */
  tags: string[];
  /**
   * A short summary of what the operation does. For maximum readability in the
   * swagger-ui, this field SHOULD be less than 120 characters.
   */
  summary: string;
  /**
   * A verbose explanation of the operation behavior. GFM syntax can be used for
   * rich text representation.
   */
  description: string;
  /** Additional external documentation for this operation. */
  external_docs?: ExternalDocumentationAmino;
  /**
   * Unique string used to identify the operation. The id MUST be unique among
   * all operations described in the API. Tools and libraries MAY use the
   * operationId to uniquely identify an operation, therefore, it is recommended
   * to follow common programming naming conventions.
   */
  operation_id: string;
  /**
   * A list of MIME types the operation can consume. This overrides the consumes
   * definition at the OpenAPI Object. An empty value MAY be used to clear the
   * global definition. Value MUST be as described under Mime Types.
   */
  consumes: string[];
  /**
   * A list of MIME types the operation can produce. This overrides the produces
   * definition at the OpenAPI Object. An empty value MAY be used to clear the
   * global definition. Value MUST be as described under Mime Types.
   */
  produces: string[];
  /**
   * The list of possible responses as they are returned from executing this
   * operation.
   */
  responses?: {
    [key: string]: ResponseAmino;
  };
  /**
   * The transfer protocol for the operation. Values MUST be from the list:
   * "http", "https", "ws", "wss". The value overrides the OpenAPI Object
   * schemes definition.
   */
  schemes: Scheme[];
  /**
   * Declares this operation to be deprecated. Usage of the declared operation
   * should be refrained. Default value is false.
   */
  deprecated: boolean;
  /**
   * A declaration of which security schemes are applied for this operation. The
   * list of values describes alternative security schemes that can be used
   * (that is, there is a logical OR between the security requirements). This
   * definition overrides any declared top-level security. To remove a top-level
   * security declaration, an empty array can be used.
   */
  security: SecurityRequirementAmino[];
  extensions?: {
    [key: string]: ValueAmino;
  };
}
export interface OperationAminoMsg {
  type: "/grpc.gateway.protoc_gen_openapiv2.options.Operation";
  value: OperationAmino;
}
/**
 * `Operation` is a representation of OpenAPI v2 specification's Operation object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#operationObject
 * 
 * Example:
 * 
 *  service EchoService {
 *    rpc Echo(SimpleMessage) returns (SimpleMessage) {
 *      option (google.api.http) = {
 *        get: "/v1/example/echo/{id}"
 *      };
 * 
 *      option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_operation) = {
 *        summary: "Get a message.";
 *        operation_id: "getMessage";
 *        tags: "echo";
 *        responses: {
 *          key: "200"
 *            value: {
 *            description: "OK";
 *          }
 *        }
 *      };
 *    }
 *  }
 */
export interface OperationSDKType {
  tags: string[];
  summary: string;
  description: string;
  external_docs: ExternalDocumentationSDKType;
  operation_id: string;
  consumes: string[];
  produces: string[];
  responses: {
    [key: string]: ResponseSDKType;
  };
  schemes: Scheme[];
  deprecated: boolean;
  security: SecurityRequirementSDKType[];
  extensions: {
    [key: string]: ValueSDKType;
  };
}
/**
 * `Header` is a representation of OpenAPI v2 specification's Header object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#headerObject
 */
export interface Header {
  /** `Description` is a short description of the header. */
  description: string;
  /** The type of the object. The value MUST be one of "string", "number", "integer", or "boolean". The "array" type is not supported. */
  type: string;
  /** `Format` The extending format for the previously mentioned type. */
  format: string;
  /**
   * `Default` Declares the value of the header that the server will use if none is provided.
   * See: https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-6.2.
   * Unlike JSON Schema this value MUST conform to the defined type for the header.
   */
  default: string;
  /** 'Pattern' See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.3. */
  pattern: string;
}
export interface HeaderProtoMsg {
  typeUrl: "/grpc.gateway.protoc_gen_openapiv2.options.Header";
  value: Uint8Array;
}
/**
 * `Header` is a representation of OpenAPI v2 specification's Header object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#headerObject
 */
export interface HeaderAmino {
  /** `Description` is a short description of the header. */
  description: string;
  /** The type of the object. The value MUST be one of "string", "number", "integer", or "boolean". The "array" type is not supported. */
  type: string;
  /** `Format` The extending format for the previously mentioned type. */
  format: string;
  /**
   * `Default` Declares the value of the header that the server will use if none is provided.
   * See: https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-6.2.
   * Unlike JSON Schema this value MUST conform to the defined type for the header.
   */
  default: string;
  /** 'Pattern' See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.3. */
  pattern: string;
}
export interface HeaderAminoMsg {
  type: "/grpc.gateway.protoc_gen_openapiv2.options.Header";
  value: HeaderAmino;
}
/**
 * `Header` is a representation of OpenAPI v2 specification's Header object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#headerObject
 */
export interface HeaderSDKType {
  description: string;
  type: string;
  format: string;
  default: string;
  pattern: string;
}
export interface Response_HeadersEntry {
  key: string;
  value: Header;
}
export interface Response_HeadersEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface Response_HeadersEntryAmino {
  key: string;
  value?: HeaderAmino;
}
export interface Response_HeadersEntryAminoMsg {
  type: string;
  value: Response_HeadersEntryAmino;
}
export interface Response_HeadersEntrySDKType {
  key: string;
  value: HeaderSDKType;
}
export interface Response_ExamplesEntry {
  key: string;
  value: string;
}
export interface Response_ExamplesEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface Response_ExamplesEntryAmino {
  key: string;
  value: string;
}
export interface Response_ExamplesEntryAminoMsg {
  type: string;
  value: Response_ExamplesEntryAmino;
}
export interface Response_ExamplesEntrySDKType {
  key: string;
  value: string;
}
export interface Response_ExtensionsEntry {
  key: string;
  value: Value;
}
export interface Response_ExtensionsEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface Response_ExtensionsEntryAmino {
  key: string;
  value?: ValueAmino;
}
export interface Response_ExtensionsEntryAminoMsg {
  type: string;
  value: Response_ExtensionsEntryAmino;
}
export interface Response_ExtensionsEntrySDKType {
  key: string;
  value: ValueSDKType;
}
/**
 * `Response` is a representation of OpenAPI v2 specification's Response object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#responseObject
 */
export interface Response {
  /**
   * `Description` is a short description of the response.
   * GFM syntax can be used for rich text representation.
   */
  description: string;
  /**
   * `Schema` optionally defines the structure of the response.
   * If `Schema` is not provided, it means there is no content to the response.
   */
  schema: Schema;
  /**
   * `Headers` A list of headers that are sent with the response.
   * `Header` name is expected to be a string in the canonical format of the MIME header key
   * See: https://golang.org/pkg/net/textproto/#CanonicalMIMEHeaderKey
   */
  headers: {
    [key: string]: Header;
  };
  /**
   * `Examples` gives per-mimetype response examples.
   * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#example-object
   */
  examples: {
    [key: string]: string;
  };
  extensions: {
    [key: string]: Value;
  };
}
export interface ResponseProtoMsg {
  typeUrl: "/grpc.gateway.protoc_gen_openapiv2.options.Response";
  value: Uint8Array;
}
/**
 * `Response` is a representation of OpenAPI v2 specification's Response object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#responseObject
 */
export interface ResponseAmino {
  /**
   * `Description` is a short description of the response.
   * GFM syntax can be used for rich text representation.
   */
  description: string;
  /**
   * `Schema` optionally defines the structure of the response.
   * If `Schema` is not provided, it means there is no content to the response.
   */
  schema?: SchemaAmino;
  /**
   * `Headers` A list of headers that are sent with the response.
   * `Header` name is expected to be a string in the canonical format of the MIME header key
   * See: https://golang.org/pkg/net/textproto/#CanonicalMIMEHeaderKey
   */
  headers?: {
    [key: string]: HeaderAmino;
  };
  /**
   * `Examples` gives per-mimetype response examples.
   * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#example-object
   */
  examples: {
    [key: string]: string;
  };
  extensions?: {
    [key: string]: ValueAmino;
  };
}
export interface ResponseAminoMsg {
  type: "/grpc.gateway.protoc_gen_openapiv2.options.Response";
  value: ResponseAmino;
}
/**
 * `Response` is a representation of OpenAPI v2 specification's Response object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#responseObject
 */
export interface ResponseSDKType {
  description: string;
  schema: SchemaSDKType;
  headers: {
    [key: string]: HeaderSDKType;
  };
  examples: {
    [key: string]: string;
  };
  extensions: {
    [key: string]: ValueSDKType;
  };
}
export interface Info_ExtensionsEntry {
  key: string;
  value: Value;
}
export interface Info_ExtensionsEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface Info_ExtensionsEntryAmino {
  key: string;
  value?: ValueAmino;
}
export interface Info_ExtensionsEntryAminoMsg {
  type: string;
  value: Info_ExtensionsEntryAmino;
}
export interface Info_ExtensionsEntrySDKType {
  key: string;
  value: ValueSDKType;
}
/**
 * `Info` is a representation of OpenAPI v2 specification's Info object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#infoObject
 * 
 * Example:
 * 
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      title: "Echo API";
 *      version: "1.0";
 *      description: ";
 *      contact: {
 *        name: "gRPC-Gateway project";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *        email: "none@example.com";
 *      };
 *      license: {
 *        name: "BSD 3-Clause License";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/master/LICENSE.txt";
 *      };
 *    };
 *    ...
 *  };
 */
export interface Info {
  /** The title of the application. */
  title: string;
  /**
   * A short description of the application. GFM syntax can be used for rich
   * text representation.
   */
  description: string;
  /** The Terms of Service for the API. */
  termsOfService: string;
  /** The contact information for the exposed API. */
  contact: Contact;
  /** The license information for the exposed API. */
  license: License;
  /**
   * Provides the version of the application API (not to be confused
   * with the specification version).
   */
  version: string;
  extensions: {
    [key: string]: Value;
  };
}
export interface InfoProtoMsg {
  typeUrl: "/grpc.gateway.protoc_gen_openapiv2.options.Info";
  value: Uint8Array;
}
/**
 * `Info` is a representation of OpenAPI v2 specification's Info object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#infoObject
 * 
 * Example:
 * 
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      title: "Echo API";
 *      version: "1.0";
 *      description: ";
 *      contact: {
 *        name: "gRPC-Gateway project";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *        email: "none@example.com";
 *      };
 *      license: {
 *        name: "BSD 3-Clause License";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/master/LICENSE.txt";
 *      };
 *    };
 *    ...
 *  };
 */
export interface InfoAmino {
  /** The title of the application. */
  title: string;
  /**
   * A short description of the application. GFM syntax can be used for rich
   * text representation.
   */
  description: string;
  /** The Terms of Service for the API. */
  terms_of_service: string;
  /** The contact information for the exposed API. */
  contact?: ContactAmino;
  /** The license information for the exposed API. */
  license?: LicenseAmino;
  /**
   * Provides the version of the application API (not to be confused
   * with the specification version).
   */
  version: string;
  extensions?: {
    [key: string]: ValueAmino;
  };
}
export interface InfoAminoMsg {
  type: "/grpc.gateway.protoc_gen_openapiv2.options.Info";
  value: InfoAmino;
}
/**
 * `Info` is a representation of OpenAPI v2 specification's Info object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#infoObject
 * 
 * Example:
 * 
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      title: "Echo API";
 *      version: "1.0";
 *      description: ";
 *      contact: {
 *        name: "gRPC-Gateway project";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *        email: "none@example.com";
 *      };
 *      license: {
 *        name: "BSD 3-Clause License";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/master/LICENSE.txt";
 *      };
 *    };
 *    ...
 *  };
 */
export interface InfoSDKType {
  title: string;
  description: string;
  terms_of_service: string;
  contact: ContactSDKType;
  license: LicenseSDKType;
  version: string;
  extensions: {
    [key: string]: ValueSDKType;
  };
}
/**
 * `Contact` is a representation of OpenAPI v2 specification's Contact object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#contactObject
 * 
 * Example:
 * 
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      ...
 *      contact: {
 *        name: "gRPC-Gateway project";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *        email: "none@example.com";
 *      };
 *      ...
 *    };
 *    ...
 *  };
 */
export interface Contact {
  /** The identifying name of the contact person/organization. */
  name: string;
  /**
   * The URL pointing to the contact information. MUST be in the format of a
   * URL.
   */
  url: string;
  /**
   * The email address of the contact person/organization. MUST be in the format
   * of an email address.
   */
  email: string;
}
export interface ContactProtoMsg {
  typeUrl: "/grpc.gateway.protoc_gen_openapiv2.options.Contact";
  value: Uint8Array;
}
/**
 * `Contact` is a representation of OpenAPI v2 specification's Contact object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#contactObject
 * 
 * Example:
 * 
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      ...
 *      contact: {
 *        name: "gRPC-Gateway project";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *        email: "none@example.com";
 *      };
 *      ...
 *    };
 *    ...
 *  };
 */
export interface ContactAmino {
  /** The identifying name of the contact person/organization. */
  name: string;
  /**
   * The URL pointing to the contact information. MUST be in the format of a
   * URL.
   */
  url: string;
  /**
   * The email address of the contact person/organization. MUST be in the format
   * of an email address.
   */
  email: string;
}
export interface ContactAminoMsg {
  type: "/grpc.gateway.protoc_gen_openapiv2.options.Contact";
  value: ContactAmino;
}
/**
 * `Contact` is a representation of OpenAPI v2 specification's Contact object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#contactObject
 * 
 * Example:
 * 
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      ...
 *      contact: {
 *        name: "gRPC-Gateway project";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *        email: "none@example.com";
 *      };
 *      ...
 *    };
 *    ...
 *  };
 */
export interface ContactSDKType {
  name: string;
  url: string;
  email: string;
}
/**
 * `License` is a representation of OpenAPI v2 specification's License object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#licenseObject
 * 
 * Example:
 * 
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      ...
 *      license: {
 *        name: "BSD 3-Clause License";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/master/LICENSE.txt";
 *      };
 *      ...
 *    };
 *    ...
 *  };
 */
export interface License {
  /** The license name used for the API. */
  name: string;
  /** A URL to the license used for the API. MUST be in the format of a URL. */
  url: string;
}
export interface LicenseProtoMsg {
  typeUrl: "/grpc.gateway.protoc_gen_openapiv2.options.License";
  value: Uint8Array;
}
/**
 * `License` is a representation of OpenAPI v2 specification's License object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#licenseObject
 * 
 * Example:
 * 
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      ...
 *      license: {
 *        name: "BSD 3-Clause License";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/master/LICENSE.txt";
 *      };
 *      ...
 *    };
 *    ...
 *  };
 */
export interface LicenseAmino {
  /** The license name used for the API. */
  name: string;
  /** A URL to the license used for the API. MUST be in the format of a URL. */
  url: string;
}
export interface LicenseAminoMsg {
  type: "/grpc.gateway.protoc_gen_openapiv2.options.License";
  value: LicenseAmino;
}
/**
 * `License` is a representation of OpenAPI v2 specification's License object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#licenseObject
 * 
 * Example:
 * 
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      ...
 *      license: {
 *        name: "BSD 3-Clause License";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/master/LICENSE.txt";
 *      };
 *      ...
 *    };
 *    ...
 *  };
 */
export interface LicenseSDKType {
  name: string;
  url: string;
}
/**
 * `ExternalDocumentation` is a representation of OpenAPI v2 specification's
 * ExternalDocumentation object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#externalDocumentationObject
 * 
 * Example:
 * 
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    ...
 *    external_docs: {
 *      description: "More about gRPC-Gateway";
 *      url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *    }
 *    ...
 *  };
 */
export interface ExternalDocumentation {
  /**
   * A short description of the target documentation. GFM syntax can be used for
   * rich text representation.
   */
  description: string;
  /**
   * The URL for the target documentation. Value MUST be in the format
   * of a URL.
   */
  url: string;
}
export interface ExternalDocumentationProtoMsg {
  typeUrl: "/grpc.gateway.protoc_gen_openapiv2.options.ExternalDocumentation";
  value: Uint8Array;
}
/**
 * `ExternalDocumentation` is a representation of OpenAPI v2 specification's
 * ExternalDocumentation object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#externalDocumentationObject
 * 
 * Example:
 * 
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    ...
 *    external_docs: {
 *      description: "More about gRPC-Gateway";
 *      url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *    }
 *    ...
 *  };
 */
export interface ExternalDocumentationAmino {
  /**
   * A short description of the target documentation. GFM syntax can be used for
   * rich text representation.
   */
  description: string;
  /**
   * The URL for the target documentation. Value MUST be in the format
   * of a URL.
   */
  url: string;
}
export interface ExternalDocumentationAminoMsg {
  type: "/grpc.gateway.protoc_gen_openapiv2.options.ExternalDocumentation";
  value: ExternalDocumentationAmino;
}
/**
 * `ExternalDocumentation` is a representation of OpenAPI v2 specification's
 * ExternalDocumentation object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#externalDocumentationObject
 * 
 * Example:
 * 
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    ...
 *    external_docs: {
 *      description: "More about gRPC-Gateway";
 *      url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *    }
 *    ...
 *  };
 */
export interface ExternalDocumentationSDKType {
  description: string;
  url: string;
}
/**
 * `Schema` is a representation of OpenAPI v2 specification's Schema object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
 */
export interface Schema {
  jsonSchema: JSONSchema;
  /**
   * Adds support for polymorphism. The discriminator is the schema property
   * name that is used to differentiate between other schema that inherit this
   * schema. The property name used MUST be defined at this schema and it MUST
   * be in the required property list. When used, the value MUST be the name of
   * this schema or any schema that inherits it.
   */
  discriminator: string;
  /**
   * Relevant only for Schema "properties" definitions. Declares the property as
   * "read only". This means that it MAY be sent as part of a response but MUST
   * NOT be sent as part of the request. Properties marked as readOnly being
   * true SHOULD NOT be in the required list of the defined schema. Default
   * value is false.
   */
  readOnly: boolean;
  /** Additional external documentation for this schema. */
  externalDocs: ExternalDocumentation;
  /**
   * A free-form property to include an example of an instance for this schema in JSON.
   * This is copied verbatim to the output.
   */
  example: string;
}
export interface SchemaProtoMsg {
  typeUrl: "/grpc.gateway.protoc_gen_openapiv2.options.Schema";
  value: Uint8Array;
}
/**
 * `Schema` is a representation of OpenAPI v2 specification's Schema object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
 */
export interface SchemaAmino {
  json_schema?: JSONSchemaAmino;
  /**
   * Adds support for polymorphism. The discriminator is the schema property
   * name that is used to differentiate between other schema that inherit this
   * schema. The property name used MUST be defined at this schema and it MUST
   * be in the required property list. When used, the value MUST be the name of
   * this schema or any schema that inherits it.
   */
  discriminator: string;
  /**
   * Relevant only for Schema "properties" definitions. Declares the property as
   * "read only". This means that it MAY be sent as part of a response but MUST
   * NOT be sent as part of the request. Properties marked as readOnly being
   * true SHOULD NOT be in the required list of the defined schema. Default
   * value is false.
   */
  read_only: boolean;
  /** Additional external documentation for this schema. */
  external_docs?: ExternalDocumentationAmino;
  /**
   * A free-form property to include an example of an instance for this schema in JSON.
   * This is copied verbatim to the output.
   */
  example: string;
}
export interface SchemaAminoMsg {
  type: "/grpc.gateway.protoc_gen_openapiv2.options.Schema";
  value: SchemaAmino;
}
/**
 * `Schema` is a representation of OpenAPI v2 specification's Schema object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
 */
export interface SchemaSDKType {
  json_schema: JSONSchemaSDKType;
  discriminator: string;
  read_only: boolean;
  external_docs: ExternalDocumentationSDKType;
  example: string;
}
/**
 * `JSONSchema` represents properties from JSON Schema taken, and as used, in
 * the OpenAPI v2 spec.
 * 
 * This includes changes made by OpenAPI v2.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
 * 
 * See also: https://cswr.github.io/JsonSchema/spec/basic_types/,
 * https://github.com/json-schema-org/json-schema-spec/blob/master/schema.json
 * 
 * Example:
 * 
 *  message SimpleMessage {
 *    option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_schema) = {
 *      json_schema: {
 *        title: "SimpleMessage"
 *        description: "A simple message."
 *        required: ["id"]
 *      }
 *    };
 * 
 *    // Id represents the message identifier.
 *    string id = 1; [
 *        (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_field) = {
 *          {description: "The unique identifier of the simple message."
 *        }];
 *  }
 */
export interface JSONSchema {
  /**
   * Ref is used to define an external reference to include in the message.
   * This could be a fully qualified proto message reference, and that type must
   * be imported into the protofile. If no message is identified, the Ref will
   * be used verbatim in the output.
   * For example:
   *  `ref: ".google.protobuf.Timestamp"`.
   */
  ref: string;
  /** The title of the schema. */
  title: string;
  /** A short description of the schema. */
  description: string;
  default: string;
  readOnly: boolean;
  /**
   * A free-form property to include a JSON example of this field. This is copied
   * verbatim to the output swagger.json. Quotes must be escaped.
   * This property is the same for 2.0 and 3.0.0 https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/3.0.0.md#schemaObject  https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
   */
  example: string;
  multipleOf: number;
  /**
   * Maximum represents an inclusive upper limit for a numeric instance. The
   * value of MUST be a number,
   */
  maximum: number;
  exclusiveMaximum: boolean;
  /**
   * minimum represents an inclusive lower limit for a numeric instance. The
   * value of MUST be a number,
   */
  minimum: number;
  exclusiveMinimum: boolean;
  maxLength: Long;
  minLength: Long;
  pattern: string;
  maxItems: Long;
  minItems: Long;
  uniqueItems: boolean;
  maxProperties: Long;
  minProperties: Long;
  required: string[];
  /** Items in 'array' must be unique. */
  array: string[];
  type: JSONSchema_JSONSchemaSimpleTypes[];
  /** `Format` */
  format: string;
  /** Items in `enum` must be unique https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.5.1 */
  enum: string[];
}
export interface JSONSchemaProtoMsg {
  typeUrl: "/grpc.gateway.protoc_gen_openapiv2.options.JSONSchema";
  value: Uint8Array;
}
/**
 * `JSONSchema` represents properties from JSON Schema taken, and as used, in
 * the OpenAPI v2 spec.
 * 
 * This includes changes made by OpenAPI v2.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
 * 
 * See also: https://cswr.github.io/JsonSchema/spec/basic_types/,
 * https://github.com/json-schema-org/json-schema-spec/blob/master/schema.json
 * 
 * Example:
 * 
 *  message SimpleMessage {
 *    option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_schema) = {
 *      json_schema: {
 *        title: "SimpleMessage"
 *        description: "A simple message."
 *        required: ["id"]
 *      }
 *    };
 * 
 *    // Id represents the message identifier.
 *    string id = 1; [
 *        (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_field) = {
 *          {description: "The unique identifier of the simple message."
 *        }];
 *  }
 */
export interface JSONSchemaAmino {
  /**
   * Ref is used to define an external reference to include in the message.
   * This could be a fully qualified proto message reference, and that type must
   * be imported into the protofile. If no message is identified, the Ref will
   * be used verbatim in the output.
   * For example:
   *  `ref: ".google.protobuf.Timestamp"`.
   */
  ref: string;
  /** The title of the schema. */
  title: string;
  /** A short description of the schema. */
  description: string;
  default: string;
  read_only: boolean;
  /**
   * A free-form property to include a JSON example of this field. This is copied
   * verbatim to the output swagger.json. Quotes must be escaped.
   * This property is the same for 2.0 and 3.0.0 https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/3.0.0.md#schemaObject  https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
   */
  example: string;
  multiple_of: number;
  /**
   * Maximum represents an inclusive upper limit for a numeric instance. The
   * value of MUST be a number,
   */
  maximum: number;
  exclusive_maximum: boolean;
  /**
   * minimum represents an inclusive lower limit for a numeric instance. The
   * value of MUST be a number,
   */
  minimum: number;
  exclusive_minimum: boolean;
  max_length: string;
  min_length: string;
  pattern: string;
  max_items: string;
  min_items: string;
  unique_items: boolean;
  max_properties: string;
  min_properties: string;
  required: string[];
  /** Items in 'array' must be unique. */
  array: string[];
  type: JSONSchema_JSONSchemaSimpleTypes[];
  /** `Format` */
  format: string;
  /** Items in `enum` must be unique https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.5.1 */
  enum: string[];
}
export interface JSONSchemaAminoMsg {
  type: "/grpc.gateway.protoc_gen_openapiv2.options.JSONSchema";
  value: JSONSchemaAmino;
}
/**
 * `JSONSchema` represents properties from JSON Schema taken, and as used, in
 * the OpenAPI v2 spec.
 * 
 * This includes changes made by OpenAPI v2.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
 * 
 * See also: https://cswr.github.io/JsonSchema/spec/basic_types/,
 * https://github.com/json-schema-org/json-schema-spec/blob/master/schema.json
 * 
 * Example:
 * 
 *  message SimpleMessage {
 *    option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_schema) = {
 *      json_schema: {
 *        title: "SimpleMessage"
 *        description: "A simple message."
 *        required: ["id"]
 *      }
 *    };
 * 
 *    // Id represents the message identifier.
 *    string id = 1; [
 *        (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_field) = {
 *          {description: "The unique identifier of the simple message."
 *        }];
 *  }
 */
export interface JSONSchemaSDKType {
  ref: string;
  title: string;
  description: string;
  default: string;
  read_only: boolean;
  example: string;
  multiple_of: number;
  maximum: number;
  exclusive_maximum: boolean;
  minimum: number;
  exclusive_minimum: boolean;
  max_length: Long;
  min_length: Long;
  pattern: string;
  max_items: Long;
  min_items: Long;
  unique_items: boolean;
  max_properties: Long;
  min_properties: Long;
  required: string[];
  array: string[];
  type: JSONSchema_JSONSchemaSimpleTypes[];
  format: string;
  enum: string[];
}
/**
 * `Tag` is a representation of OpenAPI v2 specification's Tag object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#tagObject
 */
export interface Tag {
  /**
   * A short description for the tag. GFM syntax can be used for rich text
   * representation.
   */
  description: string;
  /** Additional external documentation for this tag. */
  externalDocs: ExternalDocumentation;
}
export interface TagProtoMsg {
  typeUrl: "/grpc.gateway.protoc_gen_openapiv2.options.Tag";
  value: Uint8Array;
}
/**
 * `Tag` is a representation of OpenAPI v2 specification's Tag object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#tagObject
 */
export interface TagAmino {
  /**
   * A short description for the tag. GFM syntax can be used for rich text
   * representation.
   */
  description: string;
  /** Additional external documentation for this tag. */
  external_docs?: ExternalDocumentationAmino;
}
export interface TagAminoMsg {
  type: "/grpc.gateway.protoc_gen_openapiv2.options.Tag";
  value: TagAmino;
}
/**
 * `Tag` is a representation of OpenAPI v2 specification's Tag object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#tagObject
 */
export interface TagSDKType {
  description: string;
  external_docs: ExternalDocumentationSDKType;
}
export interface SecurityDefinitions_SecurityEntry {
  key: string;
  value: SecurityScheme;
}
export interface SecurityDefinitions_SecurityEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface SecurityDefinitions_SecurityEntryAmino {
  key: string;
  value?: SecuritySchemeAmino;
}
export interface SecurityDefinitions_SecurityEntryAminoMsg {
  type: string;
  value: SecurityDefinitions_SecurityEntryAmino;
}
export interface SecurityDefinitions_SecurityEntrySDKType {
  key: string;
  value: SecuritySchemeSDKType;
}
/**
 * `SecurityDefinitions` is a representation of OpenAPI v2 specification's
 * Security Definitions object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securityDefinitionsObject
 * 
 * A declaration of the security schemes available to be used in the
 * specification. This does not enforce the security schemes on the operations
 * and only serves to provide the relevant details for each scheme.
 */
export interface SecurityDefinitions {
  /**
   * A single security scheme definition, mapping a "name" to the scheme it
   * defines.
   */
  security: {
    [key: string]: SecurityScheme;
  };
}
export interface SecurityDefinitionsProtoMsg {
  typeUrl: "/grpc.gateway.protoc_gen_openapiv2.options.SecurityDefinitions";
  value: Uint8Array;
}
/**
 * `SecurityDefinitions` is a representation of OpenAPI v2 specification's
 * Security Definitions object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securityDefinitionsObject
 * 
 * A declaration of the security schemes available to be used in the
 * specification. This does not enforce the security schemes on the operations
 * and only serves to provide the relevant details for each scheme.
 */
export interface SecurityDefinitionsAmino {
  /**
   * A single security scheme definition, mapping a "name" to the scheme it
   * defines.
   */
  security?: {
    [key: string]: SecuritySchemeAmino;
  };
}
export interface SecurityDefinitionsAminoMsg {
  type: "/grpc.gateway.protoc_gen_openapiv2.options.SecurityDefinitions";
  value: SecurityDefinitionsAmino;
}
/**
 * `SecurityDefinitions` is a representation of OpenAPI v2 specification's
 * Security Definitions object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securityDefinitionsObject
 * 
 * A declaration of the security schemes available to be used in the
 * specification. This does not enforce the security schemes on the operations
 * and only serves to provide the relevant details for each scheme.
 */
export interface SecurityDefinitionsSDKType {
  security: {
    [key: string]: SecuritySchemeSDKType;
  };
}
export interface SecurityScheme_ExtensionsEntry {
  key: string;
  value: Value;
}
export interface SecurityScheme_ExtensionsEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface SecurityScheme_ExtensionsEntryAmino {
  key: string;
  value?: ValueAmino;
}
export interface SecurityScheme_ExtensionsEntryAminoMsg {
  type: string;
  value: SecurityScheme_ExtensionsEntryAmino;
}
export interface SecurityScheme_ExtensionsEntrySDKType {
  key: string;
  value: ValueSDKType;
}
/**
 * `SecurityScheme` is a representation of OpenAPI v2 specification's
 * Security Scheme object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securitySchemeObject
 * 
 * Allows the definition of a security scheme that can be used by the
 * operations. Supported schemes are basic authentication, an API key (either as
 * a header or as a query parameter) and OAuth2's common flows (implicit,
 * password, application and access code).
 */
export interface SecurityScheme {
  /**
   * The type of the security scheme. Valid values are "basic",
   * "apiKey" or "oauth2".
   */
  type: SecurityScheme_Type;
  /** A short description for security scheme. */
  description: string;
  /**
   * The name of the header or query parameter to be used.
   * Valid for apiKey.
   */
  name: string;
  /**
   * The location of the API key. Valid values are "query" or
   * "header".
   * Valid for apiKey.
   */
  in: SecurityScheme_In;
  /**
   * The flow used by the OAuth2 security scheme. Valid values are
   * "implicit", "password", "application" or "accessCode".
   * Valid for oauth2.
   */
  flow: SecurityScheme_Flow;
  /**
   * The authorization URL to be used for this flow. This SHOULD be in
   * the form of a URL.
   * Valid for oauth2/implicit and oauth2/accessCode.
   */
  authorizationUrl: string;
  /**
   * The token URL to be used for this flow. This SHOULD be in the
   * form of a URL.
   * Valid for oauth2/password, oauth2/application and oauth2/accessCode.
   */
  tokenUrl: string;
  /**
   * The available scopes for the OAuth2 security scheme.
   * Valid for oauth2.
   */
  scopes: Scopes;
  extensions: {
    [key: string]: Value;
  };
}
export interface SecuritySchemeProtoMsg {
  typeUrl: "/grpc.gateway.protoc_gen_openapiv2.options.SecurityScheme";
  value: Uint8Array;
}
/**
 * `SecurityScheme` is a representation of OpenAPI v2 specification's
 * Security Scheme object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securitySchemeObject
 * 
 * Allows the definition of a security scheme that can be used by the
 * operations. Supported schemes are basic authentication, an API key (either as
 * a header or as a query parameter) and OAuth2's common flows (implicit,
 * password, application and access code).
 */
export interface SecuritySchemeAmino {
  /**
   * The type of the security scheme. Valid values are "basic",
   * "apiKey" or "oauth2".
   */
  type: SecurityScheme_Type;
  /** A short description for security scheme. */
  description: string;
  /**
   * The name of the header or query parameter to be used.
   * Valid for apiKey.
   */
  name: string;
  /**
   * The location of the API key. Valid values are "query" or
   * "header".
   * Valid for apiKey.
   */
  in: SecurityScheme_In;
  /**
   * The flow used by the OAuth2 security scheme. Valid values are
   * "implicit", "password", "application" or "accessCode".
   * Valid for oauth2.
   */
  flow: SecurityScheme_Flow;
  /**
   * The authorization URL to be used for this flow. This SHOULD be in
   * the form of a URL.
   * Valid for oauth2/implicit and oauth2/accessCode.
   */
  authorization_url: string;
  /**
   * The token URL to be used for this flow. This SHOULD be in the
   * form of a URL.
   * Valid for oauth2/password, oauth2/application and oauth2/accessCode.
   */
  token_url: string;
  /**
   * The available scopes for the OAuth2 security scheme.
   * Valid for oauth2.
   */
  scopes?: ScopesAmino;
  extensions?: {
    [key: string]: ValueAmino;
  };
}
export interface SecuritySchemeAminoMsg {
  type: "/grpc.gateway.protoc_gen_openapiv2.options.SecurityScheme";
  value: SecuritySchemeAmino;
}
/**
 * `SecurityScheme` is a representation of OpenAPI v2 specification's
 * Security Scheme object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securitySchemeObject
 * 
 * Allows the definition of a security scheme that can be used by the
 * operations. Supported schemes are basic authentication, an API key (either as
 * a header or as a query parameter) and OAuth2's common flows (implicit,
 * password, application and access code).
 */
export interface SecuritySchemeSDKType {
  type: SecurityScheme_Type;
  description: string;
  name: string;
  in: SecurityScheme_In;
  flow: SecurityScheme_Flow;
  authorization_url: string;
  token_url: string;
  scopes: ScopesSDKType;
  extensions: {
    [key: string]: ValueSDKType;
  };
}
export interface SecurityRequirement_SecurityRequirementEntry {
  key: string;
  value: SecurityRequirementValue;
}
export interface SecurityRequirement_SecurityRequirementEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface SecurityRequirement_SecurityRequirementEntryAmino {
  key: string;
  value?: SecurityRequirementValueAmino;
}
export interface SecurityRequirement_SecurityRequirementEntryAminoMsg {
  type: string;
  value: SecurityRequirement_SecurityRequirementEntryAmino;
}
export interface SecurityRequirement_SecurityRequirementEntrySDKType {
  key: string;
  value: SecurityRequirementValueSDKType;
}
/**
 * `SecurityRequirement` is a representation of OpenAPI v2 specification's
 * Security Requirement object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securityRequirementObject
 * 
 * Lists the required security schemes to execute this operation. The object can
 * have multiple security schemes declared in it which are all required (that
 * is, there is a logical AND between the schemes).
 * 
 * The name used for each property MUST correspond to a security scheme
 * declared in the Security Definitions.
 */
export interface SecurityRequirement {
  /**
   * Each name must correspond to a security scheme which is declared in
   * the Security Definitions. If the security scheme is of type "oauth2",
   * then the value is a list of scope names required for the execution.
   * For other security scheme types, the array MUST be empty.
   */
  securityRequirement: {
    [key: string]: SecurityRequirement_SecurityRequirementValue;
  };
}
export interface SecurityRequirementProtoMsg {
  typeUrl: "/grpc.gateway.protoc_gen_openapiv2.options.SecurityRequirement";
  value: Uint8Array;
}
/**
 * `SecurityRequirement` is a representation of OpenAPI v2 specification's
 * Security Requirement object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securityRequirementObject
 * 
 * Lists the required security schemes to execute this operation. The object can
 * have multiple security schemes declared in it which are all required (that
 * is, there is a logical AND between the schemes).
 * 
 * The name used for each property MUST correspond to a security scheme
 * declared in the Security Definitions.
 */
export interface SecurityRequirementAmino {
  /**
   * Each name must correspond to a security scheme which is declared in
   * the Security Definitions. If the security scheme is of type "oauth2",
   * then the value is a list of scope names required for the execution.
   * For other security scheme types, the array MUST be empty.
   */
  security_requirement?: {
    [key: string]: SecurityRequirement_SecurityRequirementValueAmino;
  };
}
export interface SecurityRequirementAminoMsg {
  type: "/grpc.gateway.protoc_gen_openapiv2.options.SecurityRequirement";
  value: SecurityRequirementAmino;
}
/**
 * `SecurityRequirement` is a representation of OpenAPI v2 specification's
 * Security Requirement object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securityRequirementObject
 * 
 * Lists the required security schemes to execute this operation. The object can
 * have multiple security schemes declared in it which are all required (that
 * is, there is a logical AND between the schemes).
 * 
 * The name used for each property MUST correspond to a security scheme
 * declared in the Security Definitions.
 */
export interface SecurityRequirementSDKType {
  security_requirement: {
    [key: string]: SecurityRequirement_SecurityRequirementValueSDKType;
  };
}
/**
 * If the security scheme is of type "oauth2", then the value is a list of
 * scope names required for the execution. For other security scheme types,
 * the array MUST be empty.
 */
export interface SecurityRequirement_SecurityRequirementValue {
  scope: string[];
}
export interface SecurityRequirement_SecurityRequirementValueProtoMsg {
  typeUrl: "/grpc.gateway.protoc_gen_openapiv2.options.SecurityRequirementValue";
  value: Uint8Array;
}
/**
 * If the security scheme is of type "oauth2", then the value is a list of
 * scope names required for the execution. For other security scheme types,
 * the array MUST be empty.
 */
export interface SecurityRequirement_SecurityRequirementValueAmino {
  scope: string[];
}
export interface SecurityRequirement_SecurityRequirementValueAminoMsg {
  type: "/grpc.gateway.protoc_gen_openapiv2.options.SecurityRequirementValue";
  value: SecurityRequirement_SecurityRequirementValueAmino;
}
/**
 * If the security scheme is of type "oauth2", then the value is a list of
 * scope names required for the execution. For other security scheme types,
 * the array MUST be empty.
 */
export interface SecurityRequirement_SecurityRequirementValueSDKType {
  scope: string[];
}
export interface Scopes_ScopeEntry {
  key: string;
  value: string;
}
export interface Scopes_ScopeEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface Scopes_ScopeEntryAmino {
  key: string;
  value: string;
}
export interface Scopes_ScopeEntryAminoMsg {
  type: string;
  value: Scopes_ScopeEntryAmino;
}
export interface Scopes_ScopeEntrySDKType {
  key: string;
  value: string;
}
/**
 * `Scopes` is a representation of OpenAPI v2 specification's Scopes object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#scopesObject
 * 
 * Lists the available scopes for an OAuth2 security scheme.
 */
export interface Scopes {
  /**
   * Maps between a name of a scope to a short description of it (as the value
   * of the property).
   */
  scope: {
    [key: string]: string;
  };
}
export interface ScopesProtoMsg {
  typeUrl: "/grpc.gateway.protoc_gen_openapiv2.options.Scopes";
  value: Uint8Array;
}
/**
 * `Scopes` is a representation of OpenAPI v2 specification's Scopes object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#scopesObject
 * 
 * Lists the available scopes for an OAuth2 security scheme.
 */
export interface ScopesAmino {
  /**
   * Maps between a name of a scope to a short description of it (as the value
   * of the property).
   */
  scope: {
    [key: string]: string;
  };
}
export interface ScopesAminoMsg {
  type: "/grpc.gateway.protoc_gen_openapiv2.options.Scopes";
  value: ScopesAmino;
}
/**
 * `Scopes` is a representation of OpenAPI v2 specification's Scopes object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#scopesObject
 * 
 * Lists the available scopes for an OAuth2 security scheme.
 */
export interface ScopesSDKType {
  scope: {
    [key: string]: string;
  };
}