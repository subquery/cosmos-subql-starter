"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64Pad = void 0;
/**
 * @name base64Pad
 * @description Adds padding characters for correct length
 */
function base64Pad(value) {
    return value.padEnd(value.length + (value.length % 4), '=');
}
exports.base64Pad = base64Pad;
