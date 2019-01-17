// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview QR code payload encryption/decryption.
 */

// Module imports.
import * as cryptography from '../cryptography/index';
import * as exceptions from '../utils/exceptions';

// Number of entropic bytes.
const ENTROPY_BYTES = 32;

// Number of salt bytes.
const SALT_BYTES = 16;

// Number of rounds used for key derivation.
const KDF_ROUNDS = 256;

// Payload format version.
const FORMAT_VERSION = 1;

export default class Payload {
    /**
     * @param {number} purposeId
     * @param {Buffer} entropy
     */
    constructor(purposeId, entropy) {
        this._purposeId = purposeId;
        this._entropy = entropy;
    }

    /**
     *
     * @param {number} purposeId
     * @return {Payload}
     */
    static generate(purposeId) {
        // TODO validate that purposeId is uint32
        const entropy = cryptography.generateEntropy(ENTROPY_BYTES);
        return new Payload(purposeId, entropy);
    }

    /**
     * @param {Buffer} encrypted
     * @param {string} password
     * @return {Payload}
     * @throws {IncorrectPasswordError}
     */
    static async decrypt(encrypted, password) {
        const version = encrypted[0];
        if (version !== FORMAT_VERSION) {
            throw new exceptions.UnsupportedVersionError();
        }

        // TODO validate size.

        const kdfRoundsLog2 = encrypted[1];
        if (kdfRoundsLog2 > 32) {
            throw new exceptions.ExcessiveRoundsError();
        }

        const kdfRounds = Math.pow(2, kdfRoundsLog2);
        const salt = encrypted.slice(2, 2 + SALT_BYTES);
        const cipherText = encrypted.slice(2 + SALT_BYTES);

        const plainText = await cryptography.decrypt(cipherText, password, salt, kdfRounds);
        const purposeId = plainText.readUInt32BE(0);
        const entropy = plainText.slice(4);

        return new Payload(purposeId, entropy);
    }

    /**
     *
     * @param {string} password
     * @returns {Promise.<Buffer>}
     */
    async encrypt(password) {
        const plainText = Buffer.alloc(/*purposeId*/ 4 + ENTROPY_BYTES);
        plainText.writeUInt32BE(this._purposeId, 0);
        this._entropy.copy(plainText, 4);

        const salt = cryptography.generateEntropy(SALT_BYTES);
        const cipherText = await cryptography.encrypt(plainText, password, salt, KDF_ROUNDS);

        const cipherTextWithHeader = Buffer.alloc(
            /*version*/ 1
            + /*kdf rounds*/ 1
            + /*salt*/ SALT_BYTES
            + cipherText.length
        );
        cipherTextWithHeader[0] = FORMAT_VERSION;
        cipherTextWithHeader[1] = Math.log2(KDF_ROUNDS);
        salt.copy(cipherTextWithHeader, 2);
        cipherText.copy(cipherTextWithHeader, 2 + SALT_BYTES);

        return cipherTextWithHeader;
    }

    /**
     * @type {Buffer}
     */
    get entropy() {
        return this._entropy;
    }

    /**
     * @type {number}
     */
    get purposeId() {
        return this._purposeId;
    }
}
