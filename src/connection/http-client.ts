import fetch, { Response, RequestInit } from 'node-fetch';
import { Observable, Subscriber } from 'rxjs';

import * as Model from '../model/';
import { JsonObject, JsonProperty, Any } from 'json2typescript';
import { CloudflareAuthenticator } from "./cloudflare-authenticator";
import { ApiResponse } from '../model/';

export class HttpClient {
    private _request(url: string, options: any = {}): Observable<ApiResponse> {
        let response: ApiResponse = new ApiResponse();

        let promise = fetch(url, options)
            .then(res => {
                return res.json()
                    .then((json: ApiResponse) => {
                        return Object.assign(response, json);
                    }).catch( error => {
                        let resObj = {
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

    request(url: string, options?): Observable<ApiResponse> {
        return Observable.create((observer: Subscriber<any>) => {
            CloudflareAuthenticator.init().getCredentials()
                .subscribe(data => {
                    options.headers = (options.headers !== undefined) ? options.headers : {};

                    options.headers['User-Agent'] = data.userAgent;
                    options.headers['cookie'] = data.cookie;

                    console.log("HTTP Authenticated!");
                    this._request(url, options).subscribe(k => observer.next(k));
                },
                err => {
                    console.warn("HTTP CloudFalre Authentication Failed!");
                    this._request(url, options).subscribe(k => observer.next(k));
                });
        });
    }

}
