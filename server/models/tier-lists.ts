import * as mongoose from 'mongoose';

const tierListSchema = new mongoose.Schema({
  title: String,
  subtext: String,
  type: String,
  typeId: String,
  userId: String,
  removedCharacters: Array,
});

const TierLists = mongoose.model('TierLists', tierListSchema);

export default TierLists;
