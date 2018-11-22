import { Character } from './character.model';

export class TierListSection {
  _id?: string;
  title?: String;
  subtext?: String;
  sortOrder?: number;
  tierListId: String;
  characters?: Character[];
}
