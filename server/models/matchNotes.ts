import * as mongoose from 'mongoose';

const matchNotesSchema = new mongoose.Schema({
	matchId: String,
	body: String,
});

const MatchNotes = mongoose.model('MatchNotes', matchNotesSchema);

export default MatchNotes;
