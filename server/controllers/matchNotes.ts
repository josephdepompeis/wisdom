import MatchNotes from '../models/matchNotes';
import BaseCtrl from './base';

export default class MatchNotesCtrl extends BaseCtrl {
	model = MatchNotes;

	getMatchNotesByOpponentId = (req, res) => {
		console.log("req", req.params);
		console.log("req.params.id", req.params.id);

		this.model.find({matchId: req.params.id}, (err, docs) => {
			if (err) { return console.error(err); }
			res.status(200).json(docs);
		});
	}
}
