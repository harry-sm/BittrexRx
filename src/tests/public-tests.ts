
import {
    BittrexRxClient,
    OrderConditionalTypeValue,
    TickIntervalValue,
    TimeInEffectValue,
    MarketOrderValue,
    Model
} from '../index'
import * as chai from "chai";
const assert = chai.assert;

import { Observable } from 'rxjs';


describe("BitttrexRx Public Methods", () => {
    let bittrexRx: BittrexRxClient;

    before(done => {
        bittrexRx = new BittrexRxClient();
        done();
    });

    describe("#getMarkets()", () => {
        it("should respond with an instance of Market[]", done => {
            bittrexRx.getMarkets()
                .subscribe(json => {
                    assert.instanceOf(json[0], Model.Market);
                    done();
                },
                done
                );
        }).timeout(60000);
    });

    describe("#getTicker()", () => {
        it("should respond with an instance of Ticker", done => {
            bittrexRx.getTicker('BTC-LTC')
                .subscribe(json => {
                    assert.instanceOf(json, Model.Ticker);
                    done();
                },
                done
                );
        }).timeout(60000);
    });

    describe("#getMarketSummaries()", () => {
        it("should respond with an instance of MarketSummary[]", done => {
            bittrexRx.getMarketSummaries()
                .subscribe(json => {
                    assert.instanceOf(json[0], Model.MarketSummary);
                    done();
                },
                done
                );
        }).timeout(60000);
    });

    describe("#getOrderBook()", () => {
        it("should respond with an instance of OrderBook", done => {
            bittrexRx.getOrderBook('BTC-LTC')
                .subscribe(json => {
                    assert.instanceOf(json, Model.OrderBook);
                    done();
                },
                done
                );
        }).timeout(60000);
    });

    describe("#getMarketHistory()", () => {
        it("should respond with an instance of MarketHistory", done => {
            bittrexRx.getMarketHistory('BTC-LTC')
                .subscribe(json => {
                    assert.instanceOf(json[0], Model.MarketHistory);
                    done();
                },
                done
                );
        }).timeout(60000);
    });

    describe("#getCandles()", () => {
        it("should respond with an instance of Candle", done => {
            bittrexRx.getCandles('BTC-LTC', TickIntervalValue.Day)
                .subscribe(json => {
                    assert.instanceOf(json[0], Model.Candle);
                    done();
                },
                done
                );
        }).timeout(60000);
    });
});
