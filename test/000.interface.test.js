// Module imports.
import * as IW from '../src/index';

test('IW :: imported', () => {
    expect(IW).toBeDefined();
});

test('IW :: interface :: is defined', () => {
    const slots = [
        IW.CURVES,
        IW.decode,
        IW.encode,
        IW.utils,
        IW.name,
        IW.provider,
        IW.version
    ];
    slots.forEach((slot) => {
        expect(slot).toBeDefined();
    });
    expect(IW.name).toBe('Image Wallet');
    expect(IW.version).toBe('0.2.0');
    expect(IW.provider).toBe('Trinkler Software AG');
});

test('IW :: interface :: curves are defined', () => {
    IW.CURVES.forEach((curve) => {
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