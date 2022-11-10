--! Previous: -
--! Hash: sha1:07039c1f7e5327105f926f5d9288c9e3f97b876f

CREATE SCHEMA IF NOT EXISTS app;
SET SCHEMA 'app';

ALTER TABLE IF EXISTS ONLY app.authz_execs DROP CONSTRAINT IF EXISTS authz_execs_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY app.authz_execs DROP CONSTRAINT IF EXISTS authz_execs_message_id_fkey;
ALTER TABLE IF EXISTS ONLY app.authz_execs DROP CONSTRAINT IF EXISTS authz_execs_block_id_fkey;
ALTER TABLE IF EXISTS ONLY app.authz_exec_messages DROP CONSTRAINT IF EXISTS authz_exec_messages_message_id_fkey;
ALTER TABLE IF EXISTS ONLY app.authz_exec_messages DROP CONSTRAINT IF EXISTS authz_exec_messages_authz_exec_id_fkey;
DROP INDEX IF EXISTS app.authz_execs_transaction_id;
DROP INDEX IF EXISTS app.authz_execs_message_id;
DROP INDEX IF EXISTS app.authz_execs_grantee;
DROP INDEX IF EXISTS app.authz_execs_block_id;
DROP INDEX IF EXISTS app.authz_exec_messages_message_id;
DROP INDEX IF EXISTS app.authz_exec_messages_authz_exec_id;
ALTER TABLE IF EXISTS ONLY app.authz_execs DROP CONSTRAINT IF EXISTS authz_execs_pkey;
ALTER TABLE IF EXISTS ONLY app.authz_exec_messages DROP CONSTRAINT IF EXISTS authz_exec_messages_pkey;
DROP TABLE IF EXISTS app.authz_execs;
DROP TABLE IF EXISTS app.authz_exec_messages;

--
-- Name: authz_exec_messages; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.authz_exec_messages (
    id text NOT NULL,
    authz_exec_id text NOT NULL,
    message_id text NOT NULL
);


ALTER TABLE app.authz_exec_messages OWNER TO subquery;

--
-- Name: authz_execs; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.authz_execs (
    id text NOT NULL,
    grantee text NOT NULL,
    message_id text NOT NULL,
    transaction_id text NOT NULL,
    block_id text NOT NULL
);


ALTER TABLE app.authz_execs OWNER TO subquery;

--
-- Name: authz_exec_messages authz_exec_messages_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.authz_exec_messages
    ADD CONSTRAINT authz_exec_messages_pkey PRIMARY KEY (id);


--
-- Name: authz_execs authz_execs_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.authz_execs
    ADD CONSTRAINT authz_execs_pkey PRIMARY KEY (id);


--
-- Name: authz_exec_messages_authz_exec_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX authz_exec_messages_authz_exec_id ON app.authz_exec_messages USING hash (authz_exec_id);


--
-- Name: authz_exec_messages_message_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX authz_exec_messages_message_id ON app.authz_exec_messages USING hash (message_id);


--
-- Name: authz_execs_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX authz_execs_block_id ON app.authz_execs USING hash (block_id);


--
-- Name: authz_execs_grantee; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX authz_execs_grantee ON app.authz_execs USING btree (grantee);


--
-- Name: authz_execs_message_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX authz_execs_message_id ON app.authz_execs USING hash (message_id);


--
-- Name: authz_execs_transaction_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX authz_execs_transaction_id ON app.authz_execs USING hash (transaction_id);


--
-- Name: authz_exec_messages authz_exec_messages_authz_exec_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.authz_exec_messages
    ADD CONSTRAINT authz_exec_messages_authz_exec_id_fkey FOREIGN KEY (authz_exec_id) REFERENCES app.authz_execs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CONSTRAINT authz_exec_messages_authz_exec_id_fkey ON authz_exec_messages; Type: COMMENT; Schema: app; Owner: subquery
--

COMMENT ON CONSTRAINT authz_exec_messages_authz_exec_id_fkey ON app.authz_exec_messages IS '@foreignFieldName subMessages';


--
-- Name: authz_exec_messages authz_exec_messages_message_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.authz_exec_messages
    ADD CONSTRAINT authz_exec_messages_message_id_fkey FOREIGN KEY (message_id) REFERENCES app.messages(id) ON UPDATE CASCADE;


--
-- Name: authz_execs authz_execs_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.authz_execs
    ADD CONSTRAINT authz_execs_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE;


--
-- Name: authz_execs authz_execs_message_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.authz_execs
    ADD CONSTRAINT authz_execs_message_id_fkey FOREIGN KEY (message_id) REFERENCES app.messages(id) ON UPDATE CASCADE;


--
-- Name: authz_execs authz_execs_transaction_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.authz_execs
    ADD CONSTRAINT authz_execs_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES app.transactions(id) ON UPDATE CASCADE;

CREATE EXTENSION plv8;
DROP FUNCTION IF EXISTS plv8ify_migrationAddAuthzSupport();
CREATE OR REPLACE FUNCTION plv8ify_migrationAddAuthzSupport() RETURNS JSONB AS $plv8ify$
var plv8ify = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __pow = Math.pow;
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));
  var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports2) {
      "use strict";
      exports2.byteLength = byteLength;
      exports2.toByteArray = toByteArray;
      exports2.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1)
          validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports2) {
      exports2.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports2.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports2) {
      "use strict";
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports2.Buffer = Buffer3;
      exports2.SlowBuffer = SlowBuffer;
      exports2.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports2.kMaxLength = K_MAX_LENGTH;
      Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer3.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this))
            return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer3.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this))
            return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function Buffer3(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer3.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer3.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b)
          return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer3.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer3, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer3.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer3.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer3.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer3.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer3.alloc(+length);
      }
      Buffer3.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer3.prototype;
      };
      Buffer3.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array))
          a = Buffer3.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array))
          b = Buffer3.from(b, b.offset, b.byteLength);
        if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b)
          return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      Buffer3.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer3.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer3.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer3.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer3.isBuffer(buf))
                buf = Buffer3.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer3.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer3.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0)
          return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding)
          encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer3.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer3.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer3.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer3.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0)
          return "";
        if (arguments.length === 0)
          return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
      Buffer3.prototype.equals = function equals(b) {
        if (!Buffer3.isBuffer(b))
          throw new TypeError("Argument must be a Buffer");
        if (this === b)
          return true;
        return Buffer3.compare(this, b) === 0;
      };
      Buffer3.prototype.inspect = function inspect() {
        let str = "";
        const max = exports2.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max)
          str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
      }
      Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer3.from(target, target.offset, target.byteLength);
        }
        if (!Buffer3.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target)
          return 0;
        let x = thisEnd - thisStart;
        let y = end - start;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0)
          return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0)
          byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir)
            return -1;
          else
            byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir)
            byteOffset = 0;
          else
            return -1;
        }
        if (typeof val === "string") {
          val = Buffer3.from(val, encoding);
        }
        if (Buffer3.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1)
                foundIndex = i;
              if (i - foundIndex + 1 === valLength)
                return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1)
                i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength)
            byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found)
              return i;
          }
        }
        return -1;
      }
      Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed))
            return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer3.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0)
              encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining)
          length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding)
          encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer3.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0)
          start = 0;
        if (!end || end < 0 || end > len)
          end = len;
        let out = "";
        for (let i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer3.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0)
            start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0)
            end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start)
          end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer3.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0)
          throw new RangeError("offset is not uint");
        if (offset + ext > length)
          throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * __pow(2, 8) + this[++offset] * __pow(2, 16) + this[++offset] * __pow(2, 24);
        const hi = this[++offset] + this[++offset] * __pow(2, 8) + this[++offset] * __pow(2, 16) + last * __pow(2, 24);
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * __pow(2, 24) + this[++offset] * __pow(2, 16) + this[++offset] * __pow(2, 8) + this[++offset];
        const lo = this[++offset] * __pow(2, 24) + this[++offset] * __pow(2, 16) + this[++offset] * __pow(2, 8) + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128))
          return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * __pow(2, 8) + this[offset + 6] * __pow(2, 16) + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * __pow(2, 8) + this[++offset] * __pow(2, 16) + this[++offset] * __pow(2, 24));
      });
      Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + this[++offset] * __pow(2, 16) + this[++offset] * __pow(2, 8) + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * __pow(2, 24) + this[++offset] * __pow(2, 16) + this[++offset] * __pow(2, 8) + last);
      });
      Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer3.isBuffer(buf))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min)
          throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
      }
      Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 127, -128);
        if (value < 0)
          value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0)
          value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
        if (offset < 0)
          throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer3.isBuffer(target))
          throw new TypeError("argument should be a Buffer");
        if (!start)
          start = 0;
        if (!end && end !== 0)
          end = this.length;
        if (targetStart >= target.length)
          targetStart = target.length;
        if (!targetStart)
          targetStart = 0;
        if (end > 0 && end < start)
          end = start;
        if (end === start)
          return 0;
        if (target.length === 0 || this.length === 0)
          return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length)
          throw new RangeError("Index out of range");
        if (end < 0)
          throw new RangeError("sourceEnd out of bounds");
        if (end > this.length)
          end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer3.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val)
          val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > __pow(2, 32)) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > __pow(BigInt(2), BigInt(32)) || input < -__pow(BigInt(2), BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          `>= ${type ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2)
          return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0)
              break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0)
              break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0)
              break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0)
              break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0)
            break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length)
            break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      }();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });
  var global = {Buffer: require_buffer()}

  // node_modules/long/src/long.js
  var require_long = __commonJS({
    "node_modules/long/src/long.js"(exports2, module2) {
      module2.exports = Long;
      var wasm = null;
      try {
        wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
          0,
          97,
          115,
          109,
          1,
          0,
          0,
          0,
          1,
          13,
          2,
          96,
          0,
          1,
          127,
          96,
          4,
          127,
          127,
          127,
          127,
          1,
          127,
          3,
          7,
          6,
          0,
          1,
          1,
          1,
          1,
          1,
          6,
          6,
          1,
          127,
          1,
          65,
          0,
          11,
          7,
          50,
          6,
          3,
          109,
          117,
          108,
          0,
          1,
          5,
          100,
          105,
          118,
          95,
          115,
          0,
          2,
          5,
          100,
          105,
          118,
          95,
          117,
          0,
          3,
          5,
          114,
          101,
          109,
          95,
          115,
          0,
          4,
          5,
          114,
          101,
          109,
          95,
          117,
          0,
          5,
          8,
          103,
          101,
          116,
          95,
          104,
          105,
          103,
          104,
          0,
          0,
          10,
          191,
          1,
          6,
          4,
          0,
          35,
          0,
          11,
          36,
          1,
          1,
          126,
          32,
          0,
          173,
          32,
          1,
          173,
          66,
          32,
          134,
          132,
          32,
          2,
          173,
          32,
          3,
          173,
          66,
          32,
          134,
          132,
          126,
          34,
          4,
          66,
          32,
          135,
          167,
          36,
          0,
          32,
          4,
          167,
          11,
          36,
          1,
          1,
          126,
          32,
          0,
          173,
          32,
          1,
          173,
          66,
          32,
          134,
          132,
          32,
          2,
          173,
          32,
          3,
          173,
          66,
          32,
          134,
          132,
          127,
          34,
          4,
          66,
          32,
          135,
          167,
          36,
          0,
          32,
          4,
          167,
          11,
          36,
          1,
          1,
          126,
          32,
          0,
          173,
          32,
          1,
          173,
          66,
          32,
          134,
          132,
          32,
          2,
          173,
          32,
          3,
          173,
          66,
          32,
          134,
          132,
          128,
          34,
          4,
          66,
          32,
          135,
          167,
          36,
          0,
          32,
          4,
          167,
          11,
          36,
          1,
          1,
          126,
          32,
          0,
          173,
          32,
          1,
          173,
          66,
          32,
          134,
          132,
          32,
          2,
          173,
          32,
          3,
          173,
          66,
          32,
          134,
          132,
          129,
          34,
          4,
          66,
          32,
          135,
          167,
          36,
          0,
          32,
          4,
          167,
          11,
          36,
          1,
          1,
          126,
          32,
          0,
          173,
          32,
          1,
          173,
          66,
          32,
          134,
          132,
          32,
          2,
          173,
          32,
          3,
          173,
          66,
          32,
          134,
          132,
          130,
          34,
          4,
          66,
          32,
          135,
          167,
          36,
          0,
          32,
          4,
          167,
          11
        ])), {}).exports;
      } catch (e) {
      }
      function Long(low, high, unsigned) {
        this.low = low | 0;
        this.high = high | 0;
        this.unsigned = !!unsigned;
      }
      Long.prototype.__isLong__;
      Object.defineProperty(Long.prototype, "__isLong__", { value: true });
      function isLong(obj) {
        return (obj && obj["__isLong__"]) === true;
      }
      Long.isLong = isLong;
      var INT_CACHE = {};
      var UINT_CACHE = {};
      function fromInt(value, unsigned) {
        var obj, cachedObj, cache;
        if (unsigned) {
          value >>>= 0;
          if (cache = 0 <= value && value < 256) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
              return cachedObj;
          }
          obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
          if (cache)
            UINT_CACHE[value] = obj;
          return obj;
        } else {
          value |= 0;
          if (cache = -128 <= value && value < 128) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
              return cachedObj;
          }
          obj = fromBits(value, value < 0 ? -1 : 0, false);
          if (cache)
            INT_CACHE[value] = obj;
          return obj;
        }
      }
      Long.fromInt = fromInt;
      function fromNumber(value, unsigned) {
        if (isNaN(value))
          return unsigned ? UZERO : ZERO;
        if (unsigned) {
          if (value < 0)
            return UZERO;
          if (value >= TWO_PWR_64_DBL)
            return MAX_UNSIGNED_VALUE;
        } else {
          if (value <= -TWO_PWR_63_DBL)
            return MIN_VALUE;
          if (value + 1 >= TWO_PWR_63_DBL)
            return MAX_VALUE;
        }
        if (value < 0)
          return fromNumber(-value, unsigned).neg();
        return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
      }
      Long.fromNumber = fromNumber;
      function fromBits(lowBits, highBits, unsigned) {
        return new Long(lowBits, highBits, unsigned);
      }
      Long.fromBits = fromBits;
      var pow_dbl = Math.pow;
      function fromString(str, unsigned, radix) {
        if (str.length === 0)
          throw Error("empty string");
        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
          return ZERO;
        if (typeof unsigned === "number") {
          radix = unsigned, unsigned = false;
        } else {
          unsigned = !!unsigned;
        }
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
          throw RangeError("radix");
        var p;
        if ((p = str.indexOf("-")) > 0)
          throw Error("interior hyphen");
        else if (p === 0) {
          return fromString(str.substring(1), unsigned, radix).neg();
        }
        var radixToPower = fromNumber(pow_dbl(radix, 8));
        var result = ZERO;
        for (var i = 0; i < str.length; i += 8) {
          var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
          if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
          } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
          }
        }
        result.unsigned = unsigned;
        return result;
      }
      Long.fromString = fromString;
      function fromValue(val, unsigned) {
        if (typeof val === "number")
          return fromNumber(val, unsigned);
        if (typeof val === "string")
          return fromString(val, unsigned);
        return fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
      }
      Long.fromValue = fromValue;
      var TWO_PWR_16_DBL = 1 << 16;
      var TWO_PWR_24_DBL = 1 << 24;
      var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
      var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
      var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
      var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
      var ZERO = fromInt(0);
      Long.ZERO = ZERO;
      var UZERO = fromInt(0, true);
      Long.UZERO = UZERO;
      var ONE = fromInt(1);
      Long.ONE = ONE;
      var UONE = fromInt(1, true);
      Long.UONE = UONE;
      var NEG_ONE = fromInt(-1);
      Long.NEG_ONE = NEG_ONE;
      var MAX_VALUE = fromBits(4294967295 | 0, 2147483647 | 0, false);
      Long.MAX_VALUE = MAX_VALUE;
      var MAX_UNSIGNED_VALUE = fromBits(4294967295 | 0, 4294967295 | 0, true);
      Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
      var MIN_VALUE = fromBits(0, 2147483648 | 0, false);
      Long.MIN_VALUE = MIN_VALUE;
      var LongPrototype = Long.prototype;
      LongPrototype.toInt = function toInt() {
        return this.unsigned ? this.low >>> 0 : this.low;
      };
      LongPrototype.toNumber = function toNumber() {
        if (this.unsigned)
          return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
      };
      LongPrototype.toString = function toString(radix) {
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
          throw RangeError("radix");
        if (this.isZero())
          return "0";
        if (this.isNegative()) {
          if (this.eq(MIN_VALUE)) {
            var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
          } else
            return "-" + this.neg().toString(radix);
        }
        var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
        var result = "";
        while (true) {
          var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
          rem = remDiv;
          if (rem.isZero())
            return digits + result;
          else {
            while (digits.length < 6)
              digits = "0" + digits;
            result = "" + digits + result;
          }
        }
      };
      LongPrototype.getHighBits = function getHighBits() {
        return this.high;
      };
      LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
        return this.high >>> 0;
      };
      LongPrototype.getLowBits = function getLowBits() {
        return this.low;
      };
      LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
        return this.low >>> 0;
      };
      LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
        if (this.isNegative())
          return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        var val = this.high != 0 ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--)
          if ((val & 1 << bit) != 0)
            break;
        return this.high != 0 ? bit + 33 : bit + 1;
      };
      LongPrototype.isZero = function isZero() {
        return this.high === 0 && this.low === 0;
      };
      LongPrototype.eqz = LongPrototype.isZero;
      LongPrototype.isNegative = function isNegative() {
        return !this.unsigned && this.high < 0;
      };
      LongPrototype.isPositive = function isPositive() {
        return this.unsigned || this.high >= 0;
      };
      LongPrototype.isOdd = function isOdd() {
        return (this.low & 1) === 1;
      };
      LongPrototype.isEven = function isEven() {
        return (this.low & 1) === 0;
      };
      LongPrototype.equals = function equals(other) {
        if (!isLong(other))
          other = fromValue(other);
        if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1)
          return false;
        return this.high === other.high && this.low === other.low;
      };
      LongPrototype.eq = LongPrototype.equals;
      LongPrototype.notEquals = function notEquals(other) {
        return !this.eq(other);
      };
      LongPrototype.neq = LongPrototype.notEquals;
      LongPrototype.ne = LongPrototype.notEquals;
      LongPrototype.lessThan = function lessThan(other) {
        return this.comp(other) < 0;
      };
      LongPrototype.lt = LongPrototype.lessThan;
      LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
        return this.comp(other) <= 0;
      };
      LongPrototype.lte = LongPrototype.lessThanOrEqual;
      LongPrototype.le = LongPrototype.lessThanOrEqual;
      LongPrototype.greaterThan = function greaterThan(other) {
        return this.comp(other) > 0;
      };
      LongPrototype.gt = LongPrototype.greaterThan;
      LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
        return this.comp(other) >= 0;
      };
      LongPrototype.gte = LongPrototype.greaterThanOrEqual;
      LongPrototype.ge = LongPrototype.greaterThanOrEqual;
      LongPrototype.compare = function compare(other) {
        if (!isLong(other))
          other = fromValue(other);
        if (this.eq(other))
          return 0;
        var thisNeg = this.isNegative(), otherNeg = other.isNegative();
        if (thisNeg && !otherNeg)
          return -1;
        if (!thisNeg && otherNeg)
          return 1;
        if (!this.unsigned)
          return this.sub(other).isNegative() ? -1 : 1;
        return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
      };
      LongPrototype.comp = LongPrototype.compare;
      LongPrototype.negate = function negate() {
        if (!this.unsigned && this.eq(MIN_VALUE))
          return MIN_VALUE;
        return this.not().add(ONE);
      };
      LongPrototype.neg = LongPrototype.negate;
      LongPrototype.add = function add(addend) {
        if (!isLong(addend))
          addend = fromValue(addend);
        var a48 = this.high >>> 16;
        var a32 = this.high & 65535;
        var a16 = this.low >>> 16;
        var a00 = this.low & 65535;
        var b48 = addend.high >>> 16;
        var b32 = addend.high & 65535;
        var b16 = addend.low >>> 16;
        var b00 = addend.low & 65535;
        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 65535;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 65535;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c48 += a48 + b48;
        c48 &= 65535;
        return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
      };
      LongPrototype.subtract = function subtract(subtrahend) {
        if (!isLong(subtrahend))
          subtrahend = fromValue(subtrahend);
        return this.add(subtrahend.neg());
      };
      LongPrototype.sub = LongPrototype.subtract;
      LongPrototype.multiply = function multiply(multiplier) {
        if (this.isZero())
          return ZERO;
        if (!isLong(multiplier))
          multiplier = fromValue(multiplier);
        if (wasm) {
          var low = wasm.mul(
            this.low,
            this.high,
            multiplier.low,
            multiplier.high
          );
          return fromBits(low, wasm.get_high(), this.unsigned);
        }
        if (multiplier.isZero())
          return ZERO;
        if (this.eq(MIN_VALUE))
          return multiplier.isOdd() ? MIN_VALUE : ZERO;
        if (multiplier.eq(MIN_VALUE))
          return this.isOdd() ? MIN_VALUE : ZERO;
        if (this.isNegative()) {
          if (multiplier.isNegative())
            return this.neg().mul(multiplier.neg());
          else
            return this.neg().mul(multiplier).neg();
        } else if (multiplier.isNegative())
          return this.mul(multiplier.neg()).neg();
        if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
          return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
        var a48 = this.high >>> 16;
        var a32 = this.high & 65535;
        var a16 = this.low >>> 16;
        var a00 = this.low & 65535;
        var b48 = multiplier.high >>> 16;
        var b32 = multiplier.high & 65535;
        var b16 = multiplier.low >>> 16;
        var b00 = multiplier.low & 65535;
        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 65535;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 65535;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 65535;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 65535;
        return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
      };
      LongPrototype.mul = LongPrototype.multiply;
      LongPrototype.divide = function divide(divisor) {
        if (!isLong(divisor))
          divisor = fromValue(divisor);
        if (divisor.isZero())
          throw Error("division by zero");
        if (wasm) {
          if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) {
            return this;
          }
          var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
          );
          return fromBits(low, wasm.get_high(), this.unsigned);
        }
        if (this.isZero())
          return this.unsigned ? UZERO : ZERO;
        var approx, rem, res;
        if (!this.unsigned) {
          if (this.eq(MIN_VALUE)) {
            if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
              return MIN_VALUE;
            else if (divisor.eq(MIN_VALUE))
              return ONE;
            else {
              var halfThis = this.shr(1);
              approx = halfThis.div(divisor).shl(1);
              if (approx.eq(ZERO)) {
                return divisor.isNegative() ? ONE : NEG_ONE;
              } else {
                rem = this.sub(divisor.mul(approx));
                res = approx.add(rem.div(divisor));
                return res;
              }
            }
          } else if (divisor.eq(MIN_VALUE))
            return this.unsigned ? UZERO : ZERO;
          if (this.isNegative()) {
            if (divisor.isNegative())
              return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
          } else if (divisor.isNegative())
            return this.div(divisor.neg()).neg();
          res = ZERO;
        } else {
          if (!divisor.unsigned)
            divisor = divisor.toUnsigned();
          if (divisor.gt(this))
            return UZERO;
          if (divisor.gt(this.shru(1)))
            return UONE;
          res = UZERO;
        }
        rem = this;
        while (rem.gte(divisor)) {
          approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
          var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
          while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
          }
          if (approxRes.isZero())
            approxRes = ONE;
          res = res.add(approxRes);
          rem = rem.sub(approxRem);
        }
        return res;
      };
      LongPrototype.div = LongPrototype.divide;
      LongPrototype.modulo = function modulo(divisor) {
        if (!isLong(divisor))
          divisor = fromValue(divisor);
        if (wasm) {
          var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
          );
          return fromBits(low, wasm.get_high(), this.unsigned);
        }
        return this.sub(this.div(divisor).mul(divisor));
      };
      LongPrototype.mod = LongPrototype.modulo;
      LongPrototype.rem = LongPrototype.modulo;
      LongPrototype.not = function not() {
        return fromBits(~this.low, ~this.high, this.unsigned);
      };
      LongPrototype.and = function and(other) {
        if (!isLong(other))
          other = fromValue(other);
        return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
      };
      LongPrototype.or = function or(other) {
        if (!isLong(other))
          other = fromValue(other);
        return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
      };
      LongPrototype.xor = function xor(other) {
        if (!isLong(other))
          other = fromValue(other);
        return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
      };
      LongPrototype.shiftLeft = function shiftLeft(numBits) {
        if (isLong(numBits))
          numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
          return this;
        else if (numBits < 32)
          return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);
        else
          return fromBits(0, this.low << numBits - 32, this.unsigned);
      };
      LongPrototype.shl = LongPrototype.shiftLeft;
      LongPrototype.shiftRight = function shiftRight(numBits) {
        if (isLong(numBits))
          numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
          return this;
        else if (numBits < 32)
          return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);
        else
          return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
      };
      LongPrototype.shr = LongPrototype.shiftRight;
      LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
        if (isLong(numBits))
          numBits = numBits.toInt();
        numBits &= 63;
        if (numBits === 0)
          return this;
        else {
          var high = this.high;
          if (numBits < 32) {
            var low = this.low;
            return fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
          } else if (numBits === 32)
            return fromBits(high, 0, this.unsigned);
          else
            return fromBits(high >>> numBits - 32, 0, this.unsigned);
        }
      };
      LongPrototype.shru = LongPrototype.shiftRightUnsigned;
      LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
      LongPrototype.toSigned = function toSigned() {
        if (!this.unsigned)
          return this;
        return fromBits(this.low, this.high, false);
      };
      LongPrototype.toUnsigned = function toUnsigned() {
        if (this.unsigned)
          return this;
        return fromBits(this.low, this.high, true);
      };
      LongPrototype.toBytes = function toBytes(le) {
        return le ? this.toBytesLE() : this.toBytesBE();
      };
      LongPrototype.toBytesLE = function toBytesLE() {
        var hi = this.high, lo = this.low;
        return [
          lo & 255,
          lo >>> 8 & 255,
          lo >>> 16 & 255,
          lo >>> 24,
          hi & 255,
          hi >>> 8 & 255,
          hi >>> 16 & 255,
          hi >>> 24
        ];
      };
      LongPrototype.toBytesBE = function toBytesBE() {
        var hi = this.high, lo = this.low;
        return [
          hi >>> 24,
          hi >>> 16 & 255,
          hi >>> 8 & 255,
          hi & 255,
          lo >>> 24,
          lo >>> 16 & 255,
          lo >>> 8 & 255,
          lo & 255
        ];
      };
      Long.fromBytes = function fromBytes(bytes, unsigned, le) {
        return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
      };
      Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
        return new Long(
          bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24,
          bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24,
          unsigned
        );
      };
      Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
        return new Long(
          bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7],
          bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3],
          unsigned
        );
      };
    }
  });

  // node_modules/@protobufjs/aspromise/index.js
  var require_aspromise = __commonJS({
    "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
      "use strict";
      module2.exports = asPromise;
      function asPromise(fn, ctx) {
        var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
        while (index < arguments.length)
          params[offset++] = arguments[index++];
        return new Promise(function executor(resolve, reject) {
          params[offset] = function callback(err) {
            if (pending) {
              pending = false;
              if (err)
                reject(err);
              else {
                var params2 = new Array(arguments.length - 1), offset2 = 0;
                while (offset2 < params2.length)
                  params2[offset2++] = arguments[offset2];
                resolve.apply(null, params2);
              }
            }
          };
          try {
            fn.apply(ctx || null, params);
          } catch (err) {
            if (pending) {
              pending = false;
              reject(err);
            }
          }
        });
      }
    }
  });

  // node_modules/@protobufjs/base64/index.js
  var require_base64 = __commonJS({
    "node_modules/@protobufjs/base64/index.js"(exports2) {
      "use strict";
      var base64 = exports2;
      base64.length = function length(string) {
        var p = string.length;
        if (!p)
          return 0;
        var n = 0;
        while (--p % 4 > 1 && string.charAt(p) === "=")
          ++n;
        return Math.ceil(string.length * 3) / 4 - n;
      };
      var b64 = new Array(64);
      var s64 = new Array(123);
      for (i = 0; i < 64; )
        s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
      var i;
      base64.encode = function encode(buffer, start, end) {
        var parts = null, chunk = [];
        var i2 = 0, j = 0, t;
        while (start < end) {
          var b = buffer[start++];
          switch (j) {
            case 0:
              chunk[i2++] = b64[b >> 2];
              t = (b & 3) << 4;
              j = 1;
              break;
            case 1:
              chunk[i2++] = b64[t | b >> 4];
              t = (b & 15) << 2;
              j = 2;
              break;
            case 2:
              chunk[i2++] = b64[t | b >> 6];
              chunk[i2++] = b64[b & 63];
              j = 0;
              break;
          }
          if (i2 > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i2 = 0;
          }
        }
        if (j) {
          chunk[i2++] = b64[t];
          chunk[i2++] = 61;
          if (j === 1)
            chunk[i2++] = 61;
        }
        if (parts) {
          if (i2)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i2));
      };
      var invalidEncoding = "invalid encoding";
      base64.decode = function decode2(string, buffer, offset) {
        var start = offset;
        var j = 0, t;
        for (var i2 = 0; i2 < string.length; ) {
          var c = string.charCodeAt(i2++);
          if (c === 61 && j > 1)
            break;
          if ((c = s64[c]) === void 0)
            throw Error(invalidEncoding);
          switch (j) {
            case 0:
              t = c;
              j = 1;
              break;
            case 1:
              buffer[offset++] = t << 2 | (c & 48) >> 4;
              t = c;
              j = 2;
              break;
            case 2:
              buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
              t = c;
              j = 3;
              break;
            case 3:
              buffer[offset++] = (t & 3) << 6 | c;
              j = 0;
              break;
          }
        }
        if (j === 1)
          throw Error(invalidEncoding);
        return offset - start;
      };
      base64.test = function test(string) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
      };
    }
  });

  // node_modules/@protobufjs/eventemitter/index.js
  var require_eventemitter = __commonJS({
    "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
      "use strict";
      module2.exports = EventEmitter;
      function EventEmitter() {
        this._listeners = {};
      }
      EventEmitter.prototype.on = function on(evt, fn, ctx) {
        (this._listeners[evt] || (this._listeners[evt] = [])).push({
          fn,
          ctx: ctx || this
        });
        return this;
      };
      EventEmitter.prototype.off = function off(evt, fn) {
        if (evt === void 0)
          this._listeners = {};
        else {
          if (fn === void 0)
            this._listeners[evt] = [];
          else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length; )
              if (listeners[i].fn === fn)
                listeners.splice(i, 1);
              else
                ++i;
          }
        }
        return this;
      };
      EventEmitter.prototype.emit = function emit(evt) {
        var listeners = this._listeners[evt];
        if (listeners) {
          var args = [], i = 1;
          for (; i < arguments.length; )
            args.push(arguments[i++]);
          for (i = 0; i < listeners.length; )
            listeners[i].fn.apply(listeners[i++].ctx, args);
        }
        return this;
      };
    }
  });

  // node_modules/@protobufjs/float/index.js
  var require_float = __commonJS({
    "node_modules/@protobufjs/float/index.js"(exports2, module2) {
      "use strict";
      module2.exports = factory(factory);
      function factory(exports3) {
        if (typeof Float32Array !== "undefined")
          (function() {
            var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
            function writeFloat_f32_cpy(val, buf, pos) {
              f32[0] = val;
              buf[pos] = f8b[0];
              buf[pos + 1] = f8b[1];
              buf[pos + 2] = f8b[2];
              buf[pos + 3] = f8b[3];
            }
            function writeFloat_f32_rev(val, buf, pos) {
              f32[0] = val;
              buf[pos] = f8b[3];
              buf[pos + 1] = f8b[2];
              buf[pos + 2] = f8b[1];
              buf[pos + 3] = f8b[0];
            }
            exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
            exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
            function readFloat_f32_cpy(buf, pos) {
              f8b[0] = buf[pos];
              f8b[1] = buf[pos + 1];
              f8b[2] = buf[pos + 2];
              f8b[3] = buf[pos + 3];
              return f32[0];
            }
            function readFloat_f32_rev(buf, pos) {
              f8b[3] = buf[pos];
              f8b[2] = buf[pos + 1];
              f8b[1] = buf[pos + 2];
              f8b[0] = buf[pos + 3];
              return f32[0];
            }
            exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
            exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
          })();
        else
          (function() {
            function writeFloat_ieee754(writeUint, val, buf, pos) {
              var sign = val < 0 ? 1 : 0;
              if (sign)
                val = -val;
              if (val === 0)
                writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos);
              else if (isNaN(val))
                writeUint(2143289344, buf, pos);
              else if (val > 34028234663852886e22)
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
              else if (val < 11754943508222875e-54)
                writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
              else {
                var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
              }
            }
            exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
            exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
            function readFloat_ieee754(readUint, buf, pos) {
              var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
              return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
            }
            exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
            exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
          })();
        if (typeof Float64Array !== "undefined")
          (function() {
            var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
            function writeDouble_f64_cpy(val, buf, pos) {
              f64[0] = val;
              buf[pos] = f8b[0];
              buf[pos + 1] = f8b[1];
              buf[pos + 2] = f8b[2];
              buf[pos + 3] = f8b[3];
              buf[pos + 4] = f8b[4];
              buf[pos + 5] = f8b[5];
              buf[pos + 6] = f8b[6];
              buf[pos + 7] = f8b[7];
            }
            function writeDouble_f64_rev(val, buf, pos) {
              f64[0] = val;
              buf[pos] = f8b[7];
              buf[pos + 1] = f8b[6];
              buf[pos + 2] = f8b[5];
              buf[pos + 3] = f8b[4];
              buf[pos + 4] = f8b[3];
              buf[pos + 5] = f8b[2];
              buf[pos + 6] = f8b[1];
              buf[pos + 7] = f8b[0];
            }
            exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
            exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
            function readDouble_f64_cpy(buf, pos) {
              f8b[0] = buf[pos];
              f8b[1] = buf[pos + 1];
              f8b[2] = buf[pos + 2];
              f8b[3] = buf[pos + 3];
              f8b[4] = buf[pos + 4];
              f8b[5] = buf[pos + 5];
              f8b[6] = buf[pos + 6];
              f8b[7] = buf[pos + 7];
              return f64[0];
            }
            function readDouble_f64_rev(buf, pos) {
              f8b[7] = buf[pos];
              f8b[6] = buf[pos + 1];
              f8b[5] = buf[pos + 2];
              f8b[4] = buf[pos + 3];
              f8b[3] = buf[pos + 4];
              f8b[2] = buf[pos + 5];
              f8b[1] = buf[pos + 6];
              f8b[0] = buf[pos + 7];
              return f64[0];
            }
            exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
            exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
          })();
        else
          (function() {
            function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
              var sign = val < 0 ? 1 : 0;
              if (sign)
                val = -val;
              if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos + off1);
              } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
              } else if (val > 17976931348623157e292) {
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
              } else {
                var mantissa;
                if (val < 22250738585072014e-324) {
                  mantissa = val / 5e-324;
                  writeUint(mantissa >>> 0, buf, pos + off0);
                  writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                  var exponent = Math.floor(Math.log(val) / Math.LN2);
                  if (exponent === 1024)
                    exponent = 1023;
                  mantissa = val * Math.pow(2, -exponent);
                  writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                  writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
              }
            }
            exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
            exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
            function readDouble_ieee754(readUint, off0, off1, buf, pos) {
              var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
              var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
              return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
            }
            exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
            exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
          })();
        return exports3;
      }
      function writeUintLE(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      function writeUintBE(val, buf, pos) {
        buf[pos] = val >>> 24;
        buf[pos + 1] = val >>> 16 & 255;
        buf[pos + 2] = val >>> 8 & 255;
        buf[pos + 3] = val & 255;
      }
      function readUintLE(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
      }
      function readUintBE(buf, pos) {
        return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
      }
    }
  });

  // node_modules/@protobufjs/inquire/index.js
  var require_inquire = __commonJS({
    "node_modules/@protobufjs/inquire/index.js"(exports, module) {
      "use strict";
      module.exports = inquire;
      function inquire(moduleName) {
        try {
          var mod = eval("quire".replace(/^/, "re"))(moduleName);
          if (mod && (mod.length || Object.keys(mod).length))
            return mod;
        } catch (e) {
        }
        return null;
      }
    }
  });

  // node_modules/@protobufjs/utf8/index.js
  var require_utf8 = __commonJS({
    "node_modules/@protobufjs/utf8/index.js"(exports2) {
      "use strict";
      var utf8 = exports2;
      utf8.length = function utf8_length(string) {
        var len = 0, c = 0;
        for (var i = 0; i < string.length; ++i) {
          c = string.charCodeAt(i);
          if (c < 128)
            len += 1;
          else if (c < 2048)
            len += 2;
          else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
            ++i;
            len += 4;
          } else
            len += 3;
        }
        return len;
      };
      utf8.read = function utf8_read(buffer, start, end) {
        var len = end - start;
        if (len < 1)
          return "";
        var parts = null, chunk = [], i = 0, t;
        while (start < end) {
          t = buffer[start++];
          if (t < 128)
            chunk[i++] = t;
          else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
          else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
            chunk[i++] = 55296 + (t >> 10);
            chunk[i++] = 56320 + (t & 1023);
          } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
          if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
          }
        }
        if (parts) {
          if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i));
      };
      utf8.write = function utf8_write(string, buffer, offset) {
        var start = offset, c1, c2;
        for (var i = 0; i < string.length; ++i) {
          c1 = string.charCodeAt(i);
          if (c1 < 128) {
            buffer[offset++] = c1;
          } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
          } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
            c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
            ++i;
            buffer[offset++] = c1 >> 18 | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          } else {
            buffer[offset++] = c1 >> 12 | 224;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          }
        }
        return offset - start;
      };
    }
  });

  // node_modules/@protobufjs/pool/index.js
  var require_pool = __commonJS({
    "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
      "use strict";
      module2.exports = pool;
      function pool(alloc, slice, size) {
        var SIZE = size || 8192;
        var MAX = SIZE >>> 1;
        var slab = null;
        var offset = SIZE;
        return function pool_alloc(size2) {
          if (size2 < 1 || size2 > MAX)
            return alloc(size2);
          if (offset + size2 > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
          }
          var buf = slice.call(slab, offset, offset += size2);
          if (offset & 7)
            offset = (offset | 7) + 1;
          return buf;
        };
      }
    }
  });

  // node_modules/protobufjs/src/util/longbits.js
  var require_longbits = __commonJS({
    "node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
      "use strict";
      module2.exports = LongBits;
      var util = require_minimal();
      function LongBits(lo, hi) {
        this.lo = lo >>> 0;
        this.hi = hi >>> 0;
      }
      var zero = LongBits.zero = new LongBits(0, 0);
      zero.toNumber = function() {
        return 0;
      };
      zero.zzEncode = zero.zzDecode = function() {
        return this;
      };
      zero.length = function() {
        return 1;
      };
      var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
      LongBits.fromNumber = function fromNumber(value) {
        if (value === 0)
          return zero;
        var sign = value < 0;
        if (sign)
          value = -value;
        var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
        if (sign) {
          hi = ~hi >>> 0;
          lo = ~lo >>> 0;
          if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
              hi = 0;
          }
        }
        return new LongBits(lo, hi);
      };
      LongBits.from = function from(value) {
        if (typeof value === "number")
          return LongBits.fromNumber(value);
        if (util.isString(value)) {
          if (util.Long)
            value = util.Long.fromString(value);
          else
            return LongBits.fromNumber(parseInt(value, 10));
        }
        return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
      };
      LongBits.prototype.toNumber = function toNumber(unsigned) {
        if (!unsigned && this.hi >>> 31) {
          var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
          if (!lo)
            hi = hi + 1 >>> 0;
          return -(lo + hi * 4294967296);
        }
        return this.lo + this.hi * 4294967296;
      };
      LongBits.prototype.toLong = function toLong(unsigned) {
        return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
      };
      var charCodeAt = String.prototype.charCodeAt;
      LongBits.fromHash = function fromHash(hash) {
        if (hash === zeroHash)
          return zero;
        return new LongBits(
          (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
          (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
        );
      };
      LongBits.prototype.toHash = function toHash() {
        return String.fromCharCode(
          this.lo & 255,
          this.lo >>> 8 & 255,
          this.lo >>> 16 & 255,
          this.lo >>> 24,
          this.hi & 255,
          this.hi >>> 8 & 255,
          this.hi >>> 16 & 255,
          this.hi >>> 24
        );
      };
      LongBits.prototype.zzEncode = function zzEncode() {
        var mask = this.hi >> 31;
        this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
        this.lo = (this.lo << 1 ^ mask) >>> 0;
        return this;
      };
      LongBits.prototype.zzDecode = function zzDecode() {
        var mask = -(this.lo & 1);
        this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
        this.hi = (this.hi >>> 1 ^ mask) >>> 0;
        return this;
      };
      LongBits.prototype.length = function length() {
        var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
        return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
      };
    }
  });

  // node_modules/protobufjs/src/util/minimal.js
  var require_minimal = __commonJS({
    "node_modules/protobufjs/src/util/minimal.js"(exports2) {
      "use strict";
      var util = exports2;
      util.asPromise = require_aspromise();
      util.base64 = require_base64();
      util.EventEmitter = require_eventemitter();
      util.float = require_float();
      util.inquire = require_inquire();
      util.utf8 = require_utf8();
      util.pool = require_pool();
      util.LongBits = require_longbits();
      util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
      util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
      util.emptyArray = Object.freeze ? Object.freeze([]) : [];
      util.emptyObject = Object.freeze ? Object.freeze({}) : {};
      util.isInteger = Number.isInteger || function isInteger(value) {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
      };
      util.isString = function isString(value) {
        return typeof value === "string" || value instanceof String;
      };
      util.isObject = function isObject(value) {
        return value && typeof value === "object";
      };
      util.isset = util.isSet = function isSet(obj, prop) {
        var value = obj[prop];
        if (value != null && obj.hasOwnProperty(prop))
          return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
        return false;
      };
      util.Buffer = function() {
        try {
          var Buffer3 = util.inquire("buffer").Buffer;
          return Buffer3.prototype.utf8Write ? Buffer3 : null;
        } catch (e) {
          return null;
        }
      }();
      util._Buffer_from = null;
      util._Buffer_allocUnsafe = null;
      util.newBuffer = function newBuffer(sizeOrArray) {
        return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
      };
      util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      util.Long = util.global.dcodeIO && util.global.dcodeIO.Long || util.global.Long || util.inquire("long");
      util.key2Re = /^true|false|0|1$/;
      util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
      util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
      util.longToHash = function longToHash(value) {
        return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
      };
      util.longFromHash = function longFromHash(hash, unsigned) {
        var bits = util.LongBits.fromHash(hash);
        if (util.Long)
          return util.Long.fromBits(bits.lo, bits.hi, unsigned);
        return bits.toNumber(Boolean(unsigned));
      };
      function merge(dst, src, ifNotSet) {
        for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
          if (dst[keys[i]] === void 0 || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
        return dst;
      }
      util.merge = merge;
      util.lcFirst = function lcFirst(str) {
        return str.charAt(0).toLowerCase() + str.substring(1);
      };
      function newError(name) {
        function CustomError(message, properties) {
          if (!(this instanceof CustomError))
            return new CustomError(message, properties);
          Object.defineProperty(this, "message", { get: function() {
            return message;
          } });
          if (Error.captureStackTrace)
            Error.captureStackTrace(this, CustomError);
          else
            Object.defineProperty(this, "stack", { value: new Error().stack || "" });
          if (properties)
            merge(this, properties);
        }
        (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;
        Object.defineProperty(CustomError.prototype, "name", { get: function() {
          return name;
        } });
        CustomError.prototype.toString = function toString() {
          return this.name + ": " + this.message;
        };
        return CustomError;
      }
      util.newError = newError;
      util.ProtocolError = newError("ProtocolError");
      util.oneOfGetter = function getOneOf(fieldNames) {
        var fieldMap = {};
        for (var i = 0; i < fieldNames.length; ++i)
          fieldMap[fieldNames[i]] = 1;
        return function() {
          for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
            if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
              return keys[i2];
        };
      };
      util.oneOfSetter = function setOneOf(fieldNames) {
        return function(name) {
          for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
              delete this[fieldNames[i]];
        };
      };
      util.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: true
      };
      util._configure = function() {
        var Buffer3 = util.Buffer;
        if (!Buffer3) {
          util._Buffer_from = util._Buffer_allocUnsafe = null;
          return;
        }
        util._Buffer_from = Buffer3.from !== Uint8Array.from && Buffer3.from || function Buffer_from(value, encoding) {
          return new Buffer3(value, encoding);
        };
        util._Buffer_allocUnsafe = Buffer3.allocUnsafe || function Buffer_allocUnsafe(size) {
          return new Buffer3(size);
        };
      };
    }
  });

  // node_modules/protobufjs/src/writer.js
  var require_writer = __commonJS({
    "node_modules/protobufjs/src/writer.js"(exports2, module2) {
      "use strict";
      module2.exports = Writer;
      var util = require_minimal();
      var BufferWriter;
      var LongBits = util.LongBits;
      var base64 = util.base64;
      var utf8 = util.utf8;
      function Op(fn, len, val) {
        this.fn = fn;
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      function noop() {
      }
      function State(writer) {
        this.head = writer.head;
        this.tail = writer.tail;
        this.len = writer.len;
        this.next = writer.states;
      }
      function Writer() {
        this.len = 0;
        this.head = new Op(noop, 0, 0);
        this.tail = this.head;
        this.states = null;
      }
      var create = function create2() {
        return util.Buffer ? function create_buffer_setup() {
          return (Writer.create = function create_buffer() {
            return new BufferWriter();
          })();
        } : function create_array() {
          return new Writer();
        };
      };
      Writer.create = create();
      Writer.alloc = function alloc(size) {
        return new util.Array(size);
      };
      if (util.Array !== Array)
        Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
      Writer.prototype._push = function push(fn, len, val) {
        this.tail = this.tail.next = new Op(fn, len, val);
        this.len += len;
        return this;
      };
      function writeByte(val, buf, pos) {
        buf[pos] = val & 255;
      }
      function writeVarint32(val, buf, pos) {
        while (val > 127) {
          buf[pos++] = val & 127 | 128;
          val >>>= 7;
        }
        buf[pos] = val;
      }
      function VarintOp(len, val) {
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      VarintOp.prototype = Object.create(Op.prototype);
      VarintOp.prototype.fn = writeVarint32;
      Writer.prototype.uint32 = function write_uint32(value) {
        this.len += (this.tail = this.tail.next = new VarintOp(
          (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
          value
        )).len;
        return this;
      };
      Writer.prototype.int32 = function write_int32(value) {
        return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
      };
      Writer.prototype.sint32 = function write_sint32(value) {
        return this.uint32((value << 1 ^ value >> 31) >>> 0);
      };
      function writeVarint64(val, buf, pos) {
        while (val.hi) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
          val.hi >>>= 7;
        }
        while (val.lo > 127) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = val.lo >>> 7;
        }
        buf[pos++] = val.lo;
      }
      Writer.prototype.uint64 = function write_uint64(value) {
        var bits = LongBits.from(value);
        return this._push(writeVarint64, bits.length(), bits);
      };
      Writer.prototype.int64 = Writer.prototype.uint64;
      Writer.prototype.sint64 = function write_sint64(value) {
        var bits = LongBits.from(value).zzEncode();
        return this._push(writeVarint64, bits.length(), bits);
      };
      Writer.prototype.bool = function write_bool(value) {
        return this._push(writeByte, 1, value ? 1 : 0);
      };
      function writeFixed32(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      Writer.prototype.fixed32 = function write_fixed32(value) {
        return this._push(writeFixed32, 4, value >>> 0);
      };
      Writer.prototype.sfixed32 = Writer.prototype.fixed32;
      Writer.prototype.fixed64 = function write_fixed64(value) {
        var bits = LongBits.from(value);
        return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
      };
      Writer.prototype.sfixed64 = Writer.prototype.fixed64;
      Writer.prototype.float = function write_float(value) {
        return this._push(util.float.writeFloatLE, 4, value);
      };
      Writer.prototype.double = function write_double(value) {
        return this._push(util.float.writeDoubleLE, 8, value);
      };
      var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
          buf[pos + i] = val[i];
      };
      Writer.prototype.bytes = function write_bytes(value) {
        var len = value.length >>> 0;
        if (!len)
          return this._push(writeByte, 1, 0);
        if (util.isString(value)) {
          var buf = Writer.alloc(len = base64.length(value));
          base64.decode(value, buf, 0);
          value = buf;
        }
        return this.uint32(len)._push(writeBytes, len, value);
      };
      Writer.prototype.string = function write_string(value) {
        var len = utf8.length(value);
        return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
      };
      Writer.prototype.fork = function fork() {
        this.states = new State(this);
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
        return this;
      };
      Writer.prototype.reset = function reset() {
        if (this.states) {
          this.head = this.states.head;
          this.tail = this.states.tail;
          this.len = this.states.len;
          this.states = this.states.next;
        } else {
          this.head = this.tail = new Op(noop, 0, 0);
          this.len = 0;
        }
        return this;
      };
      Writer.prototype.ldelim = function ldelim() {
        var head = this.head, tail = this.tail, len = this.len;
        this.reset().uint32(len);
        if (len) {
          this.tail.next = head.next;
          this.tail = tail;
          this.len += len;
        }
        return this;
      };
      Writer.prototype.finish = function finish() {
        var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
        while (head) {
          head.fn(head.val, buf, pos);
          pos += head.len;
          head = head.next;
        }
        return buf;
      };
      Writer._configure = function(BufferWriter_) {
        BufferWriter = BufferWriter_;
        Writer.create = create();
        BufferWriter._configure();
      };
    }
  });

  // node_modules/protobufjs/src/writer_buffer.js
  var require_writer_buffer = __commonJS({
    "node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
      "use strict";
      module2.exports = BufferWriter;
      var Writer = require_writer();
      (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
      var util = require_minimal();
      function BufferWriter() {
        Writer.call(this);
      }
      BufferWriter._configure = function() {
        BufferWriter.alloc = util._Buffer_allocUnsafe;
        BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
          buf.set(val, pos);
        } : function writeBytesBuffer_copy(val, buf, pos) {
          if (val.copy)
            val.copy(buf, pos, 0, val.length);
          else
            for (var i = 0; i < val.length; )
              buf[pos++] = val[i++];
        };
      };
      BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
        if (util.isString(value))
          value = util._Buffer_from(value, "base64");
        var len = value.length >>> 0;
        this.uint32(len);
        if (len)
          this._push(BufferWriter.writeBytesBuffer, len, value);
        return this;
      };
      function writeStringBuffer(val, buf, pos) {
        if (val.length < 40)
          util.utf8.write(val, buf, pos);
        else if (buf.utf8Write)
          buf.utf8Write(val, pos);
        else
          buf.write(val, pos);
      }
      BufferWriter.prototype.string = function write_string_buffer(value) {
        var len = util.Buffer.byteLength(value);
        this.uint32(len);
        if (len)
          this._push(writeStringBuffer, len, value);
        return this;
      };
      BufferWriter._configure();
    }
  });

  // node_modules/protobufjs/src/reader.js
  var require_reader = __commonJS({
    "node_modules/protobufjs/src/reader.js"(exports2, module2) {
      "use strict";
      module2.exports = Reader;
      var util = require_minimal();
      var BufferReader;
      var LongBits = util.LongBits;
      var utf8 = util.utf8;
      function indexOutOfRange(reader, writeLength) {
        return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
      }
      function Reader(buffer) {
        this.buf = buffer;
        this.pos = 0;
        this.len = buffer.length;
      }
      var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
          return new Reader(buffer);
        throw Error("illegal buffer");
      } : function create_array2(buffer) {
        if (Array.isArray(buffer))
          return new Reader(buffer);
        throw Error("illegal buffer");
      };
      var create = function create2() {
        return util.Buffer ? function create_buffer_setup(buffer) {
          return (Reader.create = function create_buffer(buffer2) {
            return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
          })(buffer);
        } : create_array;
      };
      Reader.create = create();
      Reader.prototype._slice = util.Array.prototype.subarray || util.Array.prototype.slice;
      Reader.prototype.uint32 = function read_uint32_setup() {
        var value = 4294967295;
        return function read_uint32() {
          value = (this.buf[this.pos] & 127) >>> 0;
          if (this.buf[this.pos++] < 128)
            return value;
          value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return value;
          value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
          if (this.buf[this.pos++] < 128)
            return value;
          value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
          if (this.buf[this.pos++] < 128)
            return value;
          value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
          if (this.buf[this.pos++] < 128)
            return value;
          if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
          }
          return value;
        };
      }();
      Reader.prototype.int32 = function read_int32() {
        return this.uint32() | 0;
      };
      Reader.prototype.sint32 = function read_sint32() {
        var value = this.uint32();
        return value >>> 1 ^ -(value & 1) | 0;
      };
      function readLongVarint() {
        var bits = new LongBits(0, 0);
        var i = 0;
        if (this.len - this.pos > 4) {
          for (; i < 4; ++i) {
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
          i = 0;
        } else {
          for (; i < 3; ++i) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
          return bits;
        }
        if (this.len - this.pos > 4) {
          for (; i < 5; ++i) {
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
        } else {
          for (; i < 5; ++i) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
        }
        throw Error("invalid varint encoding");
      }
      Reader.prototype.bool = function read_bool() {
        return this.uint32() !== 0;
      };
      function readFixed32_end(buf, end) {
        return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
      }
      Reader.prototype.fixed32 = function read_fixed32() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4);
      };
      Reader.prototype.sfixed32 = function read_sfixed32() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4) | 0;
      };
      function readFixed64() {
        if (this.pos + 8 > this.len)
          throw indexOutOfRange(this, 8);
        return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
      }
      Reader.prototype.float = function read_float() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        var value = util.float.readFloatLE(this.buf, this.pos);
        this.pos += 4;
        return value;
      };
      Reader.prototype.double = function read_double() {
        if (this.pos + 8 > this.len)
          throw indexOutOfRange(this, 4);
        var value = util.float.readDoubleLE(this.buf, this.pos);
        this.pos += 8;
        return value;
      };
      Reader.prototype.bytes = function read_bytes() {
        var length = this.uint32(), start = this.pos, end = this.pos + length;
        if (end > this.len)
          throw indexOutOfRange(this, length);
        this.pos += length;
        if (Array.isArray(this.buf))
          return this.buf.slice(start, end);
        return start === end ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
      };
      Reader.prototype.string = function read_string() {
        var bytes = this.bytes();
        return utf8.read(bytes, 0, bytes.length);
      };
      Reader.prototype.skip = function skip(length) {
        if (typeof length === "number") {
          if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
          this.pos += length;
        } else {
          do {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
          } while (this.buf[this.pos++] & 128);
        }
        return this;
      };
      Reader.prototype.skipType = function(wireType) {
        switch (wireType) {
          case 0:
            this.skip();
            break;
          case 1:
            this.skip(8);
            break;
          case 2:
            this.skip(this.uint32());
            break;
          case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
              this.skipType(wireType);
            }
            break;
          case 5:
            this.skip(4);
            break;
          default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
        }
        return this;
      };
      Reader._configure = function(BufferReader_) {
        BufferReader = BufferReader_;
        Reader.create = create();
        BufferReader._configure();
        var fn = util.Long ? "toLong" : "toNumber";
        util.merge(Reader.prototype, {
          int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
          },
          uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
          },
          sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
          },
          fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
          },
          sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
          }
        });
      };
    }
  });

  // node_modules/protobufjs/src/reader_buffer.js
  var require_reader_buffer = __commonJS({
    "node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
      "use strict";
      module2.exports = BufferReader;
      var Reader = require_reader();
      (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
      var util = require_minimal();
      function BufferReader(buffer) {
        Reader.call(this, buffer);
      }
      BufferReader._configure = function() {
        if (util.Buffer)
          BufferReader.prototype._slice = util.Buffer.prototype.slice;
      };
      BufferReader.prototype.string = function read_string_buffer() {
        var len = this.uint32();
        return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
      };
      BufferReader._configure();
    }
  });

  // node_modules/protobufjs/src/rpc/service.js
  var require_service = __commonJS({
    "node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
      "use strict";
      module2.exports = Service;
      var util = require_minimal();
      (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
      function Service(rpcImpl, requestDelimited, responseDelimited) {
        if (typeof rpcImpl !== "function")
          throw TypeError("rpcImpl must be a function");
        util.EventEmitter.call(this);
        this.rpcImpl = rpcImpl;
        this.requestDelimited = Boolean(requestDelimited);
        this.responseDelimited = Boolean(responseDelimited);
      }
      Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
        if (!request)
          throw TypeError("request must be specified");
        var self2 = this;
        if (!callback)
          return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
        if (!self2.rpcImpl) {
          setTimeout(function() {
            callback(Error("already ended"));
          }, 0);
          return void 0;
        }
        try {
          return self2.rpcImpl(
            method,
            requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {
              if (err) {
                self2.emit("error", err, method);
                return callback(err);
              }
              if (response === null) {
                self2.end(true);
                return void 0;
              }
              if (!(response instanceof responseCtor)) {
                try {
                  response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
                } catch (err2) {
                  self2.emit("error", err2, method);
                  return callback(err2);
                }
              }
              self2.emit("data", response, method);
              return callback(null, response);
            }
          );
        } catch (err) {
          self2.emit("error", err, method);
          setTimeout(function() {
            callback(err);
          }, 0);
          return void 0;
        }
      };
      Service.prototype.end = function end(endedByRPC) {
        if (this.rpcImpl) {
          if (!endedByRPC)
            this.rpcImpl(null, null, null);
          this.rpcImpl = null;
          this.emit("end").off();
        }
        return this;
      };
    }
  });

  // node_modules/protobufjs/src/rpc.js
  var require_rpc = __commonJS({
    "node_modules/protobufjs/src/rpc.js"(exports2) {
      "use strict";
      var rpc = exports2;
      rpc.Service = require_service();
    }
  });

  // node_modules/protobufjs/src/roots.js
  var require_roots = __commonJS({
    "node_modules/protobufjs/src/roots.js"(exports2, module2) {
      "use strict";
      module2.exports = {};
    }
  });

  // node_modules/protobufjs/src/index-minimal.js
  var require_index_minimal = __commonJS({
    "node_modules/protobufjs/src/index-minimal.js"(exports2) {
      "use strict";
      var protobuf = exports2;
      protobuf.build = "minimal";
      protobuf.Writer = require_writer();
      protobuf.BufferWriter = require_writer_buffer();
      protobuf.Reader = require_reader();
      protobuf.BufferReader = require_reader_buffer();
      protobuf.util = require_minimal();
      protobuf.rpc = require_rpc();
      protobuf.roots = require_roots();
      protobuf.configure = configure;
      function configure() {
        protobuf.util._configure();
        protobuf.Writer._configure(protobuf.BufferWriter);
        protobuf.Reader._configure(protobuf.BufferReader);
      }
      configure();
    }
  });

  // node_modules/protobufjs/minimal.js
  var require_minimal2 = __commonJS({
    "node_modules/protobufjs/minimal.js"(exports2, module2) {
      "use strict";
      module2.exports = require_index_minimal();
    }
  });

  // node_modules/cosmjs-types/cosmos/base/v1beta1/coin.js
  var require_coin = __commonJS({
    "node_modules/cosmjs-types/cosmos/base/v1beta1/coin.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.DecProto = exports2.IntProto = exports2.DecCoin = exports2.Coin = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      exports2.protobufPackage = "cosmos.base.v1beta1";
      var baseCoin = { denom: "", amount: "" };
      exports2.Coin = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
          }
          if (message.amount !== "") {
            writer.uint32(18).string(message.amount);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseCoin);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.denom = reader.string();
                break;
              case 2:
                message.amount = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseCoin);
          message.denom = object.denom !== void 0 && object.denom !== null ? String(object.denom) : "";
          message.amount = object.amount !== void 0 && object.amount !== null ? String(object.amount) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.denom !== void 0 && (obj.denom = message.denom);
          message.amount !== void 0 && (obj.amount = message.amount);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseCoin);
          message.denom = (_a = object.denom) !== null && _a !== void 0 ? _a : "";
          message.amount = (_b = object.amount) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseDecCoin = { denom: "", amount: "" };
      exports2.DecCoin = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
          }
          if (message.amount !== "") {
            writer.uint32(18).string(message.amount);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseDecCoin);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.denom = reader.string();
                break;
              case 2:
                message.amount = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseDecCoin);
          message.denom = object.denom !== void 0 && object.denom !== null ? String(object.denom) : "";
          message.amount = object.amount !== void 0 && object.amount !== null ? String(object.amount) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.denom !== void 0 && (obj.denom = message.denom);
          message.amount !== void 0 && (obj.amount = message.amount);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseDecCoin);
          message.denom = (_a = object.denom) !== null && _a !== void 0 ? _a : "";
          message.amount = (_b = object.amount) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseIntProto = { int: "" };
      exports2.IntProto = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.int !== "") {
            writer.uint32(10).string(message.int);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseIntProto);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.int = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseIntProto);
          message.int = object.int !== void 0 && object.int !== null ? String(object.int) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.int !== void 0 && (obj.int = message.int);
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseIntProto);
          message.int = (_a = object.int) !== null && _a !== void 0 ? _a : "";
          return message;
        }
      };
      var baseDecProto = { dec: "" };
      exports2.DecProto = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.dec !== "") {
            writer.uint32(10).string(message.dec);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseDecProto);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.dec = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseDecProto);
          message.dec = object.dec !== void 0 && object.dec !== null ? String(object.dec) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.dec !== void 0 && (obj.dec = message.dec);
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseDecProto);
          message.dec = (_a = object.dec) !== null && _a !== void 0 ? _a : "";
          return message;
        }
      };
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/cosmos/bank/v1beta1/bank.js
  var require_bank = __commonJS({
    "node_modules/cosmjs-types/cosmos/bank/v1beta1/bank.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.Metadata = exports2.DenomUnit = exports2.Supply = exports2.Output = exports2.Input = exports2.SendEnabled = exports2.Params = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var coin_1 = require_coin();
      exports2.protobufPackage = "cosmos.bank.v1beta1";
      var baseParams = { defaultSendEnabled: false };
      exports2.Params = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.sendEnabled) {
            exports2.SendEnabled.encode(v, writer.uint32(10).fork()).ldelim();
          }
          if (message.defaultSendEnabled === true) {
            writer.uint32(16).bool(message.defaultSendEnabled);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseParams);
          message.sendEnabled = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.sendEnabled.push(exports2.SendEnabled.decode(reader, reader.uint32()));
                break;
              case 2:
                message.defaultSendEnabled = reader.bool();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseParams);
          message.sendEnabled = ((_a = object.sendEnabled) !== null && _a !== void 0 ? _a : []).map((e) => exports2.SendEnabled.fromJSON(e));
          message.defaultSendEnabled = object.defaultSendEnabled !== void 0 && object.defaultSendEnabled !== null ? Boolean(object.defaultSendEnabled) : false;
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.sendEnabled) {
            obj.sendEnabled = message.sendEnabled.map((e) => e ? exports2.SendEnabled.toJSON(e) : void 0);
          } else {
            obj.sendEnabled = [];
          }
          message.defaultSendEnabled !== void 0 && (obj.defaultSendEnabled = message.defaultSendEnabled);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseParams);
          message.sendEnabled = ((_a = object.sendEnabled) === null || _a === void 0 ? void 0 : _a.map((e) => exports2.SendEnabled.fromPartial(e))) || [];
          message.defaultSendEnabled = (_b = object.defaultSendEnabled) !== null && _b !== void 0 ? _b : false;
          return message;
        }
      };
      var baseSendEnabled = { denom: "", enabled: false };
      exports2.SendEnabled = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
          }
          if (message.enabled === true) {
            writer.uint32(16).bool(message.enabled);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseSendEnabled);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.denom = reader.string();
                break;
              case 2:
                message.enabled = reader.bool();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseSendEnabled);
          message.denom = object.denom !== void 0 && object.denom !== null ? String(object.denom) : "";
          message.enabled = object.enabled !== void 0 && object.enabled !== null ? Boolean(object.enabled) : false;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.denom !== void 0 && (obj.denom = message.denom);
          message.enabled !== void 0 && (obj.enabled = message.enabled);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseSendEnabled);
          message.denom = (_a = object.denom) !== null && _a !== void 0 ? _a : "";
          message.enabled = (_b = object.enabled) !== null && _b !== void 0 ? _b : false;
          return message;
        }
      };
      var baseInput = { address: "" };
      exports2.Input = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.address !== "") {
            writer.uint32(10).string(message.address);
          }
          for (const v of message.coins) {
            coin_1.Coin.encode(v, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseInput);
          message.coins = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.address = reader.string();
                break;
              case 2:
                message.coins.push(coin_1.Coin.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseInput);
          message.address = object.address !== void 0 && object.address !== null ? String(object.address) : "";
          message.coins = ((_a = object.coins) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.address !== void 0 && (obj.address = message.address);
          if (message.coins) {
            obj.coins = message.coins.map((e) => e ? coin_1.Coin.toJSON(e) : void 0);
          } else {
            obj.coins = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseInput);
          message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
          message.coins = ((_b = object.coins) === null || _b === void 0 ? void 0 : _b.map((e) => coin_1.Coin.fromPartial(e))) || [];
          return message;
        }
      };
      var baseOutput = { address: "" };
      exports2.Output = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.address !== "") {
            writer.uint32(10).string(message.address);
          }
          for (const v of message.coins) {
            coin_1.Coin.encode(v, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseOutput);
          message.coins = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.address = reader.string();
                break;
              case 2:
                message.coins.push(coin_1.Coin.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseOutput);
          message.address = object.address !== void 0 && object.address !== null ? String(object.address) : "";
          message.coins = ((_a = object.coins) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.address !== void 0 && (obj.address = message.address);
          if (message.coins) {
            obj.coins = message.coins.map((e) => e ? coin_1.Coin.toJSON(e) : void 0);
          } else {
            obj.coins = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseOutput);
          message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
          message.coins = ((_b = object.coins) === null || _b === void 0 ? void 0 : _b.map((e) => coin_1.Coin.fromPartial(e))) || [];
          return message;
        }
      };
      var baseSupply = {};
      exports2.Supply = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.total) {
            coin_1.Coin.encode(v, writer.uint32(10).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseSupply);
          message.total = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.total.push(coin_1.Coin.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseSupply);
          message.total = ((_a = object.total) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.total) {
            obj.total = message.total.map((e) => e ? coin_1.Coin.toJSON(e) : void 0);
          } else {
            obj.total = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseSupply);
          message.total = ((_a = object.total) === null || _a === void 0 ? void 0 : _a.map((e) => coin_1.Coin.fromPartial(e))) || [];
          return message;
        }
      };
      var baseDenomUnit = { denom: "", exponent: 0, aliases: "" };
      exports2.DenomUnit = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
          }
          if (message.exponent !== 0) {
            writer.uint32(16).uint32(message.exponent);
          }
          for (const v of message.aliases) {
            writer.uint32(26).string(v);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseDenomUnit);
          message.aliases = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.denom = reader.string();
                break;
              case 2:
                message.exponent = reader.uint32();
                break;
              case 3:
                message.aliases.push(reader.string());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseDenomUnit);
          message.denom = object.denom !== void 0 && object.denom !== null ? String(object.denom) : "";
          message.exponent = object.exponent !== void 0 && object.exponent !== null ? Number(object.exponent) : 0;
          message.aliases = ((_a = object.aliases) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.denom !== void 0 && (obj.denom = message.denom);
          message.exponent !== void 0 && (obj.exponent = message.exponent);
          if (message.aliases) {
            obj.aliases = message.aliases.map((e) => e);
          } else {
            obj.aliases = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseDenomUnit);
          message.denom = (_a = object.denom) !== null && _a !== void 0 ? _a : "";
          message.exponent = (_b = object.exponent) !== null && _b !== void 0 ? _b : 0;
          message.aliases = ((_c = object.aliases) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
          return message;
        }
      };
      var baseMetadata = { description: "", base: "", display: "", name: "", symbol: "" };
      exports2.Metadata = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.description !== "") {
            writer.uint32(10).string(message.description);
          }
          for (const v of message.denomUnits) {
            exports2.DenomUnit.encode(v, writer.uint32(18).fork()).ldelim();
          }
          if (message.base !== "") {
            writer.uint32(26).string(message.base);
          }
          if (message.display !== "") {
            writer.uint32(34).string(message.display);
          }
          if (message.name !== "") {
            writer.uint32(42).string(message.name);
          }
          if (message.symbol !== "") {
            writer.uint32(50).string(message.symbol);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMetadata);
          message.denomUnits = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.description = reader.string();
                break;
              case 2:
                message.denomUnits.push(exports2.DenomUnit.decode(reader, reader.uint32()));
                break;
              case 3:
                message.base = reader.string();
                break;
              case 4:
                message.display = reader.string();
                break;
              case 5:
                message.name = reader.string();
                break;
              case 6:
                message.symbol = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseMetadata);
          message.description = object.description !== void 0 && object.description !== null ? String(object.description) : "";
          message.denomUnits = ((_a = object.denomUnits) !== null && _a !== void 0 ? _a : []).map((e) => exports2.DenomUnit.fromJSON(e));
          message.base = object.base !== void 0 && object.base !== null ? String(object.base) : "";
          message.display = object.display !== void 0 && object.display !== null ? String(object.display) : "";
          message.name = object.name !== void 0 && object.name !== null ? String(object.name) : "";
          message.symbol = object.symbol !== void 0 && object.symbol !== null ? String(object.symbol) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.description !== void 0 && (obj.description = message.description);
          if (message.denomUnits) {
            obj.denomUnits = message.denomUnits.map((e) => e ? exports2.DenomUnit.toJSON(e) : void 0);
          } else {
            obj.denomUnits = [];
          }
          message.base !== void 0 && (obj.base = message.base);
          message.display !== void 0 && (obj.display = message.display);
          message.name !== void 0 && (obj.name = message.name);
          message.symbol !== void 0 && (obj.symbol = message.symbol);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d, _e, _f;
          const message = Object.assign({}, baseMetadata);
          message.description = (_a = object.description) !== null && _a !== void 0 ? _a : "";
          message.denomUnits = ((_b = object.denomUnits) === null || _b === void 0 ? void 0 : _b.map((e) => exports2.DenomUnit.fromPartial(e))) || [];
          message.base = (_c = object.base) !== null && _c !== void 0 ? _c : "";
          message.display = (_d = object.display) !== null && _d !== void 0 ? _d : "";
          message.name = (_e = object.name) !== null && _e !== void 0 ? _e : "";
          message.symbol = (_f = object.symbol) !== null && _f !== void 0 ? _f : "";
          return message;
        }
      };
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/cosmos/bank/v1beta1/tx.js
  var require_tx = __commonJS({
    "node_modules/cosmjs-types/cosmos/bank/v1beta1/tx.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.MsgClientImpl = exports2.MsgMultiSendResponse = exports2.MsgMultiSend = exports2.MsgSendResponse = exports2.MsgSend = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var coin_1 = require_coin();
      var bank_1 = require_bank();
      exports2.protobufPackage = "cosmos.bank.v1beta1";
      var baseMsgSend = { fromAddress: "", toAddress: "" };
      exports2.MsgSend = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.fromAddress !== "") {
            writer.uint32(10).string(message.fromAddress);
          }
          if (message.toAddress !== "") {
            writer.uint32(18).string(message.toAddress);
          }
          for (const v of message.amount) {
            coin_1.Coin.encode(v, writer.uint32(26).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgSend);
          message.amount = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.fromAddress = reader.string();
                break;
              case 2:
                message.toAddress = reader.string();
                break;
              case 3:
                message.amount.push(coin_1.Coin.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseMsgSend);
          message.fromAddress = object.fromAddress !== void 0 && object.fromAddress !== null ? String(object.fromAddress) : "";
          message.toAddress = object.toAddress !== void 0 && object.toAddress !== null ? String(object.toAddress) : "";
          message.amount = ((_a = object.amount) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.fromAddress !== void 0 && (obj.fromAddress = message.fromAddress);
          message.toAddress !== void 0 && (obj.toAddress = message.toAddress);
          if (message.amount) {
            obj.amount = message.amount.map((e) => e ? coin_1.Coin.toJSON(e) : void 0);
          } else {
            obj.amount = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseMsgSend);
          message.fromAddress = (_a = object.fromAddress) !== null && _a !== void 0 ? _a : "";
          message.toAddress = (_b = object.toAddress) !== null && _b !== void 0 ? _b : "";
          message.amount = ((_c = object.amount) === null || _c === void 0 ? void 0 : _c.map((e) => coin_1.Coin.fromPartial(e))) || [];
          return message;
        }
      };
      var baseMsgSendResponse = {};
      exports2.MsgSendResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgSendResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgSendResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgSendResponse);
          return message;
        }
      };
      var baseMsgMultiSend = {};
      exports2.MsgMultiSend = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.inputs) {
            bank_1.Input.encode(v, writer.uint32(10).fork()).ldelim();
          }
          for (const v of message.outputs) {
            bank_1.Output.encode(v, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgMultiSend);
          message.inputs = [];
          message.outputs = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.inputs.push(bank_1.Input.decode(reader, reader.uint32()));
                break;
              case 2:
                message.outputs.push(bank_1.Output.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgMultiSend);
          message.inputs = ((_a = object.inputs) !== null && _a !== void 0 ? _a : []).map((e) => bank_1.Input.fromJSON(e));
          message.outputs = ((_b = object.outputs) !== null && _b !== void 0 ? _b : []).map((e) => bank_1.Output.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.inputs) {
            obj.inputs = message.inputs.map((e) => e ? bank_1.Input.toJSON(e) : void 0);
          } else {
            obj.inputs = [];
          }
          if (message.outputs) {
            obj.outputs = message.outputs.map((e) => e ? bank_1.Output.toJSON(e) : void 0);
          } else {
            obj.outputs = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgMultiSend);
          message.inputs = ((_a = object.inputs) === null || _a === void 0 ? void 0 : _a.map((e) => bank_1.Input.fromPartial(e))) || [];
          message.outputs = ((_b = object.outputs) === null || _b === void 0 ? void 0 : _b.map((e) => bank_1.Output.fromPartial(e))) || [];
          return message;
        }
      };
      var baseMsgMultiSendResponse = {};
      exports2.MsgMultiSendResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgMultiSendResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgMultiSendResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgMultiSendResponse);
          return message;
        }
      };
      var MsgClientImpl = class {
        constructor(rpc) {
          this.rpc = rpc;
          this.Send = this.Send.bind(this);
          this.MultiSend = this.MultiSend.bind(this);
        }
        Send(request) {
          const data = exports2.MsgSend.encode(request).finish();
          const promise = this.rpc.request("cosmos.bank.v1beta1.Msg", "Send", data);
          return promise.then((data2) => exports2.MsgSendResponse.decode(new minimal_1.default.Reader(data2)));
        }
        MultiSend(request) {
          const data = exports2.MsgMultiSend.encode(request).finish();
          const promise = this.rpc.request("cosmos.bank.v1beta1.Msg", "MultiSend", data);
          return promise.then((data2) => exports2.MsgMultiSendResponse.decode(new minimal_1.default.Reader(data2)));
        }
      };
      exports2.MsgClientImpl = MsgClientImpl;
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/cosmos/distribution/v1beta1/tx.js
  var require_tx2 = __commonJS({
    "node_modules/cosmjs-types/cosmos/distribution/v1beta1/tx.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.MsgClientImpl = exports2.MsgFundCommunityPoolResponse = exports2.MsgFundCommunityPool = exports2.MsgWithdrawValidatorCommissionResponse = exports2.MsgWithdrawValidatorCommission = exports2.MsgWithdrawDelegatorRewardResponse = exports2.MsgWithdrawDelegatorReward = exports2.MsgSetWithdrawAddressResponse = exports2.MsgSetWithdrawAddress = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var coin_1 = require_coin();
      exports2.protobufPackage = "cosmos.distribution.v1beta1";
      var baseMsgSetWithdrawAddress = { delegatorAddress: "", withdrawAddress: "" };
      exports2.MsgSetWithdrawAddress = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
          }
          if (message.withdrawAddress !== "") {
            writer.uint32(18).string(message.withdrawAddress);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgSetWithdrawAddress);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.delegatorAddress = reader.string();
                break;
              case 2:
                message.withdrawAddress = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgSetWithdrawAddress);
          message.delegatorAddress = object.delegatorAddress !== void 0 && object.delegatorAddress !== null ? String(object.delegatorAddress) : "";
          message.withdrawAddress = object.withdrawAddress !== void 0 && object.withdrawAddress !== null ? String(object.withdrawAddress) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.delegatorAddress !== void 0 && (obj.delegatorAddress = message.delegatorAddress);
          message.withdrawAddress !== void 0 && (obj.withdrawAddress = message.withdrawAddress);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgSetWithdrawAddress);
          message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
          message.withdrawAddress = (_b = object.withdrawAddress) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseMsgSetWithdrawAddressResponse = {};
      exports2.MsgSetWithdrawAddressResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgSetWithdrawAddressResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgSetWithdrawAddressResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgSetWithdrawAddressResponse);
          return message;
        }
      };
      var baseMsgWithdrawDelegatorReward = { delegatorAddress: "", validatorAddress: "" };
      exports2.MsgWithdrawDelegatorReward = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
          }
          if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgWithdrawDelegatorReward);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.delegatorAddress = reader.string();
                break;
              case 2:
                message.validatorAddress = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgWithdrawDelegatorReward);
          message.delegatorAddress = object.delegatorAddress !== void 0 && object.delegatorAddress !== null ? String(object.delegatorAddress) : "";
          message.validatorAddress = object.validatorAddress !== void 0 && object.validatorAddress !== null ? String(object.validatorAddress) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.delegatorAddress !== void 0 && (obj.delegatorAddress = message.delegatorAddress);
          message.validatorAddress !== void 0 && (obj.validatorAddress = message.validatorAddress);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgWithdrawDelegatorReward);
          message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
          message.validatorAddress = (_b = object.validatorAddress) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseMsgWithdrawDelegatorRewardResponse = {};
      exports2.MsgWithdrawDelegatorRewardResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgWithdrawDelegatorRewardResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgWithdrawDelegatorRewardResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgWithdrawDelegatorRewardResponse);
          return message;
        }
      };
      var baseMsgWithdrawValidatorCommission = { validatorAddress: "" };
      exports2.MsgWithdrawValidatorCommission = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgWithdrawValidatorCommission);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.validatorAddress = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgWithdrawValidatorCommission);
          message.validatorAddress = object.validatorAddress !== void 0 && object.validatorAddress !== null ? String(object.validatorAddress) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.validatorAddress !== void 0 && (obj.validatorAddress = message.validatorAddress);
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseMsgWithdrawValidatorCommission);
          message.validatorAddress = (_a = object.validatorAddress) !== null && _a !== void 0 ? _a : "";
          return message;
        }
      };
      var baseMsgWithdrawValidatorCommissionResponse = {};
      exports2.MsgWithdrawValidatorCommissionResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgWithdrawValidatorCommissionResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgWithdrawValidatorCommissionResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgWithdrawValidatorCommissionResponse);
          return message;
        }
      };
      var baseMsgFundCommunityPool = { depositor: "" };
      exports2.MsgFundCommunityPool = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.amount) {
            coin_1.Coin.encode(v, writer.uint32(10).fork()).ldelim();
          }
          if (message.depositor !== "") {
            writer.uint32(18).string(message.depositor);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgFundCommunityPool);
          message.amount = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.amount.push(coin_1.Coin.decode(reader, reader.uint32()));
                break;
              case 2:
                message.depositor = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseMsgFundCommunityPool);
          message.amount = ((_a = object.amount) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
          message.depositor = object.depositor !== void 0 && object.depositor !== null ? String(object.depositor) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.amount) {
            obj.amount = message.amount.map((e) => e ? coin_1.Coin.toJSON(e) : void 0);
          } else {
            obj.amount = [];
          }
          message.depositor !== void 0 && (obj.depositor = message.depositor);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgFundCommunityPool);
          message.amount = ((_a = object.amount) === null || _a === void 0 ? void 0 : _a.map((e) => coin_1.Coin.fromPartial(e))) || [];
          message.depositor = (_b = object.depositor) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseMsgFundCommunityPoolResponse = {};
      exports2.MsgFundCommunityPoolResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgFundCommunityPoolResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgFundCommunityPoolResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgFundCommunityPoolResponse);
          return message;
        }
      };
      var MsgClientImpl = class {
        constructor(rpc) {
          this.rpc = rpc;
          this.SetWithdrawAddress = this.SetWithdrawAddress.bind(this);
          this.WithdrawDelegatorReward = this.WithdrawDelegatorReward.bind(this);
          this.WithdrawValidatorCommission = this.WithdrawValidatorCommission.bind(this);
          this.FundCommunityPool = this.FundCommunityPool.bind(this);
        }
        SetWithdrawAddress(request) {
          const data = exports2.MsgSetWithdrawAddress.encode(request).finish();
          const promise = this.rpc.request("cosmos.distribution.v1beta1.Msg", "SetWithdrawAddress", data);
          return promise.then((data2) => exports2.MsgSetWithdrawAddressResponse.decode(new minimal_1.default.Reader(data2)));
        }
        WithdrawDelegatorReward(request) {
          const data = exports2.MsgWithdrawDelegatorReward.encode(request).finish();
          const promise = this.rpc.request("cosmos.distribution.v1beta1.Msg", "WithdrawDelegatorReward", data);
          return promise.then((data2) => exports2.MsgWithdrawDelegatorRewardResponse.decode(new minimal_1.default.Reader(data2)));
        }
        WithdrawValidatorCommission(request) {
          const data = exports2.MsgWithdrawValidatorCommission.encode(request).finish();
          const promise = this.rpc.request("cosmos.distribution.v1beta1.Msg", "WithdrawValidatorCommission", data);
          return promise.then((data2) => exports2.MsgWithdrawValidatorCommissionResponse.decode(new minimal_1.default.Reader(data2)));
        }
        FundCommunityPool(request) {
          const data = exports2.MsgFundCommunityPool.encode(request).finish();
          const promise = this.rpc.request("cosmos.distribution.v1beta1.Msg", "FundCommunityPool", data);
          return promise.then((data2) => exports2.MsgFundCommunityPoolResponse.decode(new minimal_1.default.Reader(data2)));
        }
      };
      exports2.MsgClientImpl = MsgClientImpl;
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/google/protobuf/any.js
  var require_any = __commonJS({
    "node_modules/cosmjs-types/google/protobuf/any.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.Any = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      exports2.protobufPackage = "google.protobuf";
      var baseAny = { typeUrl: "" };
      exports2.Any = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.typeUrl !== "") {
            writer.uint32(10).string(message.typeUrl);
          }
          if (message.value.length !== 0) {
            writer.uint32(18).bytes(message.value);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseAny);
          message.value = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.typeUrl = reader.string();
                break;
              case 2:
                message.value = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseAny);
          message.typeUrl = object.typeUrl !== void 0 && object.typeUrl !== null ? String(object.typeUrl) : "";
          message.value = object.value !== void 0 && object.value !== null ? bytesFromBase64(object.value) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.typeUrl !== void 0 && (obj.typeUrl = message.typeUrl);
          message.value !== void 0 && (obj.value = base64FromBytes(message.value !== void 0 ? message.value : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseAny);
          message.typeUrl = (_a = object.typeUrl) !== null && _a !== void 0 ? _a : "";
          message.value = (_b = object.value) !== null && _b !== void 0 ? _b : new Uint8Array();
          return message;
        }
      };
      var globalThis = (() => {
        if (typeof globalThis !== "undefined")
          return globalThis;
        if (typeof self !== "undefined")
          return self;
        if (typeof window !== "undefined")
          return window;
        if (typeof global !== "undefined")
          return global;
        throw "Unable to locate global object";
      })();
      var atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
      function bytesFromBase64(b64) {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
          arr[i] = bin.charCodeAt(i);
        }
        return arr;
      }
      var btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
      function base64FromBytes(arr) {
        const bin = [];
        for (const byte of arr) {
          bin.push(String.fromCharCode(byte));
        }
        return btoa(bin.join(""));
      }
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/google/protobuf/timestamp.js
  var require_timestamp = __commonJS({
    "node_modules/cosmjs-types/google/protobuf/timestamp.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.Timestamp = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      exports2.protobufPackage = "google.protobuf";
      var baseTimestamp = { seconds: long_1.default.ZERO, nanos: 0 };
      exports2.Timestamp = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.seconds.isZero()) {
            writer.uint32(8).int64(message.seconds);
          }
          if (message.nanos !== 0) {
            writer.uint32(16).int32(message.nanos);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseTimestamp);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.seconds = reader.int64();
                break;
              case 2:
                message.nanos = reader.int32();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseTimestamp);
          message.seconds = object.seconds !== void 0 && object.seconds !== null ? long_1.default.fromString(object.seconds) : long_1.default.ZERO;
          message.nanos = object.nanos !== void 0 && object.nanos !== null ? Number(object.nanos) : 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.seconds !== void 0 && (obj.seconds = (message.seconds || long_1.default.ZERO).toString());
          message.nanos !== void 0 && (obj.nanos = message.nanos);
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseTimestamp);
          message.seconds = object.seconds !== void 0 && object.seconds !== null ? long_1.default.fromValue(object.seconds) : long_1.default.ZERO;
          message.nanos = (_a = object.nanos) !== null && _a !== void 0 ? _a : 0;
          return message;
        }
      };
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/google/protobuf/duration.js
  var require_duration = __commonJS({
    "node_modules/cosmjs-types/google/protobuf/duration.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.Duration = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      exports2.protobufPackage = "google.protobuf";
      var baseDuration = { seconds: long_1.default.ZERO, nanos: 0 };
      exports2.Duration = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.seconds.isZero()) {
            writer.uint32(8).int64(message.seconds);
          }
          if (message.nanos !== 0) {
            writer.uint32(16).int32(message.nanos);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseDuration);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.seconds = reader.int64();
                break;
              case 2:
                message.nanos = reader.int32();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseDuration);
          message.seconds = object.seconds !== void 0 && object.seconds !== null ? long_1.default.fromString(object.seconds) : long_1.default.ZERO;
          message.nanos = object.nanos !== void 0 && object.nanos !== null ? Number(object.nanos) : 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.seconds !== void 0 && (obj.seconds = (message.seconds || long_1.default.ZERO).toString());
          message.nanos !== void 0 && (obj.nanos = message.nanos);
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseDuration);
          message.seconds = object.seconds !== void 0 && object.seconds !== null ? long_1.default.fromValue(object.seconds) : long_1.default.ZERO;
          message.nanos = (_a = object.nanos) !== null && _a !== void 0 ? _a : 0;
          return message;
        }
      };
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/cosmos/gov/v1beta1/gov.js
  var require_gov = __commonJS({
    "node_modules/cosmjs-types/cosmos/gov/v1beta1/gov.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.TallyParams = exports2.VotingParams = exports2.DepositParams = exports2.Vote = exports2.TallyResult = exports2.Proposal = exports2.Deposit = exports2.TextProposal = exports2.WeightedVoteOption = exports2.proposalStatusToJSON = exports2.proposalStatusFromJSON = exports2.ProposalStatus = exports2.voteOptionToJSON = exports2.voteOptionFromJSON = exports2.VoteOption = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var any_1 = require_any();
      var timestamp_1 = require_timestamp();
      var duration_1 = require_duration();
      var coin_1 = require_coin();
      exports2.protobufPackage = "cosmos.gov.v1beta1";
      var VoteOption;
      (function(VoteOption2) {
        VoteOption2[VoteOption2["VOTE_OPTION_UNSPECIFIED"] = 0] = "VOTE_OPTION_UNSPECIFIED";
        VoteOption2[VoteOption2["VOTE_OPTION_YES"] = 1] = "VOTE_OPTION_YES";
        VoteOption2[VoteOption2["VOTE_OPTION_ABSTAIN"] = 2] = "VOTE_OPTION_ABSTAIN";
        VoteOption2[VoteOption2["VOTE_OPTION_NO"] = 3] = "VOTE_OPTION_NO";
        VoteOption2[VoteOption2["VOTE_OPTION_NO_WITH_VETO"] = 4] = "VOTE_OPTION_NO_WITH_VETO";
        VoteOption2[VoteOption2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
      })(VoteOption = exports2.VoteOption || (exports2.VoteOption = {}));
      function voteOptionFromJSON(object) {
        switch (object) {
          case 0:
          case "VOTE_OPTION_UNSPECIFIED":
            return VoteOption.VOTE_OPTION_UNSPECIFIED;
          case 1:
          case "VOTE_OPTION_YES":
            return VoteOption.VOTE_OPTION_YES;
          case 2:
          case "VOTE_OPTION_ABSTAIN":
            return VoteOption.VOTE_OPTION_ABSTAIN;
          case 3:
          case "VOTE_OPTION_NO":
            return VoteOption.VOTE_OPTION_NO;
          case 4:
          case "VOTE_OPTION_NO_WITH_VETO":
            return VoteOption.VOTE_OPTION_NO_WITH_VETO;
          case -1:
          case "UNRECOGNIZED":
          default:
            return VoteOption.UNRECOGNIZED;
        }
      }
      exports2.voteOptionFromJSON = voteOptionFromJSON;
      function voteOptionToJSON(object) {
        switch (object) {
          case VoteOption.VOTE_OPTION_UNSPECIFIED:
            return "VOTE_OPTION_UNSPECIFIED";
          case VoteOption.VOTE_OPTION_YES:
            return "VOTE_OPTION_YES";
          case VoteOption.VOTE_OPTION_ABSTAIN:
            return "VOTE_OPTION_ABSTAIN";
          case VoteOption.VOTE_OPTION_NO:
            return "VOTE_OPTION_NO";
          case VoteOption.VOTE_OPTION_NO_WITH_VETO:
            return "VOTE_OPTION_NO_WITH_VETO";
          default:
            return "UNKNOWN";
        }
      }
      exports2.voteOptionToJSON = voteOptionToJSON;
      var ProposalStatus;
      (function(ProposalStatus2) {
        ProposalStatus2[ProposalStatus2["PROPOSAL_STATUS_UNSPECIFIED"] = 0] = "PROPOSAL_STATUS_UNSPECIFIED";
        ProposalStatus2[ProposalStatus2["PROPOSAL_STATUS_DEPOSIT_PERIOD"] = 1] = "PROPOSAL_STATUS_DEPOSIT_PERIOD";
        ProposalStatus2[ProposalStatus2["PROPOSAL_STATUS_VOTING_PERIOD"] = 2] = "PROPOSAL_STATUS_VOTING_PERIOD";
        ProposalStatus2[ProposalStatus2["PROPOSAL_STATUS_PASSED"] = 3] = "PROPOSAL_STATUS_PASSED";
        ProposalStatus2[ProposalStatus2["PROPOSAL_STATUS_REJECTED"] = 4] = "PROPOSAL_STATUS_REJECTED";
        ProposalStatus2[ProposalStatus2["PROPOSAL_STATUS_FAILED"] = 5] = "PROPOSAL_STATUS_FAILED";
        ProposalStatus2[ProposalStatus2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
      })(ProposalStatus = exports2.ProposalStatus || (exports2.ProposalStatus = {}));
      function proposalStatusFromJSON(object) {
        switch (object) {
          case 0:
          case "PROPOSAL_STATUS_UNSPECIFIED":
            return ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED;
          case 1:
          case "PROPOSAL_STATUS_DEPOSIT_PERIOD":
            return ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD;
          case 2:
          case "PROPOSAL_STATUS_VOTING_PERIOD":
            return ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD;
          case 3:
          case "PROPOSAL_STATUS_PASSED":
            return ProposalStatus.PROPOSAL_STATUS_PASSED;
          case 4:
          case "PROPOSAL_STATUS_REJECTED":
            return ProposalStatus.PROPOSAL_STATUS_REJECTED;
          case 5:
          case "PROPOSAL_STATUS_FAILED":
            return ProposalStatus.PROPOSAL_STATUS_FAILED;
          case -1:
          case "UNRECOGNIZED":
          default:
            return ProposalStatus.UNRECOGNIZED;
        }
      }
      exports2.proposalStatusFromJSON = proposalStatusFromJSON;
      function proposalStatusToJSON(object) {
        switch (object) {
          case ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED:
            return "PROPOSAL_STATUS_UNSPECIFIED";
          case ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD:
            return "PROPOSAL_STATUS_DEPOSIT_PERIOD";
          case ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD:
            return "PROPOSAL_STATUS_VOTING_PERIOD";
          case ProposalStatus.PROPOSAL_STATUS_PASSED:
            return "PROPOSAL_STATUS_PASSED";
          case ProposalStatus.PROPOSAL_STATUS_REJECTED:
            return "PROPOSAL_STATUS_REJECTED";
          case ProposalStatus.PROPOSAL_STATUS_FAILED:
            return "PROPOSAL_STATUS_FAILED";
          default:
            return "UNKNOWN";
        }
      }
      exports2.proposalStatusToJSON = proposalStatusToJSON;
      var baseWeightedVoteOption = { option: 0, weight: "" };
      exports2.WeightedVoteOption = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.option !== 0) {
            writer.uint32(8).int32(message.option);
          }
          if (message.weight !== "") {
            writer.uint32(18).string(message.weight);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseWeightedVoteOption);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.option = reader.int32();
                break;
              case 2:
                message.weight = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseWeightedVoteOption);
          message.option = object.option !== void 0 && object.option !== null ? voteOptionFromJSON(object.option) : 0;
          message.weight = object.weight !== void 0 && object.weight !== null ? String(object.weight) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.option !== void 0 && (obj.option = voteOptionToJSON(message.option));
          message.weight !== void 0 && (obj.weight = message.weight);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseWeightedVoteOption);
          message.option = (_a = object.option) !== null && _a !== void 0 ? _a : 0;
          message.weight = (_b = object.weight) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseTextProposal = { title: "", description: "" };
      exports2.TextProposal = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.title !== "") {
            writer.uint32(10).string(message.title);
          }
          if (message.description !== "") {
            writer.uint32(18).string(message.description);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseTextProposal);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.title = reader.string();
                break;
              case 2:
                message.description = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseTextProposal);
          message.title = object.title !== void 0 && object.title !== null ? String(object.title) : "";
          message.description = object.description !== void 0 && object.description !== null ? String(object.description) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.title !== void 0 && (obj.title = message.title);
          message.description !== void 0 && (obj.description = message.description);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseTextProposal);
          message.title = (_a = object.title) !== null && _a !== void 0 ? _a : "";
          message.description = (_b = object.description) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseDeposit = { proposalId: long_1.default.UZERO, depositor: "" };
      exports2.Deposit = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.proposalId.isZero()) {
            writer.uint32(8).uint64(message.proposalId);
          }
          if (message.depositor !== "") {
            writer.uint32(18).string(message.depositor);
          }
          for (const v of message.amount) {
            coin_1.Coin.encode(v, writer.uint32(26).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseDeposit);
          message.amount = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.proposalId = reader.uint64();
                break;
              case 2:
                message.depositor = reader.string();
                break;
              case 3:
                message.amount.push(coin_1.Coin.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseDeposit);
          message.proposalId = object.proposalId !== void 0 && object.proposalId !== null ? long_1.default.fromString(object.proposalId) : long_1.default.UZERO;
          message.depositor = object.depositor !== void 0 && object.depositor !== null ? String(object.depositor) : "";
          message.amount = ((_a = object.amount) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.proposalId !== void 0 && (obj.proposalId = (message.proposalId || long_1.default.UZERO).toString());
          message.depositor !== void 0 && (obj.depositor = message.depositor);
          if (message.amount) {
            obj.amount = message.amount.map((e) => e ? coin_1.Coin.toJSON(e) : void 0);
          } else {
            obj.amount = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseDeposit);
          message.proposalId = object.proposalId !== void 0 && object.proposalId !== null ? long_1.default.fromValue(object.proposalId) : long_1.default.UZERO;
          message.depositor = (_a = object.depositor) !== null && _a !== void 0 ? _a : "";
          message.amount = ((_b = object.amount) === null || _b === void 0 ? void 0 : _b.map((e) => coin_1.Coin.fromPartial(e))) || [];
          return message;
        }
      };
      var baseProposal = { proposalId: long_1.default.UZERO, status: 0 };
      exports2.Proposal = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.proposalId.isZero()) {
            writer.uint32(8).uint64(message.proposalId);
          }
          if (message.content !== void 0) {
            any_1.Any.encode(message.content, writer.uint32(18).fork()).ldelim();
          }
          if (message.status !== 0) {
            writer.uint32(24).int32(message.status);
          }
          if (message.finalTallyResult !== void 0) {
            exports2.TallyResult.encode(message.finalTallyResult, writer.uint32(34).fork()).ldelim();
          }
          if (message.submitTime !== void 0) {
            timestamp_1.Timestamp.encode(message.submitTime, writer.uint32(42).fork()).ldelim();
          }
          if (message.depositEndTime !== void 0) {
            timestamp_1.Timestamp.encode(message.depositEndTime, writer.uint32(50).fork()).ldelim();
          }
          for (const v of message.totalDeposit) {
            coin_1.Coin.encode(v, writer.uint32(58).fork()).ldelim();
          }
          if (message.votingStartTime !== void 0) {
            timestamp_1.Timestamp.encode(message.votingStartTime, writer.uint32(66).fork()).ldelim();
          }
          if (message.votingEndTime !== void 0) {
            timestamp_1.Timestamp.encode(message.votingEndTime, writer.uint32(74).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseProposal);
          message.totalDeposit = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.proposalId = reader.uint64();
                break;
              case 2:
                message.content = any_1.Any.decode(reader, reader.uint32());
                break;
              case 3:
                message.status = reader.int32();
                break;
              case 4:
                message.finalTallyResult = exports2.TallyResult.decode(reader, reader.uint32());
                break;
              case 5:
                message.submitTime = timestamp_1.Timestamp.decode(reader, reader.uint32());
                break;
              case 6:
                message.depositEndTime = timestamp_1.Timestamp.decode(reader, reader.uint32());
                break;
              case 7:
                message.totalDeposit.push(coin_1.Coin.decode(reader, reader.uint32()));
                break;
              case 8:
                message.votingStartTime = timestamp_1.Timestamp.decode(reader, reader.uint32());
                break;
              case 9:
                message.votingEndTime = timestamp_1.Timestamp.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseProposal);
          message.proposalId = object.proposalId !== void 0 && object.proposalId !== null ? long_1.default.fromString(object.proposalId) : long_1.default.UZERO;
          message.content = object.content !== void 0 && object.content !== null ? any_1.Any.fromJSON(object.content) : void 0;
          message.status = object.status !== void 0 && object.status !== null ? proposalStatusFromJSON(object.status) : 0;
          message.finalTallyResult = object.finalTallyResult !== void 0 && object.finalTallyResult !== null ? exports2.TallyResult.fromJSON(object.finalTallyResult) : void 0;
          message.submitTime = object.submitTime !== void 0 && object.submitTime !== null ? fromJsonTimestamp(object.submitTime) : void 0;
          message.depositEndTime = object.depositEndTime !== void 0 && object.depositEndTime !== null ? fromJsonTimestamp(object.depositEndTime) : void 0;
          message.totalDeposit = ((_a = object.totalDeposit) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
          message.votingStartTime = object.votingStartTime !== void 0 && object.votingStartTime !== null ? fromJsonTimestamp(object.votingStartTime) : void 0;
          message.votingEndTime = object.votingEndTime !== void 0 && object.votingEndTime !== null ? fromJsonTimestamp(object.votingEndTime) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.proposalId !== void 0 && (obj.proposalId = (message.proposalId || long_1.default.UZERO).toString());
          message.content !== void 0 && (obj.content = message.content ? any_1.Any.toJSON(message.content) : void 0);
          message.status !== void 0 && (obj.status = proposalStatusToJSON(message.status));
          message.finalTallyResult !== void 0 && (obj.finalTallyResult = message.finalTallyResult ? exports2.TallyResult.toJSON(message.finalTallyResult) : void 0);
          message.submitTime !== void 0 && (obj.submitTime = fromTimestamp(message.submitTime).toISOString());
          message.depositEndTime !== void 0 && (obj.depositEndTime = fromTimestamp(message.depositEndTime).toISOString());
          if (message.totalDeposit) {
            obj.totalDeposit = message.totalDeposit.map((e) => e ? coin_1.Coin.toJSON(e) : void 0);
          } else {
            obj.totalDeposit = [];
          }
          message.votingStartTime !== void 0 && (obj.votingStartTime = fromTimestamp(message.votingStartTime).toISOString());
          message.votingEndTime !== void 0 && (obj.votingEndTime = fromTimestamp(message.votingEndTime).toISOString());
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseProposal);
          message.proposalId = object.proposalId !== void 0 && object.proposalId !== null ? long_1.default.fromValue(object.proposalId) : long_1.default.UZERO;
          message.content = object.content !== void 0 && object.content !== null ? any_1.Any.fromPartial(object.content) : void 0;
          message.status = (_a = object.status) !== null && _a !== void 0 ? _a : 0;
          message.finalTallyResult = object.finalTallyResult !== void 0 && object.finalTallyResult !== null ? exports2.TallyResult.fromPartial(object.finalTallyResult) : void 0;
          message.submitTime = object.submitTime !== void 0 && object.submitTime !== null ? timestamp_1.Timestamp.fromPartial(object.submitTime) : void 0;
          message.depositEndTime = object.depositEndTime !== void 0 && object.depositEndTime !== null ? timestamp_1.Timestamp.fromPartial(object.depositEndTime) : void 0;
          message.totalDeposit = ((_b = object.totalDeposit) === null || _b === void 0 ? void 0 : _b.map((e) => coin_1.Coin.fromPartial(e))) || [];
          message.votingStartTime = object.votingStartTime !== void 0 && object.votingStartTime !== null ? timestamp_1.Timestamp.fromPartial(object.votingStartTime) : void 0;
          message.votingEndTime = object.votingEndTime !== void 0 && object.votingEndTime !== null ? timestamp_1.Timestamp.fromPartial(object.votingEndTime) : void 0;
          return message;
        }
      };
      var baseTallyResult = { yes: "", abstain: "", no: "", noWithVeto: "" };
      exports2.TallyResult = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.yes !== "") {
            writer.uint32(10).string(message.yes);
          }
          if (message.abstain !== "") {
            writer.uint32(18).string(message.abstain);
          }
          if (message.no !== "") {
            writer.uint32(26).string(message.no);
          }
          if (message.noWithVeto !== "") {
            writer.uint32(34).string(message.noWithVeto);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseTallyResult);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.yes = reader.string();
                break;
              case 2:
                message.abstain = reader.string();
                break;
              case 3:
                message.no = reader.string();
                break;
              case 4:
                message.noWithVeto = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseTallyResult);
          message.yes = object.yes !== void 0 && object.yes !== null ? String(object.yes) : "";
          message.abstain = object.abstain !== void 0 && object.abstain !== null ? String(object.abstain) : "";
          message.no = object.no !== void 0 && object.no !== null ? String(object.no) : "";
          message.noWithVeto = object.noWithVeto !== void 0 && object.noWithVeto !== null ? String(object.noWithVeto) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.yes !== void 0 && (obj.yes = message.yes);
          message.abstain !== void 0 && (obj.abstain = message.abstain);
          message.no !== void 0 && (obj.no = message.no);
          message.noWithVeto !== void 0 && (obj.noWithVeto = message.noWithVeto);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d;
          const message = Object.assign({}, baseTallyResult);
          message.yes = (_a = object.yes) !== null && _a !== void 0 ? _a : "";
          message.abstain = (_b = object.abstain) !== null && _b !== void 0 ? _b : "";
          message.no = (_c = object.no) !== null && _c !== void 0 ? _c : "";
          message.noWithVeto = (_d = object.noWithVeto) !== null && _d !== void 0 ? _d : "";
          return message;
        }
      };
      var baseVote = { proposalId: long_1.default.UZERO, voter: "", option: 0 };
      exports2.Vote = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.proposalId.isZero()) {
            writer.uint32(8).uint64(message.proposalId);
          }
          if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
          }
          if (message.option !== 0) {
            writer.uint32(24).int32(message.option);
          }
          for (const v of message.options) {
            exports2.WeightedVoteOption.encode(v, writer.uint32(34).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseVote);
          message.options = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.proposalId = reader.uint64();
                break;
              case 2:
                message.voter = reader.string();
                break;
              case 3:
                message.option = reader.int32();
                break;
              case 4:
                message.options.push(exports2.WeightedVoteOption.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseVote);
          message.proposalId = object.proposalId !== void 0 && object.proposalId !== null ? long_1.default.fromString(object.proposalId) : long_1.default.UZERO;
          message.voter = object.voter !== void 0 && object.voter !== null ? String(object.voter) : "";
          message.option = object.option !== void 0 && object.option !== null ? voteOptionFromJSON(object.option) : 0;
          message.options = ((_a = object.options) !== null && _a !== void 0 ? _a : []).map((e) => exports2.WeightedVoteOption.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.proposalId !== void 0 && (obj.proposalId = (message.proposalId || long_1.default.UZERO).toString());
          message.voter !== void 0 && (obj.voter = message.voter);
          message.option !== void 0 && (obj.option = voteOptionToJSON(message.option));
          if (message.options) {
            obj.options = message.options.map((e) => e ? exports2.WeightedVoteOption.toJSON(e) : void 0);
          } else {
            obj.options = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseVote);
          message.proposalId = object.proposalId !== void 0 && object.proposalId !== null ? long_1.default.fromValue(object.proposalId) : long_1.default.UZERO;
          message.voter = (_a = object.voter) !== null && _a !== void 0 ? _a : "";
          message.option = (_b = object.option) !== null && _b !== void 0 ? _b : 0;
          message.options = ((_c = object.options) === null || _c === void 0 ? void 0 : _c.map((e) => exports2.WeightedVoteOption.fromPartial(e))) || [];
          return message;
        }
      };
      var baseDepositParams = {};
      exports2.DepositParams = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.minDeposit) {
            coin_1.Coin.encode(v, writer.uint32(10).fork()).ldelim();
          }
          if (message.maxDepositPeriod !== void 0) {
            duration_1.Duration.encode(message.maxDepositPeriod, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseDepositParams);
          message.minDeposit = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.minDeposit.push(coin_1.Coin.decode(reader, reader.uint32()));
                break;
              case 2:
                message.maxDepositPeriod = duration_1.Duration.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseDepositParams);
          message.minDeposit = ((_a = object.minDeposit) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
          message.maxDepositPeriod = object.maxDepositPeriod !== void 0 && object.maxDepositPeriod !== null ? duration_1.Duration.fromJSON(object.maxDepositPeriod) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.minDeposit) {
            obj.minDeposit = message.minDeposit.map((e) => e ? coin_1.Coin.toJSON(e) : void 0);
          } else {
            obj.minDeposit = [];
          }
          message.maxDepositPeriod !== void 0 && (obj.maxDepositPeriod = message.maxDepositPeriod ? duration_1.Duration.toJSON(message.maxDepositPeriod) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseDepositParams);
          message.minDeposit = ((_a = object.minDeposit) === null || _a === void 0 ? void 0 : _a.map((e) => coin_1.Coin.fromPartial(e))) || [];
          message.maxDepositPeriod = object.maxDepositPeriod !== void 0 && object.maxDepositPeriod !== null ? duration_1.Duration.fromPartial(object.maxDepositPeriod) : void 0;
          return message;
        }
      };
      var baseVotingParams = {};
      exports2.VotingParams = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.votingPeriod !== void 0) {
            duration_1.Duration.encode(message.votingPeriod, writer.uint32(10).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseVotingParams);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.votingPeriod = duration_1.Duration.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseVotingParams);
          message.votingPeriod = object.votingPeriod !== void 0 && object.votingPeriod !== null ? duration_1.Duration.fromJSON(object.votingPeriod) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.votingPeriod !== void 0 && (obj.votingPeriod = message.votingPeriod ? duration_1.Duration.toJSON(message.votingPeriod) : void 0);
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseVotingParams);
          message.votingPeriod = object.votingPeriod !== void 0 && object.votingPeriod !== null ? duration_1.Duration.fromPartial(object.votingPeriod) : void 0;
          return message;
        }
      };
      var baseTallyParams = {};
      exports2.TallyParams = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.quorum.length !== 0) {
            writer.uint32(10).bytes(message.quorum);
          }
          if (message.threshold.length !== 0) {
            writer.uint32(18).bytes(message.threshold);
          }
          if (message.vetoThreshold.length !== 0) {
            writer.uint32(26).bytes(message.vetoThreshold);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseTallyParams);
          message.quorum = new Uint8Array();
          message.threshold = new Uint8Array();
          message.vetoThreshold = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.quorum = reader.bytes();
                break;
              case 2:
                message.threshold = reader.bytes();
                break;
              case 3:
                message.vetoThreshold = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseTallyParams);
          message.quorum = object.quorum !== void 0 && object.quorum !== null ? bytesFromBase64(object.quorum) : new Uint8Array();
          message.threshold = object.threshold !== void 0 && object.threshold !== null ? bytesFromBase64(object.threshold) : new Uint8Array();
          message.vetoThreshold = object.vetoThreshold !== void 0 && object.vetoThreshold !== null ? bytesFromBase64(object.vetoThreshold) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.quorum !== void 0 && (obj.quorum = base64FromBytes(message.quorum !== void 0 ? message.quorum : new Uint8Array()));
          message.threshold !== void 0 && (obj.threshold = base64FromBytes(message.threshold !== void 0 ? message.threshold : new Uint8Array()));
          message.vetoThreshold !== void 0 && (obj.vetoThreshold = base64FromBytes(message.vetoThreshold !== void 0 ? message.vetoThreshold : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseTallyParams);
          message.quorum = (_a = object.quorum) !== null && _a !== void 0 ? _a : new Uint8Array();
          message.threshold = (_b = object.threshold) !== null && _b !== void 0 ? _b : new Uint8Array();
          message.vetoThreshold = (_c = object.vetoThreshold) !== null && _c !== void 0 ? _c : new Uint8Array();
          return message;
        }
      };
      var globalThis = (() => {
        if (typeof globalThis !== "undefined")
          return globalThis;
        if (typeof self !== "undefined")
          return self;
        if (typeof window !== "undefined")
          return window;
        if (typeof global !== "undefined")
          return global;
        throw "Unable to locate global object";
      })();
      var atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
      function bytesFromBase64(b64) {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
          arr[i] = bin.charCodeAt(i);
        }
        return arr;
      }
      var btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
      function base64FromBytes(arr) {
        const bin = [];
        for (const byte of arr) {
          bin.push(String.fromCharCode(byte));
        }
        return btoa(bin.join(""));
      }
      function toTimestamp(date) {
        const seconds = numberToLong(date.getTime() / 1e3);
        const nanos = date.getTime() % 1e3 * 1e6;
        return { seconds, nanos };
      }
      function fromTimestamp(t) {
        let millis = t.seconds.toNumber() * 1e3;
        millis += t.nanos / 1e6;
        return new Date(millis);
      }
      function fromJsonTimestamp(o) {
        if (o instanceof Date) {
          return toTimestamp(o);
        } else if (typeof o === "string") {
          return toTimestamp(new Date(o));
        } else {
          return timestamp_1.Timestamp.fromJSON(o);
        }
      }
      function numberToLong(number) {
        return long_1.default.fromNumber(number);
      }
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/cosmos/gov/v1beta1/tx.js
  var require_tx3 = __commonJS({
    "node_modules/cosmjs-types/cosmos/gov/v1beta1/tx.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.MsgClientImpl = exports2.MsgDepositResponse = exports2.MsgDeposit = exports2.MsgVoteWeightedResponse = exports2.MsgVoteWeighted = exports2.MsgVoteResponse = exports2.MsgVote = exports2.MsgSubmitProposalResponse = exports2.MsgSubmitProposal = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var any_1 = require_any();
      var gov_1 = require_gov();
      var coin_1 = require_coin();
      exports2.protobufPackage = "cosmos.gov.v1beta1";
      var baseMsgSubmitProposal = { proposer: "" };
      exports2.MsgSubmitProposal = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.content !== void 0) {
            any_1.Any.encode(message.content, writer.uint32(10).fork()).ldelim();
          }
          for (const v of message.initialDeposit) {
            coin_1.Coin.encode(v, writer.uint32(18).fork()).ldelim();
          }
          if (message.proposer !== "") {
            writer.uint32(26).string(message.proposer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgSubmitProposal);
          message.initialDeposit = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.content = any_1.Any.decode(reader, reader.uint32());
                break;
              case 2:
                message.initialDeposit.push(coin_1.Coin.decode(reader, reader.uint32()));
                break;
              case 3:
                message.proposer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseMsgSubmitProposal);
          message.content = object.content !== void 0 && object.content !== null ? any_1.Any.fromJSON(object.content) : void 0;
          message.initialDeposit = ((_a = object.initialDeposit) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
          message.proposer = object.proposer !== void 0 && object.proposer !== null ? String(object.proposer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.content !== void 0 && (obj.content = message.content ? any_1.Any.toJSON(message.content) : void 0);
          if (message.initialDeposit) {
            obj.initialDeposit = message.initialDeposit.map((e) => e ? coin_1.Coin.toJSON(e) : void 0);
          } else {
            obj.initialDeposit = [];
          }
          message.proposer !== void 0 && (obj.proposer = message.proposer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgSubmitProposal);
          message.content = object.content !== void 0 && object.content !== null ? any_1.Any.fromPartial(object.content) : void 0;
          message.initialDeposit = ((_a = object.initialDeposit) === null || _a === void 0 ? void 0 : _a.map((e) => coin_1.Coin.fromPartial(e))) || [];
          message.proposer = (_b = object.proposer) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseMsgSubmitProposalResponse = { proposalId: long_1.default.UZERO };
      exports2.MsgSubmitProposalResponse = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.proposalId.isZero()) {
            writer.uint32(8).uint64(message.proposalId);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgSubmitProposalResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.proposalId = reader.uint64();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgSubmitProposalResponse);
          message.proposalId = object.proposalId !== void 0 && object.proposalId !== null ? long_1.default.fromString(object.proposalId) : long_1.default.UZERO;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.proposalId !== void 0 && (obj.proposalId = (message.proposalId || long_1.default.UZERO).toString());
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseMsgSubmitProposalResponse);
          message.proposalId = object.proposalId !== void 0 && object.proposalId !== null ? long_1.default.fromValue(object.proposalId) : long_1.default.UZERO;
          return message;
        }
      };
      var baseMsgVote = { proposalId: long_1.default.UZERO, voter: "", option: 0 };
      exports2.MsgVote = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.proposalId.isZero()) {
            writer.uint32(8).uint64(message.proposalId);
          }
          if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
          }
          if (message.option !== 0) {
            writer.uint32(24).int32(message.option);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgVote);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.proposalId = reader.uint64();
                break;
              case 2:
                message.voter = reader.string();
                break;
              case 3:
                message.option = reader.int32();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgVote);
          message.proposalId = object.proposalId !== void 0 && object.proposalId !== null ? long_1.default.fromString(object.proposalId) : long_1.default.UZERO;
          message.voter = object.voter !== void 0 && object.voter !== null ? String(object.voter) : "";
          message.option = object.option !== void 0 && object.option !== null ? gov_1.voteOptionFromJSON(object.option) : 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.proposalId !== void 0 && (obj.proposalId = (message.proposalId || long_1.default.UZERO).toString());
          message.voter !== void 0 && (obj.voter = message.voter);
          message.option !== void 0 && (obj.option = gov_1.voteOptionToJSON(message.option));
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgVote);
          message.proposalId = object.proposalId !== void 0 && object.proposalId !== null ? long_1.default.fromValue(object.proposalId) : long_1.default.UZERO;
          message.voter = (_a = object.voter) !== null && _a !== void 0 ? _a : "";
          message.option = (_b = object.option) !== null && _b !== void 0 ? _b : 0;
          return message;
        }
      };
      var baseMsgVoteResponse = {};
      exports2.MsgVoteResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgVoteResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgVoteResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgVoteResponse);
          return message;
        }
      };
      var baseMsgVoteWeighted = { proposalId: long_1.default.UZERO, voter: "" };
      exports2.MsgVoteWeighted = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.proposalId.isZero()) {
            writer.uint32(8).uint64(message.proposalId);
          }
          if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
          }
          for (const v of message.options) {
            gov_1.WeightedVoteOption.encode(v, writer.uint32(26).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgVoteWeighted);
          message.options = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.proposalId = reader.uint64();
                break;
              case 2:
                message.voter = reader.string();
                break;
              case 3:
                message.options.push(gov_1.WeightedVoteOption.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseMsgVoteWeighted);
          message.proposalId = object.proposalId !== void 0 && object.proposalId !== null ? long_1.default.fromString(object.proposalId) : long_1.default.UZERO;
          message.voter = object.voter !== void 0 && object.voter !== null ? String(object.voter) : "";
          message.options = ((_a = object.options) !== null && _a !== void 0 ? _a : []).map((e) => gov_1.WeightedVoteOption.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.proposalId !== void 0 && (obj.proposalId = (message.proposalId || long_1.default.UZERO).toString());
          message.voter !== void 0 && (obj.voter = message.voter);
          if (message.options) {
            obj.options = message.options.map((e) => e ? gov_1.WeightedVoteOption.toJSON(e) : void 0);
          } else {
            obj.options = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgVoteWeighted);
          message.proposalId = object.proposalId !== void 0 && object.proposalId !== null ? long_1.default.fromValue(object.proposalId) : long_1.default.UZERO;
          message.voter = (_a = object.voter) !== null && _a !== void 0 ? _a : "";
          message.options = ((_b = object.options) === null || _b === void 0 ? void 0 : _b.map((e) => gov_1.WeightedVoteOption.fromPartial(e))) || [];
          return message;
        }
      };
      var baseMsgVoteWeightedResponse = {};
      exports2.MsgVoteWeightedResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgVoteWeightedResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgVoteWeightedResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgVoteWeightedResponse);
          return message;
        }
      };
      var baseMsgDeposit = { proposalId: long_1.default.UZERO, depositor: "" };
      exports2.MsgDeposit = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.proposalId.isZero()) {
            writer.uint32(8).uint64(message.proposalId);
          }
          if (message.depositor !== "") {
            writer.uint32(18).string(message.depositor);
          }
          for (const v of message.amount) {
            coin_1.Coin.encode(v, writer.uint32(26).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgDeposit);
          message.amount = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.proposalId = reader.uint64();
                break;
              case 2:
                message.depositor = reader.string();
                break;
              case 3:
                message.amount.push(coin_1.Coin.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseMsgDeposit);
          message.proposalId = object.proposalId !== void 0 && object.proposalId !== null ? long_1.default.fromString(object.proposalId) : long_1.default.UZERO;
          message.depositor = object.depositor !== void 0 && object.depositor !== null ? String(object.depositor) : "";
          message.amount = ((_a = object.amount) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.proposalId !== void 0 && (obj.proposalId = (message.proposalId || long_1.default.UZERO).toString());
          message.depositor !== void 0 && (obj.depositor = message.depositor);
          if (message.amount) {
            obj.amount = message.amount.map((e) => e ? coin_1.Coin.toJSON(e) : void 0);
          } else {
            obj.amount = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgDeposit);
          message.proposalId = object.proposalId !== void 0 && object.proposalId !== null ? long_1.default.fromValue(object.proposalId) : long_1.default.UZERO;
          message.depositor = (_a = object.depositor) !== null && _a !== void 0 ? _a : "";
          message.amount = ((_b = object.amount) === null || _b === void 0 ? void 0 : _b.map((e) => coin_1.Coin.fromPartial(e))) || [];
          return message;
        }
      };
      var baseMsgDepositResponse = {};
      exports2.MsgDepositResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgDepositResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgDepositResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgDepositResponse);
          return message;
        }
      };
      var MsgClientImpl = class {
        constructor(rpc) {
          this.rpc = rpc;
          this.SubmitProposal = this.SubmitProposal.bind(this);
          this.Vote = this.Vote.bind(this);
          this.VoteWeighted = this.VoteWeighted.bind(this);
          this.Deposit = this.Deposit.bind(this);
        }
        SubmitProposal(request) {
          const data = exports2.MsgSubmitProposal.encode(request).finish();
          const promise = this.rpc.request("cosmos.gov.v1beta1.Msg", "SubmitProposal", data);
          return promise.then((data2) => exports2.MsgSubmitProposalResponse.decode(new minimal_1.default.Reader(data2)));
        }
        Vote(request) {
          const data = exports2.MsgVote.encode(request).finish();
          const promise = this.rpc.request("cosmos.gov.v1beta1.Msg", "Vote", data);
          return promise.then((data2) => exports2.MsgVoteResponse.decode(new minimal_1.default.Reader(data2)));
        }
        VoteWeighted(request) {
          const data = exports2.MsgVoteWeighted.encode(request).finish();
          const promise = this.rpc.request("cosmos.gov.v1beta1.Msg", "VoteWeighted", data);
          return promise.then((data2) => exports2.MsgVoteWeightedResponse.decode(new minimal_1.default.Reader(data2)));
        }
        Deposit(request) {
          const data = exports2.MsgDeposit.encode(request).finish();
          const promise = this.rpc.request("cosmos.gov.v1beta1.Msg", "Deposit", data);
          return promise.then((data2) => exports2.MsgDepositResponse.decode(new minimal_1.default.Reader(data2)));
        }
      };
      exports2.MsgClientImpl = MsgClientImpl;
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/ibc/core/client/v1/client.js
  var require_client = __commonJS({
    "node_modules/cosmjs-types/ibc/core/client/v1/client.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.Params = exports2.Height = exports2.ClientUpdateProposal = exports2.ClientConsensusStates = exports2.ConsensusStateWithHeight = exports2.IdentifiedClientState = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var any_1 = require_any();
      exports2.protobufPackage = "ibc.core.client.v1";
      var baseIdentifiedClientState = { clientId: "" };
      exports2.IdentifiedClientState = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
          }
          if (message.clientState !== void 0) {
            any_1.Any.encode(message.clientState, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseIdentifiedClientState);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.clientId = reader.string();
                break;
              case 2:
                message.clientState = any_1.Any.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseIdentifiedClientState);
          message.clientId = object.clientId !== void 0 && object.clientId !== null ? String(object.clientId) : "";
          message.clientState = object.clientState !== void 0 && object.clientState !== null ? any_1.Any.fromJSON(object.clientState) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.clientId !== void 0 && (obj.clientId = message.clientId);
          message.clientState !== void 0 && (obj.clientState = message.clientState ? any_1.Any.toJSON(message.clientState) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseIdentifiedClientState);
          message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
          message.clientState = object.clientState !== void 0 && object.clientState !== null ? any_1.Any.fromPartial(object.clientState) : void 0;
          return message;
        }
      };
      var baseConsensusStateWithHeight = {};
      exports2.ConsensusStateWithHeight = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.height !== void 0) {
            exports2.Height.encode(message.height, writer.uint32(10).fork()).ldelim();
          }
          if (message.consensusState !== void 0) {
            any_1.Any.encode(message.consensusState, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseConsensusStateWithHeight);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.height = exports2.Height.decode(reader, reader.uint32());
                break;
              case 2:
                message.consensusState = any_1.Any.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseConsensusStateWithHeight);
          message.height = object.height !== void 0 && object.height !== null ? exports2.Height.fromJSON(object.height) : void 0;
          message.consensusState = object.consensusState !== void 0 && object.consensusState !== null ? any_1.Any.fromJSON(object.consensusState) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.height !== void 0 && (obj.height = message.height ? exports2.Height.toJSON(message.height) : void 0);
          message.consensusState !== void 0 && (obj.consensusState = message.consensusState ? any_1.Any.toJSON(message.consensusState) : void 0);
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseConsensusStateWithHeight);
          message.height = object.height !== void 0 && object.height !== null ? exports2.Height.fromPartial(object.height) : void 0;
          message.consensusState = object.consensusState !== void 0 && object.consensusState !== null ? any_1.Any.fromPartial(object.consensusState) : void 0;
          return message;
        }
      };
      var baseClientConsensusStates = { clientId: "" };
      exports2.ClientConsensusStates = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
          }
          for (const v of message.consensusStates) {
            exports2.ConsensusStateWithHeight.encode(v, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseClientConsensusStates);
          message.consensusStates = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.clientId = reader.string();
                break;
              case 2:
                message.consensusStates.push(exports2.ConsensusStateWithHeight.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseClientConsensusStates);
          message.clientId = object.clientId !== void 0 && object.clientId !== null ? String(object.clientId) : "";
          message.consensusStates = ((_a = object.consensusStates) !== null && _a !== void 0 ? _a : []).map((e) => exports2.ConsensusStateWithHeight.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.clientId !== void 0 && (obj.clientId = message.clientId);
          if (message.consensusStates) {
            obj.consensusStates = message.consensusStates.map((e) => e ? exports2.ConsensusStateWithHeight.toJSON(e) : void 0);
          } else {
            obj.consensusStates = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseClientConsensusStates);
          message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
          message.consensusStates = ((_b = object.consensusStates) === null || _b === void 0 ? void 0 : _b.map((e) => exports2.ConsensusStateWithHeight.fromPartial(e))) || [];
          return message;
        }
      };
      var baseClientUpdateProposal = { title: "", description: "", clientId: "" };
      exports2.ClientUpdateProposal = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.title !== "") {
            writer.uint32(10).string(message.title);
          }
          if (message.description !== "") {
            writer.uint32(18).string(message.description);
          }
          if (message.clientId !== "") {
            writer.uint32(26).string(message.clientId);
          }
          if (message.header !== void 0) {
            any_1.Any.encode(message.header, writer.uint32(34).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseClientUpdateProposal);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.title = reader.string();
                break;
              case 2:
                message.description = reader.string();
                break;
              case 3:
                message.clientId = reader.string();
                break;
              case 4:
                message.header = any_1.Any.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseClientUpdateProposal);
          message.title = object.title !== void 0 && object.title !== null ? String(object.title) : "";
          message.description = object.description !== void 0 && object.description !== null ? String(object.description) : "";
          message.clientId = object.clientId !== void 0 && object.clientId !== null ? String(object.clientId) : "";
          message.header = object.header !== void 0 && object.header !== null ? any_1.Any.fromJSON(object.header) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.title !== void 0 && (obj.title = message.title);
          message.description !== void 0 && (obj.description = message.description);
          message.clientId !== void 0 && (obj.clientId = message.clientId);
          message.header !== void 0 && (obj.header = message.header ? any_1.Any.toJSON(message.header) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseClientUpdateProposal);
          message.title = (_a = object.title) !== null && _a !== void 0 ? _a : "";
          message.description = (_b = object.description) !== null && _b !== void 0 ? _b : "";
          message.clientId = (_c = object.clientId) !== null && _c !== void 0 ? _c : "";
          message.header = object.header !== void 0 && object.header !== null ? any_1.Any.fromPartial(object.header) : void 0;
          return message;
        }
      };
      var baseHeight = { revisionNumber: long_1.default.UZERO, revisionHeight: long_1.default.UZERO };
      exports2.Height = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.revisionNumber.isZero()) {
            writer.uint32(8).uint64(message.revisionNumber);
          }
          if (!message.revisionHeight.isZero()) {
            writer.uint32(16).uint64(message.revisionHeight);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseHeight);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.revisionNumber = reader.uint64();
                break;
              case 2:
                message.revisionHeight = reader.uint64();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseHeight);
          message.revisionNumber = object.revisionNumber !== void 0 && object.revisionNumber !== null ? long_1.default.fromString(object.revisionNumber) : long_1.default.UZERO;
          message.revisionHeight = object.revisionHeight !== void 0 && object.revisionHeight !== null ? long_1.default.fromString(object.revisionHeight) : long_1.default.UZERO;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.revisionNumber !== void 0 && (obj.revisionNumber = (message.revisionNumber || long_1.default.UZERO).toString());
          message.revisionHeight !== void 0 && (obj.revisionHeight = (message.revisionHeight || long_1.default.UZERO).toString());
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseHeight);
          message.revisionNumber = object.revisionNumber !== void 0 && object.revisionNumber !== null ? long_1.default.fromValue(object.revisionNumber) : long_1.default.UZERO;
          message.revisionHeight = object.revisionHeight !== void 0 && object.revisionHeight !== null ? long_1.default.fromValue(object.revisionHeight) : long_1.default.UZERO;
          return message;
        }
      };
      var baseParams = { allowedClients: "" };
      exports2.Params = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.allowedClients) {
            writer.uint32(10).string(v);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseParams);
          message.allowedClients = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.allowedClients.push(reader.string());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseParams);
          message.allowedClients = ((_a = object.allowedClients) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.allowedClients) {
            obj.allowedClients = message.allowedClients.map((e) => e);
          } else {
            obj.allowedClients = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseParams);
          message.allowedClients = ((_a = object.allowedClients) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
          return message;
        }
      };
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/ibc/applications/transfer/v1/tx.js
  var require_tx4 = __commonJS({
    "node_modules/cosmjs-types/ibc/applications/transfer/v1/tx.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.MsgClientImpl = exports2.MsgTransferResponse = exports2.MsgTransfer = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var coin_1 = require_coin();
      var client_1 = require_client();
      exports2.protobufPackage = "ibc.applications.transfer.v1";
      var baseMsgTransfer = {
        sourcePort: "",
        sourceChannel: "",
        sender: "",
        receiver: "",
        timeoutTimestamp: long_1.default.UZERO
      };
      exports2.MsgTransfer = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.sourcePort !== "") {
            writer.uint32(10).string(message.sourcePort);
          }
          if (message.sourceChannel !== "") {
            writer.uint32(18).string(message.sourceChannel);
          }
          if (message.token !== void 0) {
            coin_1.Coin.encode(message.token, writer.uint32(26).fork()).ldelim();
          }
          if (message.sender !== "") {
            writer.uint32(34).string(message.sender);
          }
          if (message.receiver !== "") {
            writer.uint32(42).string(message.receiver);
          }
          if (message.timeoutHeight !== void 0) {
            client_1.Height.encode(message.timeoutHeight, writer.uint32(50).fork()).ldelim();
          }
          if (!message.timeoutTimestamp.isZero()) {
            writer.uint32(56).uint64(message.timeoutTimestamp);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgTransfer);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.sourcePort = reader.string();
                break;
              case 2:
                message.sourceChannel = reader.string();
                break;
              case 3:
                message.token = coin_1.Coin.decode(reader, reader.uint32());
                break;
              case 4:
                message.sender = reader.string();
                break;
              case 5:
                message.receiver = reader.string();
                break;
              case 6:
                message.timeoutHeight = client_1.Height.decode(reader, reader.uint32());
                break;
              case 7:
                message.timeoutTimestamp = reader.uint64();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgTransfer);
          message.sourcePort = object.sourcePort !== void 0 && object.sourcePort !== null ? String(object.sourcePort) : "";
          message.sourceChannel = object.sourceChannel !== void 0 && object.sourceChannel !== null ? String(object.sourceChannel) : "";
          message.token = object.token !== void 0 && object.token !== null ? coin_1.Coin.fromJSON(object.token) : void 0;
          message.sender = object.sender !== void 0 && object.sender !== null ? String(object.sender) : "";
          message.receiver = object.receiver !== void 0 && object.receiver !== null ? String(object.receiver) : "";
          message.timeoutHeight = object.timeoutHeight !== void 0 && object.timeoutHeight !== null ? client_1.Height.fromJSON(object.timeoutHeight) : void 0;
          message.timeoutTimestamp = object.timeoutTimestamp !== void 0 && object.timeoutTimestamp !== null ? long_1.default.fromString(object.timeoutTimestamp) : long_1.default.UZERO;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.sourcePort !== void 0 && (obj.sourcePort = message.sourcePort);
          message.sourceChannel !== void 0 && (obj.sourceChannel = message.sourceChannel);
          message.token !== void 0 && (obj.token = message.token ? coin_1.Coin.toJSON(message.token) : void 0);
          message.sender !== void 0 && (obj.sender = message.sender);
          message.receiver !== void 0 && (obj.receiver = message.receiver);
          message.timeoutHeight !== void 0 && (obj.timeoutHeight = message.timeoutHeight ? client_1.Height.toJSON(message.timeoutHeight) : void 0);
          message.timeoutTimestamp !== void 0 && (obj.timeoutTimestamp = (message.timeoutTimestamp || long_1.default.UZERO).toString());
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d;
          const message = Object.assign({}, baseMsgTransfer);
          message.sourcePort = (_a = object.sourcePort) !== null && _a !== void 0 ? _a : "";
          message.sourceChannel = (_b = object.sourceChannel) !== null && _b !== void 0 ? _b : "";
          message.token = object.token !== void 0 && object.token !== null ? coin_1.Coin.fromPartial(object.token) : void 0;
          message.sender = (_c = object.sender) !== null && _c !== void 0 ? _c : "";
          message.receiver = (_d = object.receiver) !== null && _d !== void 0 ? _d : "";
          message.timeoutHeight = object.timeoutHeight !== void 0 && object.timeoutHeight !== null ? client_1.Height.fromPartial(object.timeoutHeight) : void 0;
          message.timeoutTimestamp = object.timeoutTimestamp !== void 0 && object.timeoutTimestamp !== null ? long_1.default.fromValue(object.timeoutTimestamp) : long_1.default.UZERO;
          return message;
        }
      };
      var baseMsgTransferResponse = {};
      exports2.MsgTransferResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgTransferResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgTransferResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgTransferResponse);
          return message;
        }
      };
      var MsgClientImpl = class {
        constructor(rpc) {
          this.rpc = rpc;
          this.Transfer = this.Transfer.bind(this);
        }
        Transfer(request) {
          const data = exports2.MsgTransfer.encode(request).finish();
          const promise = this.rpc.request("ibc.applications.transfer.v1.Msg", "Transfer", data);
          return promise.then((data2) => exports2.MsgTransferResponse.decode(new minimal_1.default.Reader(data2)));
        }
      };
      exports2.MsgClientImpl = MsgClientImpl;
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/ibc/core/channel/v1/channel.js
  var require_channel = __commonJS({
    "node_modules/cosmjs-types/ibc/core/channel/v1/channel.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.Acknowledgement = exports2.PacketState = exports2.Packet = exports2.Counterparty = exports2.IdentifiedChannel = exports2.Channel = exports2.orderToJSON = exports2.orderFromJSON = exports2.Order = exports2.stateToJSON = exports2.stateFromJSON = exports2.State = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var client_1 = require_client();
      exports2.protobufPackage = "ibc.core.channel.v1";
      var State;
      (function(State2) {
        State2[State2["STATE_UNINITIALIZED_UNSPECIFIED"] = 0] = "STATE_UNINITIALIZED_UNSPECIFIED";
        State2[State2["STATE_INIT"] = 1] = "STATE_INIT";
        State2[State2["STATE_TRYOPEN"] = 2] = "STATE_TRYOPEN";
        State2[State2["STATE_OPEN"] = 3] = "STATE_OPEN";
        State2[State2["STATE_CLOSED"] = 4] = "STATE_CLOSED";
        State2[State2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
      })(State = exports2.State || (exports2.State = {}));
      function stateFromJSON(object) {
        switch (object) {
          case 0:
          case "STATE_UNINITIALIZED_UNSPECIFIED":
            return State.STATE_UNINITIALIZED_UNSPECIFIED;
          case 1:
          case "STATE_INIT":
            return State.STATE_INIT;
          case 2:
          case "STATE_TRYOPEN":
            return State.STATE_TRYOPEN;
          case 3:
          case "STATE_OPEN":
            return State.STATE_OPEN;
          case 4:
          case "STATE_CLOSED":
            return State.STATE_CLOSED;
          case -1:
          case "UNRECOGNIZED":
          default:
            return State.UNRECOGNIZED;
        }
      }
      exports2.stateFromJSON = stateFromJSON;
      function stateToJSON(object) {
        switch (object) {
          case State.STATE_UNINITIALIZED_UNSPECIFIED:
            return "STATE_UNINITIALIZED_UNSPECIFIED";
          case State.STATE_INIT:
            return "STATE_INIT";
          case State.STATE_TRYOPEN:
            return "STATE_TRYOPEN";
          case State.STATE_OPEN:
            return "STATE_OPEN";
          case State.STATE_CLOSED:
            return "STATE_CLOSED";
          default:
            return "UNKNOWN";
        }
      }
      exports2.stateToJSON = stateToJSON;
      var Order;
      (function(Order2) {
        Order2[Order2["ORDER_NONE_UNSPECIFIED"] = 0] = "ORDER_NONE_UNSPECIFIED";
        Order2[Order2["ORDER_UNORDERED"] = 1] = "ORDER_UNORDERED";
        Order2[Order2["ORDER_ORDERED"] = 2] = "ORDER_ORDERED";
        Order2[Order2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
      })(Order = exports2.Order || (exports2.Order = {}));
      function orderFromJSON(object) {
        switch (object) {
          case 0:
          case "ORDER_NONE_UNSPECIFIED":
            return Order.ORDER_NONE_UNSPECIFIED;
          case 1:
          case "ORDER_UNORDERED":
            return Order.ORDER_UNORDERED;
          case 2:
          case "ORDER_ORDERED":
            return Order.ORDER_ORDERED;
          case -1:
          case "UNRECOGNIZED":
          default:
            return Order.UNRECOGNIZED;
        }
      }
      exports2.orderFromJSON = orderFromJSON;
      function orderToJSON(object) {
        switch (object) {
          case Order.ORDER_NONE_UNSPECIFIED:
            return "ORDER_NONE_UNSPECIFIED";
          case Order.ORDER_UNORDERED:
            return "ORDER_UNORDERED";
          case Order.ORDER_ORDERED:
            return "ORDER_ORDERED";
          default:
            return "UNKNOWN";
        }
      }
      exports2.orderToJSON = orderToJSON;
      var baseChannel = { state: 0, ordering: 0, connectionHops: "", version: "" };
      exports2.Channel = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.state !== 0) {
            writer.uint32(8).int32(message.state);
          }
          if (message.ordering !== 0) {
            writer.uint32(16).int32(message.ordering);
          }
          if (message.counterparty !== void 0) {
            exports2.Counterparty.encode(message.counterparty, writer.uint32(26).fork()).ldelim();
          }
          for (const v of message.connectionHops) {
            writer.uint32(34).string(v);
          }
          if (message.version !== "") {
            writer.uint32(42).string(message.version);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseChannel);
          message.connectionHops = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.state = reader.int32();
                break;
              case 2:
                message.ordering = reader.int32();
                break;
              case 3:
                message.counterparty = exports2.Counterparty.decode(reader, reader.uint32());
                break;
              case 4:
                message.connectionHops.push(reader.string());
                break;
              case 5:
                message.version = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseChannel);
          message.state = object.state !== void 0 && object.state !== null ? stateFromJSON(object.state) : 0;
          message.ordering = object.ordering !== void 0 && object.ordering !== null ? orderFromJSON(object.ordering) : 0;
          message.counterparty = object.counterparty !== void 0 && object.counterparty !== null ? exports2.Counterparty.fromJSON(object.counterparty) : void 0;
          message.connectionHops = ((_a = object.connectionHops) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
          message.version = object.version !== void 0 && object.version !== null ? String(object.version) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.state !== void 0 && (obj.state = stateToJSON(message.state));
          message.ordering !== void 0 && (obj.ordering = orderToJSON(message.ordering));
          message.counterparty !== void 0 && (obj.counterparty = message.counterparty ? exports2.Counterparty.toJSON(message.counterparty) : void 0);
          if (message.connectionHops) {
            obj.connectionHops = message.connectionHops.map((e) => e);
          } else {
            obj.connectionHops = [];
          }
          message.version !== void 0 && (obj.version = message.version);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d;
          const message = Object.assign({}, baseChannel);
          message.state = (_a = object.state) !== null && _a !== void 0 ? _a : 0;
          message.ordering = (_b = object.ordering) !== null && _b !== void 0 ? _b : 0;
          message.counterparty = object.counterparty !== void 0 && object.counterparty !== null ? exports2.Counterparty.fromPartial(object.counterparty) : void 0;
          message.connectionHops = ((_c = object.connectionHops) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
          message.version = (_d = object.version) !== null && _d !== void 0 ? _d : "";
          return message;
        }
      };
      var baseIdentifiedChannel = {
        state: 0,
        ordering: 0,
        connectionHops: "",
        version: "",
        portId: "",
        channelId: ""
      };
      exports2.IdentifiedChannel = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.state !== 0) {
            writer.uint32(8).int32(message.state);
          }
          if (message.ordering !== 0) {
            writer.uint32(16).int32(message.ordering);
          }
          if (message.counterparty !== void 0) {
            exports2.Counterparty.encode(message.counterparty, writer.uint32(26).fork()).ldelim();
          }
          for (const v of message.connectionHops) {
            writer.uint32(34).string(v);
          }
          if (message.version !== "") {
            writer.uint32(42).string(message.version);
          }
          if (message.portId !== "") {
            writer.uint32(50).string(message.portId);
          }
          if (message.channelId !== "") {
            writer.uint32(58).string(message.channelId);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseIdentifiedChannel);
          message.connectionHops = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.state = reader.int32();
                break;
              case 2:
                message.ordering = reader.int32();
                break;
              case 3:
                message.counterparty = exports2.Counterparty.decode(reader, reader.uint32());
                break;
              case 4:
                message.connectionHops.push(reader.string());
                break;
              case 5:
                message.version = reader.string();
                break;
              case 6:
                message.portId = reader.string();
                break;
              case 7:
                message.channelId = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseIdentifiedChannel);
          message.state = object.state !== void 0 && object.state !== null ? stateFromJSON(object.state) : 0;
          message.ordering = object.ordering !== void 0 && object.ordering !== null ? orderFromJSON(object.ordering) : 0;
          message.counterparty = object.counterparty !== void 0 && object.counterparty !== null ? exports2.Counterparty.fromJSON(object.counterparty) : void 0;
          message.connectionHops = ((_a = object.connectionHops) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
          message.version = object.version !== void 0 && object.version !== null ? String(object.version) : "";
          message.portId = object.portId !== void 0 && object.portId !== null ? String(object.portId) : "";
          message.channelId = object.channelId !== void 0 && object.channelId !== null ? String(object.channelId) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.state !== void 0 && (obj.state = stateToJSON(message.state));
          message.ordering !== void 0 && (obj.ordering = orderToJSON(message.ordering));
          message.counterparty !== void 0 && (obj.counterparty = message.counterparty ? exports2.Counterparty.toJSON(message.counterparty) : void 0);
          if (message.connectionHops) {
            obj.connectionHops = message.connectionHops.map((e) => e);
          } else {
            obj.connectionHops = [];
          }
          message.version !== void 0 && (obj.version = message.version);
          message.portId !== void 0 && (obj.portId = message.portId);
          message.channelId !== void 0 && (obj.channelId = message.channelId);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d, _e, _f;
          const message = Object.assign({}, baseIdentifiedChannel);
          message.state = (_a = object.state) !== null && _a !== void 0 ? _a : 0;
          message.ordering = (_b = object.ordering) !== null && _b !== void 0 ? _b : 0;
          message.counterparty = object.counterparty !== void 0 && object.counterparty !== null ? exports2.Counterparty.fromPartial(object.counterparty) : void 0;
          message.connectionHops = ((_c = object.connectionHops) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
          message.version = (_d = object.version) !== null && _d !== void 0 ? _d : "";
          message.portId = (_e = object.portId) !== null && _e !== void 0 ? _e : "";
          message.channelId = (_f = object.channelId) !== null && _f !== void 0 ? _f : "";
          return message;
        }
      };
      var baseCounterparty = { portId: "", channelId: "" };
      exports2.Counterparty = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
          }
          if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseCounterparty);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.portId = reader.string();
                break;
              case 2:
                message.channelId = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseCounterparty);
          message.portId = object.portId !== void 0 && object.portId !== null ? String(object.portId) : "";
          message.channelId = object.channelId !== void 0 && object.channelId !== null ? String(object.channelId) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.portId !== void 0 && (obj.portId = message.portId);
          message.channelId !== void 0 && (obj.channelId = message.channelId);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseCounterparty);
          message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
          message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var basePacket = {
        sequence: long_1.default.UZERO,
        sourcePort: "",
        sourceChannel: "",
        destinationPort: "",
        destinationChannel: "",
        timeoutTimestamp: long_1.default.UZERO
      };
      exports2.Packet = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.sequence.isZero()) {
            writer.uint32(8).uint64(message.sequence);
          }
          if (message.sourcePort !== "") {
            writer.uint32(18).string(message.sourcePort);
          }
          if (message.sourceChannel !== "") {
            writer.uint32(26).string(message.sourceChannel);
          }
          if (message.destinationPort !== "") {
            writer.uint32(34).string(message.destinationPort);
          }
          if (message.destinationChannel !== "") {
            writer.uint32(42).string(message.destinationChannel);
          }
          if (message.data.length !== 0) {
            writer.uint32(50).bytes(message.data);
          }
          if (message.timeoutHeight !== void 0) {
            client_1.Height.encode(message.timeoutHeight, writer.uint32(58).fork()).ldelim();
          }
          if (!message.timeoutTimestamp.isZero()) {
            writer.uint32(64).uint64(message.timeoutTimestamp);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, basePacket);
          message.data = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.sequence = reader.uint64();
                break;
              case 2:
                message.sourcePort = reader.string();
                break;
              case 3:
                message.sourceChannel = reader.string();
                break;
              case 4:
                message.destinationPort = reader.string();
                break;
              case 5:
                message.destinationChannel = reader.string();
                break;
              case 6:
                message.data = reader.bytes();
                break;
              case 7:
                message.timeoutHeight = client_1.Height.decode(reader, reader.uint32());
                break;
              case 8:
                message.timeoutTimestamp = reader.uint64();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, basePacket);
          message.sequence = object.sequence !== void 0 && object.sequence !== null ? long_1.default.fromString(object.sequence) : long_1.default.UZERO;
          message.sourcePort = object.sourcePort !== void 0 && object.sourcePort !== null ? String(object.sourcePort) : "";
          message.sourceChannel = object.sourceChannel !== void 0 && object.sourceChannel !== null ? String(object.sourceChannel) : "";
          message.destinationPort = object.destinationPort !== void 0 && object.destinationPort !== null ? String(object.destinationPort) : "";
          message.destinationChannel = object.destinationChannel !== void 0 && object.destinationChannel !== null ? String(object.destinationChannel) : "";
          message.data = object.data !== void 0 && object.data !== null ? bytesFromBase64(object.data) : new Uint8Array();
          message.timeoutHeight = object.timeoutHeight !== void 0 && object.timeoutHeight !== null ? client_1.Height.fromJSON(object.timeoutHeight) : void 0;
          message.timeoutTimestamp = object.timeoutTimestamp !== void 0 && object.timeoutTimestamp !== null ? long_1.default.fromString(object.timeoutTimestamp) : long_1.default.UZERO;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.sequence !== void 0 && (obj.sequence = (message.sequence || long_1.default.UZERO).toString());
          message.sourcePort !== void 0 && (obj.sourcePort = message.sourcePort);
          message.sourceChannel !== void 0 && (obj.sourceChannel = message.sourceChannel);
          message.destinationPort !== void 0 && (obj.destinationPort = message.destinationPort);
          message.destinationChannel !== void 0 && (obj.destinationChannel = message.destinationChannel);
          message.data !== void 0 && (obj.data = base64FromBytes(message.data !== void 0 ? message.data : new Uint8Array()));
          message.timeoutHeight !== void 0 && (obj.timeoutHeight = message.timeoutHeight ? client_1.Height.toJSON(message.timeoutHeight) : void 0);
          message.timeoutTimestamp !== void 0 && (obj.timeoutTimestamp = (message.timeoutTimestamp || long_1.default.UZERO).toString());
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d, _e;
          const message = Object.assign({}, basePacket);
          message.sequence = object.sequence !== void 0 && object.sequence !== null ? long_1.default.fromValue(object.sequence) : long_1.default.UZERO;
          message.sourcePort = (_a = object.sourcePort) !== null && _a !== void 0 ? _a : "";
          message.sourceChannel = (_b = object.sourceChannel) !== null && _b !== void 0 ? _b : "";
          message.destinationPort = (_c = object.destinationPort) !== null && _c !== void 0 ? _c : "";
          message.destinationChannel = (_d = object.destinationChannel) !== null && _d !== void 0 ? _d : "";
          message.data = (_e = object.data) !== null && _e !== void 0 ? _e : new Uint8Array();
          message.timeoutHeight = object.timeoutHeight !== void 0 && object.timeoutHeight !== null ? client_1.Height.fromPartial(object.timeoutHeight) : void 0;
          message.timeoutTimestamp = object.timeoutTimestamp !== void 0 && object.timeoutTimestamp !== null ? long_1.default.fromValue(object.timeoutTimestamp) : long_1.default.UZERO;
          return message;
        }
      };
      var basePacketState = { portId: "", channelId: "", sequence: long_1.default.UZERO };
      exports2.PacketState = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
          }
          if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
          }
          if (!message.sequence.isZero()) {
            writer.uint32(24).uint64(message.sequence);
          }
          if (message.data.length !== 0) {
            writer.uint32(34).bytes(message.data);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, basePacketState);
          message.data = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.portId = reader.string();
                break;
              case 2:
                message.channelId = reader.string();
                break;
              case 3:
                message.sequence = reader.uint64();
                break;
              case 4:
                message.data = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, basePacketState);
          message.portId = object.portId !== void 0 && object.portId !== null ? String(object.portId) : "";
          message.channelId = object.channelId !== void 0 && object.channelId !== null ? String(object.channelId) : "";
          message.sequence = object.sequence !== void 0 && object.sequence !== null ? long_1.default.fromString(object.sequence) : long_1.default.UZERO;
          message.data = object.data !== void 0 && object.data !== null ? bytesFromBase64(object.data) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.portId !== void 0 && (obj.portId = message.portId);
          message.channelId !== void 0 && (obj.channelId = message.channelId);
          message.sequence !== void 0 && (obj.sequence = (message.sequence || long_1.default.UZERO).toString());
          message.data !== void 0 && (obj.data = base64FromBytes(message.data !== void 0 ? message.data : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, basePacketState);
          message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
          message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
          message.sequence = object.sequence !== void 0 && object.sequence !== null ? long_1.default.fromValue(object.sequence) : long_1.default.UZERO;
          message.data = (_c = object.data) !== null && _c !== void 0 ? _c : new Uint8Array();
          return message;
        }
      };
      var baseAcknowledgement = {};
      exports2.Acknowledgement = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.result !== void 0) {
            writer.uint32(170).bytes(message.result);
          }
          if (message.error !== void 0) {
            writer.uint32(178).string(message.error);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseAcknowledgement);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 21:
                message.result = reader.bytes();
                break;
              case 22:
                message.error = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseAcknowledgement);
          message.result = object.result !== void 0 && object.result !== null ? bytesFromBase64(object.result) : void 0;
          message.error = object.error !== void 0 && object.error !== null ? String(object.error) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.result !== void 0 && (obj.result = message.result !== void 0 ? base64FromBytes(message.result) : void 0);
          message.error !== void 0 && (obj.error = message.error);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseAcknowledgement);
          message.result = (_a = object.result) !== null && _a !== void 0 ? _a : void 0;
          message.error = (_b = object.error) !== null && _b !== void 0 ? _b : void 0;
          return message;
        }
      };
      var globalThis = (() => {
        if (typeof globalThis !== "undefined")
          return globalThis;
        if (typeof self !== "undefined")
          return self;
        if (typeof window !== "undefined")
          return window;
        if (typeof global !== "undefined")
          return global;
        throw "Unable to locate global object";
      })();
      var atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
      function bytesFromBase64(b64) {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
          arr[i] = bin.charCodeAt(i);
        }
        return arr;
      }
      var btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
      function base64FromBytes(arr) {
        const bin = [];
        for (const byte of arr) {
          bin.push(String.fromCharCode(byte));
        }
        return btoa(bin.join(""));
      }
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/ibc/core/channel/v1/tx.js
  var require_tx5 = __commonJS({
    "node_modules/cosmjs-types/ibc/core/channel/v1/tx.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.MsgClientImpl = exports2.MsgAcknowledgementResponse = exports2.MsgAcknowledgement = exports2.MsgTimeoutOnCloseResponse = exports2.MsgTimeoutOnClose = exports2.MsgTimeoutResponse = exports2.MsgTimeout = exports2.MsgRecvPacketResponse = exports2.MsgRecvPacket = exports2.MsgChannelCloseConfirmResponse = exports2.MsgChannelCloseConfirm = exports2.MsgChannelCloseInitResponse = exports2.MsgChannelCloseInit = exports2.MsgChannelOpenConfirmResponse = exports2.MsgChannelOpenConfirm = exports2.MsgChannelOpenAckResponse = exports2.MsgChannelOpenAck = exports2.MsgChannelOpenTryResponse = exports2.MsgChannelOpenTry = exports2.MsgChannelOpenInitResponse = exports2.MsgChannelOpenInit = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var channel_1 = require_channel();
      var client_1 = require_client();
      exports2.protobufPackage = "ibc.core.channel.v1";
      var baseMsgChannelOpenInit = { portId: "", signer: "" };
      exports2.MsgChannelOpenInit = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
          }
          if (message.channel !== void 0) {
            channel_1.Channel.encode(message.channel, writer.uint32(18).fork()).ldelim();
          }
          if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgChannelOpenInit);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.portId = reader.string();
                break;
              case 2:
                message.channel = channel_1.Channel.decode(reader, reader.uint32());
                break;
              case 3:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgChannelOpenInit);
          message.portId = object.portId !== void 0 && object.portId !== null ? String(object.portId) : "";
          message.channel = object.channel !== void 0 && object.channel !== null ? channel_1.Channel.fromJSON(object.channel) : void 0;
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.portId !== void 0 && (obj.portId = message.portId);
          message.channel !== void 0 && (obj.channel = message.channel ? channel_1.Channel.toJSON(message.channel) : void 0);
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgChannelOpenInit);
          message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
          message.channel = object.channel !== void 0 && object.channel !== null ? channel_1.Channel.fromPartial(object.channel) : void 0;
          message.signer = (_b = object.signer) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseMsgChannelOpenInitResponse = {};
      exports2.MsgChannelOpenInitResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgChannelOpenInitResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgChannelOpenInitResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgChannelOpenInitResponse);
          return message;
        }
      };
      var baseMsgChannelOpenTry = {
        portId: "",
        previousChannelId: "",
        counterpartyVersion: "",
        signer: ""
      };
      exports2.MsgChannelOpenTry = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
          }
          if (message.previousChannelId !== "") {
            writer.uint32(18).string(message.previousChannelId);
          }
          if (message.channel !== void 0) {
            channel_1.Channel.encode(message.channel, writer.uint32(26).fork()).ldelim();
          }
          if (message.counterpartyVersion !== "") {
            writer.uint32(34).string(message.counterpartyVersion);
          }
          if (message.proofInit.length !== 0) {
            writer.uint32(42).bytes(message.proofInit);
          }
          if (message.proofHeight !== void 0) {
            client_1.Height.encode(message.proofHeight, writer.uint32(50).fork()).ldelim();
          }
          if (message.signer !== "") {
            writer.uint32(58).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgChannelOpenTry);
          message.proofInit = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.portId = reader.string();
                break;
              case 2:
                message.previousChannelId = reader.string();
                break;
              case 3:
                message.channel = channel_1.Channel.decode(reader, reader.uint32());
                break;
              case 4:
                message.counterpartyVersion = reader.string();
                break;
              case 5:
                message.proofInit = reader.bytes();
                break;
              case 6:
                message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                break;
              case 7:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgChannelOpenTry);
          message.portId = object.portId !== void 0 && object.portId !== null ? String(object.portId) : "";
          message.previousChannelId = object.previousChannelId !== void 0 && object.previousChannelId !== null ? String(object.previousChannelId) : "";
          message.channel = object.channel !== void 0 && object.channel !== null ? channel_1.Channel.fromJSON(object.channel) : void 0;
          message.counterpartyVersion = object.counterpartyVersion !== void 0 && object.counterpartyVersion !== null ? String(object.counterpartyVersion) : "";
          message.proofInit = object.proofInit !== void 0 && object.proofInit !== null ? bytesFromBase64(object.proofInit) : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromJSON(object.proofHeight) : void 0;
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.portId !== void 0 && (obj.portId = message.portId);
          message.previousChannelId !== void 0 && (obj.previousChannelId = message.previousChannelId);
          message.channel !== void 0 && (obj.channel = message.channel ? channel_1.Channel.toJSON(message.channel) : void 0);
          message.counterpartyVersion !== void 0 && (obj.counterpartyVersion = message.counterpartyVersion);
          message.proofInit !== void 0 && (obj.proofInit = base64FromBytes(message.proofInit !== void 0 ? message.proofInit : new Uint8Array()));
          message.proofHeight !== void 0 && (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : void 0);
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d, _e;
          const message = Object.assign({}, baseMsgChannelOpenTry);
          message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
          message.previousChannelId = (_b = object.previousChannelId) !== null && _b !== void 0 ? _b : "";
          message.channel = object.channel !== void 0 && object.channel !== null ? channel_1.Channel.fromPartial(object.channel) : void 0;
          message.counterpartyVersion = (_c = object.counterpartyVersion) !== null && _c !== void 0 ? _c : "";
          message.proofInit = (_d = object.proofInit) !== null && _d !== void 0 ? _d : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromPartial(object.proofHeight) : void 0;
          message.signer = (_e = object.signer) !== null && _e !== void 0 ? _e : "";
          return message;
        }
      };
      var baseMsgChannelOpenTryResponse = {};
      exports2.MsgChannelOpenTryResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgChannelOpenTryResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgChannelOpenTryResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgChannelOpenTryResponse);
          return message;
        }
      };
      var baseMsgChannelOpenAck = {
        portId: "",
        channelId: "",
        counterpartyChannelId: "",
        counterpartyVersion: "",
        signer: ""
      };
      exports2.MsgChannelOpenAck = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
          }
          if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
          }
          if (message.counterpartyChannelId !== "") {
            writer.uint32(26).string(message.counterpartyChannelId);
          }
          if (message.counterpartyVersion !== "") {
            writer.uint32(34).string(message.counterpartyVersion);
          }
          if (message.proofTry.length !== 0) {
            writer.uint32(42).bytes(message.proofTry);
          }
          if (message.proofHeight !== void 0) {
            client_1.Height.encode(message.proofHeight, writer.uint32(50).fork()).ldelim();
          }
          if (message.signer !== "") {
            writer.uint32(58).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgChannelOpenAck);
          message.proofTry = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.portId = reader.string();
                break;
              case 2:
                message.channelId = reader.string();
                break;
              case 3:
                message.counterpartyChannelId = reader.string();
                break;
              case 4:
                message.counterpartyVersion = reader.string();
                break;
              case 5:
                message.proofTry = reader.bytes();
                break;
              case 6:
                message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                break;
              case 7:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgChannelOpenAck);
          message.portId = object.portId !== void 0 && object.portId !== null ? String(object.portId) : "";
          message.channelId = object.channelId !== void 0 && object.channelId !== null ? String(object.channelId) : "";
          message.counterpartyChannelId = object.counterpartyChannelId !== void 0 && object.counterpartyChannelId !== null ? String(object.counterpartyChannelId) : "";
          message.counterpartyVersion = object.counterpartyVersion !== void 0 && object.counterpartyVersion !== null ? String(object.counterpartyVersion) : "";
          message.proofTry = object.proofTry !== void 0 && object.proofTry !== null ? bytesFromBase64(object.proofTry) : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromJSON(object.proofHeight) : void 0;
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.portId !== void 0 && (obj.portId = message.portId);
          message.channelId !== void 0 && (obj.channelId = message.channelId);
          message.counterpartyChannelId !== void 0 && (obj.counterpartyChannelId = message.counterpartyChannelId);
          message.counterpartyVersion !== void 0 && (obj.counterpartyVersion = message.counterpartyVersion);
          message.proofTry !== void 0 && (obj.proofTry = base64FromBytes(message.proofTry !== void 0 ? message.proofTry : new Uint8Array()));
          message.proofHeight !== void 0 && (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : void 0);
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d, _e, _f;
          const message = Object.assign({}, baseMsgChannelOpenAck);
          message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
          message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
          message.counterpartyChannelId = (_c = object.counterpartyChannelId) !== null && _c !== void 0 ? _c : "";
          message.counterpartyVersion = (_d = object.counterpartyVersion) !== null && _d !== void 0 ? _d : "";
          message.proofTry = (_e = object.proofTry) !== null && _e !== void 0 ? _e : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromPartial(object.proofHeight) : void 0;
          message.signer = (_f = object.signer) !== null && _f !== void 0 ? _f : "";
          return message;
        }
      };
      var baseMsgChannelOpenAckResponse = {};
      exports2.MsgChannelOpenAckResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgChannelOpenAckResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgChannelOpenAckResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgChannelOpenAckResponse);
          return message;
        }
      };
      var baseMsgChannelOpenConfirm = { portId: "", channelId: "", signer: "" };
      exports2.MsgChannelOpenConfirm = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
          }
          if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
          }
          if (message.proofAck.length !== 0) {
            writer.uint32(26).bytes(message.proofAck);
          }
          if (message.proofHeight !== void 0) {
            client_1.Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
          }
          if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgChannelOpenConfirm);
          message.proofAck = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.portId = reader.string();
                break;
              case 2:
                message.channelId = reader.string();
                break;
              case 3:
                message.proofAck = reader.bytes();
                break;
              case 4:
                message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                break;
              case 5:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgChannelOpenConfirm);
          message.portId = object.portId !== void 0 && object.portId !== null ? String(object.portId) : "";
          message.channelId = object.channelId !== void 0 && object.channelId !== null ? String(object.channelId) : "";
          message.proofAck = object.proofAck !== void 0 && object.proofAck !== null ? bytesFromBase64(object.proofAck) : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromJSON(object.proofHeight) : void 0;
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.portId !== void 0 && (obj.portId = message.portId);
          message.channelId !== void 0 && (obj.channelId = message.channelId);
          message.proofAck !== void 0 && (obj.proofAck = base64FromBytes(message.proofAck !== void 0 ? message.proofAck : new Uint8Array()));
          message.proofHeight !== void 0 && (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : void 0);
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d;
          const message = Object.assign({}, baseMsgChannelOpenConfirm);
          message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
          message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
          message.proofAck = (_c = object.proofAck) !== null && _c !== void 0 ? _c : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromPartial(object.proofHeight) : void 0;
          message.signer = (_d = object.signer) !== null && _d !== void 0 ? _d : "";
          return message;
        }
      };
      var baseMsgChannelOpenConfirmResponse = {};
      exports2.MsgChannelOpenConfirmResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgChannelOpenConfirmResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgChannelOpenConfirmResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgChannelOpenConfirmResponse);
          return message;
        }
      };
      var baseMsgChannelCloseInit = { portId: "", channelId: "", signer: "" };
      exports2.MsgChannelCloseInit = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
          }
          if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
          }
          if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgChannelCloseInit);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.portId = reader.string();
                break;
              case 2:
                message.channelId = reader.string();
                break;
              case 3:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgChannelCloseInit);
          message.portId = object.portId !== void 0 && object.portId !== null ? String(object.portId) : "";
          message.channelId = object.channelId !== void 0 && object.channelId !== null ? String(object.channelId) : "";
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.portId !== void 0 && (obj.portId = message.portId);
          message.channelId !== void 0 && (obj.channelId = message.channelId);
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseMsgChannelCloseInit);
          message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
          message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
          message.signer = (_c = object.signer) !== null && _c !== void 0 ? _c : "";
          return message;
        }
      };
      var baseMsgChannelCloseInitResponse = {};
      exports2.MsgChannelCloseInitResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgChannelCloseInitResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgChannelCloseInitResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgChannelCloseInitResponse);
          return message;
        }
      };
      var baseMsgChannelCloseConfirm = { portId: "", channelId: "", signer: "" };
      exports2.MsgChannelCloseConfirm = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
          }
          if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
          }
          if (message.proofInit.length !== 0) {
            writer.uint32(26).bytes(message.proofInit);
          }
          if (message.proofHeight !== void 0) {
            client_1.Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
          }
          if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgChannelCloseConfirm);
          message.proofInit = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.portId = reader.string();
                break;
              case 2:
                message.channelId = reader.string();
                break;
              case 3:
                message.proofInit = reader.bytes();
                break;
              case 4:
                message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                break;
              case 5:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgChannelCloseConfirm);
          message.portId = object.portId !== void 0 && object.portId !== null ? String(object.portId) : "";
          message.channelId = object.channelId !== void 0 && object.channelId !== null ? String(object.channelId) : "";
          message.proofInit = object.proofInit !== void 0 && object.proofInit !== null ? bytesFromBase64(object.proofInit) : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromJSON(object.proofHeight) : void 0;
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.portId !== void 0 && (obj.portId = message.portId);
          message.channelId !== void 0 && (obj.channelId = message.channelId);
          message.proofInit !== void 0 && (obj.proofInit = base64FromBytes(message.proofInit !== void 0 ? message.proofInit : new Uint8Array()));
          message.proofHeight !== void 0 && (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : void 0);
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d;
          const message = Object.assign({}, baseMsgChannelCloseConfirm);
          message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
          message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
          message.proofInit = (_c = object.proofInit) !== null && _c !== void 0 ? _c : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromPartial(object.proofHeight) : void 0;
          message.signer = (_d = object.signer) !== null && _d !== void 0 ? _d : "";
          return message;
        }
      };
      var baseMsgChannelCloseConfirmResponse = {};
      exports2.MsgChannelCloseConfirmResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgChannelCloseConfirmResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgChannelCloseConfirmResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgChannelCloseConfirmResponse);
          return message;
        }
      };
      var baseMsgRecvPacket = { signer: "" };
      exports2.MsgRecvPacket = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.packet !== void 0) {
            channel_1.Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
          }
          if (message.proofCommitment.length !== 0) {
            writer.uint32(18).bytes(message.proofCommitment);
          }
          if (message.proofHeight !== void 0) {
            client_1.Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
          }
          if (message.signer !== "") {
            writer.uint32(34).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgRecvPacket);
          message.proofCommitment = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.packet = channel_1.Packet.decode(reader, reader.uint32());
                break;
              case 2:
                message.proofCommitment = reader.bytes();
                break;
              case 3:
                message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                break;
              case 4:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgRecvPacket);
          message.packet = object.packet !== void 0 && object.packet !== null ? channel_1.Packet.fromJSON(object.packet) : void 0;
          message.proofCommitment = object.proofCommitment !== void 0 && object.proofCommitment !== null ? bytesFromBase64(object.proofCommitment) : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromJSON(object.proofHeight) : void 0;
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.packet !== void 0 && (obj.packet = message.packet ? channel_1.Packet.toJSON(message.packet) : void 0);
          message.proofCommitment !== void 0 && (obj.proofCommitment = base64FromBytes(message.proofCommitment !== void 0 ? message.proofCommitment : new Uint8Array()));
          message.proofHeight !== void 0 && (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : void 0);
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgRecvPacket);
          message.packet = object.packet !== void 0 && object.packet !== null ? channel_1.Packet.fromPartial(object.packet) : void 0;
          message.proofCommitment = (_a = object.proofCommitment) !== null && _a !== void 0 ? _a : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromPartial(object.proofHeight) : void 0;
          message.signer = (_b = object.signer) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseMsgRecvPacketResponse = {};
      exports2.MsgRecvPacketResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgRecvPacketResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgRecvPacketResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgRecvPacketResponse);
          return message;
        }
      };
      var baseMsgTimeout = { nextSequenceRecv: long_1.default.UZERO, signer: "" };
      exports2.MsgTimeout = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.packet !== void 0) {
            channel_1.Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
          }
          if (message.proofUnreceived.length !== 0) {
            writer.uint32(18).bytes(message.proofUnreceived);
          }
          if (message.proofHeight !== void 0) {
            client_1.Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
          }
          if (!message.nextSequenceRecv.isZero()) {
            writer.uint32(32).uint64(message.nextSequenceRecv);
          }
          if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgTimeout);
          message.proofUnreceived = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.packet = channel_1.Packet.decode(reader, reader.uint32());
                break;
              case 2:
                message.proofUnreceived = reader.bytes();
                break;
              case 3:
                message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                break;
              case 4:
                message.nextSequenceRecv = reader.uint64();
                break;
              case 5:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgTimeout);
          message.packet = object.packet !== void 0 && object.packet !== null ? channel_1.Packet.fromJSON(object.packet) : void 0;
          message.proofUnreceived = object.proofUnreceived !== void 0 && object.proofUnreceived !== null ? bytesFromBase64(object.proofUnreceived) : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromJSON(object.proofHeight) : void 0;
          message.nextSequenceRecv = object.nextSequenceRecv !== void 0 && object.nextSequenceRecv !== null ? long_1.default.fromString(object.nextSequenceRecv) : long_1.default.UZERO;
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.packet !== void 0 && (obj.packet = message.packet ? channel_1.Packet.toJSON(message.packet) : void 0);
          message.proofUnreceived !== void 0 && (obj.proofUnreceived = base64FromBytes(message.proofUnreceived !== void 0 ? message.proofUnreceived : new Uint8Array()));
          message.proofHeight !== void 0 && (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : void 0);
          message.nextSequenceRecv !== void 0 && (obj.nextSequenceRecv = (message.nextSequenceRecv || long_1.default.UZERO).toString());
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgTimeout);
          message.packet = object.packet !== void 0 && object.packet !== null ? channel_1.Packet.fromPartial(object.packet) : void 0;
          message.proofUnreceived = (_a = object.proofUnreceived) !== null && _a !== void 0 ? _a : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromPartial(object.proofHeight) : void 0;
          message.nextSequenceRecv = object.nextSequenceRecv !== void 0 && object.nextSequenceRecv !== null ? long_1.default.fromValue(object.nextSequenceRecv) : long_1.default.UZERO;
          message.signer = (_b = object.signer) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseMsgTimeoutResponse = {};
      exports2.MsgTimeoutResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgTimeoutResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgTimeoutResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgTimeoutResponse);
          return message;
        }
      };
      var baseMsgTimeoutOnClose = { nextSequenceRecv: long_1.default.UZERO, signer: "" };
      exports2.MsgTimeoutOnClose = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.packet !== void 0) {
            channel_1.Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
          }
          if (message.proofUnreceived.length !== 0) {
            writer.uint32(18).bytes(message.proofUnreceived);
          }
          if (message.proofClose.length !== 0) {
            writer.uint32(26).bytes(message.proofClose);
          }
          if (message.proofHeight !== void 0) {
            client_1.Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
          }
          if (!message.nextSequenceRecv.isZero()) {
            writer.uint32(40).uint64(message.nextSequenceRecv);
          }
          if (message.signer !== "") {
            writer.uint32(50).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgTimeoutOnClose);
          message.proofUnreceived = new Uint8Array();
          message.proofClose = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.packet = channel_1.Packet.decode(reader, reader.uint32());
                break;
              case 2:
                message.proofUnreceived = reader.bytes();
                break;
              case 3:
                message.proofClose = reader.bytes();
                break;
              case 4:
                message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                break;
              case 5:
                message.nextSequenceRecv = reader.uint64();
                break;
              case 6:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgTimeoutOnClose);
          message.packet = object.packet !== void 0 && object.packet !== null ? channel_1.Packet.fromJSON(object.packet) : void 0;
          message.proofUnreceived = object.proofUnreceived !== void 0 && object.proofUnreceived !== null ? bytesFromBase64(object.proofUnreceived) : new Uint8Array();
          message.proofClose = object.proofClose !== void 0 && object.proofClose !== null ? bytesFromBase64(object.proofClose) : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromJSON(object.proofHeight) : void 0;
          message.nextSequenceRecv = object.nextSequenceRecv !== void 0 && object.nextSequenceRecv !== null ? long_1.default.fromString(object.nextSequenceRecv) : long_1.default.UZERO;
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.packet !== void 0 && (obj.packet = message.packet ? channel_1.Packet.toJSON(message.packet) : void 0);
          message.proofUnreceived !== void 0 && (obj.proofUnreceived = base64FromBytes(message.proofUnreceived !== void 0 ? message.proofUnreceived : new Uint8Array()));
          message.proofClose !== void 0 && (obj.proofClose = base64FromBytes(message.proofClose !== void 0 ? message.proofClose : new Uint8Array()));
          message.proofHeight !== void 0 && (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : void 0);
          message.nextSequenceRecv !== void 0 && (obj.nextSequenceRecv = (message.nextSequenceRecv || long_1.default.UZERO).toString());
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseMsgTimeoutOnClose);
          message.packet = object.packet !== void 0 && object.packet !== null ? channel_1.Packet.fromPartial(object.packet) : void 0;
          message.proofUnreceived = (_a = object.proofUnreceived) !== null && _a !== void 0 ? _a : new Uint8Array();
          message.proofClose = (_b = object.proofClose) !== null && _b !== void 0 ? _b : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromPartial(object.proofHeight) : void 0;
          message.nextSequenceRecv = object.nextSequenceRecv !== void 0 && object.nextSequenceRecv !== null ? long_1.default.fromValue(object.nextSequenceRecv) : long_1.default.UZERO;
          message.signer = (_c = object.signer) !== null && _c !== void 0 ? _c : "";
          return message;
        }
      };
      var baseMsgTimeoutOnCloseResponse = {};
      exports2.MsgTimeoutOnCloseResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgTimeoutOnCloseResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgTimeoutOnCloseResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgTimeoutOnCloseResponse);
          return message;
        }
      };
      var baseMsgAcknowledgement = { signer: "" };
      exports2.MsgAcknowledgement = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.packet !== void 0) {
            channel_1.Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
          }
          if (message.acknowledgement.length !== 0) {
            writer.uint32(18).bytes(message.acknowledgement);
          }
          if (message.proofAcked.length !== 0) {
            writer.uint32(26).bytes(message.proofAcked);
          }
          if (message.proofHeight !== void 0) {
            client_1.Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
          }
          if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgAcknowledgement);
          message.acknowledgement = new Uint8Array();
          message.proofAcked = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.packet = channel_1.Packet.decode(reader, reader.uint32());
                break;
              case 2:
                message.acknowledgement = reader.bytes();
                break;
              case 3:
                message.proofAcked = reader.bytes();
                break;
              case 4:
                message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                break;
              case 5:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgAcknowledgement);
          message.packet = object.packet !== void 0 && object.packet !== null ? channel_1.Packet.fromJSON(object.packet) : void 0;
          message.acknowledgement = object.acknowledgement !== void 0 && object.acknowledgement !== null ? bytesFromBase64(object.acknowledgement) : new Uint8Array();
          message.proofAcked = object.proofAcked !== void 0 && object.proofAcked !== null ? bytesFromBase64(object.proofAcked) : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromJSON(object.proofHeight) : void 0;
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.packet !== void 0 && (obj.packet = message.packet ? channel_1.Packet.toJSON(message.packet) : void 0);
          message.acknowledgement !== void 0 && (obj.acknowledgement = base64FromBytes(message.acknowledgement !== void 0 ? message.acknowledgement : new Uint8Array()));
          message.proofAcked !== void 0 && (obj.proofAcked = base64FromBytes(message.proofAcked !== void 0 ? message.proofAcked : new Uint8Array()));
          message.proofHeight !== void 0 && (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : void 0);
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseMsgAcknowledgement);
          message.packet = object.packet !== void 0 && object.packet !== null ? channel_1.Packet.fromPartial(object.packet) : void 0;
          message.acknowledgement = (_a = object.acknowledgement) !== null && _a !== void 0 ? _a : new Uint8Array();
          message.proofAcked = (_b = object.proofAcked) !== null && _b !== void 0 ? _b : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromPartial(object.proofHeight) : void 0;
          message.signer = (_c = object.signer) !== null && _c !== void 0 ? _c : "";
          return message;
        }
      };
      var baseMsgAcknowledgementResponse = {};
      exports2.MsgAcknowledgementResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgAcknowledgementResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgAcknowledgementResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgAcknowledgementResponse);
          return message;
        }
      };
      var MsgClientImpl = class {
        constructor(rpc) {
          this.rpc = rpc;
          this.ChannelOpenInit = this.ChannelOpenInit.bind(this);
          this.ChannelOpenTry = this.ChannelOpenTry.bind(this);
          this.ChannelOpenAck = this.ChannelOpenAck.bind(this);
          this.ChannelOpenConfirm = this.ChannelOpenConfirm.bind(this);
          this.ChannelCloseInit = this.ChannelCloseInit.bind(this);
          this.ChannelCloseConfirm = this.ChannelCloseConfirm.bind(this);
          this.RecvPacket = this.RecvPacket.bind(this);
          this.Timeout = this.Timeout.bind(this);
          this.TimeoutOnClose = this.TimeoutOnClose.bind(this);
          this.Acknowledgement = this.Acknowledgement.bind(this);
        }
        ChannelOpenInit(request) {
          const data = exports2.MsgChannelOpenInit.encode(request).finish();
          const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenInit", data);
          return promise.then((data2) => exports2.MsgChannelOpenInitResponse.decode(new minimal_1.default.Reader(data2)));
        }
        ChannelOpenTry(request) {
          const data = exports2.MsgChannelOpenTry.encode(request).finish();
          const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenTry", data);
          return promise.then((data2) => exports2.MsgChannelOpenTryResponse.decode(new minimal_1.default.Reader(data2)));
        }
        ChannelOpenAck(request) {
          const data = exports2.MsgChannelOpenAck.encode(request).finish();
          const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenAck", data);
          return promise.then((data2) => exports2.MsgChannelOpenAckResponse.decode(new minimal_1.default.Reader(data2)));
        }
        ChannelOpenConfirm(request) {
          const data = exports2.MsgChannelOpenConfirm.encode(request).finish();
          const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenConfirm", data);
          return promise.then((data2) => exports2.MsgChannelOpenConfirmResponse.decode(new minimal_1.default.Reader(data2)));
        }
        ChannelCloseInit(request) {
          const data = exports2.MsgChannelCloseInit.encode(request).finish();
          const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelCloseInit", data);
          return promise.then((data2) => exports2.MsgChannelCloseInitResponse.decode(new minimal_1.default.Reader(data2)));
        }
        ChannelCloseConfirm(request) {
          const data = exports2.MsgChannelCloseConfirm.encode(request).finish();
          const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelCloseConfirm", data);
          return promise.then((data2) => exports2.MsgChannelCloseConfirmResponse.decode(new minimal_1.default.Reader(data2)));
        }
        RecvPacket(request) {
          const data = exports2.MsgRecvPacket.encode(request).finish();
          const promise = this.rpc.request("ibc.core.channel.v1.Msg", "RecvPacket", data);
          return promise.then((data2) => exports2.MsgRecvPacketResponse.decode(new minimal_1.default.Reader(data2)));
        }
        Timeout(request) {
          const data = exports2.MsgTimeout.encode(request).finish();
          const promise = this.rpc.request("ibc.core.channel.v1.Msg", "Timeout", data);
          return promise.then((data2) => exports2.MsgTimeoutResponse.decode(new minimal_1.default.Reader(data2)));
        }
        TimeoutOnClose(request) {
          const data = exports2.MsgTimeoutOnClose.encode(request).finish();
          const promise = this.rpc.request("ibc.core.channel.v1.Msg", "TimeoutOnClose", data);
          return promise.then((data2) => exports2.MsgTimeoutOnCloseResponse.decode(new minimal_1.default.Reader(data2)));
        }
        Acknowledgement(request) {
          const data = exports2.MsgAcknowledgement.encode(request).finish();
          const promise = this.rpc.request("ibc.core.channel.v1.Msg", "Acknowledgement", data);
          return promise.then((data2) => exports2.MsgAcknowledgementResponse.decode(new minimal_1.default.Reader(data2)));
        }
      };
      exports2.MsgClientImpl = MsgClientImpl;
      var globalThis = (() => {
        if (typeof globalThis !== "undefined")
          return globalThis;
        if (typeof self !== "undefined")
          return self;
        if (typeof window !== "undefined")
          return window;
        if (typeof global !== "undefined")
          return global;
        throw "Unable to locate global object";
      })();
      var atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
      function bytesFromBase64(b64) {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
          arr[i] = bin.charCodeAt(i);
        }
        return arr;
      }
      var btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
      function base64FromBytes(arr) {
        const bin = [];
        for (const byte of arr) {
          bin.push(String.fromCharCode(byte));
        }
        return btoa(bin.join(""));
      }
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/ibc/core/client/v1/tx.js
  var require_tx6 = __commonJS({
    "node_modules/cosmjs-types/ibc/core/client/v1/tx.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.MsgClientImpl = exports2.MsgSubmitMisbehaviourResponse = exports2.MsgSubmitMisbehaviour = exports2.MsgUpgradeClientResponse = exports2.MsgUpgradeClient = exports2.MsgUpdateClientResponse = exports2.MsgUpdateClient = exports2.MsgCreateClientResponse = exports2.MsgCreateClient = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var any_1 = require_any();
      exports2.protobufPackage = "ibc.core.client.v1";
      var baseMsgCreateClient = { signer: "" };
      exports2.MsgCreateClient = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.clientState !== void 0) {
            any_1.Any.encode(message.clientState, writer.uint32(10).fork()).ldelim();
          }
          if (message.consensusState !== void 0) {
            any_1.Any.encode(message.consensusState, writer.uint32(18).fork()).ldelim();
          }
          if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgCreateClient);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.clientState = any_1.Any.decode(reader, reader.uint32());
                break;
              case 2:
                message.consensusState = any_1.Any.decode(reader, reader.uint32());
                break;
              case 3:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgCreateClient);
          message.clientState = object.clientState !== void 0 && object.clientState !== null ? any_1.Any.fromJSON(object.clientState) : void 0;
          message.consensusState = object.consensusState !== void 0 && object.consensusState !== null ? any_1.Any.fromJSON(object.consensusState) : void 0;
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.clientState !== void 0 && (obj.clientState = message.clientState ? any_1.Any.toJSON(message.clientState) : void 0);
          message.consensusState !== void 0 && (obj.consensusState = message.consensusState ? any_1.Any.toJSON(message.consensusState) : void 0);
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseMsgCreateClient);
          message.clientState = object.clientState !== void 0 && object.clientState !== null ? any_1.Any.fromPartial(object.clientState) : void 0;
          message.consensusState = object.consensusState !== void 0 && object.consensusState !== null ? any_1.Any.fromPartial(object.consensusState) : void 0;
          message.signer = (_a = object.signer) !== null && _a !== void 0 ? _a : "";
          return message;
        }
      };
      var baseMsgCreateClientResponse = {};
      exports2.MsgCreateClientResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgCreateClientResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgCreateClientResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgCreateClientResponse);
          return message;
        }
      };
      var baseMsgUpdateClient = { clientId: "", signer: "" };
      exports2.MsgUpdateClient = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
          }
          if (message.header !== void 0) {
            any_1.Any.encode(message.header, writer.uint32(18).fork()).ldelim();
          }
          if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgUpdateClient);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.clientId = reader.string();
                break;
              case 2:
                message.header = any_1.Any.decode(reader, reader.uint32());
                break;
              case 3:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgUpdateClient);
          message.clientId = object.clientId !== void 0 && object.clientId !== null ? String(object.clientId) : "";
          message.header = object.header !== void 0 && object.header !== null ? any_1.Any.fromJSON(object.header) : void 0;
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.clientId !== void 0 && (obj.clientId = message.clientId);
          message.header !== void 0 && (obj.header = message.header ? any_1.Any.toJSON(message.header) : void 0);
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgUpdateClient);
          message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
          message.header = object.header !== void 0 && object.header !== null ? any_1.Any.fromPartial(object.header) : void 0;
          message.signer = (_b = object.signer) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseMsgUpdateClientResponse = {};
      exports2.MsgUpdateClientResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgUpdateClientResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgUpdateClientResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgUpdateClientResponse);
          return message;
        }
      };
      var baseMsgUpgradeClient = { clientId: "", signer: "" };
      exports2.MsgUpgradeClient = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
          }
          if (message.clientState !== void 0) {
            any_1.Any.encode(message.clientState, writer.uint32(18).fork()).ldelim();
          }
          if (message.consensusState !== void 0) {
            any_1.Any.encode(message.consensusState, writer.uint32(26).fork()).ldelim();
          }
          if (message.proofUpgradeClient.length !== 0) {
            writer.uint32(34).bytes(message.proofUpgradeClient);
          }
          if (message.proofUpgradeConsensusState.length !== 0) {
            writer.uint32(42).bytes(message.proofUpgradeConsensusState);
          }
          if (message.signer !== "") {
            writer.uint32(50).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgUpgradeClient);
          message.proofUpgradeClient = new Uint8Array();
          message.proofUpgradeConsensusState = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.clientId = reader.string();
                break;
              case 2:
                message.clientState = any_1.Any.decode(reader, reader.uint32());
                break;
              case 3:
                message.consensusState = any_1.Any.decode(reader, reader.uint32());
                break;
              case 4:
                message.proofUpgradeClient = reader.bytes();
                break;
              case 5:
                message.proofUpgradeConsensusState = reader.bytes();
                break;
              case 6:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgUpgradeClient);
          message.clientId = object.clientId !== void 0 && object.clientId !== null ? String(object.clientId) : "";
          message.clientState = object.clientState !== void 0 && object.clientState !== null ? any_1.Any.fromJSON(object.clientState) : void 0;
          message.consensusState = object.consensusState !== void 0 && object.consensusState !== null ? any_1.Any.fromJSON(object.consensusState) : void 0;
          message.proofUpgradeClient = object.proofUpgradeClient !== void 0 && object.proofUpgradeClient !== null ? bytesFromBase64(object.proofUpgradeClient) : new Uint8Array();
          message.proofUpgradeConsensusState = object.proofUpgradeConsensusState !== void 0 && object.proofUpgradeConsensusState !== null ? bytesFromBase64(object.proofUpgradeConsensusState) : new Uint8Array();
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.clientId !== void 0 && (obj.clientId = message.clientId);
          message.clientState !== void 0 && (obj.clientState = message.clientState ? any_1.Any.toJSON(message.clientState) : void 0);
          message.consensusState !== void 0 && (obj.consensusState = message.consensusState ? any_1.Any.toJSON(message.consensusState) : void 0);
          message.proofUpgradeClient !== void 0 && (obj.proofUpgradeClient = base64FromBytes(message.proofUpgradeClient !== void 0 ? message.proofUpgradeClient : new Uint8Array()));
          message.proofUpgradeConsensusState !== void 0 && (obj.proofUpgradeConsensusState = base64FromBytes(message.proofUpgradeConsensusState !== void 0 ? message.proofUpgradeConsensusState : new Uint8Array()));
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d;
          const message = Object.assign({}, baseMsgUpgradeClient);
          message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
          message.clientState = object.clientState !== void 0 && object.clientState !== null ? any_1.Any.fromPartial(object.clientState) : void 0;
          message.consensusState = object.consensusState !== void 0 && object.consensusState !== null ? any_1.Any.fromPartial(object.consensusState) : void 0;
          message.proofUpgradeClient = (_b = object.proofUpgradeClient) !== null && _b !== void 0 ? _b : new Uint8Array();
          message.proofUpgradeConsensusState = (_c = object.proofUpgradeConsensusState) !== null && _c !== void 0 ? _c : new Uint8Array();
          message.signer = (_d = object.signer) !== null && _d !== void 0 ? _d : "";
          return message;
        }
      };
      var baseMsgUpgradeClientResponse = {};
      exports2.MsgUpgradeClientResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgUpgradeClientResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgUpgradeClientResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgUpgradeClientResponse);
          return message;
        }
      };
      var baseMsgSubmitMisbehaviour = { clientId: "", signer: "" };
      exports2.MsgSubmitMisbehaviour = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
          }
          if (message.misbehaviour !== void 0) {
            any_1.Any.encode(message.misbehaviour, writer.uint32(18).fork()).ldelim();
          }
          if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgSubmitMisbehaviour);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.clientId = reader.string();
                break;
              case 2:
                message.misbehaviour = any_1.Any.decode(reader, reader.uint32());
                break;
              case 3:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgSubmitMisbehaviour);
          message.clientId = object.clientId !== void 0 && object.clientId !== null ? String(object.clientId) : "";
          message.misbehaviour = object.misbehaviour !== void 0 && object.misbehaviour !== null ? any_1.Any.fromJSON(object.misbehaviour) : void 0;
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.clientId !== void 0 && (obj.clientId = message.clientId);
          message.misbehaviour !== void 0 && (obj.misbehaviour = message.misbehaviour ? any_1.Any.toJSON(message.misbehaviour) : void 0);
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgSubmitMisbehaviour);
          message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
          message.misbehaviour = object.misbehaviour !== void 0 && object.misbehaviour !== null ? any_1.Any.fromPartial(object.misbehaviour) : void 0;
          message.signer = (_b = object.signer) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseMsgSubmitMisbehaviourResponse = {};
      exports2.MsgSubmitMisbehaviourResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgSubmitMisbehaviourResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgSubmitMisbehaviourResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgSubmitMisbehaviourResponse);
          return message;
        }
      };
      var MsgClientImpl = class {
        constructor(rpc) {
          this.rpc = rpc;
          this.CreateClient = this.CreateClient.bind(this);
          this.UpdateClient = this.UpdateClient.bind(this);
          this.UpgradeClient = this.UpgradeClient.bind(this);
          this.SubmitMisbehaviour = this.SubmitMisbehaviour.bind(this);
        }
        CreateClient(request) {
          const data = exports2.MsgCreateClient.encode(request).finish();
          const promise = this.rpc.request("ibc.core.client.v1.Msg", "CreateClient", data);
          return promise.then((data2) => exports2.MsgCreateClientResponse.decode(new minimal_1.default.Reader(data2)));
        }
        UpdateClient(request) {
          const data = exports2.MsgUpdateClient.encode(request).finish();
          const promise = this.rpc.request("ibc.core.client.v1.Msg", "UpdateClient", data);
          return promise.then((data2) => exports2.MsgUpdateClientResponse.decode(new minimal_1.default.Reader(data2)));
        }
        UpgradeClient(request) {
          const data = exports2.MsgUpgradeClient.encode(request).finish();
          const promise = this.rpc.request("ibc.core.client.v1.Msg", "UpgradeClient", data);
          return promise.then((data2) => exports2.MsgUpgradeClientResponse.decode(new minimal_1.default.Reader(data2)));
        }
        SubmitMisbehaviour(request) {
          const data = exports2.MsgSubmitMisbehaviour.encode(request).finish();
          const promise = this.rpc.request("ibc.core.client.v1.Msg", "SubmitMisbehaviour", data);
          return promise.then((data2) => exports2.MsgSubmitMisbehaviourResponse.decode(new minimal_1.default.Reader(data2)));
        }
      };
      exports2.MsgClientImpl = MsgClientImpl;
      var globalThis = (() => {
        if (typeof globalThis !== "undefined")
          return globalThis;
        if (typeof self !== "undefined")
          return self;
        if (typeof window !== "undefined")
          return window;
        if (typeof global !== "undefined")
          return global;
        throw "Unable to locate global object";
      })();
      var atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
      function bytesFromBase64(b64) {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
          arr[i] = bin.charCodeAt(i);
        }
        return arr;
      }
      var btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
      function base64FromBytes(arr) {
        const bin = [];
        for (const byte of arr) {
          bin.push(String.fromCharCode(byte));
        }
        return btoa(bin.join(""));
      }
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/confio/proofs.js
  var require_proofs = __commonJS({
    "node_modules/cosmjs-types/confio/proofs.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.CompressedNonExistenceProof = exports2.CompressedExistenceProof = exports2.CompressedBatchEntry = exports2.CompressedBatchProof = exports2.BatchEntry = exports2.BatchProof = exports2.InnerSpec = exports2.ProofSpec = exports2.InnerOp = exports2.LeafOp = exports2.CommitmentProof = exports2.NonExistenceProof = exports2.ExistenceProof = exports2.lengthOpToJSON = exports2.lengthOpFromJSON = exports2.LengthOp = exports2.hashOpToJSON = exports2.hashOpFromJSON = exports2.HashOp = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      exports2.protobufPackage = "ics23";
      var HashOp;
      (function(HashOp2) {
        HashOp2[HashOp2["NO_HASH"] = 0] = "NO_HASH";
        HashOp2[HashOp2["SHA256"] = 1] = "SHA256";
        HashOp2[HashOp2["SHA512"] = 2] = "SHA512";
        HashOp2[HashOp2["KECCAK"] = 3] = "KECCAK";
        HashOp2[HashOp2["RIPEMD160"] = 4] = "RIPEMD160";
        HashOp2[HashOp2["BITCOIN"] = 5] = "BITCOIN";
        HashOp2[HashOp2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
      })(HashOp = exports2.HashOp || (exports2.HashOp = {}));
      function hashOpFromJSON(object) {
        switch (object) {
          case 0:
          case "NO_HASH":
            return HashOp.NO_HASH;
          case 1:
          case "SHA256":
            return HashOp.SHA256;
          case 2:
          case "SHA512":
            return HashOp.SHA512;
          case 3:
          case "KECCAK":
            return HashOp.KECCAK;
          case 4:
          case "RIPEMD160":
            return HashOp.RIPEMD160;
          case 5:
          case "BITCOIN":
            return HashOp.BITCOIN;
          case -1:
          case "UNRECOGNIZED":
          default:
            return HashOp.UNRECOGNIZED;
        }
      }
      exports2.hashOpFromJSON = hashOpFromJSON;
      function hashOpToJSON(object) {
        switch (object) {
          case HashOp.NO_HASH:
            return "NO_HASH";
          case HashOp.SHA256:
            return "SHA256";
          case HashOp.SHA512:
            return "SHA512";
          case HashOp.KECCAK:
            return "KECCAK";
          case HashOp.RIPEMD160:
            return "RIPEMD160";
          case HashOp.BITCOIN:
            return "BITCOIN";
          default:
            return "UNKNOWN";
        }
      }
      exports2.hashOpToJSON = hashOpToJSON;
      var LengthOp;
      (function(LengthOp2) {
        LengthOp2[LengthOp2["NO_PREFIX"] = 0] = "NO_PREFIX";
        LengthOp2[LengthOp2["VAR_PROTO"] = 1] = "VAR_PROTO";
        LengthOp2[LengthOp2["VAR_RLP"] = 2] = "VAR_RLP";
        LengthOp2[LengthOp2["FIXED32_BIG"] = 3] = "FIXED32_BIG";
        LengthOp2[LengthOp2["FIXED32_LITTLE"] = 4] = "FIXED32_LITTLE";
        LengthOp2[LengthOp2["FIXED64_BIG"] = 5] = "FIXED64_BIG";
        LengthOp2[LengthOp2["FIXED64_LITTLE"] = 6] = "FIXED64_LITTLE";
        LengthOp2[LengthOp2["REQUIRE_32_BYTES"] = 7] = "REQUIRE_32_BYTES";
        LengthOp2[LengthOp2["REQUIRE_64_BYTES"] = 8] = "REQUIRE_64_BYTES";
        LengthOp2[LengthOp2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
      })(LengthOp = exports2.LengthOp || (exports2.LengthOp = {}));
      function lengthOpFromJSON(object) {
        switch (object) {
          case 0:
          case "NO_PREFIX":
            return LengthOp.NO_PREFIX;
          case 1:
          case "VAR_PROTO":
            return LengthOp.VAR_PROTO;
          case 2:
          case "VAR_RLP":
            return LengthOp.VAR_RLP;
          case 3:
          case "FIXED32_BIG":
            return LengthOp.FIXED32_BIG;
          case 4:
          case "FIXED32_LITTLE":
            return LengthOp.FIXED32_LITTLE;
          case 5:
          case "FIXED64_BIG":
            return LengthOp.FIXED64_BIG;
          case 6:
          case "FIXED64_LITTLE":
            return LengthOp.FIXED64_LITTLE;
          case 7:
          case "REQUIRE_32_BYTES":
            return LengthOp.REQUIRE_32_BYTES;
          case 8:
          case "REQUIRE_64_BYTES":
            return LengthOp.REQUIRE_64_BYTES;
          case -1:
          case "UNRECOGNIZED":
          default:
            return LengthOp.UNRECOGNIZED;
        }
      }
      exports2.lengthOpFromJSON = lengthOpFromJSON;
      function lengthOpToJSON(object) {
        switch (object) {
          case LengthOp.NO_PREFIX:
            return "NO_PREFIX";
          case LengthOp.VAR_PROTO:
            return "VAR_PROTO";
          case LengthOp.VAR_RLP:
            return "VAR_RLP";
          case LengthOp.FIXED32_BIG:
            return "FIXED32_BIG";
          case LengthOp.FIXED32_LITTLE:
            return "FIXED32_LITTLE";
          case LengthOp.FIXED64_BIG:
            return "FIXED64_BIG";
          case LengthOp.FIXED64_LITTLE:
            return "FIXED64_LITTLE";
          case LengthOp.REQUIRE_32_BYTES:
            return "REQUIRE_32_BYTES";
          case LengthOp.REQUIRE_64_BYTES:
            return "REQUIRE_64_BYTES";
          default:
            return "UNKNOWN";
        }
      }
      exports2.lengthOpToJSON = lengthOpToJSON;
      var baseExistenceProof = {};
      exports2.ExistenceProof = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
          }
          if (message.value.length !== 0) {
            writer.uint32(18).bytes(message.value);
          }
          if (message.leaf !== void 0) {
            exports2.LeafOp.encode(message.leaf, writer.uint32(26).fork()).ldelim();
          }
          for (const v of message.path) {
            exports2.InnerOp.encode(v, writer.uint32(34).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseExistenceProof);
          message.path = [];
          message.key = new Uint8Array();
          message.value = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.key = reader.bytes();
                break;
              case 2:
                message.value = reader.bytes();
                break;
              case 3:
                message.leaf = exports2.LeafOp.decode(reader, reader.uint32());
                break;
              case 4:
                message.path.push(exports2.InnerOp.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseExistenceProof);
          message.key = object.key !== void 0 && object.key !== null ? bytesFromBase64(object.key) : new Uint8Array();
          message.value = object.value !== void 0 && object.value !== null ? bytesFromBase64(object.value) : new Uint8Array();
          message.leaf = object.leaf !== void 0 && object.leaf !== null ? exports2.LeafOp.fromJSON(object.leaf) : void 0;
          message.path = ((_a = object.path) !== null && _a !== void 0 ? _a : []).map((e) => exports2.InnerOp.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.key !== void 0 && (obj.key = base64FromBytes(message.key !== void 0 ? message.key : new Uint8Array()));
          message.value !== void 0 && (obj.value = base64FromBytes(message.value !== void 0 ? message.value : new Uint8Array()));
          message.leaf !== void 0 && (obj.leaf = message.leaf ? exports2.LeafOp.toJSON(message.leaf) : void 0);
          if (message.path) {
            obj.path = message.path.map((e) => e ? exports2.InnerOp.toJSON(e) : void 0);
          } else {
            obj.path = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseExistenceProof);
          message.key = (_a = object.key) !== null && _a !== void 0 ? _a : new Uint8Array();
          message.value = (_b = object.value) !== null && _b !== void 0 ? _b : new Uint8Array();
          message.leaf = object.leaf !== void 0 && object.leaf !== null ? exports2.LeafOp.fromPartial(object.leaf) : void 0;
          message.path = ((_c = object.path) === null || _c === void 0 ? void 0 : _c.map((e) => exports2.InnerOp.fromPartial(e))) || [];
          return message;
        }
      };
      var baseNonExistenceProof = {};
      exports2.NonExistenceProof = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
          }
          if (message.left !== void 0) {
            exports2.ExistenceProof.encode(message.left, writer.uint32(18).fork()).ldelim();
          }
          if (message.right !== void 0) {
            exports2.ExistenceProof.encode(message.right, writer.uint32(26).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseNonExistenceProof);
          message.key = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.key = reader.bytes();
                break;
              case 2:
                message.left = exports2.ExistenceProof.decode(reader, reader.uint32());
                break;
              case 3:
                message.right = exports2.ExistenceProof.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseNonExistenceProof);
          message.key = object.key !== void 0 && object.key !== null ? bytesFromBase64(object.key) : new Uint8Array();
          message.left = object.left !== void 0 && object.left !== null ? exports2.ExistenceProof.fromJSON(object.left) : void 0;
          message.right = object.right !== void 0 && object.right !== null ? exports2.ExistenceProof.fromJSON(object.right) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.key !== void 0 && (obj.key = base64FromBytes(message.key !== void 0 ? message.key : new Uint8Array()));
          message.left !== void 0 && (obj.left = message.left ? exports2.ExistenceProof.toJSON(message.left) : void 0);
          message.right !== void 0 && (obj.right = message.right ? exports2.ExistenceProof.toJSON(message.right) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseNonExistenceProof);
          message.key = (_a = object.key) !== null && _a !== void 0 ? _a : new Uint8Array();
          message.left = object.left !== void 0 && object.left !== null ? exports2.ExistenceProof.fromPartial(object.left) : void 0;
          message.right = object.right !== void 0 && object.right !== null ? exports2.ExistenceProof.fromPartial(object.right) : void 0;
          return message;
        }
      };
      var baseCommitmentProof = {};
      exports2.CommitmentProof = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.exist !== void 0) {
            exports2.ExistenceProof.encode(message.exist, writer.uint32(10).fork()).ldelim();
          }
          if (message.nonexist !== void 0) {
            exports2.NonExistenceProof.encode(message.nonexist, writer.uint32(18).fork()).ldelim();
          }
          if (message.batch !== void 0) {
            exports2.BatchProof.encode(message.batch, writer.uint32(26).fork()).ldelim();
          }
          if (message.compressed !== void 0) {
            exports2.CompressedBatchProof.encode(message.compressed, writer.uint32(34).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseCommitmentProof);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.exist = exports2.ExistenceProof.decode(reader, reader.uint32());
                break;
              case 2:
                message.nonexist = exports2.NonExistenceProof.decode(reader, reader.uint32());
                break;
              case 3:
                message.batch = exports2.BatchProof.decode(reader, reader.uint32());
                break;
              case 4:
                message.compressed = exports2.CompressedBatchProof.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseCommitmentProof);
          message.exist = object.exist !== void 0 && object.exist !== null ? exports2.ExistenceProof.fromJSON(object.exist) : void 0;
          message.nonexist = object.nonexist !== void 0 && object.nonexist !== null ? exports2.NonExistenceProof.fromJSON(object.nonexist) : void 0;
          message.batch = object.batch !== void 0 && object.batch !== null ? exports2.BatchProof.fromJSON(object.batch) : void 0;
          message.compressed = object.compressed !== void 0 && object.compressed !== null ? exports2.CompressedBatchProof.fromJSON(object.compressed) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.exist !== void 0 && (obj.exist = message.exist ? exports2.ExistenceProof.toJSON(message.exist) : void 0);
          message.nonexist !== void 0 && (obj.nonexist = message.nonexist ? exports2.NonExistenceProof.toJSON(message.nonexist) : void 0);
          message.batch !== void 0 && (obj.batch = message.batch ? exports2.BatchProof.toJSON(message.batch) : void 0);
          message.compressed !== void 0 && (obj.compressed = message.compressed ? exports2.CompressedBatchProof.toJSON(message.compressed) : void 0);
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseCommitmentProof);
          message.exist = object.exist !== void 0 && object.exist !== null ? exports2.ExistenceProof.fromPartial(object.exist) : void 0;
          message.nonexist = object.nonexist !== void 0 && object.nonexist !== null ? exports2.NonExistenceProof.fromPartial(object.nonexist) : void 0;
          message.batch = object.batch !== void 0 && object.batch !== null ? exports2.BatchProof.fromPartial(object.batch) : void 0;
          message.compressed = object.compressed !== void 0 && object.compressed !== null ? exports2.CompressedBatchProof.fromPartial(object.compressed) : void 0;
          return message;
        }
      };
      var baseLeafOp = { hash: 0, prehashKey: 0, prehashValue: 0, length: 0 };
      exports2.LeafOp = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.hash !== 0) {
            writer.uint32(8).int32(message.hash);
          }
          if (message.prehashKey !== 0) {
            writer.uint32(16).int32(message.prehashKey);
          }
          if (message.prehashValue !== 0) {
            writer.uint32(24).int32(message.prehashValue);
          }
          if (message.length !== 0) {
            writer.uint32(32).int32(message.length);
          }
          if (message.prefix.length !== 0) {
            writer.uint32(42).bytes(message.prefix);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseLeafOp);
          message.prefix = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.hash = reader.int32();
                break;
              case 2:
                message.prehashKey = reader.int32();
                break;
              case 3:
                message.prehashValue = reader.int32();
                break;
              case 4:
                message.length = reader.int32();
                break;
              case 5:
                message.prefix = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseLeafOp);
          message.hash = object.hash !== void 0 && object.hash !== null ? hashOpFromJSON(object.hash) : 0;
          message.prehashKey = object.prehashKey !== void 0 && object.prehashKey !== null ? hashOpFromJSON(object.prehashKey) : 0;
          message.prehashValue = object.prehashValue !== void 0 && object.prehashValue !== null ? hashOpFromJSON(object.prehashValue) : 0;
          message.length = object.length !== void 0 && object.length !== null ? lengthOpFromJSON(object.length) : 0;
          message.prefix = object.prefix !== void 0 && object.prefix !== null ? bytesFromBase64(object.prefix) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.hash !== void 0 && (obj.hash = hashOpToJSON(message.hash));
          message.prehashKey !== void 0 && (obj.prehashKey = hashOpToJSON(message.prehashKey));
          message.prehashValue !== void 0 && (obj.prehashValue = hashOpToJSON(message.prehashValue));
          message.length !== void 0 && (obj.length = lengthOpToJSON(message.length));
          message.prefix !== void 0 && (obj.prefix = base64FromBytes(message.prefix !== void 0 ? message.prefix : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d, _e;
          const message = Object.assign({}, baseLeafOp);
          message.hash = (_a = object.hash) !== null && _a !== void 0 ? _a : 0;
          message.prehashKey = (_b = object.prehashKey) !== null && _b !== void 0 ? _b : 0;
          message.prehashValue = (_c = object.prehashValue) !== null && _c !== void 0 ? _c : 0;
          message.length = (_d = object.length) !== null && _d !== void 0 ? _d : 0;
          message.prefix = (_e = object.prefix) !== null && _e !== void 0 ? _e : new Uint8Array();
          return message;
        }
      };
      var baseInnerOp = { hash: 0 };
      exports2.InnerOp = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.hash !== 0) {
            writer.uint32(8).int32(message.hash);
          }
          if (message.prefix.length !== 0) {
            writer.uint32(18).bytes(message.prefix);
          }
          if (message.suffix.length !== 0) {
            writer.uint32(26).bytes(message.suffix);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseInnerOp);
          message.prefix = new Uint8Array();
          message.suffix = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.hash = reader.int32();
                break;
              case 2:
                message.prefix = reader.bytes();
                break;
              case 3:
                message.suffix = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseInnerOp);
          message.hash = object.hash !== void 0 && object.hash !== null ? hashOpFromJSON(object.hash) : 0;
          message.prefix = object.prefix !== void 0 && object.prefix !== null ? bytesFromBase64(object.prefix) : new Uint8Array();
          message.suffix = object.suffix !== void 0 && object.suffix !== null ? bytesFromBase64(object.suffix) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.hash !== void 0 && (obj.hash = hashOpToJSON(message.hash));
          message.prefix !== void 0 && (obj.prefix = base64FromBytes(message.prefix !== void 0 ? message.prefix : new Uint8Array()));
          message.suffix !== void 0 && (obj.suffix = base64FromBytes(message.suffix !== void 0 ? message.suffix : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseInnerOp);
          message.hash = (_a = object.hash) !== null && _a !== void 0 ? _a : 0;
          message.prefix = (_b = object.prefix) !== null && _b !== void 0 ? _b : new Uint8Array();
          message.suffix = (_c = object.suffix) !== null && _c !== void 0 ? _c : new Uint8Array();
          return message;
        }
      };
      var baseProofSpec = { maxDepth: 0, minDepth: 0 };
      exports2.ProofSpec = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.leafSpec !== void 0) {
            exports2.LeafOp.encode(message.leafSpec, writer.uint32(10).fork()).ldelim();
          }
          if (message.innerSpec !== void 0) {
            exports2.InnerSpec.encode(message.innerSpec, writer.uint32(18).fork()).ldelim();
          }
          if (message.maxDepth !== 0) {
            writer.uint32(24).int32(message.maxDepth);
          }
          if (message.minDepth !== 0) {
            writer.uint32(32).int32(message.minDepth);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseProofSpec);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.leafSpec = exports2.LeafOp.decode(reader, reader.uint32());
                break;
              case 2:
                message.innerSpec = exports2.InnerSpec.decode(reader, reader.uint32());
                break;
              case 3:
                message.maxDepth = reader.int32();
                break;
              case 4:
                message.minDepth = reader.int32();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseProofSpec);
          message.leafSpec = object.leafSpec !== void 0 && object.leafSpec !== null ? exports2.LeafOp.fromJSON(object.leafSpec) : void 0;
          message.innerSpec = object.innerSpec !== void 0 && object.innerSpec !== null ? exports2.InnerSpec.fromJSON(object.innerSpec) : void 0;
          message.maxDepth = object.maxDepth !== void 0 && object.maxDepth !== null ? Number(object.maxDepth) : 0;
          message.minDepth = object.minDepth !== void 0 && object.minDepth !== null ? Number(object.minDepth) : 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.leafSpec !== void 0 && (obj.leafSpec = message.leafSpec ? exports2.LeafOp.toJSON(message.leafSpec) : void 0);
          message.innerSpec !== void 0 && (obj.innerSpec = message.innerSpec ? exports2.InnerSpec.toJSON(message.innerSpec) : void 0);
          message.maxDepth !== void 0 && (obj.maxDepth = message.maxDepth);
          message.minDepth !== void 0 && (obj.minDepth = message.minDepth);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseProofSpec);
          message.leafSpec = object.leafSpec !== void 0 && object.leafSpec !== null ? exports2.LeafOp.fromPartial(object.leafSpec) : void 0;
          message.innerSpec = object.innerSpec !== void 0 && object.innerSpec !== null ? exports2.InnerSpec.fromPartial(object.innerSpec) : void 0;
          message.maxDepth = (_a = object.maxDepth) !== null && _a !== void 0 ? _a : 0;
          message.minDepth = (_b = object.minDepth) !== null && _b !== void 0 ? _b : 0;
          return message;
        }
      };
      var baseInnerSpec = {
        childOrder: 0,
        childSize: 0,
        minPrefixLength: 0,
        maxPrefixLength: 0,
        hash: 0
      };
      exports2.InnerSpec = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          writer.uint32(10).fork();
          for (const v of message.childOrder) {
            writer.int32(v);
          }
          writer.ldelim();
          if (message.childSize !== 0) {
            writer.uint32(16).int32(message.childSize);
          }
          if (message.minPrefixLength !== 0) {
            writer.uint32(24).int32(message.minPrefixLength);
          }
          if (message.maxPrefixLength !== 0) {
            writer.uint32(32).int32(message.maxPrefixLength);
          }
          if (message.emptyChild.length !== 0) {
            writer.uint32(42).bytes(message.emptyChild);
          }
          if (message.hash !== 0) {
            writer.uint32(48).int32(message.hash);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseInnerSpec);
          message.childOrder = [];
          message.emptyChild = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                if ((tag & 7) === 2) {
                  const end2 = reader.uint32() + reader.pos;
                  while (reader.pos < end2) {
                    message.childOrder.push(reader.int32());
                  }
                } else {
                  message.childOrder.push(reader.int32());
                }
                break;
              case 2:
                message.childSize = reader.int32();
                break;
              case 3:
                message.minPrefixLength = reader.int32();
                break;
              case 4:
                message.maxPrefixLength = reader.int32();
                break;
              case 5:
                message.emptyChild = reader.bytes();
                break;
              case 6:
                message.hash = reader.int32();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseInnerSpec);
          message.childOrder = ((_a = object.childOrder) !== null && _a !== void 0 ? _a : []).map((e) => Number(e));
          message.childSize = object.childSize !== void 0 && object.childSize !== null ? Number(object.childSize) : 0;
          message.minPrefixLength = object.minPrefixLength !== void 0 && object.minPrefixLength !== null ? Number(object.minPrefixLength) : 0;
          message.maxPrefixLength = object.maxPrefixLength !== void 0 && object.maxPrefixLength !== null ? Number(object.maxPrefixLength) : 0;
          message.emptyChild = object.emptyChild !== void 0 && object.emptyChild !== null ? bytesFromBase64(object.emptyChild) : new Uint8Array();
          message.hash = object.hash !== void 0 && object.hash !== null ? hashOpFromJSON(object.hash) : 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.childOrder) {
            obj.childOrder = message.childOrder.map((e) => e);
          } else {
            obj.childOrder = [];
          }
          message.childSize !== void 0 && (obj.childSize = message.childSize);
          message.minPrefixLength !== void 0 && (obj.minPrefixLength = message.minPrefixLength);
          message.maxPrefixLength !== void 0 && (obj.maxPrefixLength = message.maxPrefixLength);
          message.emptyChild !== void 0 && (obj.emptyChild = base64FromBytes(message.emptyChild !== void 0 ? message.emptyChild : new Uint8Array()));
          message.hash !== void 0 && (obj.hash = hashOpToJSON(message.hash));
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d, _e, _f;
          const message = Object.assign({}, baseInnerSpec);
          message.childOrder = ((_a = object.childOrder) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
          message.childSize = (_b = object.childSize) !== null && _b !== void 0 ? _b : 0;
          message.minPrefixLength = (_c = object.minPrefixLength) !== null && _c !== void 0 ? _c : 0;
          message.maxPrefixLength = (_d = object.maxPrefixLength) !== null && _d !== void 0 ? _d : 0;
          message.emptyChild = (_e = object.emptyChild) !== null && _e !== void 0 ? _e : new Uint8Array();
          message.hash = (_f = object.hash) !== null && _f !== void 0 ? _f : 0;
          return message;
        }
      };
      var baseBatchProof = {};
      exports2.BatchProof = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.entries) {
            exports2.BatchEntry.encode(v, writer.uint32(10).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseBatchProof);
          message.entries = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.entries.push(exports2.BatchEntry.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseBatchProof);
          message.entries = ((_a = object.entries) !== null && _a !== void 0 ? _a : []).map((e) => exports2.BatchEntry.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.entries) {
            obj.entries = message.entries.map((e) => e ? exports2.BatchEntry.toJSON(e) : void 0);
          } else {
            obj.entries = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseBatchProof);
          message.entries = ((_a = object.entries) === null || _a === void 0 ? void 0 : _a.map((e) => exports2.BatchEntry.fromPartial(e))) || [];
          return message;
        }
      };
      var baseBatchEntry = {};
      exports2.BatchEntry = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.exist !== void 0) {
            exports2.ExistenceProof.encode(message.exist, writer.uint32(10).fork()).ldelim();
          }
          if (message.nonexist !== void 0) {
            exports2.NonExistenceProof.encode(message.nonexist, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseBatchEntry);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.exist = exports2.ExistenceProof.decode(reader, reader.uint32());
                break;
              case 2:
                message.nonexist = exports2.NonExistenceProof.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseBatchEntry);
          message.exist = object.exist !== void 0 && object.exist !== null ? exports2.ExistenceProof.fromJSON(object.exist) : void 0;
          message.nonexist = object.nonexist !== void 0 && object.nonexist !== null ? exports2.NonExistenceProof.fromJSON(object.nonexist) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.exist !== void 0 && (obj.exist = message.exist ? exports2.ExistenceProof.toJSON(message.exist) : void 0);
          message.nonexist !== void 0 && (obj.nonexist = message.nonexist ? exports2.NonExistenceProof.toJSON(message.nonexist) : void 0);
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseBatchEntry);
          message.exist = object.exist !== void 0 && object.exist !== null ? exports2.ExistenceProof.fromPartial(object.exist) : void 0;
          message.nonexist = object.nonexist !== void 0 && object.nonexist !== null ? exports2.NonExistenceProof.fromPartial(object.nonexist) : void 0;
          return message;
        }
      };
      var baseCompressedBatchProof = {};
      exports2.CompressedBatchProof = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.entries) {
            exports2.CompressedBatchEntry.encode(v, writer.uint32(10).fork()).ldelim();
          }
          for (const v of message.lookupInners) {
            exports2.InnerOp.encode(v, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseCompressedBatchProof);
          message.entries = [];
          message.lookupInners = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.entries.push(exports2.CompressedBatchEntry.decode(reader, reader.uint32()));
                break;
              case 2:
                message.lookupInners.push(exports2.InnerOp.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a, _b;
          const message = Object.assign({}, baseCompressedBatchProof);
          message.entries = ((_a = object.entries) !== null && _a !== void 0 ? _a : []).map((e) => exports2.CompressedBatchEntry.fromJSON(e));
          message.lookupInners = ((_b = object.lookupInners) !== null && _b !== void 0 ? _b : []).map((e) => exports2.InnerOp.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.entries) {
            obj.entries = message.entries.map((e) => e ? exports2.CompressedBatchEntry.toJSON(e) : void 0);
          } else {
            obj.entries = [];
          }
          if (message.lookupInners) {
            obj.lookupInners = message.lookupInners.map((e) => e ? exports2.InnerOp.toJSON(e) : void 0);
          } else {
            obj.lookupInners = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseCompressedBatchProof);
          message.entries = ((_a = object.entries) === null || _a === void 0 ? void 0 : _a.map((e) => exports2.CompressedBatchEntry.fromPartial(e))) || [];
          message.lookupInners = ((_b = object.lookupInners) === null || _b === void 0 ? void 0 : _b.map((e) => exports2.InnerOp.fromPartial(e))) || [];
          return message;
        }
      };
      var baseCompressedBatchEntry = {};
      exports2.CompressedBatchEntry = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.exist !== void 0) {
            exports2.CompressedExistenceProof.encode(message.exist, writer.uint32(10).fork()).ldelim();
          }
          if (message.nonexist !== void 0) {
            exports2.CompressedNonExistenceProof.encode(message.nonexist, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseCompressedBatchEntry);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.exist = exports2.CompressedExistenceProof.decode(reader, reader.uint32());
                break;
              case 2:
                message.nonexist = exports2.CompressedNonExistenceProof.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseCompressedBatchEntry);
          message.exist = object.exist !== void 0 && object.exist !== null ? exports2.CompressedExistenceProof.fromJSON(object.exist) : void 0;
          message.nonexist = object.nonexist !== void 0 && object.nonexist !== null ? exports2.CompressedNonExistenceProof.fromJSON(object.nonexist) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.exist !== void 0 && (obj.exist = message.exist ? exports2.CompressedExistenceProof.toJSON(message.exist) : void 0);
          message.nonexist !== void 0 && (obj.nonexist = message.nonexist ? exports2.CompressedNonExistenceProof.toJSON(message.nonexist) : void 0);
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseCompressedBatchEntry);
          message.exist = object.exist !== void 0 && object.exist !== null ? exports2.CompressedExistenceProof.fromPartial(object.exist) : void 0;
          message.nonexist = object.nonexist !== void 0 && object.nonexist !== null ? exports2.CompressedNonExistenceProof.fromPartial(object.nonexist) : void 0;
          return message;
        }
      };
      var baseCompressedExistenceProof = { path: 0 };
      exports2.CompressedExistenceProof = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
          }
          if (message.value.length !== 0) {
            writer.uint32(18).bytes(message.value);
          }
          if (message.leaf !== void 0) {
            exports2.LeafOp.encode(message.leaf, writer.uint32(26).fork()).ldelim();
          }
          writer.uint32(34).fork();
          for (const v of message.path) {
            writer.int32(v);
          }
          writer.ldelim();
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseCompressedExistenceProof);
          message.path = [];
          message.key = new Uint8Array();
          message.value = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.key = reader.bytes();
                break;
              case 2:
                message.value = reader.bytes();
                break;
              case 3:
                message.leaf = exports2.LeafOp.decode(reader, reader.uint32());
                break;
              case 4:
                if ((tag & 7) === 2) {
                  const end2 = reader.uint32() + reader.pos;
                  while (reader.pos < end2) {
                    message.path.push(reader.int32());
                  }
                } else {
                  message.path.push(reader.int32());
                }
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseCompressedExistenceProof);
          message.key = object.key !== void 0 && object.key !== null ? bytesFromBase64(object.key) : new Uint8Array();
          message.value = object.value !== void 0 && object.value !== null ? bytesFromBase64(object.value) : new Uint8Array();
          message.leaf = object.leaf !== void 0 && object.leaf !== null ? exports2.LeafOp.fromJSON(object.leaf) : void 0;
          message.path = ((_a = object.path) !== null && _a !== void 0 ? _a : []).map((e) => Number(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.key !== void 0 && (obj.key = base64FromBytes(message.key !== void 0 ? message.key : new Uint8Array()));
          message.value !== void 0 && (obj.value = base64FromBytes(message.value !== void 0 ? message.value : new Uint8Array()));
          message.leaf !== void 0 && (obj.leaf = message.leaf ? exports2.LeafOp.toJSON(message.leaf) : void 0);
          if (message.path) {
            obj.path = message.path.map((e) => e);
          } else {
            obj.path = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseCompressedExistenceProof);
          message.key = (_a = object.key) !== null && _a !== void 0 ? _a : new Uint8Array();
          message.value = (_b = object.value) !== null && _b !== void 0 ? _b : new Uint8Array();
          message.leaf = object.leaf !== void 0 && object.leaf !== null ? exports2.LeafOp.fromPartial(object.leaf) : void 0;
          message.path = ((_c = object.path) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
          return message;
        }
      };
      var baseCompressedNonExistenceProof = {};
      exports2.CompressedNonExistenceProof = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
          }
          if (message.left !== void 0) {
            exports2.CompressedExistenceProof.encode(message.left, writer.uint32(18).fork()).ldelim();
          }
          if (message.right !== void 0) {
            exports2.CompressedExistenceProof.encode(message.right, writer.uint32(26).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseCompressedNonExistenceProof);
          message.key = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.key = reader.bytes();
                break;
              case 2:
                message.left = exports2.CompressedExistenceProof.decode(reader, reader.uint32());
                break;
              case 3:
                message.right = exports2.CompressedExistenceProof.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseCompressedNonExistenceProof);
          message.key = object.key !== void 0 && object.key !== null ? bytesFromBase64(object.key) : new Uint8Array();
          message.left = object.left !== void 0 && object.left !== null ? exports2.CompressedExistenceProof.fromJSON(object.left) : void 0;
          message.right = object.right !== void 0 && object.right !== null ? exports2.CompressedExistenceProof.fromJSON(object.right) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.key !== void 0 && (obj.key = base64FromBytes(message.key !== void 0 ? message.key : new Uint8Array()));
          message.left !== void 0 && (obj.left = message.left ? exports2.CompressedExistenceProof.toJSON(message.left) : void 0);
          message.right !== void 0 && (obj.right = message.right ? exports2.CompressedExistenceProof.toJSON(message.right) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseCompressedNonExistenceProof);
          message.key = (_a = object.key) !== null && _a !== void 0 ? _a : new Uint8Array();
          message.left = object.left !== void 0 && object.left !== null ? exports2.CompressedExistenceProof.fromPartial(object.left) : void 0;
          message.right = object.right !== void 0 && object.right !== null ? exports2.CompressedExistenceProof.fromPartial(object.right) : void 0;
          return message;
        }
      };
      var globalThis = (() => {
        if (typeof globalThis !== "undefined")
          return globalThis;
        if (typeof self !== "undefined")
          return self;
        if (typeof window !== "undefined")
          return window;
        if (typeof global !== "undefined")
          return global;
        throw "Unable to locate global object";
      })();
      var atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
      function bytesFromBase64(b64) {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
          arr[i] = bin.charCodeAt(i);
        }
        return arr;
      }
      var btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
      function base64FromBytes(arr) {
        const bin = [];
        for (const byte of arr) {
          bin.push(String.fromCharCode(byte));
        }
        return btoa(bin.join(""));
      }
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/ibc/core/commitment/v1/commitment.js
  var require_commitment = __commonJS({
    "node_modules/cosmjs-types/ibc/core/commitment/v1/commitment.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.MerkleProof = exports2.MerklePath = exports2.MerklePrefix = exports2.MerkleRoot = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var proofs_1 = require_proofs();
      exports2.protobufPackage = "ibc.core.commitment.v1";
      var baseMerkleRoot = {};
      exports2.MerkleRoot = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.hash.length !== 0) {
            writer.uint32(10).bytes(message.hash);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMerkleRoot);
          message.hash = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.hash = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMerkleRoot);
          message.hash = object.hash !== void 0 && object.hash !== null ? bytesFromBase64(object.hash) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.hash !== void 0 && (obj.hash = base64FromBytes(message.hash !== void 0 ? message.hash : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseMerkleRoot);
          message.hash = (_a = object.hash) !== null && _a !== void 0 ? _a : new Uint8Array();
          return message;
        }
      };
      var baseMerklePrefix = {};
      exports2.MerklePrefix = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.keyPrefix.length !== 0) {
            writer.uint32(10).bytes(message.keyPrefix);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMerklePrefix);
          message.keyPrefix = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.keyPrefix = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMerklePrefix);
          message.keyPrefix = object.keyPrefix !== void 0 && object.keyPrefix !== null ? bytesFromBase64(object.keyPrefix) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.keyPrefix !== void 0 && (obj.keyPrefix = base64FromBytes(message.keyPrefix !== void 0 ? message.keyPrefix : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseMerklePrefix);
          message.keyPrefix = (_a = object.keyPrefix) !== null && _a !== void 0 ? _a : new Uint8Array();
          return message;
        }
      };
      var baseMerklePath = { keyPath: "" };
      exports2.MerklePath = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.keyPath) {
            writer.uint32(10).string(v);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMerklePath);
          message.keyPath = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.keyPath.push(reader.string());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseMerklePath);
          message.keyPath = ((_a = object.keyPath) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.keyPath) {
            obj.keyPath = message.keyPath.map((e) => e);
          } else {
            obj.keyPath = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseMerklePath);
          message.keyPath = ((_a = object.keyPath) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
          return message;
        }
      };
      var baseMerkleProof = {};
      exports2.MerkleProof = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.proofs) {
            proofs_1.CommitmentProof.encode(v, writer.uint32(10).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMerkleProof);
          message.proofs = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.proofs.push(proofs_1.CommitmentProof.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseMerkleProof);
          message.proofs = ((_a = object.proofs) !== null && _a !== void 0 ? _a : []).map((e) => proofs_1.CommitmentProof.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.proofs) {
            obj.proofs = message.proofs.map((e) => e ? proofs_1.CommitmentProof.toJSON(e) : void 0);
          } else {
            obj.proofs = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseMerkleProof);
          message.proofs = ((_a = object.proofs) === null || _a === void 0 ? void 0 : _a.map((e) => proofs_1.CommitmentProof.fromPartial(e))) || [];
          return message;
        }
      };
      var globalThis = (() => {
        if (typeof globalThis !== "undefined")
          return globalThis;
        if (typeof self !== "undefined")
          return self;
        if (typeof window !== "undefined")
          return window;
        if (typeof global !== "undefined")
          return global;
        throw "Unable to locate global object";
      })();
      var atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
      function bytesFromBase64(b64) {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
          arr[i] = bin.charCodeAt(i);
        }
        return arr;
      }
      var btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
      function base64FromBytes(arr) {
        const bin = [];
        for (const byte of arr) {
          bin.push(String.fromCharCode(byte));
        }
        return btoa(bin.join(""));
      }
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/ibc/core/connection/v1/connection.js
  var require_connection = __commonJS({
    "node_modules/cosmjs-types/ibc/core/connection/v1/connection.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.Version = exports2.ConnectionPaths = exports2.ClientPaths = exports2.Counterparty = exports2.IdentifiedConnection = exports2.ConnectionEnd = exports2.stateToJSON = exports2.stateFromJSON = exports2.State = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var commitment_1 = require_commitment();
      exports2.protobufPackage = "ibc.core.connection.v1";
      var State;
      (function(State2) {
        State2[State2["STATE_UNINITIALIZED_UNSPECIFIED"] = 0] = "STATE_UNINITIALIZED_UNSPECIFIED";
        State2[State2["STATE_INIT"] = 1] = "STATE_INIT";
        State2[State2["STATE_TRYOPEN"] = 2] = "STATE_TRYOPEN";
        State2[State2["STATE_OPEN"] = 3] = "STATE_OPEN";
        State2[State2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
      })(State = exports2.State || (exports2.State = {}));
      function stateFromJSON(object) {
        switch (object) {
          case 0:
          case "STATE_UNINITIALIZED_UNSPECIFIED":
            return State.STATE_UNINITIALIZED_UNSPECIFIED;
          case 1:
          case "STATE_INIT":
            return State.STATE_INIT;
          case 2:
          case "STATE_TRYOPEN":
            return State.STATE_TRYOPEN;
          case 3:
          case "STATE_OPEN":
            return State.STATE_OPEN;
          case -1:
          case "UNRECOGNIZED":
          default:
            return State.UNRECOGNIZED;
        }
      }
      exports2.stateFromJSON = stateFromJSON;
      function stateToJSON(object) {
        switch (object) {
          case State.STATE_UNINITIALIZED_UNSPECIFIED:
            return "STATE_UNINITIALIZED_UNSPECIFIED";
          case State.STATE_INIT:
            return "STATE_INIT";
          case State.STATE_TRYOPEN:
            return "STATE_TRYOPEN";
          case State.STATE_OPEN:
            return "STATE_OPEN";
          default:
            return "UNKNOWN";
        }
      }
      exports2.stateToJSON = stateToJSON;
      var baseConnectionEnd = { clientId: "", state: 0, delayPeriod: long_1.default.UZERO };
      exports2.ConnectionEnd = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
          }
          for (const v of message.versions) {
            exports2.Version.encode(v, writer.uint32(18).fork()).ldelim();
          }
          if (message.state !== 0) {
            writer.uint32(24).int32(message.state);
          }
          if (message.counterparty !== void 0) {
            exports2.Counterparty.encode(message.counterparty, writer.uint32(34).fork()).ldelim();
          }
          if (!message.delayPeriod.isZero()) {
            writer.uint32(40).uint64(message.delayPeriod);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseConnectionEnd);
          message.versions = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.clientId = reader.string();
                break;
              case 2:
                message.versions.push(exports2.Version.decode(reader, reader.uint32()));
                break;
              case 3:
                message.state = reader.int32();
                break;
              case 4:
                message.counterparty = exports2.Counterparty.decode(reader, reader.uint32());
                break;
              case 5:
                message.delayPeriod = reader.uint64();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseConnectionEnd);
          message.clientId = object.clientId !== void 0 && object.clientId !== null ? String(object.clientId) : "";
          message.versions = ((_a = object.versions) !== null && _a !== void 0 ? _a : []).map((e) => exports2.Version.fromJSON(e));
          message.state = object.state !== void 0 && object.state !== null ? stateFromJSON(object.state) : 0;
          message.counterparty = object.counterparty !== void 0 && object.counterparty !== null ? exports2.Counterparty.fromJSON(object.counterparty) : void 0;
          message.delayPeriod = object.delayPeriod !== void 0 && object.delayPeriod !== null ? long_1.default.fromString(object.delayPeriod) : long_1.default.UZERO;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.clientId !== void 0 && (obj.clientId = message.clientId);
          if (message.versions) {
            obj.versions = message.versions.map((e) => e ? exports2.Version.toJSON(e) : void 0);
          } else {
            obj.versions = [];
          }
          message.state !== void 0 && (obj.state = stateToJSON(message.state));
          message.counterparty !== void 0 && (obj.counterparty = message.counterparty ? exports2.Counterparty.toJSON(message.counterparty) : void 0);
          message.delayPeriod !== void 0 && (obj.delayPeriod = (message.delayPeriod || long_1.default.UZERO).toString());
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseConnectionEnd);
          message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
          message.versions = ((_b = object.versions) === null || _b === void 0 ? void 0 : _b.map((e) => exports2.Version.fromPartial(e))) || [];
          message.state = (_c = object.state) !== null && _c !== void 0 ? _c : 0;
          message.counterparty = object.counterparty !== void 0 && object.counterparty !== null ? exports2.Counterparty.fromPartial(object.counterparty) : void 0;
          message.delayPeriod = object.delayPeriod !== void 0 && object.delayPeriod !== null ? long_1.default.fromValue(object.delayPeriod) : long_1.default.UZERO;
          return message;
        }
      };
      var baseIdentifiedConnection = { id: "", clientId: "", state: 0, delayPeriod: long_1.default.UZERO };
      exports2.IdentifiedConnection = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.id !== "") {
            writer.uint32(10).string(message.id);
          }
          if (message.clientId !== "") {
            writer.uint32(18).string(message.clientId);
          }
          for (const v of message.versions) {
            exports2.Version.encode(v, writer.uint32(26).fork()).ldelim();
          }
          if (message.state !== 0) {
            writer.uint32(32).int32(message.state);
          }
          if (message.counterparty !== void 0) {
            exports2.Counterparty.encode(message.counterparty, writer.uint32(42).fork()).ldelim();
          }
          if (!message.delayPeriod.isZero()) {
            writer.uint32(48).uint64(message.delayPeriod);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseIdentifiedConnection);
          message.versions = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.id = reader.string();
                break;
              case 2:
                message.clientId = reader.string();
                break;
              case 3:
                message.versions.push(exports2.Version.decode(reader, reader.uint32()));
                break;
              case 4:
                message.state = reader.int32();
                break;
              case 5:
                message.counterparty = exports2.Counterparty.decode(reader, reader.uint32());
                break;
              case 6:
                message.delayPeriod = reader.uint64();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseIdentifiedConnection);
          message.id = object.id !== void 0 && object.id !== null ? String(object.id) : "";
          message.clientId = object.clientId !== void 0 && object.clientId !== null ? String(object.clientId) : "";
          message.versions = ((_a = object.versions) !== null && _a !== void 0 ? _a : []).map((e) => exports2.Version.fromJSON(e));
          message.state = object.state !== void 0 && object.state !== null ? stateFromJSON(object.state) : 0;
          message.counterparty = object.counterparty !== void 0 && object.counterparty !== null ? exports2.Counterparty.fromJSON(object.counterparty) : void 0;
          message.delayPeriod = object.delayPeriod !== void 0 && object.delayPeriod !== null ? long_1.default.fromString(object.delayPeriod) : long_1.default.UZERO;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.id !== void 0 && (obj.id = message.id);
          message.clientId !== void 0 && (obj.clientId = message.clientId);
          if (message.versions) {
            obj.versions = message.versions.map((e) => e ? exports2.Version.toJSON(e) : void 0);
          } else {
            obj.versions = [];
          }
          message.state !== void 0 && (obj.state = stateToJSON(message.state));
          message.counterparty !== void 0 && (obj.counterparty = message.counterparty ? exports2.Counterparty.toJSON(message.counterparty) : void 0);
          message.delayPeriod !== void 0 && (obj.delayPeriod = (message.delayPeriod || long_1.default.UZERO).toString());
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d;
          const message = Object.assign({}, baseIdentifiedConnection);
          message.id = (_a = object.id) !== null && _a !== void 0 ? _a : "";
          message.clientId = (_b = object.clientId) !== null && _b !== void 0 ? _b : "";
          message.versions = ((_c = object.versions) === null || _c === void 0 ? void 0 : _c.map((e) => exports2.Version.fromPartial(e))) || [];
          message.state = (_d = object.state) !== null && _d !== void 0 ? _d : 0;
          message.counterparty = object.counterparty !== void 0 && object.counterparty !== null ? exports2.Counterparty.fromPartial(object.counterparty) : void 0;
          message.delayPeriod = object.delayPeriod !== void 0 && object.delayPeriod !== null ? long_1.default.fromValue(object.delayPeriod) : long_1.default.UZERO;
          return message;
        }
      };
      var baseCounterparty = { clientId: "", connectionId: "" };
      exports2.Counterparty = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
          }
          if (message.connectionId !== "") {
            writer.uint32(18).string(message.connectionId);
          }
          if (message.prefix !== void 0) {
            commitment_1.MerklePrefix.encode(message.prefix, writer.uint32(26).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseCounterparty);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.clientId = reader.string();
                break;
              case 2:
                message.connectionId = reader.string();
                break;
              case 3:
                message.prefix = commitment_1.MerklePrefix.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseCounterparty);
          message.clientId = object.clientId !== void 0 && object.clientId !== null ? String(object.clientId) : "";
          message.connectionId = object.connectionId !== void 0 && object.connectionId !== null ? String(object.connectionId) : "";
          message.prefix = object.prefix !== void 0 && object.prefix !== null ? commitment_1.MerklePrefix.fromJSON(object.prefix) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.clientId !== void 0 && (obj.clientId = message.clientId);
          message.connectionId !== void 0 && (obj.connectionId = message.connectionId);
          message.prefix !== void 0 && (obj.prefix = message.prefix ? commitment_1.MerklePrefix.toJSON(message.prefix) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseCounterparty);
          message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
          message.connectionId = (_b = object.connectionId) !== null && _b !== void 0 ? _b : "";
          message.prefix = object.prefix !== void 0 && object.prefix !== null ? commitment_1.MerklePrefix.fromPartial(object.prefix) : void 0;
          return message;
        }
      };
      var baseClientPaths = { paths: "" };
      exports2.ClientPaths = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.paths) {
            writer.uint32(10).string(v);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseClientPaths);
          message.paths = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.paths.push(reader.string());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseClientPaths);
          message.paths = ((_a = object.paths) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.paths) {
            obj.paths = message.paths.map((e) => e);
          } else {
            obj.paths = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseClientPaths);
          message.paths = ((_a = object.paths) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
          return message;
        }
      };
      var baseConnectionPaths = { clientId: "", paths: "" };
      exports2.ConnectionPaths = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
          }
          for (const v of message.paths) {
            writer.uint32(18).string(v);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseConnectionPaths);
          message.paths = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.clientId = reader.string();
                break;
              case 2:
                message.paths.push(reader.string());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseConnectionPaths);
          message.clientId = object.clientId !== void 0 && object.clientId !== null ? String(object.clientId) : "";
          message.paths = ((_a = object.paths) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.clientId !== void 0 && (obj.clientId = message.clientId);
          if (message.paths) {
            obj.paths = message.paths.map((e) => e);
          } else {
            obj.paths = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseConnectionPaths);
          message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
          message.paths = ((_b = object.paths) === null || _b === void 0 ? void 0 : _b.map((e) => e)) || [];
          return message;
        }
      };
      var baseVersion = { identifier: "", features: "" };
      exports2.Version = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.identifier !== "") {
            writer.uint32(10).string(message.identifier);
          }
          for (const v of message.features) {
            writer.uint32(18).string(v);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseVersion);
          message.features = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.identifier = reader.string();
                break;
              case 2:
                message.features.push(reader.string());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseVersion);
          message.identifier = object.identifier !== void 0 && object.identifier !== null ? String(object.identifier) : "";
          message.features = ((_a = object.features) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.identifier !== void 0 && (obj.identifier = message.identifier);
          if (message.features) {
            obj.features = message.features.map((e) => e);
          } else {
            obj.features = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseVersion);
          message.identifier = (_a = object.identifier) !== null && _a !== void 0 ? _a : "";
          message.features = ((_b = object.features) === null || _b === void 0 ? void 0 : _b.map((e) => e)) || [];
          return message;
        }
      };
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/ibc/core/connection/v1/tx.js
  var require_tx7 = __commonJS({
    "node_modules/cosmjs-types/ibc/core/connection/v1/tx.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.MsgClientImpl = exports2.MsgConnectionOpenConfirmResponse = exports2.MsgConnectionOpenConfirm = exports2.MsgConnectionOpenAckResponse = exports2.MsgConnectionOpenAck = exports2.MsgConnectionOpenTryResponse = exports2.MsgConnectionOpenTry = exports2.MsgConnectionOpenInitResponse = exports2.MsgConnectionOpenInit = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var connection_1 = require_connection();
      var any_1 = require_any();
      var client_1 = require_client();
      exports2.protobufPackage = "ibc.core.connection.v1";
      var baseMsgConnectionOpenInit = { clientId: "", delayPeriod: long_1.default.UZERO, signer: "" };
      exports2.MsgConnectionOpenInit = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
          }
          if (message.counterparty !== void 0) {
            connection_1.Counterparty.encode(message.counterparty, writer.uint32(18).fork()).ldelim();
          }
          if (message.version !== void 0) {
            connection_1.Version.encode(message.version, writer.uint32(26).fork()).ldelim();
          }
          if (!message.delayPeriod.isZero()) {
            writer.uint32(32).uint64(message.delayPeriod);
          }
          if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgConnectionOpenInit);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.clientId = reader.string();
                break;
              case 2:
                message.counterparty = connection_1.Counterparty.decode(reader, reader.uint32());
                break;
              case 3:
                message.version = connection_1.Version.decode(reader, reader.uint32());
                break;
              case 4:
                message.delayPeriod = reader.uint64();
                break;
              case 5:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgConnectionOpenInit);
          message.clientId = object.clientId !== void 0 && object.clientId !== null ? String(object.clientId) : "";
          message.counterparty = object.counterparty !== void 0 && object.counterparty !== null ? connection_1.Counterparty.fromJSON(object.counterparty) : void 0;
          message.version = object.version !== void 0 && object.version !== null ? connection_1.Version.fromJSON(object.version) : void 0;
          message.delayPeriod = object.delayPeriod !== void 0 && object.delayPeriod !== null ? long_1.default.fromString(object.delayPeriod) : long_1.default.UZERO;
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.clientId !== void 0 && (obj.clientId = message.clientId);
          message.counterparty !== void 0 && (obj.counterparty = message.counterparty ? connection_1.Counterparty.toJSON(message.counterparty) : void 0);
          message.version !== void 0 && (obj.version = message.version ? connection_1.Version.toJSON(message.version) : void 0);
          message.delayPeriod !== void 0 && (obj.delayPeriod = (message.delayPeriod || long_1.default.UZERO).toString());
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgConnectionOpenInit);
          message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
          message.counterparty = object.counterparty !== void 0 && object.counterparty !== null ? connection_1.Counterparty.fromPartial(object.counterparty) : void 0;
          message.version = object.version !== void 0 && object.version !== null ? connection_1.Version.fromPartial(object.version) : void 0;
          message.delayPeriod = object.delayPeriod !== void 0 && object.delayPeriod !== null ? long_1.default.fromValue(object.delayPeriod) : long_1.default.UZERO;
          message.signer = (_b = object.signer) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseMsgConnectionOpenInitResponse = {};
      exports2.MsgConnectionOpenInitResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgConnectionOpenInitResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgConnectionOpenInitResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgConnectionOpenInitResponse);
          return message;
        }
      };
      var baseMsgConnectionOpenTry = {
        clientId: "",
        previousConnectionId: "",
        delayPeriod: long_1.default.UZERO,
        signer: ""
      };
      exports2.MsgConnectionOpenTry = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
          }
          if (message.previousConnectionId !== "") {
            writer.uint32(18).string(message.previousConnectionId);
          }
          if (message.clientState !== void 0) {
            any_1.Any.encode(message.clientState, writer.uint32(26).fork()).ldelim();
          }
          if (message.counterparty !== void 0) {
            connection_1.Counterparty.encode(message.counterparty, writer.uint32(34).fork()).ldelim();
          }
          if (!message.delayPeriod.isZero()) {
            writer.uint32(40).uint64(message.delayPeriod);
          }
          for (const v of message.counterpartyVersions) {
            connection_1.Version.encode(v, writer.uint32(50).fork()).ldelim();
          }
          if (message.proofHeight !== void 0) {
            client_1.Height.encode(message.proofHeight, writer.uint32(58).fork()).ldelim();
          }
          if (message.proofInit.length !== 0) {
            writer.uint32(66).bytes(message.proofInit);
          }
          if (message.proofClient.length !== 0) {
            writer.uint32(74).bytes(message.proofClient);
          }
          if (message.proofConsensus.length !== 0) {
            writer.uint32(82).bytes(message.proofConsensus);
          }
          if (message.consensusHeight !== void 0) {
            client_1.Height.encode(message.consensusHeight, writer.uint32(90).fork()).ldelim();
          }
          if (message.signer !== "") {
            writer.uint32(98).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgConnectionOpenTry);
          message.counterpartyVersions = [];
          message.proofInit = new Uint8Array();
          message.proofClient = new Uint8Array();
          message.proofConsensus = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.clientId = reader.string();
                break;
              case 2:
                message.previousConnectionId = reader.string();
                break;
              case 3:
                message.clientState = any_1.Any.decode(reader, reader.uint32());
                break;
              case 4:
                message.counterparty = connection_1.Counterparty.decode(reader, reader.uint32());
                break;
              case 5:
                message.delayPeriod = reader.uint64();
                break;
              case 6:
                message.counterpartyVersions.push(connection_1.Version.decode(reader, reader.uint32()));
                break;
              case 7:
                message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                break;
              case 8:
                message.proofInit = reader.bytes();
                break;
              case 9:
                message.proofClient = reader.bytes();
                break;
              case 10:
                message.proofConsensus = reader.bytes();
                break;
              case 11:
                message.consensusHeight = client_1.Height.decode(reader, reader.uint32());
                break;
              case 12:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseMsgConnectionOpenTry);
          message.clientId = object.clientId !== void 0 && object.clientId !== null ? String(object.clientId) : "";
          message.previousConnectionId = object.previousConnectionId !== void 0 && object.previousConnectionId !== null ? String(object.previousConnectionId) : "";
          message.clientState = object.clientState !== void 0 && object.clientState !== null ? any_1.Any.fromJSON(object.clientState) : void 0;
          message.counterparty = object.counterparty !== void 0 && object.counterparty !== null ? connection_1.Counterparty.fromJSON(object.counterparty) : void 0;
          message.delayPeriod = object.delayPeriod !== void 0 && object.delayPeriod !== null ? long_1.default.fromString(object.delayPeriod) : long_1.default.UZERO;
          message.counterpartyVersions = ((_a = object.counterpartyVersions) !== null && _a !== void 0 ? _a : []).map((e) => connection_1.Version.fromJSON(e));
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromJSON(object.proofHeight) : void 0;
          message.proofInit = object.proofInit !== void 0 && object.proofInit !== null ? bytesFromBase64(object.proofInit) : new Uint8Array();
          message.proofClient = object.proofClient !== void 0 && object.proofClient !== null ? bytesFromBase64(object.proofClient) : new Uint8Array();
          message.proofConsensus = object.proofConsensus !== void 0 && object.proofConsensus !== null ? bytesFromBase64(object.proofConsensus) : new Uint8Array();
          message.consensusHeight = object.consensusHeight !== void 0 && object.consensusHeight !== null ? client_1.Height.fromJSON(object.consensusHeight) : void 0;
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.clientId !== void 0 && (obj.clientId = message.clientId);
          message.previousConnectionId !== void 0 && (obj.previousConnectionId = message.previousConnectionId);
          message.clientState !== void 0 && (obj.clientState = message.clientState ? any_1.Any.toJSON(message.clientState) : void 0);
          message.counterparty !== void 0 && (obj.counterparty = message.counterparty ? connection_1.Counterparty.toJSON(message.counterparty) : void 0);
          message.delayPeriod !== void 0 && (obj.delayPeriod = (message.delayPeriod || long_1.default.UZERO).toString());
          if (message.counterpartyVersions) {
            obj.counterpartyVersions = message.counterpartyVersions.map((e) => e ? connection_1.Version.toJSON(e) : void 0);
          } else {
            obj.counterpartyVersions = [];
          }
          message.proofHeight !== void 0 && (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : void 0);
          message.proofInit !== void 0 && (obj.proofInit = base64FromBytes(message.proofInit !== void 0 ? message.proofInit : new Uint8Array()));
          message.proofClient !== void 0 && (obj.proofClient = base64FromBytes(message.proofClient !== void 0 ? message.proofClient : new Uint8Array()));
          message.proofConsensus !== void 0 && (obj.proofConsensus = base64FromBytes(message.proofConsensus !== void 0 ? message.proofConsensus : new Uint8Array()));
          message.consensusHeight !== void 0 && (obj.consensusHeight = message.consensusHeight ? client_1.Height.toJSON(message.consensusHeight) : void 0);
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d, _e, _f, _g;
          const message = Object.assign({}, baseMsgConnectionOpenTry);
          message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
          message.previousConnectionId = (_b = object.previousConnectionId) !== null && _b !== void 0 ? _b : "";
          message.clientState = object.clientState !== void 0 && object.clientState !== null ? any_1.Any.fromPartial(object.clientState) : void 0;
          message.counterparty = object.counterparty !== void 0 && object.counterparty !== null ? connection_1.Counterparty.fromPartial(object.counterparty) : void 0;
          message.delayPeriod = object.delayPeriod !== void 0 && object.delayPeriod !== null ? long_1.default.fromValue(object.delayPeriod) : long_1.default.UZERO;
          message.counterpartyVersions = ((_c = object.counterpartyVersions) === null || _c === void 0 ? void 0 : _c.map((e) => connection_1.Version.fromPartial(e))) || [];
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromPartial(object.proofHeight) : void 0;
          message.proofInit = (_d = object.proofInit) !== null && _d !== void 0 ? _d : new Uint8Array();
          message.proofClient = (_e = object.proofClient) !== null && _e !== void 0 ? _e : new Uint8Array();
          message.proofConsensus = (_f = object.proofConsensus) !== null && _f !== void 0 ? _f : new Uint8Array();
          message.consensusHeight = object.consensusHeight !== void 0 && object.consensusHeight !== null ? client_1.Height.fromPartial(object.consensusHeight) : void 0;
          message.signer = (_g = object.signer) !== null && _g !== void 0 ? _g : "";
          return message;
        }
      };
      var baseMsgConnectionOpenTryResponse = {};
      exports2.MsgConnectionOpenTryResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgConnectionOpenTryResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgConnectionOpenTryResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgConnectionOpenTryResponse);
          return message;
        }
      };
      var baseMsgConnectionOpenAck = { connectionId: "", counterpartyConnectionId: "", signer: "" };
      exports2.MsgConnectionOpenAck = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.connectionId !== "") {
            writer.uint32(10).string(message.connectionId);
          }
          if (message.counterpartyConnectionId !== "") {
            writer.uint32(18).string(message.counterpartyConnectionId);
          }
          if (message.version !== void 0) {
            connection_1.Version.encode(message.version, writer.uint32(26).fork()).ldelim();
          }
          if (message.clientState !== void 0) {
            any_1.Any.encode(message.clientState, writer.uint32(34).fork()).ldelim();
          }
          if (message.proofHeight !== void 0) {
            client_1.Height.encode(message.proofHeight, writer.uint32(42).fork()).ldelim();
          }
          if (message.proofTry.length !== 0) {
            writer.uint32(50).bytes(message.proofTry);
          }
          if (message.proofClient.length !== 0) {
            writer.uint32(58).bytes(message.proofClient);
          }
          if (message.proofConsensus.length !== 0) {
            writer.uint32(66).bytes(message.proofConsensus);
          }
          if (message.consensusHeight !== void 0) {
            client_1.Height.encode(message.consensusHeight, writer.uint32(74).fork()).ldelim();
          }
          if (message.signer !== "") {
            writer.uint32(82).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgConnectionOpenAck);
          message.proofTry = new Uint8Array();
          message.proofClient = new Uint8Array();
          message.proofConsensus = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.connectionId = reader.string();
                break;
              case 2:
                message.counterpartyConnectionId = reader.string();
                break;
              case 3:
                message.version = connection_1.Version.decode(reader, reader.uint32());
                break;
              case 4:
                message.clientState = any_1.Any.decode(reader, reader.uint32());
                break;
              case 5:
                message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                break;
              case 6:
                message.proofTry = reader.bytes();
                break;
              case 7:
                message.proofClient = reader.bytes();
                break;
              case 8:
                message.proofConsensus = reader.bytes();
                break;
              case 9:
                message.consensusHeight = client_1.Height.decode(reader, reader.uint32());
                break;
              case 10:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgConnectionOpenAck);
          message.connectionId = object.connectionId !== void 0 && object.connectionId !== null ? String(object.connectionId) : "";
          message.counterpartyConnectionId = object.counterpartyConnectionId !== void 0 && object.counterpartyConnectionId !== null ? String(object.counterpartyConnectionId) : "";
          message.version = object.version !== void 0 && object.version !== null ? connection_1.Version.fromJSON(object.version) : void 0;
          message.clientState = object.clientState !== void 0 && object.clientState !== null ? any_1.Any.fromJSON(object.clientState) : void 0;
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromJSON(object.proofHeight) : void 0;
          message.proofTry = object.proofTry !== void 0 && object.proofTry !== null ? bytesFromBase64(object.proofTry) : new Uint8Array();
          message.proofClient = object.proofClient !== void 0 && object.proofClient !== null ? bytesFromBase64(object.proofClient) : new Uint8Array();
          message.proofConsensus = object.proofConsensus !== void 0 && object.proofConsensus !== null ? bytesFromBase64(object.proofConsensus) : new Uint8Array();
          message.consensusHeight = object.consensusHeight !== void 0 && object.consensusHeight !== null ? client_1.Height.fromJSON(object.consensusHeight) : void 0;
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.connectionId !== void 0 && (obj.connectionId = message.connectionId);
          message.counterpartyConnectionId !== void 0 && (obj.counterpartyConnectionId = message.counterpartyConnectionId);
          message.version !== void 0 && (obj.version = message.version ? connection_1.Version.toJSON(message.version) : void 0);
          message.clientState !== void 0 && (obj.clientState = message.clientState ? any_1.Any.toJSON(message.clientState) : void 0);
          message.proofHeight !== void 0 && (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : void 0);
          message.proofTry !== void 0 && (obj.proofTry = base64FromBytes(message.proofTry !== void 0 ? message.proofTry : new Uint8Array()));
          message.proofClient !== void 0 && (obj.proofClient = base64FromBytes(message.proofClient !== void 0 ? message.proofClient : new Uint8Array()));
          message.proofConsensus !== void 0 && (obj.proofConsensus = base64FromBytes(message.proofConsensus !== void 0 ? message.proofConsensus : new Uint8Array()));
          message.consensusHeight !== void 0 && (obj.consensusHeight = message.consensusHeight ? client_1.Height.toJSON(message.consensusHeight) : void 0);
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d, _e, _f;
          const message = Object.assign({}, baseMsgConnectionOpenAck);
          message.connectionId = (_a = object.connectionId) !== null && _a !== void 0 ? _a : "";
          message.counterpartyConnectionId = (_b = object.counterpartyConnectionId) !== null && _b !== void 0 ? _b : "";
          message.version = object.version !== void 0 && object.version !== null ? connection_1.Version.fromPartial(object.version) : void 0;
          message.clientState = object.clientState !== void 0 && object.clientState !== null ? any_1.Any.fromPartial(object.clientState) : void 0;
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromPartial(object.proofHeight) : void 0;
          message.proofTry = (_c = object.proofTry) !== null && _c !== void 0 ? _c : new Uint8Array();
          message.proofClient = (_d = object.proofClient) !== null && _d !== void 0 ? _d : new Uint8Array();
          message.proofConsensus = (_e = object.proofConsensus) !== null && _e !== void 0 ? _e : new Uint8Array();
          message.consensusHeight = object.consensusHeight !== void 0 && object.consensusHeight !== null ? client_1.Height.fromPartial(object.consensusHeight) : void 0;
          message.signer = (_f = object.signer) !== null && _f !== void 0 ? _f : "";
          return message;
        }
      };
      var baseMsgConnectionOpenAckResponse = {};
      exports2.MsgConnectionOpenAckResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgConnectionOpenAckResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgConnectionOpenAckResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgConnectionOpenAckResponse);
          return message;
        }
      };
      var baseMsgConnectionOpenConfirm = { connectionId: "", signer: "" };
      exports2.MsgConnectionOpenConfirm = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.connectionId !== "") {
            writer.uint32(10).string(message.connectionId);
          }
          if (message.proofAck.length !== 0) {
            writer.uint32(18).bytes(message.proofAck);
          }
          if (message.proofHeight !== void 0) {
            client_1.Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
          }
          if (message.signer !== "") {
            writer.uint32(34).string(message.signer);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgConnectionOpenConfirm);
          message.proofAck = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.connectionId = reader.string();
                break;
              case 2:
                message.proofAck = reader.bytes();
                break;
              case 3:
                message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                break;
              case 4:
                message.signer = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgConnectionOpenConfirm);
          message.connectionId = object.connectionId !== void 0 && object.connectionId !== null ? String(object.connectionId) : "";
          message.proofAck = object.proofAck !== void 0 && object.proofAck !== null ? bytesFromBase64(object.proofAck) : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromJSON(object.proofHeight) : void 0;
          message.signer = object.signer !== void 0 && object.signer !== null ? String(object.signer) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.connectionId !== void 0 && (obj.connectionId = message.connectionId);
          message.proofAck !== void 0 && (obj.proofAck = base64FromBytes(message.proofAck !== void 0 ? message.proofAck : new Uint8Array()));
          message.proofHeight !== void 0 && (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : void 0);
          message.signer !== void 0 && (obj.signer = message.signer);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseMsgConnectionOpenConfirm);
          message.connectionId = (_a = object.connectionId) !== null && _a !== void 0 ? _a : "";
          message.proofAck = (_b = object.proofAck) !== null && _b !== void 0 ? _b : new Uint8Array();
          message.proofHeight = object.proofHeight !== void 0 && object.proofHeight !== null ? client_1.Height.fromPartial(object.proofHeight) : void 0;
          message.signer = (_c = object.signer) !== null && _c !== void 0 ? _c : "";
          return message;
        }
      };
      var baseMsgConnectionOpenConfirmResponse = {};
      exports2.MsgConnectionOpenConfirmResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgConnectionOpenConfirmResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgConnectionOpenConfirmResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgConnectionOpenConfirmResponse);
          return message;
        }
      };
      var MsgClientImpl = class {
        constructor(rpc) {
          this.rpc = rpc;
          this.ConnectionOpenInit = this.ConnectionOpenInit.bind(this);
          this.ConnectionOpenTry = this.ConnectionOpenTry.bind(this);
          this.ConnectionOpenAck = this.ConnectionOpenAck.bind(this);
          this.ConnectionOpenConfirm = this.ConnectionOpenConfirm.bind(this);
        }
        ConnectionOpenInit(request) {
          const data = exports2.MsgConnectionOpenInit.encode(request).finish();
          const promise = this.rpc.request("ibc.core.connection.v1.Msg", "ConnectionOpenInit", data);
          return promise.then((data2) => exports2.MsgConnectionOpenInitResponse.decode(new minimal_1.default.Reader(data2)));
        }
        ConnectionOpenTry(request) {
          const data = exports2.MsgConnectionOpenTry.encode(request).finish();
          const promise = this.rpc.request("ibc.core.connection.v1.Msg", "ConnectionOpenTry", data);
          return promise.then((data2) => exports2.MsgConnectionOpenTryResponse.decode(new minimal_1.default.Reader(data2)));
        }
        ConnectionOpenAck(request) {
          const data = exports2.MsgConnectionOpenAck.encode(request).finish();
          const promise = this.rpc.request("ibc.core.connection.v1.Msg", "ConnectionOpenAck", data);
          return promise.then((data2) => exports2.MsgConnectionOpenAckResponse.decode(new minimal_1.default.Reader(data2)));
        }
        ConnectionOpenConfirm(request) {
          const data = exports2.MsgConnectionOpenConfirm.encode(request).finish();
          const promise = this.rpc.request("ibc.core.connection.v1.Msg", "ConnectionOpenConfirm", data);
          return promise.then((data2) => exports2.MsgConnectionOpenConfirmResponse.decode(new minimal_1.default.Reader(data2)));
        }
      };
      exports2.MsgClientImpl = MsgClientImpl;
      var globalThis = (() => {
        if (typeof globalThis !== "undefined")
          return globalThis;
        if (typeof self !== "undefined")
          return self;
        if (typeof window !== "undefined")
          return window;
        if (typeof global !== "undefined")
          return global;
        throw "Unable to locate global object";
      })();
      var atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
      function bytesFromBase64(b64) {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
          arr[i] = bin.charCodeAt(i);
        }
        return arr;
      }
      var btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
      function base64FromBytes(arr) {
        const bin = [];
        for (const byte of arr) {
          bin.push(String.fromCharCode(byte));
        }
        return btoa(bin.join(""));
      }
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/tendermint/crypto/proof.js
  var require_proof = __commonJS({
    "node_modules/cosmjs-types/tendermint/crypto/proof.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.ProofOps = exports2.ProofOp = exports2.DominoOp = exports2.ValueOp = exports2.Proof = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      exports2.protobufPackage = "tendermint.crypto";
      var baseProof = { total: long_1.default.ZERO, index: long_1.default.ZERO };
      exports2.Proof = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.total.isZero()) {
            writer.uint32(8).int64(message.total);
          }
          if (!message.index.isZero()) {
            writer.uint32(16).int64(message.index);
          }
          if (message.leafHash.length !== 0) {
            writer.uint32(26).bytes(message.leafHash);
          }
          for (const v of message.aunts) {
            writer.uint32(34).bytes(v);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseProof);
          message.aunts = [];
          message.leafHash = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.total = reader.int64();
                break;
              case 2:
                message.index = reader.int64();
                break;
              case 3:
                message.leafHash = reader.bytes();
                break;
              case 4:
                message.aunts.push(reader.bytes());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseProof);
          message.total = object.total !== void 0 && object.total !== null ? long_1.default.fromString(object.total) : long_1.default.ZERO;
          message.index = object.index !== void 0 && object.index !== null ? long_1.default.fromString(object.index) : long_1.default.ZERO;
          message.leafHash = object.leafHash !== void 0 && object.leafHash !== null ? bytesFromBase64(object.leafHash) : new Uint8Array();
          message.aunts = ((_a = object.aunts) !== null && _a !== void 0 ? _a : []).map((e) => bytesFromBase64(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.total !== void 0 && (obj.total = (message.total || long_1.default.ZERO).toString());
          message.index !== void 0 && (obj.index = (message.index || long_1.default.ZERO).toString());
          message.leafHash !== void 0 && (obj.leafHash = base64FromBytes(message.leafHash !== void 0 ? message.leafHash : new Uint8Array()));
          if (message.aunts) {
            obj.aunts = message.aunts.map((e) => base64FromBytes(e !== void 0 ? e : new Uint8Array()));
          } else {
            obj.aunts = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseProof);
          message.total = object.total !== void 0 && object.total !== null ? long_1.default.fromValue(object.total) : long_1.default.ZERO;
          message.index = object.index !== void 0 && object.index !== null ? long_1.default.fromValue(object.index) : long_1.default.ZERO;
          message.leafHash = (_a = object.leafHash) !== null && _a !== void 0 ? _a : new Uint8Array();
          message.aunts = ((_b = object.aunts) === null || _b === void 0 ? void 0 : _b.map((e) => e)) || [];
          return message;
        }
      };
      var baseValueOp = {};
      exports2.ValueOp = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
          }
          if (message.proof !== void 0) {
            exports2.Proof.encode(message.proof, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseValueOp);
          message.key = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.key = reader.bytes();
                break;
              case 2:
                message.proof = exports2.Proof.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseValueOp);
          message.key = object.key !== void 0 && object.key !== null ? bytesFromBase64(object.key) : new Uint8Array();
          message.proof = object.proof !== void 0 && object.proof !== null ? exports2.Proof.fromJSON(object.proof) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.key !== void 0 && (obj.key = base64FromBytes(message.key !== void 0 ? message.key : new Uint8Array()));
          message.proof !== void 0 && (obj.proof = message.proof ? exports2.Proof.toJSON(message.proof) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseValueOp);
          message.key = (_a = object.key) !== null && _a !== void 0 ? _a : new Uint8Array();
          message.proof = object.proof !== void 0 && object.proof !== null ? exports2.Proof.fromPartial(object.proof) : void 0;
          return message;
        }
      };
      var baseDominoOp = { key: "", input: "", output: "" };
      exports2.DominoOp = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.key !== "") {
            writer.uint32(10).string(message.key);
          }
          if (message.input !== "") {
            writer.uint32(18).string(message.input);
          }
          if (message.output !== "") {
            writer.uint32(26).string(message.output);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseDominoOp);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.key = reader.string();
                break;
              case 2:
                message.input = reader.string();
                break;
              case 3:
                message.output = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseDominoOp);
          message.key = object.key !== void 0 && object.key !== null ? String(object.key) : "";
          message.input = object.input !== void 0 && object.input !== null ? String(object.input) : "";
          message.output = object.output !== void 0 && object.output !== null ? String(object.output) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.key !== void 0 && (obj.key = message.key);
          message.input !== void 0 && (obj.input = message.input);
          message.output !== void 0 && (obj.output = message.output);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseDominoOp);
          message.key = (_a = object.key) !== null && _a !== void 0 ? _a : "";
          message.input = (_b = object.input) !== null && _b !== void 0 ? _b : "";
          message.output = (_c = object.output) !== null && _c !== void 0 ? _c : "";
          return message;
        }
      };
      var baseProofOp = { type: "" };
      exports2.ProofOp = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.type !== "") {
            writer.uint32(10).string(message.type);
          }
          if (message.key.length !== 0) {
            writer.uint32(18).bytes(message.key);
          }
          if (message.data.length !== 0) {
            writer.uint32(26).bytes(message.data);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseProofOp);
          message.key = new Uint8Array();
          message.data = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.type = reader.string();
                break;
              case 2:
                message.key = reader.bytes();
                break;
              case 3:
                message.data = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseProofOp);
          message.type = object.type !== void 0 && object.type !== null ? String(object.type) : "";
          message.key = object.key !== void 0 && object.key !== null ? bytesFromBase64(object.key) : new Uint8Array();
          message.data = object.data !== void 0 && object.data !== null ? bytesFromBase64(object.data) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.type !== void 0 && (obj.type = message.type);
          message.key !== void 0 && (obj.key = base64FromBytes(message.key !== void 0 ? message.key : new Uint8Array()));
          message.data !== void 0 && (obj.data = base64FromBytes(message.data !== void 0 ? message.data : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseProofOp);
          message.type = (_a = object.type) !== null && _a !== void 0 ? _a : "";
          message.key = (_b = object.key) !== null && _b !== void 0 ? _b : new Uint8Array();
          message.data = (_c = object.data) !== null && _c !== void 0 ? _c : new Uint8Array();
          return message;
        }
      };
      var baseProofOps = {};
      exports2.ProofOps = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.ops) {
            exports2.ProofOp.encode(v, writer.uint32(10).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseProofOps);
          message.ops = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.ops.push(exports2.ProofOp.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseProofOps);
          message.ops = ((_a = object.ops) !== null && _a !== void 0 ? _a : []).map((e) => exports2.ProofOp.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.ops) {
            obj.ops = message.ops.map((e) => e ? exports2.ProofOp.toJSON(e) : void 0);
          } else {
            obj.ops = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseProofOps);
          message.ops = ((_a = object.ops) === null || _a === void 0 ? void 0 : _a.map((e) => exports2.ProofOp.fromPartial(e))) || [];
          return message;
        }
      };
      var globalThis = (() => {
        if (typeof globalThis !== "undefined")
          return globalThis;
        if (typeof self !== "undefined")
          return self;
        if (typeof window !== "undefined")
          return window;
        if (typeof global !== "undefined")
          return global;
        throw "Unable to locate global object";
      })();
      var atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
      function bytesFromBase64(b64) {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
          arr[i] = bin.charCodeAt(i);
        }
        return arr;
      }
      var btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
      function base64FromBytes(arr) {
        const bin = [];
        for (const byte of arr) {
          bin.push(String.fromCharCode(byte));
        }
        return btoa(bin.join(""));
      }
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/tendermint/version/types.js
  var require_types = __commonJS({
    "node_modules/cosmjs-types/tendermint/version/types.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.Consensus = exports2.App = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      exports2.protobufPackage = "tendermint.version";
      var baseApp = { protocol: long_1.default.UZERO, software: "" };
      exports2.App = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.protocol.isZero()) {
            writer.uint32(8).uint64(message.protocol);
          }
          if (message.software !== "") {
            writer.uint32(18).string(message.software);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseApp);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.protocol = reader.uint64();
                break;
              case 2:
                message.software = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseApp);
          message.protocol = object.protocol !== void 0 && object.protocol !== null ? long_1.default.fromString(object.protocol) : long_1.default.UZERO;
          message.software = object.software !== void 0 && object.software !== null ? String(object.software) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.protocol !== void 0 && (obj.protocol = (message.protocol || long_1.default.UZERO).toString());
          message.software !== void 0 && (obj.software = message.software);
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseApp);
          message.protocol = object.protocol !== void 0 && object.protocol !== null ? long_1.default.fromValue(object.protocol) : long_1.default.UZERO;
          message.software = (_a = object.software) !== null && _a !== void 0 ? _a : "";
          return message;
        }
      };
      var baseConsensus = { block: long_1.default.UZERO, app: long_1.default.UZERO };
      exports2.Consensus = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.block.isZero()) {
            writer.uint32(8).uint64(message.block);
          }
          if (!message.app.isZero()) {
            writer.uint32(16).uint64(message.app);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseConsensus);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.block = reader.uint64();
                break;
              case 2:
                message.app = reader.uint64();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseConsensus);
          message.block = object.block !== void 0 && object.block !== null ? long_1.default.fromString(object.block) : long_1.default.UZERO;
          message.app = object.app !== void 0 && object.app !== null ? long_1.default.fromString(object.app) : long_1.default.UZERO;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.block !== void 0 && (obj.block = (message.block || long_1.default.UZERO).toString());
          message.app !== void 0 && (obj.app = (message.app || long_1.default.UZERO).toString());
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseConsensus);
          message.block = object.block !== void 0 && object.block !== null ? long_1.default.fromValue(object.block) : long_1.default.UZERO;
          message.app = object.app !== void 0 && object.app !== null ? long_1.default.fromValue(object.app) : long_1.default.UZERO;
          return message;
        }
      };
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/tendermint/crypto/keys.js
  var require_keys = __commonJS({
    "node_modules/cosmjs-types/tendermint/crypto/keys.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.PublicKey = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      exports2.protobufPackage = "tendermint.crypto";
      var basePublicKey = {};
      exports2.PublicKey = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.ed25519 !== void 0) {
            writer.uint32(10).bytes(message.ed25519);
          }
          if (message.secp256k1 !== void 0) {
            writer.uint32(18).bytes(message.secp256k1);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, basePublicKey);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.ed25519 = reader.bytes();
                break;
              case 2:
                message.secp256k1 = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, basePublicKey);
          message.ed25519 = object.ed25519 !== void 0 && object.ed25519 !== null ? bytesFromBase64(object.ed25519) : void 0;
          message.secp256k1 = object.secp256k1 !== void 0 && object.secp256k1 !== null ? bytesFromBase64(object.secp256k1) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.ed25519 !== void 0 && (obj.ed25519 = message.ed25519 !== void 0 ? base64FromBytes(message.ed25519) : void 0);
          message.secp256k1 !== void 0 && (obj.secp256k1 = message.secp256k1 !== void 0 ? base64FromBytes(message.secp256k1) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, basePublicKey);
          message.ed25519 = (_a = object.ed25519) !== null && _a !== void 0 ? _a : void 0;
          message.secp256k1 = (_b = object.secp256k1) !== null && _b !== void 0 ? _b : void 0;
          return message;
        }
      };
      var globalThis = (() => {
        if (typeof globalThis !== "undefined")
          return globalThis;
        if (typeof self !== "undefined")
          return self;
        if (typeof window !== "undefined")
          return window;
        if (typeof global !== "undefined")
          return global;
        throw "Unable to locate global object";
      })();
      var atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
      function bytesFromBase64(b64) {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
          arr[i] = bin.charCodeAt(i);
        }
        return arr;
      }
      var btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
      function base64FromBytes(arr) {
        const bin = [];
        for (const byte of arr) {
          bin.push(String.fromCharCode(byte));
        }
        return btoa(bin.join(""));
      }
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/tendermint/types/validator.js
  var require_validator = __commonJS({
    "node_modules/cosmjs-types/tendermint/types/validator.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.SimpleValidator = exports2.Validator = exports2.ValidatorSet = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var keys_1 = require_keys();
      exports2.protobufPackage = "tendermint.types";
      var baseValidatorSet = { totalVotingPower: long_1.default.ZERO };
      exports2.ValidatorSet = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.validators) {
            exports2.Validator.encode(v, writer.uint32(10).fork()).ldelim();
          }
          if (message.proposer !== void 0) {
            exports2.Validator.encode(message.proposer, writer.uint32(18).fork()).ldelim();
          }
          if (!message.totalVotingPower.isZero()) {
            writer.uint32(24).int64(message.totalVotingPower);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseValidatorSet);
          message.validators = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.validators.push(exports2.Validator.decode(reader, reader.uint32()));
                break;
              case 2:
                message.proposer = exports2.Validator.decode(reader, reader.uint32());
                break;
              case 3:
                message.totalVotingPower = reader.int64();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseValidatorSet);
          message.validators = ((_a = object.validators) !== null && _a !== void 0 ? _a : []).map((e) => exports2.Validator.fromJSON(e));
          message.proposer = object.proposer !== void 0 && object.proposer !== null ? exports2.Validator.fromJSON(object.proposer) : void 0;
          message.totalVotingPower = object.totalVotingPower !== void 0 && object.totalVotingPower !== null ? long_1.default.fromString(object.totalVotingPower) : long_1.default.ZERO;
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.validators) {
            obj.validators = message.validators.map((e) => e ? exports2.Validator.toJSON(e) : void 0);
          } else {
            obj.validators = [];
          }
          message.proposer !== void 0 && (obj.proposer = message.proposer ? exports2.Validator.toJSON(message.proposer) : void 0);
          message.totalVotingPower !== void 0 && (obj.totalVotingPower = (message.totalVotingPower || long_1.default.ZERO).toString());
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseValidatorSet);
          message.validators = ((_a = object.validators) === null || _a === void 0 ? void 0 : _a.map((e) => exports2.Validator.fromPartial(e))) || [];
          message.proposer = object.proposer !== void 0 && object.proposer !== null ? exports2.Validator.fromPartial(object.proposer) : void 0;
          message.totalVotingPower = object.totalVotingPower !== void 0 && object.totalVotingPower !== null ? long_1.default.fromValue(object.totalVotingPower) : long_1.default.ZERO;
          return message;
        }
      };
      var baseValidator = { votingPower: long_1.default.ZERO, proposerPriority: long_1.default.ZERO };
      exports2.Validator = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.address.length !== 0) {
            writer.uint32(10).bytes(message.address);
          }
          if (message.pubKey !== void 0) {
            keys_1.PublicKey.encode(message.pubKey, writer.uint32(18).fork()).ldelim();
          }
          if (!message.votingPower.isZero()) {
            writer.uint32(24).int64(message.votingPower);
          }
          if (!message.proposerPriority.isZero()) {
            writer.uint32(32).int64(message.proposerPriority);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseValidator);
          message.address = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.address = reader.bytes();
                break;
              case 2:
                message.pubKey = keys_1.PublicKey.decode(reader, reader.uint32());
                break;
              case 3:
                message.votingPower = reader.int64();
                break;
              case 4:
                message.proposerPriority = reader.int64();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseValidator);
          message.address = object.address !== void 0 && object.address !== null ? bytesFromBase64(object.address) : new Uint8Array();
          message.pubKey = object.pubKey !== void 0 && object.pubKey !== null ? keys_1.PublicKey.fromJSON(object.pubKey) : void 0;
          message.votingPower = object.votingPower !== void 0 && object.votingPower !== null ? long_1.default.fromString(object.votingPower) : long_1.default.ZERO;
          message.proposerPriority = object.proposerPriority !== void 0 && object.proposerPriority !== null ? long_1.default.fromString(object.proposerPriority) : long_1.default.ZERO;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.address !== void 0 && (obj.address = base64FromBytes(message.address !== void 0 ? message.address : new Uint8Array()));
          message.pubKey !== void 0 && (obj.pubKey = message.pubKey ? keys_1.PublicKey.toJSON(message.pubKey) : void 0);
          message.votingPower !== void 0 && (obj.votingPower = (message.votingPower || long_1.default.ZERO).toString());
          message.proposerPriority !== void 0 && (obj.proposerPriority = (message.proposerPriority || long_1.default.ZERO).toString());
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseValidator);
          message.address = (_a = object.address) !== null && _a !== void 0 ? _a : new Uint8Array();
          message.pubKey = object.pubKey !== void 0 && object.pubKey !== null ? keys_1.PublicKey.fromPartial(object.pubKey) : void 0;
          message.votingPower = object.votingPower !== void 0 && object.votingPower !== null ? long_1.default.fromValue(object.votingPower) : long_1.default.ZERO;
          message.proposerPriority = object.proposerPriority !== void 0 && object.proposerPriority !== null ? long_1.default.fromValue(object.proposerPriority) : long_1.default.ZERO;
          return message;
        }
      };
      var baseSimpleValidator = { votingPower: long_1.default.ZERO };
      exports2.SimpleValidator = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.pubKey !== void 0) {
            keys_1.PublicKey.encode(message.pubKey, writer.uint32(10).fork()).ldelim();
          }
          if (!message.votingPower.isZero()) {
            writer.uint32(16).int64(message.votingPower);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseSimpleValidator);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.pubKey = keys_1.PublicKey.decode(reader, reader.uint32());
                break;
              case 2:
                message.votingPower = reader.int64();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseSimpleValidator);
          message.pubKey = object.pubKey !== void 0 && object.pubKey !== null ? keys_1.PublicKey.fromJSON(object.pubKey) : void 0;
          message.votingPower = object.votingPower !== void 0 && object.votingPower !== null ? long_1.default.fromString(object.votingPower) : long_1.default.ZERO;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.pubKey !== void 0 && (obj.pubKey = message.pubKey ? keys_1.PublicKey.toJSON(message.pubKey) : void 0);
          message.votingPower !== void 0 && (obj.votingPower = (message.votingPower || long_1.default.ZERO).toString());
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseSimpleValidator);
          message.pubKey = object.pubKey !== void 0 && object.pubKey !== null ? keys_1.PublicKey.fromPartial(object.pubKey) : void 0;
          message.votingPower = object.votingPower !== void 0 && object.votingPower !== null ? long_1.default.fromValue(object.votingPower) : long_1.default.ZERO;
          return message;
        }
      };
      var globalThis = (() => {
        if (typeof globalThis !== "undefined")
          return globalThis;
        if (typeof self !== "undefined")
          return self;
        if (typeof window !== "undefined")
          return window;
        if (typeof global !== "undefined")
          return global;
        throw "Unable to locate global object";
      })();
      var atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
      function bytesFromBase64(b64) {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
          arr[i] = bin.charCodeAt(i);
        }
        return arr;
      }
      var btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
      function base64FromBytes(arr) {
        const bin = [];
        for (const byte of arr) {
          bin.push(String.fromCharCode(byte));
        }
        return btoa(bin.join(""));
      }
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/tendermint/types/types.js
  var require_types2 = __commonJS({
    "node_modules/cosmjs-types/tendermint/types/types.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.TxProof = exports2.BlockMeta = exports2.LightBlock = exports2.SignedHeader = exports2.Proposal = exports2.CommitSig = exports2.Commit = exports2.Vote = exports2.Data = exports2.Header = exports2.BlockID = exports2.Part = exports2.PartSetHeader = exports2.signedMsgTypeToJSON = exports2.signedMsgTypeFromJSON = exports2.SignedMsgType = exports2.blockIDFlagToJSON = exports2.blockIDFlagFromJSON = exports2.BlockIDFlag = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var proof_1 = require_proof();
      var types_1 = require_types();
      var timestamp_1 = require_timestamp();
      var validator_1 = require_validator();
      exports2.protobufPackage = "tendermint.types";
      var BlockIDFlag;
      (function(BlockIDFlag2) {
        BlockIDFlag2[BlockIDFlag2["BLOCK_ID_FLAG_UNKNOWN"] = 0] = "BLOCK_ID_FLAG_UNKNOWN";
        BlockIDFlag2[BlockIDFlag2["BLOCK_ID_FLAG_ABSENT"] = 1] = "BLOCK_ID_FLAG_ABSENT";
        BlockIDFlag2[BlockIDFlag2["BLOCK_ID_FLAG_COMMIT"] = 2] = "BLOCK_ID_FLAG_COMMIT";
        BlockIDFlag2[BlockIDFlag2["BLOCK_ID_FLAG_NIL"] = 3] = "BLOCK_ID_FLAG_NIL";
        BlockIDFlag2[BlockIDFlag2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
      })(BlockIDFlag = exports2.BlockIDFlag || (exports2.BlockIDFlag = {}));
      function blockIDFlagFromJSON(object) {
        switch (object) {
          case 0:
          case "BLOCK_ID_FLAG_UNKNOWN":
            return BlockIDFlag.BLOCK_ID_FLAG_UNKNOWN;
          case 1:
          case "BLOCK_ID_FLAG_ABSENT":
            return BlockIDFlag.BLOCK_ID_FLAG_ABSENT;
          case 2:
          case "BLOCK_ID_FLAG_COMMIT":
            return BlockIDFlag.BLOCK_ID_FLAG_COMMIT;
          case 3:
          case "BLOCK_ID_FLAG_NIL":
            return BlockIDFlag.BLOCK_ID_FLAG_NIL;
          case -1:
          case "UNRECOGNIZED":
          default:
            return BlockIDFlag.UNRECOGNIZED;
        }
      }
      exports2.blockIDFlagFromJSON = blockIDFlagFromJSON;
      function blockIDFlagToJSON(object) {
        switch (object) {
          case BlockIDFlag.BLOCK_ID_FLAG_UNKNOWN:
            return "BLOCK_ID_FLAG_UNKNOWN";
          case BlockIDFlag.BLOCK_ID_FLAG_ABSENT:
            return "BLOCK_ID_FLAG_ABSENT";
          case BlockIDFlag.BLOCK_ID_FLAG_COMMIT:
            return "BLOCK_ID_FLAG_COMMIT";
          case BlockIDFlag.BLOCK_ID_FLAG_NIL:
            return "BLOCK_ID_FLAG_NIL";
          default:
            return "UNKNOWN";
        }
      }
      exports2.blockIDFlagToJSON = blockIDFlagToJSON;
      var SignedMsgType;
      (function(SignedMsgType2) {
        SignedMsgType2[SignedMsgType2["SIGNED_MSG_TYPE_UNKNOWN"] = 0] = "SIGNED_MSG_TYPE_UNKNOWN";
        SignedMsgType2[SignedMsgType2["SIGNED_MSG_TYPE_PREVOTE"] = 1] = "SIGNED_MSG_TYPE_PREVOTE";
        SignedMsgType2[SignedMsgType2["SIGNED_MSG_TYPE_PRECOMMIT"] = 2] = "SIGNED_MSG_TYPE_PRECOMMIT";
        SignedMsgType2[SignedMsgType2["SIGNED_MSG_TYPE_PROPOSAL"] = 32] = "SIGNED_MSG_TYPE_PROPOSAL";
        SignedMsgType2[SignedMsgType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
      })(SignedMsgType = exports2.SignedMsgType || (exports2.SignedMsgType = {}));
      function signedMsgTypeFromJSON(object) {
        switch (object) {
          case 0:
          case "SIGNED_MSG_TYPE_UNKNOWN":
            return SignedMsgType.SIGNED_MSG_TYPE_UNKNOWN;
          case 1:
          case "SIGNED_MSG_TYPE_PREVOTE":
            return SignedMsgType.SIGNED_MSG_TYPE_PREVOTE;
          case 2:
          case "SIGNED_MSG_TYPE_PRECOMMIT":
            return SignedMsgType.SIGNED_MSG_TYPE_PRECOMMIT;
          case 32:
          case "SIGNED_MSG_TYPE_PROPOSAL":
            return SignedMsgType.SIGNED_MSG_TYPE_PROPOSAL;
          case -1:
          case "UNRECOGNIZED":
          default:
            return SignedMsgType.UNRECOGNIZED;
        }
      }
      exports2.signedMsgTypeFromJSON = signedMsgTypeFromJSON;
      function signedMsgTypeToJSON(object) {
        switch (object) {
          case SignedMsgType.SIGNED_MSG_TYPE_UNKNOWN:
            return "SIGNED_MSG_TYPE_UNKNOWN";
          case SignedMsgType.SIGNED_MSG_TYPE_PREVOTE:
            return "SIGNED_MSG_TYPE_PREVOTE";
          case SignedMsgType.SIGNED_MSG_TYPE_PRECOMMIT:
            return "SIGNED_MSG_TYPE_PRECOMMIT";
          case SignedMsgType.SIGNED_MSG_TYPE_PROPOSAL:
            return "SIGNED_MSG_TYPE_PROPOSAL";
          default:
            return "UNKNOWN";
        }
      }
      exports2.signedMsgTypeToJSON = signedMsgTypeToJSON;
      var basePartSetHeader = { total: 0 };
      exports2.PartSetHeader = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.total !== 0) {
            writer.uint32(8).uint32(message.total);
          }
          if (message.hash.length !== 0) {
            writer.uint32(18).bytes(message.hash);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, basePartSetHeader);
          message.hash = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.total = reader.uint32();
                break;
              case 2:
                message.hash = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, basePartSetHeader);
          message.total = object.total !== void 0 && object.total !== null ? Number(object.total) : 0;
          message.hash = object.hash !== void 0 && object.hash !== null ? bytesFromBase64(object.hash) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.total !== void 0 && (obj.total = message.total);
          message.hash !== void 0 && (obj.hash = base64FromBytes(message.hash !== void 0 ? message.hash : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, basePartSetHeader);
          message.total = (_a = object.total) !== null && _a !== void 0 ? _a : 0;
          message.hash = (_b = object.hash) !== null && _b !== void 0 ? _b : new Uint8Array();
          return message;
        }
      };
      var basePart = { index: 0 };
      exports2.Part = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.index !== 0) {
            writer.uint32(8).uint32(message.index);
          }
          if (message.bytes.length !== 0) {
            writer.uint32(18).bytes(message.bytes);
          }
          if (message.proof !== void 0) {
            proof_1.Proof.encode(message.proof, writer.uint32(26).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, basePart);
          message.bytes = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.index = reader.uint32();
                break;
              case 2:
                message.bytes = reader.bytes();
                break;
              case 3:
                message.proof = proof_1.Proof.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, basePart);
          message.index = object.index !== void 0 && object.index !== null ? Number(object.index) : 0;
          message.bytes = object.bytes !== void 0 && object.bytes !== null ? bytesFromBase64(object.bytes) : new Uint8Array();
          message.proof = object.proof !== void 0 && object.proof !== null ? proof_1.Proof.fromJSON(object.proof) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.index !== void 0 && (obj.index = message.index);
          message.bytes !== void 0 && (obj.bytes = base64FromBytes(message.bytes !== void 0 ? message.bytes : new Uint8Array()));
          message.proof !== void 0 && (obj.proof = message.proof ? proof_1.Proof.toJSON(message.proof) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, basePart);
          message.index = (_a = object.index) !== null && _a !== void 0 ? _a : 0;
          message.bytes = (_b = object.bytes) !== null && _b !== void 0 ? _b : new Uint8Array();
          message.proof = object.proof !== void 0 && object.proof !== null ? proof_1.Proof.fromPartial(object.proof) : void 0;
          return message;
        }
      };
      var baseBlockID = {};
      exports2.BlockID = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.hash.length !== 0) {
            writer.uint32(10).bytes(message.hash);
          }
          if (message.partSetHeader !== void 0) {
            exports2.PartSetHeader.encode(message.partSetHeader, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseBlockID);
          message.hash = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.hash = reader.bytes();
                break;
              case 2:
                message.partSetHeader = exports2.PartSetHeader.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseBlockID);
          message.hash = object.hash !== void 0 && object.hash !== null ? bytesFromBase64(object.hash) : new Uint8Array();
          message.partSetHeader = object.partSetHeader !== void 0 && object.partSetHeader !== null ? exports2.PartSetHeader.fromJSON(object.partSetHeader) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.hash !== void 0 && (obj.hash = base64FromBytes(message.hash !== void 0 ? message.hash : new Uint8Array()));
          message.partSetHeader !== void 0 && (obj.partSetHeader = message.partSetHeader ? exports2.PartSetHeader.toJSON(message.partSetHeader) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseBlockID);
          message.hash = (_a = object.hash) !== null && _a !== void 0 ? _a : new Uint8Array();
          message.partSetHeader = object.partSetHeader !== void 0 && object.partSetHeader !== null ? exports2.PartSetHeader.fromPartial(object.partSetHeader) : void 0;
          return message;
        }
      };
      var baseHeader = { chainId: "", height: long_1.default.ZERO };
      exports2.Header = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.version !== void 0) {
            types_1.Consensus.encode(message.version, writer.uint32(10).fork()).ldelim();
          }
          if (message.chainId !== "") {
            writer.uint32(18).string(message.chainId);
          }
          if (!message.height.isZero()) {
            writer.uint32(24).int64(message.height);
          }
          if (message.time !== void 0) {
            timestamp_1.Timestamp.encode(message.time, writer.uint32(34).fork()).ldelim();
          }
          if (message.lastBlockId !== void 0) {
            exports2.BlockID.encode(message.lastBlockId, writer.uint32(42).fork()).ldelim();
          }
          if (message.lastCommitHash.length !== 0) {
            writer.uint32(50).bytes(message.lastCommitHash);
          }
          if (message.dataHash.length !== 0) {
            writer.uint32(58).bytes(message.dataHash);
          }
          if (message.validatorsHash.length !== 0) {
            writer.uint32(66).bytes(message.validatorsHash);
          }
          if (message.nextValidatorsHash.length !== 0) {
            writer.uint32(74).bytes(message.nextValidatorsHash);
          }
          if (message.consensusHash.length !== 0) {
            writer.uint32(82).bytes(message.consensusHash);
          }
          if (message.appHash.length !== 0) {
            writer.uint32(90).bytes(message.appHash);
          }
          if (message.lastResultsHash.length !== 0) {
            writer.uint32(98).bytes(message.lastResultsHash);
          }
          if (message.evidenceHash.length !== 0) {
            writer.uint32(106).bytes(message.evidenceHash);
          }
          if (message.proposerAddress.length !== 0) {
            writer.uint32(114).bytes(message.proposerAddress);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseHeader);
          message.lastCommitHash = new Uint8Array();
          message.dataHash = new Uint8Array();
          message.validatorsHash = new Uint8Array();
          message.nextValidatorsHash = new Uint8Array();
          message.consensusHash = new Uint8Array();
          message.appHash = new Uint8Array();
          message.lastResultsHash = new Uint8Array();
          message.evidenceHash = new Uint8Array();
          message.proposerAddress = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.version = types_1.Consensus.decode(reader, reader.uint32());
                break;
              case 2:
                message.chainId = reader.string();
                break;
              case 3:
                message.height = reader.int64();
                break;
              case 4:
                message.time = timestamp_1.Timestamp.decode(reader, reader.uint32());
                break;
              case 5:
                message.lastBlockId = exports2.BlockID.decode(reader, reader.uint32());
                break;
              case 6:
                message.lastCommitHash = reader.bytes();
                break;
              case 7:
                message.dataHash = reader.bytes();
                break;
              case 8:
                message.validatorsHash = reader.bytes();
                break;
              case 9:
                message.nextValidatorsHash = reader.bytes();
                break;
              case 10:
                message.consensusHash = reader.bytes();
                break;
              case 11:
                message.appHash = reader.bytes();
                break;
              case 12:
                message.lastResultsHash = reader.bytes();
                break;
              case 13:
                message.evidenceHash = reader.bytes();
                break;
              case 14:
                message.proposerAddress = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseHeader);
          message.version = object.version !== void 0 && object.version !== null ? types_1.Consensus.fromJSON(object.version) : void 0;
          message.chainId = object.chainId !== void 0 && object.chainId !== null ? String(object.chainId) : "";
          message.height = object.height !== void 0 && object.height !== null ? long_1.default.fromString(object.height) : long_1.default.ZERO;
          message.time = object.time !== void 0 && object.time !== null ? fromJsonTimestamp(object.time) : void 0;
          message.lastBlockId = object.lastBlockId !== void 0 && object.lastBlockId !== null ? exports2.BlockID.fromJSON(object.lastBlockId) : void 0;
          message.lastCommitHash = object.lastCommitHash !== void 0 && object.lastCommitHash !== null ? bytesFromBase64(object.lastCommitHash) : new Uint8Array();
          message.dataHash = object.dataHash !== void 0 && object.dataHash !== null ? bytesFromBase64(object.dataHash) : new Uint8Array();
          message.validatorsHash = object.validatorsHash !== void 0 && object.validatorsHash !== null ? bytesFromBase64(object.validatorsHash) : new Uint8Array();
          message.nextValidatorsHash = object.nextValidatorsHash !== void 0 && object.nextValidatorsHash !== null ? bytesFromBase64(object.nextValidatorsHash) : new Uint8Array();
          message.consensusHash = object.consensusHash !== void 0 && object.consensusHash !== null ? bytesFromBase64(object.consensusHash) : new Uint8Array();
          message.appHash = object.appHash !== void 0 && object.appHash !== null ? bytesFromBase64(object.appHash) : new Uint8Array();
          message.lastResultsHash = object.lastResultsHash !== void 0 && object.lastResultsHash !== null ? bytesFromBase64(object.lastResultsHash) : new Uint8Array();
          message.evidenceHash = object.evidenceHash !== void 0 && object.evidenceHash !== null ? bytesFromBase64(object.evidenceHash) : new Uint8Array();
          message.proposerAddress = object.proposerAddress !== void 0 && object.proposerAddress !== null ? bytesFromBase64(object.proposerAddress) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.version !== void 0 && (obj.version = message.version ? types_1.Consensus.toJSON(message.version) : void 0);
          message.chainId !== void 0 && (obj.chainId = message.chainId);
          message.height !== void 0 && (obj.height = (message.height || long_1.default.ZERO).toString());
          message.time !== void 0 && (obj.time = fromTimestamp(message.time).toISOString());
          message.lastBlockId !== void 0 && (obj.lastBlockId = message.lastBlockId ? exports2.BlockID.toJSON(message.lastBlockId) : void 0);
          message.lastCommitHash !== void 0 && (obj.lastCommitHash = base64FromBytes(message.lastCommitHash !== void 0 ? message.lastCommitHash : new Uint8Array()));
          message.dataHash !== void 0 && (obj.dataHash = base64FromBytes(message.dataHash !== void 0 ? message.dataHash : new Uint8Array()));
          message.validatorsHash !== void 0 && (obj.validatorsHash = base64FromBytes(message.validatorsHash !== void 0 ? message.validatorsHash : new Uint8Array()));
          message.nextValidatorsHash !== void 0 && (obj.nextValidatorsHash = base64FromBytes(message.nextValidatorsHash !== void 0 ? message.nextValidatorsHash : new Uint8Array()));
          message.consensusHash !== void 0 && (obj.consensusHash = base64FromBytes(message.consensusHash !== void 0 ? message.consensusHash : new Uint8Array()));
          message.appHash !== void 0 && (obj.appHash = base64FromBytes(message.appHash !== void 0 ? message.appHash : new Uint8Array()));
          message.lastResultsHash !== void 0 && (obj.lastResultsHash = base64FromBytes(message.lastResultsHash !== void 0 ? message.lastResultsHash : new Uint8Array()));
          message.evidenceHash !== void 0 && (obj.evidenceHash = base64FromBytes(message.evidenceHash !== void 0 ? message.evidenceHash : new Uint8Array()));
          message.proposerAddress !== void 0 && (obj.proposerAddress = base64FromBytes(message.proposerAddress !== void 0 ? message.proposerAddress : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
          const message = Object.assign({}, baseHeader);
          message.version = object.version !== void 0 && object.version !== null ? types_1.Consensus.fromPartial(object.version) : void 0;
          message.chainId = (_a = object.chainId) !== null && _a !== void 0 ? _a : "";
          message.height = object.height !== void 0 && object.height !== null ? long_1.default.fromValue(object.height) : long_1.default.ZERO;
          message.time = object.time !== void 0 && object.time !== null ? timestamp_1.Timestamp.fromPartial(object.time) : void 0;
          message.lastBlockId = object.lastBlockId !== void 0 && object.lastBlockId !== null ? exports2.BlockID.fromPartial(object.lastBlockId) : void 0;
          message.lastCommitHash = (_b = object.lastCommitHash) !== null && _b !== void 0 ? _b : new Uint8Array();
          message.dataHash = (_c = object.dataHash) !== null && _c !== void 0 ? _c : new Uint8Array();
          message.validatorsHash = (_d = object.validatorsHash) !== null && _d !== void 0 ? _d : new Uint8Array();
          message.nextValidatorsHash = (_e = object.nextValidatorsHash) !== null && _e !== void 0 ? _e : new Uint8Array();
          message.consensusHash = (_f = object.consensusHash) !== null && _f !== void 0 ? _f : new Uint8Array();
          message.appHash = (_g = object.appHash) !== null && _g !== void 0 ? _g : new Uint8Array();
          message.lastResultsHash = (_h = object.lastResultsHash) !== null && _h !== void 0 ? _h : new Uint8Array();
          message.evidenceHash = (_j = object.evidenceHash) !== null && _j !== void 0 ? _j : new Uint8Array();
          message.proposerAddress = (_k = object.proposerAddress) !== null && _k !== void 0 ? _k : new Uint8Array();
          return message;
        }
      };
      var baseData = {};
      exports2.Data = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.txs) {
            writer.uint32(10).bytes(v);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseData);
          message.txs = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.txs.push(reader.bytes());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseData);
          message.txs = ((_a = object.txs) !== null && _a !== void 0 ? _a : []).map((e) => bytesFromBase64(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.txs) {
            obj.txs = message.txs.map((e) => base64FromBytes(e !== void 0 ? e : new Uint8Array()));
          } else {
            obj.txs = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseData);
          message.txs = ((_a = object.txs) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
          return message;
        }
      };
      var baseVote = { type: 0, height: long_1.default.ZERO, round: 0, validatorIndex: 0 };
      exports2.Vote = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.type !== 0) {
            writer.uint32(8).int32(message.type);
          }
          if (!message.height.isZero()) {
            writer.uint32(16).int64(message.height);
          }
          if (message.round !== 0) {
            writer.uint32(24).int32(message.round);
          }
          if (message.blockId !== void 0) {
            exports2.BlockID.encode(message.blockId, writer.uint32(34).fork()).ldelim();
          }
          if (message.timestamp !== void 0) {
            timestamp_1.Timestamp.encode(message.timestamp, writer.uint32(42).fork()).ldelim();
          }
          if (message.validatorAddress.length !== 0) {
            writer.uint32(50).bytes(message.validatorAddress);
          }
          if (message.validatorIndex !== 0) {
            writer.uint32(56).int32(message.validatorIndex);
          }
          if (message.signature.length !== 0) {
            writer.uint32(66).bytes(message.signature);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseVote);
          message.validatorAddress = new Uint8Array();
          message.signature = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.type = reader.int32();
                break;
              case 2:
                message.height = reader.int64();
                break;
              case 3:
                message.round = reader.int32();
                break;
              case 4:
                message.blockId = exports2.BlockID.decode(reader, reader.uint32());
                break;
              case 5:
                message.timestamp = timestamp_1.Timestamp.decode(reader, reader.uint32());
                break;
              case 6:
                message.validatorAddress = reader.bytes();
                break;
              case 7:
                message.validatorIndex = reader.int32();
                break;
              case 8:
                message.signature = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseVote);
          message.type = object.type !== void 0 && object.type !== null ? signedMsgTypeFromJSON(object.type) : 0;
          message.height = object.height !== void 0 && object.height !== null ? long_1.default.fromString(object.height) : long_1.default.ZERO;
          message.round = object.round !== void 0 && object.round !== null ? Number(object.round) : 0;
          message.blockId = object.blockId !== void 0 && object.blockId !== null ? exports2.BlockID.fromJSON(object.blockId) : void 0;
          message.timestamp = object.timestamp !== void 0 && object.timestamp !== null ? fromJsonTimestamp(object.timestamp) : void 0;
          message.validatorAddress = object.validatorAddress !== void 0 && object.validatorAddress !== null ? bytesFromBase64(object.validatorAddress) : new Uint8Array();
          message.validatorIndex = object.validatorIndex !== void 0 && object.validatorIndex !== null ? Number(object.validatorIndex) : 0;
          message.signature = object.signature !== void 0 && object.signature !== null ? bytesFromBase64(object.signature) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.type !== void 0 && (obj.type = signedMsgTypeToJSON(message.type));
          message.height !== void 0 && (obj.height = (message.height || long_1.default.ZERO).toString());
          message.round !== void 0 && (obj.round = message.round);
          message.blockId !== void 0 && (obj.blockId = message.blockId ? exports2.BlockID.toJSON(message.blockId) : void 0);
          message.timestamp !== void 0 && (obj.timestamp = fromTimestamp(message.timestamp).toISOString());
          message.validatorAddress !== void 0 && (obj.validatorAddress = base64FromBytes(message.validatorAddress !== void 0 ? message.validatorAddress : new Uint8Array()));
          message.validatorIndex !== void 0 && (obj.validatorIndex = message.validatorIndex);
          message.signature !== void 0 && (obj.signature = base64FromBytes(message.signature !== void 0 ? message.signature : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d, _e;
          const message = Object.assign({}, baseVote);
          message.type = (_a = object.type) !== null && _a !== void 0 ? _a : 0;
          message.height = object.height !== void 0 && object.height !== null ? long_1.default.fromValue(object.height) : long_1.default.ZERO;
          message.round = (_b = object.round) !== null && _b !== void 0 ? _b : 0;
          message.blockId = object.blockId !== void 0 && object.blockId !== null ? exports2.BlockID.fromPartial(object.blockId) : void 0;
          message.timestamp = object.timestamp !== void 0 && object.timestamp !== null ? timestamp_1.Timestamp.fromPartial(object.timestamp) : void 0;
          message.validatorAddress = (_c = object.validatorAddress) !== null && _c !== void 0 ? _c : new Uint8Array();
          message.validatorIndex = (_d = object.validatorIndex) !== null && _d !== void 0 ? _d : 0;
          message.signature = (_e = object.signature) !== null && _e !== void 0 ? _e : new Uint8Array();
          return message;
        }
      };
      var baseCommit = { height: long_1.default.ZERO, round: 0 };
      exports2.Commit = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.height.isZero()) {
            writer.uint32(8).int64(message.height);
          }
          if (message.round !== 0) {
            writer.uint32(16).int32(message.round);
          }
          if (message.blockId !== void 0) {
            exports2.BlockID.encode(message.blockId, writer.uint32(26).fork()).ldelim();
          }
          for (const v of message.signatures) {
            exports2.CommitSig.encode(v, writer.uint32(34).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseCommit);
          message.signatures = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.height = reader.int64();
                break;
              case 2:
                message.round = reader.int32();
                break;
              case 3:
                message.blockId = exports2.BlockID.decode(reader, reader.uint32());
                break;
              case 4:
                message.signatures.push(exports2.CommitSig.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseCommit);
          message.height = object.height !== void 0 && object.height !== null ? long_1.default.fromString(object.height) : long_1.default.ZERO;
          message.round = object.round !== void 0 && object.round !== null ? Number(object.round) : 0;
          message.blockId = object.blockId !== void 0 && object.blockId !== null ? exports2.BlockID.fromJSON(object.blockId) : void 0;
          message.signatures = ((_a = object.signatures) !== null && _a !== void 0 ? _a : []).map((e) => exports2.CommitSig.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.height !== void 0 && (obj.height = (message.height || long_1.default.ZERO).toString());
          message.round !== void 0 && (obj.round = message.round);
          message.blockId !== void 0 && (obj.blockId = message.blockId ? exports2.BlockID.toJSON(message.blockId) : void 0);
          if (message.signatures) {
            obj.signatures = message.signatures.map((e) => e ? exports2.CommitSig.toJSON(e) : void 0);
          } else {
            obj.signatures = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseCommit);
          message.height = object.height !== void 0 && object.height !== null ? long_1.default.fromValue(object.height) : long_1.default.ZERO;
          message.round = (_a = object.round) !== null && _a !== void 0 ? _a : 0;
          message.blockId = object.blockId !== void 0 && object.blockId !== null ? exports2.BlockID.fromPartial(object.blockId) : void 0;
          message.signatures = ((_b = object.signatures) === null || _b === void 0 ? void 0 : _b.map((e) => exports2.CommitSig.fromPartial(e))) || [];
          return message;
        }
      };
      var baseCommitSig = { blockIdFlag: 0 };
      exports2.CommitSig = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.blockIdFlag !== 0) {
            writer.uint32(8).int32(message.blockIdFlag);
          }
          if (message.validatorAddress.length !== 0) {
            writer.uint32(18).bytes(message.validatorAddress);
          }
          if (message.timestamp !== void 0) {
            timestamp_1.Timestamp.encode(message.timestamp, writer.uint32(26).fork()).ldelim();
          }
          if (message.signature.length !== 0) {
            writer.uint32(34).bytes(message.signature);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseCommitSig);
          message.validatorAddress = new Uint8Array();
          message.signature = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.blockIdFlag = reader.int32();
                break;
              case 2:
                message.validatorAddress = reader.bytes();
                break;
              case 3:
                message.timestamp = timestamp_1.Timestamp.decode(reader, reader.uint32());
                break;
              case 4:
                message.signature = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseCommitSig);
          message.blockIdFlag = object.blockIdFlag !== void 0 && object.blockIdFlag !== null ? blockIDFlagFromJSON(object.blockIdFlag) : 0;
          message.validatorAddress = object.validatorAddress !== void 0 && object.validatorAddress !== null ? bytesFromBase64(object.validatorAddress) : new Uint8Array();
          message.timestamp = object.timestamp !== void 0 && object.timestamp !== null ? fromJsonTimestamp(object.timestamp) : void 0;
          message.signature = object.signature !== void 0 && object.signature !== null ? bytesFromBase64(object.signature) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.blockIdFlag !== void 0 && (obj.blockIdFlag = blockIDFlagToJSON(message.blockIdFlag));
          message.validatorAddress !== void 0 && (obj.validatorAddress = base64FromBytes(message.validatorAddress !== void 0 ? message.validatorAddress : new Uint8Array()));
          message.timestamp !== void 0 && (obj.timestamp = fromTimestamp(message.timestamp).toISOString());
          message.signature !== void 0 && (obj.signature = base64FromBytes(message.signature !== void 0 ? message.signature : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseCommitSig);
          message.blockIdFlag = (_a = object.blockIdFlag) !== null && _a !== void 0 ? _a : 0;
          message.validatorAddress = (_b = object.validatorAddress) !== null && _b !== void 0 ? _b : new Uint8Array();
          message.timestamp = object.timestamp !== void 0 && object.timestamp !== null ? timestamp_1.Timestamp.fromPartial(object.timestamp) : void 0;
          message.signature = (_c = object.signature) !== null && _c !== void 0 ? _c : new Uint8Array();
          return message;
        }
      };
      var baseProposal = { type: 0, height: long_1.default.ZERO, round: 0, polRound: 0 };
      exports2.Proposal = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.type !== 0) {
            writer.uint32(8).int32(message.type);
          }
          if (!message.height.isZero()) {
            writer.uint32(16).int64(message.height);
          }
          if (message.round !== 0) {
            writer.uint32(24).int32(message.round);
          }
          if (message.polRound !== 0) {
            writer.uint32(32).int32(message.polRound);
          }
          if (message.blockId !== void 0) {
            exports2.BlockID.encode(message.blockId, writer.uint32(42).fork()).ldelim();
          }
          if (message.timestamp !== void 0) {
            timestamp_1.Timestamp.encode(message.timestamp, writer.uint32(50).fork()).ldelim();
          }
          if (message.signature.length !== 0) {
            writer.uint32(58).bytes(message.signature);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseProposal);
          message.signature = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.type = reader.int32();
                break;
              case 2:
                message.height = reader.int64();
                break;
              case 3:
                message.round = reader.int32();
                break;
              case 4:
                message.polRound = reader.int32();
                break;
              case 5:
                message.blockId = exports2.BlockID.decode(reader, reader.uint32());
                break;
              case 6:
                message.timestamp = timestamp_1.Timestamp.decode(reader, reader.uint32());
                break;
              case 7:
                message.signature = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseProposal);
          message.type = object.type !== void 0 && object.type !== null ? signedMsgTypeFromJSON(object.type) : 0;
          message.height = object.height !== void 0 && object.height !== null ? long_1.default.fromString(object.height) : long_1.default.ZERO;
          message.round = object.round !== void 0 && object.round !== null ? Number(object.round) : 0;
          message.polRound = object.polRound !== void 0 && object.polRound !== null ? Number(object.polRound) : 0;
          message.blockId = object.blockId !== void 0 && object.blockId !== null ? exports2.BlockID.fromJSON(object.blockId) : void 0;
          message.timestamp = object.timestamp !== void 0 && object.timestamp !== null ? fromJsonTimestamp(object.timestamp) : void 0;
          message.signature = object.signature !== void 0 && object.signature !== null ? bytesFromBase64(object.signature) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.type !== void 0 && (obj.type = signedMsgTypeToJSON(message.type));
          message.height !== void 0 && (obj.height = (message.height || long_1.default.ZERO).toString());
          message.round !== void 0 && (obj.round = message.round);
          message.polRound !== void 0 && (obj.polRound = message.polRound);
          message.blockId !== void 0 && (obj.blockId = message.blockId ? exports2.BlockID.toJSON(message.blockId) : void 0);
          message.timestamp !== void 0 && (obj.timestamp = fromTimestamp(message.timestamp).toISOString());
          message.signature !== void 0 && (obj.signature = base64FromBytes(message.signature !== void 0 ? message.signature : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d;
          const message = Object.assign({}, baseProposal);
          message.type = (_a = object.type) !== null && _a !== void 0 ? _a : 0;
          message.height = object.height !== void 0 && object.height !== null ? long_1.default.fromValue(object.height) : long_1.default.ZERO;
          message.round = (_b = object.round) !== null && _b !== void 0 ? _b : 0;
          message.polRound = (_c = object.polRound) !== null && _c !== void 0 ? _c : 0;
          message.blockId = object.blockId !== void 0 && object.blockId !== null ? exports2.BlockID.fromPartial(object.blockId) : void 0;
          message.timestamp = object.timestamp !== void 0 && object.timestamp !== null ? timestamp_1.Timestamp.fromPartial(object.timestamp) : void 0;
          message.signature = (_d = object.signature) !== null && _d !== void 0 ? _d : new Uint8Array();
          return message;
        }
      };
      var baseSignedHeader = {};
      exports2.SignedHeader = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.header !== void 0) {
            exports2.Header.encode(message.header, writer.uint32(10).fork()).ldelim();
          }
          if (message.commit !== void 0) {
            exports2.Commit.encode(message.commit, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseSignedHeader);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.header = exports2.Header.decode(reader, reader.uint32());
                break;
              case 2:
                message.commit = exports2.Commit.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseSignedHeader);
          message.header = object.header !== void 0 && object.header !== null ? exports2.Header.fromJSON(object.header) : void 0;
          message.commit = object.commit !== void 0 && object.commit !== null ? exports2.Commit.fromJSON(object.commit) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.header !== void 0 && (obj.header = message.header ? exports2.Header.toJSON(message.header) : void 0);
          message.commit !== void 0 && (obj.commit = message.commit ? exports2.Commit.toJSON(message.commit) : void 0);
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseSignedHeader);
          message.header = object.header !== void 0 && object.header !== null ? exports2.Header.fromPartial(object.header) : void 0;
          message.commit = object.commit !== void 0 && object.commit !== null ? exports2.Commit.fromPartial(object.commit) : void 0;
          return message;
        }
      };
      var baseLightBlock = {};
      exports2.LightBlock = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.signedHeader !== void 0) {
            exports2.SignedHeader.encode(message.signedHeader, writer.uint32(10).fork()).ldelim();
          }
          if (message.validatorSet !== void 0) {
            validator_1.ValidatorSet.encode(message.validatorSet, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseLightBlock);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.signedHeader = exports2.SignedHeader.decode(reader, reader.uint32());
                break;
              case 2:
                message.validatorSet = validator_1.ValidatorSet.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseLightBlock);
          message.signedHeader = object.signedHeader !== void 0 && object.signedHeader !== null ? exports2.SignedHeader.fromJSON(object.signedHeader) : void 0;
          message.validatorSet = object.validatorSet !== void 0 && object.validatorSet !== null ? validator_1.ValidatorSet.fromJSON(object.validatorSet) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.signedHeader !== void 0 && (obj.signedHeader = message.signedHeader ? exports2.SignedHeader.toJSON(message.signedHeader) : void 0);
          message.validatorSet !== void 0 && (obj.validatorSet = message.validatorSet ? validator_1.ValidatorSet.toJSON(message.validatorSet) : void 0);
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseLightBlock);
          message.signedHeader = object.signedHeader !== void 0 && object.signedHeader !== null ? exports2.SignedHeader.fromPartial(object.signedHeader) : void 0;
          message.validatorSet = object.validatorSet !== void 0 && object.validatorSet !== null ? validator_1.ValidatorSet.fromPartial(object.validatorSet) : void 0;
          return message;
        }
      };
      var baseBlockMeta = { blockSize: long_1.default.ZERO, numTxs: long_1.default.ZERO };
      exports2.BlockMeta = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.blockId !== void 0) {
            exports2.BlockID.encode(message.blockId, writer.uint32(10).fork()).ldelim();
          }
          if (!message.blockSize.isZero()) {
            writer.uint32(16).int64(message.blockSize);
          }
          if (message.header !== void 0) {
            exports2.Header.encode(message.header, writer.uint32(26).fork()).ldelim();
          }
          if (!message.numTxs.isZero()) {
            writer.uint32(32).int64(message.numTxs);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseBlockMeta);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.blockId = exports2.BlockID.decode(reader, reader.uint32());
                break;
              case 2:
                message.blockSize = reader.int64();
                break;
              case 3:
                message.header = exports2.Header.decode(reader, reader.uint32());
                break;
              case 4:
                message.numTxs = reader.int64();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseBlockMeta);
          message.blockId = object.blockId !== void 0 && object.blockId !== null ? exports2.BlockID.fromJSON(object.blockId) : void 0;
          message.blockSize = object.blockSize !== void 0 && object.blockSize !== null ? long_1.default.fromString(object.blockSize) : long_1.default.ZERO;
          message.header = object.header !== void 0 && object.header !== null ? exports2.Header.fromJSON(object.header) : void 0;
          message.numTxs = object.numTxs !== void 0 && object.numTxs !== null ? long_1.default.fromString(object.numTxs) : long_1.default.ZERO;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.blockId !== void 0 && (obj.blockId = message.blockId ? exports2.BlockID.toJSON(message.blockId) : void 0);
          message.blockSize !== void 0 && (obj.blockSize = (message.blockSize || long_1.default.ZERO).toString());
          message.header !== void 0 && (obj.header = message.header ? exports2.Header.toJSON(message.header) : void 0);
          message.numTxs !== void 0 && (obj.numTxs = (message.numTxs || long_1.default.ZERO).toString());
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseBlockMeta);
          message.blockId = object.blockId !== void 0 && object.blockId !== null ? exports2.BlockID.fromPartial(object.blockId) : void 0;
          message.blockSize = object.blockSize !== void 0 && object.blockSize !== null ? long_1.default.fromValue(object.blockSize) : long_1.default.ZERO;
          message.header = object.header !== void 0 && object.header !== null ? exports2.Header.fromPartial(object.header) : void 0;
          message.numTxs = object.numTxs !== void 0 && object.numTxs !== null ? long_1.default.fromValue(object.numTxs) : long_1.default.ZERO;
          return message;
        }
      };
      var baseTxProof = {};
      exports2.TxProof = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.rootHash.length !== 0) {
            writer.uint32(10).bytes(message.rootHash);
          }
          if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
          }
          if (message.proof !== void 0) {
            proof_1.Proof.encode(message.proof, writer.uint32(26).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseTxProof);
          message.rootHash = new Uint8Array();
          message.data = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.rootHash = reader.bytes();
                break;
              case 2:
                message.data = reader.bytes();
                break;
              case 3:
                message.proof = proof_1.Proof.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseTxProof);
          message.rootHash = object.rootHash !== void 0 && object.rootHash !== null ? bytesFromBase64(object.rootHash) : new Uint8Array();
          message.data = object.data !== void 0 && object.data !== null ? bytesFromBase64(object.data) : new Uint8Array();
          message.proof = object.proof !== void 0 && object.proof !== null ? proof_1.Proof.fromJSON(object.proof) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.rootHash !== void 0 && (obj.rootHash = base64FromBytes(message.rootHash !== void 0 ? message.rootHash : new Uint8Array()));
          message.data !== void 0 && (obj.data = base64FromBytes(message.data !== void 0 ? message.data : new Uint8Array()));
          message.proof !== void 0 && (obj.proof = message.proof ? proof_1.Proof.toJSON(message.proof) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseTxProof);
          message.rootHash = (_a = object.rootHash) !== null && _a !== void 0 ? _a : new Uint8Array();
          message.data = (_b = object.data) !== null && _b !== void 0 ? _b : new Uint8Array();
          message.proof = object.proof !== void 0 && object.proof !== null ? proof_1.Proof.fromPartial(object.proof) : void 0;
          return message;
        }
      };
      var globalThis = (() => {
        if (typeof globalThis !== "undefined")
          return globalThis;
        if (typeof self !== "undefined")
          return self;
        if (typeof window !== "undefined")
          return window;
        if (typeof global !== "undefined")
          return global;
        throw "Unable to locate global object";
      })();
      var atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
      function bytesFromBase64(b64) {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
          arr[i] = bin.charCodeAt(i);
        }
        return arr;
      }
      var btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
      function base64FromBytes(arr) {
        const bin = [];
        for (const byte of arr) {
          bin.push(String.fromCharCode(byte));
        }
        return btoa(bin.join(""));
      }
      function toTimestamp(date) {
        const seconds = numberToLong(date.getTime() / 1e3);
        const nanos = date.getTime() % 1e3 * 1e6;
        return { seconds, nanos };
      }
      function fromTimestamp(t) {
        let millis = t.seconds.toNumber() * 1e3;
        millis += t.nanos / 1e6;
        return new Date(millis);
      }
      function fromJsonTimestamp(o) {
        if (o instanceof Date) {
          return toTimestamp(o);
        } else if (typeof o === "string") {
          return toTimestamp(new Date(o));
        } else {
          return timestamp_1.Timestamp.fromJSON(o);
        }
      }
      function numberToLong(number) {
        return long_1.default.fromNumber(number);
      }
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/cosmos/staking/v1beta1/staking.js
  var require_staking = __commonJS({
    "node_modules/cosmjs-types/cosmos/staking/v1beta1/staking.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.Pool = exports2.RedelegationResponse = exports2.RedelegationEntryResponse = exports2.DelegationResponse = exports2.Params = exports2.Redelegation = exports2.RedelegationEntry = exports2.UnbondingDelegationEntry = exports2.UnbondingDelegation = exports2.Delegation = exports2.DVVTriplets = exports2.DVVTriplet = exports2.DVPairs = exports2.DVPair = exports2.ValAddresses = exports2.Validator = exports2.Description = exports2.Commission = exports2.CommissionRates = exports2.HistoricalInfo = exports2.bondStatusToJSON = exports2.bondStatusFromJSON = exports2.BondStatus = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var types_1 = require_types2();
      var timestamp_1 = require_timestamp();
      var any_1 = require_any();
      var duration_1 = require_duration();
      var coin_1 = require_coin();
      exports2.protobufPackage = "cosmos.staking.v1beta1";
      var BondStatus;
      (function(BondStatus2) {
        BondStatus2[BondStatus2["BOND_STATUS_UNSPECIFIED"] = 0] = "BOND_STATUS_UNSPECIFIED";
        BondStatus2[BondStatus2["BOND_STATUS_UNBONDED"] = 1] = "BOND_STATUS_UNBONDED";
        BondStatus2[BondStatus2["BOND_STATUS_UNBONDING"] = 2] = "BOND_STATUS_UNBONDING";
        BondStatus2[BondStatus2["BOND_STATUS_BONDED"] = 3] = "BOND_STATUS_BONDED";
        BondStatus2[BondStatus2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
      })(BondStatus = exports2.BondStatus || (exports2.BondStatus = {}));
      function bondStatusFromJSON(object) {
        switch (object) {
          case 0:
          case "BOND_STATUS_UNSPECIFIED":
            return BondStatus.BOND_STATUS_UNSPECIFIED;
          case 1:
          case "BOND_STATUS_UNBONDED":
            return BondStatus.BOND_STATUS_UNBONDED;
          case 2:
          case "BOND_STATUS_UNBONDING":
            return BondStatus.BOND_STATUS_UNBONDING;
          case 3:
          case "BOND_STATUS_BONDED":
            return BondStatus.BOND_STATUS_BONDED;
          case -1:
          case "UNRECOGNIZED":
          default:
            return BondStatus.UNRECOGNIZED;
        }
      }
      exports2.bondStatusFromJSON = bondStatusFromJSON;
      function bondStatusToJSON(object) {
        switch (object) {
          case BondStatus.BOND_STATUS_UNSPECIFIED:
            return "BOND_STATUS_UNSPECIFIED";
          case BondStatus.BOND_STATUS_UNBONDED:
            return "BOND_STATUS_UNBONDED";
          case BondStatus.BOND_STATUS_UNBONDING:
            return "BOND_STATUS_UNBONDING";
          case BondStatus.BOND_STATUS_BONDED:
            return "BOND_STATUS_BONDED";
          default:
            return "UNKNOWN";
        }
      }
      exports2.bondStatusToJSON = bondStatusToJSON;
      var baseHistoricalInfo = {};
      exports2.HistoricalInfo = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.header !== void 0) {
            types_1.Header.encode(message.header, writer.uint32(10).fork()).ldelim();
          }
          for (const v of message.valset) {
            exports2.Validator.encode(v, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseHistoricalInfo);
          message.valset = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.header = types_1.Header.decode(reader, reader.uint32());
                break;
              case 2:
                message.valset.push(exports2.Validator.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseHistoricalInfo);
          message.header = object.header !== void 0 && object.header !== null ? types_1.Header.fromJSON(object.header) : void 0;
          message.valset = ((_a = object.valset) !== null && _a !== void 0 ? _a : []).map((e) => exports2.Validator.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.header !== void 0 && (obj.header = message.header ? types_1.Header.toJSON(message.header) : void 0);
          if (message.valset) {
            obj.valset = message.valset.map((e) => e ? exports2.Validator.toJSON(e) : void 0);
          } else {
            obj.valset = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseHistoricalInfo);
          message.header = object.header !== void 0 && object.header !== null ? types_1.Header.fromPartial(object.header) : void 0;
          message.valset = ((_a = object.valset) === null || _a === void 0 ? void 0 : _a.map((e) => exports2.Validator.fromPartial(e))) || [];
          return message;
        }
      };
      var baseCommissionRates = { rate: "", maxRate: "", maxChangeRate: "" };
      exports2.CommissionRates = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.rate !== "") {
            writer.uint32(10).string(message.rate);
          }
          if (message.maxRate !== "") {
            writer.uint32(18).string(message.maxRate);
          }
          if (message.maxChangeRate !== "") {
            writer.uint32(26).string(message.maxChangeRate);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseCommissionRates);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.rate = reader.string();
                break;
              case 2:
                message.maxRate = reader.string();
                break;
              case 3:
                message.maxChangeRate = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseCommissionRates);
          message.rate = object.rate !== void 0 && object.rate !== null ? String(object.rate) : "";
          message.maxRate = object.maxRate !== void 0 && object.maxRate !== null ? String(object.maxRate) : "";
          message.maxChangeRate = object.maxChangeRate !== void 0 && object.maxChangeRate !== null ? String(object.maxChangeRate) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.rate !== void 0 && (obj.rate = message.rate);
          message.maxRate !== void 0 && (obj.maxRate = message.maxRate);
          message.maxChangeRate !== void 0 && (obj.maxChangeRate = message.maxChangeRate);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseCommissionRates);
          message.rate = (_a = object.rate) !== null && _a !== void 0 ? _a : "";
          message.maxRate = (_b = object.maxRate) !== null && _b !== void 0 ? _b : "";
          message.maxChangeRate = (_c = object.maxChangeRate) !== null && _c !== void 0 ? _c : "";
          return message;
        }
      };
      var baseCommission = {};
      exports2.Commission = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.commissionRates !== void 0) {
            exports2.CommissionRates.encode(message.commissionRates, writer.uint32(10).fork()).ldelim();
          }
          if (message.updateTime !== void 0) {
            timestamp_1.Timestamp.encode(message.updateTime, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseCommission);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.commissionRates = exports2.CommissionRates.decode(reader, reader.uint32());
                break;
              case 2:
                message.updateTime = timestamp_1.Timestamp.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseCommission);
          message.commissionRates = object.commissionRates !== void 0 && object.commissionRates !== null ? exports2.CommissionRates.fromJSON(object.commissionRates) : void 0;
          message.updateTime = object.updateTime !== void 0 && object.updateTime !== null ? fromJsonTimestamp(object.updateTime) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.commissionRates !== void 0 && (obj.commissionRates = message.commissionRates ? exports2.CommissionRates.toJSON(message.commissionRates) : void 0);
          message.updateTime !== void 0 && (obj.updateTime = fromTimestamp(message.updateTime).toISOString());
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseCommission);
          message.commissionRates = object.commissionRates !== void 0 && object.commissionRates !== null ? exports2.CommissionRates.fromPartial(object.commissionRates) : void 0;
          message.updateTime = object.updateTime !== void 0 && object.updateTime !== null ? timestamp_1.Timestamp.fromPartial(object.updateTime) : void 0;
          return message;
        }
      };
      var baseDescription = { moniker: "", identity: "", website: "", securityContact: "", details: "" };
      exports2.Description = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.moniker !== "") {
            writer.uint32(10).string(message.moniker);
          }
          if (message.identity !== "") {
            writer.uint32(18).string(message.identity);
          }
          if (message.website !== "") {
            writer.uint32(26).string(message.website);
          }
          if (message.securityContact !== "") {
            writer.uint32(34).string(message.securityContact);
          }
          if (message.details !== "") {
            writer.uint32(42).string(message.details);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseDescription);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.moniker = reader.string();
                break;
              case 2:
                message.identity = reader.string();
                break;
              case 3:
                message.website = reader.string();
                break;
              case 4:
                message.securityContact = reader.string();
                break;
              case 5:
                message.details = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseDescription);
          message.moniker = object.moniker !== void 0 && object.moniker !== null ? String(object.moniker) : "";
          message.identity = object.identity !== void 0 && object.identity !== null ? String(object.identity) : "";
          message.website = object.website !== void 0 && object.website !== null ? String(object.website) : "";
          message.securityContact = object.securityContact !== void 0 && object.securityContact !== null ? String(object.securityContact) : "";
          message.details = object.details !== void 0 && object.details !== null ? String(object.details) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.moniker !== void 0 && (obj.moniker = message.moniker);
          message.identity !== void 0 && (obj.identity = message.identity);
          message.website !== void 0 && (obj.website = message.website);
          message.securityContact !== void 0 && (obj.securityContact = message.securityContact);
          message.details !== void 0 && (obj.details = message.details);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d, _e;
          const message = Object.assign({}, baseDescription);
          message.moniker = (_a = object.moniker) !== null && _a !== void 0 ? _a : "";
          message.identity = (_b = object.identity) !== null && _b !== void 0 ? _b : "";
          message.website = (_c = object.website) !== null && _c !== void 0 ? _c : "";
          message.securityContact = (_d = object.securityContact) !== null && _d !== void 0 ? _d : "";
          message.details = (_e = object.details) !== null && _e !== void 0 ? _e : "";
          return message;
        }
      };
      var baseValidator = {
        operatorAddress: "",
        jailed: false,
        status: 0,
        tokens: "",
        delegatorShares: "",
        unbondingHeight: long_1.default.ZERO,
        minSelfDelegation: ""
      };
      exports2.Validator = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.operatorAddress !== "") {
            writer.uint32(10).string(message.operatorAddress);
          }
          if (message.consensusPubkey !== void 0) {
            any_1.Any.encode(message.consensusPubkey, writer.uint32(18).fork()).ldelim();
          }
          if (message.jailed === true) {
            writer.uint32(24).bool(message.jailed);
          }
          if (message.status !== 0) {
            writer.uint32(32).int32(message.status);
          }
          if (message.tokens !== "") {
            writer.uint32(42).string(message.tokens);
          }
          if (message.delegatorShares !== "") {
            writer.uint32(50).string(message.delegatorShares);
          }
          if (message.description !== void 0) {
            exports2.Description.encode(message.description, writer.uint32(58).fork()).ldelim();
          }
          if (!message.unbondingHeight.isZero()) {
            writer.uint32(64).int64(message.unbondingHeight);
          }
          if (message.unbondingTime !== void 0) {
            timestamp_1.Timestamp.encode(message.unbondingTime, writer.uint32(74).fork()).ldelim();
          }
          if (message.commission !== void 0) {
            exports2.Commission.encode(message.commission, writer.uint32(82).fork()).ldelim();
          }
          if (message.minSelfDelegation !== "") {
            writer.uint32(90).string(message.minSelfDelegation);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseValidator);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.operatorAddress = reader.string();
                break;
              case 2:
                message.consensusPubkey = any_1.Any.decode(reader, reader.uint32());
                break;
              case 3:
                message.jailed = reader.bool();
                break;
              case 4:
                message.status = reader.int32();
                break;
              case 5:
                message.tokens = reader.string();
                break;
              case 6:
                message.delegatorShares = reader.string();
                break;
              case 7:
                message.description = exports2.Description.decode(reader, reader.uint32());
                break;
              case 8:
                message.unbondingHeight = reader.int64();
                break;
              case 9:
                message.unbondingTime = timestamp_1.Timestamp.decode(reader, reader.uint32());
                break;
              case 10:
                message.commission = exports2.Commission.decode(reader, reader.uint32());
                break;
              case 11:
                message.minSelfDelegation = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseValidator);
          message.operatorAddress = object.operatorAddress !== void 0 && object.operatorAddress !== null ? String(object.operatorAddress) : "";
          message.consensusPubkey = object.consensusPubkey !== void 0 && object.consensusPubkey !== null ? any_1.Any.fromJSON(object.consensusPubkey) : void 0;
          message.jailed = object.jailed !== void 0 && object.jailed !== null ? Boolean(object.jailed) : false;
          message.status = object.status !== void 0 && object.status !== null ? bondStatusFromJSON(object.status) : 0;
          message.tokens = object.tokens !== void 0 && object.tokens !== null ? String(object.tokens) : "";
          message.delegatorShares = object.delegatorShares !== void 0 && object.delegatorShares !== null ? String(object.delegatorShares) : "";
          message.description = object.description !== void 0 && object.description !== null ? exports2.Description.fromJSON(object.description) : void 0;
          message.unbondingHeight = object.unbondingHeight !== void 0 && object.unbondingHeight !== null ? long_1.default.fromString(object.unbondingHeight) : long_1.default.ZERO;
          message.unbondingTime = object.unbondingTime !== void 0 && object.unbondingTime !== null ? fromJsonTimestamp(object.unbondingTime) : void 0;
          message.commission = object.commission !== void 0 && object.commission !== null ? exports2.Commission.fromJSON(object.commission) : void 0;
          message.minSelfDelegation = object.minSelfDelegation !== void 0 && object.minSelfDelegation !== null ? String(object.minSelfDelegation) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.operatorAddress !== void 0 && (obj.operatorAddress = message.operatorAddress);
          message.consensusPubkey !== void 0 && (obj.consensusPubkey = message.consensusPubkey ? any_1.Any.toJSON(message.consensusPubkey) : void 0);
          message.jailed !== void 0 && (obj.jailed = message.jailed);
          message.status !== void 0 && (obj.status = bondStatusToJSON(message.status));
          message.tokens !== void 0 && (obj.tokens = message.tokens);
          message.delegatorShares !== void 0 && (obj.delegatorShares = message.delegatorShares);
          message.description !== void 0 && (obj.description = message.description ? exports2.Description.toJSON(message.description) : void 0);
          message.unbondingHeight !== void 0 && (obj.unbondingHeight = (message.unbondingHeight || long_1.default.ZERO).toString());
          message.unbondingTime !== void 0 && (obj.unbondingTime = fromTimestamp(message.unbondingTime).toISOString());
          message.commission !== void 0 && (obj.commission = message.commission ? exports2.Commission.toJSON(message.commission) : void 0);
          message.minSelfDelegation !== void 0 && (obj.minSelfDelegation = message.minSelfDelegation);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d, _e, _f;
          const message = Object.assign({}, baseValidator);
          message.operatorAddress = (_a = object.operatorAddress) !== null && _a !== void 0 ? _a : "";
          message.consensusPubkey = object.consensusPubkey !== void 0 && object.consensusPubkey !== null ? any_1.Any.fromPartial(object.consensusPubkey) : void 0;
          message.jailed = (_b = object.jailed) !== null && _b !== void 0 ? _b : false;
          message.status = (_c = object.status) !== null && _c !== void 0 ? _c : 0;
          message.tokens = (_d = object.tokens) !== null && _d !== void 0 ? _d : "";
          message.delegatorShares = (_e = object.delegatorShares) !== null && _e !== void 0 ? _e : "";
          message.description = object.description !== void 0 && object.description !== null ? exports2.Description.fromPartial(object.description) : void 0;
          message.unbondingHeight = object.unbondingHeight !== void 0 && object.unbondingHeight !== null ? long_1.default.fromValue(object.unbondingHeight) : long_1.default.ZERO;
          message.unbondingTime = object.unbondingTime !== void 0 && object.unbondingTime !== null ? timestamp_1.Timestamp.fromPartial(object.unbondingTime) : void 0;
          message.commission = object.commission !== void 0 && object.commission !== null ? exports2.Commission.fromPartial(object.commission) : void 0;
          message.minSelfDelegation = (_f = object.minSelfDelegation) !== null && _f !== void 0 ? _f : "";
          return message;
        }
      };
      var baseValAddresses = { addresses: "" };
      exports2.ValAddresses = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.addresses) {
            writer.uint32(10).string(v);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseValAddresses);
          message.addresses = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.addresses.push(reader.string());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseValAddresses);
          message.addresses = ((_a = object.addresses) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.addresses) {
            obj.addresses = message.addresses.map((e) => e);
          } else {
            obj.addresses = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseValAddresses);
          message.addresses = ((_a = object.addresses) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
          return message;
        }
      };
      var baseDVPair = { delegatorAddress: "", validatorAddress: "" };
      exports2.DVPair = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
          }
          if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseDVPair);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.delegatorAddress = reader.string();
                break;
              case 2:
                message.validatorAddress = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseDVPair);
          message.delegatorAddress = object.delegatorAddress !== void 0 && object.delegatorAddress !== null ? String(object.delegatorAddress) : "";
          message.validatorAddress = object.validatorAddress !== void 0 && object.validatorAddress !== null ? String(object.validatorAddress) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.delegatorAddress !== void 0 && (obj.delegatorAddress = message.delegatorAddress);
          message.validatorAddress !== void 0 && (obj.validatorAddress = message.validatorAddress);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseDVPair);
          message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
          message.validatorAddress = (_b = object.validatorAddress) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseDVPairs = {};
      exports2.DVPairs = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.pairs) {
            exports2.DVPair.encode(v, writer.uint32(10).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseDVPairs);
          message.pairs = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.pairs.push(exports2.DVPair.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseDVPairs);
          message.pairs = ((_a = object.pairs) !== null && _a !== void 0 ? _a : []).map((e) => exports2.DVPair.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.pairs) {
            obj.pairs = message.pairs.map((e) => e ? exports2.DVPair.toJSON(e) : void 0);
          } else {
            obj.pairs = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseDVPairs);
          message.pairs = ((_a = object.pairs) === null || _a === void 0 ? void 0 : _a.map((e) => exports2.DVPair.fromPartial(e))) || [];
          return message;
        }
      };
      var baseDVVTriplet = { delegatorAddress: "", validatorSrcAddress: "", validatorDstAddress: "" };
      exports2.DVVTriplet = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
          }
          if (message.validatorSrcAddress !== "") {
            writer.uint32(18).string(message.validatorSrcAddress);
          }
          if (message.validatorDstAddress !== "") {
            writer.uint32(26).string(message.validatorDstAddress);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseDVVTriplet);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.delegatorAddress = reader.string();
                break;
              case 2:
                message.validatorSrcAddress = reader.string();
                break;
              case 3:
                message.validatorDstAddress = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseDVVTriplet);
          message.delegatorAddress = object.delegatorAddress !== void 0 && object.delegatorAddress !== null ? String(object.delegatorAddress) : "";
          message.validatorSrcAddress = object.validatorSrcAddress !== void 0 && object.validatorSrcAddress !== null ? String(object.validatorSrcAddress) : "";
          message.validatorDstAddress = object.validatorDstAddress !== void 0 && object.validatorDstAddress !== null ? String(object.validatorDstAddress) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.delegatorAddress !== void 0 && (obj.delegatorAddress = message.delegatorAddress);
          message.validatorSrcAddress !== void 0 && (obj.validatorSrcAddress = message.validatorSrcAddress);
          message.validatorDstAddress !== void 0 && (obj.validatorDstAddress = message.validatorDstAddress);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseDVVTriplet);
          message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
          message.validatorSrcAddress = (_b = object.validatorSrcAddress) !== null && _b !== void 0 ? _b : "";
          message.validatorDstAddress = (_c = object.validatorDstAddress) !== null && _c !== void 0 ? _c : "";
          return message;
        }
      };
      var baseDVVTriplets = {};
      exports2.DVVTriplets = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          for (const v of message.triplets) {
            exports2.DVVTriplet.encode(v, writer.uint32(10).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseDVVTriplets);
          message.triplets = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.triplets.push(exports2.DVVTriplet.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseDVVTriplets);
          message.triplets = ((_a = object.triplets) !== null && _a !== void 0 ? _a : []).map((e) => exports2.DVVTriplet.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          if (message.triplets) {
            obj.triplets = message.triplets.map((e) => e ? exports2.DVVTriplet.toJSON(e) : void 0);
          } else {
            obj.triplets = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseDVVTriplets);
          message.triplets = ((_a = object.triplets) === null || _a === void 0 ? void 0 : _a.map((e) => exports2.DVVTriplet.fromPartial(e))) || [];
          return message;
        }
      };
      var baseDelegation = { delegatorAddress: "", validatorAddress: "", shares: "" };
      exports2.Delegation = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
          }
          if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
          }
          if (message.shares !== "") {
            writer.uint32(26).string(message.shares);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseDelegation);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.delegatorAddress = reader.string();
                break;
              case 2:
                message.validatorAddress = reader.string();
                break;
              case 3:
                message.shares = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseDelegation);
          message.delegatorAddress = object.delegatorAddress !== void 0 && object.delegatorAddress !== null ? String(object.delegatorAddress) : "";
          message.validatorAddress = object.validatorAddress !== void 0 && object.validatorAddress !== null ? String(object.validatorAddress) : "";
          message.shares = object.shares !== void 0 && object.shares !== null ? String(object.shares) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.delegatorAddress !== void 0 && (obj.delegatorAddress = message.delegatorAddress);
          message.validatorAddress !== void 0 && (obj.validatorAddress = message.validatorAddress);
          message.shares !== void 0 && (obj.shares = message.shares);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseDelegation);
          message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
          message.validatorAddress = (_b = object.validatorAddress) !== null && _b !== void 0 ? _b : "";
          message.shares = (_c = object.shares) !== null && _c !== void 0 ? _c : "";
          return message;
        }
      };
      var baseUnbondingDelegation = { delegatorAddress: "", validatorAddress: "" };
      exports2.UnbondingDelegation = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
          }
          if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
          }
          for (const v of message.entries) {
            exports2.UnbondingDelegationEntry.encode(v, writer.uint32(26).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseUnbondingDelegation);
          message.entries = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.delegatorAddress = reader.string();
                break;
              case 2:
                message.validatorAddress = reader.string();
                break;
              case 3:
                message.entries.push(exports2.UnbondingDelegationEntry.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseUnbondingDelegation);
          message.delegatorAddress = object.delegatorAddress !== void 0 && object.delegatorAddress !== null ? String(object.delegatorAddress) : "";
          message.validatorAddress = object.validatorAddress !== void 0 && object.validatorAddress !== null ? String(object.validatorAddress) : "";
          message.entries = ((_a = object.entries) !== null && _a !== void 0 ? _a : []).map((e) => exports2.UnbondingDelegationEntry.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.delegatorAddress !== void 0 && (obj.delegatorAddress = message.delegatorAddress);
          message.validatorAddress !== void 0 && (obj.validatorAddress = message.validatorAddress);
          if (message.entries) {
            obj.entries = message.entries.map((e) => e ? exports2.UnbondingDelegationEntry.toJSON(e) : void 0);
          } else {
            obj.entries = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseUnbondingDelegation);
          message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
          message.validatorAddress = (_b = object.validatorAddress) !== null && _b !== void 0 ? _b : "";
          message.entries = ((_c = object.entries) === null || _c === void 0 ? void 0 : _c.map((e) => exports2.UnbondingDelegationEntry.fromPartial(e))) || [];
          return message;
        }
      };
      var baseUnbondingDelegationEntry = { creationHeight: long_1.default.ZERO, initialBalance: "", balance: "" };
      exports2.UnbondingDelegationEntry = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.creationHeight.isZero()) {
            writer.uint32(8).int64(message.creationHeight);
          }
          if (message.completionTime !== void 0) {
            timestamp_1.Timestamp.encode(message.completionTime, writer.uint32(18).fork()).ldelim();
          }
          if (message.initialBalance !== "") {
            writer.uint32(26).string(message.initialBalance);
          }
          if (message.balance !== "") {
            writer.uint32(34).string(message.balance);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseUnbondingDelegationEntry);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.creationHeight = reader.int64();
                break;
              case 2:
                message.completionTime = timestamp_1.Timestamp.decode(reader, reader.uint32());
                break;
              case 3:
                message.initialBalance = reader.string();
                break;
              case 4:
                message.balance = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseUnbondingDelegationEntry);
          message.creationHeight = object.creationHeight !== void 0 && object.creationHeight !== null ? long_1.default.fromString(object.creationHeight) : long_1.default.ZERO;
          message.completionTime = object.completionTime !== void 0 && object.completionTime !== null ? fromJsonTimestamp(object.completionTime) : void 0;
          message.initialBalance = object.initialBalance !== void 0 && object.initialBalance !== null ? String(object.initialBalance) : "";
          message.balance = object.balance !== void 0 && object.balance !== null ? String(object.balance) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.creationHeight !== void 0 && (obj.creationHeight = (message.creationHeight || long_1.default.ZERO).toString());
          message.completionTime !== void 0 && (obj.completionTime = fromTimestamp(message.completionTime).toISOString());
          message.initialBalance !== void 0 && (obj.initialBalance = message.initialBalance);
          message.balance !== void 0 && (obj.balance = message.balance);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseUnbondingDelegationEntry);
          message.creationHeight = object.creationHeight !== void 0 && object.creationHeight !== null ? long_1.default.fromValue(object.creationHeight) : long_1.default.ZERO;
          message.completionTime = object.completionTime !== void 0 && object.completionTime !== null ? timestamp_1.Timestamp.fromPartial(object.completionTime) : void 0;
          message.initialBalance = (_a = object.initialBalance) !== null && _a !== void 0 ? _a : "";
          message.balance = (_b = object.balance) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseRedelegationEntry = { creationHeight: long_1.default.ZERO, initialBalance: "", sharesDst: "" };
      exports2.RedelegationEntry = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.creationHeight.isZero()) {
            writer.uint32(8).int64(message.creationHeight);
          }
          if (message.completionTime !== void 0) {
            timestamp_1.Timestamp.encode(message.completionTime, writer.uint32(18).fork()).ldelim();
          }
          if (message.initialBalance !== "") {
            writer.uint32(26).string(message.initialBalance);
          }
          if (message.sharesDst !== "") {
            writer.uint32(34).string(message.sharesDst);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseRedelegationEntry);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.creationHeight = reader.int64();
                break;
              case 2:
                message.completionTime = timestamp_1.Timestamp.decode(reader, reader.uint32());
                break;
              case 3:
                message.initialBalance = reader.string();
                break;
              case 4:
                message.sharesDst = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseRedelegationEntry);
          message.creationHeight = object.creationHeight !== void 0 && object.creationHeight !== null ? long_1.default.fromString(object.creationHeight) : long_1.default.ZERO;
          message.completionTime = object.completionTime !== void 0 && object.completionTime !== null ? fromJsonTimestamp(object.completionTime) : void 0;
          message.initialBalance = object.initialBalance !== void 0 && object.initialBalance !== null ? String(object.initialBalance) : "";
          message.sharesDst = object.sharesDst !== void 0 && object.sharesDst !== null ? String(object.sharesDst) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.creationHeight !== void 0 && (obj.creationHeight = (message.creationHeight || long_1.default.ZERO).toString());
          message.completionTime !== void 0 && (obj.completionTime = fromTimestamp(message.completionTime).toISOString());
          message.initialBalance !== void 0 && (obj.initialBalance = message.initialBalance);
          message.sharesDst !== void 0 && (obj.sharesDst = message.sharesDst);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseRedelegationEntry);
          message.creationHeight = object.creationHeight !== void 0 && object.creationHeight !== null ? long_1.default.fromValue(object.creationHeight) : long_1.default.ZERO;
          message.completionTime = object.completionTime !== void 0 && object.completionTime !== null ? timestamp_1.Timestamp.fromPartial(object.completionTime) : void 0;
          message.initialBalance = (_a = object.initialBalance) !== null && _a !== void 0 ? _a : "";
          message.sharesDst = (_b = object.sharesDst) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseRedelegation = { delegatorAddress: "", validatorSrcAddress: "", validatorDstAddress: "" };
      exports2.Redelegation = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
          }
          if (message.validatorSrcAddress !== "") {
            writer.uint32(18).string(message.validatorSrcAddress);
          }
          if (message.validatorDstAddress !== "") {
            writer.uint32(26).string(message.validatorDstAddress);
          }
          for (const v of message.entries) {
            exports2.RedelegationEntry.encode(v, writer.uint32(34).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseRedelegation);
          message.entries = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.delegatorAddress = reader.string();
                break;
              case 2:
                message.validatorSrcAddress = reader.string();
                break;
              case 3:
                message.validatorDstAddress = reader.string();
                break;
              case 4:
                message.entries.push(exports2.RedelegationEntry.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseRedelegation);
          message.delegatorAddress = object.delegatorAddress !== void 0 && object.delegatorAddress !== null ? String(object.delegatorAddress) : "";
          message.validatorSrcAddress = object.validatorSrcAddress !== void 0 && object.validatorSrcAddress !== null ? String(object.validatorSrcAddress) : "";
          message.validatorDstAddress = object.validatorDstAddress !== void 0 && object.validatorDstAddress !== null ? String(object.validatorDstAddress) : "";
          message.entries = ((_a = object.entries) !== null && _a !== void 0 ? _a : []).map((e) => exports2.RedelegationEntry.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.delegatorAddress !== void 0 && (obj.delegatorAddress = message.delegatorAddress);
          message.validatorSrcAddress !== void 0 && (obj.validatorSrcAddress = message.validatorSrcAddress);
          message.validatorDstAddress !== void 0 && (obj.validatorDstAddress = message.validatorDstAddress);
          if (message.entries) {
            obj.entries = message.entries.map((e) => e ? exports2.RedelegationEntry.toJSON(e) : void 0);
          } else {
            obj.entries = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d;
          const message = Object.assign({}, baseRedelegation);
          message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
          message.validatorSrcAddress = (_b = object.validatorSrcAddress) !== null && _b !== void 0 ? _b : "";
          message.validatorDstAddress = (_c = object.validatorDstAddress) !== null && _c !== void 0 ? _c : "";
          message.entries = ((_d = object.entries) === null || _d === void 0 ? void 0 : _d.map((e) => exports2.RedelegationEntry.fromPartial(e))) || [];
          return message;
        }
      };
      var baseParams = { maxValidators: 0, maxEntries: 0, historicalEntries: 0, bondDenom: "" };
      exports2.Params = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.unbondingTime !== void 0) {
            duration_1.Duration.encode(message.unbondingTime, writer.uint32(10).fork()).ldelim();
          }
          if (message.maxValidators !== 0) {
            writer.uint32(16).uint32(message.maxValidators);
          }
          if (message.maxEntries !== 0) {
            writer.uint32(24).uint32(message.maxEntries);
          }
          if (message.historicalEntries !== 0) {
            writer.uint32(32).uint32(message.historicalEntries);
          }
          if (message.bondDenom !== "") {
            writer.uint32(42).string(message.bondDenom);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseParams);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.unbondingTime = duration_1.Duration.decode(reader, reader.uint32());
                break;
              case 2:
                message.maxValidators = reader.uint32();
                break;
              case 3:
                message.maxEntries = reader.uint32();
                break;
              case 4:
                message.historicalEntries = reader.uint32();
                break;
              case 5:
                message.bondDenom = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseParams);
          message.unbondingTime = object.unbondingTime !== void 0 && object.unbondingTime !== null ? duration_1.Duration.fromJSON(object.unbondingTime) : void 0;
          message.maxValidators = object.maxValidators !== void 0 && object.maxValidators !== null ? Number(object.maxValidators) : 0;
          message.maxEntries = object.maxEntries !== void 0 && object.maxEntries !== null ? Number(object.maxEntries) : 0;
          message.historicalEntries = object.historicalEntries !== void 0 && object.historicalEntries !== null ? Number(object.historicalEntries) : 0;
          message.bondDenom = object.bondDenom !== void 0 && object.bondDenom !== null ? String(object.bondDenom) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.unbondingTime !== void 0 && (obj.unbondingTime = message.unbondingTime ? duration_1.Duration.toJSON(message.unbondingTime) : void 0);
          message.maxValidators !== void 0 && (obj.maxValidators = message.maxValidators);
          message.maxEntries !== void 0 && (obj.maxEntries = message.maxEntries);
          message.historicalEntries !== void 0 && (obj.historicalEntries = message.historicalEntries);
          message.bondDenom !== void 0 && (obj.bondDenom = message.bondDenom);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d;
          const message = Object.assign({}, baseParams);
          message.unbondingTime = object.unbondingTime !== void 0 && object.unbondingTime !== null ? duration_1.Duration.fromPartial(object.unbondingTime) : void 0;
          message.maxValidators = (_a = object.maxValidators) !== null && _a !== void 0 ? _a : 0;
          message.maxEntries = (_b = object.maxEntries) !== null && _b !== void 0 ? _b : 0;
          message.historicalEntries = (_c = object.historicalEntries) !== null && _c !== void 0 ? _c : 0;
          message.bondDenom = (_d = object.bondDenom) !== null && _d !== void 0 ? _d : "";
          return message;
        }
      };
      var baseDelegationResponse = {};
      exports2.DelegationResponse = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.delegation !== void 0) {
            exports2.Delegation.encode(message.delegation, writer.uint32(10).fork()).ldelim();
          }
          if (message.balance !== void 0) {
            coin_1.Coin.encode(message.balance, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseDelegationResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.delegation = exports2.Delegation.decode(reader, reader.uint32());
                break;
              case 2:
                message.balance = coin_1.Coin.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseDelegationResponse);
          message.delegation = object.delegation !== void 0 && object.delegation !== null ? exports2.Delegation.fromJSON(object.delegation) : void 0;
          message.balance = object.balance !== void 0 && object.balance !== null ? coin_1.Coin.fromJSON(object.balance) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.delegation !== void 0 && (obj.delegation = message.delegation ? exports2.Delegation.toJSON(message.delegation) : void 0);
          message.balance !== void 0 && (obj.balance = message.balance ? coin_1.Coin.toJSON(message.balance) : void 0);
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseDelegationResponse);
          message.delegation = object.delegation !== void 0 && object.delegation !== null ? exports2.Delegation.fromPartial(object.delegation) : void 0;
          message.balance = object.balance !== void 0 && object.balance !== null ? coin_1.Coin.fromPartial(object.balance) : void 0;
          return message;
        }
      };
      var baseRedelegationEntryResponse = { balance: "" };
      exports2.RedelegationEntryResponse = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.redelegationEntry !== void 0) {
            exports2.RedelegationEntry.encode(message.redelegationEntry, writer.uint32(10).fork()).ldelim();
          }
          if (message.balance !== "") {
            writer.uint32(34).string(message.balance);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseRedelegationEntryResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.redelegationEntry = exports2.RedelegationEntry.decode(reader, reader.uint32());
                break;
              case 4:
                message.balance = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseRedelegationEntryResponse);
          message.redelegationEntry = object.redelegationEntry !== void 0 && object.redelegationEntry !== null ? exports2.RedelegationEntry.fromJSON(object.redelegationEntry) : void 0;
          message.balance = object.balance !== void 0 && object.balance !== null ? String(object.balance) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.redelegationEntry !== void 0 && (obj.redelegationEntry = message.redelegationEntry ? exports2.RedelegationEntry.toJSON(message.redelegationEntry) : void 0);
          message.balance !== void 0 && (obj.balance = message.balance);
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseRedelegationEntryResponse);
          message.redelegationEntry = object.redelegationEntry !== void 0 && object.redelegationEntry !== null ? exports2.RedelegationEntry.fromPartial(object.redelegationEntry) : void 0;
          message.balance = (_a = object.balance) !== null && _a !== void 0 ? _a : "";
          return message;
        }
      };
      var baseRedelegationResponse = {};
      exports2.RedelegationResponse = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.redelegation !== void 0) {
            exports2.Redelegation.encode(message.redelegation, writer.uint32(10).fork()).ldelim();
          }
          for (const v of message.entries) {
            exports2.RedelegationEntryResponse.encode(v, writer.uint32(18).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseRedelegationResponse);
          message.entries = [];
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.redelegation = exports2.Redelegation.decode(reader, reader.uint32());
                break;
              case 2:
                message.entries.push(exports2.RedelegationEntryResponse.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseRedelegationResponse);
          message.redelegation = object.redelegation !== void 0 && object.redelegation !== null ? exports2.Redelegation.fromJSON(object.redelegation) : void 0;
          message.entries = ((_a = object.entries) !== null && _a !== void 0 ? _a : []).map((e) => exports2.RedelegationEntryResponse.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.redelegation !== void 0 && (obj.redelegation = message.redelegation ? exports2.Redelegation.toJSON(message.redelegation) : void 0);
          if (message.entries) {
            obj.entries = message.entries.map((e) => e ? exports2.RedelegationEntryResponse.toJSON(e) : void 0);
          } else {
            obj.entries = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseRedelegationResponse);
          message.redelegation = object.redelegation !== void 0 && object.redelegation !== null ? exports2.Redelegation.fromPartial(object.redelegation) : void 0;
          message.entries = ((_a = object.entries) === null || _a === void 0 ? void 0 : _a.map((e) => exports2.RedelegationEntryResponse.fromPartial(e))) || [];
          return message;
        }
      };
      var basePool = { notBondedTokens: "", bondedTokens: "" };
      exports2.Pool = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.notBondedTokens !== "") {
            writer.uint32(10).string(message.notBondedTokens);
          }
          if (message.bondedTokens !== "") {
            writer.uint32(18).string(message.bondedTokens);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, basePool);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.notBondedTokens = reader.string();
                break;
              case 2:
                message.bondedTokens = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, basePool);
          message.notBondedTokens = object.notBondedTokens !== void 0 && object.notBondedTokens !== null ? String(object.notBondedTokens) : "";
          message.bondedTokens = object.bondedTokens !== void 0 && object.bondedTokens !== null ? String(object.bondedTokens) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.notBondedTokens !== void 0 && (obj.notBondedTokens = message.notBondedTokens);
          message.bondedTokens !== void 0 && (obj.bondedTokens = message.bondedTokens);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, basePool);
          message.notBondedTokens = (_a = object.notBondedTokens) !== null && _a !== void 0 ? _a : "";
          message.bondedTokens = (_b = object.bondedTokens) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      function toTimestamp(date) {
        const seconds = numberToLong(date.getTime() / 1e3);
        const nanos = date.getTime() % 1e3 * 1e6;
        return { seconds, nanos };
      }
      function fromTimestamp(t) {
        let millis = t.seconds.toNumber() * 1e3;
        millis += t.nanos / 1e6;
        return new Date(millis);
      }
      function fromJsonTimestamp(o) {
        if (o instanceof Date) {
          return toTimestamp(o);
        } else if (typeof o === "string") {
          return toTimestamp(new Date(o));
        } else {
          return timestamp_1.Timestamp.fromJSON(o);
        }
      }
      function numberToLong(number) {
        return long_1.default.fromNumber(number);
      }
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/cosmos/staking/v1beta1/tx.js
  var require_tx8 = __commonJS({
    "node_modules/cosmjs-types/cosmos/staking/v1beta1/tx.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.MsgClientImpl = exports2.MsgUndelegateResponse = exports2.MsgUndelegate = exports2.MsgBeginRedelegateResponse = exports2.MsgBeginRedelegate = exports2.MsgDelegateResponse = exports2.MsgDelegate = exports2.MsgEditValidatorResponse = exports2.MsgEditValidator = exports2.MsgCreateValidatorResponse = exports2.MsgCreateValidator = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var staking_1 = require_staking();
      var any_1 = require_any();
      var coin_1 = require_coin();
      var timestamp_1 = require_timestamp();
      exports2.protobufPackage = "cosmos.staking.v1beta1";
      var baseMsgCreateValidator = { minSelfDelegation: "", delegatorAddress: "", validatorAddress: "" };
      exports2.MsgCreateValidator = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.description !== void 0) {
            staking_1.Description.encode(message.description, writer.uint32(10).fork()).ldelim();
          }
          if (message.commission !== void 0) {
            staking_1.CommissionRates.encode(message.commission, writer.uint32(18).fork()).ldelim();
          }
          if (message.minSelfDelegation !== "") {
            writer.uint32(26).string(message.minSelfDelegation);
          }
          if (message.delegatorAddress !== "") {
            writer.uint32(34).string(message.delegatorAddress);
          }
          if (message.validatorAddress !== "") {
            writer.uint32(42).string(message.validatorAddress);
          }
          if (message.pubkey !== void 0) {
            any_1.Any.encode(message.pubkey, writer.uint32(50).fork()).ldelim();
          }
          if (message.value !== void 0) {
            coin_1.Coin.encode(message.value, writer.uint32(58).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgCreateValidator);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.description = staking_1.Description.decode(reader, reader.uint32());
                break;
              case 2:
                message.commission = staking_1.CommissionRates.decode(reader, reader.uint32());
                break;
              case 3:
                message.minSelfDelegation = reader.string();
                break;
              case 4:
                message.delegatorAddress = reader.string();
                break;
              case 5:
                message.validatorAddress = reader.string();
                break;
              case 6:
                message.pubkey = any_1.Any.decode(reader, reader.uint32());
                break;
              case 7:
                message.value = coin_1.Coin.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgCreateValidator);
          message.description = object.description !== void 0 && object.description !== null ? staking_1.Description.fromJSON(object.description) : void 0;
          message.commission = object.commission !== void 0 && object.commission !== null ? staking_1.CommissionRates.fromJSON(object.commission) : void 0;
          message.minSelfDelegation = object.minSelfDelegation !== void 0 && object.minSelfDelegation !== null ? String(object.minSelfDelegation) : "";
          message.delegatorAddress = object.delegatorAddress !== void 0 && object.delegatorAddress !== null ? String(object.delegatorAddress) : "";
          message.validatorAddress = object.validatorAddress !== void 0 && object.validatorAddress !== null ? String(object.validatorAddress) : "";
          message.pubkey = object.pubkey !== void 0 && object.pubkey !== null ? any_1.Any.fromJSON(object.pubkey) : void 0;
          message.value = object.value !== void 0 && object.value !== null ? coin_1.Coin.fromJSON(object.value) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.description !== void 0 && (obj.description = message.description ? staking_1.Description.toJSON(message.description) : void 0);
          message.commission !== void 0 && (obj.commission = message.commission ? staking_1.CommissionRates.toJSON(message.commission) : void 0);
          message.minSelfDelegation !== void 0 && (obj.minSelfDelegation = message.minSelfDelegation);
          message.delegatorAddress !== void 0 && (obj.delegatorAddress = message.delegatorAddress);
          message.validatorAddress !== void 0 && (obj.validatorAddress = message.validatorAddress);
          message.pubkey !== void 0 && (obj.pubkey = message.pubkey ? any_1.Any.toJSON(message.pubkey) : void 0);
          message.value !== void 0 && (obj.value = message.value ? coin_1.Coin.toJSON(message.value) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseMsgCreateValidator);
          message.description = object.description !== void 0 && object.description !== null ? staking_1.Description.fromPartial(object.description) : void 0;
          message.commission = object.commission !== void 0 && object.commission !== null ? staking_1.CommissionRates.fromPartial(object.commission) : void 0;
          message.minSelfDelegation = (_a = object.minSelfDelegation) !== null && _a !== void 0 ? _a : "";
          message.delegatorAddress = (_b = object.delegatorAddress) !== null && _b !== void 0 ? _b : "";
          message.validatorAddress = (_c = object.validatorAddress) !== null && _c !== void 0 ? _c : "";
          message.pubkey = object.pubkey !== void 0 && object.pubkey !== null ? any_1.Any.fromPartial(object.pubkey) : void 0;
          message.value = object.value !== void 0 && object.value !== null ? coin_1.Coin.fromPartial(object.value) : void 0;
          return message;
        }
      };
      var baseMsgCreateValidatorResponse = {};
      exports2.MsgCreateValidatorResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgCreateValidatorResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgCreateValidatorResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgCreateValidatorResponse);
          return message;
        }
      };
      var baseMsgEditValidator = { validatorAddress: "", commissionRate: "", minSelfDelegation: "" };
      exports2.MsgEditValidator = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.description !== void 0) {
            staking_1.Description.encode(message.description, writer.uint32(10).fork()).ldelim();
          }
          if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
          }
          if (message.commissionRate !== "") {
            writer.uint32(26).string(message.commissionRate);
          }
          if (message.minSelfDelegation !== "") {
            writer.uint32(34).string(message.minSelfDelegation);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgEditValidator);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.description = staking_1.Description.decode(reader, reader.uint32());
                break;
              case 2:
                message.validatorAddress = reader.string();
                break;
              case 3:
                message.commissionRate = reader.string();
                break;
              case 4:
                message.minSelfDelegation = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgEditValidator);
          message.description = object.description !== void 0 && object.description !== null ? staking_1.Description.fromJSON(object.description) : void 0;
          message.validatorAddress = object.validatorAddress !== void 0 && object.validatorAddress !== null ? String(object.validatorAddress) : "";
          message.commissionRate = object.commissionRate !== void 0 && object.commissionRate !== null ? String(object.commissionRate) : "";
          message.minSelfDelegation = object.minSelfDelegation !== void 0 && object.minSelfDelegation !== null ? String(object.minSelfDelegation) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.description !== void 0 && (obj.description = message.description ? staking_1.Description.toJSON(message.description) : void 0);
          message.validatorAddress !== void 0 && (obj.validatorAddress = message.validatorAddress);
          message.commissionRate !== void 0 && (obj.commissionRate = message.commissionRate);
          message.minSelfDelegation !== void 0 && (obj.minSelfDelegation = message.minSelfDelegation);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseMsgEditValidator);
          message.description = object.description !== void 0 && object.description !== null ? staking_1.Description.fromPartial(object.description) : void 0;
          message.validatorAddress = (_a = object.validatorAddress) !== null && _a !== void 0 ? _a : "";
          message.commissionRate = (_b = object.commissionRate) !== null && _b !== void 0 ? _b : "";
          message.minSelfDelegation = (_c = object.minSelfDelegation) !== null && _c !== void 0 ? _c : "";
          return message;
        }
      };
      var baseMsgEditValidatorResponse = {};
      exports2.MsgEditValidatorResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgEditValidatorResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgEditValidatorResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgEditValidatorResponse);
          return message;
        }
      };
      var baseMsgDelegate = { delegatorAddress: "", validatorAddress: "" };
      exports2.MsgDelegate = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
          }
          if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
          }
          if (message.amount !== void 0) {
            coin_1.Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgDelegate);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.delegatorAddress = reader.string();
                break;
              case 2:
                message.validatorAddress = reader.string();
                break;
              case 3:
                message.amount = coin_1.Coin.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgDelegate);
          message.delegatorAddress = object.delegatorAddress !== void 0 && object.delegatorAddress !== null ? String(object.delegatorAddress) : "";
          message.validatorAddress = object.validatorAddress !== void 0 && object.validatorAddress !== null ? String(object.validatorAddress) : "";
          message.amount = object.amount !== void 0 && object.amount !== null ? coin_1.Coin.fromJSON(object.amount) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.delegatorAddress !== void 0 && (obj.delegatorAddress = message.delegatorAddress);
          message.validatorAddress !== void 0 && (obj.validatorAddress = message.validatorAddress);
          message.amount !== void 0 && (obj.amount = message.amount ? coin_1.Coin.toJSON(message.amount) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgDelegate);
          message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
          message.validatorAddress = (_b = object.validatorAddress) !== null && _b !== void 0 ? _b : "";
          message.amount = object.amount !== void 0 && object.amount !== null ? coin_1.Coin.fromPartial(object.amount) : void 0;
          return message;
        }
      };
      var baseMsgDelegateResponse = {};
      exports2.MsgDelegateResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgDelegateResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgDelegateResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgDelegateResponse);
          return message;
        }
      };
      var baseMsgBeginRedelegate = {
        delegatorAddress: "",
        validatorSrcAddress: "",
        validatorDstAddress: ""
      };
      exports2.MsgBeginRedelegate = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
          }
          if (message.validatorSrcAddress !== "") {
            writer.uint32(18).string(message.validatorSrcAddress);
          }
          if (message.validatorDstAddress !== "") {
            writer.uint32(26).string(message.validatorDstAddress);
          }
          if (message.amount !== void 0) {
            coin_1.Coin.encode(message.amount, writer.uint32(34).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgBeginRedelegate);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.delegatorAddress = reader.string();
                break;
              case 2:
                message.validatorSrcAddress = reader.string();
                break;
              case 3:
                message.validatorDstAddress = reader.string();
                break;
              case 4:
                message.amount = coin_1.Coin.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgBeginRedelegate);
          message.delegatorAddress = object.delegatorAddress !== void 0 && object.delegatorAddress !== null ? String(object.delegatorAddress) : "";
          message.validatorSrcAddress = object.validatorSrcAddress !== void 0 && object.validatorSrcAddress !== null ? String(object.validatorSrcAddress) : "";
          message.validatorDstAddress = object.validatorDstAddress !== void 0 && object.validatorDstAddress !== null ? String(object.validatorDstAddress) : "";
          message.amount = object.amount !== void 0 && object.amount !== null ? coin_1.Coin.fromJSON(object.amount) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.delegatorAddress !== void 0 && (obj.delegatorAddress = message.delegatorAddress);
          message.validatorSrcAddress !== void 0 && (obj.validatorSrcAddress = message.validatorSrcAddress);
          message.validatorDstAddress !== void 0 && (obj.validatorDstAddress = message.validatorDstAddress);
          message.amount !== void 0 && (obj.amount = message.amount ? coin_1.Coin.toJSON(message.amount) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseMsgBeginRedelegate);
          message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
          message.validatorSrcAddress = (_b = object.validatorSrcAddress) !== null && _b !== void 0 ? _b : "";
          message.validatorDstAddress = (_c = object.validatorDstAddress) !== null && _c !== void 0 ? _c : "";
          message.amount = object.amount !== void 0 && object.amount !== null ? coin_1.Coin.fromPartial(object.amount) : void 0;
          return message;
        }
      };
      var baseMsgBeginRedelegateResponse = {};
      exports2.MsgBeginRedelegateResponse = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.completionTime !== void 0) {
            timestamp_1.Timestamp.encode(message.completionTime, writer.uint32(10).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgBeginRedelegateResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.completionTime = timestamp_1.Timestamp.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgBeginRedelegateResponse);
          message.completionTime = object.completionTime !== void 0 && object.completionTime !== null ? fromJsonTimestamp(object.completionTime) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.completionTime !== void 0 && (obj.completionTime = fromTimestamp(message.completionTime).toISOString());
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseMsgBeginRedelegateResponse);
          message.completionTime = object.completionTime !== void 0 && object.completionTime !== null ? timestamp_1.Timestamp.fromPartial(object.completionTime) : void 0;
          return message;
        }
      };
      var baseMsgUndelegate = { delegatorAddress: "", validatorAddress: "" };
      exports2.MsgUndelegate = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
          }
          if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
          }
          if (message.amount !== void 0) {
            coin_1.Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgUndelegate);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.delegatorAddress = reader.string();
                break;
              case 2:
                message.validatorAddress = reader.string();
                break;
              case 3:
                message.amount = coin_1.Coin.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgUndelegate);
          message.delegatorAddress = object.delegatorAddress !== void 0 && object.delegatorAddress !== null ? String(object.delegatorAddress) : "";
          message.validatorAddress = object.validatorAddress !== void 0 && object.validatorAddress !== null ? String(object.validatorAddress) : "";
          message.amount = object.amount !== void 0 && object.amount !== null ? coin_1.Coin.fromJSON(object.amount) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.delegatorAddress !== void 0 && (obj.delegatorAddress = message.delegatorAddress);
          message.validatorAddress !== void 0 && (obj.validatorAddress = message.validatorAddress);
          message.amount !== void 0 && (obj.amount = message.amount ? coin_1.Coin.toJSON(message.amount) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgUndelegate);
          message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
          message.validatorAddress = (_b = object.validatorAddress) !== null && _b !== void 0 ? _b : "";
          message.amount = object.amount !== void 0 && object.amount !== null ? coin_1.Coin.fromPartial(object.amount) : void 0;
          return message;
        }
      };
      var baseMsgUndelegateResponse = {};
      exports2.MsgUndelegateResponse = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.completionTime !== void 0) {
            timestamp_1.Timestamp.encode(message.completionTime, writer.uint32(10).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgUndelegateResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.completionTime = timestamp_1.Timestamp.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgUndelegateResponse);
          message.completionTime = object.completionTime !== void 0 && object.completionTime !== null ? fromJsonTimestamp(object.completionTime) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.completionTime !== void 0 && (obj.completionTime = fromTimestamp(message.completionTime).toISOString());
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseMsgUndelegateResponse);
          message.completionTime = object.completionTime !== void 0 && object.completionTime !== null ? timestamp_1.Timestamp.fromPartial(object.completionTime) : void 0;
          return message;
        }
      };
      var MsgClientImpl = class {
        constructor(rpc) {
          this.rpc = rpc;
          this.CreateValidator = this.CreateValidator.bind(this);
          this.EditValidator = this.EditValidator.bind(this);
          this.Delegate = this.Delegate.bind(this);
          this.BeginRedelegate = this.BeginRedelegate.bind(this);
          this.Undelegate = this.Undelegate.bind(this);
        }
        CreateValidator(request) {
          const data = exports2.MsgCreateValidator.encode(request).finish();
          const promise = this.rpc.request("cosmos.staking.v1beta1.Msg", "CreateValidator", data);
          return promise.then((data2) => exports2.MsgCreateValidatorResponse.decode(new minimal_1.default.Reader(data2)));
        }
        EditValidator(request) {
          const data = exports2.MsgEditValidator.encode(request).finish();
          const promise = this.rpc.request("cosmos.staking.v1beta1.Msg", "EditValidator", data);
          return promise.then((data2) => exports2.MsgEditValidatorResponse.decode(new minimal_1.default.Reader(data2)));
        }
        Delegate(request) {
          const data = exports2.MsgDelegate.encode(request).finish();
          const promise = this.rpc.request("cosmos.staking.v1beta1.Msg", "Delegate", data);
          return promise.then((data2) => exports2.MsgDelegateResponse.decode(new minimal_1.default.Reader(data2)));
        }
        BeginRedelegate(request) {
          const data = exports2.MsgBeginRedelegate.encode(request).finish();
          const promise = this.rpc.request("cosmos.staking.v1beta1.Msg", "BeginRedelegate", data);
          return promise.then((data2) => exports2.MsgBeginRedelegateResponse.decode(new minimal_1.default.Reader(data2)));
        }
        Undelegate(request) {
          const data = exports2.MsgUndelegate.encode(request).finish();
          const promise = this.rpc.request("cosmos.staking.v1beta1.Msg", "Undelegate", data);
          return promise.then((data2) => exports2.MsgUndelegateResponse.decode(new minimal_1.default.Reader(data2)));
        }
      };
      exports2.MsgClientImpl = MsgClientImpl;
      function toTimestamp(date) {
        const seconds = numberToLong(date.getTime() / 1e3);
        const nanos = date.getTime() % 1e3 * 1e6;
        return { seconds, nanos };
      }
      function fromTimestamp(t) {
        let millis = t.seconds.toNumber() * 1e3;
        millis += t.nanos / 1e6;
        return new Date(millis);
      }
      function fromJsonTimestamp(o) {
        if (o instanceof Date) {
          return toTimestamp(o);
        } else if (typeof o === "string") {
          return toTimestamp(new Date(o));
        } else {
          return timestamp_1.Timestamp.fromJSON(o);
        }
      }
      function numberToLong(number) {
        return long_1.default.fromNumber(number);
      }
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/cosmwasm/wasm/v1/types.js
  var require_types3 = __commonJS({
    "node_modules/cosmjs-types/cosmwasm/wasm/v1/types.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.Model = exports2.AbsoluteTxPosition = exports2.ContractCodeHistoryEntry = exports2.ContractInfo = exports2.CodeInfo = exports2.Params = exports2.AccessConfig = exports2.AccessTypeParam = exports2.contractCodeHistoryOperationTypeToJSON = exports2.contractCodeHistoryOperationTypeFromJSON = exports2.ContractCodeHistoryOperationType = exports2.accessTypeToJSON = exports2.accessTypeFromJSON = exports2.AccessType = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var any_1 = require_any();
      exports2.protobufPackage = "cosmwasm.wasm.v1";
      var AccessType;
      (function(AccessType2) {
        AccessType2[AccessType2["ACCESS_TYPE_UNSPECIFIED"] = 0] = "ACCESS_TYPE_UNSPECIFIED";
        AccessType2[AccessType2["ACCESS_TYPE_NOBODY"] = 1] = "ACCESS_TYPE_NOBODY";
        AccessType2[AccessType2["ACCESS_TYPE_ONLY_ADDRESS"] = 2] = "ACCESS_TYPE_ONLY_ADDRESS";
        AccessType2[AccessType2["ACCESS_TYPE_EVERYBODY"] = 3] = "ACCESS_TYPE_EVERYBODY";
        AccessType2[AccessType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
      })(AccessType = exports2.AccessType || (exports2.AccessType = {}));
      function accessTypeFromJSON(object) {
        switch (object) {
          case 0:
          case "ACCESS_TYPE_UNSPECIFIED":
            return AccessType.ACCESS_TYPE_UNSPECIFIED;
          case 1:
          case "ACCESS_TYPE_NOBODY":
            return AccessType.ACCESS_TYPE_NOBODY;
          case 2:
          case "ACCESS_TYPE_ONLY_ADDRESS":
            return AccessType.ACCESS_TYPE_ONLY_ADDRESS;
          case 3:
          case "ACCESS_TYPE_EVERYBODY":
            return AccessType.ACCESS_TYPE_EVERYBODY;
          case -1:
          case "UNRECOGNIZED":
          default:
            return AccessType.UNRECOGNIZED;
        }
      }
      exports2.accessTypeFromJSON = accessTypeFromJSON;
      function accessTypeToJSON(object) {
        switch (object) {
          case AccessType.ACCESS_TYPE_UNSPECIFIED:
            return "ACCESS_TYPE_UNSPECIFIED";
          case AccessType.ACCESS_TYPE_NOBODY:
            return "ACCESS_TYPE_NOBODY";
          case AccessType.ACCESS_TYPE_ONLY_ADDRESS:
            return "ACCESS_TYPE_ONLY_ADDRESS";
          case AccessType.ACCESS_TYPE_EVERYBODY:
            return "ACCESS_TYPE_EVERYBODY";
          default:
            return "UNKNOWN";
        }
      }
      exports2.accessTypeToJSON = accessTypeToJSON;
      var ContractCodeHistoryOperationType;
      (function(ContractCodeHistoryOperationType2) {
        ContractCodeHistoryOperationType2[ContractCodeHistoryOperationType2["CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED"] = 0] = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED";
        ContractCodeHistoryOperationType2[ContractCodeHistoryOperationType2["CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT"] = 1] = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT";
        ContractCodeHistoryOperationType2[ContractCodeHistoryOperationType2["CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE"] = 2] = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE";
        ContractCodeHistoryOperationType2[ContractCodeHistoryOperationType2["CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS"] = 3] = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS";
        ContractCodeHistoryOperationType2[ContractCodeHistoryOperationType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
      })(ContractCodeHistoryOperationType = exports2.ContractCodeHistoryOperationType || (exports2.ContractCodeHistoryOperationType = {}));
      function contractCodeHistoryOperationTypeFromJSON(object) {
        switch (object) {
          case 0:
          case "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED":
            return ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED;
          case 1:
          case "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT":
            return ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT;
          case 2:
          case "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE":
            return ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE;
          case 3:
          case "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS":
            return ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS;
          case -1:
          case "UNRECOGNIZED":
          default:
            return ContractCodeHistoryOperationType.UNRECOGNIZED;
        }
      }
      exports2.contractCodeHistoryOperationTypeFromJSON = contractCodeHistoryOperationTypeFromJSON;
      function contractCodeHistoryOperationTypeToJSON(object) {
        switch (object) {
          case ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED:
            return "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED";
          case ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT:
            return "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT";
          case ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE:
            return "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE";
          case ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS:
            return "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS";
          default:
            return "UNKNOWN";
        }
      }
      exports2.contractCodeHistoryOperationTypeToJSON = contractCodeHistoryOperationTypeToJSON;
      var baseAccessTypeParam = { value: 0 };
      exports2.AccessTypeParam = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.value !== 0) {
            writer.uint32(8).int32(message.value);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseAccessTypeParam);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.value = reader.int32();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseAccessTypeParam);
          message.value = object.value !== void 0 && object.value !== null ? accessTypeFromJSON(object.value) : 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.value !== void 0 && (obj.value = accessTypeToJSON(message.value));
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseAccessTypeParam);
          message.value = (_a = object.value) !== null && _a !== void 0 ? _a : 0;
          return message;
        }
      };
      var baseAccessConfig = { permission: 0, address: "" };
      exports2.AccessConfig = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.permission !== 0) {
            writer.uint32(8).int32(message.permission);
          }
          if (message.address !== "") {
            writer.uint32(18).string(message.address);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseAccessConfig);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.permission = reader.int32();
                break;
              case 2:
                message.address = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseAccessConfig);
          message.permission = object.permission !== void 0 && object.permission !== null ? accessTypeFromJSON(object.permission) : 0;
          message.address = object.address !== void 0 && object.address !== null ? String(object.address) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.permission !== void 0 && (obj.permission = accessTypeToJSON(message.permission));
          message.address !== void 0 && (obj.address = message.address);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseAccessConfig);
          message.permission = (_a = object.permission) !== null && _a !== void 0 ? _a : 0;
          message.address = (_b = object.address) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseParams = { instantiateDefaultPermission: 0, maxWasmCodeSize: long_1.default.UZERO };
      exports2.Params = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.codeUploadAccess !== void 0) {
            exports2.AccessConfig.encode(message.codeUploadAccess, writer.uint32(10).fork()).ldelim();
          }
          if (message.instantiateDefaultPermission !== 0) {
            writer.uint32(16).int32(message.instantiateDefaultPermission);
          }
          if (!message.maxWasmCodeSize.isZero()) {
            writer.uint32(24).uint64(message.maxWasmCodeSize);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseParams);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.codeUploadAccess = exports2.AccessConfig.decode(reader, reader.uint32());
                break;
              case 2:
                message.instantiateDefaultPermission = reader.int32();
                break;
              case 3:
                message.maxWasmCodeSize = reader.uint64();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseParams);
          message.codeUploadAccess = object.codeUploadAccess !== void 0 && object.codeUploadAccess !== null ? exports2.AccessConfig.fromJSON(object.codeUploadAccess) : void 0;
          message.instantiateDefaultPermission = object.instantiateDefaultPermission !== void 0 && object.instantiateDefaultPermission !== null ? accessTypeFromJSON(object.instantiateDefaultPermission) : 0;
          message.maxWasmCodeSize = object.maxWasmCodeSize !== void 0 && object.maxWasmCodeSize !== null ? long_1.default.fromString(object.maxWasmCodeSize) : long_1.default.UZERO;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.codeUploadAccess !== void 0 && (obj.codeUploadAccess = message.codeUploadAccess ? exports2.AccessConfig.toJSON(message.codeUploadAccess) : void 0);
          message.instantiateDefaultPermission !== void 0 && (obj.instantiateDefaultPermission = accessTypeToJSON(message.instantiateDefaultPermission));
          message.maxWasmCodeSize !== void 0 && (obj.maxWasmCodeSize = (message.maxWasmCodeSize || long_1.default.UZERO).toString());
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseParams);
          message.codeUploadAccess = object.codeUploadAccess !== void 0 && object.codeUploadAccess !== null ? exports2.AccessConfig.fromPartial(object.codeUploadAccess) : void 0;
          message.instantiateDefaultPermission = (_a = object.instantiateDefaultPermission) !== null && _a !== void 0 ? _a : 0;
          message.maxWasmCodeSize = object.maxWasmCodeSize !== void 0 && object.maxWasmCodeSize !== null ? long_1.default.fromValue(object.maxWasmCodeSize) : long_1.default.UZERO;
          return message;
        }
      };
      var baseCodeInfo = { creator: "" };
      exports2.CodeInfo = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.codeHash.length !== 0) {
            writer.uint32(10).bytes(message.codeHash);
          }
          if (message.creator !== "") {
            writer.uint32(18).string(message.creator);
          }
          if (message.instantiateConfig !== void 0) {
            exports2.AccessConfig.encode(message.instantiateConfig, writer.uint32(42).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseCodeInfo);
          message.codeHash = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.codeHash = reader.bytes();
                break;
              case 2:
                message.creator = reader.string();
                break;
              case 5:
                message.instantiateConfig = exports2.AccessConfig.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseCodeInfo);
          message.codeHash = object.codeHash !== void 0 && object.codeHash !== null ? bytesFromBase64(object.codeHash) : new Uint8Array();
          message.creator = object.creator !== void 0 && object.creator !== null ? String(object.creator) : "";
          message.instantiateConfig = object.instantiateConfig !== void 0 && object.instantiateConfig !== null ? exports2.AccessConfig.fromJSON(object.instantiateConfig) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.codeHash !== void 0 && (obj.codeHash = base64FromBytes(message.codeHash !== void 0 ? message.codeHash : new Uint8Array()));
          message.creator !== void 0 && (obj.creator = message.creator);
          message.instantiateConfig !== void 0 && (obj.instantiateConfig = message.instantiateConfig ? exports2.AccessConfig.toJSON(message.instantiateConfig) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseCodeInfo);
          message.codeHash = (_a = object.codeHash) !== null && _a !== void 0 ? _a : new Uint8Array();
          message.creator = (_b = object.creator) !== null && _b !== void 0 ? _b : "";
          message.instantiateConfig = object.instantiateConfig !== void 0 && object.instantiateConfig !== null ? exports2.AccessConfig.fromPartial(object.instantiateConfig) : void 0;
          return message;
        }
      };
      var baseContractInfo = { codeId: long_1.default.UZERO, creator: "", admin: "", label: "", ibcPortId: "" };
      exports2.ContractInfo = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.codeId.isZero()) {
            writer.uint32(8).uint64(message.codeId);
          }
          if (message.creator !== "") {
            writer.uint32(18).string(message.creator);
          }
          if (message.admin !== "") {
            writer.uint32(26).string(message.admin);
          }
          if (message.label !== "") {
            writer.uint32(34).string(message.label);
          }
          if (message.created !== void 0) {
            exports2.AbsoluteTxPosition.encode(message.created, writer.uint32(42).fork()).ldelim();
          }
          if (message.ibcPortId !== "") {
            writer.uint32(50).string(message.ibcPortId);
          }
          if (message.extension !== void 0) {
            any_1.Any.encode(message.extension, writer.uint32(58).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseContractInfo);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.codeId = reader.uint64();
                break;
              case 2:
                message.creator = reader.string();
                break;
              case 3:
                message.admin = reader.string();
                break;
              case 4:
                message.label = reader.string();
                break;
              case 5:
                message.created = exports2.AbsoluteTxPosition.decode(reader, reader.uint32());
                break;
              case 6:
                message.ibcPortId = reader.string();
                break;
              case 7:
                message.extension = any_1.Any.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseContractInfo);
          message.codeId = object.codeId !== void 0 && object.codeId !== null ? long_1.default.fromString(object.codeId) : long_1.default.UZERO;
          message.creator = object.creator !== void 0 && object.creator !== null ? String(object.creator) : "";
          message.admin = object.admin !== void 0 && object.admin !== null ? String(object.admin) : "";
          message.label = object.label !== void 0 && object.label !== null ? String(object.label) : "";
          message.created = object.created !== void 0 && object.created !== null ? exports2.AbsoluteTxPosition.fromJSON(object.created) : void 0;
          message.ibcPortId = object.ibcPortId !== void 0 && object.ibcPortId !== null ? String(object.ibcPortId) : "";
          message.extension = object.extension !== void 0 && object.extension !== null ? any_1.Any.fromJSON(object.extension) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.codeId !== void 0 && (obj.codeId = (message.codeId || long_1.default.UZERO).toString());
          message.creator !== void 0 && (obj.creator = message.creator);
          message.admin !== void 0 && (obj.admin = message.admin);
          message.label !== void 0 && (obj.label = message.label);
          message.created !== void 0 && (obj.created = message.created ? exports2.AbsoluteTxPosition.toJSON(message.created) : void 0);
          message.ibcPortId !== void 0 && (obj.ibcPortId = message.ibcPortId);
          message.extension !== void 0 && (obj.extension = message.extension ? any_1.Any.toJSON(message.extension) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d;
          const message = Object.assign({}, baseContractInfo);
          message.codeId = object.codeId !== void 0 && object.codeId !== null ? long_1.default.fromValue(object.codeId) : long_1.default.UZERO;
          message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
          message.admin = (_b = object.admin) !== null && _b !== void 0 ? _b : "";
          message.label = (_c = object.label) !== null && _c !== void 0 ? _c : "";
          message.created = object.created !== void 0 && object.created !== null ? exports2.AbsoluteTxPosition.fromPartial(object.created) : void 0;
          message.ibcPortId = (_d = object.ibcPortId) !== null && _d !== void 0 ? _d : "";
          message.extension = object.extension !== void 0 && object.extension !== null ? any_1.Any.fromPartial(object.extension) : void 0;
          return message;
        }
      };
      var baseContractCodeHistoryEntry = { operation: 0, codeId: long_1.default.UZERO };
      exports2.ContractCodeHistoryEntry = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.operation !== 0) {
            writer.uint32(8).int32(message.operation);
          }
          if (!message.codeId.isZero()) {
            writer.uint32(16).uint64(message.codeId);
          }
          if (message.updated !== void 0) {
            exports2.AbsoluteTxPosition.encode(message.updated, writer.uint32(26).fork()).ldelim();
          }
          if (message.msg.length !== 0) {
            writer.uint32(34).bytes(message.msg);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseContractCodeHistoryEntry);
          message.msg = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.operation = reader.int32();
                break;
              case 2:
                message.codeId = reader.uint64();
                break;
              case 3:
                message.updated = exports2.AbsoluteTxPosition.decode(reader, reader.uint32());
                break;
              case 4:
                message.msg = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseContractCodeHistoryEntry);
          message.operation = object.operation !== void 0 && object.operation !== null ? contractCodeHistoryOperationTypeFromJSON(object.operation) : 0;
          message.codeId = object.codeId !== void 0 && object.codeId !== null ? long_1.default.fromString(object.codeId) : long_1.default.UZERO;
          message.updated = object.updated !== void 0 && object.updated !== null ? exports2.AbsoluteTxPosition.fromJSON(object.updated) : void 0;
          message.msg = object.msg !== void 0 && object.msg !== null ? bytesFromBase64(object.msg) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.operation !== void 0 && (obj.operation = contractCodeHistoryOperationTypeToJSON(message.operation));
          message.codeId !== void 0 && (obj.codeId = (message.codeId || long_1.default.UZERO).toString());
          message.updated !== void 0 && (obj.updated = message.updated ? exports2.AbsoluteTxPosition.toJSON(message.updated) : void 0);
          message.msg !== void 0 && (obj.msg = base64FromBytes(message.msg !== void 0 ? message.msg : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseContractCodeHistoryEntry);
          message.operation = (_a = object.operation) !== null && _a !== void 0 ? _a : 0;
          message.codeId = object.codeId !== void 0 && object.codeId !== null ? long_1.default.fromValue(object.codeId) : long_1.default.UZERO;
          message.updated = object.updated !== void 0 && object.updated !== null ? exports2.AbsoluteTxPosition.fromPartial(object.updated) : void 0;
          message.msg = (_b = object.msg) !== null && _b !== void 0 ? _b : new Uint8Array();
          return message;
        }
      };
      var baseAbsoluteTxPosition = { blockHeight: long_1.default.UZERO, txIndex: long_1.default.UZERO };
      exports2.AbsoluteTxPosition = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.blockHeight.isZero()) {
            writer.uint32(8).uint64(message.blockHeight);
          }
          if (!message.txIndex.isZero()) {
            writer.uint32(16).uint64(message.txIndex);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseAbsoluteTxPosition);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.blockHeight = reader.uint64();
                break;
              case 2:
                message.txIndex = reader.uint64();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseAbsoluteTxPosition);
          message.blockHeight = object.blockHeight !== void 0 && object.blockHeight !== null ? long_1.default.fromString(object.blockHeight) : long_1.default.UZERO;
          message.txIndex = object.txIndex !== void 0 && object.txIndex !== null ? long_1.default.fromString(object.txIndex) : long_1.default.UZERO;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.blockHeight !== void 0 && (obj.blockHeight = (message.blockHeight || long_1.default.UZERO).toString());
          message.txIndex !== void 0 && (obj.txIndex = (message.txIndex || long_1.default.UZERO).toString());
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseAbsoluteTxPosition);
          message.blockHeight = object.blockHeight !== void 0 && object.blockHeight !== null ? long_1.default.fromValue(object.blockHeight) : long_1.default.UZERO;
          message.txIndex = object.txIndex !== void 0 && object.txIndex !== null ? long_1.default.fromValue(object.txIndex) : long_1.default.UZERO;
          return message;
        }
      };
      var baseModel = {};
      exports2.Model = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
          }
          if (message.value.length !== 0) {
            writer.uint32(18).bytes(message.value);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseModel);
          message.key = new Uint8Array();
          message.value = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.key = reader.bytes();
                break;
              case 2:
                message.value = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseModel);
          message.key = object.key !== void 0 && object.key !== null ? bytesFromBase64(object.key) : new Uint8Array();
          message.value = object.value !== void 0 && object.value !== null ? bytesFromBase64(object.value) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.key !== void 0 && (obj.key = base64FromBytes(message.key !== void 0 ? message.key : new Uint8Array()));
          message.value !== void 0 && (obj.value = base64FromBytes(message.value !== void 0 ? message.value : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseModel);
          message.key = (_a = object.key) !== null && _a !== void 0 ? _a : new Uint8Array();
          message.value = (_b = object.value) !== null && _b !== void 0 ? _b : new Uint8Array();
          return message;
        }
      };
      var globalThis = (() => {
        if (typeof globalThis !== "undefined")
          return globalThis;
        if (typeof self !== "undefined")
          return self;
        if (typeof window !== "undefined")
          return window;
        if (typeof global !== "undefined")
          return global;
        throw "Unable to locate global object";
      })();
      var atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
      function bytesFromBase64(b64) {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
          arr[i] = bin.charCodeAt(i);
        }
        return arr;
      }
      var btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
      function base64FromBytes(arr) {
        const bin = [];
        for (const byte of arr) {
          bin.push(String.fromCharCode(byte));
        }
        return btoa(bin.join(""));
      }
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // node_modules/cosmjs-types/cosmwasm/wasm/v1/tx.js
  var require_tx9 = __commonJS({
    "node_modules/cosmjs-types/cosmwasm/wasm/v1/tx.js"(exports2) {
      "use strict";
      var __importDefault = exports2 && exports2.__importDefault || function(mod2) {
        return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.MsgClientImpl = exports2.MsgClearAdminResponse = exports2.MsgClearAdmin = exports2.MsgUpdateAdminResponse = exports2.MsgUpdateAdmin = exports2.MsgMigrateContractResponse = exports2.MsgMigrateContract = exports2.MsgExecuteContractResponse = exports2.MsgExecuteContract = exports2.MsgInstantiateContractResponse = exports2.MsgInstantiateContract = exports2.MsgStoreCodeResponse = exports2.MsgStoreCode = exports2.protobufPackage = void 0;
      var long_1 = __importDefault(require_long());
      var minimal_1 = __importDefault(require_minimal2());
      var types_1 = require_types3();
      var coin_1 = require_coin();
      exports2.protobufPackage = "cosmwasm.wasm.v1";
      var baseMsgStoreCode = { sender: "" };
      exports2.MsgStoreCode = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
          }
          if (message.wasmByteCode.length !== 0) {
            writer.uint32(18).bytes(message.wasmByteCode);
          }
          if (message.instantiatePermission !== void 0) {
            types_1.AccessConfig.encode(message.instantiatePermission, writer.uint32(42).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgStoreCode);
          message.wasmByteCode = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.sender = reader.string();
                break;
              case 2:
                message.wasmByteCode = reader.bytes();
                break;
              case 5:
                message.instantiatePermission = types_1.AccessConfig.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgStoreCode);
          message.sender = object.sender !== void 0 && object.sender !== null ? String(object.sender) : "";
          message.wasmByteCode = object.wasmByteCode !== void 0 && object.wasmByteCode !== null ? bytesFromBase64(object.wasmByteCode) : new Uint8Array();
          message.instantiatePermission = object.instantiatePermission !== void 0 && object.instantiatePermission !== null ? types_1.AccessConfig.fromJSON(object.instantiatePermission) : void 0;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.sender !== void 0 && (obj.sender = message.sender);
          message.wasmByteCode !== void 0 && (obj.wasmByteCode = base64FromBytes(message.wasmByteCode !== void 0 ? message.wasmByteCode : new Uint8Array()));
          message.instantiatePermission !== void 0 && (obj.instantiatePermission = message.instantiatePermission ? types_1.AccessConfig.toJSON(message.instantiatePermission) : void 0);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgStoreCode);
          message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
          message.wasmByteCode = (_b = object.wasmByteCode) !== null && _b !== void 0 ? _b : new Uint8Array();
          message.instantiatePermission = object.instantiatePermission !== void 0 && object.instantiatePermission !== null ? types_1.AccessConfig.fromPartial(object.instantiatePermission) : void 0;
          return message;
        }
      };
      var baseMsgStoreCodeResponse = { codeId: long_1.default.UZERO };
      exports2.MsgStoreCodeResponse = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (!message.codeId.isZero()) {
            writer.uint32(8).uint64(message.codeId);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgStoreCodeResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.codeId = reader.uint64();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgStoreCodeResponse);
          message.codeId = object.codeId !== void 0 && object.codeId !== null ? long_1.default.fromString(object.codeId) : long_1.default.UZERO;
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.codeId !== void 0 && (obj.codeId = (message.codeId || long_1.default.UZERO).toString());
          return obj;
        },
        fromPartial(object) {
          const message = Object.assign({}, baseMsgStoreCodeResponse);
          message.codeId = object.codeId !== void 0 && object.codeId !== null ? long_1.default.fromValue(object.codeId) : long_1.default.UZERO;
          return message;
        }
      };
      var baseMsgInstantiateContract = { sender: "", admin: "", codeId: long_1.default.UZERO, label: "" };
      exports2.MsgInstantiateContract = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
          }
          if (message.admin !== "") {
            writer.uint32(18).string(message.admin);
          }
          if (!message.codeId.isZero()) {
            writer.uint32(24).uint64(message.codeId);
          }
          if (message.label !== "") {
            writer.uint32(34).string(message.label);
          }
          if (message.msg.length !== 0) {
            writer.uint32(42).bytes(message.msg);
          }
          for (const v of message.funds) {
            coin_1.Coin.encode(v, writer.uint32(50).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgInstantiateContract);
          message.funds = [];
          message.msg = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.sender = reader.string();
                break;
              case 2:
                message.admin = reader.string();
                break;
              case 3:
                message.codeId = reader.uint64();
                break;
              case 4:
                message.label = reader.string();
                break;
              case 5:
                message.msg = reader.bytes();
                break;
              case 6:
                message.funds.push(coin_1.Coin.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseMsgInstantiateContract);
          message.sender = object.sender !== void 0 && object.sender !== null ? String(object.sender) : "";
          message.admin = object.admin !== void 0 && object.admin !== null ? String(object.admin) : "";
          message.codeId = object.codeId !== void 0 && object.codeId !== null ? long_1.default.fromString(object.codeId) : long_1.default.UZERO;
          message.label = object.label !== void 0 && object.label !== null ? String(object.label) : "";
          message.msg = object.msg !== void 0 && object.msg !== null ? bytesFromBase64(object.msg) : new Uint8Array();
          message.funds = ((_a = object.funds) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.sender !== void 0 && (obj.sender = message.sender);
          message.admin !== void 0 && (obj.admin = message.admin);
          message.codeId !== void 0 && (obj.codeId = (message.codeId || long_1.default.UZERO).toString());
          message.label !== void 0 && (obj.label = message.label);
          message.msg !== void 0 && (obj.msg = base64FromBytes(message.msg !== void 0 ? message.msg : new Uint8Array()));
          if (message.funds) {
            obj.funds = message.funds.map((e) => e ? coin_1.Coin.toJSON(e) : void 0);
          } else {
            obj.funds = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d, _e;
          const message = Object.assign({}, baseMsgInstantiateContract);
          message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
          message.admin = (_b = object.admin) !== null && _b !== void 0 ? _b : "";
          message.codeId = object.codeId !== void 0 && object.codeId !== null ? long_1.default.fromValue(object.codeId) : long_1.default.UZERO;
          message.label = (_c = object.label) !== null && _c !== void 0 ? _c : "";
          message.msg = (_d = object.msg) !== null && _d !== void 0 ? _d : new Uint8Array();
          message.funds = ((_e = object.funds) === null || _e === void 0 ? void 0 : _e.map((e) => coin_1.Coin.fromPartial(e))) || [];
          return message;
        }
      };
      var baseMsgInstantiateContractResponse = { address: "" };
      exports2.MsgInstantiateContractResponse = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.address !== "") {
            writer.uint32(10).string(message.address);
          }
          if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgInstantiateContractResponse);
          message.data = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.address = reader.string();
                break;
              case 2:
                message.data = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgInstantiateContractResponse);
          message.address = object.address !== void 0 && object.address !== null ? String(object.address) : "";
          message.data = object.data !== void 0 && object.data !== null ? bytesFromBase64(object.data) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.address !== void 0 && (obj.address = message.address);
          message.data !== void 0 && (obj.data = base64FromBytes(message.data !== void 0 ? message.data : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgInstantiateContractResponse);
          message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
          message.data = (_b = object.data) !== null && _b !== void 0 ? _b : new Uint8Array();
          return message;
        }
      };
      var baseMsgExecuteContract = { sender: "", contract: "" };
      exports2.MsgExecuteContract = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
          }
          if (message.contract !== "") {
            writer.uint32(18).string(message.contract);
          }
          if (message.msg.length !== 0) {
            writer.uint32(26).bytes(message.msg);
          }
          for (const v of message.funds) {
            coin_1.Coin.encode(v, writer.uint32(42).fork()).ldelim();
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgExecuteContract);
          message.funds = [];
          message.msg = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.sender = reader.string();
                break;
              case 2:
                message.contract = reader.string();
                break;
              case 3:
                message.msg = reader.bytes();
                break;
              case 5:
                message.funds.push(coin_1.Coin.decode(reader, reader.uint32()));
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          var _a;
          const message = Object.assign({}, baseMsgExecuteContract);
          message.sender = object.sender !== void 0 && object.sender !== null ? String(object.sender) : "";
          message.contract = object.contract !== void 0 && object.contract !== null ? String(object.contract) : "";
          message.msg = object.msg !== void 0 && object.msg !== null ? bytesFromBase64(object.msg) : new Uint8Array();
          message.funds = ((_a = object.funds) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.sender !== void 0 && (obj.sender = message.sender);
          message.contract !== void 0 && (obj.contract = message.contract);
          message.msg !== void 0 && (obj.msg = base64FromBytes(message.msg !== void 0 ? message.msg : new Uint8Array()));
          if (message.funds) {
            obj.funds = message.funds.map((e) => e ? coin_1.Coin.toJSON(e) : void 0);
          } else {
            obj.funds = [];
          }
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c, _d;
          const message = Object.assign({}, baseMsgExecuteContract);
          message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
          message.contract = (_b = object.contract) !== null && _b !== void 0 ? _b : "";
          message.msg = (_c = object.msg) !== null && _c !== void 0 ? _c : new Uint8Array();
          message.funds = ((_d = object.funds) === null || _d === void 0 ? void 0 : _d.map((e) => coin_1.Coin.fromPartial(e))) || [];
          return message;
        }
      };
      var baseMsgExecuteContractResponse = {};
      exports2.MsgExecuteContractResponse = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgExecuteContractResponse);
          message.data = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.data = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgExecuteContractResponse);
          message.data = object.data !== void 0 && object.data !== null ? bytesFromBase64(object.data) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.data !== void 0 && (obj.data = base64FromBytes(message.data !== void 0 ? message.data : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseMsgExecuteContractResponse);
          message.data = (_a = object.data) !== null && _a !== void 0 ? _a : new Uint8Array();
          return message;
        }
      };
      var baseMsgMigrateContract = { sender: "", contract: "", codeId: long_1.default.UZERO };
      exports2.MsgMigrateContract = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
          }
          if (message.contract !== "") {
            writer.uint32(18).string(message.contract);
          }
          if (!message.codeId.isZero()) {
            writer.uint32(24).uint64(message.codeId);
          }
          if (message.msg.length !== 0) {
            writer.uint32(34).bytes(message.msg);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgMigrateContract);
          message.msg = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.sender = reader.string();
                break;
              case 2:
                message.contract = reader.string();
                break;
              case 3:
                message.codeId = reader.uint64();
                break;
              case 4:
                message.msg = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgMigrateContract);
          message.sender = object.sender !== void 0 && object.sender !== null ? String(object.sender) : "";
          message.contract = object.contract !== void 0 && object.contract !== null ? String(object.contract) : "";
          message.codeId = object.codeId !== void 0 && object.codeId !== null ? long_1.default.fromString(object.codeId) : long_1.default.UZERO;
          message.msg = object.msg !== void 0 && object.msg !== null ? bytesFromBase64(object.msg) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.sender !== void 0 && (obj.sender = message.sender);
          message.contract !== void 0 && (obj.contract = message.contract);
          message.codeId !== void 0 && (obj.codeId = (message.codeId || long_1.default.UZERO).toString());
          message.msg !== void 0 && (obj.msg = base64FromBytes(message.msg !== void 0 ? message.msg : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseMsgMigrateContract);
          message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
          message.contract = (_b = object.contract) !== null && _b !== void 0 ? _b : "";
          message.codeId = object.codeId !== void 0 && object.codeId !== null ? long_1.default.fromValue(object.codeId) : long_1.default.UZERO;
          message.msg = (_c = object.msg) !== null && _c !== void 0 ? _c : new Uint8Array();
          return message;
        }
      };
      var baseMsgMigrateContractResponse = {};
      exports2.MsgMigrateContractResponse = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgMigrateContractResponse);
          message.data = new Uint8Array();
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.data = reader.bytes();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgMigrateContractResponse);
          message.data = object.data !== void 0 && object.data !== null ? bytesFromBase64(object.data) : new Uint8Array();
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.data !== void 0 && (obj.data = base64FromBytes(message.data !== void 0 ? message.data : new Uint8Array()));
          return obj;
        },
        fromPartial(object) {
          var _a;
          const message = Object.assign({}, baseMsgMigrateContractResponse);
          message.data = (_a = object.data) !== null && _a !== void 0 ? _a : new Uint8Array();
          return message;
        }
      };
      var baseMsgUpdateAdmin = { sender: "", newAdmin: "", contract: "" };
      exports2.MsgUpdateAdmin = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
          }
          if (message.newAdmin !== "") {
            writer.uint32(18).string(message.newAdmin);
          }
          if (message.contract !== "") {
            writer.uint32(26).string(message.contract);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgUpdateAdmin);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.sender = reader.string();
                break;
              case 2:
                message.newAdmin = reader.string();
                break;
              case 3:
                message.contract = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgUpdateAdmin);
          message.sender = object.sender !== void 0 && object.sender !== null ? String(object.sender) : "";
          message.newAdmin = object.newAdmin !== void 0 && object.newAdmin !== null ? String(object.newAdmin) : "";
          message.contract = object.contract !== void 0 && object.contract !== null ? String(object.contract) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.sender !== void 0 && (obj.sender = message.sender);
          message.newAdmin !== void 0 && (obj.newAdmin = message.newAdmin);
          message.contract !== void 0 && (obj.contract = message.contract);
          return obj;
        },
        fromPartial(object) {
          var _a, _b, _c;
          const message = Object.assign({}, baseMsgUpdateAdmin);
          message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
          message.newAdmin = (_b = object.newAdmin) !== null && _b !== void 0 ? _b : "";
          message.contract = (_c = object.contract) !== null && _c !== void 0 ? _c : "";
          return message;
        }
      };
      var baseMsgUpdateAdminResponse = {};
      exports2.MsgUpdateAdminResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgUpdateAdminResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgUpdateAdminResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgUpdateAdminResponse);
          return message;
        }
      };
      var baseMsgClearAdmin = { sender: "", contract: "" };
      exports2.MsgClearAdmin = {
        encode(message, writer = minimal_1.default.Writer.create()) {
          if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
          }
          if (message.contract !== "") {
            writer.uint32(26).string(message.contract);
          }
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgClearAdmin);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.sender = reader.string();
                break;
              case 3:
                message.contract = reader.string();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(object) {
          const message = Object.assign({}, baseMsgClearAdmin);
          message.sender = object.sender !== void 0 && object.sender !== null ? String(object.sender) : "";
          message.contract = object.contract !== void 0 && object.contract !== null ? String(object.contract) : "";
          return message;
        },
        toJSON(message) {
          const obj = {};
          message.sender !== void 0 && (obj.sender = message.sender);
          message.contract !== void 0 && (obj.contract = message.contract);
          return obj;
        },
        fromPartial(object) {
          var _a, _b;
          const message = Object.assign({}, baseMsgClearAdmin);
          message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
          message.contract = (_b = object.contract) !== null && _b !== void 0 ? _b : "";
          return message;
        }
      };
      var baseMsgClearAdminResponse = {};
      exports2.MsgClearAdminResponse = {
        encode(_, writer = minimal_1.default.Writer.create()) {
          return writer;
        },
        decode(input, length) {
          const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
          let end = length === void 0 ? reader.len : reader.pos + length;
          const message = Object.assign({}, baseMsgClearAdminResponse);
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        },
        fromJSON(_) {
          const message = Object.assign({}, baseMsgClearAdminResponse);
          return message;
        },
        toJSON(_) {
          const obj = {};
          return obj;
        },
        fromPartial(_) {
          const message = Object.assign({}, baseMsgClearAdminResponse);
          return message;
        }
      };
      var MsgClientImpl = class {
        constructor(rpc) {
          this.rpc = rpc;
          this.StoreCode = this.StoreCode.bind(this);
          this.InstantiateContract = this.InstantiateContract.bind(this);
          this.ExecuteContract = this.ExecuteContract.bind(this);
          this.MigrateContract = this.MigrateContract.bind(this);
          this.UpdateAdmin = this.UpdateAdmin.bind(this);
          this.ClearAdmin = this.ClearAdmin.bind(this);
        }
        StoreCode(request) {
          const data = exports2.MsgStoreCode.encode(request).finish();
          const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "StoreCode", data);
          return promise.then((data2) => exports2.MsgStoreCodeResponse.decode(new minimal_1.default.Reader(data2)));
        }
        InstantiateContract(request) {
          const data = exports2.MsgInstantiateContract.encode(request).finish();
          const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "InstantiateContract", data);
          return promise.then((data2) => exports2.MsgInstantiateContractResponse.decode(new minimal_1.default.Reader(data2)));
        }
        ExecuteContract(request) {
          const data = exports2.MsgExecuteContract.encode(request).finish();
          const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "ExecuteContract", data);
          return promise.then((data2) => exports2.MsgExecuteContractResponse.decode(new minimal_1.default.Reader(data2)));
        }
        MigrateContract(request) {
          const data = exports2.MsgMigrateContract.encode(request).finish();
          const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "MigrateContract", data);
          return promise.then((data2) => exports2.MsgMigrateContractResponse.decode(new minimal_1.default.Reader(data2)));
        }
        UpdateAdmin(request) {
          const data = exports2.MsgUpdateAdmin.encode(request).finish();
          const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "UpdateAdmin", data);
          return promise.then((data2) => exports2.MsgUpdateAdminResponse.decode(new minimal_1.default.Reader(data2)));
        }
        ClearAdmin(request) {
          const data = exports2.MsgClearAdmin.encode(request).finish();
          const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "ClearAdmin", data);
          return promise.then((data2) => exports2.MsgClearAdminResponse.decode(new minimal_1.default.Reader(data2)));
        }
      };
      exports2.MsgClientImpl = MsgClientImpl;
      var globalThis = (() => {
        if (typeof globalThis !== "undefined")
          return globalThis;
        if (typeof self !== "undefined")
          return self;
        if (typeof window !== "undefined")
          return window;
        if (typeof global !== "undefined")
          return global;
        throw "Unable to locate global object";
      })();
      var atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
      function bytesFromBase64(b64) {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
          arr[i] = bin.charCodeAt(i);
        }
        return arr;
      }
      var btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
      function base64FromBytes(arr) {
        const bin = [];
        for (const byte of arr) {
          bin.push(String.fromCharCode(byte));
        }
        return btoa(bin.join(""));
      }
      if (minimal_1.default.util.Long !== long_1.default) {
        minimal_1.default.util.Long = long_1.default;
        minimal_1.default.configure();
      }
    }
  });

  // migrations/current.ts
  var current_exports = {};
  __export(current_exports, {
    migrationAddAuthzSupport: () => migrationAddAuthzSupport
  });
  var import_buffer = __toESM(require_buffer());

  // src/cosmjs/proto/bank.ts
  var import_tx = __toESM(require_tx());
  var bankTypes = [
    ["/cosmos.bank.v1beta1.MsgMultiSend", import_tx.MsgMultiSend],
    ["/cosmos.bank.v1beta1.MsgSend", import_tx.MsgSend]
  ];

  // src/cosmjs/proto/distribution.ts
  var import_tx2 = __toESM(require_tx2());
  var distributionTypes = [
    ["/cosmos.distribution.v1beta1.MsgFundCommunityPool", import_tx2.MsgFundCommunityPool],
    ["/cosmos.distribution.v1beta1.MsgSetWithdrawAddress", import_tx2.MsgSetWithdrawAddress],
    ["/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward", import_tx2.MsgWithdrawDelegatorReward],
    ["/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission", import_tx2.MsgWithdrawValidatorCommission]
  ];

  // src/cosmjs/proto/gov.ts
  var import_tx3 = __toESM(require_tx3());
  var govTypes = [
    ["/cosmos.gov.v1beta1.MsgDeposit", import_tx3.MsgDeposit],
    ["/cosmos.gov.v1beta1.MsgSubmitProposal", import_tx3.MsgSubmitProposal],
    ["/cosmos.gov.v1beta1.MsgVote", import_tx3.MsgVote],
    ["/cosmos.gov.v1beta1.MsgVoteWeighted", import_tx3.MsgVoteWeighted]
  ];

  // src/cosmjs/proto/ibc.ts
  var import_tx4 = __toESM(require_tx4());
  var import_tx5 = __toESM(require_tx5());
  var import_tx6 = __toESM(require_tx6());
  var import_tx7 = __toESM(require_tx7());
  var ibcTypes = [
    ["/ibc.applications.transfer.v1.MsgTransfer", import_tx4.MsgTransfer],
    ["/ibc.core.channel.v1.MsgAcknowledgement", import_tx5.MsgAcknowledgement],
    ["/ibc.core.channel.v1.MsgChannelCloseConfirm", import_tx5.MsgChannelCloseConfirm],
    ["/ibc.core.channel.v1.MsgChannelCloseInit", import_tx5.MsgChannelCloseInit],
    ["/ibc.core.channel.v1.MsgChannelOpenAck", import_tx5.MsgChannelOpenAck],
    ["/ibc.core.channel.v1.MsgChannelOpenConfirm", import_tx5.MsgChannelOpenConfirm],
    ["/ibc.core.channel.v1.MsgChannelOpenInit", import_tx5.MsgChannelOpenInit],
    ["/ibc.core.channel.v1.MsgChannelOpenTry", import_tx5.MsgChannelOpenTry],
    ["/ibc.core.channel.v1.MsgRecvPacket", import_tx5.MsgRecvPacket],
    ["/ibc.core.channel.v1.MsgTimeout", import_tx5.MsgTimeout],
    ["/ibc.core.channel.v1.MsgTimeoutOnClose", import_tx5.MsgTimeoutOnClose],
    ["/ibc.core.client.v1.MsgCreateClient", import_tx6.MsgCreateClient],
    ["/ibc.core.client.v1.MsgSubmitMisbehaviour", import_tx6.MsgSubmitMisbehaviour],
    ["/ibc.core.client.v1.MsgUpdateClient", import_tx6.MsgUpdateClient],
    ["/ibc.core.client.v1.MsgUpgradeClient", import_tx6.MsgUpgradeClient],
    ["/ibc.core.connection.v1.MsgConnectionOpenAck", import_tx7.MsgConnectionOpenAck],
    ["/ibc.core.connection.v1.MsgConnectionOpenConfirm", import_tx7.MsgConnectionOpenConfirm],
    ["/ibc.core.connection.v1.MsgConnectionOpenInit", import_tx7.MsgConnectionOpenInit],
    ["/ibc.core.connection.v1.MsgConnectionOpenTry", import_tx7.MsgConnectionOpenTry]
  ];

  // src/cosmjs/proto/staking.ts
  var import_tx8 = __toESM(require_tx8());
  var stakingTypes = [
    ["/cosmos.staking.v1beta1.MsgBeginRedelegate", import_tx8.MsgBeginRedelegate],
    ["/cosmos.staking.v1beta1.MsgCreateValidator", import_tx8.MsgCreateValidator],
    ["/cosmos.staking.v1beta1.MsgDelegate", import_tx8.MsgDelegate],
    ["/cosmos.staking.v1beta1.MsgEditValidator", import_tx8.MsgEditValidator],
    ["/cosmos.staking.v1beta1.MsgUndelegate", import_tx8.MsgUndelegate]
  ];

  // src/cosmjs/proto/wasm.ts
  var import_tx9 = __toESM(require_tx9());
  var wasmTypes = [
    ["/cosmwasm.wasm.v1.MsgClearAdmin", import_tx9.MsgClearAdmin],
    ["/cosmwasm.wasm.v1.MsgExecuteContract", import_tx9.MsgExecuteContract],
    ["/cosmwasm.wasm.v1.MsgMigrateContract", import_tx9.MsgMigrateContract],
    ["/cosmwasm.wasm.v1.MsgStoreCode", import_tx9.MsgStoreCode],
    ["/cosmwasm.wasm.v1.MsgInstantiateContract", import_tx9.MsgInstantiateContract],
    ["/cosmwasm.wasm.v1.MsgUpdateAdmin", import_tx9.MsgUpdateAdmin]
  ];

  // src/cosmjs/proto/index.ts
  var _types = [
    bankTypes,
    distributionTypes,
    govTypes,
    ibcTypes,
    stakingTypes,
    wasmTypes
  ];
  var allModuleTypes = _types.reduce((acc, next) => acc.concat(next), []);
  var proto_default = allModuleTypes;

  // migrations/src/utils.ts
  function getSelectResults(rows) {
    if (rows.length < 1) {
      return null;
    }
    return rows.map((row) => Object.entries(row).map((e) => e[1]));
  }

  // migrations/current.ts
  function decode(msg) {
    for (const [typeUrl, msgType] of proto_default) {
      if (typeUrl === msg.typeUrl) {
        const bytes = new Uint8Array(Object.values(msg.value));
        return msgType.decode(bytes);
      }
    }
    throw new Error("message type_url not found in protobuf type registry");
  }
  function migrationAddAuthzSupport() {
    plv8.execute("SET SCHEMA 'app'");
    const authzExecSelect = "SELECT (m.id, m.type_url, json, m.transaction_id, m.block_id, t.id) FROM app.messages m JOIN app.transactions t ON m.transaction_id = t.id WHERE m.type_url = '/cosmos.authz.v1beta1.MsgExec'";
    const messagesSelectResults = getSelectResults(plv8.execute(authzExecSelect));
    if (messagesSelectResults === null) {
      return;
    }
    for (const [id, type_url, json, transaction_id, block_id] of messagesSelectResults) {
      const { grantee, msgs } = JSON.parse(json);
      plv8.execute(
        "INSERT INTO app.authz_execs (id, grantee, message_id, transaction_id, block_id) VALUES ($1, $2, $3, $4, $5)",
        [id, grantee, id, transaction_id, block_id]
      );
      for (const [i, subMsg] of Object.entries(msgs)) {
        const subMsgId = `${id}-${i}`;
        const decodedMsg = decode(subMsg);
        plv8.execute(
          "INSERT INTO app.messages (id, type_url, json, transaction_id, block_id) VALUES ($1, $2, $3, $4, $5)",
          [subMsgId, type_url, JSON.stringify(decodedMsg), transaction_id, block_id]
        );
        plv8.execute(
          "INSERT INTO app.authz_exec_messages (id, authz_exec_id, message_id) VALUES ($1, $2, $3)",
          [subMsgId, id, subMsgId]
        );
      }
    }
  }
  return __toCommonJS(current_exports);
})();
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */

return plv8ify.migrationAddAuthzSupport()

$plv8ify$ LANGUAGE plv8 IMMUTABLE STRICT;
SELECT * FROM plv8ify_migrationAddAuthzSupport();
