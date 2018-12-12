import MatchNoteSection from '../models/match-note-section';
import BaseCtrl from './base';

export default class MatchNoteSectionCtrl extends BaseCtrl {
	model = MatchNoteSection;

	getMatchNoteSectionsByMatchId = (req, res) => {
		console.log("req", req.params);
		console.log("req.params.id", req.params.matchId);

		this.model.find({matchId: req.params.matchId}, (err, docs) => {
			if (err) { return console.error(err); }
			res.status(200).json(docs);
		});
	}

}
