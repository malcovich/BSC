import * as mongoose from 'mongoose';
import Player from './player';
import Club from './clubs';
import User from './user';

const teamSchema = new mongoose.Schema({
  players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
