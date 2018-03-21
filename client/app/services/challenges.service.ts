import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ChallengesService {
  constructor(private http: HttpClient) { }

  getChallenges(obj): Observable<any> {
    return this.http.post<any>('/api/getChallenges', obj);
  }
}
