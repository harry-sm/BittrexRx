import * as jsonic from 'jsonic';
import * as signalR from 'signalr-client';
import fetch from 'node-fetch';

import { Observable, Subscriber, Subject } from 'rxjs';
import { SocketClientStatus } from './socket-client-status'

import { LogTypeValue } from '../enum';
import { Logger } from '../helpers/logger';

import { CloudflareAuthenticator } from "./cloudflare-authenticator";


export class SocketClient {
    private wsclient: signalR.client;
    private cfAuth: CloudflareAuthenticator;
    private isDisconnected: boolean = false;
    private isReconnecting: boolean = false;

    private isAuthenticated: Subject<Boolean> = new Subject<Boolean>();

    private baseUrl: string;
    private hubs: string[];

    constructor(baseUrl?: string, hubs?: string[]) {
        this.cfAuth = CloudflareAuthenticator.init();
        this.hubs = hubs;
        this.baseUrl = baseUrl;
        this.constructorAsync(baseUrl, hubs);
    }

    constructorAsync(baseUrl?: string, hubs?: string[]) {
        // if(this.isDisconnected)
        //     this.isReconnecting = true;

        //force end of connection.
        (this.wsclient && this.wsclient.end());

        this.wsclient = new signalR.client(
            baseUrl,
            hubs,
            12,
            true
        );

        this.cfAuth.getCredentials()
            .subscribe((data) => {
                this.wsclient.headers['cookie'] = data.cookie;
                this.wsclient.headers['User-Agent'] = data.userAgent;

                this.wsclient.start();
                this.wsclient.serviceHandlers.connected = () => {
                    Logger.Stream.write(LogTypeValue.Debug, 'Socket Connected And Authenticated!');
                    this.isDisconnected = false;
                    this.isAuthenticated.next(true);
                };
            },
            err => {
                this.wsclient.start();
                this.wsclient.serviceHandlers.connected = () => {
                    Logger.Stream.write(LogTypeValue.Warning, 'Socket Connected But Not Authenticated!');
                    this.isDisconnected = false;
                    this.isAuthenticated.next(false);
                };
            },
            () => {

            });

        this.wsclient.serviceHandlers.bound = () => {
            Logger.Stream.write(LogTypeValue.Debug, 'Socket Bound');
        }
        this.wsclient.serviceHandlers.reconnecting = (retryData) => {
            this.isDisconnected = true;
            if (!this.isReconnecting){
                Logger.Stream.write(LogTypeValue.Debug, "Reconnecting...");
                this.isReconnecting = true;
                this.constructorAsync(this.baseUrl, this.hubs);
            }

            return true;
        };
        this.wsclient.serviceHandlers.disconnected = () => {
            this.isDisconnected = true;
            if (!this.isReconnecting) {
                Logger.Stream.write(LogTypeValue.Debug, 'Restarting Connection...');
                this.isReconnecting = true;
                this.constructorAsync(this.baseUrl, this.hubs);
            }
        }

        this.wsclient.serviceHandlers.bindingError = () => {
            this.isDisconnected = true;
            if (!this.isReconnecting) {
                Logger.Stream.write(LogTypeValue.Error, 'Error Restarting Connection...');
                this.isReconnecting = true;
                this.constructorAsync(this.baseUrl, this.hubs);
            }
        }

        this.wsclient.serviceHandlers.onerror = (errorMessage, exception, errorData) => {
            Logger.Stream.write(
                LogTypeValue.Error,
                `${errorMessage ? errorMessage : '' } ${exception ? exception : ''} ${errorData ? errorData : ''}`);
            this.wsclient.end();
        }

        this.wsclient.serviceHandlers.disconnected = () => {
            Logger.Stream.write(LogTypeValue.Debug, 'Socket Disconnected');
        }

        // this.wsclient.serviceHandlers.onUnauthorized = (error) => {
        //     console.log("onUnauthorized", error);
        // }
        // this.wsclient.serviceHandlers.connectionLost = (error) => {
        //     console.log("connectionLost", error);
        // }
    }


    public Status(): SocketClientStatus {
        return new SocketClientStatus(this.wsclient);
    }

    public close() {
        this.wsclient.end();
    }

    public listener(): Observable<any> {
        let connectionRestartTimer;

        return Observable.create((observer: Subscriber<any>) => {
            this.wsclient.serviceHandlers.messageReceived = (message) => {
                observer.next(jsonic(message.utf8Data));

                // If no data is received after 60 seconds the connection is restarted
                clearTimeout(connectionRestartTimer);
                connectionRestartTimer = setTimeout(() => {
                    if (!this.isDisconnected && !this.isReconnecting) {
                        this.isDisconnected = true;
                        this.isReconnecting = true;
                        Logger.Stream.write(LogTypeValue.Debug, 'Connection Timeout, Restarting...');
                        this.constructorAsync(this.baseUrl, this.hubs);
                    }
                }, 60000);
                this.isReconnecting = false;
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
