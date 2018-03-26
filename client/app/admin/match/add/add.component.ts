import { Component, OnInit, Pipe, PipeTransform, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CatService } from '../../../services/cat.service';
import { ResurseService } from '../../../services/resurse.service';
import { ClubService } from '../../../services/club.service';
import { PagerService } from '../../../services/pager.service';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { Cat } from '../../../shared/models/cat.model';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'add-match',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AdminAddMatchComponent implements OnInit {
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
  selectedClub1: any = {'name':"Всі клуби", val: 'all'};
  selectedClub2: any = {'name':"Всі клуби", val: 'all'};
  selectedPosition: any = "Все позиции";
  listPositions: any = [{name :'Все позиции', letter :'All'}, {name :'Вратари' , letter :'G'},{name : 'Защитники', letter :"D"}, {name :"Полузащитники", letter : "M"}, {name :"Нападающие", letter : "F"}];
  pager: any = {};
  pagedItems: any[];

  addCatForm: FormGroup;
  team1 = new FormControl('');
  team2 = new FormControl('');
  round = new FormControl('');
  date = new FormControl('');
  result = new FormControl('');
 
  constructor(
              private resurseService: ResurseService,
              private clubsService: ClubService,
              private pagerService: PagerService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
   
    this.getListOfClubs();
    this.addCatForm = this.formBuilder.group({
      team1: this.team1,
      team2: this.team2,
      round: this.round,
      date: this.date,
      result: this.result,
    });
  }

  getAllPlayers() {
    this.clubsService.getAllPlayers().subscribe(
      data =>{
        this.players = data;
        this.copyPlayers = data;
        this.setPage(1);
      }
    )
  }

  addCat() {
    console.log(this.selectedClub1.val)
    this.addCatForm.controls['team1'].setValue(this.selectedClub1.val);
    this.addCatForm.controls['team2'].setValue(this.selectedClub2.val);
    console.log(this.addCatForm.value)
    this.clubsService.addMatch(this.addCatForm.value).subscribe(
      res => {
        this.cats.push(res);
        this.addCatForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }
  selectClub1(club){
    this.selectedClub1.name = club.ukrName;
    this.selectedClub1.val = club._id;
  }
  selectClub2(club){
    this.selectedClub2.name = club.ukrName;
    this.selectedClub2.val = club._id;
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
    this.selectedClub1.name = club.ukrName;
    this.selectedClub1.val = club._id;
    if(this.selectedPosition.name == "Всі клуби"){
      this.players = this.copyPlayers;
    }else{
      this.players = this.copyPlayers.filter((item)=>{
        if(item.club._id == club._id) return item;
      });
    }
  }

  getListOfClubs() {
    this.clubsService.getAllClubsFromLeague({'league': '5a953a92e144536463b60b2e'}).subscribe(
      data => {
        this.clubs = data;
        this.getAllPlayers();
      }
     );
  }
 
}
