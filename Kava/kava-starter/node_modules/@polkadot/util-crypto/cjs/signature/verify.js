"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatureVerify = void 0;
const util_1 = require("@polkadot/util");
const decode_js_1 = require("../address/decode.js");
const verify_js_1 = require("../ed25519/verify.js");
const verify_js_2 = require("../secp256k1/verify.js");
const verify_js_3 = require("../sr25519/verify.js");
const secp256k1VerifyHasher = (hashType) => (message, signature, publicKey) => (0, verify_js_2.secp256k1Verify)(message, signature, publicKey, hashType);
const VERIFIERS_ECDSA = [
    ['ecdsa', secp256k1VerifyHasher('blake2')],
    ['ethereum', secp256k1VerifyHasher('keccak')]
];
const VERIFIERS = [
    ['ed25519', verify_js_1.ed25519Verify],
    ['sr25519', verify_js_3.sr25519Verify],
    ...VERIFIERS_ECDSA
];
const CRYPTO_TYPES = ['ed25519', 'sr25519', 'ecdsa'];
function verifyDetect(result, { message, publicKey, signature }, verifiers = VERIFIERS) {
    result.isValid = verifiers.some(([crypto, verify]) => {
        try {
            if (verify(message, signature, publicKey)) {
                result.crypto = crypto;
                return true;
            }
        }
        catch {
            // do nothing, result.isValid still set to false
        }
        return false;
    });
    return result;
}
function verifyMultisig(result, { message, publicKey, signature }) {
    if (![0, 1, 2].includes(signature[0])) {
        throw new Error(`Unknown crypto type, expected signature prefix [0..2], found ${signature[0]}`);
    }
    const type = CRYPTO_TYPES[signature[0]] || 'none';
    result.crypto = type;
    try {
        result.isValid = {
            ecdsa: () => verifyDetect(result, { message, publicKey, signature: signature.subarray(1) }, VERIFIERS_ECDSA).isValid,
            ed25519: () => (0, verify_js_1.ed25519Verify)(message, signature.subarray(1), publicKey),
            none: () => {
                throw Error('no verify for `none` crypto type');
            },
            sr25519: () => (0, verify_js_3.sr25519Verify)(message, signature.subarray(1), publicKey)
        }[type]();
    }
    catch {
        // ignore, result.isValid still set to false
    }
    return result;
}
function getVerifyFn(signature) {
    return [0, 1, 2].includes(signature[0]) && [65, 66].includes(signature.length)
        ? verifyMultisig
        : verifyDetect;
}
function signatureVerify(message, signature, addressOrPublicKey) {
    const signatureU8a = (0, util_1.u8aToU8a)(signature);
    if (![64, 65, 66].includes(signatureU8a.length)) {
        throw new Error(`Invalid signature length, expected [64..66] bytes, found ${signatureU8a.length}`);
    }
    const publicKey = (0, decode_js_1.decodeAddress)(addressOrPublicKey);
    const input = { message: (0, util_1.u8aToU8a)(message), publicKey, signature: signatureU8a };
    const result = { crypto: 'none', isValid: false, isWrapped: (0, util_1.u8aIsWrapped)(input.message, true), publicKey };
    const isWrappedBytes = (0, util_1.u8aIsWrapped)(input.message, false);
    const verifyFn = getVerifyFn(signatureU8a);
    verifyFn(result, input);
    if (result.crypto !== 'none' || (result.isWrapped && !isWrappedBytes)) {
        return result;
    }
    input.message = isWrappedBytes
        ? (0, util_1.u8aUnwrapBytes)(input.message)
        : (0, util_1.u8aWrapBytes)(input.message);
    return verifyFn(result, input);
}
exports.signatureVerify = signatureVerify;
