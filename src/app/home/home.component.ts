import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChildrenService } from '../shared/services/children.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public navLinks = ['/list', '/history'];
  public tabLinks = [
    {label: 'Список пользователей', link: '/list'},
    {label: 'История', link: '/history'},
  ];
  public myDate = new Date();

  public addForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    hours: new FormControl(''),
    minutes: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required)
  });


  constructor(private childrenService: ChildrenService) {

  }

  addChild(form) {
    this.childrenService.addChildInList(form.value);
    console.log(form);
    if (form.valid) {
      form.reset();
    }
  }


  ngOnInit() {
  }

}

