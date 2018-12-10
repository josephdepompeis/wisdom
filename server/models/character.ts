import * as mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
  name: String,
  // weight: Number,
  // age: Number
});

const Character = mongoose.model('Character', characterSchema);

export default Character;
