import { Character } from './character.model';

export class TierListSection {
  characters?: Character[];
  _id?: string;
  sortOrder?: number;
  subtext?: String;
  tierListId: String;
  title?: String;
  type?: String;
  userId?: String;
}
