// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Library cryptographic utility functions.
 */

// Module imports.
import * as crypto from 'crypto';

// Hashing algorithm.
const ALGO = 'sha512';

/**
 * Authenticates the given message with the secret key.
 * I.E. returns HMAC-SHA-512 of the message under the key.
 *
 * @param {string} message - Message to be hashed.
 * @param {string} key - Key to apply.
 * @param {string} encoding - Required output encoding.
 * @return {hex|Uint8Array} 64 element Uint8Array.
 */
export default function(message, key, encoding) {
    const h1 = crypto.createHmac(ALGO, message);
    h1.update(key)
    return encoding === 'hex' ? h1.digest('hex') : h1.digest();


    const h = createHmac(ALGO, message);
    h.update(key)

    return encoding === 'hex' ? h.digest('hex') : h.digest();
}
