// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

// Module imports.
const elliptic = require('elliptic');

// Set EcDSA context.
const ed25519 = new elliptic.eddsa('ed25519');

/**
 * Generates and returns an asymmetric key pair.
 * @param {string} secret - A 256 bit string generated by a source with sufficient entropy.
 * @return A promise encoded image wallet.
 */
const createKey = (secret) => {
    return ed25519.keyFromSecret(secret).priv().toString('hex');
};

const getPublicKey = (key) => {
    console.log(123);
};

/**
 * Signs a hashed message.
 * @param {object} key - An assymmetric key pair generated from a random secret.
 * @param {object} messageHash - A message hashed with hash.js library.
 * @return A promise encoded image wallet.
 */
const signMessageHash = (key, messageHash) => {
    return key.sign(messageHash);
};

const verifyMessageHash = (messageHash, signature, key) => {
    return key.verify(messageHash, signature);
};

module.exports = {
    createKey,
    getPublicKey,
    signMessageHash,
    verifyMessageHash
};