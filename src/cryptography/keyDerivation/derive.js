// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Encapsulates key derivation across chains.
 */

// Module imports.
import * as coins from '../../coins/index';
import * as exceptions from '../../utils/exceptions';
import * as convert from '../../utils/conversion';
import * as hash from '../hashes/index';
import { logInfo } from '../../utils/logging';
import slip0010 from './slip0010';

// Map of elliptic curves to seed modifiers.
const SEED_MODIFIERS = {
    'secp256k1': 'Bitcoin seed',
    'ed25519': 'ed25519 seed'
}

/**
 * Returns a entropy derived from seed by applying a derivation path algorithm.
 *
 * @param {hex} seed - Master source of entropy.
 * @param {string} coinSymbol - Coin symbol, e.g. IW.
 * @param {number} accountIndex - Account identifier.
 * @return {hex} seed - Master source of entropy.
 */
export default function(seed, coinSymbol, accountIndex) {
    // Expecting seed to be a 64 length hexadecimal string.
    if (typeof seed !== 'string') {
        throw new exceptions.InvalidEntropyError();
    }
    if (seed.length != 64) {
        throw new exceptions.InvalidEntropyError();
    }

    // Expecting coin symbol to be among set of supported coins.
    const coin = coins.getBySymbol(coinSymbol);
    if (!coin) {
        throw new exceptions.InvalidCoinSymbolError(coinSymbol);
    }

    const derivationPath = getDerivationPath(coin.hexCode, accountIndex, 0);
    const fingerprint = null;
    const seedModifier = SEED_MODIFIERS[coin.curve];

    const xkey = slip0010(seed, coin.curve, seedModifier, derivationPath, fingerprint);

    return {
        privateKey: xkey.privateKey,
        publicKey: xkey.publicKey
    }
}

/**
 * Returns a hash of the passed data using the keccak256 algorithm.
 *
 * @param {hex} seed - Master source of entropy.
 * @param {string} coinSymbol - Coin symbol, e.g. IW.
 * @param {number} accountIndex - Account identifier.
 * @return {hex} seed - Master source of entropy.
 */
const getDerivationPath = (coinHexCode, accountIndex, address_index) => {
    return `m/44H/${coinHexCode}/${accountIndex}/0/${address_index}`;
    // return `m/0x8000002CH/${coinHexCode}/${accountIndex}/0/${address_index}`;
}
