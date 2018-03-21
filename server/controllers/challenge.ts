import Club from '../models/clubs';
import Player from '../models/player';
import Match from '../models/match';
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
    Challenge.find().populate('club').exec((err, players)=>{
      res.json(players);
    })
  }
  
}