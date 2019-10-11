const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const img_schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId, // Like a key foranea
    ref: 'User'
  }
});

const Image = mongoose.model('Image', img_schema);


module.exports = Image;
