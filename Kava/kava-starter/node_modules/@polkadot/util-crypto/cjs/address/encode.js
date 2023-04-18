"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeAddress = void 0;
const util_1 = require("@polkadot/util");
const index_js_1 = require("../base58/index.js");
const decode_js_1 = require("./decode.js");
const defaults_js_1 = require("./defaults.js");
const sshash_js_1 = require("./sshash.js");
function encodeAddress(key, ss58Format = defaults_js_1.defaults.prefix) {
    // decode it, this means we can re-encode an address
    const u8a = (0, decode_js_1.decodeAddress)(key);
    if ((ss58Format < 0) || (ss58Format > 16383) || [46, 47].includes(ss58Format)) {
        throw new Error('Out of range ss58Format specified');
    }
    else if (!defaults_js_1.defaults.allowedDecodedLengths.includes(u8a.length)) {
        throw new Error(`Expected a valid key to convert, with length ${defaults_js_1.defaults.allowedDecodedLengths.join(', ')}`);
    }
    const input = (0, util_1.u8aConcat)(ss58Format < 64
        ? [ss58Format]
        : [
            ((ss58Format & 252) >> 2) | 64,
            (ss58Format >> 8) | ((ss58Format & 3) << 6)
        ], u8a);
    return (0, index_js_1.base58Encode)((0, util_1.u8aConcat)(input, (0, sshash_js_1.sshash)(input).subarray(0, [32, 33].includes(u8a.length) ? 2 : 1)));
}
exports.encodeAddress = encodeAddress;
