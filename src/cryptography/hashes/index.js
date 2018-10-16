// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Wraps keccak library to expose keccak256 hashing algorithm.
 */

// Module imports.
import blake2b from './blake2b';
import hmacSha512 from './hmacSha512';
import keccak256 from './keccak256';

 // Module exports.
 export {
     blake2b,
     hmacSha512,
 	 keccak256,
 }
