import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CatService } from '../services/cat.service';
import { ResurseService } from '../services/resurse.service';
import { ClubService } from '../services/club.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Cat } from '../shared/models/cat.model';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cat = new Cat();
  cats: Cat[] = [];
  isLoading = true;
  isEditing = false;
  resurses: any;
  f: any;
  list : any;
  listT: any;
  listF: any;
  listB: any;
  listA: any;
  resurse: any;
  listRES: any;

  addCatForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(
              private resurseService: ResurseService,
              private clubsService: ClubService,
              private route: ActivatedRoute,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getItems();
    this.listRES = ['zulubet', 'statarea', 'Forebet', 'betstudy']
    this.resurse = "zulubet";
  }

  getItems() {
    this.resurseService.getResurseWithIndividualResults().subscribe(
      data => {
        this.list = data;

        this.listT = this.list.filter(item => {
          return  item.resurse == 'statarea' && item.propability1 > 60;
        })

        this.listA = this.list.filter(item => {
          return  item.resurse == 'Forebet' && item.propability1 > 50;
        })
         this.listB = this.list.filter(item => {
           var v = 0;
           if(item.resurse == 'betstudy'){
            v = item.propability1.charAt(1) + item.propability1.charAt(2)
          }
          return  item.resurse == 'betstudy' && v > 50;
        }) 

        this.listF = data.filter(item => {
          var a = 0  
          if(item.resurse == 'zulubet'){
            a = item.propability1.charAt(3) + item.propability1.charAt(4)
          }
          return item.resurse == 'zulubet' && a> 50;
        })
      }
    );
  }

}
