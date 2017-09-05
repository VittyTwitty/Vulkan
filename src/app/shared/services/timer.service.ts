import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Injectable()
export class TimerService {

  // private timer: Observable<number>;
  constructor(public count: number) {

  }

  getTimer(): Observable<number> {
    return Observable.interval(1000).map((ticTak) => {
      return this.count++;
    });
  }

}
