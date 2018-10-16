import * as _ from 'lodash';
import * as API from '../src/utils/conversion';
import * as utils from './utils';

const STR = 'Hello Dolly!';
const HEX = '0xc630e10a63203227e46d804e91e12a9a78a4c011ff7d491affee12338dc81b4f';
const ARRAY = [198, 48, 225, 10, 99, 32, 50, 39, 228, 109, 128, 78, 145, 225, 42, 154, 120, 164, 192, 17, 255, 125, 73, 26, 255, 238, 18, 51, 141, 200, 27, 79];
const ARRAY_UINT8 = new Uint8Array(ARRAY);

test('IW :: utils :: conversion :: is defined', () => {
    utils.testSlots(API, [
        'hexFromArray',
        'hexFromUint8Array',
        'hexToArray',
        'hexToUint8Array',
        'isHexString',
        'utf8ToBytes',
        'bytesToUtf8'
	]);
});

test('IW :: utils :: conversion :: hexFromArray', () => {
    expect(_.isEqual(API.hexFromArray(ARRAY), HEX)).toBe(true);
});

test('IW :: utils :: conversion :: hexFromUint8Array', () => {
    expect(_.isEqual(API.hexFromUint8Array(ARRAY_UINT8), HEX)).toBe(true);
});

test('IW :: utils :: conversion :: hexToArray', () => {
    expect(_.isEqual(API.hexToArray(HEX), ARRAY)).toBe(true);
});

test('IW :: utils :: conversion :: hexToUint8Array', () => {
    expect(
        _.isEqual(API.hexToUint8Array(HEX), ARRAY_UINT8)
    ).toBe(true);
});

test('IW :: utils :: conversion :: utf8 to array', () => {
    expect(
        _.isEqual(API.bytesToUtf8(API.utf8ToBytes(STR)), STR)
    ).toBe(true);
});
