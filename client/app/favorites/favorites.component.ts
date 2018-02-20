import { Component, OnInit, Pipe, PipeTransform } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { CatService } from "../services/cat.service";
import { ResurseService } from "../services/resurse.service";
import { ClubService } from "../services/club.service";
import { ToastComponent } from "../shared/toast/toast.component";
import { Cat } from "../shared/models/cat.model";

@Component({
  selector: "favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.css"]
})
export class FavoritesComponent implements OnInit {
  cat = new Cat();
  cats: Cat[] = [];
  isLoading = true;
  isEditing = false;
  resurses: any;
  f: any;
  list: any;
  listT: any;
  listF: any;
  listB: any;
  listA: any;
  resurse: any;
  listRES: any;

  addCatForm: FormGroup;
  name = new FormControl("", Validators.required);
  age = new FormControl("", Validators.required);
  weight = new FormControl("", Validators.required);

  constructor(
    private resurseService: ResurseService,
    private clubsService: ClubService,
    private route: ActivatedRoute,
    public toast: ToastComponent
  ) {}

  ngOnInit() {
    this.getItems();
    this.listRES = ["zulubet", "statarea", "Forebet", "betstudy"];
    this.resurse = "zulubet";
  }

  getItems() {
    this.resurseService.getFavoriteItems().subscribe(data => {
      this.list = data;
    });
  }
}
