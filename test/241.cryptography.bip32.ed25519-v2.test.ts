import * as utils from './utils';

test('IW :: cryptography :: key derivation :: ed25519 :: vector 2', () => {
    utils.executeBip32Tests('ed25519', 2);
});
