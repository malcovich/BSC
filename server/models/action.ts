import * as mongoose from 'mongoose';
import Player from './player';
import Club from './clubs';
import User from './user';
import Match from './match';

const actionSchema = new mongoose.Schema({
  match: {type: mongoose.Schema.Types.ObjectId, ref: 'Match'},
  player: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},
  time: Number,
  actionType : Number
});

const Action = mongoose.model('Action', actionSchema);

export default Action;
