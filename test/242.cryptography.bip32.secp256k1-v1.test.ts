import * as utils from './utils';

test('IW :: cryptography :: key derivation :: secp256k1 :: vector 1', () => {
    utils.executeBip32Tests('secp256k1', 1);
});
