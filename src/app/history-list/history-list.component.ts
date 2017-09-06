import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Observable } from 'rxjs/Observable';
import { ChildrenService } from '../shared/services/children.service';
import { Subscription } from 'rxjs/Subscription';
import { ExampleDataSource } from '../home-list/data-source';
import { HistoryDatabase } from './database-history';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements AfterViewInit, OnDestroy {
  names: any[] = [];
  children: any[];
  sub: Subscription;
  ids: string[] = [];

  displayedColumns = ['userId', 'userName', 'surname', 'time', 'countTime'];
  public exampleDatabase;
  dataSource: ExampleDataSource | null;

  @ViewChild('filter') filter: ElementRef;

  constructor(private childrenService: ChildrenService) {

  }

  ngAfterViewInit() {
    this.sub = this.childrenService.getChildHistory().subscribe(
      (res) => {
        this.children = [];
        res.forEach(el => {
          this.children.push(el);
          this.names.push(el.name);
          this.ids.push(el.id);
        });
        this.exampleDatabase = new HistoryDatabase(this.children);
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
