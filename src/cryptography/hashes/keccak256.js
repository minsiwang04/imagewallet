// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Wraps keccak library to expose keccak256 hasing algorithm.
 */

// Module imports.
import * as keccak from 'keccak';

// Hashing algorithm - sha-3:keccak256.
const ALGO = 'keccak256';

/**
 * Returns a hash of the passed data using the keccak256 algorithm.
 *
 * @param {obj} data - Data to be hashed.
 * @return {hex} The hashed value.
 */
export default function(data) {
    const input = JSON.stringify(data);
	const h = keccak.default(ALGO);

	return h.update(JSON.stringify(data)).digest('hex');
}
