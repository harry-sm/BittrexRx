import {
	BittrexRxClient,
	Model
} from '../index';

import { BittrexRxSocketClient } from '../core/bittrex-rx-socket-client';

describe.skip('BitttrexRx Socket Methods', () => {
	let bittrexRx: BittrexRxClient;

	beforeAll((done: jest.DoneCallback) => {
		bittrexRx = new BittrexRxClient();
		done();
	});

	describe('#exchangeState()', () => {
		let socket: BittrexRxSocketClient;

		it('should respond with an instance of OrderBookStream', (done: jest.DoneCallback) => {
			socket = bittrexRx.Socket;
			socket.exchangeState(['BTC-LTC'])
				.take(1)
				.subscribe(
					(json: Model.OrderBookStream) => {
						expect(json).toBeInstanceOf(Model.OrderBookStream);
						done();
					},
					done
				);
		}, 20000);
		afterAll(() => socket.close());
	});

	describe('#summaryState()', () => {
		let socket: BittrexRxSocketClient;

		it('should respond with an instance of SummaryStateDelta', (done: jest.DoneCallback) => {
			socket = bittrexRx.Socket;
			socket.summaryState()
				.subscribe(
					(json: Model.SummaryStateDelta) => {
						expect(json).toBeInstanceOf(Model.SummaryStateDelta);
						done();
					},
					done
				);
		}, 20000);
		afterAll(() => socket.close());
	});
});
