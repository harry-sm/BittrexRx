import * as signalR from 'signalr-client';

export class SocketClientStatus {
    private wsclient;
    constructor(client){
        this.wsclient = client;
    }

    public set Connected(fn:Function) {
        this.wsclient.serviceHandlers.connected = fn; 
    }
    public set ConnectionFailed(fn:Function) {
        this.wsclient.serviceHandlers.connectFailed = fn; 
    }
    public set Disconnected(fn:Function) {
        this.wsclient.serviceHandlers.disconnected = fn; 
    }
    public set Error(fn:Function) {
        this.wsclient.serviceHandlers.onerror = fn; 
    }
    public set BindingError(fn:Function) {
        this.wsclient.serviceHandlers.bindingError = fn; 
    }
    public set ConnectionLost(fn:Function) {
        this.wsclient.serviceHandlers.connectionLost = fn; 
    }
    public set Reconnecting(fn:Function) {
        this.wsclient.serviceHandlers.reconnecting = fn; 
    }
}
