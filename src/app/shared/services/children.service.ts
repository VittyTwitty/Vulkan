import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Child } from '../model/child.model';

@Injectable()
export class ChildrenService {
  public children: any[] = [];
  items: FirebaseListObservable<any[]> = null;


  constructor(private db: AngularFireDatabase) {
  }

  getItemsList() {
    this.items = this.db.list('/children');
    return this.items.map(
      (data) => {
        data.forEach(el => {
          const currentChild = new Child(el);
          this.children.push(currentChild);
          console.log(this.children);
        });
        return this.children;
      }
    );

  }

}
