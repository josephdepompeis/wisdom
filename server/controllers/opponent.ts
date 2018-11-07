import Opponent from '../models/opponent';
import BaseCtrl from './base';

export default class OpponentCtrl extends BaseCtrl {
	model = Opponent;

	getOpponentsByUserId = (req, res) => {
		console.log("req", req.params);
		this.model.find({userId: req.params.id}, (err, docs) => {
			if (err) { return console.error(err); }
			res.status(200).json(docs);
		});
	}

}
