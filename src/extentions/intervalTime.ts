import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

/**
 * The intervalTime operator returns an Observable 
 * that emits some sequence of data at specified intervals.
 */
export function IntervalTime<T>(this: Observable<T>, milliseconds: number): Observable<T> {
    return Observable.interval(milliseconds).switchMap(() => {
        return this
            .map((responseData) => {
                return responseData;
            });
    })
    .startWith();
}
