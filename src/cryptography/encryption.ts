// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Wraps cryptographic encrption functions.
 */

// Module imports.
import * as exceptions from '../utils/exceptions';
import blake2b from './hashing/blake2b';
const argon2 = require('argon2-wasm');

// Number of checksum bytes.
const CHECKSUM_BYTES = 2;

// Argon2 memory cost.
const ARGON2_MEM_COST = 512;

/**
 *
 * @param {Buffer} plainText
 * @return {Buffer} checksum
 */
const getChecksum = (plainText) => {
    return Buffer.from(blake2b(plainText).slice(0, CHECKSUM_BYTES));
};

/**
 * Derives an encryption key from a password.
 *
 * @param {string} password - Password to derive key from.
 * @param {Buffer} salt - Salt used for key derivation.
 * @param {number} rounds - Number of rounds used for key derivation.
 * @param {number} outputSize - Size of the derived key.
 * @return {Promise.<Uint8Array>} The derived key.
 */
const kdf = (password, salt, rounds, outputSize) => {
    return argon2.hash({
        pass: password,
        salt: new Uint8Array(salt),
        hashLen: outputSize,
        time: rounds,
        mem: ARGON2_MEM_COST
    }).then(res => res.hash);
};

/**
 *
 * @param {Buffer|Uint8Array} a
 * @param {Buffer|Uint8Array} b
 * @returns {Buffer}
 */
const xor = (a, b) => {
    const res = Buffer.alloc(a.length);
    for (let i = 0; i < a.length; ++i) {
        res[i] = a[i] ^ b[i];
    }
    return res;
};

/**
 * Encrypts plain text.
 *
 * @param {Buffer} plainText - Text to be encrypted.
 * @param {string} password - Password used to encrypt.
 * @param {Buffer} salt - Salt used for key derivation.
 * @param {number} rounds - Number of rounds used for key derivation.
 * @return {Promise.<Buffer>} cipherText
 */
export const encrypt = async (plainText, password, salt, rounds) => {
    const checksum = getChecksum(plainText);
    const plainTextWithChecksum = Buffer.alloc(checksum.length + plainText.length);
    checksum.copy(plainTextWithChecksum);
    plainText.copy(plainTextWithChecksum, checksum.length);

    const key = await kdf(password, salt, rounds, plainTextWithChecksum.length);
    return xor(plainTextWithChecksum, key);
};

/**
 * Decrypts cipher text.
 *
 * @param {Buffer} cipherText - Text to be decrypted.
 * @param {string} password - Password used to encrypt.
 * @param {Buffer} salt - Salt used for key derivation.
 * @param {number} rounds - Number of rounds used for key derivation.
 * @throws IncorrectPasswordError - Raised when the supplied password is incorrect.
 * @return {Promise.<Buffer>} plainText
 */
export const decrypt = async (cipherText, password, salt, rounds) => {
    const key = await kdf(password, salt, rounds, cipherText.length);
    const decrypted = xor(cipherText, key);

    const plainText = decrypted.slice(CHECKSUM_BYTES);
    const checksum = getChecksum(plainText);
    if (checksum.compare(decrypted, 0, CHECKSUM_BYTES) !== 0) {
        throw new exceptions.IncorrectPasswordError();
    }
    return plainText;
};
