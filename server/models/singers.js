const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const singerSchema = new Schema({
  name: String,
  nationality: String,
  photo: String,
});

module.exports = mongoose.model('Singer', singerSchema);
