// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Encapsulates key derivation across chains.
 */

// Module imports.
import _ from 'lodash';
import * as coins from '../coins/index';
import * as exceptions from '../utils/exceptions';
import * as convert from '../utils/conversion';
import * as hash from './hashes/index';

/**
 * Returns a hash of the passed data using the keccak256 algorithm.
 *
 * @param {hex} seed - Master source of entropy.
 * @param {string} coinSymbol - Coin symbol, e.g. IW.
 * @param {number} accountIndex - Account identifier.
 * @param {string} chainPath - BIP-esque path used for derivation, default to BIP32.
 * @return {hex} seed - Master source of entropy.
 */
export default function(seed, coinSymbol, accountIndex) {
    // Defensive programming.
    const coin = validateInputs(seed, coinSymbol, accountIndex);

    // Iterate BIP32 path extendingly master key accordingly.
    const paths = getBip32Paths(coin.hexCode, accountIndex || 0, 0);
    let derived = getMasterExtendedKey(seed);
    paths.forEach((segment) => {
        derived = getDerivedExtendedKey(derived, segment);
    });

    return derived.key;
}

/**
 * Returns a hash of the passed data using the keccak256 algorithm.
 *
 * @param {hex} seed - Master source of entropy.
 * @param {string} coinSymbol - Coin symbol, e.g. IW.
 * @param {number} accountIndex - Account identifier.
 * @return {hex} seed - Master source of entropy.
 */
const getBip32Paths = (coinHexCode, account, address_index) => {
    return `m/0x8000002C/${coinHexCode}/${account}/0/${address_index}`.split('/');
}

/**
 * Generates a master extended key from a source of entropy.
 *
 * @param {hex} seed - Master source of entropy.
 * @return {ExtendedPrivateKey} The extended master key derived from entropy.
 */
const getMasterExtendedKey = (seed) => {
    const key = hash.keccak256('أبو يوسف يعقوب بن إسحاق الصبّاح الكندي');
    const digest = hash.hmacSha512(key, seed);

    return {
        key: digest.slice(0, 32),
        chainCode: digest.slice(32)
    }
}

/**
 * Generates a master extended key from a source of entropy.
 *
 * @param {hex} seed - Master source of entropy.
 * @return {ExtendedPrivateKey} The extended master key derived from entropy.
 */
const getDerivedExtendedKey = (parent, index) => {
    if (index < 0x80000000) {
        index += 0x80000000
    };
    const seed = Array.from(parent.key).concat(convert.hexToArray(index));
    const digest = Array.from(hash.hmacSha512(parent.chainCode, seed));

    return {
        key: digest.slice(0, 32),
        chainCode: digest.slice(32)
    }
}

/**
 * Validates incoming chain identifier against set of registered coins.
 *
 * @param {number} j - Chain identifier as per SLIP0044.
 */
const validateInputs = (seed, coinSymbol, accountIndex) => {
    if (typeof seed !== 'string') {
        throw new exceptions.InvalidEntropyError();
    }
    if (seed.length != 64) {
        throw new exceptions.InvalidEntropyError();
    }

    const coin = coins.getBySymbol(coinSymbol);
    if (!coin) {
        throw new exceptions.InvalidCoinSymbolError(coinSymbol);
    }

    // TODO: validate account index.

    return coin;
}
