import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import ResursesCtrl from './controllers/resurses';
import ClubCtrl from './controllers/club';
import Cat from './models/cat';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const resursesCtrl = new ResursesCtrl();
  const clubCtrl = new ClubCtrl();

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
  router.route('/addClubs').post(resursesCtrl.addClubs);
  router.route('/getClubsInfo/').post(resursesCtrl.getClubsInfo);
  router.route('/addSimpleNames/').post(resursesCtrl.addSimpleNames);
  router.route('/mapResurses').get(resursesCtrl.mapResurses)
  router.route('/getindividual').get(resursesCtrl.getindIvidual)
  router.route('/saveResult/').post(resursesCtrl.saveResult);
  // Apply the routes to our application with the prefix /api


  //Clubs 

 router.route('/clubs/:id').get(clubCtrl.get);
  app.use('/api', router);

}
