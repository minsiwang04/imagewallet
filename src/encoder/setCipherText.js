// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Sets encrypted data to be transformed into a QR code.
 */

// Module imports.
import * as cryptography from '../cryptography/index';
import * as IW from '../index';
const uuidv4 = require('uuid/v4');

// Number of entropic bytes.
const ENTROPY_SIZE_BYTES = 32

/**
 * Encrypts data in readiness for transformation to a QR code.
 * @param {EncodingContextInfo} ctx - Encoding processing context information.
 */
export default async function(ctx) {
    ctx.seed = cryptography.generateEntropy(ENTROPY_SIZE_BYTES).toString('hex');
    const asObject = {
        data: {
            secretSeed: ctx.seed
        },
        created: new Date().toISOString(),
        version: IW.version,
        uid: uuidv4()
    };
    const asJSON = JSON.stringify(asObject);
    ctx.cipherText = cryptography.encrypt(asJSON, ctx.credentials.password);
}
