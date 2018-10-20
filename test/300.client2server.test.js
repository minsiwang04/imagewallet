import * as _ from 'lodash';
import * as IW from '../src/index';
import keccak256 from '../src/cryptography/hashes/keccak256';
import * as ed25519 from '../src/cryptography/ecc/eddsa/ed25519';

test('IW :: client 2 server interaction', () => {
	// ------------------------------------------------
	// Client side.
	// ------------------------------------------------
	// ... decrypted from IW QR code
	const secretSeed = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe';

	// ... wallet identifier.
	const walletIndex = 2147483648;

	// ... derived entropy.
	const derivedEntropy = IW.deriveKey(secretSeed, 'IW', 2147483648);

	// ... get user private key.
	const pvk = IW.getUserPrivateKey(derivedEntropy);

	// ... get user public key (i.e. identifier).
	const pbk = IW.getUserPublicKey(pvk);

	// ... get signature + data hash.
	const data = {
		'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
	};
	const {sig, msgHash} = IW.signData(pvk, data);

	// ------------------------------------------------
	// Server side.
	// ------------------------------------------------
	// ... verify with user's public key.
	const verified = IW.verifyHash(pbk, msgHash, sig);
	expect(verified).toBe(true);
});
