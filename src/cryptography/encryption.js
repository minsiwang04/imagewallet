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

// Default cipher algorithm.
const CIPHER_ALGORITHM = 'aes256';

/**
 * Encrypts plain text.
 *
 * @param {string} plainText - Text to be encrypted.
 * @param {string} password - Password used to encrypt.
 */
export const encrypt = (plainText, password) => {
    const cipher = crypto.createCipher(CIPHER_ALGORITHM, password);
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
};

/**
 * Decrypts cipher text.
 *
 * @param {string} cipherText - Text to be decrypted.
 * @param {string} password - Password used to encrypt.
 */
export const decrypt = (cipherText, password) => {
    const decipher = crypto.createDecipher(CIPHER_ALGORITHM, password);
    let decrypted = decipher.update(cipherText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
};
