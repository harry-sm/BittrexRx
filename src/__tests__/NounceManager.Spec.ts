import nonceManager from '../helpers/NounceManager';

describe('NounceManager Methods', () => {
	describe('# nonceManager.getNonce', () => {
		it('should return unique nonce', () => {
			const nonce1 = nonceManager.getNonce();
			const nonce2 = nonceManager.getNonce();
			expect(nonce1).not.toEqual(nonce2);
		});
	});
});
