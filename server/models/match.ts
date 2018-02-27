import * as mongoose from 'mongoose';

const MatchSchema = new mongoose.Schema({
  team1: {type: mongoose.Schema.Types.ObjectId, ref: 'Club'},
  team2: {type: mongoose.Schema.Types.ObjectId, ref: 'Club'},
  date: Date,
  round: Number,
  result: String,
  season: String
});

const Match = mongoose.model('Match', MatchSchema);

export default Match;
