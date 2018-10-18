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

import {ed25519} from './cryptography/ecc/index';
import keccak256 from './cryptography/hashes/keccak256';
import {hexFromArray} from './utils/conversion';

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

/**
 * Returns a keccak256 hash of input data.
 * @param {Object} data - Data to be hashed.
 * @return {hex|Buffer} The hashed value.
 */
const getHash = (data, encoding) => {
    // TODO validate input
    return keccak256(data, encoding);
}

/**
 * Signs a data structure.
 * @param {hex} pvk - User's private key.
 * @return {object} Signature plus data hash.
 */
const signData = (pvk, data) => {
    // TODO validate input
    const hash = getHash(data);
    const sig = signHash(pvk, hash);

    return {sig, hash};
};

/**
 * Signs a message hash.
 * @param {hex} pvk - User's private key.
 * @return {hex} msgHash - Hash of data.
 */
const signHash = (pvk, msgHash) => {
    // TODO validate input
    const key = ed25519.getSigningKey(pvk);

    return key.sign(msgHash).toHex();
};

/**
 * Returns a user's public key.
 * @param {hex} derivedEntropy - Entropy derived from master entropy that is decrypted from a QR code.
 * @return {hex} Public key.
 */
const getUserPublicKey = (derivedEntropy) => {
    // TODO validate input
    return hexFromArray(ed25519.getPublicKey(derivedEntropy));
}

/**
 * Returns a user's private key.
 * @param {hex} derivedEntropy - Entropy derived from master entropy that is decrypted from a QR code.
 * @return {hex} Private key.
 */
const getUserPrivateKey = (derivedEntropy) => {
    // TODO validate input
    return hexFromArray(ed25519.getPrivateKey(derivedEntropy));
}

/**
 * Verifies that a message was signed by the private key wiht which the public key is associated.
 * @param {hex} pbk - A user's public key.
 * @param {hex} msgHash - A message hash.
 * @param {???} sig - A message signature.
 * @return {Boolean} True if verified, false otherwise.
 */
const verifyHash = (pbk, msgHash, sig) => {
    // TODO validate input
    const key = ed25519.getVerificationKey(pbk);

    return key.verify(msgHash, sig);
};

// Library version.
const name = 'Image Wallet';

// Library provider.
const provider = 'Trinkler Software AG';

// Library version.
const version = '0.2.3';

// Module exports.
export {
    // ... meta-data
    name,
	provider,
    version,
    // ... image file management
    decryptImage,
    decryptQrData,
    generateFromPassword,
    generateFromPasswordAndImage,
    getQrDataFromImage,
    // ... key derivation, signing ... etc.
    deriveKey,
    getHash,
    getUserPrivateKey,
    getUserPublicKey,
    signData,
    signHash,
    verifyHash,
};
