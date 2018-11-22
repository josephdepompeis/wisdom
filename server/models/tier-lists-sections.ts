import * as mongoose from 'mongoose';

const tierListSectionSchema = new mongoose.Schema({
  title: String,
  subtext: String,
  type: String,
  typeId: String,
  userId: String,
});

const TierListSections = mongoose.model('TierListSections', tierListSectionSchema);

export default TierListSections;
