// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Library cryptographic utility functions.
 */

// Module imports.
// AUDIT REPORT: https://cure53.de/tweetnacl.pdf
const nacl = require('tweetnacl');
nacl.auth = require('tweetnacl-auth');

/**
 * Returns a hash of the passed data using the Hmac Sha512 algorithm.
 *
 * @param {string} data - Text to be hashed.
 * @return {hex} The hashed value.
 */
export default function(message, key) {
    return nacl.auth.full(message, key);
}
