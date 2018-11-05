import * as mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Number,
  userId: String,
});

const Match = mongoose.model('Match', matchSchema);

export default Match;
