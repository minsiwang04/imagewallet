// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview An image wallet - easier than brain wallets.
 *
 * @exports decode/deriveKey/encode/name/provider/version
 * @version 0.5.2
 */

// Module imports.
import decodeQR from './decoder/decodeQR';
import decryptQR from './decoder/decryptQR';
import generateEntropy from './cryptography/entropyCreation';
import keyDeriver from './cryptography/keyDerivation/derive';
import {ed25519} from './cryptography/ecc/index';
import encoder from './encoder/index';
import {arrayToHex} from './utils/conversion';
import blake2b from './cryptography/hashing/blake2b';
import keccak256 from './cryptography/hashing/keccak256';
import {NotImplementedError} from './utils/exceptions';
import * as testUtils from './utils/testing';

// Library version.
const name = 'Image Wallet';

// Library provider.
const provider = 'Trinkler Software AG';

// Library version.

const version = '0.5.2';

/**
 * Returns a 32 byte PRNG seed.
 * @param {string} encoding - Seed encoding, defaults to hexadecimal.
 * @return Secret seed.
 */
const createSeed = (encoding) => {
    const seed = generateEntropy();

    return encoding == 'hex' ? seed.toString('hex') : seed;
}

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
* Returns a key pair derived from a seed over which a derivation path algorithm is applied.
 *
 * @param {hex} seed - Master source of entropy.
 * @param {string} coinSymbol - Coin symbol, e.g. IW.
 * @param {number} accountIndex - Account identifier.
 * @return {hex} seed - Master source of entropy.
 */
const deriveKeyPair = (seed, coinSymbol, accountIndex) => {
    const kp = keyDeriver(seed, coinSymbol, accountIndex);

    // Inject shortcut attributes.
    kp.pbk = kp.publicKey;
    kp.pvk = kp.privateKey;

    return kp;
}

/**
* Returns a private key derived from a seed over which a derivation path algorithm is applied.
 *
 * @param {hex} seed - Master source of entropy.
 * @param {string} coinSymbol - Coin symbol, e.g. IW.
 * @param {number} accountIndex - Account identifier.
 * @return {hex} seed - Master source of entropy.
 */
const derivePrivateKey = (seed, coinSymbol, accountIndex) => {
    const kp = deriveKeyPair(seed, coinSymbol, accountIndex);

    return kp.privateKey;
}

// Synonym.
const deriveKey = derivePrivateKey;

/**
 * Asynchronously generates a lightly branded image wallet
 * from a user's password & associated options.
 * @param {object} password - A user's (hopefully strong) password.
 * @param {number} purposeId - A number identifying the purpose of this wallet.
 * @param {object} options - Encoding options.
 * @return A promise resolving to an HTML canvas object.
 */
const generateFromPassword = async (password, purposeId, options) => {
    return await encoder({password}, purposeId, options);
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
 * Returns a blake2b hash of input data.
 * @param {Object} data - Data to be hashed.
 * @param {string} encoding - Required output encoding.
 * @return {Buffer|string} The hashed value.
 */
const getHash = (data, encoding) => {
    // TODO validate input
    const input = JSON.stringify(data);
    return blake2b(input, encoding || 'hex');
}

/**
 * Returns a user's private key.
 * @param {hex} derivedEntropy - Entropy derived from seed decrypted from a QR code.
 * @return {hex} Private key.
 */
const getUserPrivateKey = (derivedEntropy) => {
    // TODO validate input
    return arrayToHex(ed25519.getPrivateKey(derivedEntropy));
}

/**
 * Returns a user's public key.
 * @param {hex} pvk - User's private key.
 * @return {hex} Public key.
 */
const getUserPublicKey = (pvk) => {
    // TODO validate input
    return arrayToHex(ed25519.getPublicKey(pvk));
}

/**
 * Signs a data structure.
 * @param {hex} pvk - User's private key.
 * @param {object} data - Data to be signed.
 * @param {string} encoding - Required signature encoding, hexadecimal string or byte array.
 * @return {object} Signature plus data hash.
 */
const signData = (pvk, data, encoding) => {
    // TODO validate input
    const msgHash = getHash(data);

    const sig = signHash(pvk, msgHash, encoding);

    return {sig, msgHash};
};

/**
 * Signs a message hash.
 * @param {hex} pvk - User's private key.
 * @return {hex} msgHash - Hash of data.
 */
const signHash = (pvk, msgHash, encoding) => {
    // TODO validate input
    return ed25519.sign(pvk, msgHash, encoding || 'hex');
};

/**
 * Verifies that the signature of the hash of the data is verified with the public key.
 * @param {hex} pbk - A user's public key.
 * @param {hex} msgHash - A message hash.
 * @param {???} sig - A message signature.
 * @return {Boolean} True if verified, false otherwise.
 */
const verifyData = (pbk, data, sig) => {
    // TODO validate input
    const msgHash = getHash(data);

    return verifyHash(pbk, msgHash, sig);
};

/**
 * Verifies that the signature of the hash is verified with the public key.
 * @param {hex} pbk - A user's public key.
 * @param {hex} msgHash - A message hash.
 * @param {???} sig - A message signature.
 * @return {Boolean} True if verified, false otherwise.
 */
const verifyHash = (pbk, msgHash, sig) => {
    // TODO validate input
    return ed25519.verify(pbk, msgHash, sig);
};

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
    getQrDataFromImage,
    // ... key derivation, signing ... etc.
    createSeed,
    deriveKey,
    deriveKeyPair,
    derivePrivateKey,
    getHash,
    getUserPrivateKey,
    getUserPublicKey,
    signData,
    signHash,
    verifyData,
    verifyHash,
    // ... testing
    testUtils,
};
