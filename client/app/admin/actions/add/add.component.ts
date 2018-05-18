import { Component, OnInit, Pipe, PipeTransform, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CatService } from '../../../services/cat.service';
import { ClubService } from '../../../services/club.service';
import { ActionService } from '../../../services/action.service';
import { PagerService } from '../../../services/pager.service';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'team',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AdminAddActionsComponent implements OnInit {

  team : any;
  matches: any;
  data: any;
  players: any;
  clubs: any;
  playersIds: any =[];
  copyPlayers : any;
  pager: any = {};
  pagedItems: any[];
  selectedClub : any = {};

  constructor(
              private clubsService: ClubService,
              private pagerService: PagerService,
              private route: ActivatedRoute,
              private actionService: ActionService,
              private auth: AuthService,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getListOfClubs();
  }
  onSubmit(form){
    form.controls['match'] = this.selectedClub.name;
    console.log(form);
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

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.players.length, page);

    // get current page of items
    this.pagedItems = this.players.slice(this.pager.startIndex, this.pager.endIndex + 1);
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
