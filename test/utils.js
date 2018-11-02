import * as fs from 'fs';
const path = require('path');
import bip32 from '../src/cryptography/keyDerivation/bip32';

export const testSlots = (api, slots) => {
    slots.forEach((slot) => {
        expect(api[slot]).toBeDefined();
    });
}

export const executeBip32Tests = (curve, vector) => {
    let cfg = `data/bip32-${curve}-vector-${vector}.json`;
    cfg = path.join(__dirname, cfg);
    cfg = JSON.parse(fs.readFileSync(cfg));
    cfg.vector.forEach((i) => {
        executeBip32Test(
            cfg.seed,
            cfg.curve,
            cfg.seedModifier,
            i.derivationPath,
            i.fingerprint,
            i.chainCode,
            i.private,
            i.public
        );
    });
}

const executeBip32Test = (seed, curve, seedModifier, derivationPath, fingerprint, chainCode, pvk, pbk) => {
    const xkey = bip32(seed, curve, seedModifier, derivationPath, fingerprint);
    expect(xkey.publicKey).toBe(pbk);
    expect(xkey.privateKey).toBe(pvk);
    expect(xkey.chainCode).toBe(chainCode);
}
