import fetch, { Response, RequestInit, Headers } from 'node-fetch';
import { Observable, Subscriber } from 'rxjs';
import * as cloudscraper from 'cloudscraper';

export interface CloudflareData {
    userAgent: string;
    cookie: string;
}
// cloudscraper.get('https://bittrex.com/', function (error, response, body) {});
export class CloudflareAuthenticator {

    private userAgent: string;
    private cfCredentials: Observable<Partial<CloudflareData>>;

    private static instance: CloudflareAuthenticator;

    private constructor() {
        // this.requestUserAgent();
        this.cloudFlareRequest();
    }

    public static init(){
        if (!CloudflareAuthenticator.instance)
            CloudflareAuthenticator.instance = new CloudflareAuthenticator();
        return CloudflareAuthenticator.instance;
    }

    public getCredentials(): Observable<CloudflareData> {
        return this.cloudFlareRequest() as Observable<CloudflareData>;
    }
    private requestUserAgent (){
        // TODO: if necessary
        // https://www.npmjs.com/package/random-useragent
        // this.userAgent = randomUseragent.getRandom(function (ua) {
        //     //osName: 'Windows', deviceType: 'mobile',
        //     return ua.browserName === 'Chrome' && ua.deviceType !== 'mobile' && parseFloat(ua.browserVersion) >= 50;
        // });
        this.userAgent = 'Mozilla / 5.0(Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2859.0 Safari / 537.36';
    }

    private cloudFlareRequest() {
        if (!this.cfCredentials) {
            let cfResponse: Observable<any> = Observable.create((observer: Subscriber<any>) => {
                cloudscraper.get('https://bittrex.com/', function (error, response) {
                    if (error) {
                        observer.error(error);
                    } else {
                        observer.next(response);
                    }
                });
            });
            this.cfCredentials = cfResponse
                //cache cookie
                .map(this.extractData)
                .publishReplay()
                .refCount()
                .catch(k => k);
        }

        return this.cfCredentials;
    }
    private extractData(res) {
        let data: Partial<CloudflareData> = {};
        data.cookie = res.request.headers['cookie'] || "";
        data.userAgent = res.request.headers["User-Agent"] || "";
        return data;
    }
}
