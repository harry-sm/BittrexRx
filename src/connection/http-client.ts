import fetch, { Response, RequestInit } from 'node-fetch';
import { Observable, Subscriber } from 'rxjs';

import * as Model from '../model/';
import { JsonObject, JsonProperty, Any } from 'json2typescript';
import { CloudflareAuthenticator } from "./cloudflare-authenticator";

export class HttpClient {
    private _request(url: string, options: any = {}): Observable<any> {
        return Observable.create(function (observer: Subscriber<any>) {
            fetch(url, options)
                .then(res => {
                    return res.json()
                        .then(json => {
                            observer.next(json);
                            return json;
                        }).catch(error => {

                            let errorObj = {
                                "status": res.status,
                                "statusText": res.statusText
                            };
                            let err = Object.assign(errorObj, error);

                            observer.error(err);
                            return err;
                        });
                })
                .then(() => {
                    observer.complete();
                });
        });
    }

    // : Observable<Response>
    request(url: string, options?): Observable<any> {
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
