import Resurses from '../models/resurses';
import Club from '../models/clubs';
import Match from '../models/match';
import BaseCtrl from './base';
import * as path from 'path';
import * as fs from 'fs';
import * as request from 'request';
import * as cheerio from 'cheerio';
import * as wuzzy from 'wuzzy';
import * as async from 'async';

export default class ClubCtrl extends BaseCtrl {
  model = Club;

  addClubs = (req, res, next) => {
    var team1 = req.body.team1;
    var team2 = req.body.team2;
    var teams = [];
    Club.find({$or: [{'name': team1}, {'simpleNames': team1}]}).exec((err, teamHome) => {
      Club.find({$or: [{'name': team2}, {'simpleNames': team2}]}).exec((err, teamAway) => {
        if (teamHome.length == 0){
          var team11 = new Club({name: req.body.team1});
          teams.push(team11.save());
        }
        if (teamAway.length == 0){
          var team21 = new Club({name: req.body.team2});
          teams.push(team21.save());
        }
        Promise.all(teams).then(values => {
          res.json({'team1' : teamHome[0] ? teamHome[0]: values[0], 'team2' : teamAway[0]?teamAway[0]:values[1]});
        });
      })
    });
  }

  getAllClubsFromLeague = (req, res, next) => {
    Club.find({'league': req.body.league}).exec((err, clubs) => {
      res.json(clubs);
    });
  }

  getClubsInfo = (req, res) => {
    var team1 = req.body.team1;
    var team2 = req.body.team2;

    Club.find({$or: [{'name': team1}, {'simpleNames': team1}]}).exec((err, teamHome) => {
      Club.find({$or: [{'name': team2}, {'simpleNames': team2}]}).exec((err, teamAway) => {
        res.json({'team1' : teamHome[0], 'team2': teamAway[0]});
      })
    });
  }

  addSimpleNames = (req, res) => {
    var team1 = req.body.simpleName1;
    var team2 = req.body.simpleName2;
    var id1 = req.body.idTeam1;
    var id2 = req.body.idTeam2;
    Club.findById(id1).exec((err, teamHome) => {
        if (teamHome.name !== team1) {
          teamHome.simpleNames.push(team1)
        }
        teamHome.save((err, item) => {
          Club.findById(id2).exec((err, teamAway) => {
            if (teamAway.name !== team2) {
              teamAway.simpleNames.push(team2)
            }
            teamAway.save((err, item2) => {
              res.json({'team1': item, 'team2' : item2});
            })
          })
        })
    });
  }

  getMatchesWithClub = (req, res) =>{
    console.log(req.body.club)
    Match.find({$or: [{'team1': req.body.club},{'team2':req.body.club}]}).populate('team1').populate('team2').exec((err, matches)=>{
      console.log(matches)
      res.json(matches);
    })
  }
  
}