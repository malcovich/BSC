import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { ListResursesComponent } from './listResurses/listResurses.component';
import { ResurseComponent } from './resurse/resurse.component';
import { ClubComponent } from './clubs/club/club-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ClubsListComponent } from './clubs/list/list.component';
import { TeamComponent } from './team/team.component';
import { ChallengesListComponent } from './challenges/list/list.component';
import { ChallengeComponent } from './challenges/challenge/challenge.component';

//admin
import { AdminListPlayersComponent } from './admin/players/list/list.component';
import { AdminAddPlayerComponent } from './admin/players/add/add.component';
import { AdminAddMatchComponent } from './admin/match/add/add.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'cats', component: CatsComponent },
  { path: 'getresurses', component: GetResursesComponent },
  { path: 'listresurses/:id', component: ResurseComponent },
  { path: 'listresurses', component: ListResursesComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin], 
    children: [
      { path: 'players/list', component: AdminListPlayersComponent },
      { path: 'players/add', component: AdminAddPlayerComponent },
      { path: 'matches/list', component: AdminAddMatchComponent },
      { path: 'matches/add', component: AdminAddMatchComponent }
    ]
  },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'favorites', component: FavoritesComponent },
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
