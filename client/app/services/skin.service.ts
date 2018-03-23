import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class SkinsService {
  constructor(private http: HttpClient) { }

  getChallenges(obj): Observable<any> {
    return this.http.post<any>('/api/getChallenges', obj);
  }
  saveSkin(obj): Observable<any> {
    return this.http.post<any>('/api/saveSkin', obj);
  }
  getSkin(obj): Observable<any> {
    return this.http.post<any>('/api/getSkin', obj);
  }
  getChallenge(id): Observable<any> {
    return this.http.get<any>(`/api/challenge/${id}`);
  }
}
