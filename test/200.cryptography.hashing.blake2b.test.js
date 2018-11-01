import { hash as API } from '../src/cryptography';
import { hexFromArray } from '../src/utils/conversion';
import * as utils from './utils';

// Message data to be h.
const DATA = {
		'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
	};

// Blake2b 256 haxadecimal string representation of message data.
const HASH = 'a9bf1d34547520ebcadbf47ab5b26d33410e836b40a2a715bd5df9c57000d317';

test('IW :: cryptography :: hashing  :: test interface', () => {
	utils.testSlots(API, [
		'blake2b',
	]);
});

test('IW :: cryptography :: hashing  :: blake2b :: encoding=hex', () => {
	const h = API.blake2b(DATA, 'hex');
	expect(h).toBe(HASH);
});

test('IW :: cryptography :: hashing  :: blake2b :: encoding=array', () => {
	let h = API.blake2b(DATA, 'array');
	h = hexFromArray(Array.from(h));
	expect(h).toBe(HASH);
});

test('IW :: cryptography :: hashing  :: blake2b :: encoding=null', () => {
	let h = API.blake2b(DATA);
	h = hexFromArray(Array.from(h));
	expect(h).toBe(HASH);
});
