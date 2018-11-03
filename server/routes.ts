import * as express from 'express';

import OpponentCtrl from './controllers/opponent';
import OpponentNotesCtrl from './controllers/opponentNotes';

import CharacterCtrl from './controllers/character';
import UserCtrl from './controllers/user';

export default function setRoutes(app) {

  const router = express.Router();

  const opponentCtrl = new OpponentCtrl();
  const opponentNotesCtrl = new OpponentNotesCtrl();

  const characterCtrl = new CharacterCtrl();
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
  router.route('/opponentNote').post(opponentNotesCtrl.insert);
  // router.route('/opponent/:id').get(opponentCtrl.get);
  router.route('/opponentNote/:id').put(opponentNotesCtrl.update);
  router.route('/opponentNote/:id').delete(opponentNotesCtrl.delete);

  // characters
  router.route('/characters').get(characterCtrl.getAll);
  router.route('/character').post(characterCtrl.insert);
  router.route('/character/:id').get(characterCtrl.get);
  router.route('/character/:id').put(characterCtrl.update);
  router.route('/character/:id').delete(characterCtrl.delete);

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
