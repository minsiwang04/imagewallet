// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
* @fileOverview Universal private key derivation from master private key.
 */

// Module imports.
import { arrayToHex } from '../../utils/conversion';
import { BigNumber as BN } from 'bignumber.js';
import { ed25519 } from '../ecc/index';
import { hexToArray } from '../../utils/conversion';
import { hmacSha512 } from '../hashing/index';
import { secp256k1 } from '../ecc/index';

// Map of elliptic curve type to curve implementation wrapper.
const CURVES = {
    "ed25519": ed25519,
    "secp256k1": secp256k1,
};

// Limit beyoind which an index is considered to be 'hardened'.
const HARDENED_OFFSET = 0x80000000;

// Symbols used in BIP32 paths to indicate an index that requires 'hardening'.
const HARDENING_SYMBOLS = "H'";

// Buffer(s) prepended to derived keys.
const ZERO_BYTE = Buffer.alloc(1, 0);
const ONE_BYTE = Buffer.alloc(1, 1);

/**
 * Returns a master extended key to push through child key derivation algo.
 * @param {hex} seed - Entropy encoded as hexadecimal string.
 * @param {string} curveName - Elliptical curve name.
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

    return {
        publicKey: arrayToHex(getPublicKey(xkey.key, curveName)),
        privateKey: arrayToHex(xkey.key),
        chainCode: arrayToHex(xkey.chainCode),
    };
}

/**
 * Returns a master extended key.
 * @param {hex} seed - Entropy encoded as hexadecimal string.
 * @param {string} modifier - A chain specific seed modifier.
 * @param {string} curve - Type of elliptical curve.
 * @return {object} The master extended key/chain-code.
 */
const getMasterKey = (seed, modifier, curve) => {
    let a, I, IL, IR = null;

    // Map data to a buffer.
    let data = Buffer.from(seed, 'hex');

    // Map curve order to BN.
    let o = BN(CURVES[curve].order);

    while (true) {
        // Calculate hmac.
        I = hmacSha512(modifier, data);
        IL = I.slice(0, 32);
        IR = I.slice(32);

        // Edwards curves require no further processing.
        if (curve === 'ed25519') {
            break;
        }

        // Apply curve order check.
        a = BN('0x' + IL.toString('hex'));
        if (!a.eq(0) && a.lt(o)) {
            break;
        }

        // Prepare for next loop.
        data = I;
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
    let a, data, I, IL, IR, k, key, pbk;

    // Map index to buffer.
    const indexBuffer = Buffer.allocUnsafe(4);
    indexBuffer.writeUInt32BE(index, 0);

    // Hardened child.
    if (index >= HARDENED_OFFSET) {
        // data = 0x00 || ser256(kpar) || ser32(index)
        data = Buffer.concat([ZERO_BYTE, parent.key, indexBuffer])

    // Normal child.
    } else {
        // data = serP(Kpar) || ser32(index)
        data = Buffer.concat([getPublicKey(parent.key, curve), indexBuffer]);
    }

    // Map curve order & parent key to BN's.
    const o = BN(CURVES[curve].order);
    const pk = BN(`0x` + parent.key.toString('hex'));

    while (true) {
        // Calculate hmac.
        I = hmacSha512(parent.chainCode, data);
        IL = I.slice(0, 32);
        IR = I.slice(32);

        // Edwards curves require no further processing.
        if (curve === 'ed25519') {
            break;
        }

        // Apply curve order check.
        a = BN('0x' + IL.toString('hex'));
        k = a.plus(pk).mod(o);
        if (!k.eq(0) && a.lt(o)) {
            k = k.toString(16);
            if (k.length === 63) {
                k = `0${k}`;
            }
            IL = Buffer.from(k, 'hex');
            break;
        }

        // Further extend key.
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
    const curve = CURVES[curveName];

    return Buffer.from(curve.getPublicKey(pvk));
}

/**
 * Deconstructs a derivation path into a set of indexes.
 *
 * @param {string} derivationPath - Path to be mapped to a set of indexes.
 * @return {Array} Array of derivation indexes.
 */
const getIndexes = (derivationPath) => {
    return derivationPath.split('/').slice(1).map((i) => {
        const isHardened = i.length > 1 &&
                           HARDENING_SYMBOLS.indexOf(i[i.length - 1]) === 0;
        return isHardened ? parseInt(i) + HARDENED_OFFSET :
                            parseInt(i);
    });
}

/**
 * Logs a key derivation result.
 */
const logDerivation = (curveName, seed, xkey, derivationPath) => {
    console.log(`
    ${curveName}
        path: ${derivationPath}
        seed: ${seed}
        chain code: ${arrayToHex(xkey.chainCode)}
        private key: ${arrayToHex(xkey.key)}
        public key: ${arrayToHex(getPublicKey(xkey.key, curveName))}
    `)
}
