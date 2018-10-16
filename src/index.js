// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview An image wallet - easier than brain wallets.
 *
 * @exports decode/deriveKey/encode/name/provider/version
 * @version 0.2.1
 */

// Module imports.
import encoder from './encoder/index';
import decoder from './decoder/index';
import deriveKey from './cryptography/index';

/**
 * Asynchronously decodes an image wallet.
 * @param {Blob} blob - An image wallet.
 * @param {string} password - Password used when generating wallet.
 * @return A private key.
 */
const decode = async (blob, password) => {
    return await decoder(blob, password);
};

/**
 * Asynchronously encodes an image wallet from user credentials and encoding options.
 * @param {object} credentials - Credentials to be encoded.
 * @param {object} options - Encoding options.
 * @return A promise encoded image wallet.
 */
const encode = async (credentials, options) => {
    return await encoder(credentials, options);
};

// Synonym for encode.
const generateFromPassword = encode;

// Library version.
const name = 'Image Wallet';

// Library provider.
const provider = 'Trinkler Software AG';

// Library version.
const version = '0.2.1';

// Module exports.
export {
	decode,
    deriveKey,
	encode,
	name,
	provider,
    version,
};
