import * as mongoose from 'mongoose';

const leagueSchema = new mongoose.Schema({
  name: String
});

const League = mongoose.model('League', leagueSchema);

export default League;
