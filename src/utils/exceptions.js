// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Exceptions thrown by the library.
 */

/**
 * Managed exceptions base class.
 * @constructor
 * @param {string} err - Error message.
 * @param {string} code - Error code.
 */
export class BaseError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
    }
}

/**
 * Error thrown when a feature is invoked but not yet implemented.
 */
export class NotImplementedError extends BaseError {
    constructor() {
        super('Feature is not implemented at this time', 'ERR_NOT_iMPLEMENTED');
    }
}

/**
 * Wraps decoding pipeline errors.
 */
export class DecodingError extends BaseError {
    constructor(err, code) {
        super('Decoder :: ' + err, code || 'ERR_DECODING');
    }
}

/**
 * Wraps encoding pipeline errors.
 * @constructor
 * @param {string} err - Error message.
 * @param {string} code - Error code.
 */
export class EncodingError extends BaseError {
    constructor(err, code) {
        super('Encoder :: ' + err, code || 'ERR_ENCODING');
    }
}

/**
 * Raised when secret seed is deemed to be invalid.
 * @constructor
 * @param {string} err - Error message.
 */
export class InvalidSecretSeedError extends EncodingError {
    constructor(msg) {
        super(msg, 'ERR_ENCODING_INVALID_PRIVATE_KEY');
    }
}

/**
 * Raised when a user password is deemed to be invalid.
 * @constructor
 * @param {string} err - Error message.
 */
export class InvalidPasswordError extends EncodingError {
    constructor() {
        super(
            'User password must be >= 8 chars in length',
            'ERR_ENCODING_INVALID_PASSWORD',
        );
    }
}

/**
 * Raised when image wallet png file is deemed to be invalid.
 * @constructor
 * @param {string} err - Error message.
 */
export class InvalidPngFileError extends DecodingError {
    constructor(msg) {
        super(msg, 'ERR_DECODING_INVALID_PMG_FILE');
    }
}
