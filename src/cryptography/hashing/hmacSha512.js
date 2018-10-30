// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Library cryptographic utility functions.
 */

// Module imports.
import {default as createHmac} from 'create-hmac';

// Hashing algorithm.
const ALGO = 'sha512';

/**
 * Authenticates the given message with the secret key.
 * I.E. returns HMAC-SHA-512 of the message under the key.
 *
 * @param {string} message - Message to be hashed.
 * @param {string} key - Key to apply.
 * @return {Uint8Array} 64 element Uint8Array.
 */
export default function(message, key) {
    const hmac = createHmac(ALGO, message);

    return hmac.update(key).digest();
}
