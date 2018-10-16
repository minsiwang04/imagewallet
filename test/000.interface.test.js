import * as API from '../src/index';
import * as utils from './utils';

test('IW :: imported', () => {
    expect(API).toBeDefined();
});

test('IW :: interface :: is defined', () => {
    utils.testSlots(API, [
        'CURVES',
        'decode',
        // 'deriveKey',
        'encode',
        'utils',
        'name',
        'provider',
        'version'
	]);
    expect(API.name).toBe('Image Wallet');
    expect(API.version).toBe('0.2.1');
    expect(API.provider).toBe('Trinkler Software AG');
});

test('IW :: interface :: curves are defined', () => {
    API.CURVES.forEach((curve) => {
        const funcs = [
            curve,
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
