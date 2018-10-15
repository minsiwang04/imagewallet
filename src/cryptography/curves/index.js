// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Exposes supported elliptic curve set.
 */

// Module imports.
import * as secp256k1 from './ecdsa/secp256k1';
import * as ed25519 from './eddsa/ed25519';

// Module exports.
export {
    secp256k1,
    ed25519
};
