import { Character } from './character.model';

export class TierListSection {
  _id?: string;
  title?: String;
  subtext?: String;
  sortOrder?: String;
  tierListId: String;
  characters?: Character[];
}
