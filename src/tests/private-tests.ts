
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

import { ApiCredentialsSettings } from "./api-credentials-settings";

describe("BitttrexRx Private Methods", () => {
    let bittrexRx: BittrexRxClient;

    before(done => {
        bittrexRx = new BittrexRxClient();
        bittrexRx.apiCredentials(ApiCredentialsSettings.key, ApiCredentialsSettings.secret);
        done();
    });

    describe("#getBalances()", () => {
        it("should respond with an instance of Balance", done => {
            bittrexRx.getBalances()
                .subscribe(json => {
                    assert.instanceOf(json[0], Model.Balance);
                    done();
                },
                done
                );
        }).timeout(60000);
    });

    describe("#getBalance()", () => {
        it("should respond with an instance of Balance", done => {
            bittrexRx.getBalance('BTC')
                .subscribe(json => {
                    assert.instanceOf(json, Model.Balance);
                    done();
                },
                done
                );
        }).timeout(60000);
    });

    describe("#getOrderHistory()", () => {
        it("should respond with an instance of OrderHistoryOrderItem", done => {
            bittrexRx.getOrderHistory()
                .subscribe(json => {
                    assert.instanceOf(json[0], Model.OrderHistoryOrderItem);
                    done();
                },
                done
                );
        }).timeout(60000);
    });

    describe("#getDepositAddress()", () => {
        it("should respond with an instance of DepositAddress", done => {
            bittrexRx.getDepositAddress('BTC')
                .subscribe(json => {
                    assert.instanceOf(json, Model.DepositAddress);
                    done();
                },
                done
                );
        }).timeout(60000);
    });

    describe("#getDepositHistory()", () => {
        it("should respond with an instance of Transaction", done => {
            bittrexRx.getDepositHistory('BTC')
                .subscribe(json => {
                    assert.instanceOf(json[0], Model.Transaction);
                    done();
                },
                done
                );
        }).timeout(60000);
    });

    describe("#getWithdrawalHistory()", () => {
        it("should respond with an instance of WithdrawalTransaction", done => {
            bittrexRx.getWithdrawalHistory('BTC')
                .subscribe(json => {
                    assert.instanceOf(json[0], Model.WithdrawalTransaction, 'some issue');
                    done();
                },
                done
                );
        }).timeout(60000);
    });
});
