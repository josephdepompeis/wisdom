import Match from '../models/match';
import BaseCtrl from './base';

export default class MatchCtrl extends BaseCtrl {
	model = Match;
	getMatchesByUserId = (req, res) => {
		console.log("req", req.params);
		this.model.find({userId: req.params.id}, (err, docs) => {
			if (err) { return console.error(err); }
			res.status(200).json(docs);
		});
	}

}
