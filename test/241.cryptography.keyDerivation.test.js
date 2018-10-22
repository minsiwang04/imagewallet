import * as _ from 'lodash';
import deduceKey from '../src/cryptography/deduceKey';
import { InvalidCoinIdentiferError } from '../src/utils/exceptions';
import { BaseError } from '../src/utils/exceptions';
import * as utils from './utils';

import * as fs from 'fs';
const path = require('path');

test('IW :: cryptography :: key derivation :: ed25519 :: vector 1', () => {
    execute(getTestConfig('ed25519', 1));
});

test('IW :: cryptography :: key derivation :: ed25519 :: vector 2', () => {
    execute(getTestConfig('ed25519', 2));
});

test('IW :: cryptography :: key derivation :: secp256k1 :: vector 1', () => {
    execute(getTestConfig('secp256k1', 1));
});

test('IW :: cryptography :: key derivation :: secp256k1 :: vector 2', () => {
    execute(getTestConfig('secp256k1', 2));
});

const getTestConfig = (curve, vector) => {
    let fpath = `data/SLIP-0010-${curve}-vector-${vector}.json`;
    fpath = path.join(__dirname, fpath);

    return JSON.parse(fs.readFileSync(fpath));
}

const execute = (cfg) => {
    cfg.vector.forEach((i) => {
        executeTest(
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

const executeTest = (seed, curve, seedModifier, derivationPath, fingerprint, chainCode, pvk, pbk) => {
    const deduced = deduceKey(seed, curve, seedModifier, derivationPath);
}
