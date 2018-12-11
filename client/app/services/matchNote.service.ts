import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../shared/models/match.model';
import { MatchNote } from '../shared/models/matchNote.model';
import { MatchNoteSection } from '../shared/models/match-note-section.model';

@Injectable()
export class MatchNoteService {

	constructor(private http: HttpClient) { }

	getMatchNotes(match: Match): Observable<MatchNote[]> {
		return this.http.get<MatchNote[]>(`/api/matchNotes/${match._id}`);
	}

	addMatchNote(matchNote: MatchNote): Observable<MatchNote> {
		return this.http.post<MatchNote>('/api/matchNote', matchNote);
	}

	deleteMatchNote(matchNote: MatchNote): Observable<any> {
		return this.http.delete(`/api/matchNote/${matchNote._id}`, { responseType: 'text' });
	}

	editMatchNote(matchNote: MatchNote): Observable<any> {
		return this.http.put(`/api/matchNote/${matchNote._id}`, matchNote, { responseType: 'text' });
	}


	//match note sections
	getMatchNoteSections(match: Match): Observable<MatchNoteSection[]> {
		return this.http.get<MatchNoteSection[]>(`/api/matchNoteSections/${match._id}`);
	}

	addMatchNoteSection(matchNote: MatchNote): Observable<MatchNote> {
		return this.http.post<MatchNote>('/api/matchNote', matchNote);
	}





}
