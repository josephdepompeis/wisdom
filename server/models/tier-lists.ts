import * as mongoose from 'mongoose';

const tierListSchema = new mongoose.Schema({
  title: String,
  subtext: String,
  characters: Array,
  sortOrder: Number,
});

const tierLists = mongoose.model('TierLists', tierListSchema);

export default tierLists;
