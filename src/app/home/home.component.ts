import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChildrenService } from '../shared/services/children.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sub: Subscription;
  public addForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    countTime: new FormControl('', Validators.required)
  });


  constructor(private childrenService: ChildrenService) {

  }

  ngOnInit() {
    // this.sub = this.childrenService.getItemsList().subscribe(res => {
    //   console.log(res);
    // });
  }

}

