import { TimerService } from '../shared/services/timer.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Child } from '../shared/model/child.model';
import * as moment from 'moment/moment';

export class HistoryDatabase {
  timeLeftNum: number;
  public timeLeftNumber;
  public minutesLeft;
  countTime: any;
  public minutesDbStart: any;
  public hoursDbStart: any;
  public t;

  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Child[]> = new BehaviorSubject<Child[]>([]);

  get data(): Child[] {
    return this.dataChange.value;
  }

  constructor(data) {
    this.t = data;
    console.log(this.t)
    for (let i = 0; i < this.t.length; i++) {
      this.addUser(i);
    }
  }

  /** Adds a new user to the database. */
  public addUser(count) {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser(count));
    this.dataChange.next(copiedData);
  }


  public spliterTime(time) {
    this.hoursDbStart = time.split(':')[0];
    this.minutesDbStart = time.split(':')[1];
  }

  public timeLeft(time, hours, min) {
    const selMinutes = +(hours * 60) + +min;
    const timeNow = moment();

    this.minutesLeft = moment(time).add(selMinutes, 'minutes');
    this.timeLeftNumber = this.minutesLeft.diff(timeNow, 'minutes');
  }

  private createNewUser(count) {
    this.spliterTime(this.t[count].time);
    const name = this.t[count].name;
    const userSecondName = this.t[count].surname;
    const time = new Date();
    // const hours = this.t[count].hours.toString();
    // const minutes = this.t[count].minutes.toString();

    time.setHours(this.hoursDbStart);
    time.setMinutes(this.minutesDbStart);

    // this.timeLeft(time, hours, minutes);

    // if (hours) {
    //   this.countTime = `${hours}ч. ${minutes}мин`;
    // } else {
    //   this.countTime = `${minutes}мин`;
    // }

    const a = new TimerService(this.timeLeftNumber);

    a.getTimer().subscribe(res => {
      return this.timeLeftNum = res;
    });

    return {
      id: count + 1,
      name,
      surname: userSecondName,
      time,
      countTime: this.countTime,
      countTime2: this.timeLeftNumber,
      key: this.t[count].id
    };
  }
}
