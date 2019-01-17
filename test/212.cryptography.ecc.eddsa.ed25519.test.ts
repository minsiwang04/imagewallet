import * as _ from 'lodash';
import * as IW from '../src/index';
import {ed25519 as API} from '../src/cryptography/ecc/index';

// Entropy supplied by a PRNG.
const ENTROPY = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe';

// Expected private key.
const PVK = [240, 191, 75, 102, 214, 131, 180, 62, 206, 64, 68, 50, 57, 120, 240, 186, 39, 128, 13, 68, 38, 19, 88, 107, 224, 102, 244, 165, 120, 105, 160, 115];

// Expected public key.
const PBK = [0, 87, 250, 206, 35, 35, 143, 25, 229, 93, 97, 214, 159, 100, 97, 188, 63, 207, 152, 100, 136, 129, 123, 173, 246, 198, 185, 231, 238, 47, 67, 165, 19];

// Data for signing/verification.
const DATA_HASH = IW.getHash({
	'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
});

// Expected signature.
const SIG = {
	asBytes: [40, 176, 131, 175, 103, 99, 218, 187, 6, 77, 236, 92, 16, 91, 52, 146, 111, 54, 215, 27, 158, 198, 115, 253, 221, 240, 198, 81, 123, 228, 44, 146, 222, 211, 251, 224, 160, 88, 114, 89, 103, 74, 150, 97, 218, 46, 50, 18, 216, 59, 203, 159, 211, 83, 60, 63, 48, 117, 238, 234, 161, 10, 10, 12],
	asHex: '28B083AF6763DABB064DEC5C105B34926F36D71B9EC673FDDDF0C6517BE42C92DED3FBE0A0587259674A9661DA2E3212D83BCB9FD3533C3F3075EEEAA10A0A0C'
}

test('IW :: cryptography :: ecc :: eddsa:ed25519 :: getKeyPair', () => {
	const kp = API.getKeyPair(ENTROPY);
	expect(kp).toBeDefined();
});

test('IW :: cryptography :: ecc :: eddsa:ed25519 :: getPrivateKey', () => {
	const pvk = API.getPrivateKey(ENTROPY);
    expect(_.isEqual(pvk, PVK)).toBe(true);
});

test('IW :: cryptography :: ecc :: eddsa:ed25519 :: getPublicKey', () => {
	const pbk = API.getPublicKey(PVK);
    expect(_.isEqual(pbk, PBK)).toBe(true);
});

test('IW :: cryptography :: ecc :: eddsa:ed25519 :: sign bytes', () => {
	const sig = API.sign(PVK, DATA_HASH);
    expect(_.isEqual(sig, SIG.asBytes)).toBe(true);
});

test('IW :: cryptography :: ecc :: eddsa:ed25519 :: sign hex', () => {
	const sig = API.sign(PVK, DATA_HASH, 'hex');
    expect(_.isEqual(sig, SIG.asHex)).toBe(true);
});

test('IW :: cryptography :: ecc :: eddsa:ed25519 :: verify bytes', () => {
	expect(API.verify(PBK, DATA_HASH, SIG.asHex)).toBe(true);
});

test('IW :: cryptography :: ecc :: eddsa:ed25519 :: verify hex', () => {
	expect(API.verify(PBK, DATA_HASH, SIG.asHex)).toBe(true);
});
