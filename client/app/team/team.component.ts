import { Component, OnInit, Pipe, PipeTransform, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CatService } from '../services/cat.service';
import { ResurseService } from '../services/resurse.service';
import { ClubService } from '../services/club.service';
import { PagerService } from '../services/pager.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Cat } from '../shared/models/cat.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @ViewChild('chart') elementView: ElementRef;
  cat = new Cat();
  cats: Cat[] = [];
  isLoading = true;
  isEditing = false;
  team : any;
  matches: any;
  data: any;
  players: any;
  clubs: any;
  activeTab: string = "match";
  showScored: boolean = false;
  playersIds: any =[];
  copyPlayers : any;
  selectedClub: any = "Всі клуби"
  selectedPosition: any = "Все позиции";
  listPositions: any = [{name :'Все позиции', letter :'All'}, {name :'Вратари' , letter :'G'},{name : 'Защитники', letter :"D"}, {name :"Полузащитники", letter : "M"}, {name :"Нападающие", letter : "F"}];
  pager: any = {};
  pagedItems: any[];
  constructor(
              private resurseService: ResurseService,
              private clubsService: ClubService,
              private pagerService: PagerService,
              private route: ActivatedRoute,
              private auth: AuthService,
              public toast: ToastComponent) { }

  ngOnInit() {
   
    this.getListOfClubs();
    
  }

  getAllPlayers() {
    this.clubsService.getAllPlayers().subscribe(
      data =>{
        data.forEach(player => {
          if(this.team.players.filter(item=>{
            if(item._id == player._id) {
              return item
            }
          }).length> 0){
            player.inTeam = true;
          }
        });
        this.players = data;
        this.copyPlayers = data;
        this.setPage(1);
      }
    )
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.players.length, page);

    // get current page of items
    this.pagedItems = this.players.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

  addPlayerToTeam(player) {
    let forwards = this.team.players.filter(item=>{if (item.position == 'F') return item});
    let middledefenders = this.team.players.filter(item=>{if (item.position == 'M') return item});
    let defenders = this.team.players.filter(item=>{if (item.position == 'D') return item});
    let goalkeepers = this.team.players.filter(item=>{if (item.position == 'G') return item});
    if (this.team.players.length >=15 ){
      this.toast.setMessage('item edited successfully.', 'danger');
    }else if ((player.position == 'F') && forwards.length >=3){
      this.toast.setMessage('item edited successfully.', 'danger');
    }else {
      this.team.players.push(player);
      this.playersIds.push(player._id);
      player.inTeam = true;
    }
  }

  filterByPosition(position) {
    this.selectedPosition = position.name;
    if(this.selectedPosition == "Все позиции"){
      this.players = this.copyPlayers;
    }else{
      this.players = this.copyPlayers.filter((item)=>{
        if(item.position == position.letter) return item;
      });
    }
    this.setPage(1);
  }

  filterByClub(club) {
    this.selectedClub = club.ukrName;
    if(this.selectedPosition == "Всі клуби"){
      this.players = this.copyPlayers;
    }else{
      this.players = this.copyPlayers.filter((item)=>{
        if(item.club._id == club._id) return item;
      });
    }
  }

  addTeam() {
    this.team.user = this.auth.currentUser._id;
    this.clubsService.addTeam(this.team).subscribe(res=>{
      console.log(res);
    });
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
      this.getAllPlayers();
    });
  }

  getListOfClubs() {
    this.clubsService.getAllClubsFromLeague({'league': '5a953a92e144536463b60b2e'}).subscribe(
      data => {
        this.clubs = data;
        this.getTeam();
      }
     );
  }
 
}
