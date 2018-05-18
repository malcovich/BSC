import * as mongoose from 'mongoose';
import Club from './clubs';

const playerSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  dateOfBirth: Date,
  nationality: {
    iso: String,
    name: String  
  },
  position: String,
  logo: String,
  age: Number,
  shirtNumber: Number,
  slug: String,
  club: {type: mongoose.Schema.Types.ObjectId, ref: 'Club'},
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
