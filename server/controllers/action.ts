import Club from '../models/clubs';
import Player from '../models/player';
import Match from '../models/match';
import Team from '../models/team';
import Action from '../models/action';
import BaseCtrl from './base';

export default class ActionCtrl extends BaseCtrl {
    model = Team;

    addTeam = (req, res) => {
        var obj ={ 
            players: req.body.players,
            user : req.body.user
        };
        var team = new Team(obj);
        team.save((err, team) => {
            res.json(team);
        })
    }

    getTeam = (req, res) => {
        Team.findOne({'user': req.body.user}).populate('players').exec((err, team) => {
            res.json(team);
        })
    }
}