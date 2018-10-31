import * as _ from 'lodash';
import { hash as API } from '../src/cryptography';
import { hexFromArray } from '../src/utils/conversion';
import * as utils from './utils';

// Message data to be hashed.
const DATA = {
		'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
	};

// Blake2b 256 haxadecimal string representation of message data.
const DATA_BLAKE2B = 'a9bf1d34547520ebcadbf47ab5b26d33410e836b40a2a715bd5df9c57000d317';

// Keccak 256 haxadecimal string representation of message data.
const DATA_KECCAK256 = 'd860c67d1cf51ae4ce4f0b56e8d2c93dfbd83510f7e74423a20ecfc3815c60a3';

// HMAC-SHA-512 haxadecimal string representation of message data.
const DATA_HMAC_SHA512 = '0b04df343d74d5eba11e16d3b6e62cd16f05c01d8c890cec7a511fe9ef4acac81c2b91dc3090f260b454d1875657f6f521675c60b93176f2a1c67ea8b765f3ae';

// Key used when generating hmacSha512.
const KEY = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe';

test('IW :: cryptography :: hashing  :: test interface', () => {
	utils.testSlots(API, [
		'blake2b',
        'hmacSha512',
    	'keccak256',
	]);
});

test('IW :: cryptography :: hashing  :: blake2b :: encoding=hex', () => {
	const hashed = API.blake2b(DATA, 'hex');
	expect(hashed).toBe(DATA_BLAKE2B);
});

test('IW :: cryptography :: hashing  :: blake2b :: encoding=array', () => {
	let hashed = API.blake2b(DATA, 'array');
	hashed = hexFromArray(Array.from(hashed));
	expect(hashed).toBe(DATA_BLAKE2B);
});

test('IW :: cryptography :: hashing  :: blake2b :: encoding=null', () => {
	let hashed = API.blake2b(DATA);
	hashed = hexFromArray(Array.from(hashed));
	expect(hashed).toBe(DATA_BLAKE2B);
});

test('IW :: cryptography :: hashing  :: keccak256 :: encoding=hex', () => {
	const hashed = API.keccak256(DATA, 'hex');
	expect(hashed).toBe(DATA_KECCAK256);
});

test('IW :: cryptography :: hashing  :: keccak256 :: encoding=array', () => {
	let hashed = API.keccak256(DATA, 'array');
	hashed = hexFromArray(Array.from(hashed));
	expect(hashed).toBe(DATA_KECCAK256);
});

test('IW :: cryptography :: hashing  :: keccak256 :: encoding=null', () => {
	let hashed = API.keccak256(DATA);
	hashed = hexFromArray(Array.from(hashed));
	expect(hashed).toBe(DATA_KECCAK256);
});

test('IW :: cryptography :: hashing  :: hmacSha512 :: encoding=hex', () => {
	const hashed = API.hmacSha512(DATA_KECCAK256, KEY, 'hex');
	expect(hashed).toBe(DATA_HMAC_SHA512);
});

test('IW :: cryptography :: hashing  :: hmacSha512 :: encoding=array', () => {
	let hashed = API.hmacSha512(DATA_KECCAK256, KEY, 'array');
	hashed = hexFromArray(Array.from(hashed));
	expect(hashed).toBe(DATA_HMAC_SHA512);
});

test('IW :: cryptography :: hashing  :: hmacSha512 :: encoding=null', () => {
	let hashed = API.hmacSha512(DATA_KECCAK256, KEY);
	hashed = hexFromArray(Array.from(hashed));
	expect(hashed).toBe(DATA_HMAC_SHA512);
});
