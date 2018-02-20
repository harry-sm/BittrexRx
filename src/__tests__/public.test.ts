
import {
    BittrexRxClient,
    OrderConditionalTypeValue,
    TickIntervalValue,
    TimeInEffectValue,
    MarketOrderValue,
    Model
} from '../index'

import { Observable } from 'rxjs';


describe("BitttrexRx Public Methods", () => {
    let bittrexRx: BittrexRxClient;

    beforeAll(done => {
        bittrexRx = new BittrexRxClient();
        done();
    });

    describe("#getMarkets()", () => {
        it("should respond with an instance of Market[]", done => {
            bittrexRx.getMarkets()
                .subscribe(json => {
                    expect(json[0]).toBeInstanceOf(Model.Market);
                    done();
                },
                done
                );
        }, 60000);
    });

    describe("#getTicker()", () => {
        it("should respond with an instance of Ticker", done => {
            bittrexRx.getTicker('BTC-LTC')
                .subscribe(json => {
                    expect(json).toBeInstanceOf(Model.Ticker);
                    done();
                },
                done
                );
        }, 60000);
    });

    describe("#getMarketSummaries()", () => {
        it("should respond with an instance of MarketSummary[]", done => {
            bittrexRx.getMarketSummaries()
                .subscribe(json => {
                    expect(json[0]).toBeInstanceOf(Model.MarketSummary);
                    done();
                },
                done
                );
        }, 60000);
    });

    describe("#getOrderBook()", () => {
        it("should respond with an instance of OrderBook", done => {
            bittrexRx.getOrderBook('BTC-LTC')
                .subscribe(json => {
                    expect(json).toBeInstanceOf(Model.OrderBook);
                    done();
                },
                done
                );
        }, 60000);
    });

    describe("#getMarketHistory()", () => {
        it("should respond with an instance of MarketHistory", done => {
            bittrexRx.getMarketHistory('BTC-LTC')
                .subscribe(json => {
                    expect(json[0]).toBeInstanceOf(Model.MarketHistory);
                    done();
                },
                done
                );
        }, 60000);
    });

    describe("#getCandles()", () => {
        it("should respond with an instance of Candle", done => {
            bittrexRx.getCandles('BTC-LTC', TickIntervalValue.Day)
                .subscribe(json => {
                    expect(json[0]).toBeInstanceOf(Model.Candle);
                    done();
                },
                done
                );
        }, 60000);
    });
});
