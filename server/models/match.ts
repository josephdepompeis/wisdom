import * as mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  name: String,
  playingAs: String,
  playingAgainst: String,
  userId: String,
});

const Match = mongoose.model('Match', matchSchema);

export default Match;
