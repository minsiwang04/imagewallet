// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview An image wallet - easier than brain wallets.
 *
 * @exports encode/decode
 * @requires TODO
 * @version 0.1.6
 */

// Module imports.
import encoder from './encoder/index';
import decoder from './decoder/index';

/**
 * Asynchronously encodes an image wallet from user credentials and encoding options.
 * @param {object} credentials - Credentials to be encoded.
 * @param {object} options - Encoding options.
 * @return A promise encoded image wallet.
 */
export const encode = async (credentials, options) => {
    return await encoder(credentials, options);
};

/**
 * Asynchronously decodes an image wallet.
 * @param {Blob} blob - An image wallet.
 * @param {string} password - Password used when generating wallet.
 * @return A private key.
 */
export const decode = async (blob, password) => {
    return await decoder(blob, password);
};

// Library version.
export const name = 'Image Wallet';

// Library version.
export const version = '0.1.6';

// Library provider.
export const provider = 'Trinkler Software AG';
