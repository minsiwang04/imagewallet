import * as API from '../src/cryptography/index';
import * as exceptions from '../src/utils/exceptions';
import * as utils from './utils';

// Message data to be encrpyted.
const PLAIN_TEXT = Buffer.from('{"Al-Kindi":"أبو يوسف يعقوب بن إسحاق الصبّاح الكندي"}');

// Cipher text representation of input data.
const CIPHER_TEXT = Buffer.from('2231898ec84202ae1d765f5b481d97d99f6f920dce24ea16335fc51b2e3dd307f18e70bbe27c0cd6858977339032b9b16b650f70e50319f69e61204d631e054b245c1a530e0dc5a29fe7f94db1cd745a1b7f34e655a07b', 'hex');

// Password used during encryption.
const PWD = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe يعقوب بن إسحاق الصبّ';

// Salt used during encryption key derivation.
const SALT = Buffer.from('39c9f72518bf99e4179ef17123772bfe', 'hex');

// Number of rounds for encryption key derivation.
const ROUNDS = 256;

test('IW :: cryptography :: encryption :: interface', () => {
	utils.testSlots(API, [
		'decrypt',
		'encrypt'
	]);
});

test('IW :: cryptography :: decrypt', (done) => {
	(async () => {
        const plainText = await API.decrypt(CIPHER_TEXT, PWD, SALT, ROUNDS);
        expect(plainText.compare(PLAIN_TEXT)).toBe(0);
	})().then(done, done.fail);
});

test('IW :: cryptography :: decrypt (incorrect password)', (done) => {
    (async () => {
        try {
            await API.decrypt(CIPHER_TEXT, 'foobar', SALT, ROUNDS);
            done.fail();
        } catch (e) {
            expect(e).toEqual(new exceptions.IncorrectPasswordError());
        }
    })().then(done, done.fail);
});

test('IW :: cryptography :: encrypt', (done) => {
    (async () => {
        const cipherText = await API.encrypt(PLAIN_TEXT, PWD, SALT, ROUNDS);
        expect(cipherText.compare(CIPHER_TEXT)).toBe(0);
    })().then(done, done.fail);
});
