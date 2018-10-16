import * as _ from 'lodash';
import * as API from '../src/cryptography/index';

// Message data to be encrpyted.
const DATA = {
		'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
	};

// Plain text representation of input data.
const DATA_PLAINTEXT = JSON.stringify(DATA);

// Cipher text representation of input data.
const DATA_CIPHER_TEXT = '854404807e24f6df7c022514b7abdd3513d87a540372f5ad647eea8c41b4ce6fe20a1c963af0b8d44903f354b2581a50c6c3987ff99fabb868195e8efe3f6c2a4c116f4b4220720a154a166f0d8f9d968719967a4b31dcad8e87fbf8c24e0cc9';

// Password used during encryption.
const PWD = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe'

test('IW :: utils :: cryptography', () => {
    const slots = [
        'generateEntropy',
    ];
    slots.forEach((slot) => {
        expect(API[slot]).toBeDefined();
    });
});

test('IW :: utils :: cryptography :: generateEntropy', () => {
    let entropy = CRYPTO.generateEntropy();
    expect(entropy.length).toBe(32);
    entropy = CRYPTO.generateEntropy(256);
    expect(entropy.length).toBe(256);
});
