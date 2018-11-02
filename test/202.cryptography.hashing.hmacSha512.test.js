const assert = require('assert').strict;

import * as _ from 'lodash';
import { hash as API } from '../src/cryptography';
import { hexFromArray } from '../src/utils/conversion';
import * as utils from './utils';

// Message data to be hashed.
const DATA = JSON.stringify({
		'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
	});

// Key used when generating hmacSha512.
const KEY = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe';

// HMAC-SHA-512 haxadecimal string representation of message data.
const HASH = 'ba2a52b673ed8f99eefb6036c365358f5a44076a6a5a5cf4c4ccc25369cc70293d3601f9e8b07f4f609231549ed11151ae5a2e46c62dd38e7b59c907b1e0749e';

test('IW :: cryptography :: hashing  :: test interface', () => {
	utils.testSlots(API, [
        'hmacSha512',
	]);
});

test('IW :: cryptography :: hashing  :: hmacSha512 :: encoding=hex', () => {
	const h = API.hmacSha512(DATA, KEY, 'hex');
	expect(h).toBe(HASH);
});

test('IW :: cryptography :: hashing  :: hmacSha512 :: encoding=array', () => {
	let h = API.hmacSha512(DATA, KEY, 'array');
	h = hexFromArray(Array.from(h));
	expect(h).toBe(HASH);
});

test('IW :: cryptography :: hashing  :: hmacSha512 :: encoding=null', () => {
	let h = API.hmacSha512(DATA, KEY);
	h = hexFromArray(Array.from(h));
	expect(h).toBe(HASH);
});
