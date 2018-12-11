import * as mongoose from 'mongoose';

const matchNoteSectionSchema = new mongoose.Schema({
  matchI: String,
  userId: String,
  sortOrder: Number, //not used yet.
  subtext: String,
  title: String,
  type: String,
});

const MatchNoteSection = mongoose.model('MatchNoteSection', matchNoteSectionSchema);

export default MatchNoteSection;
