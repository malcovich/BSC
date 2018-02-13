import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ClubService {

  constructor(private http: HttpClient) { }

  getClub(id): Observable<any> {
    return this.http.get<any>(`/api/clubs/${id}`);
  }
}
