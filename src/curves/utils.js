const hexRegEx = /([0-9]|[a-f])/gim

const isHex = (input) => {
    return typeof input === 'string' && (input.match(hexRegEx) || []).length === input.length;
};

module.exports = {
    isHex,
};
