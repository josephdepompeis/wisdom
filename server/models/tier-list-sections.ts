import * as mongoose from 'mongoose';

const tierListSectionSchema = new mongoose.Schema({
  characters: [],
  sortOrder: Number,
  subtext: String,
  tierListId: String,
  title: String,
  type: String,
  userId: String,
});

const TierListSections = mongoose.model('TierListSections', tierListSectionSchema);

export default TierListSections;
