// Module imports.
import * as CRYPTO from '../src/cryptography/index';
import { InvalidCoinIdentiferError } from '../src/utils/exceptions';
import { BaseError } from '../src/utils/exceptions';

// Valid inputs.
const VALID_CHAIN_INDEX = 242;
const VALID_SEED = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe';


test('IW :: key derivation :: invalid coin identifier', () => {
    const invalid = [999999, 'FSDSDJDL'];
    invalid.forEach((i) => {
        expect(() => {
            CRYPTO.deriveKey(1, i, VALID_SEED);
        }).toThrow();
    });
});

test('IW :: key derivation :: invalid entropy', () => {
    const invalid = ['a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe', 'FSDSDJDL'];
    invalid.forEach((i) => {
        expect(() => {
            CRYPTO.deriveKey(1, VALID_CHAIN_IDX, i);
        }).toThrow();
    });
});

test('IW :: key derivation :: valid', () => {
    CRYPTO.deriveKey(1, VALID_CHAIN_INDEX, VALID_SEED);
});
