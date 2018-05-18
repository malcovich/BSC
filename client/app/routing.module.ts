import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { ClubComponent } from './clubs/club/club-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClubsListComponent } from './clubs/list/list.component';
import { TeamComponent } from './team/team.component';
import { ChallengesListComponent } from './challenges/list/list.component';
import { ChallengeComponent } from './challenges/challenge/challenge.component';

//admin
import { AdminListPlayersComponent } from './admin/players/list/list.component';
import { AdminAddPlayerComponent } from './admin/players/add/add.component';
import { AdminAddMatchComponent } from './admin/match/add/add.component';
import { AdminListMatchesComponent } from './admin/match/list/list.component';
import { AdminAddActionsComponent } from './admin/actions/add/add.component';
import { AdminListActionsComponent } from './admin/actions/list/list.component';


const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin], 
    children: [
      { path: 'players/list', component: AdminListPlayersComponent },
      { path: 'players/add', component: AdminAddPlayerComponent },
      { path: 'matches/list', component: AdminListMatchesComponent },
      { path: 'matches/add', component: AdminAddMatchComponent },
      { path: 'actions/list', component: AdminListActionsComponent },
      { path: 'actions/add', component: AdminAddActionsComponent }
    ]
  },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clubs/:id', component: ClubComponent },
  { path: 'clubs', component: ClubsListComponent },
  { path: 'team', component: TeamComponent },
  { path: 'challenges', component: ChallengesListComponent},
  { path: 'challenges/:id', component: ChallengeComponent},
  { path: '**', redirectTo: '/notfound' },
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
