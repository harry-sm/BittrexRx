import * as jsonic from 'jsonic';
import * as signalR from 'signalr-client';

import { Observable, Subscriber } from 'rxjs';
import { SocketClientStatus } from './socket-client-status'


export class SocketClient {
    private wsclient: signalR.client;

    constructor(baseUrl?: string, hubs?: string[]) {

        var opts = {
            websockets_baseurl: baseUrl,
            websockets_hubs: hubs,
        };
        this.wsclient = new signalR.client(
            opts.websockets_baseurl,
            opts.websockets_hubs,
            12
        );
        // this.wsclient.start();
    }

    public Status(): SocketClientStatus{
        return new SocketClientStatus(this.wsclient);
    } 

    public listener(): Observable<any> {
        return Observable.create((observer: Subscriber<any>) => {
            this.wsclient.serviceHandlers.messageReceived = function (message) {
                observer.next(jsonic(message.utf8Data));
            }
        });
    }

    public registerListener(hub: string, methodName: string, markets?: string[]) {
        return Observable.create((observer: Subscriber<any>) => {
            this.wsclient.serviceHandlers.connected = (connection) => {
                if(markets !== undefined){
                    markets.forEach((market) => {
                        this.wsclient.call(hub, methodName, market).done(function (err, result) {
                            if (err) {
                                observer.error(err);
                            }
                            observer.next(result);
                        });
                    });
                } else {
                    this.wsclient.call(hub, methodName).done(function (err, result) {
                        if (err) {
                            observer.error(err);
                        }
                        observer.next(result);
                    });
                } 
            }
        });
    }
}