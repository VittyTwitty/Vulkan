import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ChildrenService } from '../shared/services/children.service';
import { Subscription } from 'rxjs/Subscription';
import { Child } from '../shared/model/child.model';
import * as moment from 'moment/moment';
import { TimerService } from '../shared/services/timer.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
  providers: [TimerService]
})
export class HomeListComponent implements AfterViewInit, OnDestroy {
  names: any[] = [];
  children: any[];
  sub: Subscription;


  displayedColumns = ['userId', 'userName', 'surname', 'time', 'countTime', 'countTime2'];
  public exampleDatabase;
  dataSource: ExampleDataSource | null;

  @ViewChild('filter') filter: ElementRef;

  constructor(private childrenService: ChildrenService) {

  }

  ngAfterViewInit() {
    this.sub = this.childrenService.getItemsList().subscribe(
      (res) => {
        this.children = [];
        res.forEach(el => {
          this.children.push(el);
          this.names.push(el.name);
        });
        this.exampleDatabase = new ExampleDatabase(this.children);
        this.dataSource = new ExampleDataSource(this.exampleDatabase);
      }
    );


    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}


/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  timeLeftNum: number;
  intervalTimer: any;
  sub: Subscription;
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

    // this.sub = intervalTimer.getTimer().subscribe(res => {
    //   console.log(res);
    //   this.timeLeftNumber++;
    // });


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
    // console.log(this.hoursDbStart, this.minutesDbStart);
  }

  public timeLeft(time, hours, min) {
    const selMinutes = +(hours * 60) + +min;
    const timeNow = moment();

    this.minutesLeft = moment(time).add(selMinutes, 'minutes');
    this.timeLeftNumber = this.minutesLeft.diff(timeNow, 'minutes');
    console.log('555', this.timeLeftNumber);


  }

  private createNewUser(count) {
    // this.intervalTimer.count = +this.timeLeftNumber;
    this.spliterTime(this.t[count].time);
    const name = this.t[count].name;


    const userSecondName = this.t[count].surname;
    const time = new Date();

    const hours = this.t[count].hours.toString();
    const minutes = this.t[count].minutes.toString();

    time.setHours(this.hoursDbStart);
    time.setMinutes(this.minutesDbStart);

    this.timeLeft(time, hours, minutes);

    if (hours) {
      this.countTime = `${hours}ч. ${minutes}мин`;
    } else {
      this.countTime = `${minutes}мин`;
    }
    const a = new TimerService(this.timeLeftNumber);

    a.getTimer().subscribe(res => {
      return this.timeLeftNum = res;
    });
    console.log(this.timeLeftNum);

    return {
      id: count + 1,
      name,
      surname: userSecondName,
      time,
      countTime: this.countTime,
      countTime2: a.getTimer()
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(private _exampleDatabase: ExampleDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Child[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._exampleDatabase.data.slice().filter((item: Child) => {
        const searchStr = (item.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
    });
  }

  disconnect() {
  }
}
