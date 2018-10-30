// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

// Module imports.
// import * as elliptic from 'elliptic';
import _ from 'lodash';
import * as elliptic from '../../../ext/elliptic';
import generateEntropy from '../../entropyCreation';

// Set EcDSA context.
const CURVE = new elliptic.eddsa('ed25519');

// Buffer prepended to public keys.
const ZERO_BYTE = [0];

/**
 * Returns a key pair (optionally derived from supplied entropy).
 *
 * @param {Array} entropy - A 32 byte array emitted by a PRNG.
 * @return A key pair for signing / verification purposes.
 */
export const getKeyPair = (entropy) => {
    return CURVE.keyFromSecret(entropy || generateEntropy());
};

/**
 * Returns a private key (optionally derived from supplied entropy).
 *
 * @param {hex|Buffer|Array} entropy - Randomness with sufficient entropy.
 * @return A private key (32 byte array).
 */
export const getPrivateKey = (entropy) => {
    const keyPair = getKeyPair(entropy);

    return keyPair.privBytes();
};

/**
 * Returns a public key dervied from supplied private key.
 *
 * @param {hex|Buffer|Array} pvk - A private key.
 * @return {Array} A 33 byte array.
 */
export const getPublicKey = (pvk) => {
    const keyPair = CURVE.keyFromSecret(pvk);

    return (_.concat(ZERO_BYTE, keyPair.pubBytes()));
};

/**
 * Returns a digital signature of a hashed message.
 *
 * @param {hex|Buffer|Array} pvk - A private key.
 * @param {string} msgHash - Hexadecimal string.
 * @return {Array} A digital signature as a byte array.
 */
export const sign = (pvk, msgHash, encoding) => {
    const signer = CURVE.keyFromSecret(pvk);
    const sig = signer.sign(msgHash);

    return encoding === 'hex' ? sig.toHex() : sig.toBytes();
};

/**
 * Verifies a hashed message signature .
 *
 * @param {hex|Array} key - A private or public key.
 * @param {string} msgHash - Hexadecimal string.
 * @param {Array} sig - A digital signature of the message hash in DER array format.
 * @return True if verified, false otherwise.
 */
export const verify = (key, msgHash, sig) => {
    // Strip out leading byte if necessary.
    if (typeof key === 'string') {
        if (key.startsWith('0x') || key.startsWith('00')) {
            key = key.slice(2);
        }
    } else if (Array.isArray(key) && key[0] === 0) {
        key = key.slice(1);
    }

    const verifier = CURVE.keyFromPublic(key);

    return verifier.verify(msgHash, sig);
};
