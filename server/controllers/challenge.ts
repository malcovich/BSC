import Club from '../models/clubs';
import Player from '../models/player';
import Match from '../models/match';
import League from '../models/league';
import Challenge from '../models/challenge';
import BaseCtrl from './base';

export default class ChallengeCtrl extends BaseCtrl {
  model = Challenge;

  getPlayersForClub = (req, res) =>{
    Player.find({club : req.body.club}).exec((err, players)=>{
      res.json(players);
    })
  }

  getChallenges = (req, res) =>{
    Challenge.find().exec((err, players)=>{
      res.json(players);
    })
  }
  getChallenge = (req, res) =>{
    Challenge.find({'_id': req.params.id}).populate('matches').exec((err, players)=>{
      res.json(players[0]);
    })
  }
  
}