import * as _ from 'lodash';
import * as API from '../src/index';
import { InvalidCoinIdentiferError } from '../src/utils/exceptions';
import { BaseError } from '../src/utils/exceptions';
import * as utils from './utils';

// Valid inputs.
const SEED = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe';
const COIN_SYMBOL = 'IW';
const WALLET_INDEX = 2147483648;
const DERIVED_PVK = '6b5227879d093035f0586830594b3ae03101d3f5436a3a96cc3d3fe6730260b3';
const DERIVED_PBK = '0002a4f595def0d6be7dfde03072bf71040fa0eb649cf4ee0dd8f31df55d3af7a5';
const DERIVED_RANGE = [
    '6b5227879d093035f0586830594b3ae03101d3f5436a3a96cc3d3fe6730260b3',
    'f1def064d2078eccfa79ba89616c6583eced4d2c57aea54cbcd99235fbcbe0ab',
    'ebfe7b4dd10e00c7faf25a8605b352782022a7f5f842b8dbb9f6f2c9e9010941',
    '13330e0e7826ad07817c251b69a983c2f7400096332fe2c62b665af71c668154',
    '03b6d9ee1100907c01a2a468bbaaa4339c2d047b27d84650869d821461289532'
];

test('IW :: cryptography :: key derivation :: interface', () => {
    utils.testSlots(API, [
		'deriveKey',
	]);
});

test('IW :: cryptography :: key derivation :: invalid coin identifier', () => {
    const invalid = [999999, 'FSDSDJDL'];
    invalid.forEach((i) => {
        expect(() => {
            API.deriveKey(SEED, i, WALLET_INDEX);
        }).toThrow();
    });
});

test('IW :: cryptography :: key derivation :: invalid entropy', () => {
    const invalid = ['a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e41', 'FSDSDJDL'];
    invalid.forEach((i) => {
        expect(() => {
            API.deriveKey(i, CHAIN_INDEX, WALLET_INDEX);
        }).toThrow();
    });
});

test('IW :: cryptography :: key derivation :: valid', () => {
    const derived = API.deriveKeyPair(SEED, COIN_SYMBOL, WALLET_INDEX);
    expect(derived.privateKey).toBe(DERIVED_PVK);
    expect(derived.publicKey).toBe(DERIVED_PBK);
});

test('IW :: cryptography :: key derivation :: ranged :: 01', () => {
    const derived = _.map(_.range(5), (i) => {
        return API.deriveKey(SEED, COIN_SYMBOL, WALLET_INDEX - i);
    });
    expect(_.uniq(derived).length).toBe(5);
    expect(_.isEqual(derived, DERIVED_RANGE)).toBe(true);
});

test('IW :: cryptography :: key derivation :: ranged :: 02', () => {
    const derived = _.map(_.range(5), (i) => {
        return API.deriveKeyPair(SEED, COIN_SYMBOL, WALLET_INDEX - i);
    });
    expect(_.uniq(_.map(derived, 'privateKey')).length).toBe(5);
    expect(_.uniq(_.map(derived, 'publicKey')).length).toBe(5);
});
