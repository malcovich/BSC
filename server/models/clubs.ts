import * as mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  name1: String,
  name2: String,
  name3: String,
  name4: String,
  name5: String
});

const Club = mongoose.model('Club', clubSchema);

export default Club;
