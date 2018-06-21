import * as express from 'express';

import UserCtrl from './controllers/user';
import ClubCtrl from './controllers/club';
import SkinCtrl from './controllers/skin';
import ChallengeCtrl from './controllers/challenge';
import PlayerCtrl from './controllers/player';
import TeamCtrl from './controllers/team';
import ActionCtrl from './controllers/action';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();
  const clubCtrl = new ClubCtrl();
  const playerCtrl = new PlayerCtrl();
  const teamCtrl = new TeamCtrl();
  const actionCtrl = new ActionCtrl();
  const challengeCtrl = new ChallengeCtrl();
  const skinCtrl = new SkinCtrl();
  
  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  //Clubs 
  router.route('/addClubs').post(clubCtrl.addClubs);
  router.route('/getClubsInfo/').post(clubCtrl.getClubsInfo);
  router.route('/addSimpleNames/').post(clubCtrl.addSimpleNames);
  router.route('/getAllClubsFromLeague/').post(clubCtrl.getAllClubsFromLeague);
  router.route('/getMatchesWithClub/').post(clubCtrl.getMatchesWithClub);
  router.route('/clubs/:id').get(clubCtrl.get);

  //Players 
  router.route('/getPlayersForClub/').post(playerCtrl.getPlayersForClub);
  // router.route('/getAllPlayers/').get(playerCtrl.getAllPlayers);

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
  router.route('/getPlayerInfo').post(playerCtrl.getPlayerInfo)
  router.route('/addMatch').post(playerCtrl.addMatch);
  router.route('/getMatches').get(clubCtrl.getMatches);
  router.route('/getAllPlayers').get(playerCtrl.addPlayersForTeam);

  app.use('/api', router);

}
