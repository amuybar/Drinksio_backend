const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brewery: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
  subStyle: {
    type: String,
  },
  abv: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
  },
  strength: {
    type: String,
  },
  origin: {
    country: {
      type: String,
    },
    region: {
      type: String,
    },
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  available: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Beer', beerSchema);
