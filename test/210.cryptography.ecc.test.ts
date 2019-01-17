import * as API from '../src/cryptography/ecc/index';
import * as utils from './utils';

test('IW :: cryptography :: ecc  :: test interface', () => {
    utils.testSlots(API, [
        'SUPPORTED',
        'ed25519',
        'secp256k1'
	]);
});

test('IW :: cryptography :: ecc  :: test curve interfaces', () => {
    API.SUPPORTED.forEach((curve) => {
        const funcs = [
            curve.getPrivateKey,
            curve.getPublicKey,
            curve.sign,
            curve.verify,
        ];
        funcs.forEach((func) => {
            expect(func).toBeDefined();
        });
    });
});
