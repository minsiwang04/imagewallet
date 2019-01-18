import * as API from '../src/index';
import * as utils from './utils';

test('IW :: interface :: is defined', () => {
    expect(API).toBeDefined();
    utils.testSlots(API, [
        'name',
        'provider',
        'version',
        'decryptImage',
        'decryptQrData',
        'generateFromPassword',
        'getQrDataFromImage',
        'createSeed',
        'deriveKey',
        'deriveKeyPair',
        'derivePrivateKey',
        'getHash',
        'getUserPrivateKey',
        'getUserPublicKey',
        'signData',
        'signHash',
        'verifyData',
        'verifyHash',
	]);
    expect(API.name).toBe('Imagewallet');
    expect(API.version).toBe('0.5.6');
    expect(API.provider).toBe('Trinkler Software AG');
});
