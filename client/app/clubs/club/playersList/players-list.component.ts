import { Component, OnInit, Pipe, PipeTransform, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PagerService } from '../../../services/pager.service';
import { ClubService } from '../../../services/club.service';
import { ToastComponent } from '../../../shared/toast/toast.component';

@Component({
  selector: 'players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  @ViewChild('chart') elementView: ElementRef;
  isLoading = true;
  isEditing = false;
  f: any;
  team: any;
  matches: any;
  statistic: any;
  data: any;
  width: any;
  players: any;
  pager: any = {};
  pagedItems: any[];
  lastestMatch: any;
  activeTab: string = "match";
  showScored: boolean = false;

  constructor(
    private clubsService: ClubService,
    private route: ActivatedRoute,
    private pagerService: PagerService,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.statistic = {};
    this.route.parent.params.subscribe(params => {
      this.getItem(params['id']);
      this.getMatchesWithClub(params['id']);
      this.getPlayersForClub(params['id']);
    });
  }

  getItem(id) {
    this.clubsService.getClub(id).subscribe(
      data => {
        this.team = data;
        this.team.image = "assets/" + this.team.name.split(' ')[0] + ".png";
        this.team.imageBig = "assets/" + this.team.name.split(' ')[0] + "_big.jpg";
      }
    );
  }
  getPlayersForClub(id) {
    this.clubsService.getPlayersForClub({ 'club': id }).subscribe(
      data => {
        this.players = data;
        this.setPage(1);
        this.getPersentOfLegioners();
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

  showHideScored() {
    this.showScored = !this.showScored;
  }

  getMatchesWithClub(id) {
    this.clubsService.getMatchesWithClub({ club: id }).subscribe(
      data => {
        this.matches = data;
        this.calculateTotalGoals(id);
        this.matches = this.data.sort((a: any, b: any) => {
          let aT = new Date(a.date);
          let bT = new Date(b.date);
          return aT.getTime() - bT.getTime();
        });
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
        team: '',
        date: ''
      };
      var result = match.result.split(':');
      if (match.team1._id == id) {
        this.statistic.totalGoals += +result[0];
        this.statistic.omittedGoals += +result[1];
        obj.scored = +result[0];
        obj.team = match.team2.name;
        obj.date = match.date;
      } else {
        this.statistic.totalGoals += +result[1];
        this.statistic.omittedGoals += +result[0];
        obj.scored = +result[1];
        obj.team = match.team1.name;
        obj.date = match.date;
      }
      this.createScoredDataForChart(obj);
    });
  }

  getPersentOfLegioners() {
    this.statistic.legioners = [];
    let persentLegioner = this.players.filter(item => {
      if (item.country != "UKR") {
        this.statistic.legioners.push(item);
        return item
      };
    }).length / this.players.length * 100;
    this.statistic.persentLegioner = Math.round(persentLegioner).toFixed(0);
  }

  createScoredDataForChart(item) {
    this.data.push(item);
  }

  setActive(tab) {
    this.activeTab = tab;
  }
}
