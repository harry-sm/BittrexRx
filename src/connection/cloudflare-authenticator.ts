import fetch, { Response, RequestInit, Headers } from 'node-fetch';
import { Observable, Subscriber } from 'rxjs';

export interface CloudflareData {
    userAgent: string;
    cookie: string;
}

export class CloudflareAuthenticator {

    private userAgent: string;
    private cookieStroage: Observable<string>;
    private static instance: CloudflareAuthenticator;

    private constructor() {
        this.requestUserAgent();
        this.cloudFlareRequest();
    }

    public static init(){
        if (!CloudflareAuthenticator.instance)
            CloudflareAuthenticator.instance = new CloudflareAuthenticator();
        return CloudflareAuthenticator.instance;
    }

    public getCredentials(): Observable<CloudflareData> {
        let data: Partial<CloudflareData> = {};
        return Observable.create((observer: Subscriber<Partial<CloudflareData>>) => {
            this.cookieStroage.subscribe(cookie => {
                data = {
                    cookie: cookie,
                    userAgent: this.userAgent
                };
                observer.next(data);
            },
            err => {
                observer.error(err);
            },
            () => {
                observer.complete();
            });
        })

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

    private getRequestOptions(): Partial<RequestInit>{
        let requestOpts: Partial<RequestInit> = {};
        let headers: Headers = new Headers();

        headers.set('User-Agent', this.userAgent);

        requestOpts.compress = true;
        requestOpts.headers = headers;

        return requestOpts;
    }

    private cloudFlareRequest() {

        if(!this.cookieStroage) {
            let promise = fetch('https://bittrex.com/', this.getRequestOptions())
                .then(res => {
                    return res;
                }).catch(err => {
                    return err;
                    // throw err;
                });

            this.cookieStroage = Observable.fromPromise(promise)
                //cache cookie
                .map(this.extractCookie)
                .publishReplay()
                .refCount()
                .catch(k => "");
        }
        return this.cookieStroage;
    }

    private extractCookie(res: Response) {
        let cookieData = res.headers.get('set-cookie');
        let pattern = /__cfduid=([a-zA-Z0-9]+)/;
        let cookie = pattern.exec(cookieData)[0];
        return cookie.length > 0 ? cookie : "";
    }
}
