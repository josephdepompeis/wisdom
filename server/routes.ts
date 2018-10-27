import * as express from 'express';

import OpponentCtrl from './controllers/opponent';
import OpponentNotesCtrl from './controllers/opponentNotes';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';



// import Cat from './models/cat';
// import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const opponentCtrl = new OpponentCtrl();
  const opponentNotesCtrl = new OpponentNotesCtrl();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();

  // Opponents
  router.route('/opponents/:id').get(opponentCtrl.getOpponentsByUserId);
  router.route('/opponents/count').get(opponentCtrl.count);
  router.route('/opponent').post(opponentCtrl.insert);
  router.route('/opponent/:id').get(opponentCtrl.get);
  router.route('/opponent/:id').put(opponentCtrl.update);
  router.route('/opponent/:id').delete(opponentCtrl.delete);


  // OpponentNotes
  router.route('/opponentNotes/:id').get(opponentNotesCtrl.getOpponentsByOpponentId);
  // router.route('/opponents/count').get(opponentCtrl.count);
  router.route('/opponentNotes').post(opponentNotesCtrl.insert);
  // router.route('/opponent/:id').get(opponentCtrl.get);
  router.route('/opponentNotes/:id').put(opponentCtrl.update);
  router.route('/opponentNotes/:id').delete(opponentCtrl.delete);

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
