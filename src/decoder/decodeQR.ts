// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Decodes the QR code from an image wallet.
 */

// Module imports.
import jsQR from 'jsqr';
import PNGReader from 'png.js';
import { InvalidPngFileError } from '../utils/exceptions';
import { readFileAsArrayBuffer } from '../utils/io';
import { readFileAsDataURL } from '../utils/io';

/**
 * Scans QR code embedded in image wallet.
 * @param {Blob} blob - An image wallet.
 * @return {Buffer} - QR code payload.
 */
export default async function(blob) {
    const buffer = await readFileAsArrayBuffer(blob);
    const decoded = await decodeFromFileBuffer(buffer);
    return Buffer.from(decoded.binaryData);
}

/**
 * Extract qr data from PNG file buffer.
 * @param {ArrayBuffer} buffer - PNG file array buffer.
 */
const decodeFromFileBuffer = async (buffer) => {
    return new Promise((resolve, reject) => {
        const pr = new PNGReader(buffer);
        pr.parse((err, pngData) => {
            if (err) {
                reject(new InvalidPngFileError(err));
            }
            const pixelArray = convertPngToByteArray(pngData);
            resolve(jsQR(pixelArray, pngData.width, pngData.height));
        });
    });
};

/**
 * Convert PNG data to a byte array.
 * @param {PNGReader.Output} pngData - Data emitted from PNG parser.
 */
const convertPngToByteArray = (pngData) => {
    const arr = new Uint8ClampedArray(pngData.width * pngData.height * 4);
    for (let y = 0; y < pngData.height; y++) {
        for (let x = 0; x < pngData.width; x++) {
            const pixelData = pngData.getPixel(x, y);
            arr[(y * pngData.width + x) * 4 + 0] = pixelData[0];
            arr[(y * pngData.width + x) * 4 + 1] = pixelData[1];
            arr[(y * pngData.width + x) * 4 + 2] = pixelData[2];
            arr[(y * pngData.width + x) * 4 + 3] = pixelData[3];
        }
    }
    return arr;
};
