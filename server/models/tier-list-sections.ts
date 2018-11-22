import * as mongoose from 'mongoose';

const tierListSectionSchema = new mongoose.Schema({
  title: String,
  subtext: String,
  type: String,
  tierListId: String,
  userId: String,
  characters: [],
});

const TierListSections = mongoose.model('TierListSections', tierListSectionSchema);

export default TierListSections;
