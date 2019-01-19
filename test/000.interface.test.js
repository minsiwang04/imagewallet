import * as IW from '../src/index';
import * as utils from './utils';

test('IW :: interface :: is defined', () => {
    expect(IW).toBeDefined();
    utils.testSlots(IW, [
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
    expect(IW.name).toBe('Imagewallet');
    expect(IW.version).toBe('0.5.8');
    expect(IW.provider).toBe('Trinkler Software AG');
});
