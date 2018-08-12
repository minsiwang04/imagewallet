// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Encoding entry point.
 */

// Module imports.
import { EncodingError } from '../utils/exceptions';
import renderCanvas from './renderers/canvas';
import renderFooter from './renderers/footer';
import renderHeader from './renderers/header';
import renderIdenticon from './renderers/identicon';
import renderOther from './renderers/other';
import renderPanels from './renderers/panels';
import renderQrCode from './renderers/qrCode';
import renderWarning from './renderers/warning';
import setCipherText from './setCipherText';
import setQrCode from './setQrCode';
import validateInputs from './validateInputs';

/**
 * Encodes an image wallet from user credentials and encoding options.
 * @param {object} credentials - Credentials to be encoded.
 * @param {object} options - Encoding options.
 * @return An image wallet encoded as an HTMLCanvasElement.
 */
export default async function(credentials, options) {
    // Set processing context.
    const ctx = new EncodingContextInfo(credentials, options);

    // Invoke pipeline.
    await validateInputs(ctx);
    await setCipherText(ctx);
    await setQrCode(ctx);
    await renderCanvas(ctx);
    await renderOther(ctx);
    await renderPanels(ctx);
    await renderFooter(ctx);
    await renderHeader(ctx);
    await renderWarning(ctx);
    await renderIdenticon(ctx);
    await renderQrCode(ctx);

    // Return wallet encoded as an HTMLCanvasElement element.
    return ctx.$canvas;
}

/**
 * Contextual information passed along encoding pipeline.
 * @constructor
 * @param {object} credentials - Credentials to be encoded.
 * @param {object} options - Encoding options.
 */
class EncodingContextInfo {
    constructor(credentials, options) {
        this.asImageData = null;
        this.asArrayBuffer = null;
        this.asBlob = null;
        this.cipherText = null;
        this.credentials = credentials;
        this.options = options;
        this.$canvas = null;
        this.$ctx = null;
    }
}
