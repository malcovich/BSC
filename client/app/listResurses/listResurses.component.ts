import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CatService } from '../services/cat.service';
import { ResurseService } from '../services/resurse.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Cat } from '../shared/models/cat.model';
@Component({
  selector: 'app-list-resurses',
  templateUrl: './listResurses.component.html',
  styleUrls: ['./listResurses.component.css']
})
export class ListResursesComponent implements OnInit {

  cat = new Cat();
  cats: Cat[] = [];
  isLoading = true;
  isEditing = false;
  resurses: any;
  f: any

  addCatForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private catService: CatService,
              private resurseService: ResurseService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getResurses();
    this.f = "";
   
  }

  mapResurses () {
    console.log(123)
    this.resurseService.mapResurses().subscribe();
  }

  getResurses() {
    this.resurseService.getResurses().subscribe(
      data => {
        this.resurses = data;},
      error => console.log(error),
      () => this.isLoading = false
    );
  }

}
