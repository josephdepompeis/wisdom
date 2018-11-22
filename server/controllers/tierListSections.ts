import TierListSections from '../models/tier-list-sections';
import BaseCtrl from './base';

export default class TierListsCtrl extends BaseCtrl {
	model = TierListSections;

	getTierListSectionsByTierId = (req, res) => {
		console.log("req  heloo", req.params);

		this.model.find({tierListId: req.params.tierListId}, (err, docs) => {
			if (err) { return console.error(err); }
			res.status(200).json(docs);
		});
	}

}
