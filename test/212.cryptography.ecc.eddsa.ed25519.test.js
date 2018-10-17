import * as _ from 'lodash';
import {ed25519 as API} from '../src/cryptography/ecc/index';
import {hash} from '../src/cryptography';
import * as utils from './utils';

// Entropy supplied by a PRNG.
// const ENTROPY = [51, 249, 175, 112, 28, 27, 243, 17, 139, 94, 116, 114, 230, 189, 105, 90, 206, 28, 109, 226, 213, 26, 59, 123, 161, 114, 72, 84, 63, 82, 50, 193];
const ENTROPY = '33f9af701c1bf3118b5e7472e6bd695ace1c6de2d51a3b7ba17248543f5232c1';

// Expected private key.
const PVK = [144, 175, 138, 157, 198, 117, 158, 134, 65, 29, 106, 30, 177, 152, 47, 204, 156, 152, 177, 151, 41, 49, 145, 158, 4, 101, 12, 97, 144, 240, 14, 106];

// Expected public key.
const PBK = [100, 165, 232, 92, 163, 107, 82, 10, 177, 15, 223, 245, 65, 126, 138, 63, 188, 91, 237, 217, 233, 131, 166, 121, 237, 28, 158, 51, 172, 67, 13, 209];

// Data for signing/verification.
const DATA = {
		'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
	};
const DATA_HASH = hash.keccak256(DATA);

// Expected signature.
const SIG = [172, 203, 142, 225, 65, 23, 200, 191, 125, 233, 252, 198, 39, 44, 148, 215, 162, 161, 28, 88, 153, 182, 244, 130, 124, 93, 89, 138, 131, 185, 239, 140, 211, 166, 183, 96, 64, 245, 254, 185, 194, 158, 76, 73, 141, 164, 83, 115, 226, 233, 181, 151, 79, 208, 14, 137, 18, 114, 66, 50, 78, 77, 213, 6];

test('IW :: cryptography :: ecc :: eddsa:ed25519 :: getPrivateKey', () => {
	const pvk = API.getPrivateKey(ENTROPY);
    expect(_.isEqual(pvk, PVK)).toBe(true);
});

test('IW :: cryptography :: ecc :: eddsa:ed25519 :: getPublicKey', () => {
	const pbk = API.getPublicKey(ENTROPY);
    expect(_.isEqual(pbk, PBK)).toBe(true);
});

test('IW :: cryptography :: ecc :: eddsa:ed25519 :: sign', () => {
	const sig = API.sign(ENTROPY, DATA_HASH);
    expect(_.isEqual(sig, SIG)).toBe(true);
});

test('IW :: cryptography :: ecc :: eddsa:ed25519 :: verify', () => {
    expect(API.verify(ENTROPY, DATA_HASH, SIG)).toBe(true);
});
