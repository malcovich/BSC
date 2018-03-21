import * as mongoose from 'mongoose';
import League from './league';

const challengeSchema = new mongoose.Schema({
  name: String,
  date: Date,
  league: {type: mongoose.Schema.Types.ObjectId, ref: 'League'},
});

const Challenge = mongoose.model('Challenge', challengeSchema);

export default Challenge;
