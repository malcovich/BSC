import * as mongoose from 'mongoose';

const resursesSchema = new mongoose.Schema({
  team1: String,
  team2: String,
  propability1: String,
  propabilityOver: String,
  propabilityUnder: String,
  propability2: String,
  propabilityX: String,
  prediction: String,
  correctScore: String,
  avarageGoal: String,
  resurse: String,
  addedDate: Date,
  matchTime: String,
  tournament: String,
  simpleRecords: Number,
  resmatch: String,
  individualPredition : Boolean,
  country: String,
  lige: String,
  odd1: String,
  oddX: String,
  odd2: String,
  last5home: [String],
  last5away: [String],
  systemPredicion: String,
  systemPredicionStatus: Boolean,
  club : {type: mongoose.Schema.Types.ObjectId, ref: 'Club'}
});

const Resurses = mongoose.model('Resurses', resursesSchema);

export default Resurses;
