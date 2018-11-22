import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TierList } from '../shared/models/tier-list.model';
import { Character } from '../shared/models/character.model';
import { TierListSection } from '../shared/models/tier-list-section.model';

@Injectable()
export class TierListService {

	constructor(private http: HttpClient) { }

	// getCharacterTierList(character: Character): Observable<TierList> {
	// 	console.log(character);
	// 	return this.http.get<TierList>(`/api/character/tierList/${character._id}`);
	// }

	getCharacterTierList(character: Character): Observable<TierList> {
		console.log("character");
		return this.http.get<TierList>(`/api/character/tierList/${character._id}`);
	}


	getTierListSectionsByTierId(tierList: TierList): Observable<TierListSection[]> {
		return this.http.get<TierListSection[]>(`/api/tierListSections/${tierList._id}`);
	}



	addTierList(tierList: TierList): Observable<TierList> {
		return this.http.post<TierList>('/api/tierList', tierList);
	}

	deleteTierList(tierList: TierList): Observable<any> {
		return this.http.delete(`/api/tierList/${tierList._id}`, { responseType: 'text' });
	}

	editTierList(tierList: TierList): Observable<any> {
		return this.http.put(`/api/tierList/${tierList._id}`, tierList, { responseType: 'text' });
	}
}
