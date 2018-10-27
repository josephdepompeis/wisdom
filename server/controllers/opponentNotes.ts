import OpponentNotes from '../models/opponentNotes';
import BaseCtrl from './base';

export default class OpponentNotesCtrl extends BaseCtrl {
  model = OpponentNotes;

  getOpponentsByOpponentId = (req, res) => {
    console.log("req", req.params);
    
    this.model.find({opponentId: req.params.id}, (err, docs) => {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }

}
