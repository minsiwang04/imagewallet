// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Wraps keccak library to expose keccak256 hasing algorithm.
 */

// Module imports.
const blake2 = require('blake2');

// Hashing algorithm - blake2b.
const ALGO = 'blake2b';

// Default hash size.
const DEFAULT_SIZE = 32;

/**
 * Returns a hash of the passed data using the keccak256 algorithm.
 *
 * @param {obj} data - Data to be hashed.
 * @return {hex} The hashed value.
 */
export default function(data, length) {
    const input = new Buffer(JSON.stringify(data));
    const h = blake2.createHash(ALGO, {digestLength: length || DEFAULT_SIZE});

    return h.update(input).digest();
}
