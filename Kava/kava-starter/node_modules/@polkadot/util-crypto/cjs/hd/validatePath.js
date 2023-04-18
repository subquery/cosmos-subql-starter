"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hdValidatePath = exports.HARDENED = void 0;
exports.HARDENED = 0x80000000;
function hdValidatePath(path) {
    if (!path.startsWith('m/')) {
        return false;
    }
    const parts = path.split('/').slice(1);
    for (const p of parts) {
        const n = /^\d+'?$/.test(p)
            ? parseInt(p.replace(/'$/, ''), 10)
            : Number.NaN;
        if (isNaN(n) || (n >= exports.HARDENED) || (n < 0)) {
            return false;
        }
    }
    return true;
}
exports.hdValidatePath = hdValidatePath;
