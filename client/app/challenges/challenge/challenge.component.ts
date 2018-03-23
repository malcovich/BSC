import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CatService } from '../../services/cat.service';
import { ChallengesService } from '../../services/challenges.service';
import { ClubService } from '../../services/club.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { Cat } from '../../shared/models/cat.model';
import { AuthService } from '../../services/auth.service';
import { SkinsService } from '../../services/skin.service';

@Component({
  selector: 'challenge-details',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {

  cat = new Cat();
  cats: Cat[] = [];
  isLoading = true;
  isEditing = false;
  resurses: any;
  challenge: any;
  skin: any = {};
  f: any;
  clubs : any;
  team : any;

  addCatForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(
              private ChallengesService: ChallengesService,
              private clubsService: ClubService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private skinService: SkinsService,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getListOfClubs(params['id']);
      this.skin.players = [];
    });
   
  }

  getChallenge(id) {
    this.ChallengesService.getChallenge(id).subscribe(
      data => {
        this.challenge = data;
        this.challenge.matches.forEach(item=>{
          item.team1 = this.clubs.filter(club=> {if(club._id == item.team1) return club;})[0];
          item.team2 = this.clubs.filter(club=> {if(club._id == item.team2) return club;})[0];
        })
        this.getSkin();
      }
     );
  }

  getSkin() {
    this.skinService.getSkin({challenge: this.challenge._id, user: this.auth.currentUser._id}).subscribe(skin=>{
      if (skin.length == 0) {
        this.skin = {};
        this.skin.players = [];
      }else{
        this.skin = skin[0];
      }
    })
  }
  getTeam() {
    this.clubsService.getTeam({user: this.auth.currentUser._id}).subscribe(team=>{
      this.team = team;
      this.team.players = this.team.players.map(player =>{
        let club = this.clubs.filter(club =>{
          if (club._id == player.club){
            return club;
          }
        });
        player.club = club[0];
        return player;
      });
    });
  }

  getListOfClubs(id) {
    this.clubsService.getAllClubsFromLeague({'league': '5a953a92e144536463b60b2e'}).subscribe(
      data => {
        this.clubs = data;
        this.getChallenge(id);
        this.getTeam();
      }
     );
  }

  addPlayerToSkin(player) {
    if (this.validationPlayer(player)){
      this.skin.players.push(player);
    }else{
      this.toast.setMessage('item edited successfully.', 'danger');
    }
  }

  saveSkin() {
    this.skin.user = this.auth.currentUser._id;
    this.skin.challenge = this.challenge._id;
    this.skinService.saveSkin(this.skin).subscribe(data =>{
      console.log('save');
    })
  }

  validationPlayer(player) {
    if (this.skin.players.indexOf(player) != -1){
      return false;
    }
    let selectedPosition = player.position;
    let positionInSkin = this.skin.players.filter(player =>{ if(player.position == selectedPosition) return player}).length;
    if ((selectedPosition == 'M' ||  selectedPosition == 'D') && (positionInSkin < 4)) {
      return true;
    }
    if ((selectedPosition == 'F') && (positionInSkin < 2)) {
      return true;
    }
    if ((selectedPosition == 'G') && (positionInSkin < 1)) {
      return true;
    }
    else {
      return false;
    }
  }

}
