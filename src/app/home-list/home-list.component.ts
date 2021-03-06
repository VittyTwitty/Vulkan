import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Observable } from 'rxjs/Observable';
import { ChildrenService } from '../shared/services/children.service';
import { Subscription } from 'rxjs/Subscription';
import { TimerService } from '../shared/services/timer.service';
import { ExampleDataSource } from './data-source';
import { ExampleDatabase } from './database-worker';
import { MdSnackBar } from '@angular/material';

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
  ids: string[] = [];

  displayedColumns = ['userId', 'userName', 'surname', 'time', 'countTime', 'countTime2', 'delete'];
  public exampleDatabase;
  dataSource: ExampleDataSource | null;

  @ViewChild('filter') filter: ElementRef;

  constructor(private childrenService: ChildrenService, public snackBar: MdSnackBar) {

  }

  ngAfterViewInit() {
    this.sub = this.childrenService.getItemsList().subscribe(
      (res) => {
        this.children = [];
        res.forEach(el => {
          this.children.push(el);
          this.names.push(el.name);
          this.ids.push(el.id);
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

  public outChild(item) {
    // this.childrenService.deleteChild(item.key);
    this.snackBar.open(`${item.name} ${item.surname}`, 'Вышел', {
      duration: 3000,
    });
    this.childrenService.addChildToHistory({
      name: item.name,
      surname: item.surname,
      id: item.key,
      time: item.countTime
    });
    console.log(item);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
