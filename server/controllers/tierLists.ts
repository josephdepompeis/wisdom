import TierLists from '../models/tier-lists';
import BaseCtrl from './base';

export default class TierListsCtrl extends BaseCtrl {
	model = TierLists;

	getMatchNotesByOpponentId = (req, res) => {
		console.log("req", req.params);
		this.model.find({matchId: req.params.id}, (err, docs) => {
			if (err) { return console.error(err); }
			res.status(200).json(docs);
		});
	}
}
