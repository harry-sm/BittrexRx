import { Observable } from 'rxjs';
import { IntervalTime } from './intervalTime';

declare module 'rxjs/Observable' {
    interface Observable<T> {
        intervalTime: typeof IntervalTime;
    }
  }

Object.assign(Observable.prototype, {intervalTime : IntervalTime})

// https://github.com/martinsik/rxjs-extra
// https://stackoverflow.com/questions/42732988/how-do-i-test-a-function-that-returns-an-observable-using-timed-intervals-in-rxj/42734681
// https://stackoverflow.com/questions/39877156/how-to-extend-string-prototype-and-use-it-next-in-typescript

// declare module "@reactivex/rxjs" {
//     export class Observable<T> {
//         intervalTime: typeof IntervalTime;
//     }
// }

// declare module "@reactivex/rxjs" {
//     namespace Observable {
//         intervalTime: typeof IntervalTime;
//     }
// }
