import { Observable, Subscriber } from 'rxjs';
import fetch, { Response } from 'node-fetch';

import { ApiResponse } from '../model/';
import { CloudflareAuthenticator, CloudflareData } from './cloudflare-authenticator';

import { LogTypeValue } from '../enum';
import { Logger } from '../helpers/logger';

export class HttpClient {
	public request(url: string, options?: any): Observable<ApiResponse> {
		return Observable.create((observer: Subscriber<any>) => {
			CloudflareAuthenticator.init().getCredentials()
				.subscribe(
				(data: CloudflareData) => {
					options.headers = (options.headers !== undefined) ? options.headers : {};

					options.headers['User-Agent'] = data.userAgent;
					options.headers.cookie = data.cookie;

					Logger.Stream.write(LogTypeValue.Debug, 'HTTP Request Authenticated!');
					this._request(url, options).subscribe((k: ApiResponse) => observer.next(k));
				},
				(err: any) => {
					Logger.Stream.write(LogTypeValue.Warning, 'HTTP Request Authentication Failed!');
					this._request(url, options).subscribe((k: ApiResponse) => observer.next(k));
				});
		});
	}

	private _request(url: string, options: any = {}): Observable<ApiResponse> {
		const response: ApiResponse = new ApiResponse();

		const promise: Promise<ApiResponse> = fetch(url, options)
			.then((res: Response) => {
				return res.json()
					.then((json: ApiResponse) => {
						return Object.assign(response, json);
					})
					.catch((error: any) => {
						const resObj: any = {
							status: res.status,
							statusText: res.statusText,
							url: res.url
						};
						Object.assign(response.error, resObj, error);
						return response;
					});
			});
		return Observable.fromPromise(promise);
	}
}
