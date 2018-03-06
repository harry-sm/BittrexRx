
import {
	BittrexRxClient,
	TickIntervalValue,
	Model
} from '../index';

describe('BitttrexRx Public Methods', () => {
	let bittrexRx: BittrexRxClient;

	beforeAll((done: jest.DoneCallback) => {
		bittrexRx = new BittrexRxClient();
		done();
	});

	describe('#getMarkets()', () => {
		it('should respond with an instance of Market[]', (done: jest.DoneCallback) => {
			bittrexRx.getMarkets()
				.subscribe(
					(json: Model.Market[]) => {
						expect(json[0]).toBeInstanceOf(Model.Market);
						done();
					},
					done
				);
		}, 60000);
	});

	describe('#getTicker()', () => {
		it('should respond with an instance of Ticker', (done: jest.DoneCallback) => {
			bittrexRx.getTicker('BTC-LTC')
				.subscribe(
					(json: Model.Ticker) => {
						expect(json).toBeInstanceOf(Model.Ticker);
						done();
					},
					done
				);
		}, 60000);
	});

	describe('#getMarketSummaries()', () => {
		it('should respond with an instance of MarketSummary[]', (done: jest.DoneCallback) => {
			bittrexRx.getMarketSummaries()
				.subscribe(
					(json: Model.MarketSummary[]) => {
						expect(json[0]).toBeInstanceOf(Model.MarketSummary);
						done();
					},
					done
				);
		}, 60000);
	});

	describe('#getOrderBook()', () => {
		it('should respond with an instance of OrderBook', (done: jest.DoneCallback) => {
			bittrexRx.getOrderBook('BTC-LTC')
				.subscribe(
					(json: Model.OrderBook) => {
						expect(json).toBeInstanceOf(Model.OrderBook);
						done();
					},
					done
				);
		}, 60000);
	});

	describe('#getMarketHistory()', () => {
		it('should respond with an instance of MarketHistory', (done: jest.DoneCallback) => {
			bittrexRx.getMarketHistory('BTC-LTC')
				.subscribe(
					(json: Model.MarketHistory[]) => {
						expect(json[0]).toBeInstanceOf(Model.MarketHistory);
						done();
					},
					done
				);
		}, 60000);
	});

	describe('#getCandles()', () => {
		it('should respond with an instance of Candle', (done: jest.DoneCallback) => {
			bittrexRx.getCandles('BTC-LTC', TickIntervalValue.Day)
				.subscribe(
					(json: Model.Candle[]) => {
						expect(json[0]).toBeInstanceOf(Model.Candle);
						done();
					},
					done
				);
		}, 60000);
	});
});
