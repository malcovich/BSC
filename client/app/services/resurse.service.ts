import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ResurseService {

  constructor(private http: HttpClient) { }

  getResurse(): Observable<any> {
    return this.http.get<any>('/api/getresurse');
  }
  getResurseWithIndividualResults(): Observable<any> {
    return this.http.get<any>('/api/getindividual');
  }

  getResurses(): Observable<any> {
    return this.http.get<any>('/api/listresurses');
  }
  getItemResurses(id): Observable<number> {
    return this.http.get<number>(`/api/listresurses/${id}`);
  }
  getSameItems(obj): Observable<any> {
    return this.http.post<any>('/api/sameItems', obj);
  }

  getFavoriteItems(): Observable<any> {
    return this.http.get<any>('/api/getFavoriteItems');
  }

  addClubs(obj): Observable<any> {
    return this.http.post<any>('/api/addClubs', obj);
  }

  getClubsInfo(obj): Observable<any> {
    return this.http.post<any>('/api/getClubsInfo', obj);
  }
  mapResurses(): Observable<any> {
    return this.http.get<any>('/api/mapResurses');
  }
  addSimpleNames(obj): Observable<any> {
    return this.http.post<any>('/api/addSimpleNames',obj);
  }
  saveResult(obj): Observable<any> {
    return this.http.post<any>('/api/saveResult',obj);
  }
  addToFavorite(obj): Observable<any> {
    return this.http.post<any>('/api/addToFavorite',obj);
  }
}
