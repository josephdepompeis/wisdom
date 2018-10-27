import * as mongoose from 'mongoose';

const opponentNotesSchema = new mongoose.Schema({
  opponentId: String,
  body: String,
});

const OpponentNotes = mongoose.model('OpponentNotes', opponentNotesSchema);

export default OpponentNotes;
