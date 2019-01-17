// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Library type instance converstion utility functions.
 */

 /**
 * Returns a hexadecimal string decoded from a binary array.
 *
 * @param {Array} arr - A binary array.
 * @return A hexadecimal encoded string.
 */
export const arrayToHex = (arr) => {
    let hex = "";
    arr.forEach((i) => {
        hex += (i < 16 ? "0" : "") + i.toString(16);
    });
    return hex;
}

/**
 * Returns a binary array decoded from a hexadecimal string.
 *
 * @param {string} hex - A hexadecimal encoded string.
 * @return Array
 */
export const hexToArray = (hex) => {
    let arr = [];
    for (let i = 2, l = hex.length; i < l; i += 2) {
        arr.push(parseInt(hex.slice(i, i + 2), 16));
    }
    return arr;
}

/**
 * Returns a flag indicating whether input is a hexadecimal string.
 *
 * @param {string} input - An input string.
 * @return True if hexadecimal, false otherwise.
 */
export const isHexString = (input) => {
    if (typeof input !== 'string') {
        return false;
    }
    return parseInt(input, 16).toString(16) === input.toLowerCase();
};
