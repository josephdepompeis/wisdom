import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';
import { Opponent } from '../shared/models/opponent.model';
import { OpponentNote } from '../shared/models/opponentNote.model';

@Injectable()
export class OpponentNoteService {

  constructor(private http: HttpClient) { }

  getOpponentNotes(opponent: Opponent): Observable<OpponentNote[]> {
    return this.http.get<OpponentNote[]>(`/api/opponentNotes/${opponent._id}`);
  }
  //
  // countOpponents(): Observable<number> {
  //   return this.http.get<number>('/api/opponents/count');
  // }

  addOpponentNote(oppenentNote: OpponentNote): Observable<OpponentNote> {
    return this.http.post<OpponentNote>('/api/opponentNote', oppenentNote);
  }
  //
  // getOpponent(opponent: Opponent): Observable<Opponent> {
  //   return this.http.get<Opponent>(`/api/opponent/${opponent._id}`);
  // }
  //
  // editOpponent(opponent: Opponent): Observable<any> {
  //   return this.http.put(`/api/opponent/${opponent._id}`, opponent, { responseType: 'text' });
  // }
  //
  // deleteOpponent(opponent: Opponent): Observable<any> {
  //   return this.http.delete(`/api/opponent/${opponent._id}`, { responseType: 'text' });
  // }

}
