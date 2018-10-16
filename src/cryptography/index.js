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
import { generate as generateEntropy } from './entropy';
import { derive as deriveKey } from './keyDerivation';
import * as hash from './hashes';

 // Module exports.
export {
	decrypt,
    deriveKey,
    encrypt,
    hash,
    generateEntropy
}
