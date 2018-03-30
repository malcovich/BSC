import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { CatService } from './services/cat.service';
import { UserService } from './services/user.service';
import { ResurseService } from './services/resurse.service';
import { AuthService } from './services/auth.service';
import { ClubService } from './services/club.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GetResursesComponent } from './getResurses/getResurses.component';
import { ListResursesComponent } from './listResurses/listResurses.component';
import { ResurseComponent } from './resurse/resurse.component';
import { ClubComponent } from './clubs/club/club-detail.component';
import { PagerService } from './services/pager.service';
import { ClubsListComponent } from './clubs/list/list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticComponent } from './dashboard/statistic/statistic.component';
import { ChallengesService } from './services/challenges.service';
import { SkinsService } from './services/skin.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { D3graphComponent } from './d3graph/d3graph.component';

//admin
import { AdminListPlayersComponent } from './admin/players/list/list.component';
import { AdminAddPlayerComponent } from './admin/players/add/add.component';
import { AdminAddMatchComponent } from './admin/match/add/add.component';
import { AdminListMatchesComponent } from './admin/match/list/list.component';


import { TeamComponent } from './team/team.component';
import { ChallengeComponent } from './challenges/challenge/challenge.component';
import { ChallengesListComponent } from './challenges/list/list.component';
import { AlertModule, BsDropdownModule,TabsModule  } from 'ngx-bootstrap';


import { D3Service } from 'd3-ng2-service'; //

@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    GetResursesComponent,
    ListResursesComponent,
    ResurseComponent,
    ClubComponent,
    DashboardComponent,
    StatisticComponent,
    FavoritesComponent,
    ClubsListComponent,
    D3graphComponent,
    TeamComponent,
    ChallengesListComponent,
    ChallengeComponent,
    AdminListPlayersComponent,
    AdminAddPlayerComponent,
    AdminAddMatchComponent,
    AdminListMatchesComponent
  ],
  imports: [
    RoutingModule,
    SharedModule,
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CatService,
    UserService,
    ResurseService,
    ClubService,
    PagerService,
    ChallengesService,
    D3Service,
    SkinsService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
