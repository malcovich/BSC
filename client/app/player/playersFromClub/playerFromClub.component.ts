import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ClubService } from '../../services/club.service';

@Component({
  selector: 'playerFromClub',
  templateUrl: './playerFromClub.component.html',
  styleUrls: ['./playerFromClub.component.scss']
})
export class PlayerFromClubComponent implements OnInit {
  isLoading = true;
  isEditing = false;
  players: any[];

  constructor(
    private clubsService: ClubService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getItem(params['id']);
    });
  }

  getItem(id) {
    this.clubsService.getPlayersForClub({ 'club': id }).subscribe(
      data => {
        this.players = data;
      }
    );
  }
}
