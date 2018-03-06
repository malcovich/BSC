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
  players: any;
  showScored: boolean = false;
  

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
    this.statistic = {};
    this.route.params.subscribe(params => {
      this.getItem(params['id']);
      this.getMatchesWithClub(params['id']);
      this.getPlayersForClub(params['id']);
    });
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
  getPlayersForClub(id) {
    console.log(id)
    this.clubsService.getPlayersForClub({'club': id}).subscribe(
      data =>{
        this.players = data;
        this.getPersentOfLegioners();
      }
    )
  }

  showHideScored(){
    this.showScored = !this.showScored;
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
    this.data = [];
   
    this.statistic.totalGoals = 0;
    this.statistic.omittedGoals = 0;
    this.matches.forEach(match => {
      let obj = {
        scored: 0,
        team : '',
        date: ''
      };
      var result = match.result.split(':');
      if(match.team1._id == id) {
        this.statistic.totalGoals += +result[0];
        this.statistic.omittedGoals += +result[1];  
        obj.scored = +result[0];
        obj.team = match.team2.name;
        obj.date = match.date;
      }else {
        this.statistic.totalGoals += +result[1];
        this.statistic.omittedGoals += +result[0];
        obj.scored = +result[1];
        obj.team = match.team1.name;
        obj.date = match.date;
      }
      this.createScoredDataForChart(obj);
    });
  }

  getPersentOfLegioners(){
    this.statistic.legioners = [];
    let persentLegioner = this.players.filter(item => {
      if (item.country != "UKR") {
        this.statistic.legioners.push(item); 
        return item
      };
    }).length / this.players.length * 100;
    this.statistic.persentLegioner =  Math.round(persentLegioner).toFixed(0);
    console.log(this.statistic.persentLegioner )
    
  }

  createScoredDataForChart(item){
    this.data.push(item);
  }
}
