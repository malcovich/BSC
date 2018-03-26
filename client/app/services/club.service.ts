import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ClubService {

  constructor(private http: HttpClient) { }

  getClub(id): Observable<any> {
    return this.http.get<any>(`/api/clubs/${id}`);
  }
  getAllClubsFromLeague(obj): Observable<any> {
    return this.http.post<any>('/api/getAllClubsFromLeague', obj);
  }
  getMatchesWithClub(obj): Observable<any> {
    return this.http.post<any>('/api/getMatchesWithClub', obj);
  }
  getPlayersForClub(obj): Observable<any> {
    return this.http.post<any>('/api/getPlayersForClub', obj);
  }

  getAllPlayers(): Observable<any> {
    return this.http.get<any>('/api/getAllPlayers');
  }

  addTeam(obj): Observable<any> {
    return this.http.post<any>('/api/addTeam', obj);
  }

  getTeam(obj): Observable<any> {
    return this.http.post<any>('/api/getTeam', obj);
  }

  addPlayer(obj): Observable<any> {
    return this.http.post<any>('/api/addPlayer', obj);
  }

  addMatch(obj): Observable<any> {
    return this.http.post<any>('/api/addMatch', obj);
  }
}
