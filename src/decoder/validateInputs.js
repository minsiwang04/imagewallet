// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Decoding input parameter validation.
 */

// Module imports.
import { InvalidPasswordError } from '../utils/exceptions';

/**
 * Validates decoding inputs.
 * @param {DecodingContextInfo} ctx - Decoding processing context information.
 */
export default async function(ctx) {
    validateBlob(ctx.blob);
    validatePassword(ctx.password);
}

/**
 * Validates image wallet blob.
 * @param {Blob} blob - Image wallet blob.
 */
const validateBlob = (blob) => {
    console.log('TODO: validate image wallet blob');
};

/**
 * Validates supplied password.
 * @param {string} password - Password being validated.
 */
const validatePassword = (password) => {
    console.log('TODO: validate password against a simple regex (min length)');
};
