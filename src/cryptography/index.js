// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Cryptographic functions used across the library.
 */

// Module imports.
import {
    decrypt,
    encrypt,
} from './encryption';
import generateEntropy from './entropyCreation';
import deriveKey from './keyDerivation/derive';
import * as hash from './hashing';

 // Module exports.
export {
	decrypt,
    deriveKey,
    encrypt,
    hash,
    generateEntropy
};
