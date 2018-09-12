/**
 * Returns a flag indicating whether input is a hexadecimal string.
 *
 * @param {string} input - An input string.
 * @return True if hexadecimal, false otherwise.
 */
export const isHex = (input) => {
    if (typeof input !== 'string') {
        return false;
    }
    return parseInt(input, 16).toString(16) === input.toLowerCase();
};
