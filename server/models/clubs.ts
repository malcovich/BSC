import * as mongoose from 'mongoose';
import League from './league';

const clubSchema = new mongoose.Schema({
  name1: String,
  name2: String,
  name3: String,
  name4: String,
  name5: String,
  name: String,
  simpleNames: [],
  ukrName : String,
  tournament : String,
  league: {type: mongoose.Schema.Types.ObjectId, ref: 'League'}
});

const Club = mongoose.model('Club', clubSchema);

export default Club;
