import Club from '../models/clubs';
import Player from '../models/player';
import Match from '../models/match';
import BaseCtrl from './base';
var fs = require('fs');


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

  addPlayersForTeam  = (req, res) =>{
  //   var clubId = "5a956f2ae144536463b6d85a";
  //   var obj;
  //   let a = [];
  //   fs.readFile('./team.json', 'utf8', function (err, data) {
  //     if (err) throw err;
  //     obj = JSON.parse(data);
  //     obj.playersList.forEach(element => {
  //       var player = {
  //         name: element.name,
  //         weight: element.weight,
  //         dateOfBirth: element.dateOfBirth,
  //         nationality: {
  //           iso: element.nationality ? element.nationality.iso : null ,
  //           name: element.nationality ? element.nationality.name : null
  //         },
  //         position: element.position,
  //         logo: element.logo,
  //         age: element.age,
  //         shirtNumber: element.shirtNumber,
  //         slug: element.slug,
  //         club: clubId,
  //       }
  //       var newPlayer = new Player(player);
  //       a.push(newPlayer);
  //       console.log(newPlayer)
  //       newPlayer.save((err, player)=>{
  //         console.log('Player', err)
  //       })
  //     })
  //   });
  //   res.status(201);
  }
}