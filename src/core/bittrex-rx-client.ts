import * as crypto from 'crypto';
import * as qs from 'querystring';
import { Observable } from 'rxjs';

import * as Model from '../model';
import { Utilities } from './utilities';

import { HttpClient } from '../connection/http-client';
import { BittrexRxSocketClient } from './bittrex-rx-socket-client';
import { OrderConditionalTypeValue, TickIntervalValue, TimeInEffectValue, MarketOrderValue } from '../enum';

import { JsonConvert, JsonCustomConvert, ValueCheckingMode } from 'json2typescript';


interface ApiCredentials {
    key: string;
    secret: string;
}

export class BittrexRxClient {

    private http: HttpClient;
    private requestOptions;
    private jsc: JsonConvert;

    private baseUrl = 'https://bittrex.com/api/';
    private credentials: Partial<ApiCredentials> = {};
        
    constructor() {
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

    apiCredentials(key: string, secret: string) {
        this.credentials = {
            key: key,
            secret: secret,
        };
    }


    // Public Api
    getMarkets(): Observable<Model.Market[]> {
        return this.publicApiCall('/public/getmarkets')
            .map(data => this.responseHandler(data, Model.Market))
            .catch(this.catchErrorHandler);
            
    }
    getCurrencies(): Observable<Model.Currency[]> {
        return this.publicApiCall('/public/getcurrencies')
            .map(data => this.responseHandler(data, Model.Currency))
            .catch(this.catchErrorHandler);
    }
    getTicker(market: string): Observable<Model.Ticker> {
        return this.publicApiCall('/public/getticker', { market })
            .map(data => this.responseHandler(data, Model.Ticker))
            .catch(this.catchErrorHandler);
    }
    getMarketSummaries(): Observable<Model.MarketSummary[]> {
        return this.publicApiCall('/public/getmarketsummaries')
            .map(data => this.responseHandler(data, Model.MarketSummary))
            .catch(this.catchErrorHandler);
    }
    getMarketSummary(market: string): Observable<Model.MarketSummary> {
        return this.publicApiCall('/public/getmarketsummary', { market })
            .map(data => this.responseHandler(data, Model.MarketSummary))
            .mergeMap(arr => arr)            
            .catch(this.catchErrorHandler);
    }
    getOrderBook(market: string): Observable<Model.OrderBook> {
        return this.publicApiCall('/public/getorderbook', { market, type:'both'})
            .map(data => this.responseHandler(data, Model.OrderBook))
            .catch(this.catchErrorHandler);
    }
    getBuyOrderBook(market: string): Observable<Model.OrderBookOrderItem>{
        return this.publicApiCall('/public/getorderbook', { market, type: 'buy' })
            .map(data => this.responseHandler(data, Model.OrderBookOrderItem))
            .catch(this.catchErrorHandler);
    }
    getSellOrderBook(market: string): Observable<Model.OrderBookOrderItem>{
        return this.publicApiCall('/public/getorderbook', { market, type: 'sell' })
            .map(data => this.responseHandler(data, Model.OrderBookOrderItem))
            .catch(this.catchErrorHandler);
    }
    getMarketHistory(market: string): Observable<Model.MarketHistory[]> {
        return this.publicApiCall('/public/getmarkethistory', { market })
            .map(data => this.responseHandler(data, Model.MarketHistory))
            .catch(this.catchErrorHandler);
    }
    
    // V2 API
    getCandles(market: string,
        tickIntervalType: TickIntervalValue): Observable<Model.Candle> {
        // {
        //     _: Date; ((new Date()).getTime()/1000)-(300*5) // start timestamp
        // }
        return this.publicApiCall('/pub/market/GetTicks', {marketName: market, tickInterval: TickIntervalValue[tickIntervalType].toString()}, 2)
            .map(data => this.responseHandler(data, Model.Candle))
            .catch(this.catchErrorHandler);
    }

    // Account API 

    getBalances(): Observable<Model.Balance[]> {
        return this.privateApiCall('/account/getbalances')
            .map(data => this.responseHandler(data, Model.Balance))
            .catch(this.catchErrorHandler);
    }
    getBalance(currency: string): Observable<Model.Balance> {
        return this.privateApiCall('/account/getbalance', { currency })
            .map(data => this.responseHandler(data, Model.Balance))
            .catch(this.catchErrorHandler);
    }
    getDepositAddress(currency: string): Observable<Model.DepositAddress> {
        return this.privateApiCall('/account/getdepositaddress', { currency })
            .map(data => this.responseHandler(data, Model.DepositAddress))
            .catch(this.catchErrorHandler);
    }

    getOrder(uuid: string): Observable<Model.Order> {
        return this.privateApiCall('/account/getorder', { uuid })
            .map(data => this.responseHandler(data, Model.Order))
            .catch(this.catchErrorHandler);
    }

    getOrderHistory(): Observable<Model.OrderHistoryOrderItem[]> {
        return this.privateApiCall('/account/getorderhistory')
            .map(data => this.responseHandler(data, Model.OrderHistoryOrderItem))
            .catch(this.catchErrorHandler);
    }

    getWithdrawalHistory(currency: string): Observable<Model.Transaction[]> {
        return this.privateApiCall('/account/getwithdrawalhistory', { currency })
            .map(data => this.responseHandler(data, Model.Transaction))
            .catch(this.catchErrorHandler);
    }
    getDepositHistory(currency: string): Observable<Model.Transaction[]> {
        return this.privateApiCall('/account/getdeposithistory', { currency })
            .map(data => this.responseHandler(data, Model.Transaction))
            .catch(this.catchErrorHandler);
    }
    private withdraw(currency: string, quantity: number, address: string, paymentid?: string) {
        return this.privateApiCall('/account/withdraw', { currency, quantity, address, paymentid })
            .map(data => this.responseHandler(data, Model.WithdrawalConfirmation))
            .catch(this.catchErrorHandler);
    }

    // Market Api

    setBuyOrder(market: string, quantity: number, rate: number): Observable<Model.OrderResult> {
        return this.privateApiCall('/market/buylimit', { market, quantity, rate })
            .map(data => this.responseHandler(data, Model.OrderResult))
            .catch(this.catchErrorHandler);
    }

    setSellOrder(market: string, quantity: number, rate: number): Observable<Model.OrderResult> {
        return this.privateApiCall('/market/selllimit', { market, quantity, rate })
            .map(data => this.responseHandler(data, Model.OrderResult))
            .catch(this.catchErrorHandler);
    }
    cancelOrder(uuid: string): Observable<void> {
        return this.privateApiCall('/market/cancel', { uuid })
            .map(this.responseVoidHandler)
            .catch(this.catchErrorHandler);
    }
    getOpenOrders(market: string): Observable<Model.OpenOrder[]> {
        return this.privateApiCall('/market/getopenorders', { market })
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
        return this.privateApiCall("/key/market/TradeBuy", { 
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
        return this.privateApiCall("/key/market/TradeSell", { 
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

    

    private getNonce() {
        return Math.floor(new Date().getTime() / 1000);
    }

    private getApiSignature(secret: string, url: string, query: Object) {
        return crypto.createHmac('sha512', this.credentials.secret)
            .update(`${url}?${qs.stringify(query)}`)
            .digest('hex');
    }

    private privateApiCall(urlPath: string, queryOptions = {}, apiVersion = 1) {
        if (this.credentials.key === undefined) {
            return Observable.throw('No API Key Found. Please Set API Credentials');
        }
        let url = `${this.baseUrl}${apiVersion === 1 ? 'v1.1' : 'v2.0'}${urlPath}`;
        let opts = this.requestOptions;

        const query = Utilities.removeUndefined({
            ...queryOptions,
            apikey: this.credentials.key,
            nonce: this.getNonce()
        });

        opts.headers.apisign = this.getApiSignature(this.credentials.secret, url, query);
        url = `${url}?${qs.stringify(query)}`

        return this.http.request(url, opts);
    }
    private publicApiCall(urlPath: string, queryOptions?, apiVersion: number = 1, ) {
        let url = `${this.baseUrl}${apiVersion === 1 ? 'v1.1' : 'v2.0'}${urlPath}`;

        if (queryOptions) {
            url = `${url}?${qs.stringify(queryOptions)}`;
        }
        return this.http.request(url);
    };

    private catchErrorHandler(res) {
        if (res.status === 401 || res.status === 403 || res.status === 404) {
            return Observable.throw('NOT FOUND CHECK URL')
        }
        return Observable.throw(res);
    }
    private responseHandler<T>(res, classType: Model.ClassType<T>): T | any {
        if (res.success) {
            return this.jsc.deserialize(res.result, classType);
        }
        else {
            throw res;
        }
    };
    private responseVoidHandler(res) {
        if (res.success) {
            return res.success;
        }
        else {
            throw res;
        }
    };
}