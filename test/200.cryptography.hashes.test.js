import * as _ from 'lodash';
import {hash as API} from '../src/cryptography';
import {hexFromArray, hexFromUint8Buffer} from '../src/utils/conversion';
import * as utils from './utils';

// Message data to be hashed.
const DATA = {
		'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
	};

// Keccak 256 haxadecimal string representation of message data.
const DATA_KECCAK256 = 'd860c67d1cf51ae4ce4f0b56e8d2c93dfbd83510f7e74423a20ecfc3815c60a3';

// HMAC-SHA-512 haxadecimal string representation of message data.
const DATA_HMAC_SHA512 = '0b04df343d74d5eba11e16d3b6e62cd16f05c01d8c890cec7a511fe9ef4acac81c2b91dc3090f260b454d1875657f6f521675c60b93176f2a1c67ea8b765f3ae';

// Key used when generating hmacSha512.
const KEY = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe';

test('IW :: cryptography :: hashes  :: test interface', () => {
	utils.testSlots(API, [
        'hmacSha512',
    	'keccak256',
	]);
});

test('IW :: cryptography :: hashes  :: keccak256', () => {
	let hashed;
	hashed = API.keccak256(DATA);
	hashed = Array.from(hashed);
	hashed = hexFromArray(hashed);
    expect(hashed).toBe(DATA_KECCAK256);
});

test('IW :: cryptography :: hashes  :: hmacSha512', () => {
	let hashed;
	hashed = API.hmacSha512(DATA_KECCAK256, KEY);
	hashed = Array.from(hashed);
	hashed = hexFromArray(hashed);
    expect(hashed).toBe(DATA_HMAC_SHA512);
});
