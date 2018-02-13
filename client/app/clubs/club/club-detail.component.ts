import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CatService } from '../../services/cat.service';
import { ResurseService } from '../../services/resurse.service';
import { ClubService } from '../../services/club.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { Cat } from '../../shared/models/cat.model';

@Component({
  selector: 'club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css']
})
export class ClubComponent implements OnInit {

  cat = new Cat();
  cats: Cat[] = [];
  isLoading = true;
  isEditing = false;
  resurses: any;
  f: any;
  team : any;

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
    this.route.params.subscribe(params => {
      this.getItem(params['id']);
    });
   
  }

  getItem(id) {
    this.clubsService.getClub(id).subscribe(
      data => {
        this.team = data;
      }
     );
  }

}
