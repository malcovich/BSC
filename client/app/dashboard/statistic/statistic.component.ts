import { Component, OnInit, Pipe, PipeTransform, Input} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CatService } from '../../services/cat.service';
import { ResurseService } from '../../services/resurse.service';
import { ClubService } from '../../services/club.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  @Input() resurses: any;
  @Input() resurse: any;
  listResurses: any;
  withResults: any;
  withResultsFalse: any;
  constructor(
              private resurseService: ResurseService,
              private clubsService: ClubService,
              private route: ActivatedRoute,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.listResurses = this.resurses.filter(item =>{
      return item.resurse == this.resurse;
    });
    console.log(this.listResurses)
    this.withResults =  this.resurses.filter(item =>{
      return item.individualPredition == true && item.resurse == this.resurse;
    })
    this.withResultsFalse =  this.resurses.filter(item =>{
      return item.individualPredition == false && item.resurse == this.resurse;
    });
    console.log('Statisctics', this.resurses)
  }

}
