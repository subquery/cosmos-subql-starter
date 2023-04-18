"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressToU8a = void 0;
const decode_js_1 = require("./decode.js");
function addressToU8a(who) {
    return (0, decode_js_1.decodeAddress)(who);
}
exports.addressToU8a = addressToU8a;
