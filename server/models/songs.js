const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const songSchema = new Schema({
  name: String,
  genre: String,
  singerId: String,
});

module.exports = mongoose.model('Song', songSchema);
