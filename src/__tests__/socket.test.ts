import {
    BittrexRxClient,
    OrderConditionalTypeValue,
    TickIntervalValue,
    TimeInEffectValue,
    MarketOrderValue,
    Model
} from "../index";

import { Observable } from "rxjs";

describe("BitttrexRx Public Methods", () => {
    let bittrexRx: BittrexRxClient;

    beforeAll(done => {
        bittrexRx = new BittrexRxClient();
        done();
    });

    describe("#exchangeState()", () => {
        let socket;
        it("should respond with an instance of OrderBookStream", done => {
            socket = bittrexRx.Socket;
            socket.exchangeState(['BTC-LTC'])
                .take(1)
                .subscribe(json => {
                    expect(json).toBeInstanceOf(Model.OrderBookStream);
                    done();
                },
                done
                );
        }, 20000);
        afterAll(() => socket.close());
    });

    describe("#summaryState()", () => {
         let socket;
        it("should respond with an instance of SummaryStateDelta", done => {
            socket = bittrexRx.Socket;
            socket.summaryState()
                .subscribe(json => {
                    expect(json).toBeInstanceOf(Model.SummaryStateDelta);
                    done();
                },
                done
                );
        }, 20000);
        afterAll(() => socket.close());
    });


});
