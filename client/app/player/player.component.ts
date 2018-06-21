import { Component, OnInit, Pipe, PipeTransform, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ClubService } from '../services/club.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @ViewChild('chart') elementView: ElementRef;
  isLoading = true;
  isEditing = false;
  player: any;

  constructor(
    private clubsService: ClubService,
    private route: ActivatedRoute,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getItem(params['id']);
    });
  }

  getItem(id) {
    this.clubsService.getPlayerById({ 'id': id }).subscribe(
      data => {
        this.player = data;
        console.log( this.player, data)
        this.player.image = "assets/" + this.player.name.split(' ')[0] + ".png";
      }
    );
  }
}
