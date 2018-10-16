// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Encapsulates key derivation across chains.
 */

// Module imports.
import * as coins from '../coins/index';
import * as exceptions from '../utils/exceptions';
import * as convert from '../utils/conversion';
import * as hash from './hashes/index';

/**
 * Returns a hash of the passed data using the keccak256 algorithm.
 *
 * @param {number} i - Integer indicating which key pair in projected sequence to return.
 * @param {number} j - Chain identifier as per SLIP0044.
 * @return {Bufferhex} seed - Either a buffer or hexadecimal string representing a previously generated source of entropy.
 */
export const derive = (seed, chainIndex, walletIndex) => {
    // Defensive programming.
    validateSeed(seed);
    validateChainIdentifier(chainIndex);

    const {pvk, chainCode} = generateMasterKey(seed);
    const coin = coins.getByIndex(chainIndex);

    console.log('TODO: next level')
};

/**
 * Generates a master key from a source of entropy.
 *
 * @return {Bufferhex} seed - Either a buffer or hexadecimal string representing a previously generated source of entropy.
 */
const generateMasterKey = (seed) => {
    console.log(hash);
    
    const key = hash.keccak256('أبو يوسف يعقوب بن إسحاق الصبّاح الكندي');
    const master = hash.hmacSha512(key, seed);

    return {
        pvk: master.slice(0, 32),
        chainCode: master.slice(32)
    }
}

/**
 * Validates incoming chain identifier against set of registered coins.
 *
 * @param {number} j - Chain identifier as per SLIP0044.
 */
const validateChainIdentifier = (identifier) => {
    if (!coins.getByIndex(identifier)) {
        throw new exceptions.InvalidCoinIdentiferError(identifier);
    }
};

/**
 * Validates incoming seed entropy.
 *
 * @param {number} seed - Master entropy used for key derivation.
 */
const validateSeed = (seed) => {
    if (convert.isHexString(seed)) {
        if (seed.length != 64) {
            throw new exceptions.InvalidEntropyError(j);
        }
    }
};
