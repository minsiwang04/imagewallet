import * as _ from 'lodash';
import {ed25519 as API} from '../src/cryptography/ecc/index';
import {hash} from '../src/cryptography';
import * as utils from './utils';

// Entropy supplied by a PRNG.
const ENTROPY = [198, 48, 225, 10, 99, 32, 50, 39, 228, 109, 128, 78, 145, 225, 42, 154, 120, 164, 192, 17, 255, 125, 73, 26, 255, 238, 18, 51, 141, 200, 27, 79];

// Expected private key.
const PVK = [40, 27, 104, 16, 117, 161, 208, 188, 104, 221, 93, 15, 223, 191, 62, 255, 151, 10, 189, 62, 4, 141, 102, 53, 17, 104, 8, 40, 163, 82, 31, 81];

// Expected public key.
const PBK = [143, 255, 168, 145, 149, 27, 25, 161, 74, 116, 247, 130, 170, 37, 204, 80, 83, 146, 39, 145, 14, 13, 53, 245, 216, 34, 164, 53, 176, 238, 177, 221];

// Data for signing/verification.
const DATA = {
		'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
	};
const DATA_HASH = hash.keccak256(DATA);

// Expected signature.
const SIG = [144,78,109,211,22,199,255,253,118,91,8,46,165,81,82,29,238,122,12,57,84,166,113,18,2,58,55,159,161,91,253,52,239,77,232,21,121,172,170,237,81,157,180,140,54,183,137,224,141,49,2,15,53,165,192,130,163,252,102,149,18,33,213,11];

test('IW :: cryptography :: ecc :: eddsa:ed25519 :: getPrivateKey', () => {
    expect(_.isEqual(API.getPrivateKey(ENTROPY), PVK)).toBe(true);
});

test('IW :: cryptography :: ecc :: eddsa:ed25519 :: getPublicKey', () => {
    expect(_.isEqual(API.getPublicKey(ENTROPY), PBK)).toBe(true);
});

test('IW :: cryptography :: ecc :: eddsa:ed25519 :: sign', () => {
    expect(_.isEqual(API.sign(ENTROPY, DATA_HASH), SIG)).toBe(true);
});

test('IW :: cryptography :: ecc :: eddsa:ed25519 :: verify', () => {
    expect(API.verify(PVK, DATA_HASH, SIG)).toBe(true);
});
