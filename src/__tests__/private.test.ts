
import {
    BittrexRxClient,
    OrderConditionalTypeValue,
    TickIntervalValue,
    TimeInEffectValue,
    MarketOrderValue,
    Model
} from '../index'
import { Observable } from 'rxjs';

import { ApiCredentialsSettings } from "../helpers/api-credentials-settings";

describe("BitttrexRx Private Methods", () => {
    let bittrexRx: BittrexRxClient;

    beforeAll(done => {
        bittrexRx = new BittrexRxClient();
        bittrexRx.apiCredentials(ApiCredentialsSettings.key, ApiCredentialsSettings.secret);
        done();
    });

    describe("#getBalances()", () => {
        it("should respond with an instance of Balance", done => {
            bittrexRx.getBalances()
                .subscribe(json => {
                    expect(json[0]).toBeInstanceOf(Model.Balance)
                    done();
                },
                done
                );
        }, 60000);
    });

    describe("#getBalance()", () => {
        it("should respond with an instance of Balance", done => {
            bittrexRx.getBalance('BTC')
                .subscribe(json => {
                    expect(json).toBeInstanceOf(Model.Balance);
                    done();
                },
                done
                );
        }, 60000);
    });

    describe("#getOrderHistory()", () => {
        it("should respond with an instance of OrderHistoryOrderItem", done => {
            bittrexRx.getOrderHistory()
                .subscribe(json => {
                    expect(json[0]).toBeInstanceOf(Model.OrderHistoryOrderItem);
                    done();
                },
                done
                );
        }, 60000);
    });

    describe("#getDepositAddress()", () => {
        it("should respond with an instance of DepositAddress", done => {
            bittrexRx.getDepositAddress('BTC')
                .subscribe(json => {
                    expect(json).toBeInstanceOf(Model.DepositAddress);
                    done();
                },
                done
                );
        }, 60000);
    });

    describe("#getDepositHistory()", () => {
        it("should respond with an instance of Transaction", done => {
            bittrexRx.getDepositHistory('BTC')
                .subscribe(json => {
                    expect(json[0]).toBeInstanceOf(Model.Transaction);
                    done();
                },
                done
                );
        }, 60000);
    });

    describe("#getWithdrawalHistory()", () => {
        it("should respond with an instance of WithdrawalTransaction", done => {
            bittrexRx.getWithdrawalHistory('BTC')
                .subscribe(json => {
                    expect(json[0]).toBeInstanceOf(Model.WithdrawalTransaction);
                    done();
                },
                done
                );
        }, 60000);
    });
});
