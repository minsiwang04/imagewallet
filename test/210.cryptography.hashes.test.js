import * as _ from 'lodash';
import {hash as API} from '../src/cryptography';
import {hexFromArray, hexFromUint8Buffer} from '../src/utils/conversion';


// Message data to be hashed.
const DATA = {
		'Al-Kindi': 'أبو يوسف يعقوب بن إسحاق الصبّاح الكندي'
	};

// Keccak 256 haxadecimal string representation of message data.
const DATA_KECCAK256 = 'd860c67d1cf51ae4ce4f0b56e8d2c93dfbd83510f7e74423a20ecfc3815c60a3';

// Blake 2B haxadecimal string representation of message data.
const DATA_BLAKE2B = 'fc59bea026e6fdc9a3066dffea668e4394a56c80060ff31f155ccf4b696df7eb';

// HMAC-SHA-512 haxadecimal string representation of message data.
const DATA_HMAC_SHA512 = '8debe67b3c485a8f6d4845c7112c4090509c982d0fbe0a2640f7784792645bd390c091dc228ab9cd17512f541acc0cf6293f4cd7743f1579e270055f00ca470d';

// Key used when generating hmacSha512.
const KEY = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe';

test('IW :: cryptography :: hashes  :: test interface', () => {
    const slots = [
        'blake2b',
        'hmacSha512',
    	'keccak256',
    ];
    slots.forEach((slot) => {
        expect(API[slot]).toBeDefined();
    });
});

test('IW :: cryptography :: hashes  :: test blake2b', () => {
    let hashed = API.blake2b(DATA);
    hashed = hexFromUint8Buffer(hashed);
    expect(_.isEqual(hashed, DATA_BLAKE2B)).toBe(true);
});

test('IW :: cryptography :: hashes  :: test keccak256', () => {
    let hashed = API.keccak256(DATA);
    hashed = hexFromUint8Buffer(hashed);
    expect(_.isEqual(hashed, DATA_KECCAK256)).toBe(true);
});

test('IW :: cryptography :: hashes  :: test hmacSha512', () => {
    let hashed = API.hmacSha512(DATA_KECCAK256, KEY);
    hashed = hexFromUint8Buffer(hashed);
    expect(_.isEqual(hashed, DATA_HMAC_SHA512)).toBe(true);
});
