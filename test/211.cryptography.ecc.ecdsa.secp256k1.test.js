import * as _ from 'lodash';
import * as IW from '../src/index';
import {secp256k1 as API} from '../src/cryptography/ecc/index';
import {hexFromArray} from '../src/utils/conversion';

// Entropy supplied by a PRNG.
const ENTROPY = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe';

// Expected private key.
const PVK = [221, 186, 170, 86, 192, 112, 157, 202, 141, 59, 29, 51, 58, 103, 121, 164, 198, 161, 93, 94, 196, 138, 11, 140, 80, 216, 253, 174, 71, 220, 53, 235];

// Expected public key.
const PBK = [2, 255, 59, 23, 74, 23, 239, 121, 57, 10, 18, 33, 111, 155, 131, 73, 19, 136, 3, 68, 35, 143, 41, 138, 120, 104, 244, 165, 128, 227, 44, 221, 26];

// Data for signing/verification.
const DATA_HASH = IW.getHash({
	'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
});

// Expected signature.
const SIG = [48, 69, 2, 32, 82, 17, 83, 88, 232, 239, 206, 88, 132, 17, 165, 253, 177, 46, 180, 66, 203, 79, 151, 125, 236, 169, 113, 159, 55, 244, 232, 208, 224, 234, 135, 199, 2, 33, 0, 207, 61, 29, 196, 98, 182, 246, 128, 233, 174, 251, 221, 66, 60, 158, 122, 51, 184, 226, 134, 235, 195, 111, 243, 74, 136, 176, 53, 165, 213, 163, 24];

test('IW :: cryptography :: ecc :: eddsa:ed25519 :: getKeyPair', () => {
	let kp = API.getKeyPair(ENTROPY);
	kp = API.getKeyPair(ENTROPY);
});

test('IW :: cryptography :: ecc :: ecdsa:secp256k1 :: getPrivateKey', () => {
	const pvk = API.getPrivateKey(ENTROPY);
    expect(_.isEqual(pvk, PVK)).toBe(true);
});

test('IW :: cryptography :: ecc :: ecdsa:secp256k1 :: getPublicKey', () => {
	const pbk = API.getPublicKey(PVK);
    expect(_.isEqual(pbk, PBK)).toBe(true);
});

test('IW :: cryptography :: ecc :: ecdsa:secp256k1 :: sign', () => {
	const sig = API.sign(PVK, DATA_HASH);
    expect(_.isEqual(sig, SIG)).toBe(true);
});

test('IW :: cryptography :: ecc :: ecdsa:secp256k1 :: verify', () => {
    expect(API.verify(PBK, DATA_HASH, SIG)).toBe(true);
});
