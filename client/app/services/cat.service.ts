import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../shared/models/character.model';

@Injectable()
export class CharacterService {

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>('/api/cats');
  }

  countCharacters(): Observable<number> {
    return this.http.get<number>('/api/cats/count');
  }

  addCharacter(cat: Character): Observable<Character> {
    return this.http.post<Character>('/api/cat', cat);
  }

  getCharacter(cat: Character): Observable<Character> {
    return this.http.get<Character>(`/api/cat/${cat._id}`);
  }

  editCharacter(cat: Character): Observable<any> {
    return this.http.put(`/api/cat/${cat._id}`, cat, { responseType: 'text' });
  }

  deleteCharacter(cat: Character): Observable<any> {
    return this.http.delete(`/api/cat/${cat._id}`, { responseType: 'text' });
  }

}
