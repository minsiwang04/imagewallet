// Module imports.
import * as IW from '../src/index';

test('IW imported', () => {
    expect(IW).toBeDefined();
});

test('IW high level interface is defined', () => {
    const slots = [
        IW.CURVES,
        IW.decode,
        IW.encode,
        IW.name,
        IW.provider,
        IW.version
    ];
    slots.forEach((slot) => {
        expect(slot).toBeDefined();
    });
    expect(IW.name).toBe('Image Wallet');
    expect(IW.version).toBe('0.1.6');
    expect(IW.provider).toBe('Trinkler Software AG');
});

test('IW curves have standard functions', () => {
    IW.CURVES.forEach((curve) => {
        const funcs = [
            curve,
            curve.createKey,
            curve.getPublicKey,
            curve.signMessageHash,
            curve.verifyMessageHash,
        ];
        funcs.forEach((func) => {
            expect(func).toBeDefined();
        });
    });
});
