import { hash as API } from '../src/cryptography';
import { hexFromArray } from '../src/utils/conversion';
import * as utils from './utils';

// Message data to be h.
const DATA = {
		'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
	};

// Keccak 256 haxadecimal string representation of message data.
const HASH = 'd860c67d1cf51ae4ce4f0b56e8d2c93dfbd83510f7e74423a20ecfc3815c60a3';

test('IW :: cryptography :: hashing  :: test interface', () => {
	utils.testSlots(API, [
    	'keccak256',
	]);
});

test('IW :: cryptography :: hashing  :: keccak256 :: encoding=hex', () => {
	const h = API.keccak256(DATA, 'hex');
	expect(h).toBe(HASH);
});

test('IW :: cryptography :: hashing  :: keccak256 :: encoding=array', () => {
	let h = API.keccak256(DATA, 'array');
	h = hexFromArray(Array.from(h));
	expect(h).toBe(HASH);
});

test('IW :: cryptography :: hashing  :: keccak256 :: encoding=null', () => {
	let h = API.keccak256(DATA);
	h = hexFromArray(Array.from(h));
	expect(h).toBe(HASH);
});
