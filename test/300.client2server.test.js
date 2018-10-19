import * as _ from 'lodash';
import * as IW from '../src/index';
import keccak256 from '../src/cryptography/hashes/keccak256';
import * as ed25519 from '../src/cryptography/ecc/eddsa/ed25519';

test('IW :: client2server', () => {
	// Client side.
	// ... decrypted from IW QR code
	const secretSeed = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe';

	// ... wallet identifier.
	const walletIndex = 2147483648;

	// ... derived entropy.
	const derivedEntropy = IW.deriveKey(secretSeed, 'IW', 2147483648);

	const msg = {
		'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
	};
	const msgHash = keccak256(msg, 'hex');

	const pvk = ed25519.getPrivateKey(derivedEntropy);
	const pvk1 = IW.getUserPrivateKey(derivedEntropy);
	console.log(pvk);
	console.log(pvk1);

	const pbk = ed25519.getPublicKey(derivedEntropy);
	const pbk1 = IW.getUserPublicKey(derivedEntropy);
	// console.log(pbk);
	// console.log(pbk1);

	const sig = ed25519.sign(derivedEntropy, msgHash);
	const sig1 = IW.signHash(derivedEntropy, msgHash);
	// console.log(sig);
	// console.log(sig1);

	const verified = ed25519.verify(pbk, msgHash, sig);
	const verified1 = IW.verifyHash(pbk1, msgHash, sig1);
	console.log(verified);
	console.log(verified1);

	// const sig = kp.sign(msgHash).toBytes();
	// const verified = kp.verify(msgHash, sig);
	//
	// const kp1 = ed25519.getKeyPair(pvk);
	// const pvk1 = kp1.privBytes();
	// const pbk1 = kp1.pubBytes();
	// const sig1 = kp1.sign(msgHash).toBytes();
	// const verified1 = kp1.verify(msgHash, sig1);
	// console.log(verified1);
	//
	// const vkey1 = ed25519.getVerificationKey(pbk1);
	// const verified2 = vkey1.verify(msgHash, sig1);
	// console.log(verified2);


	// // ... get user private key.
	// const pvk = IW.getUserPrivateKey(derivedEntropy);
	//
	// // ... get user public key (i.e. identifier).
	// const pbk = IW.getUserPublicKey(derivedEntropy);
	//
	// // ... sign a request.
	// const requestData = {
	// 	'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
	// };
	// const {sig, hashedData} = IW.signData(pvk, requestData);
	//
	// // Server side.
	// // ... verify a request.
	// const verified = IW.verifyHash(pbk, hashedData, sig);
	//
	// console.log(verified);
});
