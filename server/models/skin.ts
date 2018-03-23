import * as mongoose from 'mongoose';
import Challenge from './challenge';
import Player from './player';

const skinSchema = new mongoose.Schema({
  name: String,
  date: Date,
  status: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  players : [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
  challenge: {type: mongoose.Schema.Types.ObjectId, ref: 'Challenge'}
});

const Skin = mongoose.model('Skin', skinSchema);

export default Skin;
