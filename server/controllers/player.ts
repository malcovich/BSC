import Club from '../models/clubs';
import Player from '../models/player';
import Match from '../models/match';
import BaseCtrl from './base';

export default class PlayerCtrl extends BaseCtrl {
  model = Player;

  getPlayersForClub = (req, res) =>{
    Player.find({club : req.body.club}).exec((err, players)=>{
      res.json(players);
    })
  }
  
}