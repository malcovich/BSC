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

  getAllPlayers = (req, res) =>{
    Player.find().populate('club').exec((err, players)=>{
      res.json(players);
    })
  }

  addPlayer = (req, res) =>{
    var player = {
      name: req.body.name,
      age : req.body.age,
      height : req.body.height,
      club : req.body.club,
      clubNumber : req.body.clubNumber,
      country : req.body.country,
      position : req.body.position,
      leg : req.body.leg
    }
    var newPlayer = new Player(player);
    newPlayer.save((err, player)=>{
      console.log('Player', player, err)
      res.json(player);
    })
  }

  addMatch = (req, res) =>{
    var match = {
      team1: req.body.team1,
      team2 : req.body.team2,
      date : req.body.date,
      round: req.body.round,
      result: req.body.result
    }
    var newMatch = new Match(match);
    newMatch.save((err, match)=>{
      console.log('Match', match, err)
      res.json(match);
    })
  }
}