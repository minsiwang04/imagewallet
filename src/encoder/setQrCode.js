// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Sets encrypted data to be transformed into a QR code.
 */

// Module imports.
import QRious from 'qrious';
import * as DEFAULTS from './defaults/index';

/**
 * Encrypts data in readiness for transformation to a QR code.
 * @param {EncodingContextInfo} ctx - Encoding processing context information.
 */
export default async function(ctx) {
    ctx.qrCode = new QRious({
        background: 'white',
        element: document.createElement('img'),
        level: DEFAULTS.QR_CODE.errorCorrectionLevel,
        size: DEFAULTS.QR_CODE.size,
        value: ctx.cipherText
    });
}
