import Club from '../models/clubs';
import Player from '../models/player';
import Match from '../models/match';
import Skin from '../models/skin';
import Challenge from '../models/challenge';
import BaseCtrl from './base';

export default class SkinCtrl extends BaseCtrl {
  model = Skin;

  getPlayersForClub = (req, res) =>{
    Player.find({club : req.body.club}).exec((err, players)=>{
      res.json(players);
    })
  }

  getSkin= (req, res) =>{
    Skin.find({'challenge' : req.body.challenge, 'user': req.body.user}).populate('players').exec((err, players)=>{
      res.json(players);
    })
  }
  saveSkin = (req, res) => {
    var obj ={ 
        players: req.body.players,
        user : req.body.user,
        challenge : req.body.challenge
    };
    var skin = new Skin(obj);
    skin.save((err, team) => {
        res.json(team);
    })
}
  
}