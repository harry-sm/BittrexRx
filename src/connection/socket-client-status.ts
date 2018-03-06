import * as signalR from 'signalr-client';

export type CallbackFunction = (...arg) => any;

export class SocketClientStatus {
	private wsclient: signalR.client;
	constructor(client: signalR.client) {
		this.wsclient = client;
	}

	public set Connected(fn: CallbackFunction) {
		this.wsclient.serviceHandlers.connected = fn;
	}
	public set ConnectionFailed(fn: CallbackFunction) {
		this.wsclient.serviceHandlers.connectFailed = fn;
	}
	public set Disconnected(fn: CallbackFunction) {
		this.wsclient.serviceHandlers.disconnected = fn;
	}
	public set Error(fn: CallbackFunction) {
		this.wsclient.serviceHandlers.onerror = fn;
	}
	public set BindingError(fn: CallbackFunction) {
		this.wsclient.serviceHandlers.bindingError = fn;
	}
	public set ConnectionLost(fn: CallbackFunction) {
		this.wsclient.serviceHandlers.connectionLost = fn;
	}
	public set Reconnecting(fn: CallbackFunction) {
		this.wsclient.serviceHandlers.reconnecting = fn;
	}
}
