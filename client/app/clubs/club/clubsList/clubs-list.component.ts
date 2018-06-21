import { Component, OnInit, Pipe, PipeTransform, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PagerService } from '../../../services/pager.service';
import { ClubService } from '../../../services/club.service';
import { ToastComponent } from '../../../shared/toast/toast.component';

@Component({
  selector: 'clubs-table-list',
  templateUrl: './clubs-list.component.html',
  styleUrls: ['./clubs-list.component.scss']
})
export class ClubsTableListComponent implements OnInit {
  @ViewChild('chart') elementView: ElementRef;
  isLoading = true;
  isEditing = false;
  clubsList : any[];

  constructor(
    private clubsService: ClubService,
    private route: ActivatedRoute,
    private pagerService: PagerService,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      const leagueId = '5a953a92e144536463b60b2e'; //need replace for real league id from club object
      this.getListClubs(leagueId);
    });
  }

  getListClubs(id) {
    this.clubsService.getAllClubsFromLeague({'league': id}).subscribe(
      data => {
        this.clubsList = data;
      }
    );
  }
}
