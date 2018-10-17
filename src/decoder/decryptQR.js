// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Sets decrypted data, i.e. user private key.
 */

// Module imports.
import * as cryptography from '../cryptography/index';

/**
 * Scans QR code embedded in image wallet.
 * @param {DecodingContextInfo} ctx - Decoding processing context information.
 */
export default async function(qrData, password) {
    const plainText = cryptography.decrypt(qrData, password);

    return JSON.parse(plainText);
}
