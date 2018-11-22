import TierLists from '../models/tier-lists';
import BaseCtrl from './base';

export default class TierListsCtrl extends BaseCtrl {
	model = TierLists;

	getTierListSectionsByTierId = (req, res) => {
		console.log("req  heloo", req.params);
		this.model.find({tierId: req.params.tierId}, (err, docs) => {
			if (err) { return console.error(err); }
			res.status(200).json(docs);
		});
	}

}
