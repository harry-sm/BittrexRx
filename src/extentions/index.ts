import { Observable } from 'rxjs';
import { IntervalTime } from './interval-time';

declare module 'rxjs/Observable' {
    interface Observable<T> {
        intervalTime: typeof IntervalTime;
    }
  }

Object.assign(Observable.prototype, {intervalTime : IntervalTime});