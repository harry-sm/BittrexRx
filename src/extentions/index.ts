import { Observable } from 'rxjs';
import { IntervalTime } from './interval-time';

declare module 'rxjs/Observable' {
	// tslint:disable-next-line:interface-name
	interface Observable<T> {
		intervalTime: typeof IntervalTime;
	}
}

Object.assign(Observable.prototype, {intervalTime : IntervalTime});
