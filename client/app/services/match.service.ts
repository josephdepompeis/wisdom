import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';

import { Match } from '../shared/models/match.model';

@Injectable()
export class MatchService {

  constructor(private http: HttpClient) { }

  getMatches(user: User): Observable<Match[]> {
    return this.http.get<Match[]>(`/api/matches/${user._id}`);
  }

  countMatches(): Observable<number> {
    return this.http.get<number>('/api/matches/count');
  }

  addMatch(match: Match): Observable<Match> {
    return this.http.post<Match>('/api/match', match);
  }

  getMatch(match: Match): Observable<Match> {
    return this.http.get<Match>(`/api/match/${match._id}`);
  }

  editMatch(match: Match): Observable<any> {
    return this.http.put(`/api/match/${match._id}`, match, { responseType: 'text' });
  }

  deleteMatch(match: Match): Observable<any> {
    return this.http.delete(`/api/opponent/${match._id}`, { responseType: 'text' });
  }

}
