const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const songSchema = new Schema({
  name: String,
  minutes: String,
  seconds: String,
  releaseDate: String,
  singerId: String,
});

module.exports = mongoose.model('Song', songSchema);
