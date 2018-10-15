// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Sets encrypted data to be transformed into a QR code.
 */

// Module imports.
import * as cryptography from '../utils/cryptography';
import * as IW from '../index';

/**
 * Encrypts data in readiness for transformation to a QR code.
 * @param {EncodingContextInfo} ctx - Encoding processing context information.
 */
export default async function(ctx) {
    ctx.cipherText = cryptography.encrypt(
        JSON.stringify({
            data: {
                secretSeed: '02f987803ea5bf8960c76c35f6d518d29144604668086daba0d4f5322b0d576e',
            },
            wallet: {
                name: IW.name,
                provider: IW.provider,
                version: IW.version,
            },
        }),
        ctx.credentials.password,
    );
}

/**
 * Returns entropy encoded as a base64 string.
 */
const getEncodedEntropy = () => {
    const asObj = {
        secretSeed: cryptography.generateEntropy(32).toString('hex'),
        wallet: {
            name: IW.name,
            provider: IW.provider,
            version: IW.version,
        }
    };
    const asString = JSON.stringify(asObj);
    const asB64 = new Buffer(asString).toString('base64');

    return asB64;
};
