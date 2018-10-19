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
const DATA_HMAC_SHA512 = '8debe67b3c485a8f6d4845c7112c4090509c982d0fbe0a2640f7784792645bd390c091dc228ab9cd17512f541acc0cf6293f4cd7743f1579e270055f00ca470d';

// Key used when generating hmacSha512.
const KEY = 'a322c28cdfa2ef5691adfe2f1c63349b39c9f72518bf99e4179ef17123772bfe';

test('IW :: cryptography :: hashes  :: test interface', () => {
	utils.testSlots(API, [
        'hmacSha512',
    	'keccak256',
	]);
});

test('IW :: cryptography :: hashes  :: keccak256', () => {
    let hashed = API.keccak256(DATA);
    hashed = hexFromUint8Buffer(hashed);
    expect(_.isEqual(hashed, DATA_KECCAK256)).toBe(true);
});

test('IW :: cryptography :: hashes  :: hmacSha512', () => {
    let hashed = API.hmacSha512(DATA_KECCAK256, KEY);
    hashed = hexFromUint8Buffer(hashed);
    expect(_.isEqual(hashed, DATA_HMAC_SHA512)).toBe(true);
});
