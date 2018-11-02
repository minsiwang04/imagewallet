// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Coin metadata plus related functions.
 */

// Module imports.
import * as cryptography from '../cryptography/index';

// SLIP 0044 coin index.
export const index = 60;

// SLIP 0044 coin hex code.
export const hexCode = 0x8000003c;

// Coin name.
export const name = 'Ether';

// Coin ticker symbol.
export const symbol = 'ETH';

// Elliptic curve type.
export const curve = 'secp256k1';

/**
 * Returns an Ethereum address mapped from a private key.
 *
 * @param {Array} pvk - A private key.
 * @return {hex} The address.
 */
export const getAddressFromPrivateKey = (pvk) => {
    // Map private key --> (uncompressed) public key.
    const pbk = Buffer.from(cryptography.ecc.secp256k1.getPublicKey(pvk, false));

    return getAddressFromPublicKey(pbk);
};

/**
 * Returns an Ethereum address mapped from a public key.
 *
 * @param {Array} pbk - A public key.
 * @return {hex} The address.
 */
export const getAddressFromPublicKey = (pbk) => {
    // Map public key --> keccak256 hash.
    const pbkh = cryptography.hash.keccak256(pbk)

    // Map keccak256 hash --> address.
    const addr = pbkh.slice(12)

    // TODO: prefix with 0x ?
    return addr.toString('hex');
};
