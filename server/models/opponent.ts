import * as mongoose from 'mongoose';

const opponentSchema = new mongoose.Schema({
  name: String,
  userId: String,
});

const Opponent = mongoose.model('Opponent', opponentSchema);

export default Opponent;
