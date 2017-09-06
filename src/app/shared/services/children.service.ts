import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Child } from '../model/child.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChildrenService {
  public children: any[] = [];
  public childrenHistory: any[] = [];
  items: FirebaseListObservable<any[]> = null;
  history: FirebaseListObservable<any[]> = null;


  constructor(private db: AngularFireDatabase) {
    this.items = this.db.list('/children');
    this.history = this.db.list('/history_visitors');
  }

  public getItemsList() {
    return this.items.map(
      (data) => {
        this.children = [];
        data.forEach(el => {
          const currentChild = new Child(el);
          currentChild.id = el.$key;
          this.children.push(currentChild);
          console.log(currentChild);
        });
        return this.children;
      }
    );
  }

  public addChildInList(data) {
    this.items.push(data);
  }

  public deleteChild(key) {
    this.items.remove(key);
  }

  public addChildToHistory(deleted_item: Child) {
    const promise = this.history.push(deleted_item);
    promise.then((_) =>
      // console.log(deleted_item.id)
      this.deleteChild(deleted_item.id)
    );
  }

  public getChildHistory() {
    return this.history.map(
      (data) => {
        this.childrenHistory = [];
        data.forEach(el => {
          const currentChild = new Child(el);
          currentChild.id = el.$key;
          this.childrenHistory.push(currentChild);
          console.log(currentChild);
        });
        return this.childrenHistory;
      }
    );
  }

}
