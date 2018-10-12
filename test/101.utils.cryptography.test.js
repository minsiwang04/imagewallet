import * as _ from 'lodash';
import * as CRYPTO from '../src/utils/cryptography';


// Message data to be processed.
const DATA = {
		'Hello': 'Dolly!'
	};

// Plain text representation of input data.
const DATA_PLAINTEXT = JSON.stringify(DATA);

// Keccak 256 hash representation of input data.
const DATA_KECCAK256_HASH = '74e604d0fa66967ee6a8f2efced2c38d6e2ad1198ff18a7e1e5ee7e87eb74b98';

// Cipher text representation of input data.
const DATA_CIPHER_TEXT = '2b7e8214d3c55d0a53d17d89f4e54307474887457736006c79d20d99426509a7';

// Password used during encryption.
const PWD = 'aGTHTRnntrKLGvdr'

test('IW :: utils :: cryptography', () => {
    const slots = [
        'encrypt',
        'decrypt',
        'hashData',
    ];
    slots.forEach((slot) => {
        expect(CRYPTO[slot]).toBeDefined();
    });
});

test('IW :: utils :: cryptography :: decrypt', () => {
    expect(_.isEqual(CRYPTO.decrypt(DATA_CIPHER_TEXT, PWD), DATA_PLAINTEXT)).toBe(true);
});

test('IW :: utils :: cryptography :: encrypt', () => {
    expect(_.isEqual(CRYPTO.encrypt(DATA_PLAINTEXT, PWD), DATA_CIPHER_TEXT)).toBe(true);
});

test('IW :: utils :: cryptography :: generateEntropy', () => {
    let entropy = CRYPTO.generateEntropy();
    expect(entropy.length).toBe(32);
    entropy = CRYPTO.generateEntropy(256);
    expect(entropy.length).toBe(256);
});

test('IW :: utils :: cryptography :: hashData', () => {
    expect(_.isEqual(CRYPTO.hashData(DATA), DATA_KECCAK256_HASH)).toBe(true);
});
