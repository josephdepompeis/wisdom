import * as express from 'express';

import OpponentCtrl from './controllers/opponent';
import OpponentNotesCtrl from './controllers/opponentNotes';

import MatchCtrl from './controllers/match';
import MatchNotesCtrl from './controllers/matchNotes';
import MatchNoteSectionCtrl from './controllers/matchNoteSection'

import CharacterCtrl from './controllers/character';
import UserCtrl from './controllers/user';

import TierListCtrl from './controllers/tierLists';
import TierListSectionCtrl from './controllers/tierListSections';


export default function setRoutes(app) {

	const router = express.Router();

	const opponentCtrl = new OpponentCtrl();
	const opponentNotesCtrl = new OpponentNotesCtrl();
	const matchCtrl = new MatchCtrl();
	const characterCtrl = new CharacterCtrl();
	const userCtrl = new UserCtrl();
	const matchNotesCtrl = new MatchNotesCtrl();
	const matchNoteSectionCtrl = new MatchNoteSectionCtrl();

	const tierListsCtrl = new TierListCtrl();
	const tierListSectionCtrl = new TierListSectionCtrl();

	// Opponents
	router.route('/opponents/:id').get(opponentCtrl.getOpponentsByUserId);
	router.route('/opponents/count').get(opponentCtrl.count);
	router.route('/opponent').post(opponentCtrl.insert);
	router.route('/opponent/:id').get(opponentCtrl.get);
	router.route('/opponent/:id').put(opponentCtrl.update);
	router.route('/opponent/:id').delete(opponentCtrl.delete);

	// OpponentNotes
	router.route('/opponentNotes/:id').get(opponentNotesCtrl.getOpponentNotesByOpponentId);
	// router.route('/opponents/count').get(opponentCtrl.count);
	router.route('/opponentNote').post(opponentNotesCtrl.insert);
	// router.route('/opponent/:id').get(opponentCtrl.get);
	router.route('/opponentNote/:id').put(opponentNotesCtrl.update);
	router.route('/opponentNote/:id').delete(opponentNotesCtrl.delete);

	// matches
	router.route('/matches/:id').get(matchCtrl.getMatchesByUserId);
	router.route('/findMatch/:playingAs/:playingAgainst').get(matchCtrl.findMatch);
	router.route('/match').post(matchCtrl.insert);
	router.route('/match/:id').get(matchCtrl.get);
	router.route('/match/:id').put(matchCtrl.update);
	router.route('/match/:id').delete(matchCtrl.delete);

	// MatchNotes
	router.route('/matchNotes/:id').get(matchNotesCtrl.getMatchNotesByOpponentId);
	router.route('/matchNote').post(matchNotesCtrl.insert);
	router.route('/matchNote/:id').put(matchNotesCtrl.update);
	router.route('/matchNote/:id').delete(matchNotesCtrl.delete);

	// MatchNoteSections
	router.route('/matchNoteSections/:matchId').get(matchNoteSectionCtrl.getMatchNoteSectionsByMatchId);
	router.route('/matchNoteSection').post(matchNoteSectionCtrl.insert);
	router.route('/matchNoteSection/:id').put(matchNoteSectionCtrl.update);

	// tierLists
	router.route('/tierList/:userId/:typeId').get(tierListsCtrl.getTierListByTypeId);
	router.route('/tierList').post(tierListsCtrl.insert);
	router.route('/tierList/:id').put(tierListsCtrl.update);

	//tier List Sections
	router.route('/tierListSections/:tierListId').get(tierListSectionCtrl.getTierListSectionsByTierId);
	router.route('/tierListSection').post(tierListSectionCtrl.insert);
	router.route('/tierListSection/:id').put(tierListSectionCtrl.update);

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
