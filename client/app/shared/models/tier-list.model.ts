import { Character } from './character.model';

export class TierList {
  _id?: string;
  title: String;
  subtext: String;
  characters: Character[]; //array of character-like items
  sortOrder: Number;
  // matchId: String;
  // body: String;
}
