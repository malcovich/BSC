import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CatService } from '../services/cat.service';
import { ResurseService } from '../services/resurse.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Cat } from '../shared/models/cat.model';

@Component({
  selector: 'app-resurse',
  templateUrl: './resurse.component.html',
  styleUrls: ['./resurse.component.css']
})
export class ResurseComponent implements OnInit {

  cat = new Cat();
  cats: Cat[] = [];
  isLoading = true;
  isEditing = false;
  match: any;
  sameRes: any;

  addCatForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private catService: CatService,
              private resurseService: ResurseService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(123,params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.getItem(params['id']);
    });
   
  }
  getSameItems(obj){
    this.resurseService.getSameItems(obj).subscribe(
      res => this.sameRes = res
    );
  }

  getItem(id) {
    this.resurseService.getItemResurses(id).subscribe(
      data => {
        this.match = data;
        this.getSameItems({'team1':  this.match.team1,'team2': this.match.team2})
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCat() {
    this.catService.addCat(this.addCatForm.value).subscribe(
      res => {
        this.cats.push(res);
        this.addCatForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(cat: Cat) {
    this.isEditing = true;
    this.cat = cat;
  }

  cancelEditing() {
    this.isEditing = false;
    this.cat = new Cat();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
  }

  editCat(cat: Cat) {
    this.catService.editCat(cat).subscribe(
      () => {
        this.isEditing = false;
        this.cat = cat;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCat(cat: Cat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.catService.deleteCat(cat).subscribe(
        () => {
          const pos = this.cats.map(elem => elem._id).indexOf(cat._id);
          this.cats.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
