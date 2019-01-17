import * as utils from './utils';

test('IW :: cryptography :: key derivation :: ed25519 :: vector 1', () => {
    utils.executeBip32Tests('ed25519', 1);
});
