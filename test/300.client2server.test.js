import * as _ from 'lodash';
import * as IW from '../src/index';
import {hash} from '../src/cryptography';

test('IW :: key pairs :: key derivation :: valid', () => {
	// Client side.
	// ... decrypted from IW QR code
	const secretSeed = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe';

	// ... wallet identifier.
	const walletIndex = 2147483648;

	// ... derive image wallet key.
	const derivedEntropy = IW.deriveKey(secretSeed, 'IW', 2147483648);

	// ... get user private key.
	const pvk = IW.getUserPrivateKey(derivedEntropy);

	// ... get user public key (i.e. identifier).
	const pbk = IW.getUserPublicKey(derivedEntropy);

	// ... sign a request.
	const requestData = {
			'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
		}
	const {sig, requestDataHash} = IW.signData(pvk, requestData);

	// Server side.
	// ... verify a request.
	const verified = IW.verifyHash(pbk, requestDataHash, sig);

	console.log(verified);
});
