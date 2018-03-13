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
import { ClubsListComponent } from './clubs/list/list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticComponent } from './dashboard/statistic/statistic.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { D3graphComponent } from './d3graph/d3graph.component';
import { TeamComponent } from './team/team.component';
import { AlertModule, BsDropdownModule  } from 'ngx-bootstrap';


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
    TeamComponent
  ],
  imports: [
    RoutingModule,
    SharedModule,
    AlertModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CatService,
    UserService,
    ResurseService,
    ClubService,
    D3Service
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
