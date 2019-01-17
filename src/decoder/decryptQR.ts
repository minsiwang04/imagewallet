// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Sets decrypted data, i.e. user private key.
 */

// Module imports.
import Payload from '../payload/index';

/**
 * Decrypts the QR code payload.
 * @param {Buffer} qrData - Encrypted QR code payload.
 * @param {string} password - Password used for decryption.
 * @return {{seed: Buffer, purposeId: number}} - Decrypted QR code payload.
 */
export default async function(qrData, password) {
    const payload = await Payload.decrypt(qrData, password);
    return {
        seed: payload.entropy,
        purposeId: payload.purposeId,
    };
}
