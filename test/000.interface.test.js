import * as API from '../src/index';
import * as utils from './utils';

test('IW :: can be imported', () => {
    expect(API).toBeDefined();
});

test('IW :: interface :: is defined', () => {
    utils.testSlots(API, [
        'decode',
        // 'deriveKey', ???
        'encode',
        'name',
        'provider',
        'version',
	]);
    expect(API.name).toBe('Image Wallet');
    expect(API.version).toBe('0.2.1');
    expect(API.provider).toBe('Trinkler Software AG');
});
