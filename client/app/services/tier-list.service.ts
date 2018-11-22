import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TierList } from '../shared/models/tier-list.model';
import { Character } from '../shared/models/character.model';
import { User } from '../shared/models/user.model';
import { TierListSection } from '../shared/models/tier-list-section.model';

@Injectable()
export class TierListService {

	constructor(private http: HttpClient) { }

	// getCharacterTierList(character: Character): Observable<TierList> {
	// 	console.log(character);
	// 	return this.http.get<TierList>(`/api/character/tierList/${character._id}`);
	// }



// /tierList/:userId/:typeId'
// return this.http.get<Match>(`/api/findMatch/${match.playingAs}/${match.playingAgainst}`);

	// this will not work.
	getCharacterTierList(user: User, character: Character): Observable<TierList> {
		console.log("user", user._id);
		console.log("character", character._id);
		return this.http.get<TierList>(`/api/tierList/${user._id}/${character._id}`);
	}

	addTierList(tierList: TierList): Observable<TierList> {
		return this.http.post<TierList>('/api/tierList', tierList);
	}

	// deleteTierList(tierList: TierList): Observable<any> {
	// 	return this.http.delete(`/api/tierList/${tierList._id}`, { responseType: 'text' });
	// }
	//
	// editTierList(tierList: TierList): Observable<any> {
	// 	return this.http.put(`/api/tierList/${tierList._id}`, tierList, { responseType: 'text' });
	// }

	getTierListSectionsByTierId(tierList: TierList): Observable<TierListSection[]> {
		return this.http.get<TierListSection[]>(`/api/tierListSections/${tierList._id}`);
	}

	addTierListSection(tierListSection: TierListSection): Observable<TierListSection> {
		return this.http.post<TierListSection>('/api/tierListSection', tierListSection);
	}


}
