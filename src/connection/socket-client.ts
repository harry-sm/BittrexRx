import * as jsonic from 'jsonic';
import * as signalR from 'signalr-client';
import fetch from 'node-fetch';

import { Observable, Subscriber, Subject, ConnectableObservable } from 'rxjs';
import { SocketClientStatus } from './socket-client-status'
import { CloudflareAuthenticator } from "./cloudflare-authenticator";


export class SocketClient {
    private wsclient: signalR.client;
    private cfAuth: CloudflareAuthenticator;
    private isAuthenticated: Subject<Boolean> = new Subject<Boolean>();

    private baseUrl: string;
    private hubs: string[];

    constructor(baseUrl?: string, hubs?: string[]) {
        this.cfAuth = CloudflareAuthenticator.init();
        this.constructorAsync(baseUrl, hubs);
        this.baseUrl = baseUrl;
        this.hubs = hubs;
    }

    constructorAsync(baseUrl?: string, hubs?: string[]) {
        //force end of connection.
        (this.wsclient && this.wsclient.end());

        this.wsclient = new signalR.client(
            baseUrl,
            hubs,
            12,
            true
        ); //this.wsclient.state

        this.cfAuth.getCredentials()
            .subscribe((data) => {
                this.wsclient.headers['User-Agent'] = data.userAgent;
                this.wsclient.headers['cookie'] = data.cookie;

                this.wsclient.start();
                this.wsclient.serviceHandlers.connected = () => {
                    console.log("Socket Authenticated!");
                    this.isAuthenticated.next(true);
                    console.log("Connected!");
                };
            },
            err => {
                this.wsclient.start();
                this.wsclient.serviceHandlers.connected = () => {
                    console.log("Connected!!");
                    this.isAuthenticated.next(false);
                };
            },
            () => {

            });

        this.wsclient.serviceHandlers.reconnecting = function (retryData) {
            console.log("Reconnecting...");
            this.constructorAsync(this.baseUrl, this.hubs);
            return true;
        };
        this.wsclient.serviceHandlers.disconnected = () => {
            console.log('Restarting Connection');
            this.constructorAsync(this.baseUrl, this.hubs);
        }
    }

    public Status(): SocketClientStatus {
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
            this.isAuthenticated
                .subscribe((check) => {
                    if (check) {
                        this.registerListenerSync(observer, hub, methodName, markets);
                    }
                    else {
                        console.warn("Socket CloudFalre Authenticcation Failed!");
                        this.registerListenerSync(observer, hub, methodName, markets);
                    }
                });
        });
    }

    public registerListenerSync(observer: Subscriber<any>, hub: string, methodName: string, markets?: string[]) {
        if (markets !== undefined) {
            markets.forEach((market) => {
                this.wsclient.call(hub, methodName, market).done(function (err, result) {
                    if (err) {
                        observer.error(err);
                    }
                    observer.next(result);
                });
            });
        }
        else {
            this.wsclient.call(hub, methodName).done(function (err, result) {
                if (err) {
                    observer.error(err);
                }
                observer.next(result);
            });
        }
    }
}
