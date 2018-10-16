import * as _ from 'lodash';
import {secp256k1 as API} from '../src/cryptography/ecc/index';
import {hash} from '../src/cryptography';
import * as keccak from 'keccak';
import * as utils from './utils';

// Entropy supplied by a PRNG.
const ENTROPY = [198, 48, 225, 10, 99, 32, 50, 39, 228, 109, 128, 78, 145, 225, 42, 154, 120, 164, 192, 17, 255, 125, 73, 26, 255, 238, 18, 51, 141, 200, 27, 79];

// Expected private key.
const PVK = [160, 2, 212, 198, 85, 203, 226, 142, 209, 29, 213, 76, 69, 17, 227, 122, 13, 127, 184, 12, 129, 225, 152, 143, 199, 91, 153, 243, 148, 122, 89, 72];

// Expected public key.
const PBK = [4, 94, 245, 153, 240, 22, 39, 137, 167, 61, 87, 107, 1, 211, 88, 204, 209, 39, 186, 10, 180, 93, 65, 187, 55, 151, 71, 198, 88, 242, 26, 157, 147, 59, 122, 185, 128, 217, 118, 81, 184, 120, 223, 145, 208, 99, 252, 150, 165, 3, 134, 230, 124, 68, 233, 253, 221, 29, 9, 157, 109, 150, 201, 189, 200];

// Data for signing/verification.
const DATA = {
		'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
	};
const DATA_HASH = hash.keccak256(DATA);

// Expected signature.
const SIG = [48, 70, 2, 33, 0, 141, 219, 175, 156, 65, 255, 31, 191, 13, 243, 211, 36, 56, 45, 213, 228, 63, 71, 94, 17, 91, 114, 3, 37, 132, 87, 36, 245, 193, 168, 235, 71, 2, 33, 0, 226, 53, 166, 36, 48, 38, 246, 178, 39, 87, 2, 237, 70, 85, 171, 105, 92, 99, 17, 92, 180, 198, 244, 157, 207, 218, 103, 250, 247, 78, 239, 126];

test('IW :: cryptography :: ecc :: ecdsa:secp256k1 :: getPrivateKey', () => {
    expect(_.isEqual(API.getPrivateKey(ENTROPY), PVK)).toBe(true);
});

test('IW :: cryptography :: ecc :: ecdsa:secp256k1 :: getPublicKey', () => {
    expect(_.isEqual(API.getPublicKey(ENTROPY), PBK)).toBe(true);
});

test('IW :: cryptography :: ecc :: ecdsa:secp256k1 :: sign', () => {
    expect(_.isEqual(API.sign(ENTROPY, DATA_HASH), SIG)).toBe(true);
});

test('IW :: cryptography :: ecc :: ecdsa:secp256k1 :: verify', () => {
    expect(API.verify(ENTROPY, DATA_HASH, SIG)).toBe(true);
});
