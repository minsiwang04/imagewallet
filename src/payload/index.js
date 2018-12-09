// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview TODO
 */

// Module imports.
import * as cryptography from '../cryptography/index';

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
    static decrypt(encrypted, password) {
        const version = encrypted[0];
        if (version !== FORMAT_VERSION) {
            // TODO exception type.
            throw 'Unsupported version';
        }

        // TODO validate size.

        // TODO limit number of rounds? This can take forever...
        const kdfRounds = Math.pow(2, encrypted[1]);
        const salt = encrypted.slice(2, 2 + SALT_BYTES);
        const cipherText = encrypted.slice(2 + SALT_BYTES);

        const plainText = cryptography.decrypt(cipherText, password, salt, kdfRounds);
        const purposeId = plainText[0] << 24 | plainText[1] << 16 | plainText[2] << 8 | plainText[3];
        const entropy = plainText.slice(4);

        return new Payload(purposeId, entropy);
    }

    /**
     *
     * @param {string} password
     * @returns {Uint8Array}
     */
    encrypt(password) {
        const plainText = new Uint8Array(/*purposeId*/ 4 + ENTROPY_BYTES);
        plainText[0] = this._purposeId >> 24 & 0xff;
        plainText[1] = this._purposeId >> 16 & 0xff;
        plainText[2] = this._purposeId >> 8 & 0xff;
        plainText[3] = this._purposeId & 0xff;
        plainText.set(this._entropy, 4);

        const salt = cryptography.generateEntropy(SALT_BYTES);
        const cipherText = cryptography.encrypt(plainText, password, salt, KDF_ROUNDS);

        const cipherTextWithHeader = new Uint8Array(
            /*version*/ 1
            + /*kdf rounds*/ 1
            + /*salt*/ SALT_BYTES
            + cipherText.byteLength
        );
        cipherTextWithHeader[0] = FORMAT_VERSION;
        cipherTextWithHeader[1] = Math.log2(KDF_ROUNDS);
        cipherTextWithHeader.set(salt, 2);
        cipherTextWithHeader.set(cipherText, 2 + SALT_BYTES);

        return cipherTextWithHeader;
    }
}
