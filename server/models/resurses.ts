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
  simpleRecords: Number,
  resmatch: String
});

const Resurses = mongoose.model('Resurses', resursesSchema);

export default Resurses;
