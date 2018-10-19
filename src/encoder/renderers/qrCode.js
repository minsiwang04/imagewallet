// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview QR code renderer.
 */

// Module imports.
import QRious from 'qrious';
import * as DEFAULTS from '../defaults/qrCode';
import { renderLine, renderRect } from '../../utils/rendering';
import { logDebug } from '../../utils/logging';

/**
 * Renders a QR code using qrious: https://github.com/neocotic/qrious.
 * @param {EncodingContextInfo} ctx - Encoding processing context information.
 */
export default async function(ctx) {
    ctx.$ctx.save();
    await renderCode(ctx);
    await renderFrame(ctx);
    ctx.$ctx.restore();
}

/**
 * Returns a new qr code.
 * @param {EncodingContextInfo} ctx - Encoding processing context information.
 */
const renderCode = async (ctx) => {
    const $img = new Image();
    $img.src = await getQrDataURL(ctx);
    ctx.$ctx.drawImage(
        $img,
        DEFAULTS.x,
        DEFAULTS.y,
        DEFAULTS.size,
        DEFAULTS.size,
    );
};

const getQrDataURL = async (ctx) => {
    const qrCode = new QRious({
        background: 'white',
        element: document.createElement('img'),
        level: DEFAULTS.errorCorrectionLevel,
        size: DEFAULTS.size,
        value: ctx.cipherText
    });
    return qrCode.toDataURL();
};

/**
 * Renders frame around the qr code.
 * @param {EncodingContextInfo} ctx - Encoding processing context information.
 */
const renderFrame = async (ctx) => {
    // Work.
    await renderLine(
        ctx.$ctx,
        DEFAULTS.x,
        DEFAULTS.y,
        DEFAULTS.x + DEFAULTS.size,
        DEFAULTS.y,
        DEFAULTS.frameWidth,
    );
    await renderLine(
        ctx.$ctx,
        DEFAULTS.x + DEFAULTS.size,
        DEFAULTS.y,
        DEFAULTS.x + DEFAULTS.size,
        DEFAULTS.y + DEFAULTS.size,
        DEFAULTS.frameWidth,
    );
    await renderLine(
        ctx.$ctx,
        DEFAULTS.x + DEFAULTS.size,
        DEFAULTS.y + DEFAULTS.size,
        DEFAULTS.x,
        DEFAULTS.y + DEFAULTS.size,
        DEFAULTS.frameWidth,
    );
    await renderLine(
        ctx.$ctx,
        DEFAULTS.x,
        DEFAULTS.y + DEFAULTS.size,
        DEFAULTS.x,
        DEFAULTS.y,
        DEFAULTS.frameWidth,
    );
};
