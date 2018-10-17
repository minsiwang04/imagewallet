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
import decodeQR from './decoder/decodeQR';
import decryptQR from './decoder/decryptQR';
import deriveKey from './cryptography/keyDerivation';
import NotImplementedError from './utils/exceptions';


/**
 * Asynchronously decrypts an image wallet.
 * @param {Blob} blob - An image wallet.
 * @param {string} password - Password used when generating wallet.
 * @return Secret seed.
 */
const decryptImage = async (blob, password) => {
    // TODO validate input
    const qrData = await decodeQR(blob);

    return await decryptQR(qrData, password);
};

/**
 * Asynchronously decrypts previously decoded QR data.
 * @param {string} qrData - Previously decoded qr data (utf8 encoded).
 * @param {string} password - Password used when generating wallet.
 * @return Secret seed.
 */
const decryptQrData = async (qrData, password) => {
    // TODO validate input
    return await decryptQR(qrData, password);
};

/**
 * Asynchronously generates a lightly branded image wallet
 * from a user's password & associated encoding options.
 * @param {object} password - A user's (hopefully strong) password.
 * @param {object} options - Encoding options.
 * @return A promise resolving to an HTML canvas object.
 */
const generateFromPassword = async (password, options) => {
    return await encoder({password}, options);
};

/**
* Asynchronously generates a lightly branded image wallet
* from a user's password, image & associated encoding options.
 * @param {object} password - A user's (hopefully strong) password.
 * @param {object} imgBlob - An image blob.
 * @param {object} options - Encoding options.
 * @return A promise resolving to an HTML canvas object.
 */
const generateFromPasswordAndImage = async (password, imgBlob, options) => {
    throw new NotImplementedError();
};

/**
 * Asynchronously decodes the QR data from within an image wallet.
 * @param {Blob} blob - An image wallet.
 * @return {object} Decode data.
 */
const getQrDataFromImage = async (blob) => {
    // TODO validate input
    return await decodeQR(blob);
};

// Library version.
const name = 'Image Wallet';

// Library provider.
const provider = 'Trinkler Software AG';

// Library version.
const version = '0.2.2';

// Module exports.
export {
    decryptImage,
    decryptQrData,
    deriveKey,
    generateFromPassword,
    generateFromPasswordAndImage,
    getQrDataFromImage,
	name,
	provider,
    version,
};
