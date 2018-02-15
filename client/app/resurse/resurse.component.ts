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
  sameRes: {}; 
  arrayT: any[];
  team1: any;
  team2: any;
  propabilityObjs: any;
  result: any;

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
      this.getItem(params['id']);
    });
   
  }
  getSameItems(obj){
    this.arrayT = [];
    this.resurseService.getSameItems(obj).subscribe(
      res => {
        this.sameRes = res.same.map(item =>{
          var unifyPrediction = this.setUnifyPrediciton(item);
          this.arrayT.push(unifyPrediction);
          item.prediction = unifyPrediction;
          return item;
        });
        this.propabilityObjs = res.prop;
        this.getPrediction();
      }
    );
  }
  
  setToControllerR (result){
    this.result = result
  }

  saveResult(item){
    this.resurseService.saveResult({id: item._id, result : this.result, prediction: item.prediction, systemPredicion: this.match.prediction}).subscribe(date =>{
      item.resmatch = date.resmatch;
      item.systemPredicion = date.systemPredicion;
      item.individualPredition = date.individualPredition;
    })
  };

  getPrediction () {
    if ((this.arrayT.indexOf('12')> -1) || ((this.arrayT.indexOf('1') > -1) || (this.arrayT.indexOf('1X') > -1))
        && ((this.arrayT.indexOf('2') > -1) || (this.arrayT.indexOf('X2') > -1))){
      this.match.prediction ='NO PREDICTION';
    }else 
    if (this.arrayT.indexOf('1X') > -1){
      this.match.prediction = "1X";
    }else
    if (this.arrayT.indexOf('2') > -1 && ((this.arrayT.indexOf('X2') > -1) || (this.arrayT.indexOf('X') > -1))){
      this.match.prediction = "X2";
    }
    else
    if (this.arrayT.indexOf('1') > -1 && ((this.arrayT.indexOf('1X') > -1) || (this.arrayT.indexOf('X') > -1))){
      this.match.prediction = "1X";
    }else if (this.arrayT.indexOf('2') > -1) {
      this.match.prediction = "2";
    }else {
      this.match.prediction = "1";
    }
  }

  getItem(id) {
    this.resurseService.getItemResurses(id).subscribe(
      data => {
        this.match = data;
        this.getSameItems({'team1':  this.match.team1,'team2': this.match.team2, id : id, club: this.match.club})
        this.getClubsInfo({'team1':  this.match.team1,'team2': this.match.team2});
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getClubsInfo(obj){
    this.resurseService.getClubsInfo(obj).subscribe(
      data => {
        this.team1 = data.team1[0];
        this.team2 = data.team2[0];
      }
    );
  }

  canAddSimpleClubNames (team1, team2) {
    if (this.team1 && this.team2) {
      if(this.team1.name == team1 &&  this.team2.name == team2){
        return false;
      }
      if ((this.team1.name !== team1 && this.team1.simpleNames.indexOf(team1) == -1) || (this.team2.name !== team2 && this.team2.simpleNames.indexOf(team2) == -1)){
        return true;
      }
    }
    else{ 
      return false;
    }
  }

  saveSimpleNames (team1, team2){
    this.resurseService.addSimpleNames({simpleName1: team1, simpleName2 : team2, idTeam1: this.team1._id, idTeam2: this.team2._id}).subscribe(
      data => {
        this.team1 = data.team1;
        this.team2 = data.team2;
      }
    );
  }
  setUnifyPrediciton (item) {
    let predictions = ['1','2','X','02', '12','10','1X','X2'];
    if (item.prediction == 'Away Win '){
      return '2';
    };
    if (item.prediction == 'Away'){
      return '2';
    };
    if (item.prediction == 'Draw'){
      return 'X';
    };
    if (item.prediction == 'Home Win '){
      return '1';
    };
    if (item.prediction == 'Home'){
      return '1';
    };
    if (item.prediction == '02'){
      return 'X2';
    };
    if (item.prediction == '10'){
      return '1X';
    };
    if (((item.prediction == undefined) || (item.prediction == '')) && item.correctScore){
      console.log('item.prediction',item.prediction, item.correctScore )
      
      if(item.correctScore.indexOf('-') > -1) {
        let goals = item.correctScore.split('-');
        if(goals[0] > goals[1]) {
          return '1';
        }else if (goals[0] < goals[1]) {
          return '2';
        }else {
          return 'X';
        }
      }
      if(item.correctScore.indexOf(':') > -1)  {
        let goals = item.correctScore.split(':');
        if(goals[0] > goals[1]) {
          return '1';
        }else if (goals[0] < goals[1]) {
          return '2';
        }else {
          return 'X';
        }
      }
      
    }
    return item.prediction;

  }

  addClubs(obj) {
    this.resurseService.addClubs(obj).subscribe(
      res => {
        this.team1 = res.team1;
        this.team2 = res.team2;
      },  
      error => console.log(error)
    );
  }
}
