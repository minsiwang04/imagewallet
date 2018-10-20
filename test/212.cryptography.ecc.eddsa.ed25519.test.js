import * as _ from 'lodash';
import * as IW from '../src/index';
import {ed25519 as API} from '../src/cryptography/ecc/index';

// Entropy supplied by a PRNG.
const ENTROPY = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe';

// Expected private key.
const PVK = [240, 191, 75, 102, 214, 131, 180, 62, 206, 64, 68, 50, 57, 120, 240, 186, 39, 128, 13, 68, 38, 19, 88, 107, 224, 102, 244, 165, 120, 105, 160, 115];

// Expected public key.
const PBK = [87, 250, 206, 35, 35, 143, 25, 229, 93, 97, 214, 159, 100, 97, 188, 63, 207, 152, 100, 136, 129, 123, 173, 246, 198, 185, 231, 238, 47, 67, 165, 19];

// Data for signing/verification.
const DATA_HASH = IW.getHash({
	'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
});

// Expected signature.
const SIG = {
	asBytes: [242, 119, 53, 133, 108, 147, 108, 83, 24, 132, 69, 52, 119, 91, 234, 78, 136, 133, 149, 86, 101, 116, 152, 212, 52, 242, 147, 52, 15, 161, 64, 127, 160, 32, 225, 177, 153, 115, 220, 79, 141, 140, 99, 14, 7, 118, 243, 35, 202, 255, 0, 34, 206, 165, 169, 69, 239, 139, 192, 26, 137, 146, 128, 2],
	asHex: 'F27735856C936C5318844534775BEA4E88859556657498D434F293340FA1407FA020E1B19973DC4F8D8C630E0776F323CAFF0022CEA5A945EF8BC01A89928002'
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
