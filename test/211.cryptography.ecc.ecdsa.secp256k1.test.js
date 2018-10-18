import * as _ from 'lodash';
import * as IW from '../src/index';
import {secp256k1 as API} from '../src/cryptography/ecc/index';

// Entropy supplied by a PRNG.
const ENTROPY = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe';

// Expected private key.
const PVK = [221, 186, 170, 86, 192, 112, 157, 202, 141, 59, 29, 51, 58, 103, 121, 164, 198, 161, 93, 94, 196, 138, 11, 140, 80, 216, 253, 174, 71, 220, 53, 235];

// Expected public key.
const PBK = [4, 82, 45, 165, 253, 96, 141, 172, 25, 113, 210, 169, 89, 247, 120, 173, 191, 11, 191, 111, 80, 190, 168, 65, 105, 234, 45, 146, 61, 115, 251, 47, 29, 70, 182, 156, 239, 84, 204, 50, 239, 149, 43, 117, 8, 22, 18, 221, 37, 157, 130, 233, 55, 146, 42, 90, 85, 153, 68, 168, 52, 135, 248, 252, 80];

// Data for signing/verification.
const DATA_HASH = IW.getHash({
	'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
});

// Expected signature.
const SIG = [48, 68, 2, 32, 19, 44, 249, 138, 133, 118, 216, 167, 202, 195, 126, 87, 67, 180, 138, 52, 72, 245, 228, 34, 190, 161, 150, 4, 159, 16, 14, 219, 239, 243, 12, 153, 2, 32, 74, 146, 95, 45, 65, 32, 56, 53, 151, 25, 154, 88, 160, 13, 62, 181, 224, 133, 149, 174, 248, 155, 216, 163, 206, 57, 14, 203, 73, 255, 118, 102];

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

test('IW :: cryptography :: ecc :: ecdsa:secp256k1 :: getSigningKey', () => {
	const key = API.getSigningKey(PVK);
	expect(key).toBeDefined();
});

test('IW :: cryptography :: ecc :: ecdsa:secp256k1 :: getVerificationKey', () => {
	const key = API.getVerificationKey(PBK);
	expect(key).toBeDefined();
});

test('IW :: cryptography :: ecc :: ecdsa:secp256k1 :: sign', () => {
	const sig = API.sign(PVK, DATA_HASH);
    expect(_.isEqual(sig, SIG)).toBe(true);
});

test('IW :: cryptography :: ecc :: ecdsa:secp256k1 :: verify', () => {
    expect(API.verify(PBK, DATA_HASH, SIG)).toBe(true);
});
