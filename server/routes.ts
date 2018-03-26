import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import ResursesCtrl from './controllers/resurses';
import ClubCtrl from './controllers/club';
import SkinCtrl from './controllers/skin';
import ChallengeCtrl from './controllers/challenge';
import PlayerCtrl from './controllers/player';
import TeamCtrl from './controllers/team';
import Cat from './models/cat';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const resursesCtrl = new ResursesCtrl();
  const clubCtrl = new ClubCtrl();
  const playerCtrl = new PlayerCtrl();
  const teamCtrl = new TeamCtrl();
  const challengeCtrl = new ChallengeCtrl();
  const skinCtrl = new SkinCtrl();
  

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

  // Resurses
  router.route('/getresurse').get(resursesCtrl.getResurse);
  router.route('/listresurses/:id').get(resursesCtrl.get);
  router.route('/listresurses/').get(resursesCtrl.getAllWithSame);
  router.route('/sameItems/').post(resursesCtrl.getSameItems);

  router.route('/mapResurses').get(resursesCtrl.mapResurses)
  router.route('/getindividual').get(resursesCtrl.getindIvidual)
  router.route('/saveResult/').post(resursesCtrl.saveResult);
  router.route('/addToFavorite/').post(resursesCtrl.addToFavorite);
  router.route('/getFavoriteItems/').get(resursesCtrl.getFavoriteItems);
  // Apply the routes to our application with the prefix /api


  //Clubs 
  router.route('/addClubs').post(clubCtrl.addClubs);
  router.route('/getClubsInfo/').post(clubCtrl.getClubsInfo);
  router.route('/addSimpleNames/').post(clubCtrl.addSimpleNames);
  router.route('/getAllClubsFromLeague/').post(clubCtrl.getAllClubsFromLeague);
  router.route('/getMatchesWithClub/').post(clubCtrl.getMatchesWithClub);
  router.route('/clubs/:id').get(clubCtrl.get);

  //Players 
  router.route('/getPlayersForClub/').post(playerCtrl.getPlayersForClub);
  router.route('/getAllPlayers/').get(playerCtrl.getAllPlayers);

  //Team
  router.route('/addTeam/').post(teamCtrl.addTeam);
  router.route('/getTeam/').post(teamCtrl.getTeam);

  //Challenge
  router.route('/getChallenges/').post(challengeCtrl.getChallenges);
  router.route('/challenge/:id').get(challengeCtrl.getChallenge);

  //Skin
  router.route('/saveSkin/').post(skinCtrl.saveSkin);
  router.route('/getSkin/').post(skinCtrl.getSkin);

  //admin 
  router.route('/addPlayer').post(playerCtrl.addPlayer);
  router.route('/addMatch').post(playerCtrl.addMatch);

  app.use('/api', router);

}
