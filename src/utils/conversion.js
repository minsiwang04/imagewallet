/**
 * Returns a hexadecimal string decoded from a binary array. 
 *
 * @param {Array} arr - A binary array.
 * @return A hexadecimal encoded string.
 */
export const hexFromArray = (arr) => {
    let hex = "0x";
    for (let i = 0, l = arr.length; i < l; ++i) {
        let b = arr[i];
        hex += (b < 16 ? "0" : "") + b.toString(16);
    }
    return hex;
}

/**
 * Returns a hexadecimal string decoded from an unsigned 8 bit array. 
 *
 * @param {Uint8Array} arr - An unsigned 8 bit array.
 * @return A hexadecimal encoded string.
 */
export const hexFromUint8Array = (arr) => {
    return hexFromArray([].slice.call(arr, 0));
}

/**
 * Returns a binary array decoded from a hexadecimal string.
 *
 * @param {string} hex - A hexadecimal encoded string.
 * @return Array
 */
export const hexToArray = (hex) => {
  let arr = [];
  for (let i = 2, l = hex.length; i < l; i += 2)
    arr.push(parseInt(hex.slice(i, i + 2), 16));
  return arr;
}

/**
 * Returns an unsigned 8 bit array decoded from a hexadecimal string.
 *
 * @param {string} hex - A hexadecimal encoded string.
 * @return Uint8Array.
 */
export const hexToUint8Array = (hex) => {
    return new Uint8Array(hexToArray(hex));
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
