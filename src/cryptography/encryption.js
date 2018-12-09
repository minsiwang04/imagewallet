// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Wraps cryptographic encrption functions.
 */

// Module imports.
import * as crypto from 'crypto';
import * as exceptions from '../utils/exceptions';
import blake2b from './hashing/blake2b';

// Default cipher algorithm.
const CIPHER_ALGORITHM = 'aes-256-cbc';

const KEY_BYTES = 32;

const IV_BYTES = 16;

// Number of checksum bytes.
const CHECKSUM_BYTES = 2;

/**
 *
 * @param {Buffer} plainText
 * @return (Buffer) checksum
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
 * @return {Buffer} The derived key.
 */
const kdf = (password, salt, rounds, outputSize) => {
    return crypto.pbkdf2Sync(
        Buffer.from(password, 'utf8'),
        salt,
        rounds,
        outputSize,
        'sha256');
};

/**
 * Encrypts plain text.
 *
 * @param {Buffer} plainText - Text to be encrypted.
 * @param {string} password - Password used to encrypt.
 * @param {Buffer} salt - Salt used for key derivation.
 * @param {number} rounds - Number of rounds used for key derivation.
 * @return {Buffer} cipherText
 */
export const encrypt = (plainText, password, salt, rounds) => {
    const checksum = getChecksum(plainText);
    const plainTextWithChecksum = Buffer.concat([plainText, checksum]);

    const derived = kdf(password, salt, rounds, KEY_BYTES + IV_BYTES);
    const key = derived.slice(0, KEY_BYTES);
    const iv = derived.slice(KEY_BYTES);
    const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, key, iv);

    let encrypted = cipher.update(plainTextWithChecksum);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted;
};

/**
 * Decrypts cipher text.
 *
 * @param {Buffer} cipherText - Text to be decrypted.
 * @param {string} password - Password used to encrypt.
 * @param {Buffer} salt - Salt used for key derivation.
 * @param {number} rounds - Number of rounds used for key derivation.
 * @throws IncorrectPasswordError - Raised when the supplied password is incorrect.
 * @return {Buffer} plainText
 */
export const decrypt = (cipherText, password, salt, rounds) => {
    const derived = kdf(password, salt, rounds, KEY_BYTES + IV_BYTES);
    const key = derived.slice(0, KEY_BYTES);
    const iv = derived.slice(KEY_BYTES);
    const decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, key, iv);

    let decrypted = decipher.update(cipherText);
    try {
        decrypted = Buffer.concat([decrypted, decipher.final()]);
    } catch (e) {
        throw new exceptions.IncorrectPasswordError();
    }

    const checksumOffset = decrypted.byteLength - CHECKSUM_BYTES;
    const plainText = decrypted.slice(0, checksumOffset);
    const checksum = getChecksum(plainText);
    if (checksum.compare(decrypted, checksumOffset, checksumOffset + CHECKSUM_BYTES) !== 0) {
        throw new exceptions.IncorrectPasswordError();
    }

    return plainText;
};
