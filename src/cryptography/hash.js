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
import * as keccak from 'keccak';

// TODO: convert to import.
const nacl = require('tweetnacl');
nacl.auth = require('tweetnacl-auth');

// Hashing algorithm - sha-3:keccak256.
export const KECCAK_256 = 'keccak256';

/**
 * Returns a hash of the passed data using the keccak256 algorithm.
 *
 * @param {string} data - Text to be hashed.
 * @return {hex} The hashed value.
 */
export const keccak256 = (data) => {
	const input = JSON.stringify(data);
	const h = keccak.default(KECCAK_256);

	return h.update(JSON.stringify(data)).digest('hex');
};

/**
 * Returns a hash of the passed data using the Hmac Sha512 algorithm.
 *
 * @param {string} data - Text to be hashed.
 * @return {hex} The hashed value.
 */
export const hmacSha512 = (message, key) => {
	return nacl.auth.full(message, key);
};
