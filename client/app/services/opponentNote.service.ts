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

	addOpponentNote(opponentNote: OpponentNote): Observable<OpponentNote> {
		return this.http.post<OpponentNote>('/api/opponentNote', opponentNote);
	}

	deleteOpponentNote(opponentNote: OpponentNote): Observable<any> {
		return this.http.delete(`/api/opponentNote/${opponentNote._id}`, { responseType: 'text' });
	}

	editOpponentNote(opponentNote: OpponentNote): Observable<any> {
		return this.http.put(`/api/opponentNote/${opponentNote._id}`, opponentNote, { responseType: 'text' });
	}
}
