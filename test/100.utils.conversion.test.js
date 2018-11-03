import * as _ from 'lodash';
import * as API from '../src/utils/conversion';
import * as utils from './utils';

const HEX = 'c630e10a63203227e46d804e91e12a9a78a4c011ff7d491affee12338dc81b4f';
const ARR = [198, 48, 225, 10, 99, 32, 50, 39, 228, 109, 128, 78, 145, 225, 42, 154, 120, 164, 192, 17, 255, 125, 73, 26, 255, 238, 18, 51, 141, 200, 27, 79];

test('IW :: utils :: conversion :: is defined', () => {
    utils.testSlots(API, [
        'arrayToHex',
        'hexToArray',
        'isHexString',
	]);
});

test('IW :: utils :: conversion :: arrayToHex', () => {
    const hex = API.arrayToHex(ARR);
    expect(hex).toBe(HEX);
});

test('IW :: utils :: conversion :: hexToArray', () => {
    const arr = API.hexToArray(HEX);
    expect(_.isEqual(arr, ARR.slice(1))).toBe(true);
});
