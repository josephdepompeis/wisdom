import TierLists from '../models/tier-lists';
import BaseCtrl from './base';

export default class TierListsCtrl extends BaseCtrl {
	model = TierLists;
	//
	// getTierListByCharacter = (req, res) => {
	// 	console.log("req", req.params);
	// 	this.model.find({_id: req.params.id}, (err, docs) => {
	// 		if (err) { return console.error(err); }
	// 		res.status(200).json(docs);
	// 	});
	// }

	getTierListByTypeId = (req, res) => {
		console.log("req  heloo", req.params);

		this.model.findOne({
			userId: req.params.userId,
			typeId: req.params.typeId,
		}, (err, docs) => {
			if (err) { return console.error(err); }
			res.status(200).json(docs);
		});
	}


}
