import * as API from '../src/cryptography/index';
import * as exceptions from '../src/utils/exceptions';
import * as utils from './utils';

// Message data to be encrpyted.
const PLAIN_TEXT = Buffer.from('{"Al-Kindi":"أبو يوسف يعقوب بن إسحاق الصبّاح الكندي"}');

// Cipher text representation of input data.
const CIPHER_TEXT = Buffer.from('44cf43d90ef7c8c9ab0b30c9258340b83c4af3ca587c3ddd12796bbe989b401bb497925a29ece2d0a57e418c0c3af4f9d5d190001de782c06f7667382871f5efd61ae73bd41c4bc67fcd450e9bf45f95279cd4d26539ee', 'hex');

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
