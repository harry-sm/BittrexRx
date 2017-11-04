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

    public listenTo(hub: string, methodName: string, markets: string[]) {
        return Observable.create((observer: Subscriber<any>) => {
            this.wsclient.serviceHandlers.connected = (connection) => {
                markets.forEach((market) => {
                    this.wsclient.call(hub, methodName, market).done(function (err, result) {
                        if (err) {
                            observer.error(err);
                        }
                        observer.next(result);
                    });
                });
            }
        });
    }
}

// export class SocketClientStatus {
//     private wsclient: signalR.client;
//     constructor(client: signalR.client){
//         this.wsclient = client;
//     }

//     public set Connected(fn:Function) {
//         this.wsclient.serviceHandlers.connected = fn; 
//     }
//     public set ConnectionFailed(fn:Function) {
//         this.wsclient.serviceHandlers.connectFailed = fn; 
//     }
//     public set Disconnected(fn:Function) {
//         this.wsclient.serviceHandlers.disconnected = fn; 
//     }
//     public set Error(fn:Function) {
//         this.wsclient.serviceHandlers.onerror = fn; 
//     }
//     public set BindingError(fn:Function) {
//         this.wsclient.serviceHandlers.bindingError = fn; 
//     }
//     public set ConnectionLost(fn:Function) {
//         this.wsclient.serviceHandlers.connectionLost = fn; 
//     }
//     public set Reconnecting(fn:Function) {
//         this.wsclient.serviceHandlers.reconnecting = fn; 
//     }
// }
