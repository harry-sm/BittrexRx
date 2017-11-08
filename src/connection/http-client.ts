import fetch from 'node-fetch';
import { Observable, Subscriber } from 'rxjs';
// import {JsonConvert, JsonCustomConvert} from 'json2typescript';
import * as Model from '../model/';
import {JsonObject, JsonProperty, Any} from 'json2typescript';


export class HttpClient {
    private _request(url: string, options = {}): Observable<any> {
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
    request(url: string, options?) {
        return this._request(url, options)
    }
    
}
