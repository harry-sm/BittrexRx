export class NonceManager {
	private nonceHistory: number[];

	constructor() {
		this.nonceHistory = [];
	}

	public getNonce() {
		let nonce: number = this.generateNonce();

		// ensure that there is no nonce collision
		while (nonce === this.nonceHistory[this.nonceHistory.length - 1]) {
			nonce = this.generateNonce();
		}

		// only save the last 50 nonce
		this.nonceHistory = this.nonceHistory.slice(-50);

		this.nonceHistory.push(nonce);
		return nonce;
	}

	private generateNonce() {
		return Math.floor(new Date().getTime() / 1000);
	}
}
const nonceManager = new NonceManager();

export default nonceManager;
