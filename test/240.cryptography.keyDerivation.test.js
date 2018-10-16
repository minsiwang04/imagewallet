import * as API from '../src/cryptography/index';
import { InvalidCoinIdentiferError } from '../src/utils/exceptions';
import { BaseError } from '../src/utils/exceptions';
import * as utils from './utils';

// Valid inputs.
const SEED = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe';
const COIN_SYMBOL = 'IW';
const WALLET_INDEX = 2147483648;

// test('IW :: cryptography :: key derivation :: interface', () => {
//     utils.testSlots(API, [
// 		'deriveKey',
// 	]);
// });
//
// test('IW :: cryptography :: key derivation :: invalid coin identifier', () => {
//     const invalid = [999999, 'FSDSDJDL'];
//     invalid.forEach((i) => {
//         expect(() => {
//             API.deriveKey(SEED, i, WALLET_INDEX);
//         }).toThrow();
//     });
// });
//
// test('IW :: cryptography :: key derivation :: invalid entropy', () => {
//     const invalid = ['a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e41', 'FSDSDJDL'];
//     invalid.forEach((i) => {
//         expect(() => {
//             API.deriveKey(i, CHAIN_INDEX, WALLET_INDEX);
//         }).toThrow();
//     });
// });

test('IW :: key derivation :: valid', () => {
    API.deriveKey(SEED, COIN_SYMBOL, WALLET_INDEX);
});
