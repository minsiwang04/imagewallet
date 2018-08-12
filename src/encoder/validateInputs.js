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
    InvalidPrivateKeyError,
    InvalidPasswordError,
} from '../utils/exceptions';
import { logTODO } from '../utils/logging';

/**
 * Validates encoding inputs.
 * @param {EncodingContextInfo} ctx - Encoding processing context information.
 */
export default async function(ctx) {
    validatePrivateKey(ctx.credentials.privateKey);
    validatePassword(ctx.credentials.password);
}

/**
 * Validates supplied private key.
 * @param {string} key - Private key being validated.
 */
const validatePrivateKey = (key) => {
    // Must be a hex encoded string.
    try {
        key = Buffer.from(key, 'hex');
    } catch (err) {
        throw new InvalidPrivateKeyError('expecting a hex encoded string');
    }
    // TODO: validate length ?
};

/**
 * Validates supplied password.
 * @param {string} pwd - Password being validated.
 */
const validatePassword = (pwd) => {
    logTODO('validate password against a regex');
};
