// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
* @fileOverview SLIP-0010: universal private key derivation from master private key.
 */

// Module imports.
import { default as assert } from 'assert';
import { ed25519 } from '../ecc/index';
import { hexFromArray } from '../../utils/conversion';
import { hmacSha512 } from '../hashing/index';
import { secp256k1 } from '../ecc/index';

// Map of elliptic curve type to curve implementation wrapper.
const CURVES = {
    "ed25519": ed25519,
    "secp256k1": secp256k1,
};

// Limit beyoind which an index is considered to be 'hardened'.
const HARDENED_OFFSET = 0x80000000;

// Buffer(s) prepended to derived keys.
const ZERO_BYTE = Buffer.alloc(1, 0);
const ONE_BYTE = Buffer.alloc(1, 1);

/**
 * Returns a master extended key to push through child key derivation algo.
 * @param {hex} seed - Entropy encoded as hexadecimal string.
 * @param {string} curveName - Type of elliptical curve.
 * @param {string} seedModifier - A chain specific seed modifier.
 * @param {string} derivationPath - Derivation path to be parsed.
 * @param {string} fingerprint - Derivation fingerprint.
 * @return {object} A master extended key/chain-code.
 */
export default function(seed, curveName, seedModifier, derivationPath, fingerprint) {
    // Split derivation path into derivation indexes.
    const indexes = getIndexes(derivationPath);

    // Derive key by iteratively extending seed.
    let xkey = getMasterKey(seed, seedModifier, curveName);
    indexes.forEach((index) => {
        xkey = getDerivedChildKey(xkey, index, curveName);
    });
    logDerivation(curveName, seed, xkey, derivationPath);

    return {
        publicKey: hexFromArray(getPublicKey(xkey.key, curveName)),
        privateKey: hexFromArray(xkey.key),
        chainCode: hexFromArray(xkey.chainCode),
    };
}

/**
 * Returns a master extended key to push through child key derivation algo.
 * @param {hex} seed - Entropy encoded as hexadecimal string.
 * @param {string} modifier - A chain specific seed modifier.
 * @param {string} curve - Type of elliptical curve.
 * @return {object} A master extended key/chain-code.
 */
const getMasterKey = (seed, modifier, curve) => {
    let a, I, IL, IR = null;

    seed = Buffer.from(seed, 'hex');
    while (true) {
        I = hmacSha512(modifier, seed);
        IL = I.slice(0, 32);
        IR = I.slice(32);

        if (curve === 'ed25519') {
            break;
        }

        a = string_to_int(IL);
        if (a != 0 && a < CURVES[curve].order) {
            break;
        }

        seed = I;
    }

    return {
        key: IL,
        chainCode: IR
    };
}

/**
 * Returns an extended key derived from it's parent & an index.
 * @param {object} parent - Parent key/chain-code.
 * @param {integer} index - Index to apply to key derivation.
 * @param {string} curve - Type of elliptical curve.
 * @return {object} Derived key/chain-code.
 */
const getDerivedChildKey = (parent, index, curve) => {
    const isHardened = index >= HARDENED_OFFSET;
    const indexBuffer = Buffer.allocUnsafe(4);
    let a, data, I, IL, IR, key, pbk;

    indexBuffer.writeUInt32BE(index, 0);
    if (isHardened) {
        data = Buffer.concat([ZERO_BYTE, parent.key, indexBuffer])
    } else {
        pbk = getPublicKey(parent.key, curve);
        data = Buffer.concat([pbk, indexBuffer]);
    }

    while (true) {
        I = hmacSha512(parent.chainCode, data);
        IL = I.slice(0, 32);
        IR = I.slice(32);
        if (curve === 'ed25519') {
            break;
        }
        break;

        // TODO: implement correctly.
        a = string_to_int(IL);
        console.log(`111 : ${a}`);
        key = (a + string_to_int(parent.key)) % CURVES[curve].order
        if (a < CURVES[curve].order && key != 0) {
            key = int_to_string(key, 32);
            break;
        }
        data = Buffer.concat([ONE_BYTE, IR, indexBuffer]);
    }

    return {
        key: IL,
        chainCode: IR,
    };
}

/**
 * Returns a public key buffer.
 * @param {Buffer} pvk - Private key buffer.
 * @param {string} curveName - Type of elliptical curve.
 * @return {Buffer} Public key buffer.
 */
const getPublicKey = (pvk, curveName) => {
    return Buffer.from(CURVES[curveName].getPublicKey(pvk));
}

/**
 * Deconstructs a derivation path into a set of indexes.
 *
 * @param {string} derivationPath - Path to be mapped to a set of indexes.
 * @return {Array} Array of derivation indexes.
 */
 const getIndexes = (derivationPath) => {
    return derivationPath.split('/').slice(1).map((i) => {
        let index = parseInt(i);
        const isHardened = (i.length > 1) && (i[i.length - 1] === "H");
        if (isHardened) {
            index += HARDENED_OFFSET
        }
        // console.log(i);
        // console.log(index);
        // console.log(HARDENED_OFFSET);
        // assert(index < HARDENED_OFFSET, `Invalid index: ${index}`);

        return index;
    });
}

/**
 * Logs a key derivation result.
 */
const logDerivation = (curveName, seed, xkey, derivationPath) => {
    return;
    console.log(`
    ${curveName}
        path: ${derivationPath}
        seed: ${seed}
        chain code: ${hexFromArray(xkey.chainCode).slice(2)}
        private key: ${hexFromArray(xkey.key).slice(2)}
        public key: ${hexFromArray(getPublicKey(xkey.key, curveName)).slice(2)}
    `)
}

const string_to_int = (s) => {
    let result = 0
    s.forEach((i) => {
        result = (result << 8) + i;
    });
    return result;
}

const int_to_string = (x, pad) => {
    let ordinal;
    let result = Buffer.alloc(pad, 0);
    while (x > 0) {
        pad -= 1
        ordinal = x & 0xFF
        result[pad] = String.fromCharCode(ordinal)
        x >>= 8
    }
    return result.join('');
}
