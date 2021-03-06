
import {
	BittrexRxClient,
	Model
} from '../index';

import { ApiCredentialsSettings } from '../helpers/api-credentials-settings';

describe('BitttrexRx Private Methods', () => {
	let bittrexRx: BittrexRxClient;

	beforeAll((done: jest.DoneCallback) => {
		bittrexRx = new BittrexRxClient();
		bittrexRx.apiCredentials(ApiCredentialsSettings.key, ApiCredentialsSettings.secret);
		done();
	});

	describe('#getBalances()', () => {
		it('should return a list of Balances', (done: jest.DoneCallback) => {
			bittrexRx.getBalances()
				.subscribe(
					(json: Model.Balance[]) => {
						expect(json).toEqual(expect.arrayContaining([{
							Currency: expect.any(String),
							Balance: expect.any(Number),
							Available: expect.any(Number),
							Pending: expect.any(Number),
							CryptoAddress: expect.any(String)
						}]));
						done();
					},
					done
					);
		}, 60000);
	});

	describe('#getBalance()', () => {
		it('should return the balance of a specific currency', (done: jest.DoneCallback) => {
			bittrexRx.getBalance('BTC')
				.subscribe(
					(json: Model.Balance) => {
						expect(json).toEqual(expect.objectContaining({
							Currency: expect.any(String),
							Balance: expect.any(Number),
							Available: expect.any(Number),
							Pending: expect.any(Number),
							CryptoAddress: expect.any(String)
						}));
						done();
					},
					done
				);
		}, 60000);
	});

	describe('#getDepositAddress()', () => {
		it('should respond with an instance of DepositAddress', (done: jest.DoneCallback) => {
			bittrexRx.getDepositAddress('BTC')
				.subscribe(
					(json: Model.DepositAddress)  => {
						expect(json).toBeInstanceOf(Model.DepositAddress);
						done();
					},
					done
				);
		}, 60000);
	});

	describe('#getDepositHistory()', () => {
		it('should respond with an instance of Transaction', (done: jest.DoneCallback) => {
			bittrexRx.getDepositHistory('BTC')
				.subscribe(
					(json: Model.Transaction[]) => {
							done();
							expect(json[0]).toBeInstanceOf(Model.Transaction);
					},
					done
				);
		}, 60000);
	});

	describe('#getWithdrawalHistory()', () => {
		it('should respond with an instance of WithdrawalTransaction', (done: jest.DoneCallback) => {
			bittrexRx.getWithdrawalHistory('BTC')
				.subscribe(
					(json: Model.WithdrawalTransaction[]) => {
							done();
							expect(json[0]).toBeInstanceOf(Model.WithdrawalTransaction);
					},
					done
				);
		}, 60000);
	});
});
