import * as API from '../src/cryptography/index';
import * as utils from './utils';

const DEFAULT_BYTES = 32;

test('IW :: cryptography :: generate entropy :: interface', () => {
	utils.testSlots(API, [
		'generateEntropy',
	]);
});

test('IW :: cryptography :: generate entropy :: of varying byte lengths', () => {
	[null, 32, 256, 1024].forEach((i) => {
		const entropy = API.generateEntropy(i);
	    expect(entropy.length).toBe(i || DEFAULT_BYTES);
	});
});
