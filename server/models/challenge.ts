import * as mongoose from 'mongoose';
import League from './league';
import Match from './match';

const challengeSchema = new mongoose.Schema({
  name: String,
  date: Date,
  status: String,
  matches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}],
  league: {type: mongoose.Schema.Types.ObjectId, ref: 'League'},
});

const Challenge = mongoose.model('Challenge', challengeSchema);

export default Challenge;
