// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Encoding input parameter validation.
 */

// Module imports.
import {
    InvalidSecretSeedError,
    InvalidPasswordError,
} from '../utils/exceptions';
import { logTODO } from '../utils/logging';

/**
 * Validates encoding inputs.
 * @param {EncodingContextInfo} ctx - Encoding processing context information.
 */
export default async function(ctx) {
    validateSecretSeed(ctx.credentials.secretSeed);
    validatePassword(ctx.credentials.password);
}

/**
 * Validates supplied secret seed.
 * @param {string} key - Private key being validated.
 */
const validateSecretSeed = (seed) => {
    // Expecting a 32 byte hex encoded string.
    try {
        seed = Buffer.from(seed, 'hex');
    } catch (err) {
        throw new InvalidSecretSeedError('expecting a 32 byte hex encoded string');
    }
    if (seed.length != 32) {
        throw new InvalidSecretSeedError('expecting a 32 byte hex encoded string');
    }
};

/**
 * Validates supplied password.
 * @param {string} pwd - Password being validated.
 */
const validatePassword = (pwd) => {
    logTODO('validate password against a regex');
};

const isHexString = (input) => {
    if (typeof input !== 'string') {
        return false;
    }
    return parseInt(input, 16).toString(16) === input.toLowerCase();
};
