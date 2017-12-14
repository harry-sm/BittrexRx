import * as crypto from 'crypto';
import { Observable } from 'rxjs';

import * as Model from '../model';
import { Utilities } from './utilities';

import { HttpClient } from '../connection/http-client';
import { BittrexRxSocketClient } from './bittrex-rx-socket-client';
import { OrderConditionalTypeValue, TickIntervalValue, TimeInEffectValue, MarketOrderValue } from '../enum';

import { JsonConvert } from 'json2typescript';
import { CloudflareAuthenticator } from "../connection/cloudflare-authenticator";


interface ApiCredentials {
    key: string;
    secret: string;
}

export class BittrexRxClient {

    private http: HttpClient;
    private requestOptions;
    private jsc: JsonConvert;

    private nounceHistory: number[];
    private baseUrl = 'https://bittrex.com/api/';
    private credentials: Partial<ApiCredentials> = {};

    constructor() {
        CloudflareAuthenticator.init();

        this.http = new HttpClient();
        this.requestOptions = {
            method: 'GET',
            agent: false,
            headers: {}
        };
        this.jsc = new JsonConvert();
    }

    get Socket():BittrexRxSocketClient {
        return new BittrexRxSocketClient();
    }

    config(baseUrl){
        this.baseUrl = baseUrl;
    }

    apiCredentials(key: string, secret: string) {
        this.credentials = {
            key: key,
            secret: secret,
        };
    }


    // Public Api
    getMarkets(): Observable<Model.Market[]> {
        return this.publicApiRequest('/public/getmarkets')
            .map(data => this.responseHandler(data, Model.Market))
            .catch(this.catchErrorHandler);

    }
    getCurrencies(): Observable<Model.Currency[]> {
        return this.publicApiRequest('/public/getcurrencies')
            .map(data => this.responseHandler(data, Model.Currency))
            .catch(this.catchErrorHandler);
    }
    getTicker(market: string): Observable<Model.Ticker> {
        return this.publicApiRequest('/public/getticker', { market })
            .map(data => this.responseHandler(data, Model.Ticker))
            .catch(this.catchErrorHandler);
    }
    getMarketSummaries(): Observable<Model.MarketSummary[]> {
        return this.publicApiRequest('/public/getmarketsummaries')
            .map(data => this.responseHandler(data, Model.MarketSummary))
            .catch(this.catchErrorHandler);
    }
    getMarketSummary(market: string): Observable<Model.MarketSummary> {
        return this.publicApiRequest('/public/getmarketsummary', { market })
            .map(data => this.responseHandler(data, Model.MarketSummary))
            .mergeMap(arr => arr)
            .catch(this.catchErrorHandler);
    }
    getOrderBook(market: string): Observable<Model.OrderBook> {
        return this.publicApiRequest('/public/getorderbook', { market, type:'both'})
            .map(data => this.responseHandler(data, Model.OrderBook))
            .catch(this.catchErrorHandler);
    }
    getBuyOrderBook(market: string): Observable<Model.OrderBookOrderItem>{
        return this.publicApiRequest('/public/getorderbook', { market, type: 'buy' })
            .map(data => this.responseHandler(data, Model.OrderBookOrderItem))
            .catch(this.catchErrorHandler);
    }
    getSellOrderBook(market: string): Observable<Model.OrderBookOrderItem>{
        return this.publicApiRequest('/public/getorderbook', { market, type: 'sell' })
            .map(data => this.responseHandler(data, Model.OrderBookOrderItem))
            .catch(this.catchErrorHandler);
    }
    getMarketHistory(market: string): Observable<Model.MarketHistory[]> {
        return this.publicApiRequest('/public/getmarkethistory', { market })
            .map(data => this.responseHandler(data, Model.MarketHistory))
            .catch(this.catchErrorHandler);
    }

    // V2 API
    getCandles(market: string,
        tickIntervalType: TickIntervalValue): Observable<Model.Candle[]> {
        // {
        //     _: Date; ((new Date()).getTime()/1000)-(300*5) // start timestamp
        // }
        return this.publicApiRequest('/pub/market/GetTicks', {marketName: market, tickInterval: TickIntervalValue[tickIntervalType].toString()}, 2)
            .map(data => this.responseHandler(data, Model.Candle))
            .catch(this.catchErrorHandler);
    }

    // Account API

    getBalances(): Observable<Model.Balance[]> {
        return this.privateApiRequest('/account/getbalances')
            .map(data => this.responseHandler(data, Model.Balance))
            .catch(this.catchErrorHandler);
    }
    getBalance(currency: string): Observable<Model.Balance> {
        return this.privateApiRequest('/account/getbalance', { currency })
            .map(data => this.responseHandler(data, Model.Balance))
            .catch(this.catchErrorHandler);
    }
    getDepositAddress(currency: string): Observable<Model.DepositAddress> {
        return this.privateApiRequest('/account/getdepositaddress', { currency })
            .map(data => this.responseHandler(data, Model.DepositAddress))
            .catch(this.catchErrorHandler);
    }

    getOrder(uuid: string): Observable<Model.Order> {
        return this.privateApiRequest('/account/getorder', { uuid })
            .map(data => this.responseHandler(data, Model.Order))
            .catch(this.catchErrorHandler);
    }

    getOrderHistory(): Observable<Model.OrderHistoryOrderItem[]> {
        return this.privateApiRequest('/account/getorderhistory')
            .map(data => this.responseHandler(data, Model.OrderHistoryOrderItem))
            .catch(this.catchErrorHandler);
    }

    getWithdrawalHistory(currency: string): Observable<Model.WithdrawalTransaction[]> {
        return this.privateApiRequest('/account/getwithdrawalhistory', { currency })
            .map(data => this.responseHandler(data, Model.WithdrawalTransaction))
            .catch(this.catchErrorHandler);
    }
    getDepositHistory(currency: string): Observable<Model.Transaction[]> {
        return this.privateApiRequest('/account/getdeposithistory', { currency })
            .map(data => this.responseHandler(data, Model.Transaction))
            .catch(this.catchErrorHandler);
    }
    private withdraw(currency: string, quantity: number, address: string, paymentid?: string) {
        return this.privateApiRequest('/account/withdraw', { currency, quantity, address, paymentid })
            .map(data => this.responseHandler(data, Model.WithdrawalConfirmation))
            .catch(this.catchErrorHandler);
    }

    // Market Api

    setBuyOrder(market: string, quantity: number, rate: number): Observable<Model.OrderResult> {
        return this.privateApiRequest('/market/buylimit', { market, quantity, rate })
            .map(data => this.responseHandler(data, Model.OrderResult))
            .catch(this.catchErrorHandler);
    }

    setSellOrder(market: string, quantity: number, rate: number): Observable<Model.OrderResult> {
        return this.privateApiRequest('/market/selllimit', { market, quantity, rate })
            .map(data => this.responseHandler(data, Model.OrderResult))
            .catch(this.catchErrorHandler);
    }
    cancelOrder(uuid: string): Observable<void> {
        return this.privateApiRequest('/market/cancel', { uuid })
            .map(this.responseVoidHandler)
            .catch(this.catchErrorHandler);
    }
    getOpenOrders(market: string): Observable<Model.OpenOrder[]> {
        return this.privateApiRequest('/market/getopenorders', { market })
            .map(data => this.responseHandler(data, Model.OpenOrder))
            .catch(this.catchErrorHandler);
    }

    // V2 API
    setConditionalBuyOrder(
        market: string,
        marketOrderType: MarketOrderValue,
        quantity: number,
        rate: number,
        timeInEffect: TimeInEffectValue,
        conditionType: OrderConditionalTypeValue,
        target: number
    ): Observable<Model.ConditionalOrder>
    {
        return this.privateApiRequest("/key/market/TradeBuy", {
                MarketName: market,
                orderType: MarketOrderValue[marketOrderType].toString(),
                quantity,
                rate,
                timeInEffect: TimeInEffectValue[timeInEffect].toString(),
                conditionType: OrderConditionalTypeValue[conditionType].toString(),
                target
            },
            2
            )
            .map(data => this.responseHandler(data, Model.ConditionalOrder))
            .catch(this.catchErrorHandler);
    }

    setConditionalSellOrder(
        market: string,
        marketOrderType: MarketOrderValue,
        quantity: number,
        rate: number,
        timeInEffect: TimeInEffectValue,
        conditionType: OrderConditionalTypeValue,
        target: number
    ): Observable<Model.ConditionalOrder>
    {
        return this.privateApiRequest("/key/market/TradeSell", {
                MarketName: market,
                orderType: MarketOrderValue[marketOrderType].toString(),
                quantity,
                rate,
                timeInEffect: TimeInEffectValue[timeInEffect].toString(),
                conditionType: OrderConditionalTypeValue[conditionType].toString(),
                target
            },
            2
            )
            .map(data => this.responseHandler(data, Model.ConditionalOrder))
            .catch(this.catchErrorHandler);
    }

    customRequest(url: string, queryOptions: Object, useCredentials: Boolean): Observable<any> {
        return this.dispatchRequest(url, queryOptions, useCredentials)
            .map(data => this.responseHandler(data))
            .catch(this.catchErrorHandler);
    }

    // Adderesses the possibility of a nounce collision
    // https://github.com/khuezy/node.bittrex.api/blob/master/node.bittrex.api.js#L48
    private getNonce() {
        this.nounceHistory = [];
        let nonce = Math.floor(new Date().getTime() / 1000);

        if (this.nounceHistory.indexOf(nonce) > -1) {
            return this.getNonce();
        }

        this.nounceHistory = this.nounceHistory.slice(-50);
        this.nounceHistory.push(nonce);
        return nonce;
    }

    private getApiSignature(secret: string, url: string, queryObject: Object) {
        return crypto.createHmac('sha512', this.credentials.secret)
            .update(`${url}?${Utilities.generateQuerySting(queryObject)}`)
            .digest('hex');
    }

    private dispatchRequest(url: string, queryOptions, useCredentials: Boolean = false) {
        if (this.credentials.key === undefined && useCredentials) {
            return Observable.throw(new Error('No API Key Found. Please Set API Credentials.'));
        }

        let opts = this.requestOptions;
        let queryObject = queryOptions;

        if (useCredentials) {
            queryObject = Utilities.removeUndefined({
                ...queryOptions,
                apikey: this.credentials.key,
                nonce: this.getNonce()
            });

            opts.headers.apisign = this.getApiSignature(this.credentials.secret, url, queryObject);
        }

        if (queryObject) {
            url = `${url}?${Utilities.generateQuerySting(queryObject)}`;
        }

        return this.http.request(url, opts);
    }

    private privateApiRequest(urlPath: string, queryOptions = {}, apiVersion = 1) {
        let url = `${this.baseUrl}${apiVersion === 1 ? 'v1.1' : 'v2.0'}${urlPath}`;
        return this.dispatchRequest(url, queryOptions, true);
    }
    private publicApiRequest(urlPath: string, queryOptions?, apiVersion: number = 1, ) {
        let url = `${this.baseUrl}${apiVersion === 1 ? 'v1.1' : 'v2.0'}${urlPath}`;
        return this.dispatchRequest(url, queryOptions);
    };

    private catchErrorHandler(res: Error) {
        res.stack = "";
        return Observable.throw(res);
    }
    private responseHandler<T>(res: Model.ApiResponse, classType?: Model.ClassType<T>): T | any {
        if (res.success && classType) {
            return this.jsc.deserialize(res.result, classType);
        }
        else if (res.success && !classType) {
            return res.result;
        }
        else if (
            res.error.status === 401 ||
            res.error.status === 403 ||
            res.error.status === 404
        ) {
            throw new Error ('URL Not Found');
        }
        else {
            throw new Error (res.message);
        }
    };
    private responseVoidHandler(res) {
        if (res.success) {
            return res.success;
        }
        else {
            throw new Error(res.message);
        }
    };
}
