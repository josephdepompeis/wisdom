import * as mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
  name: String,
  thumbnail: String,
  fullSize: String,
});

const Character = mongoose.model('Character', characterSchema);

export default Character;
