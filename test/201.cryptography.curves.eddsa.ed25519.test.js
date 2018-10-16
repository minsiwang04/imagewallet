import * as _ from 'lodash';
import * as keccak from 'keccak';
import * as CONVERTOR from '../src/utils/conversion';
import * as CURVE from '../src/curves/eddsa/ed25519';


const ENTROPY = [
    198, 48, 225, 10, 99, 32, 50, 39, 228, 109, 128, 78, 145, 225, 42, 154,
    120, 164, 192, 17, 255, 125, 73, 26, 255, 238, 18, 51, 141, 200, 27, 79
    ];

const PVK = [
    40, 27, 104, 16, 117, 161, 208, 188, 104, 221, 93, 15, 223, 191, 62, 255,
    151, 10, 189, 62, 4, 141, 102, 53, 17, 104, 8, 40, 163, 82, 31, 81
    ];

const PBK = [
    143, 255, 168, 145, 149, 27, 25, 161, 74, 116, 247, 130, 170, 37, 204, 80,
    83, 146, 39, 145, 14, 13, 53, 245, 216, 34, 164, 53, 176, 238, 177, 221
    ];

const PVK_HEX = 'a002d4c655cbe28ed11dd54c4511e37a0d7fb80c81e1988fc75b99f3947a5948';

const PBK_HEX = '045ef599f0162789a73d576b01d358ccd127ba0ab45d41bb379747c658f21a9d933b7ab980d97651b878df91d063fc96a50386e67c44e9fddd1d099d6d96c9bdc8'

// Expected signature.
const SIG_R = [
    45, 76, 83, 107, 155, 77, 218, 32, 10, 124, 192, 180, 34, 211, 86, 29,
    184, 114, 141, 153, 124, 82, 141, 102, 243, 2, 52, 32, 46, 202, 204, 196,
    ];
const SIG_S = [
    32, 119, 187, 198, 177, 3, 95, 17, 33, 185, 252, 126, 235, 25, 106, 133,
    208, 240, 166, 94, 60, 163, 227, 207, 90, 2, 197, 240, 251, 153, 200, 114
];
const SIG =_.concat(48, 68, 2, 32, SIG_R, 2, 32, SIG_S);

// Data for signing/verification.
const DATA = 'Hello Dolly!';
const DATA_HASH = keccak.default('keccak256').update(DATA).digest('hex');
const HASH = [
    37, 200, 211, 27, 45, 131, 99, 13, 124, 243, 97, 249, 180, 42, 180,
    9, 32, 169, 128, 221, 34, 18, 34, 89, 86, 165, 6, 172, 45, 8, 216, 14
    ];

test('IW :: cryptography :: curves :: eddsa:ed25519 :: interface', () => {
    const slots = [
        'getPrivateKey',
        'getPublicKey',
        'sign',
        'verify',
    ];
    slots.forEach((slot) => {
        expect(CURVE[slot]).toBeDefined();
    });
});

test('IW :: cryptography :: curves :: eddsa:ed25519 :: getPrivateKey', () => {
    expect(_.isEqual(CURVE.getPrivateKey(ENTROPY), PVK)).toBe(true);
});

test('IW :: cryptography :: curves :: eddsa:ed25519 :: getPublicKey', () => {
    expect(_.isEqual(CURVE.getPublicKey(ENTROPY), PBK)).toBe(true);
});

test('IW :: cryptography :: curves :: eddsa:ed25519 :: sign', () => {
    expect(_.isEqual(CURVE.sign(ENTROPY, DATA_HASH), SIG)).toBe(true);
});

// test('IW :: cryptography :: curves :: eddsa:ed25519 :: verify', () => {
//     expect(CURVE.verify(PVK, DATA_HASH, SIG)).toBe(true);
// });
