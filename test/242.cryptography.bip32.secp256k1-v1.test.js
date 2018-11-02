import * as utils from './utils';

test('IW :: cryptography :: key derivation :: secp256k1 :: vector 1', () => {
    execute(utils.getBip32TestConfig('secp256k1', 1));
});
