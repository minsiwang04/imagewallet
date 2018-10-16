import * as API from '../src/cryptography/curves/index';
import * as utils from './utils';

test('IW :: interface :: is defined', () => {
    utils.testSlots(API, [
        'SUPPORTED',
        'ed25519',
        'secp256k1'
	]);
});

test('IW :: interface :: curves are defined', () => {
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
