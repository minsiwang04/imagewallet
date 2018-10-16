import * as _ from 'lodash';
import * as keccak from 'keccak';
import * as CONVERTOR from '../src/utils/conversion';
import * as CURVE from '../src/curves/ecdsa/secp256k1';

// Entropy supplied by an RNG.
const ENTROPY = [
    198, 48, 225, 10, 99, 32, 50, 39, 228, 109, 128, 78, 145, 225, 42, 154,
    120, 164, 192, 17, 255, 125, 73, 26, 255, 238, 18, 51, 141, 200, 27, 79
    ];

// Expected private key.
const PVK = [
    160, 2, 212, 198, 85, 203, 226, 142, 209, 29, 213, 76, 69, 17, 227, 122,
    13, 127, 184, 12, 129, 225, 152, 143, 199, 91, 153, 243, 148, 122, 89, 72
    ];

// Expected public key.
const PBK = _.concat(
    4,
    94, 245, 153, 240, 22, 39, 137, 167, 61, 87, 107, 1, 211, 88, 204, 209,
    39, 186, 10, 180, 93, 65, 187, 55, 151, 71, 198, 88, 242, 26, 157, 147,
    59, 122, 185, 128, 217, 118, 81, 184, 120, 223, 145, 208, 99, 252, 150,
    165, 3, 134, 230, 124, 68, 233, 253, 221, 29, 9, 157, 109, 150, 201, 189, 200
    )

// Expected signature.
const SIG = [
    48, 68, 2, 32,
    45, 76, 83, 107, 155, 77, 218, 32, 10, 124, 192, 180, 34, 211, 86, 29,
    184, 114, 141, 153, 124, 82, 141, 102, 243, 2, 52, 32, 46, 202, 204, 196,
    2, 32,
    32, 119, 187, 198, 177, 3, 95, 17, 33, 185, 252, 126, 235, 25, 106, 133,
    208, 240, 166, 94, 60, 163, 227, 207, 90, 2, 197, 240, 251, 153, 200, 114
    ];

// Data for signing/verification.
const DATA = 'Hello Dolly!'
const DATA_HASH = keccak.default('keccak256').update(DATA).digest('hex');

test('IW :: cryptography :: curves :: ecdsa:secp256k1 :: interface', () => {
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

test('IW :: cryptography :: curves :: ecdsa:secp256k1 :: getPrivateKey', () => {
    expect(_.isEqual(CURVE.getPrivateKey(ENTROPY), PVK)).toBe(true);
});

test('IW :: cryptography :: curves :: ecdsa:secp256k1 :: getPublicKey', () => {
    expect(_.isEqual(CURVE.getPublicKey(ENTROPY), PBK)).toBe(true);
});

test('IW :: cryptography :: curves :: ecdsa:secp256k1 :: sign', () => {
    expect(_.isEqual(CURVE.sign(ENTROPY, DATA_HASH), SIG)).toBe(true);
});

test('IW :: cryptography :: curves :: ecdsa:secp256k1 :: verify', () => {
    expect(CURVE.verify(ENTROPY, DATA_HASH, SIG)).toBe(true);
});
