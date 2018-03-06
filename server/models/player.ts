import * as mongoose from 'mongoose';
import Club from './clubs';

const playerSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Date,
  country: String,
  position: String,
  leg: String,
  clubNumber: Number,
  height: Number,
  club: {type: mongoose.Schema.Types.ObjectId, ref: 'Club'},
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
