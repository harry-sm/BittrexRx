import { Observable, Subscriber } from 'rxjs';
import { SocketClient } from '../connection/socket-client';
import {JsonConvert, ValueCheckingMode} from 'json2typescript';
import * as Model from '../model';
import { SocketClientStatus } from '../connection/socket-client-status'


export class BittrexRxSocketClient {
    private socket: SocketClient;

    private listenerData: Observable<any>;
    constructor() {
        this.socket = new SocketClient('wss://socket.bittrex.com/signalr',  ['CoreHub']);
    }
    get Status(): SocketClientStatus {
        return this.socket.Status();
    }
    // Observable<Models.MarketSummary>
    summaryState(): Observable<Model.SummaryStateDelta> {
        if (this.listenerData === undefined)
            this.listenerData = this.listen();

        return this.listenerData
            .filter(data => (data && data.length !== 0))
            .flatMap((d: Model.SummaryState[]) => d)
            .filter((data) => data.M === 'updateSummaryState')
            .map(item => this.convert(item, Model.SummaryState))
            .map((data: Model.SummaryState) => data.A)
            .filter(data => (data && data.length !== 0))
            .mergeMap(arr => arr);
    }
    exchangeState(markets: string[]): Observable<Model.OrderBookStream> {
        return this.subscribe(markets)
            .filter((data) => data.M === 'updateExchangeState')
            .map(item => this.convert(item, Model.ExchangeState))
            .map((data: Model.ExchangeState) => data.A)
            .filter((data: Model.OrderBookStream[]) => (data && data.length !== 0))
            .mergeMap((arr) => arr)
    }

    private convert<T>(data, dataType: Model.ClassType<T>): T {
        let jsc = new JsonConvert();
        jsc.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null

        return jsc.deserialize(data, dataType);
    }

    private _listen() {
        return this.socket.listener().map(data => {
            if (data && data.M as any[]) {
                return data.M;
            }
        });
    }

    private _listenTo(market: string[]): Observable<any> {
        return this.socket.listenTo('CoreHub', 'SubscribeToExchangeDeltas', market)
    }

    private listen() {
        if (this.listenerData === undefined)
            this.listenerData = this._listen();

        return this.listenerData;
    }

    private subscribe(markets: string[]):Observable<Model.ExchangeState>  {
        return Observable.create((observer: Subscriber<any>) => {
            this._listenTo(markets)
                .subscribe(res => {
                    if (res) {
                        if (this.listenerData === undefined)
                            this.listenerData = this.listen();

                        this.listenerData
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
}

