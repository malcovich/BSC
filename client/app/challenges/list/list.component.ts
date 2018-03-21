import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CatService } from '../../services/cat.service';
import { ChallengesService } from '../../services/challenges.service';
import { ClubService } from '../../services/club.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { Cat } from '../../shared/models/cat.model';

@Component({
  selector: 'challenges-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ChallengesListComponent implements OnInit {

  cat = new Cat();
  cats: Cat[] = [];
  isLoading = true;
  isEditing = false;
  resurses: any;
  list: any;
  f: any;
  team : any;

  addCatForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(
              private ChallengesService: ChallengesService,
              private clubsService: ClubService,
              private route: ActivatedRoute,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getChallenges();
    });
   
  }

  getChallenges() {
    this.ChallengesService.getChallenges({}).subscribe(
      data => {
        this.list = data;
        console.log(this.list)
      }
     );
  }

}
