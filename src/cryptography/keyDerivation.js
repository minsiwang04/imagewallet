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

// Derivation path levels.
const PL_PURPOSE = 0x8000002C;  // 44'
const PL_CHANGE = 0; // change

/**
 * Returns a hash of the passed data using the keccak256 algorithm.
 *
 * @param {hex} seed - Master source of entropy.
 * @param {string} coinSymbol - Coin symbol, e.g. IW.
 * @param {number} accountIndex - Account identifier.
 * @return {hex} seed - Master source of entropy.
 */
export const derive = (seed, coinSymbol, accountIndex) => {
    // Defensive programming.
    validateSeed(seed);
    const coin = validateCoinSymbol(coinSymbol);

    // Iterate BIP32 path extendingly master key accordingly.
    const path = getBip32Path(coin.hexCode, accountIndex || 0, 0);
    let derived = getMasterExtendedKey(seed);
    for (let i = 1; i < path.length; i++) {
        derived = getDerivedExtendedKey(derived, path[i]);
    }

    return derived.key;
};

/**
 * Returns a hash of the passed data using the keccak256 algorithm.
 *
 * @param {hex} seed - Master source of entropy.
 * @param {string} coinSymbol - Coin symbol, e.g. IW.
 * @param {number} accountIndex - Account identifier.
 * @return {hex} seed - Master source of entropy.
 */
const getBip32Path = (coinHexCode, account, address_index) => {
    // TODO: verify source of account / address index.
    const path = `m / ${PL_PURPOSE} / ${coinHexCode} / ${account} / ${PL_CHANGE} / ${address_index}`;

    return path.split('/');
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

    return new ExtendedPrivateKey(digest.slice(0, 32), digest.slice(32));
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

    return new ExtendedPrivateKey(digest.slice(0, 32), digest.slice(32));
}

/**
 * Validates incoming chain identifier against set of registered coins.
 *
 * @param {number} j - Chain identifier as per SLIP0044.
 */
const validateCoinSymbol = (symbol) => {
    const coin = coins.getBySymbol(symbol);
    if (!coin) {
        throw new exceptions.InvalidCoinSymbolError(symbol);
    }

    return coin;
};

/**
 * Validates incoming seed entropy.
 *
 * @return {hex} seed - Master source of entropy.
 */
const validateSeed = (seed) => {
    if (typeof seed !== 'string') {
        throw new exceptions.InvalidEntropyError();
    }
    if (seed.length != 64) {
        throw new exceptions.InvalidEntropyError();
    }
};

/**
 * Represents a private key - not to be revealed by any entity than it's creator !
 * @constructor
 * @param {string} key - The key.
 */
class PrivateKey {
    constructor(key) {
        this.key = key
    }
}

/**
 * Represents an extended private key - extended via hmacSha512.
 * @constructor
 * @param {string} key - The key.
 * @param {string} chainCode - The chain code.
 */
class ExtendedPrivateKey extends PrivateKey {
    constructor(key, chainCode) {
        super(key)
        this.chainCode = chainCode
    }
}
