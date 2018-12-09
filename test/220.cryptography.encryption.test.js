import * as API from '../src/cryptography/index';
import * as exceptions from '../src/utils/exceptions';
import * as utils from './utils';

// Message data to be encrpyted.
const PLAIN_TEXT = Buffer.from('{"Al-Kindi":"أبو يوسف يعقوب بن إسحاق الصبّاح الكندي"}');

// Cipher text representation of input data.
const CIPHER_TEXT = Buffer.from('b857511dd346a36fe1863f02710df13c35aa9c53aa5e48656bf837cef6e4937475f39a28ffdd8cc7695a2e4919cb31d3e4494d6424273402f782b4d6f6148815a873aa7003ad8e8997841123b4891646632bf061182c53e1eb7aeacf20101cdc', 'hex');

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

test('IW :: cryptography :: decrypt', () => {
	const plainText = API.decrypt(CIPHER_TEXT, PWD, SALT, ROUNDS);
    expect(plainText.compare(PLAIN_TEXT)).toBe(0);
});

test('IW :: cryptography :: decrypt (incorrect password)', () => {
    expect(() => API.decrypt(CIPHER_TEXT, 'foobar', SALT, ROUNDS)).toThrowError(new exceptions.IncorrectPasswordError());
});

test('IW :: cryptography :: encrypt', () => {
	const cipherText = API.encrypt(PLAIN_TEXT, PWD, SALT, ROUNDS);
    expect(cipherText.compare(CIPHER_TEXT)).toBe(0);
});
