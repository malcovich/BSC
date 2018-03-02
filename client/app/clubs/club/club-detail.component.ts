import { Component, OnInit, Pipe, PipeTransform, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('chart') elementView: ElementRef;
  cat = new Cat();
  cats: Cat[] = [];
  isLoading = true;
  isEditing = false;
  resurses: any;
  f: any;
  team : any;
  matches: any;
  statistic: any;
  data: any;
  width: any;
  

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
    this.data = [
      {name : 'A', yVal : 1},
      {name : 'B', yVal : 4},
      {name : 'C', yVal : 2},
      {name : 'D', yVal : 3}
   ];
    this.statistic = {};
    this.route.params.subscribe(params => {
      this.getItem(params['id']);
      this.getMatchesWithClub(params['id']);
    });
   
  }

  ngAfterViewInit() {
    this.width = this.elementView.nativeElement.clientWidth;
    console.log(this.elementView.nativeElement.clientWidth)
  }

  getItem(id) {
    this.clubsService.getClub(id).subscribe(
      data => {
        this.team = data;
        this.team.image = "assets/"+this.team.name.split(' ')[0] +".png"; 
        this.team.imageBig = "assets/"+this.team.name.split(' ')[0] +"_big.jpg"; 
        this.team.imageAbstr = "assets/"+this.team.name.split(' ')[0] +"_abstr.png"; 
        this.team.imageAbstr1 = "assets/"+this.team.name.split(' ')[0] +"_abstr1.png"; 
      }
     );
  }

  getMatchesWithClub(id) {
    this.clubsService.getMatchesWithClub({club: id}).subscribe(
      data => {
        this.matches = data;
        this.calculateTotalGoals(id);
      }
    );
  }

  calculateTotalGoals(id) {
    this.statistic.totalGoals = 0;
    this.statistic.omittedGoals = 0;
    this.matches.forEach(match => {
      var result = match.result.split(':');
      if(match.team1._id == id) {
        this.statistic.totalGoals += +result[0];
        this.statistic.omittedGoals += +result[1];  
      }else {
        this.statistic.totalGoals += +result[1];
        this.statistic.omittedGoals += +result[0];  
      }
    });
    
  }

}
