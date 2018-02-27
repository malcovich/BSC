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

}
