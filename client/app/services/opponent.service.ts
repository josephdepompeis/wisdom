import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';

import { Opponent } from '../shared/models/opponent.model';

@Injectable()
export class OpponentService {

  constructor(private http: HttpClient) { }

  getOpponents(user: User): Observable<Opponent[]> {
    return this.http.get<Opponent[]>(`/api/opponents/${user._id}`);
  }

  countOpponents(): Observable<number> {
    return this.http.get<number>('/api/opponents/count');
  }

  addOpponent(opponent: Opponent): Observable<Opponent> {
    return this.http.post<Opponent>('/api/opponent', opponent);
  }

  getOpponent(opponent: Opponent): Observable<Opponent> {
    return this.http.get<Opponent>(`/api/opponent/${opponent._id}`);
  }

  editOpponent(opponent: Opponent): Observable<any> {
    return this.http.put(`/api/opponent/${opponent._id}`, opponent, { responseType: 'text' });
  }

  deleteOpponent(opponent: Opponent): Observable<any> {
    return this.http.delete(`/api/opponent/${opponent._id}`, { responseType: 'text' });
  }

}
