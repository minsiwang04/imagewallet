// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Decoding entry point.
 */

// Module imports.
import { DecodingError } from '../utils/exceptions';
import setPlainText from './setPlainText';
import setQrCode from './setQrCode';
import validateInputs from './validateInputs';

/**
 * Decodes an image wallet.
 * @param {File} encoded - An encoded image wallet file.
 * @param {string} password - Password used when to generate wallet.
 * @return A private key.
 */
export default async function(encoded, password) {
    // Set processing context.
    const ctx = new DecodingContextInfo(encoded, password);

    // Invoke pipline.
    await validateInputs(ctx);
    await setQrCode(ctx);
    await setPlainText(ctx);

    // Return JSON object representing decrypted wallet info + encoded input.
    return JSON.parse(ctx.plainText);
}

/**
 * Contextual information passed long the decoding pipeline.
 * @constructor
 * @param {string} imageWallet - An image wallet.
 * @param {string} password - Password used when generating wallet.
 */
class DecodingContextInfo {
    constructor(blob, password) {
        this.blob = blob;
        this.password = password;
        this.plainText = null;
        this.qrCode = null;
    }
}
