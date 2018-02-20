import { Observable, Subscriber } from 'rxjs';
import { SocketClient } from '../connection/socket-client';
import {JsonConvert, ValueCheckingMode} from 'json2typescript';
import * as Model from '../model';
import { SocketClientStatus } from '../connection/socket-client-status'
import { ExchangeState } from '../model';


export class BittrexRxSocketClient {
    private socket: SocketClient;

    private dataStream: Observable<any>;
    constructor() {
        this.socket = new SocketClient('wss://socket.bittrex.com/signalr',  ['CoreHub']);
    }
    get Status(): SocketClientStatus {
        return this.socket.Status();
    }

    public summaryState(): Observable<Model.SummaryStateDelta> {
        return this.subscribeToSummaryState()
            .flatMap((d: Model.SummaryState[]) => d)
            .filter(data => data.M === 'updateSummaryState')
            .map(item => this.convert(item, Model.SummaryState))
            .map((data: Model.SummaryState) => data.A)
            .filter(data => (data && data.length !== 0))
            .mergeMap(arr => arr);
    }
    public exchangeState(markets: string[]): Observable<Model.OrderBookStream> {
        return this.subscribeToExchangeState(markets)
            .filter((data) => data.M === 'updateExchangeState')
            .map(item => this.convert(item, Model.ExchangeState))
            .map((data: Model.ExchangeState) => data.A)
            .filter((data: Model.OrderBookStream[]) => (data && data.length !== 0))
            .mergeMap((arr) => arr)
    }

    public close() {
        this.socket.close();
    }

    private convert<T>(data, dataType: Model.ClassType<T>): T {
        let jsc = new JsonConvert();
        jsc.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null

        return jsc.deserialize(data, dataType);
    }

    private requestDataStream() {
        return this.socket.listener().map(data => {
            if (typeof data === 'object' && Object.keys(data).length !== 0 && data.M !== undefined) {
                return data.M;
            }
        });
    }

    private connectToDataStream() {
        if (this.dataStream === undefined)
            this.dataStream = this.requestDataStream();

        return this.dataStream;
    }

    private subscribeWithMarkets(market: string[]): Observable<any> {
        // queryOrderState, queryExchangeState, SubscribeToExchangeDeltas
        return this.socket.registerListener('CoreHub', 'SubscribeToExchangeDeltas', market)
    }
    private subscribeNoMarkets(): Observable<any> {
        // subscribeToUserDeltas, querySummaryState, queryBalanceState, SubscribeToSummaryDeltas
        return this.socket.registerListener('CoreHub', 'SubscribeToSummaryDeltas');
    }

    private subscribeToExchangeState(markets: string[]):Observable<Model.ExchangeState>  {
        return Observable.create((observer: Subscriber<any>) => {
            this.subscribeWithMarkets(markets)
                .subscribe(res => {
                    if (res) {
                        this.connectToDataStream()
                            .filter(data => (data && data.length !== 0))
                            .mergeMap((d: Model.ExchangeState[]) => d)
                            .subscribe(k => observer.next(k));
                    }
                    else {
                        observer.error(res);
                    }
                });
        });
    }

    private subscribeToSummaryState(): Observable<Model.SummaryState[]> {
        return Observable.create((observer: Subscriber<any>) => {
            this.subscribeNoMarkets()
                .subscribe(res => {
                    if (res) {
                        this.connectToDataStream()
                            .filter(data => (typeof data === 'object' && Object.keys(data).length !== 0))
                            .subscribe(k => observer.next(k));
                    }
                    else {
                        observer.error(res);
                    }
                });
        });
    }
}

