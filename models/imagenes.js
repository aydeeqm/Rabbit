const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const img_schema = new Schema({
  title: {
    type: String,
    required: true,
  }
});

const Image = mongoose.model('Image', img_schema);


module.exports = Image;
